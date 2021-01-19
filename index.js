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

const getCoinPrice = (id) => {
  return $.ajax({
    method: "GET",
    url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${id}&tsyms=USD`,
  });
};

const getCoin = (id) => {
  return $.ajax({
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/${id}`,
  });
};


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

home();
