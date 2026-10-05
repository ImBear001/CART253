/**
 * Picky Bear
 * Tyler Myrans
 *
 * A hungry bear sitting at a table full of food.
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The bear
let bear = {
  x: 200,
  y: 180,
  size: 170,
  fill: {
    r: 120,
    g: 80,
    b: 50
  }
};

// The foods sitting on the table at the bottom
let tableY = 355;
let foodSpots = {
  honey: 60,
  fish: 150,
  berries: 250,
  garbage: 340
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw the table and the bear
 */
function draw() {
  background(40, 55, 45);

  drawTable();
  drawBear();
}

/**
 * Draw the table with the foods on it
 */
function drawTable() {
  push();
  noStroke();
  fill(90, 60, 35);
  rect(0, tableY - 10, width, height - tableY + 10);
  pop();

  drawFood("honey", foodSpots.honey, tableY);
  drawFood("fish", foodSpots.fish, tableY);
  drawFood("berries", foodSpots.berries, tableY);
  drawFood("garbage", foodSpots.garbage, tableY);
}

/**
 * Draw the bear's head with a simple waiting face
 */
function drawBear() {
  let size = bear.size;
  let earOffset = size * 0.35;
  let earSize = size * 0.32;
  let eyeY = bear.y - size * 0.1;
  let eyeOffsetX = size * 0.18;
  let eyeSize = size * 0.11;
  let mouthY = bear.y + size * 0.25;

  push();
  noStroke();
  fill(bear.fill.r, bear.fill.g, bear.fill.b);
  ellipse(bear.x - earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x + earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x, bear.y, size);
  // Muzzle
  fill(190, 150, 110);
  ellipse(bear.x, bear.y + size * 0.18, size * 0.45, size * 0.32);
  // Nose
  fill(40, 25, 20);
  ellipse(bear.x, bear.y + size * 0.09, size * 0.12, size * 0.08);
  // Eyes
  fill(255);
  ellipse(bear.x - eyeOffsetX, eyeY, eyeSize);
  ellipse(bear.x + eyeOffsetX, eyeY, eyeSize);
  fill(0);
  ellipse(bear.x - eyeOffsetX, eyeY, eyeSize * 0.45);
  ellipse(bear.x + eyeOffsetX, eyeY, eyeSize * 0.45);
  pop();

  // Little smile
  push();
  stroke(40, 25, 20);
  strokeWeight(4);
  noFill();
  arc(bear.x, mouthY - 4, size * 0.2, size * 0.1, 0, PI);
  pop();
}

/**
 * Draw one food at a position
 */
function drawFood(type, x, y) {
  push();
  noStroke();
  if (type === "honey") {
    // Honey pot
    fill(200, 140, 40);
    ellipse(x, y, 40, 36);
    fill(240, 190, 60);
    ellipse(x, y - 16, 30, 10);
  }
  else if (type === "fish") {
    fill(120, 170, 200);
    ellipse(x, y, 50, 22);
    triangle(x + 22, y, x + 38, y - 12, x + 38, y + 12);
    fill(0);
    ellipse(x - 15, y - 3, 4);
  }
  else if (type === "berries") {
    fill(110, 40, 140);
    ellipse(x - 8, y, 16);
    ellipse(x + 8, y, 16);
    ellipse(x, y - 12, 16);
    fill(60, 140, 60);
    ellipse(x, y - 22, 10, 6);
  }
  else {
    // Garbage: a crumpled can with stink lines
    fill(150);
    rect(x - 12, y - 16, 24, 32, 4);
    stroke(120, 160, 60);
    strokeWeight(2);
    noFill();
    let wiggle = sin(frameCount * 0.2) * 3;
    line(x - 8 + wiggle, y - 22, x - 8 - wiggle, y - 34);
    line(x + 8 - wiggle, y - 22, x + 8 + wiggle, y - 34);
  }
  pop();
}