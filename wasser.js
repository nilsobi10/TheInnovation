
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
      var temp = document.getElementById("temp").innerHTML = data[data.length-1].pool;

  })

.catch(error => {
console.log(error);

})
