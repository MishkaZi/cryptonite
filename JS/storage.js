//Local storage toggledCoins save ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

//Session storage more info coin +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

