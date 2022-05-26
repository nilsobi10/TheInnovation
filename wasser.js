var temperatur = [];
var date = [];
var time = [];
var endwert = new Date();
var anfangswert = new Date(00000);


document.querySelector("#endwert").onchange = function() {
  endwert = new Date(document.querySelector("#endwert").value);
  newData();
};

document.querySelector("#anfangswert").onchange = function() {
  anfangswert = new Date(document.querySelector("#anfangswert").value);
  newData();
};


let myChart = document.getElementById('myChart').getContext('2d');


fetch("https://theinnovation-db-gewaechshaus.vercel.app/api/getTemperature.js", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: ""
  })
  .then(text => text.json())
  .then(d => {
    var data = d.data;
    document.querySelector('#anfangswert').valueAsNumber = data[0].uts * 1000;
    document.querySelector('#anfangswert').min = new Date(data[0].uts * 1000).toISOString().split(".")[0];
    document.querySelector('#anfangswert').max = new Date(data[data.length - 1].uts * 1000).toISOString().split(".")[0];

    document.querySelector('#endwert').valueAsNumber = data[data.length - 1].uts * 1000;
    document.querySelector('#endwert').max = new Date(data[data.length - 1].uts * 1000).toISOString().split(".")[0];
    document.querySelector('#endwert').min = new Date(data[0].uts * 1000).toISOString().split(".")[0];

    for (var i = 0; i < data.length; i++) {
      temperatur[i] = data[i].pool;
      time[i] = new Date(data[i].uts * 1000);
      date[i] = convertuts(time[i]);
    };



    window.massPopChar = new Chart(myChart, {
      type: 'line',
      data: {
        labels: date,
        datasets: [{
          label: 'Temperatur',
          data: temperatur,
          fill: true,
          borderColor: 'blue',
          backgroundColor: 'red',
          tension: 0.3
        }]
      },
      option: {
        color: 'green',
        backgroundColor: 'green',
        scales: {
          x: {
            type: 'time',
            time: {
              // Luxon format string
              tooltipFormat: 'DD T'
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'value'
            }
          }
        }
      }
    });

  })

  .catch(error => {
    console.log(error);

  })

function newData() {
  var a = 0;
  massPopChar.data.labels = [];
  massPopChar.data.datasets[0].data = [];
  for (var i = 0; i < temperatur.length; i++) {
    if (new Date(time[i]) >= anfangswert && new Date(time[i]) <= endwert) {
      massPopChar.data.labels[a] = date[i];
      massPopChar.data.datasets[0].data[a] = temperatur[i];
      a++;
    };
  };
  massPopChar.update();
};


function convertuts(uts) {

  let a = new Date(uts);
  console.log(a);
  var b = a.getDate() + "."

  if (a.getMonth() < 9) {
    b += "0" + (a.getMonth() + 1);
  } else {
    b += (a.getMonth() + 1);
  };
  b += "." + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes();

  b += " "
  return b;

};

function convertdate(date) {
  var uts = new Date();
  return uts;
};
