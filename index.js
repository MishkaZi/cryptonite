let toggledCoins = [];

//Local storage +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Load from local storage more info coin
const loadFromLocalStorageMoreInfoCoin = async (id) => {
  if (localStorage.getItem(`more-info-coin-${id}`) !== null) {
    let retrievedCoin = localStorage.getItem(`more-info-coin-${id}`);
    coin = JSON.parse(retrievedCoin);
    setTimeout(() => {
      localStorage.removeItem(`more-info-coin-${id}`);
    }, 120000);
  } else {
    coin = await getCoin(id);
  }
  return coin;
};

//Save to local storage more info coin
const saveToLocalStorageMoreInfoCoin = (coin) => {
  localStorage.setItem(`more-info-coin-${coin.id}`, JSON.stringify(coin));
};

//Helping functions ***********************************************************
const clearActiveClassesAndMain = () => {
  $(".home").removeClass("active");
  $(".about").removeClass("active");
  $(".live-reports").removeClass("active");
  $(".main>*").remove();
};

const activateActiveButton = (buttonName) => {
  $(`.${buttonName}`).addClass("active");
};

//AJAX calls *******************************************************************
const getAllCoins = () => {
  return $.ajax({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/",
  });
};

const getCoinsPrices = (coins) => {
  let coinsNames = coins[0].symbol;
  for (let i = 1; i < coins.length; i++) {
    coinsNames = coinsNames + "," + coins[i].symbol;
  }
  let fullURL = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinsNames}&tsyms=USD`;
  console.log(fullURL);
  return $.ajax({
    method: "GET",
    url: `${fullURL}`,
  });
};

const getCoin = (id) => {
  return $.ajax({
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/${id}`,
  });
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const updatePage = (coins) => {
  try {
    clearActiveClassesAndMain();
    for (let i = 0; i < coins.length; i++) {
      $(".main").append(
        `<div class="card m-3">
            <div class="card-body">
            <div class="card-upper">
                <h5 class="card-title">${coins[i].symbol} <img src="${coins[i].image.thumb}" alt="coin-image" /></h5>
                
                <div class="form-check form-switch">
                   <input class="form-check-input" data-id="${coins[i].id}" data-toggle="toggle" type="checkbox" id="${coins[i].id}-toggle" />
                </div>
   
            </div>

            <p class="card-text">${coins[i].name} </p>
            <div class="card-bottom">
                <button
                data-bs-toggle="collapse"
                data-bs-target="#more-info-${coins[i].id}"
                id="${coins[i].id}"
                type="checkbox"
                class="btn btn-primary more-info-button"
                >
                More Info
                </button>
            </div>
            <div id="more-info-${coins[i].id}" class="collapse row">
            
            </div>

            </div>
        </div>`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

//Menu functions++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const home = async () => {
  const coins = await getAllCoins();
  updatePage(coins);
  activateActiveButton("home");
  //temporary
  toggledCoins.push(coins[0], coins[1], coins[2], coins[3],coins[4]);
  console.log(toggledCoins);
  liveReports();
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Toggle
  $(".form-check-input").click(async (e) => {
    const id = e.target.dataset.id;
    if ($(`#${id}-toggle`).is(":checked")) {
      if (toggledCoins.length == 5) {
        console.log("Show menu to untoggle one of coins.");
        updatePage(toggledCoins);

        $(".main").append(
          `<div>
              <h1>Please untoggle one coin before adding this coin, or: </h1>
           </div>
          <button id="btc" type="button" onClick="home()"
              class="btn btn-danger cancel">
              Cancel
          </button>`
        );
      } else {
        const coin = await getCoin(id);
        toggledCoins.push(coin);
        console.log(toggledCoins);
      }
    } else {
      toggledCoins = toggledCoins.filter((coin) => {
        return coin.id !== id;
      });
      console.log(toggledCoins);
    }
  });

  //More info ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  $(".more-info-button").click(async (e) => {
    try {
      const id = e.target.id;
      if (!$(`#${id}`).hasClass("collapsed")) {
        const coin = await loadFromLocalStorageMoreInfoCoin(id);
        saveToLocalStorageMoreInfoCoin(coin);
        $(`#more-info-${coin.id}`).append(
          `       <div class="col-6">
                        <p ><b>USD:</b> ${coin.market_data.current_price.usd} <b>$</b></p>
                        <p ><b>EUR:</b> ${coin.market_data.current_price.eur} <b>€</b></p>
                        <p ><b>ILS:</b> ${coin.market_data.current_price.ils} <b>₪</b></p>
                    </div>
                    <img class="col-6" src="${coin.image.small}" alt="coin-image" />
            `
        );
      } else {
        $(`#more-info-${id}>*`).remove();
      }
    } catch (error) {
      console.log("more info" + error);
    }
  });
};

const liveReports = () => {
  clearActiveClassesAndMain();
  activateActiveButton("live-reports");
  $(".main").append(`
      <div id="chartContainer" style="height: 300px; width: 100%;"></div>

  `);

  $(document).ready(function () {
    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];


    var chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      title: {
        text: "Cryptocoins",
      },
      axisX: {
        title: "chart updates every 2 secs",
      },
      axisY: {
        prefix: "$",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        fontSize: 22,
        fontColor: "dimGrey",
        itemclick: toggleDataSeries,
      },
      data: [
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$####.00",
          xValueFormatString: "hh:mm:ss TT",
          showInLegend: true,
          name: `${toggledCoins[0].id}`,
          dataPoints: dataPoints1,
        },
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$####.00",
          showInLegend: true,
          name: `${toggledCoins[1].id}`,
          dataPoints: dataPoints2,
        },
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$####.00",
          showInLegend: true,
          name: `${toggledCoins[2].id}`,
          dataPoints: dataPoints3,
        },
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$####.00",
          showInLegend: true,
          name: `${toggledCoins[3].id}`,
          dataPoints: dataPoints4,
        },
        {
          type: "line",
          xValueType: "dateTime",
          yValueFormatString: "$####.00",
          showInLegend: true,
          name: `${toggledCoins[4].id}`,
          dataPoints: dataPoints5,
        },
      ],
    });

    function toggleDataSeries(e) {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }

    var updateInterval = 10000;
    // initial value
    var yValue1 = 1;
    var yValue2 = 2;
    var yValue3 = 3;
    var yValue4 = 4;
    var yValue5 = 5;

    var time = new Date();
    // // starting at 9.30 am
    // time.setHours(9);
    // time.setMinutes(30);
    // time.setSeconds(00);
    // time.setMilliseconds(00);

    function updateChart(count) {
      count = count || 1;
      var deltaY1, deltaY2,deltaY3,deltaY4,deltaY5;
      for (var i = 0; i < count; i++) {
        time.setTime(time.getTime() + updateInterval);
        deltaY1 = 0.5 + Math.random() * (-0.5 - 0.5);
        deltaY2 = 0.5 + Math.random() * (-0.5 - 0.5);
        deltaY3 = 0.5 + Math.random() * (-0.5 - 0.5);
        deltaY4 = 0.5 + Math.random() * (-0.5 - 0.5);
        deltaY5 = 0.5 + Math.random() * (-0.5 - 0.5);

        // adding random value and rounding it to two digits.
        yValue1 = Math.round((yValue1 + deltaY1) * 100) / 100;
        yValue2 = Math.round((yValue2 + deltaY2) * 100) / 100;
        yValue3 = Math.round((yValue3 + deltaY3) * 100) / 100;
        yValue4 = Math.round((yValue4 + deltaY4) * 100) / 100;
        yValue5 = Math.round((yValue5 + deltaY5) * 100) / 100;

        // pushing the new values
        dataPoints1.push({
          x: time.getTime(),
          y: yValue1,
        });
        dataPoints2.push({
          x: time.getTime(),
          y: yValue2,
        });
        dataPoints3.push({
          x: time.getTime(),
          y: yValue3,
        });
        dataPoints4.push({
          x: time.getTime(),
          y: yValue4,
        });
        dataPoints5.push({
          x: time.getTime(),
          y: yValue5,
        });
      }

      // updating legend text with  updated with y Value
      chart.options.data[0].legendText = `${toggledCoins[0].id} $` + yValue1;
      chart.options.data[1].legendText = `${toggledCoins[1].id} $` + yValue2;
      chart.options.data[2].legendText = `${toggledCoins[2].id} $` + yValue3;
      chart.options.data[3].legendText = `${toggledCoins[3].id} $` + yValue4;
      chart.options.data[4].legendText = `${toggledCoins[4].id} $` + yValue5;

      chart.render();
    }
    // generates first set of dataPoints
    updateChart(10);
    setInterval(function () {
      updateChart();
    }, updateInterval);
  });
};

const about = () => {
  clearActiveClassesAndMain();
  activateActiveButton("about");
  $(".main").append(
    `
    <div class="d-flex justify-content-center flex-column">
      <div class="d-flex justify-content-between">
        <p class="masthead-subheading shadow-lg p-3 mb-5 rounded m-4">
          <b>About Cryptonite</b><br /><br />
          Cryptonite is the world's most-referenced price-tracking website
          for cryptoassets in the rapidly growing cryptocurrency space. Its
          mission is to make crypto discoverable and efficient globally by
          empowering retail users with unbiased, high quality and accurate
          information for drawing their own informed conclusions.<br /><br />
          Founded by Michael Zinoviev in January 2020, Cryptonite has
          quickly grown to become the most trusted source by users,
          institutions, and media for comparing thousands of cryptoassets
          and is commonly cited by CNBC, Bloomberg, and other major news
          outlets. (Even the U.S. government uses Cryptonite's data for
          research and reports!)
        </p>
      </div>
      <div
        class="d-flex justify-content-center flex-row align-items-center mt-5"
      >
        <img
          class="profile-picture m-1"
          src="./images/circle-cropped.png"
          alt="profile picture"
        />

        <div class="d-flex justify-content-center flex-column m-5">
          <a href="https://mzwebdev.com/"
            ><i class="fas fa-fw fa-address-card fa-2x"></i
          ></a>
          <a href="https://www.facebook.com/mishazinoviev/"
            ><i class="fab fa-fw fa-facebook-f fa-2x"></i></a
          ><a href="https://twitter.com/mishazino"
            ><i class="fab fa-fw fa-twitter fa-2x"></i></a
          ><a href="https://www.linkedin.com/in/michaelzinoviev-webdev/"
            ><i class="fab fa-fw fa-linkedin-in fa-2x"></i></a
          ><a href="https://github.com/MishkaZi"
            ><i class="fab fa-fw fa-github fa-2x"></i
          ></a>
        </div>
      </div>
    </div>
    `
  );
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const search = async () => {
  try {
    const searchInput = $("#search-input").val();
    const coins = await getAllCoins();
    const filteredcoins = coins.filter((coin) => {
      return coin.symbol.toLowerCase() === searchInput.toLowerCase();
    });
    if (filteredcoins.length === 0) {
      clearActiveClassesAndMain();
      $(".main").append(`
        <div>
          <h1>There is no coins matching your search!</h1>
        </div>
    `);
    } else {
      updatePage(filteredcoins);
    }
  } catch (error) {
    console.log(error);
  }
};

home();
