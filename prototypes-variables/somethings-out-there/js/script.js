/**
 * Something's Out There
 * Tyler Myrans
 *
 * You're the bear, looking out of the cave at night. Something's
 * eyes are drifting between the trees (Perlin noise), slowly creeping
 * closer. The mouse is your flashlight: shine it on the eyes and they
 * back off. The closer they get, the faster and harder your heart pounds
 * (a red pulse around the edges of the screen).
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
  // How close it is (0 = far away in the trees, 1 = right at the cave)
  approach: 0,
  approachRate: 0.0025,
  retreatRate: 0.012,
  // Eye size and spacing when far and when close
  minEyeSize: 3,
  maxEyeSize: 22,
  minSpacing: 8,
  maxSpacing: 60
};

// The flashlight (follows the mouse)
let flashlight = {
  // Where the beam comes from (you, at the bottom of the screen)
  x: 200,
  y: 400,
  radius: 55,
  // True when the beam is on the eyes
  onThing: false
};

// The heartbeat
let heart = {
  angle: 0,
  minSpeed: 0.05,
  maxSpeed: 0.35,
  maxWeight: 40
};

// How many trees are out there
let numTrees = 14;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Update everything, then draw the scene
 */
function draw() {
  background(25, 30, 55);

  updateThing();
  updateHeart();

  drawTrees();
  drawThing();
  drawFlashlight();
  drawCaveMouth();
  drawHeartbeat();
}

/**
 * Move the eyes with noise, and make them creep closer
 * (or back off if the flashlight is on them)
 */
function updateThing() {
  thing.noiseX += thing.noiseSpeed;
  thing.noiseY += thing.noiseSpeed;

  // The closer it is, the lower on the screen it can come
  let lowest = lerp(240, 320, thing.approach);
  thing.x = map(noise(thing.noiseX), 0.2, 0.8, 60, width - 60);
  thing.y = map(noise(thing.noiseY), 0.2, 0.8, 170, lowest);
  thing.x = constrain(thing.x, 60, width - 60);
  thing.y = constrain(thing.y, 170, lowest);

  // Is the flashlight shining on it?
  let distance = dist(mouseX, mouseY, thing.x, thing.y);
  flashlight.onThing = distance < flashlight.radius;

  if (flashlight.onThing) {
    thing.approach -= thing.retreatRate;
  }
  else {
    thing.approach += thing.approachRate;
  }
  thing.approach = constrain(thing.approach, 0, 1);
}

/**
 * The heart beats faster the closer the thing is
 */
function updateHeart() {
  let speed = lerp(heart.minSpeed, heart.maxSpeed, thing.approach);
  heart.angle += speed;
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
 * Draw the thing as two glowing eyes that get bigger as it gets closer.
 * They blink every so often.
 */
function drawThing() {
  let eyeSize = lerp(thing.minEyeSize, thing.maxEyeSize, thing.approach);
  let spacing = lerp(thing.minSpacing, thing.maxSpacing, thing.approach);

  // Blink: sin() only goes above 0.97 for a moment each cycle
  let blinking = sin(frameCount * 0.03) > 0.97;
  if (blinking) {
    return;
  }

  push();
  noStroke();
  // Glow
  fill(255, 60, 30, 60);
  ellipse(thing.x - spacing / 2, thing.y, eyeSize * 2.5);
  ellipse(thing.x + spacing / 2, thing.y, eyeSize * 2.5);
  // Eyes
  fill(180, 255, 80);
  ellipse(thing.x - spacing / 2, thing.y, eyeSize, eyeSize * 0.6);
  ellipse(thing.x + spacing / 2, thing.y, eyeSize, eyeSize * 0.6);
  pop();
}

/**
 * Draw the flashlight beam from the bottom of the screen to the mouse
 */
function drawFlashlight() {
  // Angle and length from the flashlight to the mouse
  let angle = atan2(mouseY - flashlight.y, mouseX - flashlight.x);
  let beamLength = dist(flashlight.x, flashlight.y, mouseX, mouseY);

  // Beam brightens when it's on the thing
  let beamAlpha = 25;
  if (flashlight.onThing) {
    beamAlpha = 55;
  }

  push();
  noStroke();
  fill(255, 240, 200, beamAlpha);
  // Rotate so the beam points at the mouse
  translate(flashlight.x, flashlight.y);
  rotate(angle);
  triangle(0, -8, 0, 8, beamLength, flashlight.radius);
  triangle(0, -8, beamLength, -flashlight.radius, beamLength, flashlight.radius);
  pop();

  // The spot of light at the end of the beam
  push();
  noStroke();
  fill(255, 240, 200, beamAlpha);
  ellipse(mouseX, mouseY, flashlight.radius * 2);
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

/**
 * Draw a red pulse around the edges that gets faster and thicker
 * the closer the thing is
 */
function drawHeartbeat() {
  // sin() goes -1 to 1, so map it to 0 to 1 for a pulse
  let pulse = map(sin(heart.angle), -1, 1, 0, 1);
  let weight = pulse * heart.maxWeight * thing.approach;

  push();
  noFill();
  stroke(180, 0, 0, 120);
  strokeWeight(weight);
  rect(0, 0, width, height);
  pop();
}