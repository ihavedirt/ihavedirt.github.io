function draw() {
  // main draw loop consisting of functions that need to be called constantly
  pickingGameState();
}


function pickingGameState() {
  // determines what draw functions should be called based on what the game state is
  if (gameState === "mainMenu") {
    mainMenu();
  }
  else if (gameState === "game") {
    assignTiles();
    spellStuff();
    countingTime();
    showPlayer(playerX, playerY);
  }
}

function mainMenu() {
  // The main menu that shows up when you first start the page
  fill(0);
  textSize(width/7);
  text("Wizard Game", width/2, height/2)
  textSize(width/10);
  text("Press a number 1 to 5", width/2, height - height/3);
}

function assignTiles() {
  // combined with the showTiles function, this assigns and displays an image depending on array
  for (let y = 0; y < amountOfTiles; y++) {
    for (let x = 0; x < amountOfTiles; x++) {
      showTiles(x, y);
    }
  }
}

function showTiles(x, y) {
  // displays an image based on what the given spot is in an array (for ex. grey square if the spot
  // in the array contains a ".", which is the background)
  if (field[x][y] === ".") {
    fill(122, 122, 122);
    rect(x * tileSize, y * tileSize, tileSize, tileSize);
  }
  else if (field[x][y] === "#") {
    fill(50, 40, 40);
    rect(x * tileSize, y * tileSize, tileSize, tileSize);
  }
  else if (field[x][y] === "f") {
    fill(255, 0, 0);
    rect(x * tileSize, y * tileSize, tileSize, tileSize);
  }
  else if (field[x][y] === "w") {
    fill(0,191,255);
    rect(x * tileSize, y *tileSize, tileSize, tileSize);
  }
  else if (field[x][y] === "g") {
    fill(0,255,0);
    rect(x * tileSize, y *tileSize, tileSize, tileSize);
  }
}


function showPlayer(x, y) {
  // Depending on the state variable playerDirection, this displays the appropriate image of the player
  if (playerDirection === "up") {
    image(playerUp, x * tileSize, y * tileSize, tileSize, tileSize)
  }
  else if (playerDirection === "down") {
    image(playerDown, x * tileSize, y * tileSize, tileSize, tileSize)
  }
  else if (playerDirection === "right") {
    image(playerRight, x * tileSize, y * tileSize, tileSize, tileSize)
  }
  else if (playerDirection === "left") {
    image(playerLeft, x * tileSize, y * tileSize, tileSize, tileSize)
  }
}


function keyTyped() {
  // called if a key on the keyboard is pressed
  if (gameState === "mainMenu") {
    if (key === "1" || key === "2" || key === "3" || key === "4" || key === "5") {
      if (key === "1") {
        lines = levelOne;
      }
      else if (key === "2") {
        lines = levelTwo;
      }
      else if (key === "3") {
        lines = levelThree;
      }
      else if (key === "4") {
        lines = levelFour;
      }
      else if (key === "5") {
        lines = levelFive;
      }
      gameSetup();
      gameState = "game";
    }
  }
  if (gameState === "game") {
    playerMovement();
    castingSpells();
  }
}

function playerMovement() {
  // called by the keyTyped() function, this sees which key was pressed and moves the player as needed
  if (key === "w") {
    playerDirection = "up";
    if (field[playerX][playerY - 1] != "#") {
      field[playerX][playerY] = ".";
      playerY -= 1;
      field[playerX][playerY] = "p"
    }
  }
  else if (key === "s") {
    playerDirection = "down";
    if (field[playerX][playerY + 1] != "#") {
      field[playerX][playerY] = ".";
      playerY += 1;
      field[playerX][playerY] = "p"
    }
  }
  else if (key === "a") {
    playerDirection = "left";
    if (field[playerX - 1][playerY] != "#") {
      field[playerX][playerY] = ".";
      playerX -= 1;
      field[playerX][playerY] = "p"
    }
  }
  else if (key === "d") {
    playerDirection = "right";
    if (field[playerX + 1][playerY] != "#") {
      field[playerX][playerY] = ".";
      playerX += 1;
      field[playerX][playerY] = "p"
    }
  }
}

function castingSpells() {
  // if the key pressed in keyTyped() is not a movement key, but a spell, this is called to cast the spell
  if ((key === "c" || key === "v" || key === "b") && millis() - cooldownTimer >= 1000) {
    // this is to add a cooldown so that you cannot shoot spells too quickly
    if (key === "c") {
      // fire spell
      if (playerDirection === "up" && field[playerX][playerY - 1] != "#") {
        // these shoot the spell in the correct direction and location and make new objects from the class
        let someSpell = new fireSpell(playerX, playerY - 1, spellSpeed, "up");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "down" && field[playerX][playerY + 1] != "#") {
        let someSpell = new fireSpell(playerX, playerY + 1, spellSpeed, "down");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "left" && field[playerX - 1][playerY] != "#") {
        let someSpell = new fireSpell(playerX - 1, playerY, spellSpeed, "left");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "right" && field[playerX + 1][playerY] != "#") {
        let someSpell = new fireSpell(playerX + 1, playerY, spellSpeed, "right");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
    }
    else if (key === "v") {
      // water spell
      if (playerDirection === "up" && field[playerX][playerY - 1] != "#") {
        let someSpell = new waterSpell(playerX, playerY - 1, spellSpeed, "up");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "down" && field[playerX][playerY + 1] != "#") {
        let someSpell = new waterSpell(playerX, playerY + 1, spellSpeed, "down");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "left" && field[playerX - 1][playerY] != "#") {
        let someSpell = new waterSpell(playerX - 1, playerY, spellSpeed, "left");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "right" && field[playerX + 1][playerY] != "#") {
        let someSpell = new waterSpell(playerX + 1, playerY, spellSpeed, "right");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
    }
    else if (key === "b") {
      // grass spell
      if (playerDirection === "up" && field[playerX][playerY - 1] != "#") {
        let someSpell = new grassSpell(playerX, playerY - 1, spellSpeed, "up");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "down" && field[playerX][playerY + 1] != "#") {
        let someSpell = new grassSpell(playerX, playerY + 1, spellSpeed, "down");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "left" && field[playerX - 1][playerY] != "#") {
        let someSpell = new grassSpell(playerX - 1, playerY, spellSpeed, "left");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
      else if (playerDirection === "right" && field[playerX + 1][playerY] != "#") {
        let someSpell = new grassSpell(playerX + 1, playerY, spellSpeed, "right");
        spells.push(someSpell);
        cooldownTimer = millis();
      }
    }
  }
}


function spellStuff() {
  // continuously goes through the spell array and calls the spell functions so they can keep working
  for (let i = 0; i < spells.length; i++) {
    spells[i].implant();
    spells[i].move();
  }
}


function mousePressed() {
  // If the mouse is pressed at any point
  // Nothing yet here
}