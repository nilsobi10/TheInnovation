let plants = ['Blattsalat', 'Paprika', 'Peperoni'];
var infos = [];

function addplant() {
  var temp = prompt("Bitte geben Sie einen Pflanzennamen ein!", "Neue Pflanze");
  startload();
  plants[plants.length] = temp;
  ini_plant();
  stopload();
};

function showplant() {
  for (var i = 0; i < plants.length; i++) {
    console.log("pflanze " + i + 1 + " : " + plants[i]);
  };
};

function removeplant(index) {
  console.log("Es können noch keine Pflanzen erntfernt werden...");
};

function ini_plant() {
  startload();
  plants.sort();
  let box = document.getElementById('Pflanzen');
  box.innerHTML = " ";
  for (var i = 0; i < plants.length; i++) {
    let weitereInfos = document.createElement("div");
    weitereInfos.id = "weitereInfos";
    weitereInfos.innerHTML = "weitere Infos";
    weitereInfos.className = "weitereInfos";
    let remove = document.createElement("i");
    remove.className = "far fa-trash-alt";
    remove.id = "removeplant";
    let pflanzen = document.createElement("div");
    let info = document.createElement("div");
    info.id = "Info" + i;
    let url = "https://de.wikipedia.org/wiki/";
    info.innerHTML = "<p><a href=" + url + plants[i] + ">Infos von Wikipedia</a></p>";
    info.style.display = "none";
    pflanzen.innerHTML = plants[i];
    weitereInfos.onclick = () => {
      if (info.style.display === 'none') {
        info.style.display = 'block';
      } else {
        info.style.display = 'none'
      };
      if (remove.style.display === 'none') {
        remove.style.display = 'block';
      } else {
        remove.style.display = 'none';
      };
    };
    pflanzen.appendChild(info);
    pflanzen.appendChild(remove);
    pflanzen.appendChild(weitereInfos);
    box.appendChild(pflanzen);
    stopload();
  };
};
