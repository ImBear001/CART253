/**
 * Something's Out There
 * Tyler Myrans
 *
 * You're the bear, looking out of the cave at night into the forest.
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// How many trees are out there
let numTrees = 9;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw the scene
 */
function draw() {
  background(25, 30, 55);

  drawTrees();
  drawCaveMouth();
}

/**
 * Draw dark tree silhouettes in the same spots every frame
 */
function drawTrees() {
  // Same seed = same random trees every frame
  randomSeed(253);

  push();
  noStroke();
  fill(8, 10, 16);
  for (let i = 0; i < numTrees; i++) {
    let x = random(0, width);
    let treeHeight = random(120, 220);
    let treeWidth = random(50, 90);
    let baseY = random(260, 300);
    // Trunk
    rect(x - 5, baseY - 30, 10, 60);
    // Pointy top
    triangle(x - treeWidth / 2, baseY - 20, x + treeWidth / 2, baseY - 20, x, baseY - treeHeight);
  }
  // Ground
  rect(0, 300, width, 100);
  pop();
}

/**
 * Draw the black edges of the cave around the view
 */
function drawCaveMouth() {
  push();
  noFill();
  stroke(0);
  strokeWeight(160);
  ellipse(width / 2, height / 2 + 40, width + 120, height + 60);
  pop();
}