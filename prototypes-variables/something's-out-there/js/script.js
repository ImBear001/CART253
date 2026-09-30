/**
 * Something's Out There
 * Tyler Myrans
 *
 * You're the bear, looking out of the cave at night into the forest.
 * Something's eyes are drifting between the trees (Perlin noise).
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The eyes of the thing out there
let thing = {
  x: 200,
  y: 220,
  // Positions in the noise "landscape" (different so x and y don't match)
  noiseX: 0,
  noiseY: 1000,
  noiseSpeed: 0.006,
  eyeSize: 8,
  spacing: 20
};

// How many trees are out there
let numTrees = 9;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Update the eyes, then draw the scene
 */
function draw() {
  background(25, 30, 55);

  updateThing();

  drawTrees();
  drawThing();
  drawCaveMouth();
}

/**
 * Move the eyes around between the trees using Perlin noise
 */
function updateThing() {
  thing.noiseX += thing.noiseSpeed;
  thing.noiseY += thing.noiseSpeed;

  // noise() gives a smooth value between 0 and 1, but mostly stays
  // between 0.2 and 0.8, so map that range to the area between the trees
  thing.x = map(noise(thing.noiseX), 0.2, 0.8, 60, width - 60);
  thing.y = map(noise(thing.noiseY), 0.2, 0.8, 170, 280);
  thing.x = constrain(thing.x, 60, width - 60);
  thing.y = constrain(thing.y, 170, 280);
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
 * Draw the thing as two glowing eyes
 */
function drawThing() {
  push();
  noStroke();
  // Glow
  fill(255, 60, 30, 60);
  ellipse(thing.x - thing.spacing / 2, thing.y, thing.eyeSize * 2.5);
  ellipse(thing.x + thing.spacing / 2, thing.y, thing.eyeSize * 2.5);
  // Eyes
  fill(255, 200, 60);
  ellipse(thing.x - thing.spacing / 2, thing.y, thing.eyeSize, thing.eyeSize * 0.6);
  ellipse(thing.x + thing.spacing / 2, thing.y, thing.eyeSize, thing.eyeSize * 0.6);
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