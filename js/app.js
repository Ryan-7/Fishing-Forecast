// Revealing Module JavaScript Pattern 

var fishForecast = (function() {

  // Define Variables 

  var conversionRate = 0.0305301;
  var response;
  var rising;
  var pressure;
  var theCity;
  var theRegion;
  var forecast;
  var temp;
  var zipCode;
  var spinner = "<i class='fa fa-refresh fa-spin' aria-hidden='true'></i>";


  // Cache DOM

  var $work = $("#work");
  var $close = $("#close");
  var $workInfo = $("#workInfo");
  var $info = $("#info");
  var $go = $("#go")
  var $theInput = $("#theInput");
  var $status = $("#status");
  var $thePressure = $("#thePressure");
  var $rising = $("#rising");
  var $theCity = $("#theCity");
  var $forecast = $("#forecast");
  var $temp = $("#temp");


  // Bind Events 

  $work.on("click", openHowItWorks);
  $close.on("click", closeHowItWorks);
  $theInput.on("keyup", keyBoardSupport);
  $go.on("click", search);


  // Methods


  function keyBoardSupport(event) {
    if (event.keyCode == 13) {
      $go.click();
    }
  }

  function openHowItWorks() {
    $workInfo.slideDown();
  }

  function closeHowItWorks() {
    $workInfo.slideUp();
  }


  function search(value) {
    $info.addClass("hidden");
    zipCode = (typeof value === "number") ? value : $theInput.val();
    if (zipCode.length < 5) {
      $theInput.focus();
    } else {
      $theInput.val("");
      $theInput.focus();
      $status.html(spinner);
      $.ajax("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + zipCode + "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", {

        success: function(response) {

          // Barometric pressure 
          pressure = response.query.results.channel.atmosphere.pressure;
          pressure = pressure * conversionRate;
          pressure = (Math.round(pressure * 100) / 100);
          pressure = pressure.toFixed(2);
          $thePressure.html(pressure);

          //State of Barometric Pressure      
          rising = response.query.results.channel.atmosphere.rising;

          if (rising === "0") {
            rising = "Steady";
          } else if (rising === "1") {
            rising = "Rising";
          } else if (rising === "2") {
            rising = "Falling";
          }
          $rising.html(rising);

          // The City
          theCity = response.query.results.channel.location.city;
          theRegion = response.query.results.channel.location.region;
          $theCity.html(theCity + theRegion);

          // Forecast
          if (pressure < 29.60) {
            forecast = "Poor"
          } else if (pressure > 30.50) {
            forecast = "Fair"
          } else if ((pressure > 29.90 && pressure < 30.90) && rising === "Falling") {
            forecast = "Excellent";
          } else if (pressure > 29.70 && pressure < 30.40) {
            forecast = "Good";
          } else {
            forecast = "fair";
          }
          $forecast.html(forecast);

          //Temperature 
          temp = response.query.results.channel.item.condition.temp;
          $temp.html(temp + "&deg;");
        },

        error: function() {
          alert("Yahoo's weather API is taking too long to respond - Please try again.");
        },
        timeout: 6000,

        beforeSend: function() {
          $status.html(spinner);
        },

        complete: function() {
          $status.html("")
          $info.removeClass("hidden");
        }

      });
    }
  }

  return {
    search: search // Public method for searching: fishForecast.search(value);
  }

})();

