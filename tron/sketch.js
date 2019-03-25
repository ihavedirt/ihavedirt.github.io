// Tron
// David Baik
// Today
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let myFont;
let myGrid;
let music;
let	gx = 22;//grid x and y
let gy = 22;
let state = 0;//0 = lobby, 1 = game, 2 = Orange win screen, 3 = Red win screen
let directionStatePlayerOne, directionStatePlayerTwo;
let timer = 0;
let lastTimer = 0;
let keyInPlayerOne = ['w', 'a', 's', 'd'];
let keyInPlayerTwo = ['i', 'j', 'k', 'l'];
let direcOut = ['up', 'left', 'down', 'right'];

function preload(){
  myFont = loadFont('assets/myFont.ttf');
  music = loadSound('assets/music1.mp3');
}

function setup(){
  //start by making grid and setting starting pos of players
  resetPos();
  createCanvas(20 * gx + 1, 20 * gy + 1);
  myGrid = generateGrid(gy, gx);
  music.play();
}

function draw(){
  //gamestates as well as looping the movement
  timer = millis();
  gameState();
  if (state === 1 && timer - lastTimer >= 100) {
    directionStateCheck();
    lastTimer = timer;
  }
}

function gameState(){
  //depending on the state of the game, the display will change
  if (state === 0){
    startScreen();
  }
  else if(state === 1){
    myGrid[playerOneX][playerOneY] = 1;
    fill(225, 134, 66);
  	rect(playerOneX * 20, playerOneY * 20, 20, 20);
    
    myGrid[playerTwoX][playerTwoY] = 2;
    fill(195, 54, 44);
    rect(playerTwoX * 20, playerTwoY * 20, 20, 20);
    
    tieCheck();
  }
  else if (state === 2){
  	end('Orange');
  }
  else if (state === 3){
  	end('Red');
  }
  else if (state === 4){
    end('Both');
  }
}

function end(player){
  //depending on who won, the display will change
  fill(129, 108, 91);
  rect(0, 0, width, height);
  if (player === 'Orange'){
    //player orange wins
    fill(244, 220, 181);
    rect(5, 5, width-10, height/2);
    
    fill(255, 134, 66);
    rect(5, height/2, width-10, height/2-5);
  }
  else if(player === 'Red'){
    //player red wins
    fill(244, 220, 181);
    rect(5, 5, width-10, height/2);
    
    fill(195, 54, 44);
    rect(5, height/2, width-10, height/2-5);
  }
  else{
    fill(255, 134, 66);
    rect(5, 5, width-10, height/2);
    
    fill(195, 54, 44);
    rect(5, height/2, width-10, height/2-5);
  }
  //text for both screens
  fill('black');
  noStroke();
  textFont(myFont);
  textSize(30);
  textAlign(CENTER);

  text('Gameover, ' + player + ' Won!', width/2, height/2 + 8);

  textSize(20);
  fill('black');
  text('Restart', width/2, height/4);
  text('Main Menu', width/2, height - height/4);
}
	

function generateGrid(gx, gy){
  //generates array via nested loop//code is credited Mr. Schellenberg, but I fully understand the code
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

function resetPos(){
  playerOneX = 1;//Orange player spawn
  playerOneY = 1;
  directionStatePlayerOne = random(['right', 'down']);
  
  playerTwoX = gx-2;//Red player spawn
  playerTwoY = gy-2;
  directionStatePlayerTwo = random(['left', 'up']);
}

function resetGrid(gx, gy){
  //resets grid
  resetPos();

  //nested loop to shift all elements and push 0 again
	for (let i = 0; i < gy; i++){
  	for (let j = 0; j < gx; j++){
      myGrid[i].shift();
    	myGrid[i].push(0);
    }
  }
}

function startScreen(){
  //start screen display
  strokeWeight(4);
  stroke(129, 108, 91);
  frameRate(100);
  
  fill(244, 220, 181);
  rect(0, 0, width, height);
  
  fill(195, 54, 44);
  rect(0, 300, width, 80);
  
  fill('black');
  textFont(myFont);
  textSize(70);
  textAlign(LEFT);
  text('Start', 20, 320);
}

function mouseClicked(){
	if (state === 0 && mouseX > 20 && mouseX < 210 && mouseY > 260 && mouseY < 330){
    //if start button clicked, draw grid and start game
    state = 1;
    strokeWeight(2);
    drawGrid();
  }
  else if((state === 2 || state === 3 || state === 4) && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height/2){
    //restarts game after gameover
    state = 1;
    resetGrid(gx, gy);
    drawGrid();
  }
  else if((state === 2 || state === 3 || state === 4) && mouseX > 0 && mouseX < width && mouseY > height/2 && mouseY < height){
    //back to menu after gameover
    state = 0;
    resetGrid(gx, gy);
  }
}

function drawGrid(){
  //draws the grid
  fill(129, 108, 91);
  rect(0, 0, width, height);
  stroke(129, 109, 91);
    for (i = 1; i < gx-1; i++){
      for (j = 1; j < gy-1; j++){
        rect(i * 20, j * 20, 20, 20);
        fill(244, 220, 181);
      }
    }
}

function tieCheck(){
  if (playerOneX === playerTwoX && playerOneY ===playerTwoY){
    state = 4;
  }
}

function keyTyped(){
  //checks the input of key and matches a direction with it
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
  //lose condition as well as movement for player orange
  if (playerOneX > 0 && playerOneX < gx-1 && playerOneY > 0 && playerOneY < gy-1){
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
    else if (directionStatePlayerOne === 'down'){
      if (myGrid[playerOneX][playerOneY+1] === 0){
        playerOneY++
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
  }
  else{
    state = 3
  }

  if(playerTwoX > 0 && playerTwoX < gx-1 && playerTwoY > 0 && playerTwoY < gy-1){
    //lose condition as well as movement for player red
    if (directionStatePlayerTwo === 'up'){
      if (myGrid[playerTwoX][playerTwoY-1] === 0){
        playerTwoY--
      }
      else{
        state = 2
      }
    }
    else if (directionStatePlayerTwo === 'left'){
      if (myGrid[playerTwoX-1][playerTwoY] === 0){
        playerTwoX--
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
    else if (directionStatePlayerTwo === 'right'){
      if (myGrid[playerTwoX+1][playerTwoY] === 0){
        playerTwoX++
      }
      else{
        state = 2
      }
    }
  }
  else{
    state = 2
  }
}

