// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// colour palette https://www.colourlovers.com/palette/292482/Terra

class cell {
  constructor(){
    this.width = 15;
    this.height = 40;
    this.gridY = 6;
    this.gridX = 32;
  }
}

class hat {
  constructor(){
  }
}

class kick {
  constructor(){
  }
}

class clap {
  constructor(){
  }
}

class bass {
  constructor(){
  }
}

class OH {
  constructor(){
  }
}


let sheet;
let cellVar = new cell();

let note = cellVar.gridX / 4;
let pushed = 50;
let timer, lastTimer = 0;

let barXcord = 0;
let play = true;





function preload(){
}

function setup() {
  frameRate(100);
  sheet = createGrid(cellVar.gridY, note)
  createCanvas(windowWidth, windowHeight);
  strokeWeight(0.2);
  stroke('white');
}

function draw() {
  timer = millis();
  push();
    translate(pushed, 0);
    drawGrid(cellVar.gridX, cellVar.gridY);
    slider();
  pop();
  stuffings();
}







function slider(){
  strokeWeight(1);
  if (play && timer - lastTimer >= 10) {
    if (barXcord < cellVar.width*cellVar.gridX){
      barXcord+= 2;
      line(barXcord, 0, barXcord, cellVar.height*cellVar.gridY);
    } 
    else{
      barXcord = 0;
    }
    lastTimer = timer;
  }
  else{
    barXcord = 0;
  }
  if (barXcord < 0){
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
      if (sheet[i][j] === 0){
        //dark
        fill(33, 33, 33);
      }
      else if(sheet[i][j] === 1){
        //light
        fill(50, 50, 50);
      }
      else{
        fill(232,221,203);
      }
      rect(j*cellVar.width, i*cellVar.height, cellVar.width, cellVar.height);
    }
  }
}

function mouseClicked(){
  let yVal = floor(mouseY / cellVar.height);
  let xVal = floor((mouseX - pushed) / cellVar.width);
  
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
  if (key === "q"){
    barXcord = mouseX - pushed;
  }
}

function stuffings(){
  let underBarDowny = 60;

  fill(3,22,52);//under the bars
  rect(0, cellVar.gridY*cellVar.height, cellVar.gridX*cellVar.width + pushed, underBarDowny);
  fill(232,221,203);//left most
  rect(0, 0, pushed, cellVar.height*cellVar.gridY);
  // fill(232,221,203);// big butt
  // rect(0, cellVar.height*cellVar.gridY + underBarDowny, width, height - cellVar.height*cellVar.gridY);
  // fill(205,179,128);// bottom cotton
  // rect(0, cellVar.height*cellVar.gridY + underBarDowny, width, 30);
}

// function player(){
//   for (let i = 0; i < gridY-1; i++){
//     for (let j = 0; j < gridX; j++){
//       //play.sheet[i][j]
//       }
//     }
//   }
// }