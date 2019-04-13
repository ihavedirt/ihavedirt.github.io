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

  // amp(){

  // }
}

class Button {

}

class Slider {

}






let hat = new Instrument;
let clap = new Instrument;
let ride = new Instrument;
let snare = new Instrument;
let kick = new Instrument;
let g808 = new Instrument;

let bars;
let cell = new Cell();

let note = cell.gridX / 4;
let pushed = 50;
let timer, lastTimer = 0;

let barXcord = 0;
let playState = true;
let inst;





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
  timer = millis();
  push();
    translate(pushed, 0);
    drawGrid(cell.gridX, cell.gridY);
    if (playState && timer - lastTimer >= 10) {
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
  //visual slider when playState
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
  //plays the bars
  let xVal = floor(barXcord / cell.width);
  for (let i = 0; i < cell.gridY; i++){
    // bars[i][xVal].play(); 
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
  
  if (bars[yVal][xVal] === 0 || bars[yVal][xVal] === 1){
    bars[yVal][xVal] = inst[yVal];
  }
  else if ((xVal % 8) < 4){
    bars[yVal][xVal] = 0;
  }
  else{
    bars[yVal][xVal] = 1;
  }
  console.log(bars);
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
  // fill(50, 50, 50);// butt
  // rect(0, cell.height*cell.gridY + underBarDowny, width, height - cell.height*cell.gridY);
  // fill(232,221,203);// low cotton
  // rect(0, cell.height*cell.gridY + underBarDowny, width, 10);
}