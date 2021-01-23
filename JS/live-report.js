// class Point {
//     constructor(name) {
//       this.type = "spline";
//       this.showInLegend = true;
//       this.xValueFormatString = "hh:mm:ss";
//       this.dataPoints = [];
//       this.name = name;
//     }

//     async makeAnApiCall() {
//       try {
//         const data = await getCoinPrice(this.name);
//         const date = new Date();
//         date.setMilliseconds(0);
//         this.dataPoints.push({
//           x: date,
//           y: data[Object.keys(data)[0]].USD,
//         });
//       } catch (e) {
//         console.log(e);
//         console.log(this.dataPoints);
//         console.log("error");
//       }
//     }
//   }

//   const liveReports = async() => {
//     clearActiveClassesAndMain();
//     activateActiveButton("live-reports");
//     if (toggledCoins.length === 0) {
//       $(".main").append(`
//       <div>
//           <h1>You need to toggle one or more coins to watch chart.</h1>
//       </div>

//   `);
//     } else {
//       $(".main").append(`
//         <div id="chartContainer" style="height: 300px; width: 100%;"></div>

//     `);
//       $(document).ready(function () {
//         const bitcoinReportPointsArray = toggledCoins.map((coin) => {
//           return new Point(coin.symbol);
//         });

//         let chart = new CanvasJS.Chart("chartContainer", {
//           zoomEnabled: true,
//           title: {
//             text: "Cryptocoins",
//           },
//           axisX: {
//             title: "chart updates every 2 secs",
//           },
//           axisY: {
//             prefix: "$",
//           },
//           toolTip: {
//             shared: true,
//           },
//           legend: {
//             cursor: "pointer",
//             verticalAlign: "top",
//             fontSize: 22,
//             fontColor: "dimGrey",
//             itemclick: toggleDataSeries,
//           },
//           data: bitcoinReportPointsArray,
//         });

//         function toggleDataSeries(e) {
//           if (
//             typeof e.dataSeries.visible === "undefined" ||
//             e.dataSeries.visible
//           ) {
//             e.dataSeries.visible = false;
//           } else {
//             e.dataSeries.visible = true;
//           }
//           chart.render();
//         }

//         let updateInterval = 2000;

//         function updateChart() {
//           bitcoinReportPointsArray.map((element) => {
//             element.makeAnApiCall();
//           });
//           chart.data = bitcoinReportPointsArray;
//           // console.log(bitcoinReportPointsArray);
//           for (let i = 0; i < bitcoinReportPointsArray.length; i++) {
//             chart.options.data[i].legendText = `${toggledCoins[i].id}`;
//           }

//           chart.render();
//         }

//         setInterval(function () {
//           updateChart();
//         }, updateInterval);
//       });
//     }
//   };

const liveReports = async () => {
  try {
    const coinsPrices= await getCoinsPrices();
    clearActiveClassesAndMain();
    activateActiveButton("live-reports");
    if (toggledCoins.length === 0) {
      $(".main").append(`
          <div>
              <h1>You need to toggle one or more coins to watch chart.</h1>
          </div>
      
      `);
    } else {
      $(".main").append(`
            <div id="chartContainer" style="height: 600px; width: 100%;"></div>
      
        `);
    }
    console.log(toggledCoins);
    console.log(coinsPrices);
    var options = {
      exportEnabled: true,
      animationEnabled: true,
      //   title: { text: `${coinsSymbol} over time` },
      title: { text: "Cryptocoins" },
      subtitles: [{ text: "in USD" }],
      axisX: { title: "Real Time" },
      axisY: {
        title: "Coin Value",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC",
      },
      toolTip: { shared: true },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries,
      },
      data: [],
    };
    var chart = new CanvasJS.Chart("chartContainer", options);

    for (let i = 0; i < coinsSymbol.length; i++) {
      options.data.push({
        type: "spline",
        name: `${coinsSymbol[i]}`,
        showInLegend: true,
        dataPoints: [],
      });
    }

    const updateChart = async () => {
      let mySelectedCoins = await listOfCoins();
      let mySelectedCoinsValues = Object.values(mySelectedCoins);
      let myTime = thisIsMyTime();

      for (let i = 0; i < mySelectedCoinsValues.length; i++) {
        let myCoin = options.data[i].dataPoints;
        console.log(myCoin);
        myCoin.push({ y: mySelectedCoinsValues[i], label: myTime });
      }

      chart.render();
    };

    function toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }

    chart.render();
    myInterval = setInterval(() => updateChart(), 2000);
  } catch (error) {
    console.log("oh no! problem with making the reports", error);
  }
};
