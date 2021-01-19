const home = async () => {
  const coins = await getAllCoins();
  updatePage(coins);
  activateActiveButton("home");
  const date = new Date();
  date.setMilliseconds(0);
  console.log(date.getMilliseconds());
};
