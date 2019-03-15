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
let state = 0;//0 = lobby, 1 = game, 2 = red win screen, 3 = blue win screen
let directionStatePlayerOne;
let directionStatePlayerTwo;
let timer = 0;
let lastTimer = 0;

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

function draw(){//does this count as making draw loop neat?
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
    directionStatePlayerOne = random(['right', 'down']);
    directionStatePlayerTwo = random(['left', 'up']);
  	end('yellow');
  }
  else if (state === 3){
    directionStatePlayerOne = random(['right', 'down']);
    directionStatePlayerTwo = random(['left', 'up']);
  	end('blue');
  }
}

function end(player){
  fill('white');
  rect(0, 0, width, height);

  fill('black');
  textFont(myFont);
  textSize(30);
  textAlign(CENTER);
  text('gameover, player ' + player + ' won', width/2, height/2);
  //how to make this show for a short amount of time

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
  
  playerOneX = 0;//red player spawn
  playerOneY = 0;
  
  playerTwoX = gx-1;//blue player spawn
  playerTwoY = gy-1;
  
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
  rect(0, 300, 400, 80);
  
  fill(204, 204, 204);
  textFont(myFont);
  textSize(70);
  textAlign(LEFT);
  text('Start', 20, 320);
}

function mouseClicked(){//if start button clicked, draw grid and start game
	if (state === 0 && mouseX > 20 && mouseX < 210 && mouseY > 260 && mouseY < 330){
  	state = 1;
    stroke(150,219,236);
    for (i =0; i < gx; i++){
      for (j = 0; j < gy; j++){
        rect(i * 20, j * 20, 20, 20);
        fill(137,219,236);
      }
    }
  }
  else if(state === 2 || sate === 3 && mouse)//end screen for restart or menu screen
}

function keyTyped(){//idk how to simplify this, but basically the controls and lose condition
  if (state === 1){
    if (key === 'a'){
      directionStatePlayerOne = 'left';
    }
    else if (key === 's'){
      directionStatePlayerOne = 'down';
    }
    else if (key === 'd'){
      directionStatePlayerOne = 'right';
    }
    else if (key === 'w'){
      directionStatePlayerOne = 'up';
    }

    if (key === 'j'){
      directionStatePlayerTwo = 'left';
    }
    else if (key === 'k'){
      directionStatePlayerTwo = 'down';
    }
    else if (key === 'l'){
      directionStatePlayerTwo = 'right';
    }
    else if (key === 'i'){
      directionStatePlayerTwo = 'up';
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

