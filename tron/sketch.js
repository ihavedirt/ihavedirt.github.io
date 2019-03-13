// Tron
// David Baik
// Today
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let myFont;
let myGrid;
let	gx = 20;//grid x and y
let gy = 20;
let state = 0;//0 = lobby, 1 = game, 2 = red win, 3 = blue win
let directionStateR = 'right';
let directionStateB = 'left';
let timer = 0;
let lastTimer = 0;

function preload(){
  myFont = loadFont('assets/myFont.ttf');
}

function setup(){
  xR = 0;//red player spawn
  yR = 0;
  
  xB = gx-1;//blue player spawn
  yB = gy-1;
  
  createCanvas(20 * gx + 1, 20 * gy + 1);
  myGrid = generateGrid(gy, gx);
}

function draw(){//does this count as making draw loop neat?
  timer = millis();
  gameState();
  if (state === 1 && timer - lastTimer >= 300) {
    directionStateCheck();
    lastTimer = timer;
  }
}

function gameState(){//depending on the state of the game, the display will change
  if (state === 0){
    startScreen();
  }
  else if(state === 1){
    myGrid[xR][yR] = 1;
  	fill(200, 0, 0);
  	rect(xR * 20, yR * 20, 20, 20);
    
    myGrid[xB][yB] = 2;
  	fill(0, 0, 200);
  	rect(xB * 20, yB * 20, 20, 20);
  }
  else if (state === 2){
    directionStateR = 'right';
    directionStateB = 'left';
  	end('red');
  }
  else if (state === 3){
    directionStateR = 'right';
    directionStateB = 'left';
  	end('blue');
  }
}

function end(player){
  console.log('gameover, player ' + player + ' won');
  resetGrid(gx, gy);
  state = 0;
}
	

function generateGrid(gx, gy){//generates array and visual grid via nested loop//code is credited Mr. Schellenberg, but I fully understand the code
  let array = [];
  for (let i = 0; i < gy; i++){
   	let row = [];
    for (let j = 0; j < gx; j++){
      row.push(0);
    }
    array.push(row);
  }
  return array;
}

function resetGrid(gx, gy){//resets grid
  
  xR = 0;//red player spawn
  yR = 0;
  
  xB = gx-1;//blue player spawn
  yB = gy-1;
  
	for (let i = 0; i < gy; i++){//nested loop to shift all elements and push 0 again
  	for (let j = 0; j < gx; j++){
      myGrid[i].shift();
    	myGrid[i].push(0);
    }
  }
}

function startScreen(){//start screen display
  noStroke();
  frameRate(100);
  
  fill(125, 31, 58);
  rect(0, 0, width, height);
  
  fill(80, 31, 58);
  rect(0, 300, 400, 80, 5);
  
  fill(204, 204, 204);
  textFont(myFont);
  textSize(70);
  textAlign(LEFT);
  text('Start', 20, 320);
}

function mouseClicked(){//if start button clicked, draw grid and start game
	if (state === 0 && mouseX > 20 && mouseX < 210 && mouseY > 260 && mouseY < 330){
  	state = 1;
    stroke(0);
    for (i =0; i < gx; i++){
      for (j = 0; j < gy; j++){
        rect(i * 20, j * 20, 20, 20);
        fill('white');
      }
    }
  }
}

function keyTyped(){//idk how to simplify this, but basically the controls and lose condition
  if (state === 1){
    if (key === 'a'){
      directionStateR = 'left';
    }
    else if (key === 's'){
      directionStateR = 'down';
    }
    else if (key === 'd'){
      directionStateR = 'right';
    }
    else if (key === 'w'){
      directionStateR = 'up';
    }

    if (key === 'j'){
      directionStateB = 'left';
    }
    else if (key === 'k'){
      directionStateB = 'down';
    }
    else if (key === 'l'){
      directionStateB = 'right';
    }
    else if (key === 'i'){
      directionStateB = 'up';
    }
  }
}

function directionStateCheck(){
  if (directionStateR === 'up'){
    if (myGrid[xR][yR-1] === 0){
      yR--
    }
    else{
      state = 3
    }
  }
  else if (directionStateR === 'left'){
    if (myGrid[xR-1][yR] === 0){
      xR--
    }
    else{
      state = 3
    }
  }
  else if (directionStateR === 'right'){
    if (myGrid[xR+1][yR] === 0){
      xR++
    }
    else{
      state = 3
    }
  }
  else if (directionStateR === 'down'){
    if (myGrid[xR][yR+1] === 0){
      yR++
    }
    else{
      state = 3
    }
  }

  if (directionStateB === 'left'){
    if (myGrid[xB-1][yB] === 0){
      xB--
    }
    else{
      state = 2
    }
  }
  else if (directionStateB === 'right'){
    if (myGrid[xB+1][yB] === 0){
      xB++
    }
    else{
      state = 2
    }
  }
  else if (directionStateB === 'up'){
    if (myGrid[xB][yB-1] === 0){
      yB--
    }
    else{
      state = 2
    }
  }
  else if (directionStateB === 'down'){
    if (myGrid[xB][yB+1] === 0){
      yB++
    }
    else{
      state = 2
    }
  }
}

