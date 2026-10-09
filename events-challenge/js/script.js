/**
 * The Only Move Is Not To Play
 * Pippin Barr
 *
 * A game where your score increases so long as you do nothing.
 * Every event (keyboard, mouse, internet, focus) calls the same
 * lose() function using Plain JavaScript events.
 */

"use strict";

// Current score
let score = 0;

// Is the game over?
let gameOver = false;

/**
 * Create the canvas and listen for every event that makes you lose
 */
function setup() {
  createCanvas(400, 400);

  // Keyboard events
  window.addEventListener("keydown", lose);
  window.addEventListener("keyup", lose);

  // Mouse events
  window.addEventListener("mousemove", lose);
  window.addEventListener("mousedown", lose);
  window.addEventListener("mouseup", lose);
  window.addEventListener("click", lose);
  window.addEventListener("dblclick", lose);
  window.addEventListener("wheel", lose);

  // Internet connection events
  window.addEventListener("online", lose);
  window.addEventListener("offline", lose);

  // Switching tabs or minimizing the window
  document.addEventListener("visibilitychange", lose);
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
 * Ends the game (every event calls this)
 */
function lose() {
  gameOver = true;
}