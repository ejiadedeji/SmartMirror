  function weather() {
  var location = document.getElementById("location");
  var apiKey = "984d95f74aff8f54275bb75ef2e4a37a";
  var url = "https://api.forecast.io/forecast/";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(url + apiKey + "/" + latitude + "," + longitude + "?callback=?");
    location.innerHTML =
      "Latitude is " + latitude + "° Longitude is " + longitude + "°";

    $.getJSON(
      url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
      function(data) {
        $("#temp").html(data.currently.temperature + "° F");
        $("#minutely").html(data.minutely.summary);
          console.log(data);


      }
    );


    $.getJSON(
        url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
        function(data) {
          for(i=0; i<7; i++) {
            $("#temp_h").append("<p>" + data.hourly.data[i].temperature + "° F </p>" );
            $("#hourly").append(data.hourly.data[i].time);
          }
        }
    );

  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }

  location.innerHTML = "Locating...";
}

weather();