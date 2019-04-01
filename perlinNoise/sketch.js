// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let time = 0;
let rectWidth;
let numberOfRects;
let rects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRects = width;
  rectWidth = width/numberOfRects;
  generateInitialTerrain();
}

function draw() {
  background(220);

  rects.shift();

  let rectHeight = noise(time) * height; 
  myRect = {
    height: rectHeight,
    width: rectWidth,
    x: width - rectWidth,
    y: height - rectHeight,
  };
  rects.push(myRect);
  time += 0.0015;

  for (let i = 0; i < rects.length; i ++){
    rects[i].x -= rectWidth;
    rect(rects[i].x, rects[i].y, rects[i].width, rects[i].height);
  }
}

function generateInitialTerrain(){
  for (i = 0; i < numberOfRects; i++){
    let rectHeight = noise(time) * height; 
    myRect = {
      height: rectHeight,
      width: rectWidth,
      x: i * rectWidth,
      y: height - rectHeight,
    };
    rects.push(myRect);
    time += 0.0015;
  }
}