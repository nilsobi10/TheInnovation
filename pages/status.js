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


function loadmax(temp1, temp2, temp3) {
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

function loadmin(temp1, temp2, temp3) {
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

  document.querySelector("#Temperatur1").style.left = "5.25cm";
  document.querySelector("#Temperatur2").style.left = "5.25cm";
  document.querySelector("#Temperatur3").style.left = "5.25cm";

  temp1 = temp1.toFixed(1);
  temp2 = temp2.toFixed(1);
  temp3 = temp3.toFixed(1);

  var tempmax = loadmax(temp1, temp2, temp3);
  var tempmin = loadmin(temp1, temp2, temp3);

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

  document.querySelector("#Temperatur1").innerHTML = temp1 + " °C";
  document.querySelector("#Temperatur2").innerHTML = temp2 + " °C";
  document.querySelector("#Temperatur3").innerHTML = temp3 + " °C";

  tempspann = tempspann + 2 * abweichung;

  document.querySelector("#Temperatur1").style.top = 0.25 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp1))) + "cm";
  document.querySelector("#Temperatur2").style.top = 0.25 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp2))) + "cm";
  document.querySelector("#Temperatur3").style.top = 0.25 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp3))) + "cm";

  document.querySelector("#Strich1").style.top = 0.6 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp1))) + "cm";
  document.querySelector("#Strich2").style.top = 0.6 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp2))) + "cm";
  document.querySelector("#Strich3").style.top = 0.6 + (5.5 / tempspann * (parseFloat(tempmax) + parseFloat(abweichung) - parseFloat(temp3))) + "cm";

  document.querySelector(".Thermometercase").style.display = "block";
};

function loadHydrometer(humd1, humd2, humd3) {

  document.querySelector("#Luftfeuchtigkeit1").style.left = "5.25cm";
  document.querySelector("#Luftfeuchtigkeit2").style.left = "5.25cm";
  document.querySelector("#Luftfeuchtigkeit3").style.left = "5.25cm";

  humd1 = humd1.toFixed(1);
  humd2 = humd2.toFixed(1);
  humd3 = humd3.toFixed(1);

  var humdmax = loadmax(humd1, humd2, humd3);
  var humdmin = loadmin(humd1, humd2, humd3);

  if (humdmax == humd1 && humdmin == humd2 || humdmax == humd2 && humdmin == humd1) {
    document.querySelector("#Luftfeuchtigkeit3").style.left = "0.25cm";
  } else if (humdmax == humd2 && humdmin == humd3 || humdmax == humd3 && humdmin == humd2) {
    document.querySelector("#Luftfeuchtigkeit1").style.left = "0.25cm";
  } else if (humdmax == humd1 && humdmin == humd3 || humdmax == humd3 && humdmin == humd1) {
    document.querySelector("#Luftfeuchtigkeit2").style.left = "0.25cm";
  };

  var humdspann = humdmax - humdmin;
  var abweichung = Math.round(humdspann) / 10;
  humdspann = Math.round(humdspann * 10) / 10;
  document.querySelector("#untereGrenzehumd").innerHTML = (parseFloat(humdmin) - parseFloat(abweichung)).toFixed(1);
  document.querySelector("#obereGrenzehumd").innerHTML = (parseFloat(humdmax) + parseFloat(abweichung)).toFixed(1);

  document.querySelector("#Luftfeuchtigkeit1").innerHTML = humd1 + " %";
  document.querySelector("#Luftfeuchtigkeit2").innerHTML = humd2 + " %";
  document.querySelector("#Luftfeuchtigkeit3").innerHTML = humd3 + " %";

  humdspann = humdspann + 2 * abweichung;

  document.querySelector("#Luftfeuchtigkeit1").style.top = 0.25 + (5.5 / humdspann * (parseFloat(humdmax) + parseFloat(abweichung) - parseFloat(humd1))) + "cm";
  document.querySelector("#Luftfeuchtigkeit2").style.top = 0.25 + (5.5 / humdspann * (parseFloat(humdmax) + parseFloat(abweichung) - parseFloat(humd2))) + "cm";
  document.querySelector("#Luftfeuchtigkeit3").style.top = 0.25 + (5.5 / humdspann * (parseFloat(humdmax) + parseFloat(abweichung) - parseFloat(humd3))) + "cm";

  document.querySelector("#Strich1humd").style.top = 0.6 + (5.5 / humdspann * (parseFloat(humdmax) + parseFloat(abweichung) - parseFloat(humd1))) + "cm";
  document.querySelector("#Strich2humd").style.top = 0.6 + (5.5 / humdspann * (parseFloat(humdmax) + parseFloat(abweichung) - parseFloat(humd2))) + "cm";
  document.querySelector("#Strich3humd").style.top = 0.6 + (5.5 / humdspann * (parseFloat(humdmax) + parseFloat(abweichung) - parseFloat(humd3))) + "cm";

  document.querySelectorAll(".Thermometercase")[1].style.display = "block";
};

function loadsite() {
  startload();

  stopload();
};

function loadData(data) {


    var temp1 = parseFloat(data[data.length - 1].gewaechshaus.temperaturInnenoben);
    var temp2 = parseFloat(data[data.length - 1].gewaechshaus.temperaturInnenmitte);
    var temp3 = parseFloat(data[data.length - 1].gewaechshaus.temperaturInnenunten);
    var humd1 = parseFloat(data[data.length - 1].gewaechshaus.luftfeuchtigkeitInnenoben);
    var humd2 = parseFloat(data[data.length - 1].gewaechshaus.luftfeuchtigkeitInnenmitte);
    var humd3 = parseFloat(data[data.length - 1].gewaechshaus.luftfeuchtigkeitInnenunten);

  document.querySelectorAll(".aktuelleDaten table td")[1].innerHTML = temp1 + " °C";
  document.querySelectorAll(".aktuelleDaten table td")[2].innerHTML = humd1 + " %";

  document.querySelectorAll(".aktuelleDaten table td")[4].innerHTML = temp2 + " °C";
  document.querySelectorAll(".aktuelleDaten table td")[5].innerHTML = humd2 + " %";

  document.querySelectorAll(".aktuelleDaten table td")[7].innerHTML = temp3 + " °C";
  document.querySelectorAll(".aktuelleDaten table td")[8].innerHTML = humd3 + " %";

  document.querySelectorAll(".aktuelleDaten table td")[10].innerHTML = ((temp1 + temp2 + temp3) / 3).toFixed(1) + " °C";
  document.querySelectorAll(".aktuelleDaten table td")[11].innerHTML = ((humd1 + humd2 + humd3) / 3).toFixed(1) + " %";

  document.querySelectorAll(".aktuelleDaten p")[1].innerHTML = "letzten Messdaten vom: " + data[data.length-1].time;

  loadHydrometer(humd1, humd2, humd3);
  loadThermometer(temp1, temp2, temp3);
};

function ini_status() {
  startload();

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

      loadData(data);

      stopload();
    })
    .catch(error => {
      console.log(error);
    });

};
