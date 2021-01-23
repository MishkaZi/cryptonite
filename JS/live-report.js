const liveReports = async () => {
  try {
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

    var options = {
      exportEnabled: true,
      animationEnabled: true,
      title: { text: "Cryptocoins" },
      subtitles: [{ text: "in USD" }],
      axisX: { title: "Updates every 2 seconds" },
      axisY: {
        title: "Coin Value",
      },
      toolTip: { shared: true },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        fontSize: 22,
        fontColor: "dimGrey",
        itemclick: toggleDataSeries,
      },
      data: [],
    };
    var chart = new CanvasJS.Chart("chartContainer", options);

    for (let i = 0; i < toggledCoins.length; i++) {
      options.data.push({
        type: "spline",
        name: `${toggledCoins[i].name}`,
        xValueFormatString: "hh:mm:ss",
        showInLegend: true,
        dataPoints: [],
      });
    }
    showLoader();
    const updateChart = async () => {
      const coinsPrices = await getCoinsPrices();
      let time = new Date().toLocaleTimeString();
      for (let i = 0; i < toggledCoins.length; i++) {
        let coin = options.data[i].dataPoints;

        coin.push({
          y: coinsPrices[Object.keys(coinsPrices)[i]].USD,
          label: time,
        });
  
      }
      removeLoader();
    
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
    console.log(error);
  }
};
