let capture;
var spotifyPlayer;



function setup() {
createCanvas(windowWidth, windowHeight);
capture = createCapture(VIDEO);
capture.size(320, 240);
    capture.hide(); 
    spotifyPlayer = document.getElementById("spotify");
    spotifyPlayer.style.display = 'none';
}

function draw() {
background(192,192,192,120);
image(capture, 0, 0, windowWidth, windowHeight);
stroke(192,192,192,100); 
// Set the stroke width 
    strokeWeight(15);

    

}
function selfieCapture() { 
save('cap.png');
}
<<<<<<< HEAD

function showMusic() {

    if (spotifyPlayer.style.display === "none") {
        spotifyPlayer.style.display = "block";
    }
    else {
        spotifyPlayer.style.display = "none";
    }
}



=======
//function mouseClicked() { 
//    save('cap.png');
//} 
>>>>>>> b13a7b43ec2e4dd7d35febe81cc615573710287d
