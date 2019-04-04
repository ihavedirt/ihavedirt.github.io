// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridY = 30;
let gridX = 7;
let myGrid;



function setup() {
  myGrid = createGrid(gridX, gridY)
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  drawGrid(gridX, gridY);
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
  stroke('grey');
  for (i = 0; i < Y; i++){
    for (j = 0; j < X; j++){
      rect(i*20, j*20, 20, 20);
    }
  }
}