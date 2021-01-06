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
                <h5 class="card-title">${res[i].symbol}</h5>
                <div class="form-check form-switch">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                />
                </div>
            </div>
            
            <p class="card-text">${res[i].id}</p>
            <div class="card-bottom">
            <button type="button" class="btn btn-primary">More Info</button>
            <img src="${res[i].image.small}" alt="coin-image"/>
            </div>
            </div>
        </div>`
    );
  }
});
result.fail((err) => console.log(err));
