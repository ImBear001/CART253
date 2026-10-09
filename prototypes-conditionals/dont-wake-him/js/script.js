/**
 * Don't Wake Him
 * Tyler Myrans
 *
 * The bear is asleep in his cave, snoring, right next to his honey.
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

// His honey jar
let honey = {
  x: 360,
  y: 290,
  size: 36
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

/**
 * Draw the cave, the bear, and the honey
 */
function draw() {
  drawCave();
  drawBear();
  drawHoney();
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
 * Draw the honey jar
 */
function drawHoney() {
  push();
  noStroke();
  // Glow so you know where to go
  fill(255, 200, 60, 50);
  ellipse(honey.x, honey.y, honey.size * 2);
  fill(200, 140, 40);
  ellipse(honey.x, honey.y, honey.size, honey.size * 0.9);
  fill(240, 190, 60);
  ellipse(honey.x, honey.y - honey.size * 0.4, honey.size * 0.7, honey.size * 0.25);
  pop();
}