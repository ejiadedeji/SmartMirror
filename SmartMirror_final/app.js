function tplawesome(e, t) { res = e; for (var n = 0; n < t.length; n++) { res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) { return t[n][r] }) } return res }

function init() {
    gapi.client.setApiKey('AIzaSyC5y063lD1-ybkzPx0i6lJObXr1RopsmJk');
    gapi.client.load("youtube", "v3", function () {
        // yt api is ready
    });
}

$(function () {
    $("form").on("submit", function (e) {
        e.preventDefault();
        // prepare the request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 2,
            order: "viewCount",
            publishedAfter: "2019-01-01T00:00:00Z"
        });
        // execute the request
        request.execute(function (response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function (index, item) {
                $.get("tpl/item.html", function (data) {
                    $("#results").append(tplawesome(data, [{ "title": item.snippet.title, "videoid": item.id.videoId }]));
                });
            });
            resetVideoHeight();
        });
    });

    $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 8 / 16);
}

function showDiv() {


    var x = document.getElementById("Youtube");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

  
}



function weather() {
    var apiKey = "b40fb4d8c92247a2bf8652cafce25f13";
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    var url = "https://api.forecast.io/forecast/";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        //console.log(url + apiKey + "/" + latitude + "," + longitude + "?callback=?");
        /*location.innerHTML =
          "Latitude is " + latitude + "° Longitude is " + longitude + "°";

        $.getJSON(
          url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
          function(data) {
            $("#weather").html(data.currently.temperature + "°F");
            $("#weather").html(data.minutely.summary);



          }
        );*/


        $.getJSON(
            url + apiKey + "/" + latitude + "," + longitude + "?callback=?",
            function(data) {
                console.log(data);
                $("#curr_weather").append("<span class ='curr_temp'>"+data.currently.temperature.toFixed(0)+" °F</span><span class ='curr_summary'>"+data.currently.summary+"</span>");
                for(i=0; i<7; i++) {
                    $("#weather_h").append("<div class='day_weather'><div class = 'day'>"+ days[new Date(data.daily.data[i].time*1000).getDay()] +"</div>"+
                        "<div class = 'w_icon'><img class = 'w_ic' src='./icons/"+data.daily.data[i].icon+".png'></img></div>"+
                        "<div class ='temps'><div class='dayTempMax'>"+ data.daily.data[i].temperatureMax.toFixed(0) +"°F</div>"+
                        "<div class='dayTempMin'>"+ data.daily.data[i].temperatureMin.toFixed(0) +"°F</div></div>"+
                        "</div>");
                    //$("#weather_h").append(data.hourly.data[i].time);
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
