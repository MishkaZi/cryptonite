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
        toggleUntoggle(coins[i].id);
      }
  
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      //Toggle
      $(".form-check-input").click((e) => {
        const id = e.target.dataset.id;
        if ($(`#${id}-toggle`).is(":checked")) {
          if (toggledCoins.length == 5) {
            const wantedCoin = id;
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
            console.log(wantedCoin);
            $(".form-check-input").click((e) => {
              const oldCoin = e.target.dataset.id
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

              //Get back to home();
              home();
            });
          } else {
            let coin = 0;
            for (let i = 0; i < coins.length; i++) {
              if (coins[i].id === id) {
                coin = coins[i];
              }
            }
  
            console.log(coin);
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

      const cancel=()=>{

      }
  
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
    } catch (error) {
      console.log(error);
    }
  };
  