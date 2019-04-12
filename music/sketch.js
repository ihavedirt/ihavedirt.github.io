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

class cellC {
  constructor(){
    this.width = 15;
    this.height = 40;
    this.gridY = 6;
    this.gridX = 32;
  }
}

class hatC {
  constructor(){
    this.sound;
  }
}

class clapC {
  constructor(){
    this.sound;
  }
}

class rideC {
  constructor(){
    this.sound;
  }
}

class snareC {
  constructor(){
    this.sound;
  }
}

class kickC {
  constructor(){
    this.sound;
  }
}

class g808C {
  constructor(){
    this.sound;
  }
}






let hat = new hatC;
let clap = new clapC;
let ride = new rideC;
let snare = new snareC;
let kick = new kickC;
let g808 = new g808C;

let sheet;
let cell = new cellC();

let note = cell.gridX / 4;
let pushed = 50;
let timer, lastTimer = 0;

let barXcord = 0;
let play = true;






function preload(){
  // hat.sound = loadSound('assets/hat.wav');
  // clap.sound = loadSound('assets/clap.wav');
  // ride.sound = loadSound('assets/ride.wav');
  // snare.sound = loadSound('assets/snare.wav');
  // kick.sound = loadSound('assets/kick.wav');
  // g808.sound = loadSound('assets/808.wav');
}

function setup() {
  frameRate(100);
  sheet = createGrid(cell.gridY, note)
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0.2);
  stroke('white');
}

function draw() {
  timer = millis();
  push();
    translate(pushed, 0);
    drawGrid(cell.gridX, cell.gridY);
    if (play && timer - lastTimer >= 10) {
      player();
      slider();
    }
    else{
      barXcord = 0;
    }
  pop();
  stuffings();
}






function slider(){
  //visual slider when play
  strokeWeight(1);
  if (barXcord < cell.width*cell.gridX){
    barXcord+= 2;
    line(barXcord, 0, barXcord, cell.height*cell.gridY);
  } 
  else{
    barXcord = 0;
  }
  lastTimer = timer;
  }
  if (barXcord < 0){
    barXcord = 0;
  }

function player(){
  //plays 
  if (play){
    for (let i = 0; i < cell.gridY; i++){
      for (let j = 0; j < cell.gridX; j++){
        sheet[i][j].play;
      }
    }
  }
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
      if (sheet[i][j] === 0){
        //dark
        fill(33, 33, 33);
      }
      else if(sheet[i][j] === 1){
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
  
  if (sheet[yVal][xVal] === 0 || sheet[yVal][xVal] === 1){
    sheet[yVal][xVal] = 3;
  }
  else if ((xVal % 8) < 4 && sheet[yVal][xVal] === 3){
    sheet[yVal][xVal] = 0;
  }
  else{
    sheet[yVal][xVal] = 1;
  }
  console.log(sheet);
}

function keyTyped(){
  //space key sets position of slider
  if (key === " "){
    barXcord = mouseX - pushed;
  }
}

function stuffings(){
  //design stuff
  let underBarDowny = 60;

  fill(3,22,52);//under the bars
  rect(0, cell.gridY*cell.height, cell.gridX*cell.width + pushed, underBarDowny);
  fill(232,221,203);//left most
  rect(0, 0, pushed, cell.height*cell.gridY);
  // fill(232,221,203);// butt
  // rect(0, cell.height*cell.gridY + underBarDowny, width, height - cell.height*cell.gridY);
  // fill(205,179,128);// bottom cotton
  // rect(0, cell.height*cell.gridY + underBarDowny, width, 30);
}