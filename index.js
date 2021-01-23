
let toggledCoins = [];

//Local storage +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const loadFromLocalStorageToggledCoins = () => {
  if (localStorage.getItem("toggled-coins") !== null) {
    let retrievedToggledCoins = localStorage.getItem("toggled-coins");
    toggledCoins = JSON.parse(retrievedToggledCoins);
  } else {
  }
  return toggledCoins;
};

toggledCoins = loadFromLocalStorageToggledCoins();

const saveToLocalStorageToggledCoins = () => {
  localStorage.setItem("toggled-coins", JSON.stringify(toggledCoins));
};

//Load from session storage more info coin
const loadFromSessionStorageMoreInfoCoin = async (id) => {
  if (sessionStorage.getItem(`more-info-coin-${id}`) !== null) {
    let retrievedCoin = sessionStorage.getItem(`more-info-coin-${id}`);
    coin = JSON.parse(retrievedCoin);
    setTimeout(() => {
      sessionStorage.removeItem(`more-info-coin-${id}`);
    }, 120000);
  } else {
    coin = await getCoin(id);
  }
  return coin;
};

//Save to session storage more info coin
const saveToSessionStorageMoreInfoCoin = (coin) => {
  sessionStorage.setItem(`more-info-coin-${coin.id}`, JSON.stringify(coin));
};

//Helping functions ***********************************************************
const showLoader = () => {
  $(".main").append(`
  <div class="loader" id="loader">
      <img src="./loader.svg" alt="loader" />
  </div>
`);
};

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

const getCoinsPrices = () => {
  const beggining = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=";
  let coinsSymbols = toggledCoins[0].symbol;
  for (let i = 1; i < toggledCoins.length; i++) {
    coinsSymbols = coinsSymbols + "," + toggledCoins[i].symbol;
  }
  const ending = "&tsyms=USD";
  const fullURL = beggining + coinsSymbols + ending;
  console.log(fullURL);
  return $.ajax({
    method: "GET",
    url: fullURL,
  });
};

const getCoin = (id) => {
  return $.ajax({
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/${id}`,
  });
};
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Toggle - untoggle toggler :)
const toggleUntoggle = (id) => {
  if (toggledCoins.some((coin) => coin.id === id)) {
    $(`#${id}-toggle`).prop("checked", true);
  } else {
    $(`#${id}-toggle`).prop("checked", false);
  }
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

// home();
liveReports();
