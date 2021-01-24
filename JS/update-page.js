//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const updatePage = (coins) => {
  try {
    clearActiveClassesAndMain();
    if (window.location.reload) {
      sessionStorage.clear();
    }
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
      toggleUntoggle(coins[i].id);
      removeLoader();
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Toggle
    $(".form-check-input").click((e) => {
      showLoader();
      const id = e.target.dataset.id;
      if ($(`#${id}-toggle`).is(":checked")) {
        if (toggledCoins.length == 5) {
          const wantedCoin = id;
          updatePage(toggledCoins);

          $(".main").prepend(
            ` <div class="col-lg-12 d-flex flex-column justify-content-center  more-than-five">
                <div class="more-than-five-txt">
                    <h1>Please untoggle one coin before adding this coin, or click cancel. </h1>
                </div>
                <button id="cancel" type="button" onClick="home()"
                    class="btn btn-danger align-self-center cancel">
                    Cancel
                </button>
              </div>`
          );
          $(".form-check-input").click((e) => {
            showLoader();
            const oldCoin = e.target.dataset.id;
            //Delete oldCoin from toogledCoins
            toggledCoins = toggledCoins.filter((coin) => {
              return coin.id !== oldCoin;
            });
            //Add wantedCoin to roggledCoins
            let coin = 0;
            for (let i = 0; i < coins.length; i++) {
              if (coins[i].id === wantedCoin) {
                coin = coins[i];
              }
            }
            toggledCoins.push(coin);
            saveToLocalStorageToggledCoins();
            //Get back to home();
            // removeLoader();
            home();
          });
        } else {
          let coin = 0;
          for (let i = 0; i < coins.length; i++) {
            if (coins[i].id === id) {
              coin = coins[i];
            }
          }
          toggledCoins.push(coin);
          saveToLocalStorageToggledCoins();
        }
      } else {
        toggledCoins = toggledCoins.filter((coin) => {
          return coin.id !== id;
        });
        saveToLocalStorageToggledCoins();
      }
      removeLoader();
    });

    //More info ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $(".more-info-button").click(async (e) => {
      showLoader();
      try {
        const id = e.target.id;
        if (!$(`#${id}`).hasClass("collapsed")) {
          const coin = await loadFromSessionStorageMoreInfoCoin(id);
          saveToSessionStorageMoreInfoCoin(coin);
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
      removeLoader();
    });
  } catch (error) {
    console.log(error);
  }
};
