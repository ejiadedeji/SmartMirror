var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var spotifyPlayer;
//let news;
let news_pos;
let capture;

//mirror
var mirror = function (p) { // p could be any variable name
    p.setup = function () {
        p.createCanvas(windowWidth, windowHeight);
        p.capture = createCapture(VIDEO);
        p.capture.size(windowWidth, windowHeight);
        p.capture.hide();
    };

    p.draw = function () {
        p.background(0);
        p.image(p.capture, 0, 0, windowWidth, windowHeight);

    };
};
var myp5 = new p5(mirror, 'mirror');

// Fit chart drawing
var fitchart = function (p) {
    p.setup = function () {
        p.createCanvas(200, 200);


    };

    p.draw = function () {
        if (steps_data.length == 7) {
            p.fill(255);
            var data = steps_data;
            var width = 200, height = 200, margin = 50, w = width - 2 * margin, h = height - 2 * margin;
            var barWidth = (h / data.length) * 0.9;//widthofbar
            var barMargin = (h / data.length) * 0.2;//marginbetweentwobars
            p.textSize(14);
            p.push();
            p.translate(margin, margin);
            for (var i = 0; i < data.length; i++) {
                p.push();
                p.fill('steelblue');
                p.noStroke();
                p.translate(0, i * (barWidth + barMargin));
                var lt = map(data[i][1], 0, 10000, 0, 200);
                p.rect(0, 0, lt, barWidth);//drawrect

                p.fill('#FFF');
                p.text(data[i][1], 0, barWidth / 2 + 5);//writedata
                p.text(data[i][0], -50, barWidth / 2 + 5);//writedata
                p.pop();
            }
        }
    }

}

var myp5 = new p5(fitchart, 'gfit');


function setup() {
    loadJSON("https://newsapi.org/v2/top-headlines?country=us&apiKey=ba248bee93154051949ceca174da0069", getNews);
}


function draw() {
    setTime();
}

function getNews(data) {
    news = data;
    if (news) {
        news_pos = parseInt(Math.random(news.articles.length)*10);
        document.getElementById("news").innerHTML = news.articles[news_pos].title;
    }
}

window.setInterval(function () {
    news_pos = parseInt(Math.random(news.articles.length)*10);
    $("#news").text(news.articles[news_pos].title);
}, 3000);


function selfieCapture() {
    save('cap.png');
}

function showMusic() {

    if (spotifyPlayer.style.display === "none") {
        spotifyPlayer.style.display = "block";
    } else {
        spotifyPlayer.style.display = "none";
    }
}


function setTime() {
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    var newformat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    hours = minTwoDigits(hours);

    $("#time").html("<div class='time'>" + hours + ":" + minTwoDigits(minutes) + "<span class ='newformat'> " + newformat + "</span></div><div class='date'><span class='curr_date'>" + days[d.getDay()] + ", " + d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear() + "</span></div>")
}

function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}

function displayTweet(){
    setTimeout(function(){
    var ids = ['1193762791569723392','1193751973465600001','1193747063982510080','1193749300855091200','1193731157634035714']
    for(i=0;i<ids.length;i++){
    twttr.widgets.createTweet(
  ids[i],
  document.getElementById('twitter'),
    {
    theme: 'dark'
    }
    );
    }
    },2000);
}