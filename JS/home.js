const home = async () => {
  const coins = await getAllCoins();

  updatePage(coins);
  activateActiveButton("home");
};
