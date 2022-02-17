
var dataPointsluftaverage = [{
  x: new Date(),
  y: 0
}];
var dataPointsluft1 = [{
  x: new Date(),
  y: 0
}];
var dataPointsluft2 = [{
  x: new Date(),
  y: 0
}];
var dataPointsluft3 = [{
  x: new Date(),
  y: 0
}];
var dataPointstempaverage = [{
  x: new Date(),
  y: 0
}];
var dataPointstemp1 = [{
  x: new Date(),
  y: 0
}];
var dataPointstemp2 = [{
  x: new Date(),
  y: 0
}];
var dataPointstemp3 = [{
  x: new Date(),
  y: 0
}];

function toggleDataSeries(e) {
  console.log(e);
  if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  e.chart.render();
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
