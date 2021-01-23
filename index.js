
let toggledCoins = [];
let myInterval = '';
//Helping functions *********************************************************************************************
const showLoader = () => {
  $(".main").append(`
  <div class="loader" id="loader">
      <img src="./loader.svg" alt="loader" />
  </div>
`);
};
const removeLoader=()=>{
  $('#loader').remove();
}

const clearActiveClassesAndMain = () => {
  $(".home").removeClass("active");
  $(".about").removeClass("active");
  $(".live-reports").removeClass("active");
  $(".main>*").remove();
  //Stopping chart interval from running in case it was running.
  stopChart();
};

const activateActiveButton = (buttonName) => {
  $(`.${buttonName}`).addClass("active");
};

//Toggle - untoggle toggler :)
const toggleUntoggle = (id) => {
  if (toggledCoins.some((coin) => coin.id === id)) {
    $(`#${id}-toggle`).prop("checked", true);
  } else {
    $(`#${id}-toggle`).prop("checked", false);
  }
};

function stopChart() {
  clearInterval(myInterval);
}


home();

