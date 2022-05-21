var controllpage = document.querySelector("#controll");

function opengrenzwerte() {
  if (document.querySelectorAll(".grenzwerte")[0].style.display == "none") {
    document.querySelectorAll(".grenzwerte")[0].style.display = "block";
  } else {
    document.querySelectorAll(".grenzwerte")[0].style.display = "none";
  };
};

function ini_controll() {
  startload();
  //checkpassword();
   opengrenzwerte();

  stopload();
};
