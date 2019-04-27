// Tuna
// David Baik
// Tomorrow
//
// Extra for Experts:
// lots of sound stuff i hope
// 

//need

//want

// colour palette https://www.colourlovers.com/palette/292482/Terra

class Cell {
  constructor(){
    this.width = 15;
    this.height = 40;
    this.gridY = 6;
    this.gridX = 32;
  }
}

class Instrument {
  constructor(){
    this.sound;
  }
}


class Button {
  constructor(colour1, colour2, colour3, x, y, width, height, clickedFunction){
    this.colour1 = colour1;
    this.colour2 = colour2;
    this.colour3 = colour3;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.clicked = clickedFunction;

    this.mouse;
    this.alreadyClicked = false;
  }

  calcMouse() {//logic by Aric Leather
    this.mouse = (Math.abs(mouseX - this.x) <= this.width / 2 && Math.abs(mouseY - this.y) <= this.height / 2);
  }

  displayRect(){//helped by Aric Leather
    this.calcMouse();
    if(this.mouse && mouseIsPressed && !this.alreadyClicked) {
      this.clicked();
      this.alreadyClicked = true;
    }
    if(!mouseIsPressed) {
      this.alreadyClicked = false;
    }
    rectMode(CENTER);
    fill(this.colour1, this.colour2, this.colour3);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Slider {

}

class SlidingBar {
  constructor(){
    this.xcord = 0;
  }

  move(windWidth, windHeight, bpm){
  //visual slider when playState
    strokeWeight(1);
    if (this.xcord < windWidth){
      this.xcord+= bpm;
      line(this.xcord, 0, this.xcord, windHeight);
    } 
    else{
      this.xcord = 0;

    }
    if (this.xcord < 0){
      this.xcord = 0;
    }
  }

  play(){
    let xVal = this.xcord / cell.width;
    for (let i = 0; i < cell.gridY; i++){
      if (bars[i][xVal] !== 0 && bars[i][xVal] !== 1 && xVal % 1 === 0){
        bars[i][xVal].play(); 
      }
    }
  }
}





let button = new Button(0, 0, 0, 30, 270, 40, 40, function() {
  if (playState){
    playState = false;
  }
  else{
    playState = true;
  }
});

let hat = new Instrument();
let clap = new Instrument();
let ride = new Instrument();
let snare = new Instrument();
let kick = new Instrument();
let g808 = new Instrument();

let bars;
let cell = new Cell();

let note = cell.gridX / 4;
let pushed = 50;
let bottomPushed = 70;

let playState = true;
let inst;
let instLabel = ['Hat', 'Clap', 'Ride', 'Snare', 'Kick', '808'];
let smallBar = new SlidingBar;




function preload(){
  hat.sound = loadSound('assets/hat.wav');
  clap.sound = loadSound('assets/clap.wav');
  ride.sound = loadSound('assets/ride.wav');
  snare.sound = loadSound('assets/snare.wav');
  kick.sound = loadSound('assets/kick.wav');
  g808.sound = loadSound('assets/808.wav');
}

function setup() {
  frameRate(100);

  inst = [hat.sound, clap.sound, ride.sound, snare.sound, kick.sound, g808.sound];
  bars = createGrid(cell.gridY, note)

  createCanvas(windowWidth, windowHeight);

  strokeWeight(0.2);
  stroke('white');
}

function draw() {
  push();
    translate(pushed, 0);
    drawGrid(cell.gridX, cell.gridY);
    smallBar.play();
    smallBar.move(cell.width*cell.gridX, cell.height*cell.gridY, 3);
    if (!playState){
      smallBar.xcord = 0;
    }
  pop();
  stuffings();
  push();
  button.calcMouse();
  button.displayRect();
  pop();
  isntLabels();
}








function createGrid(Y, N){
  //creates the array
  let array = [];
  for (let i = 0; i < Y; i++){
    let rows = [];
    for (let j = 0; j < N; j++){
      for (let k = 0; k < 4; k++){
        rows.push(0);
      }
      for (let l = 0; l < 4; l++){
        rows.push(1);
      }
    }
    array.push(rows);
  }
  return array;
}

function drawGrid(X, Y){
  //draws the grid based on array, with alternating colours
  for (let i = 0; i < Y; i++){
    for (let j = 0; j < X; j++){
      if (bars[i][j] === 0){
        //dark
        fill(33, 33, 33);
      }
      else if(bars[i][j] === 1){
        //light
        fill(50, 50, 50);
      }
      else{
        fill(183,178,171);
      }
      rect(j*cell.width, i*cell.height, cell.width, cell.height);
    }
  }
}

function mouseClicked(){
  //change value in array based on location clicked
  let yVal = floor(mouseY / cell.height);
  let xVal = floor((mouseX - pushed) / cell.width);

  if (mouseX > pushed && mouseX < cell.width*cell.gridX && mouseY > 0 && mouseY < cell.height*cell.gridY){
    if (bars[yVal][xVal] === 0 || bars[yVal][xVal] === 1){
      bars[yVal][xVal] = inst[yVal];
    }
    else if ((xVal % 8) < 4){
      bars[yVal][xVal] = 0;
    }
    else{
      bars[yVal][xVal] = 1;
    }
  }
}

function keyTyped(){
  //space key sets position of slider
  if (key === " "){
    smallBar.xcord = mouseX - pushed;
  }
}

function stuffings(){
  //design stuff
  let underBarDowny = 60;
  let extendedPattern = 600;

  fill(3,22,52);//under the bars
  rect(0, cell.gridY*cell.height, cell.gridX*cell.width + pushed, underBarDowny);
  fill(232,221,203);//left most
  rect(0, 0, pushed, cell.height*cell.gridY);
  // fill(50, 50, 50);// butt
  // rect(0, cell.height*cell.gridY + underBarDowny, cell.gridX*cell.width + pushed + extendedPattern, height - cell.height*cell.gridY);
  // fill(232,221,203);// low cotton
  // rect(0, cell.height*cell.gridY + underBarDowny, width, 10);
  // fill(232,221,203);//left most bottom
  // rect(0, cell.height*cell.gridY + underBarDowny, bottomPushed, height - underBarDowny + cell.height*cell.gridY);
}

function isntLabels(){
  textSize(13);
  textAlign(CENTER);
  fill(0);
  for (let i = 0; i < 6; i++){
    text(instLabel[i], pushed/2, (cell.height/2)+cell.height*i);
  }
}