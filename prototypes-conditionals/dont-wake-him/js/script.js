/**
 * Don't Wake Him
 * Tyler Myrans
 *
 * The bear is asleep in the cave and you want his honey.
 * Start at the blue circle, go over to the honey, click to grab it,
 * then bring it back to the blue circle to win.
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The sleeping bear
let bear = {
  x: 200,
  y: 260,
  width: 220,
  height: 120,
  fill: {
    r: 120,
    g: 80,
    b: 50
  }
};

// Where you start (and where you bring the honey back to)
let start = {
  x: 40,
  y: 200,
  size: 44
};

// The honey jar
let honey = {
  x: 360,
  y: 290,
  size: 36
};

// Are you holding the honey?
let hasHoney = false;

// The state of the game: "start", "sneaking", or "won"
let state = "start";

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  resetGame();
}

/**
 * Put everything back to how it starts
 */
function resetGame() {
  hasHoney = false;
  state = "start";
}

/**
 * Run whichever part of the game we're in
 */
function draw() {
  if (state === "start") {
    drawCave();
    drawBear();
    drawHoney();
    drawStart();
    checkStart();
  }
  else if (state === "sneaking") {
    checkWin();

    drawCave();
    drawBear();
    drawHoney();
    drawStart();
    drawPlayer();
  }
  else if (state === "won") {
    drawWon();
  }
}

/**
 * Start sneaking once the mouse is on the start circle
 */
function checkStart() {
  let distance = dist(mouseX, mouseY, start.x, start.y);
  if (distance < start.size / 2) {
    state = "sneaking";
  }
}

/**
 * You win if you bring the honey back to the start circle
 */
function checkWin() {
  let distance = dist(mouseX, mouseY, start.x, start.y);
  if (hasHoney && distance < start.size / 2) {
    state = "won";
  }
}

/**
 * Click on the honey to grab it, or click to play again after you win
 */
function mousePressed() {
  if (state === "won") {
    resetGame();
  }
  else if (state === "sneaking" && !hasHoney) {
    let distance = dist(mouseX, mouseY, honey.x, honey.y);
    if (distance < honey.size) {
      hasHoney = true;
    }
  }
}

/**
 * Draw the inside of the cave
 */
function drawCave() {
  background(25, 20, 18);
  push();
  noStroke();
  // Cave floor
  fill(45, 38, 32);
  ellipse(width / 2, 340, 520, 200);
  pop();
}

/**
 * Draw the sleeping bear, snoring
 */
function drawBear() {
  let x = bear.x;
  let y = bear.y;

  push();
  noStroke();
  fill(bear.fill.r, bear.fill.g, bear.fill.b);
  // Body
  ellipse(x, y, bear.width, bear.height);
  // Head resting on the left
  ellipse(x - 90, y - 20, 90, 80);
  ellipse(x - 115, y - 55, 28);
  ellipse(x - 70, y - 58, 28);
  fill(40, 25, 20);
  ellipse(x - 125, y - 10, 14, 10);
  pop();

  // Closed eyes
  push();
  stroke(20);
  strokeWeight(3);
  noFill();
  arc(x - 105, y - 28, 12, 8, 0, PI);
  arc(x - 80, y - 28, 12, 8, 0, PI);
  pop();

  // Snoring Zs that float up and down
  push();
  fill(220);
  noStroke();
  textSize(18);
  let floatY = sin(frameCount * 0.05) * 6;
  text("z", x - 60, y - 90 + floatY);
  textSize(24);
  text("Z", x - 40, y - 115 + floatY);
  pop();
}

/**
 * Draw the honey jar (unless you're carrying it)
 */
function drawHoney() {
  if (hasHoney) {
    return;
  }
  drawJar(honey.x, honey.y, honey.size);
}

/**
 * Draw a honey jar at a position
 */
function drawJar(x, y, size) {
  push();
  noStroke();
  // Glow so you know where to go
  fill(255, 200, 60, 50);
  ellipse(x, y, size * 2);
  fill(200, 140, 40);
  ellipse(x, y, size, size * 0.9);
  fill(240, 190, 60);
  ellipse(x, y - size * 0.4, size * 0.7, size * 0.25);
  pop();
}

/**
 * Draw the start circle, with instructions before the game starts
 */
function drawStart() {
  push();
  noStroke();
  let pulse = map(sin(frameCount * 0.08), -1, 1, 0.8, 1.2);
  // It glows brighter once you have the honey, to show where to go
  if (hasHoney) {
    fill(120, 255, 160, 160);
  }
  else {
    fill(120, 200, 255, 120);
  }
  ellipse(start.x, start.y, start.size * pulse);

  fill(255);
  textSize(15);
  if (state === "start") {
    text("Put your mouse on the blue circle to start.", width / 2, 30);
    text("Click the honey to grab it, then bring it back.", width / 2, 52);
  }
  else if (hasHoney) {
    text("Got it! Now sneak it back to the circle.", width / 2, 80);
  }
  pop();
}

/**
 * Draw the player as a small paw print (holding the honey if you have it)
 */
function drawPlayer() {
  if (hasHoney) {
    drawJar(mouseX + 14, mouseY + 10, 24);
  }

  push();
  noStroke();
  fill(230);
  ellipse(mouseX, mouseY, 14);
  ellipse(mouseX - 8, mouseY - 9, 6);
  ellipse(mouseX, mouseY - 11, 6);
  ellipse(mouseX + 8, mouseY - 9, 6);
  pop();
}

/**
 * Win screen
 */
function drawWon() {
  background(240, 190, 60);
  push();
  noStroke();
  fill(200, 140, 40);
  ellipse(width / 2, 170, 120, 110);
  fill(255, 220, 100);
  ellipse(width / 2, 125, 90, 30);
  fill(80, 40, 0);
  textSize(32);
  textStyle(BOLD);
  text("You got the honey!", width / 2, 280);
  textSize(16);
  textStyle(NORMAL);
  text("He never knew. Click to play again.", width / 2, 320);
  pop();
}