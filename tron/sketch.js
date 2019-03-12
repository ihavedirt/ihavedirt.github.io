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
state = 0;//0 = lobby, 1 = game, 2 = red win, 3 = blue win




function preload(){
  myFont = loadFont('assets/myFont.ttf');
}

function setup(){

  x = 0;//red player spawn
  y = 0;
  
  x1 = gx-1;//blue player spawn
  y1 = gy-1;
  
  createCanvas(20 * gx + 1, 20 * gy + 1);
  myGrid = generateGrid(gy, gx);
}

function draw(){//does this count as making draw loop neat?
  gameState();
  // console.log(x);
  // console.log(y);
  // console.log(x1);
  // console.log(y1);
}

function gameState(){//depending on the state of the game, the display will change
  if (state === 0){
    startScreen();
  }
  else if(state === 1){
    myGrid[x][y] = 1;
  	fill(200, 0, 0);
  	rect(x * 20, y * 20, 20, 20);
    
    myGrid[x1][y1] = 2;
  	fill(0, 0, 200);
  	rect(x1 * 20, y1 * 20, 20, 20);
  }
  else if (state === 2){
  	end('red');
  }
  else if (state === 3){
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
  
  x = 0;//red player spawn
  y = 0;
  
  x1 = gx-1;//blue player spawn
  y1 = gy-1;
  
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
      if (myGrid[x-1][y] === 0){
      	x--;
    	}
      else {
      	state = 3;
      }
  	}
		else if (key === 'd'){
      if (myGrid[x+1][y] === 0){
  			x++;
      }
      else {
      	state = 3;
      }
		}
		else if (key === 's'){
      if (myGrid[x][y+1] === 0){
   			y++;
      }
      else {
      	state = 3;
      }
		}
		else if (key === 'w'){
      if (myGrid[x][y-1] === 0){
	  		y--;
      }
      else {
      	state = 3;
      }
		}
  
    
  	if (key === 'j'){
      if (myGrid[x1-1][y1] === 0){
				x1--;
      }
      else {
      	state = 2;
      }
  	}
		else if (key === 'l'){
      if (myGrid[x1+1][y1] === 0){
	  		x1++;
      }
      else {
      	state = 2;
      }
		}
		else if (key === 'k'){
      if (myGrid[x1][y1+1] === 0){
   			y1++;
      }
      else {
      	state = 2;
      }
		}
		else if (key === 'i'){
      if (myGrid[x1][y1-1] === 0){
	  		y1--;
      }
      else {
      	state = 2;
      }
  	}
  	// else if (key === 'm'){
  	// 	console.log(myGrid);
  	// }
  }
}


