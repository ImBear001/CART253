/**
 * Lucky Catch
 * Tyler Myrans
 *
 * The bear is sitting on the riverbank, watching the water for fish.
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The bear on the riverbank
let bear = {
  x: 200,
  y: 130,
  size: 150,
  fill: {
    r: 120,
    g: 80,
    b: 50
  }
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

/**
 * Draw the scene
 */
function draw() {
  drawBackground();
  drawRiver();
  drawBear();
}

/**
 * Sky and riverbank
 */
function drawBackground() {
  background(150, 200, 230);

  // Riverbank
  push();
  noStroke();
  fill(90, 140, 70);
  rect(0, 170, width, 60);
  pop();
}

/**
 * Draw the river with waves that move using sin()
 */
function drawRiver() {
  push();
  noStroke();
  fill(50, 110, 170);
  rect(0, 220, width, height - 220);

  // Little wave lines
  stroke(180, 220, 255, 150);
  strokeWeight(3);
  for (let y = 240; y < height; y += 30) {
    for (let x = 0; x < width; x += 50) {
      let offset = sin(frameCount * 0.05 + x * 0.05 + y) * 8;
      line(x + offset, y, x + 25 + offset, y);
    }
  }
  pop();
}

/**
 * Draw the bear, looking down at the water
 */
function drawBear() {
  let earOffset = bear.size * 0.35;
  let earSize = bear.size * 0.32;
  let eyeY = bear.y - bear.size * 0.08;
  let eyeOffsetX = bear.size * 0.18;
  let mouthY = bear.y + bear.size * 0.22;

  push();
  noStroke();
  fill(bear.fill.r, bear.fill.g, bear.fill.b);
  ellipse(bear.x - earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x + earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x, bear.y, bear.size);
  fill(40, 25, 20);
  ellipse(bear.x, bear.y + bear.size * 0.08, bear.size * 0.12, bear.size * 0.08);
  // Eyes looking down at the water
  fill(0);
  ellipse(bear.x - eyeOffsetX, eyeY + 4, 10);
  ellipse(bear.x + eyeOffsetX, eyeY + 4, 10);
  pop();

  // Flat, focused mouth
  push();
  stroke(40, 25, 20);
  strokeWeight(4);
  line(bear.x - 10, mouthY, bear.x + 10, mouthY);
  pop();
}