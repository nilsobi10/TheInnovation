var wetterpage = document.querySelector("#klima");

function ini_wetter() {
  startload();
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=50.975654&lon=10.948052&appid=f110ed3e8279b2f034514ff87e0a387f", {
      method: 'POST',
      headers: {

      },
      body: ""
    })
    .then(text => text.json())
    .then(d => {
      stopload();
      var data = d;

      //Bild:
      var datenbank = ['<img class="bild" src="picture/leer.png" draggable="false">'];
      //Uhrzeit
      temp = parseInt(d.dt.toString());
      var date = new Date(temp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      var time = [hours, minutes.substr(-2)];
      datenbank.push(hours + ':' + minutes.substr(-2) + ' Uhr');
      //Temperatur
      datenbank.push('Temperatur: ' + Math.round((parseFloat(d.main.temp.toString())) - 273.15) * 10 / 10 + ' °C');
      //gefühlte Temperatur:
      datenbank.push('gefühlte Temperatur: ' + Math.round((parseFloat(d.main.feels_like.toString())) - 273.15) * 10 / 10 + ' °C');
      //Luftfeuchtigkeit
      datenbank.push('Luftfeuchtigkeit: ' + parseInt(d.main.humidity.toString()) + ' %');
      //Windgeschwindigkeit
      datenbank.push('Windgeschwindigkeit: ' + (parseInt(d.wind.speed.toString())) * 3.6 + ' km/h');
      //Windrichtung
      temp = parseInt(d.wind.deg.toString()); //Windrichtung
      if (temp <= 22.5) {
        temp = 'Norden';
      } else if (temp <= 67.5) {
        temp = 'Nordost'
      } else if (temp <= 112.5) {
        temp = 'Osten'
      } else if (temp <= 112.5 + 45) {
        temp = 'Südosten'
      } else if (temp <= 112.5 + 45 * 2) {
        temp = 'Süden'
      } else if (temp <= 112.5 + 45 * 3) {
        temp = 'Südwesten'
      } else if (temp <= 112.5 + 45 * 4) {
        temp = 'Westen'
      } else if (temp <= 112.5 + 45 * 5) {
        temp = 'Nordwesten'
      } else if (temp <= 112.5 + 45 * 6) {
        temp = 'Norden'
      };
      datenbank.push('Windrichtung: ' + temp);
      //Luftdruck:
      datenbank.push('Luftdruck: ' + parseInt(d.main.pressure.toString()) + ' hPa');
      //Sonnenaufgang:
      temp = parseInt(d.sys.sunrise.toString());
      var date = new Date(temp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      datenbank.push('Sonnenaufgang: ' + hours + ':' + minutes.substr(-2) + ' Uhr');
      //Tag-Nacht Bilderkennung
      if (time[0] > hours | (time[0] == hours && time[1] > minutes.substr(-2))) {
        time.push('day');
      } else {
        time.push('night')
      };

      //Sonnenuntergang:
      temp = parseInt(d.sys.sunset.toString());
      var date = new Date(temp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      var seconds = "0" + date.getSeconds();
      datenbank.push('Sonnenuntergang: ' + hours + ':' + minutes.substr(-2) + ' Uhr');
      //Tag-Nacht Bilderkennung
      if (time[0] > hours | (time[0] == hours && time[1] > minutes.substr(-2))) {
        time[2] = 'night';
      };

      datenbank[0] = '<img class="bild" src="picture/' + (d.weather[0].icon.toString()) + '.png" draggable="false">';
      //genauere Anzeigen
      var out = '<div class=wetter>Erfurt-Bindersleben<br>'; //Stadt änderbar???

      for (i = 0; i < datenbank.length; i++) {
        out += '<br>';
        out += datenbank[i];
      };

      out += '</div>';
      wetterpage.innerHTML = out;

    })
    .catch(error => {
      stopload();
      console.log(error);
    })
}




// 60temp = Nordost?
// These: 90temp Ost...
