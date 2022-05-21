var poolpage = document.querySelector("#pool");


function ini_pool() {
  startload();

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
        console.log(data[0].uts);
        document.getElementById('graph2');
        var out = [];
        for (var i = 0; i < data.length; i++) {
          out.push({
            x: parseFloat(data[i].uts),
            y: {
              Außentemperatur: parseFloat(data[i].pool)
            }
          });
        };
        var inlines = [{
          "x": 1000,
          "nid": "day",
          "text": "Temperaturen",
          "pos": "top", //top,bottom
          "width": 2
        }];
        chart.setData(out, inlines);
        chart.showAll();
      stopload();

    })

.catch(error => {
  stopload();
  console.log(error);

})

}
