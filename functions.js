function scrollUp() {
  window.scrollTo({ top: 0, left: 0});
};

var loading = 0;

function startload() {
  if (loading == 0) {
    document.querySelector(".loading").style.display = "";
    window.setTimeout(function() {
      document.querySelector(".loading").style.opacity = 1;
    }, 10);
  }
  loading++;
};

function stopload() {
  loading--;
  if (loading <= 0) {
    document.querySelector(".loading").style.opacity = 0;
    window.setTimeout(function() {
      document.querySelector(".loading").style.display = "none";
    }, 150);
    loading = 0;
  }
}

function forcestoploading() {
  loading = 0;
  stopload();
}

function splitMeldungen() {
  var a = 0;
  var meldung = [];
  var meldungen = parseFloat(JSON.parse(localStorage.getItem('daten')));
  meldungen = '105,107,102' //meldungen.benachrichtigung
  meldung= meldungen.split(",");
  localStorage.setItem('meldung', JSON.stringify(meldung));
  return meldung;
};

function loadMeldungen() {
  var meldung = JSON.parse(localStorage.getItem('meldung'));
  meldung.sort(function(a, b) { //Meldungen werden der Größe nach sortiert
    return a - b;
  });

  //Meldungen anziegen


};
