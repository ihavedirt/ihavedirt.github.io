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
    this.gridX = 50;
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






function preload(){
}

function setup() {
  myGrid = createGrid(cellVar.gridX, cellVar.gridY)
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  timer = millis();
  // push();
  //   translate(pushed, 0);
  drawGrid(cellVar.gridX, cellVar.gridY);
    if (play && timer - lastTimer >= 100) {
      movingBar();
      lastTimer = timer;
    }
  // pop();
  fill(255);
  rect(0, cellVar.gridY*cellVar.height, cellVar.gridX*cellVar.width + pushed, 100);
}





function movingBar(){
  let xcord = 0;
  if (play){
    if (xcord > cellVar.width*cellVar.gridX){
        xcord+= 0.1;
        line(xcord, 0, xcord, cellVar.height*cellVar.gridY);
    }
    else{
      xcord = 0;
    }
  }
}

function createGrid(X, Y){
  let array = [];
  for (let i = 0; i < X; i++){
    let rows = [];
    for (let j = 0; j < Y; j++){
      rows.push(0);
    }
    array.push(rows);
  }
  return array;
}

function drawGrid(X, Y){
  stroke('grey');
  for (let i = 0; i < X; i++){
    for (let j = 0; j < Y; j++){
      if (myGrid[i][j] === 0){
        fill(255);
      }
      else{
        fill(0);
      }
      rect(i*cellVar.width, j*cellVar.height, cellVar.width, cellVar.height);
    }
  }
}

function mouseClicked(){
  let yVal = floor(mouseY / cellVar.height);
  let xVal = floor(mouseX / cellVar.width);
  
  if (myGrid[xVal][yVal] === 0){
    myGrid[xVal][yVal] = 1;
  }
  else{
    myGrid[xVal][yVal] = 0;
  }
  console.log(myGrid);
}
