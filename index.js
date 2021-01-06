home();
function clearActiveClassesAndMain() {
  $(".home").removeClass("active");
  $(".about").removeClass("active");
  $(".live-reports").removeClass("active");
  $(".main>*").remove();
}
function home() {
  clearActiveClassesAndMain();
  $(".home").addClass("active");
  const usersUrl = "https://api.coingecko.com/api/v3/coins/";
  const result = $.ajax({
    method: "GET",
    url: usersUrl,
  });

  result.always((res) => {
    for (let i = 0; i < 100; i++) {
      $(".main").append(
        `<div class="card m-3">
            <div class="card-body">
            <div class="card-upper">
                <h5 class="card-title">${res[i].symbol} <img src="${res[i].image.thumb}" alt="coin-image" /></h5>
                <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                />
                </div>
            </div>

            <p class="card-text">${res[i].name} </p>
            <div class="card-bottom">
                <button
                data-bs-toggle="collapse"
                data-bs-target="#more-info-${res[i].id}"
                type="button"
                class="btn btn-primary"
                >
                More Info
                </button>

                <!-- <img src="${res[i].image.small}" alt="coin-image" /> -->
            </div>
            <div id="more-info-${res[i].id}" class="collapse row">
                <div class="col-6">
                    <p ><b>USD:</b> ${res[i].market_data.current_price.usd} <b>$</b></p>
                    <p ><b>EUR:</b> ${res[i].market_data.current_price.eur} <b>€</b></p>
                    <p ><b>ILS:</b> ${res[i].market_data.current_price.ils} <b>₪</b></p>
                </div>
                <img class="col-6" src="${res[i].image.small}" alt="coin-image" />
            </div>
            </div>
        </div>`
      );
    }
  });
  result.fail((err) => console.log(err));
}

function liveReports() {
  clearActiveClassesAndMain();
  $(".live-reports").addClass("active");
  $(".main").append(`<h1>liveReports</h1>`);
}

function about() {
  clearActiveClassesAndMain();
  $(".about").addClass("active");
  $(".main").append(`<h1>About</h1>`);
}
