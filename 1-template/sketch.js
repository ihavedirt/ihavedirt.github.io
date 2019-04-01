// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let balls;
let newBall;

function setup() {
  createCanvas(windowWidth, windowHeight);
  balls = [];
  newBall = {
    x: random(width),
    y: random(width),
    dx: random(-5, 5),
    dy: random(-5, 5),
    radius: random(10, 50),
    colour: (random(255), random(255), random(255))
  }
}

function draw() {
  background(220);
  console.log(key);

  newBall.x += newBall.dx;
  newBall.y += newBall.dy;

  fill(newBall.colour);
  noStroke();
  ellipse(newBall.x, newBall.y, newBall.radius*2, newBall.radius*2);
}