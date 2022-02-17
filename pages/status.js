var statuspage = document.querySelector("#status");
var inhalt = document.getElementsByClassName('inhalt');
var sitename = document.getElementById('sitename');
let sites = ["Temperatur/Luftfeuchtigkeit", "Bodenfeuchtigkeit", "Gießungen", "Wasserstand", "Meldungen"];

let site = 0;


async function loadData() {
  const response = await fetch("https://theinnovation-db-gewaechshaus.vercel.app/api/getData.js", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: ""
  });
  return response;
};


function loadmaxTemp(temp1, temp2, temp3) {
  if (temp1 >= temp2) {
    if (temp1 >= temp3) {
      return temp1
    };
  };
  if (temp2 >= temp1) {
    if (temp2 >= temp3) {
      return temp2
    };
  };
  if (temp3 >= temp1) {
    if (temp3 >= temp2) {
      return temp3
    };
  };
};

function loadminTemp(temp1, temp2, temp3) {
  if (temp1 <= temp2) {
    if (temp1 <= temp3) {
      return temp1
    };
  };
  if (temp2 <= temp1) {
    if (temp2 <= temp3) {
      return temp2
    };
  };
  if (temp3 <= temp1) {
    if (temp3 <= temp2) {
      return temp3
    };
  };
};

function loadThermometer(temp1, temp2, temp3) {

  temp1 = temp1.toFixed(1);
  temp2 = temp2.toFixed(1);
  temp3 = temp3.toFixed(1);

  var tempmax = loadmaxTemp(temp1, temp2, temp3);
  var tempmin = loadminTemp(temp1, temp2, temp3);

  if (tempmax == temp1 && tempmin == temp2 || tempmax == temp2 && tempmin == temp1) {
    document.querySelector("#Temperatur3").style.left = "0.25cm";
  } else if (tempmax == temp2 && tempmin == temp3 || tempmax == temp3 && tempmin == temp2) {
    document.querySelector("#Temperatur1").style.left = "0.25cm";
  } else if (tempmax == temp1 && tempmin == temp3 || tempmax == temp3 && tempmin == temp1) {
    document.querySelector("#Temperatur2").style.left = "0.25cm";
  };

  var tempspann = tempmax - tempmin;
  var abweichung = Math.round(tempspann) / 10;
  tempspann = Math.round(tempspann * 10) / 10;
  document.querySelector("#untereGrenze").innerHTML = parseFloat(tempmin) - parseFloat(abweichung);
  document.querySelector("#obereGrenze").innerHTML = (parseFloat(tempmax) + parseFloat(abweichung)).toFixed(1);

  document.querySelector("#Temperatur1").innerHTML = temp1;
  document.querySelector("#Temperatur2").innerHTML = temp2;
  document.querySelector("#Temperatur3").innerHTML = temp3;

  tempspann = tempspann + 2 * abweichung;

  document.querySelector("#Temperatur1").style.top = 0.25 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp1))) + "cm";
  document.querySelector("#Temperatur2").style.top = 0.25 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp2))) + "cm";
  document.querySelector("#Temperatur3").style.top = 0.25 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp3))) + "cm";

  document.querySelector("#Strich1").style.top = 0.6 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp1))) + "cm";
  document.querySelector("#Strich2").style.top = 0.6 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp2))) + "cm";
  document.querySelector("#Strich3").style.top = 0.6 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp3))) + "cm";

  document.querySelector(".Thermometercase").style.display = "block";

};

function openTemperature(temp){
  console.log(" Temperatur: " + temp);
};

function loadsite() {
  startload();

  stopload();
};

function ini_status() {
  startload();
  var dataPointsluftaverage = [];
  var dataPointsluft1 = [];
  var dataPointsluft2 = [];
  var dataPointsluft3 = [];
  var dataPointstempaverage = [];
  var dataPointstemp1 = [];
  var dataPointstemp2 = [];
  var dataPointstemp3 = [];
  fetch("https://theinnovation-db-gewaechshaus.vercel.app/api/getData.js", {
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
      for (var i = 0; i < data.length - 1; i++) {
        dataPointstemp1.push({
          x: new Date(data[i].uts * 1000),
          y: Math.random() * (0 - -10) - 10 //parseFloat(data[i].gewaechshaus.temperaturInnenoben)
        });
        dataPointstemp2.push({
          x: new Date(data[i].uts * 1000),
          y: Math.random() * (25 - 21) + 21 //parseFloat(data[i].gewaechshaus.temperaturInnenmitte)
        });
        dataPointstemp3.push({
          x: new Date(data[i].uts * 1000),
          y: Math.random() * (23 - 20) + 20 //parseFloat(data[i].gewaechshaus.temperaturInnenunten)
        });
        dataPointstempaverage.push({
          x: new Date(data[i].uts * 1000),
          y: Math.round(parseFloat(dataPointstemp1[dataPointstemp1.length - 1].y + dataPointstemp2[dataPointstemp2.length - 1].y + dataPointstemp3[dataPointstemp3.length - 1].y) / 3 * 100) / 100
        });
        dataPointsluft1.push({
          x: new Date(data[i].uts * 1000),
          y: Math.random() * (90 - 80) + 80 //parseFloat(data[i].gewaechshaus.luftfeuchtigkeitInnenoben)
        });
        dataPointsluft2.push({
          x: new Date(data[i].uts * 1000),
          y: Math.random() * (100 - 90) + 90 //parseFloat(data[i].gewaechshaus.luftfeuchtigkeitInnenmitte)
        });
        dataPointsluft3.push({
          x: new Date(data[i].uts * 1000),
          y: Math.random() * (100 - 90) + 90 //parseFloat(data[i].gewaechshaus.luftfeuchtigkeitInnenunten)
        });
        dataPointsluftaverage.push({
          x: new Date(data[i].uts * 1000),
          y: Math.round(parseFloat(dataPointsluft1[dataPointsluft1.length - 1].y + dataPointsluft2[dataPointsluft2.length - 1].y + dataPointsluft3[dataPointsluft3.length - 1].y) / 3 * 100) / 100
        });
      };
      var InnenChart = new CanvasJS.StockChart("stockChartContainer", {
        title: {
          fontSize: 20,
          text: "Luftfeuchtigkeit und Temperatur im Gewächshaus"
        },
        zoomEnabled: true,
        panEnable: true,
        animationEnabled: true,
        exportEnabled: true,
        culture: "de",
        theme: "light1",
        colorSet: "allgreen",
        charts: [{
          tooltip: {
            fontSize: 50,
            Content: "{y}",
          },
          axisX: {
            gridThickness: 1,
            labelFontSize: 17,
            crosshair: {
              valueFormatString: "D. MMM YY, HH:mm ",
              enabled: true,
              lineDashType: "solid",
              color: "green",
              labelBackgroundColor: "green",
              snapToDataPoint: true,
              thickness: 3,
            }
          },
          axisY: {
            suffix: "°C",
            title: "Temperatur",
            lineColor: "#C24642",
            tickColor: "#C24642",
            labelFontColor: "#C24642",
            titleFontColor: "#C24642",
            includeZero: true,
            stripLines: [{
              value: 4,
              label: "Frost"
            }]
          },
          axisY2: {
            title: "Luftfeuchtigkeit",
            lineColor: "#7F6084",
            tickColor: "#7F6084",
            labelFontColor: "#7F6084",
            titleFontColor: "#7F6084",
            includeZero: true,
            suffix: "%"
          },
          toolTip: {
            shared: true
          },
          legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
          },
          data: [{
              type: "line",
              name: "Temperatur1",
              color: "#cc004c",
              showInLegend: true,
              axisYType: "primary",
              dataPoints: dataPointstemp1,
              lineThickness: 2,
            },
            {
              type: "line",
              name: "Temperatur2",
              color: "#990002",
              showInLegend: true,
              axisYType: "primary",
              dataPoints: dataPointstemp2,
              lineThickness: 2,
            },
            {
              type: "line",
              name: "Temperatur3",
              color: "#ff6668",
              axisYType: "primary",
              showInLegend: true,
              dataPoints: dataPointstemp3,
              lineThickness: 2,
            },
            {
              type: "line",
              name: "Temperaturdurchschnitt",
              color: "red",
              axisYType: "primary",
              showInLegend: true,
              dataPoints: dataPointstempaverage,
              lineThickness: 3,
            },
            {
              type: "line",
              name: "Luftfeuchtigkeit1",
              color: "#4d98ff",
              axisYType: "secondary",
              showInLegend: true,
              dataPoints: dataPointsluft1,
              lineThickness: 2,
            },
            {
              type: "line",
              name: "Luftfeuchtigkeit2",
              color: "#140099",
              axisYType: "secondary",
              showInLegend: true,
              dataPoints: dataPointsluft2,
              lineThickness: 2,
            },
            {
              type: "line",
              name: "Luftfeuchtigkeit3",
              color: "#9080ff",
              axisYType: "secondary",
              showInLegend: true,
              dataPoints: dataPointsluft3,
              lineThickness: 2,
            },
            {
              type: "line",
              name: "Luftfeuchtigkeitdurchschnitt",
              color: "blue",
              axisYType: "secondary",
              showInLegend: true,
              dataPoints: dataPointsluftaverage,
              lineThickness: 3,
            }
          ]
        }],
        navigator: {
          dynamicUpdate: false,
          data: [{
              dataPoints: dataPointsluftaverage
            },
            {
              dataPoints: dataPointstempaverage
            }
          ],
          axisX: {
            labelFontColor: "black",
            labelFontWeight: "bolder"
          },
          slider: {
            maskColor: "lightgray"
          },
        },
        rangeSelector: {
          buttonStyle: {
            borderColor: "green",
            borderThickness: 5
          },
          height: 100,
          inputFields: {
            style: {
              borderColor: "green",
              borderThickness: 5
            },
            valueFormatString: "D. MMM. YY",
          },
          label: "",
          buttons: [{
            label: "24h",
            range: 24,
            rangeType: "hour"
          }, {
            label: "7 Tage",
            range: 7,
            rangeType: "day"
          }, {
            label: "30 Tage",
            range: 30,
            rangeType: "day"
          }, {
            label: "12 Monate",
            range: 12,
            rangeType: "month"
          }, {
            label: "alle",
            range: null,
            rangeType: "all"
          }]
        }
      });
      InnenChart.render();
      stopload();
    })
    .catch(error => {
      console.log(error);
    });

  function toggleDataSeries(e) {
    console.log(e);
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
};

async function ini_status() {
  if (localStorage.getItem('currentpage') !== null) {
    site = localStorage.getItem('currentpage');
  } else {
    site = 0;
  };
  console.log(site);
  loadsite();
};

function toggleDataSeries(e) {
  console.log(e);
  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  e.chart.render();
};
