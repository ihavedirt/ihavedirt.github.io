// Tron
// David Baik
// Today
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let myFont;
let myGrid;
let	gx = 25;//grid x and y
let gy = 25;
let state = 0;//0 = lobby, 1 = game, 2 = red win screen, 3 = blue win screen
let directionStatePlayerOne;
let directionStatePlayerTwo;
let timer = 0;
let lastTimer = 0;
let keyInPlayerOne = ['w', 'a', 's', 'd'];
let keyInPlayerTwo = ['i', 'j', 'k', 'l'];
let direcOut = ['up', 'left', 'down', 'right'];

function preload(){
  myFont = loadFont('assets/myFont.ttf');
}

function setup(){
  playerOneX = 0;//red player spawn
  playerOneY = 0;
  directionStatePlayerOne = random(['right', 'down']);

  playerTwoX = gx-1;//blue player spawn
  playerTwoY = gy-1;
  directionStatePlayerTwo = random(['left', 'up']);

  createCanvas(20 * gx + 1, 20 * gy + 1);
  myGrid = generateGrid(gy, gx);
}

function draw(){
  timer = millis();
  gameState();
  if (state === 1 && timer - lastTimer >= 200) {
    directionStateCheck();
    lastTimer = timer;
  }
}

function gameState(){//depending on the state of the game, the display will change
  if (state === 0){
    startScreen();
  }
  else if(state === 1){
    myGrid[playerOneX][playerOneY] = 1;
  	fill(250, 157, 0);
  	rect(playerOneX * 20, playerOneY * 20, 20, 20);
    
    myGrid[playerTwoX][playerTwoY] = 2;
  	fill(0, 104, 132);
  	rect(playerTwoX * 20, playerTwoY * 20, 20, 20);
  }
  else if (state === 2){
  	end('Yellow');
  }
  else if (state === 3){
  	end('Blue');
  }
}

function end(player){
  fill('maroon');
  rect(0, 0, width, height/2);
  
  fill('red');
  rect(0, height/2, width, height);

  noStroke();
  fill('black');
  textFont(myFont);
  textSize(30);
  textAlign(CENTER);
  text('Gameover, Player ' + player + ' Won', width/2, height/2);

  text('Restart', width/2, height/4);

  text('Main Menu', width/2, height - height/4);
}
	

function generateGrid(gx, gy){//generates array via nested loop//code is credited Mr. Schellenberg, but I fully understand the code
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
  playerOneX = 0;//red player spawn
  playerOneY = 0;
  directionStatePlayerOne = random(['right', 'down']);
  
  playerTwoX = gx-1;//blue player spawn
  playerTwoY = gy-1;
  directionStatePlayerTwo = random(['left', 'up']);

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
  
  fill(145, 39, 143);
  rect(0, 0, width, height);
  
  fill(110, 0, 108);
  rect(0, 300, width, 80);
  
  fill(204, 204, 204);
  textFont(myFont);
  textSize(70);
  textAlign(LEFT);
  text('Start', 20, 320);
}

function mouseClicked(){//if start button clicked, draw grid and start game
	if (state === 0 && mouseX > 20 && mouseX < 210 && mouseY > 260 && mouseY < 330){
    state = 1;
    drawGrid();
  }
  else if(state === 2 || state === 3 && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height/2){
    state = 1;
    resetGrid(gx, gy);
    drawGrid();
  }
  else if(state === 2 || state === 3 && mouseX > 0 && mouseX < width && mouseY > height/2 && mouseY < height){
    state = 0;
    resetGrid(gx, gy);
  }
}

function drawGrid(){
  stroke(150,219,236);
    for (i =0; i < gx; i++){
      for (j = 0; j < gy; j++){
        rect(i * 20, j * 20, 20, 20);
        fill(137,219,236);
      }
    }
}

function keyTyped(){
  if (state === 1){
  	if (keyInPlayerOne.indexOf(key) > -1){
      directionStatePlayerOne = direcOut[keyInPlayerOne.indexOf(key)]
    }
    if (keyInPlayerTwo.indexOf(key) > -1){
      directionStatePlayerTwo = direcOut[keyInPlayerTwo.indexOf(key)]
    }
  }
}

function directionStateCheck(){
  if (directionStatePlayerOne === 'up'){
    if (myGrid[playerOneX][playerOneY-1] === 0){
      playerOneY--
    }
    else{
      state = 3
    }
  }
  else if (directionStatePlayerOne === 'left'){
    if (myGrid[playerOneX-1][playerOneY] === 0){
      playerOneX--
    }
    else{
      state = 3
    }
  }
  else if (directionStatePlayerOne === 'right'){
    if (myGrid[playerOneX+1][playerOneY] === 0){
      playerOneX++
    }
    else{
      state = 3
    }
  }
  else if (directionStatePlayerOne === 'down'){
    if (myGrid[playerOneX][playerOneY+1] === 0){
      playerOneY++
    }
    else{
      state = 3
    }
  }

  if (directionStatePlayerTwo === 'left'){
    if (myGrid[playerTwoX-1][playerTwoY] === 0){
      playerTwoX--
    }
    else{
      state = 2
    }
  }
  else if (directionStatePlayerTwo === 'right'){
    if (myGrid[playerTwoX+1][playerTwoY] === 0){
      playerTwoX++
    }
    else{
      state = 2
    }
  }
  else if (directionStatePlayerTwo === 'up'){
    if (myGrid[playerTwoX][playerTwoY-1] === 0){
      playerTwoY--
    }
    else{
      state = 2
    }
  }
  else if (directionStatePlayerTwo === 'down'){
    if (myGrid[playerTwoX][playerTwoY+1] === 0){
      playerTwoY++
    }
    else{
      state = 2
    }
  }
}

