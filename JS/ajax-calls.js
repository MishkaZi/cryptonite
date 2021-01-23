//AJAX calls **************************************************************************************************

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