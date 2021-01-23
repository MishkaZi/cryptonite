const search = async () => {
    try {
      showLoader();
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
      removeLoader();
    } catch (error) {
      console.log(error);
    }
  };