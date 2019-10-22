let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide(); 
}

function draw() {
  background(192,192,192,120);
  image(capture, 0, 0, windowWidth, windowHeight);
   

  
    stroke(192,192,192,100); 
   // Set the stroke width 
    strokeWeight(15); 
      
    // Set the filled color 
    
      
    
    fill(192,192,192,10);
  
   rect(10, 10,windowWidth-40, windowHeight-100,10);
  
  
  //filter(INVERT);
}
function mouseClicked() { 
    save('cap.png');
} 
