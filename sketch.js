let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();
    
   
}

function draw() {
  
    image(capture, 0, 0, windowWidth, windowHeight);
 
}