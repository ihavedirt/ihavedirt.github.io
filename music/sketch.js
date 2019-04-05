// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridY = 100;
let gridX = 12;
let myGrid;

class cellSize {
  

}

function setup() {
  myGrid = createGrid(gridX, gridY)
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  drawGrid(gridX, gridY);
  rect(0, 0, 400, 40*gridX);
}


function createGrid(X, Y){
  let array = [];
  for (i = 0; i < Y; i++){
    let rows = [];
    for (j = 0; j < X; j++){
      rows.push(0);
    }
    array.push(rows);
  }
  return array;
}

function drawGrid(X, Y){
  push();
  translate(400, 0);
  stroke('grey');
  fill(255);
  for (i = 0; i < X; i++){
    for (j = 0; j < Y; j++){
      rect(j*15, i*40, 15, 40);
    }
  }
  pop();
}

function mouseClicked(){
  translate(400, 0);
  let yVal = floor(mouseY / 40);
  let xVal = floor(mouseX / 15);

  myGrid[yVal][xVal] = 1;
}