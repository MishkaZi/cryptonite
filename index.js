//Helping functions
function clearActiveClassesAndMain() {
  $(".home").removeClass("active");
  $(".about").removeClass("active");
  $(".live-reports").removeClass("active");
  $(".main>*").remove();
}
function activateActiveButton(buttonName){
  $(`.${buttonName}`).addClass("active");

}

const getAllCoins = () => {
  return $.ajax({
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/",
  });
};

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
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                />
                </div>
            </div>

            <p class="card-text">${coins[i].name} </p>
            <div class="card-bottom">
                <button
                data-bs-toggle="collapse"
                data-bs-target="#more-info-${coins[i].id}"
                type="button"
                class="btn btn-primary"
                >
                More Info
                </button>
            </div>
            <div id="more-info-${coins[i].id}" class="collapse row">
                <div class="col-6">
                    <p ><b>USD:</b> ${coins[i].market_data.current_price.usd} <b>$</b></p>
                    <p ><b>EUR:</b> ${coins[i].market_data.current_price.eur} <b>€</b></p>
                    <p ><b>ILS:</b> ${coins[i].market_data.current_price.ils} <b>₪</b></p>
                </div>
                <img class="col-6" src="${coins[i].image.small}" alt="coin-image" />
            </div>
            </div>
        </div>`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const home = async () => {
  const coins = await getAllCoins();
  updatePage(coins);
  activateActiveButton('home');
};

function liveReports() {
  clearActiveClassesAndMain();
  activateActiveButton('live-reports');
  $(".main").append(`<h1>liveReports</h1>`);
}

function about() {
  clearActiveClassesAndMain();
  activateActiveButton('about');
  $(".main").append(
    `
    <div class="d-flex justify-content-center flex-column">
    <div class="d-flex justify-content-between">
      <p class="masthead-subheading shadow-lg p-3 mb-5 rounded  m-4">
        <b>About Cryptonite</b><br/><br/> Cryptonite is the world's most-referenced
        price-tracking website for cryptoassets in the rapidly growing
        cryptocurrency space. Its mission is to make crypto discoverable
        and efficient globally by empowering retail users with unbiased,
        high quality and accurate information for drawing their own
        informed conclusions.<br/><br/>
         Founded by Michael Zinoviev in January 2020,
        Cryptonite has quickly grown to become the most trusted source
        by users, institutions, and media for comparing thousands of
        cryptoassets and is commonly cited by CNBC, Bloomberg, and other
        major news outlets. (Even the U.S. government uses Cryptonite's
        data for research and reports!)
      </p>
      <div class="divider-custom-icon m-5 d-flex align-items-center">
        <i class="fab fa-bitcoin fa-7x"></i>
      </div>
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
}

const search = async () => {
  try {
    const searchInput = $("#search-input").val();
    const coins = await getAllCoins();
    const filteredcoins = coins.filter((coin) => {
      return coin.symbol.toLowerCase()===searchInput;
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
