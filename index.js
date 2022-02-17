var anmeldung = "";
let PASSWORD = '{"0":99,"1":-30,"2":-13,"3":-92,"4":36,"5":-43,"6":39,"7":-112,"8":6,"9":-24,"10":-115,"11":-86,"12":44,"13":39,"14":76,"15":82,"16":-72,"17":-42,"18":46,"19":112,"20":48,"21":74,"22":17,"23":-122,"24":35,"25":-80,"26":-30,"27":-80,"28":10,"29":-103,"30":69,"31":58}';

function ini_sites(e) {
  switch (e) {
    case "#home":
      ini_home();
      break;
    case "#plant":
      ini_plant();
      break;
    case "#status":
      ini_status();
      break;
    case "#controll":
      ini_controll();
      break;
    case "#wetter":
      ini_wetter();
      break;
    case "#pool":
      //ini_pool();
      window.location.href = 'wassertemperatur/wassertemperatur.html';
      break;
    case "#impressum":
      ini_impressum();
      break;
  }
}

window.onhashchange = () => {
  closemenu();
  scrollUp();
  ini_sites(location.hash);
}
if (location.hash == "") {
  location.hash = "#home"
  scrollUp();
}

ini_sites(location.hash);

function openmenu() {
  document.querySelector(".menu").style.cssText = "transform:translateX(0) scaleX(-1);";
  document.querySelector(".menuoverlay").style.display = "";
  window.setTimeout(function() {
    document.querySelector(".menuoverlay").style.opacity = 1;
  }, 10);
};

function closemenu() {
  document.querySelector(".menu").style.cssText = "transform:translateX(-100%) scaleX(-1);";
  document.querySelector(".menuoverlay").style.opacity = 0;
  window.setTimeout(function() {
    document.querySelector(".menuoverlay").style.display = "none";
  }, 300);
  closelogin();
};

function openlogin() {
  document.querySelector(".login").style.display = "";
  document.querySelector(".menulogin button").style.display = "none";
  document.querySelector(".menulogin label").style.height = "5%";
  document.querySelector(".menulogin").style.height = "40%";
  password.value = "";
  window.setTimeout(function() {
    document.querySelector(".login").style.opacity = 1;
  }, 10);
};

function closelogin() {
  document.querySelector(".login").style.opacity = 0;
  document.querySelector(".menulogin button").style.display = "";
  document.querySelector(".menulogin label").style.height = "50%";
  document.querySelector(".menulogin").style.height = "7cm";
  window.setTimeout(function() {
    document.querySelector(".login").style.display = "none";
  }, 150);
};

function checkpassword() {
  (async () => {
    anmeldung = password.value;
    var hash = (await crypto.subtle.digest("SHA-256", (new TextEncoder().encode(anmeldung))));
    if (JSON.stringify(new Int8Array(hash)) == PASSWORD) {
      closelogin();
    } else {
      if (window.location.hash != '#home') {
        confirm("Du musst dich erst anmelden bevor du diese Aktion ausführen kannst.");
        openmenu();
        openlogin();
      } else {
        confirm("Das Passwort ist leider falsch, bitte versuche es später erneut.");
        window.location.href = 'index.html#home';
        window.location.reload();
      };
    };
  })()
};
