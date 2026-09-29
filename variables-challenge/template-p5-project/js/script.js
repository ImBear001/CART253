/**
 * Mr. Furious
 * Pippin Barr (modified for the Variables Challenge)
 *
 * A guy who becomes visibly furious as night falls
 * and an annoying bird keeps flying past.
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 120,
  // Colour
  fill: {
    r: 0,
    g: 200,
    b: 0
  }
};

// How angry Mr. Furious is (0 = calm, maxRage = livid)
let rage = 0;
let rageRate = 0.5;
let maxRage = 100;
// The most pixels he can shake by at full rage
let maxShake = 30;

// The sky, which fades from blue to black
let sky = {
  r: 255,
  g: 150,
  b: 50,
  darkenRate: 0.3
};

// The annoying bird
let bird = {
  x: -20,
  baseY: 100, // centre line the bird bobs around
  y: 100,
  size: 20,
  velocity: 0,
  acceleration: 0.05,
  maxSpeed: 5,
  bobAmount: 30, // how far up/down it bobs
  bobSpeed: 0.2, // how fast it bobs
  fill: {
    r: 255,
    g: 220,
    b: 0
  }
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Update and draw everything
 */
function draw() {
  updateSky();
  updateRage();
  updateBird();

  background(sky.r, sky.g, sky.b);

  drawBird();
  drawMrFurious();
}

/**
 * Darken the sky towards black, never going below 0
 */
function updateSky() {
  sky.r = constrain(sky.r - sky.darkenRate, 0, 255);
  sky.g = constrain(sky.g - sky.darkenRate, 0, 255);
  sky.b = constrain(sky.b - sky.darkenRate, 0, 255);
}

/**
 * Increase rage, and use it to set Mr. Furious' colour
 */
function updateRage() {
  rage = constrain(rage + rageRate, 0, maxRage);

  // Pink at rage 0, pure red at max rage
  mrFurious.fill.g = map(rage, 0, maxRage, 225, 0);
  mrFurious.fill.b = map(rage, 0, maxRage, 225, 0);
}

/**
 * Move the bird left to right with acceleration and a sine-wave bob
 */
function updateBird() {
  // Speed up, but not past maxSpeed
  bird.velocity = constrain(bird.velocity + bird.acceleration, 0, bird.maxSpeed);
  bird.x += bird.velocity;

  // Bob up and down
  bird.y = bird.baseY + sin(frameCount * bird.bobSpeed) * bird.bobAmount;

  // Once it's off the right edge, send it back around (and reset its speed)
  if (bird.x > width + bird.size) {
    bird.x = -bird.size;
    bird.velocity = 0;
  }
}

/**
 * Draw the bird as a small coloured circle
 */
function drawBird() {
  push();
  noStroke();
  fill(bird.fill.r, bird.fill.g, bird.fill.b);
  ellipse(bird.x, bird.y, bird.size);
  pop();
}

/**
 * Draw Mr. Furious, shaking more the angrier he gets
 */
function drawMrFurious() {
  // 0 shake when calm, maxShake when furious
  let shake = map(rage, 0, maxRage, 0, maxShake);
  let x = mrFurious.x + random(-shake, shake);
  let y = mrFurious.y + random(-shake, shake);

  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(x, y, mrFurious.size);
  pop();
}