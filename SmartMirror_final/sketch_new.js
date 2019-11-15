var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

let capture;


function setup() {
    var mirror = createCanvas(windowWidth, windowHeight);
    // createCanvas(windowWidth, windowHeight);
    mirror.parent("mirror");
    capture = createCapture(VIDEO);
    capture.size(windowWidth, windowHeight);
    capture.hide();

    // spotifyPlayer = document.getElementById("spotify");
    // spotifyPlayer.style.display = 'none';

}



function draw() {
    setTime();

    var mirror = createCanvas(windowWidth, windowHeight);
    mirror.parent("mirror");
    background(192,192,192,120);
    image(capture, 0, 0, windowWidth, windowHeight);
    // image(capture, 0, 0, windowWidth, windowHeight);
    // var mirror = createCanvas(windowsWidth, windowsHeight);
    //
    //drawFitChart();

}


function setTime() {
    var d =  new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    var newformat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    hours = hours % 12;

    // To display "0" as "12"
    hours = hours ? hours : 12;
    hours = minTwoDigits(hours);

    $(".date_and_time").html("<div class='time'>"+hours+":"+minTwoDigits(minutes)+"<span class ='newformat'> "+newformat+"</span></div><div class='date'><span class='curr_date'>"+days[d.getDay()]+", "+d.getDate()+" "+monthNames[d.getMonth()]+" "+d.getFullYear()+"</span></div>")
}
function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}

