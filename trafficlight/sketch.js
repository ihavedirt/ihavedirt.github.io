// Traffic Light Starter Code
// Dan Schellenberg
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

let timer;

function setup() {
  createCanvas(600, 600);

}

function draw() {
  timer = millis() % 7000
  background(255);
  drawOutlineOfLights();
  lightsCycling();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function lightsCycling() {
  if (timer >= 0 && timer <= 3000){
    fill('green');
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  else if(timer >=3001 && timer <= 4000){
    fill('yellow');
    ellipse(width/2, height/2, 50, 50); //middle
  }
  else if(timer >= 4001 && timer <= 7000){
    fill('red');
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}
