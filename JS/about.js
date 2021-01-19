const about = () => {
    clearActiveClassesAndMain();
    activateActiveButton("about");
    $(".main").append(
      `
      <div class="d-flex justify-content-center flex-column">
        <div class="d-flex justify-content-between">
          <p class="masthead-subheading shadow-lg p-3 mb-5 rounded m-4">
            <b>About Cryptonite</b><br /><br />
            Cryptonite is the world's most-referenced price-tracking website
            for cryptoassets in the rapidly growing cryptocurrency space. Its
            mission is to make crypto discoverable and efficient globally by
            empowering retail users with unbiased, high quality and accurate
            information for drawing their own informed conclusions.<br /><br />
            Founded by Michael Zinoviev in January 2020, Cryptonite has
            quickly grown to become the most trusted source by users,
            institutions, and media for comparing thousands of cryptoassets
            and is commonly cited by CNBC, Bloomberg, and other major news
            outlets. (Even the U.S. government uses Cryptonite's data for
            research and reports!)
          </p>
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
  };