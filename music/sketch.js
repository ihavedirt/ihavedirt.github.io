// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class cell {
  constructor(){
    this.width = 15;
    this.height = 40;
    this.gridY = 8;
    this.gridX = 32;
  }
}

class drum {
  constructor(){
  }
}

let myGrid;
let cellVar = new cell();
let play = true;
let pushed = 50;
let timer, lastTimer = 0;
let barXcord
let note = 8




function preload(){
}

function setup() {
  myGrid = createGrid(cellVar.gridY, note)
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  strokeWeight(0.2);
  stroke('white');
  timer = millis();
  push();
    translate(pushed, 0);
    drawGrid(cellVar.gridX, cellVar.gridY);
    if (play && timer - lastTimer >= 100) {
      movingBar();
      lastTimer = timer;
    }
  pop();
  fill('grey');
  rect(0, cellVar.gridY*cellVar.height, cellVar.gridX*cellVar.width + pushed, 100);
}





function movingBar(){
  if (barXcord > cellVar.width*cellVar.gridX){
      barXcord+= 0.1;
      line(barXcord, 0, barXcord, cellVar.height*cellVar.gridY);
  }
  else{
    barXcord = 0;
  }
}

function createGrid(Y, N){
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
  for (let i = 0; i < Y; i++){
    for (let j = 0; j < X; j++){
      if (myGrid[i][j] === 0){
        fill(71, 79, 79);
      }
      else if(myGrid[i][j] === 1){
        fill(115, 130, 130);
      }
      else{
        fill('black');
      }
      rect(j*cellVar.width, i*cellVar.height, cellVar.width, cellVar.height);
    }
  }
}

function mouseClicked(){
  let yVal = floor(mouseY / cellVar.height);
  let xVal = floor((mouseX - pushed) / cellVar.width);
  
  if (myGrid[yVal][xVal] === 0 || myGrid[yVal][xVal] === 1){
    myGrid[yVal][xVal] = 3;
  }
  else{
    myGrid[yVal][xVal] = 1;
  }
  console.log(myGrid);
}
