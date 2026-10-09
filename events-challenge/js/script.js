/**
 * The Only Move Is Not To Play
 * Pippin Barr
 *
 * A game where your score increases so long as you do nothing.
 */

"use strict";

// Current score
let score = 0;

// Is the game over?
let gameOver = false;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Update the score and display the UI
 */
function draw() {
  background("#87ceeb");

  // Only increase the score if the game is not over
  if (!gameOver) {
    // Score increases relatively slowly
    score += 0.05;
  }
  displayUI();
}

/**
 * Show the game over message if needed, and the current score
 */
function displayUI() {
  if (gameOver) {
    push();
    textSize(48);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("You lose!", width/2, height/3);
    pop();
  }
  displayScore();
}

/**
 * Display the score
 */
function displayScore() {
  push();
  textSize(48);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(floor(score), width/2, height/2);
  pop();
}

/**
 * Ends the game
 */
function lose() {
  gameOver = true;
}

// Keyboard events: any key action makes you lose

/**
 * Lose when a key is pressed
 */
function keyPressed() {
  lose();
}

/**
 * Lose when a key is released
 */
function keyReleased() {
  lose();
}

/**
 * Lose when a key is typed
 */
function keyTyped() {
  lose();
}

// Mouse events: any mouse action makes you lose

/**
 * Lose when the mouse moves
 */
function mouseMoved() {
  lose();
}

/**
 * Lose when the mouse is dragged
 */
function mouseDragged() {
  lose();
}

/**
 * Lose when a mouse button is pressed
 */
function mousePressed() {
  lose();
}

/**
 * Lose when a mouse button is released
 */
function mouseReleased() {
  lose();
}

/**
 * Lose when the mouse is clicked
 */
function mouseClicked() {
  lose();
}

/**
 * Lose when the mouse is double clicked
 */
function doubleClicked() {
  lose();
}

/**
 * Lose when the mouse wheel is scrolled
 */
function mouseWheel() {
  lose();
}