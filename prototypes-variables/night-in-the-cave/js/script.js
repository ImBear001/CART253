/**
 * Night in the Cave
 * Tyler Myrans
 *
 * Dusk turns into night outside the Bear Cave. The sky darkens,
 * the stars slowly come out, and the mouse is the moon. The closer
 * the moon gets to the cave, the more the bear's eyes glow in the dark.
 * The whole sky slowly turns (like a time-lapse) and each star twinkles.
 * The moon's ring gets thicker as it gets closer to the cave.
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The sky starts as a dusk orange and fades to night
let sky = {
  r: 230,
  g: 130,
  b: 80,
  // Night colour it fades towards
  nightR: 10,
  nightG: 15,
  nightB: 40,
  // How much of the way to night we get each frame
  fadeRate: 0.003
};

// How visible the stars are (0 = invisible, 255 = fully out)
let starAlpha = 0;
let starFadeRate = 0.4;
let numStars = 400;
// How far the sky has turned, and how fast it turns
let skyRotation = 0;
let skyRotationSpeed = 0.0008;
// How fast the stars twinkle
let twinkleSpeed = 0.05;

// The moon follows the mouse
let moon = {
  size: 60,
  glowSize: 140
};

// The cave sits at the bottom of the screen
let cave = {
  x: 200,
  y: 400,
  width: 320,
  height: 300
};

// The bear's eyes peeking out of the cave
let eyes = {
  y: 320,
  spacing: 30,
  size: 14,
  // How bright they are (changes with the moon's distance)
  brightness: 0,
  minBrightness: 20,
  maxBrightness: 255
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Update the night and draw the scene
 */
function draw() {
  updateSky();
  updateStars();
  updateEyes();

  background(sky.r, sky.g, sky.b);

  drawStars();
  drawMoon();
  drawCave();
  drawEyes();
}

/**
 * Move the sky colour a little closer to night each frame
 */
function updateSky() {
  sky.r = lerp(sky.r, sky.nightR, sky.fadeRate);
  sky.g = lerp(sky.g, sky.nightG, sky.fadeRate);
  sky.b = lerp(sky.b, sky.nightB, sky.fadeRate);
}

/**
 * Stars slowly fade in as night falls
 */
function updateStars() {
  starAlpha = constrain(starAlpha + starFadeRate, 0, 255);
  skyRotation += skyRotationSpeed;
}

/**
 * The closer the moon (mouse) is to the cave, the brighter the eyes glow
 */
function updateEyes() {
  let distanceToCave = dist(mouseX, mouseY, cave.x, eyes.y);
  eyes.brightness = map(distanceToCave, 0, 400, eyes.maxBrightness, eyes.minBrightness);
  eyes.brightness = constrain(eyes.brightness, eyes.minBrightness, eyes.maxBrightness);
}

/**
 * Draw the stars in the same random spots every frame,
 * rotating the whole sky around a point below the cave
 */
function drawStars() {
  // Using the same seed means random() gives the same positions every frame
  randomSeed(253);

  push();
  noStroke();
  // Spin the sky around the bottom middle of the canvas
  translate(width / 2, height);
  rotate(skyRotation);
  for (let i = 0; i < numStars; i++) {
    // Spread stars over a big area so rotating never leaves a gap
    let x = random(-600, 600);
    let y = random(-600, 600);
    let size = random(1, 4);
    // Each star twinkles at its own point in the sine wave
    let twinkle = map(sin(frameCount * twinkleSpeed + i), -1, 1, 0.3, 1);
    fill(255, 255, 255, starAlpha * twinkle);
    ellipse(x, y, size);
  }
  pop();
}

/**
 * Draw the moon (with a soft glow) where the mouse is.
 * A ring around it gets thicker the closer it is to the cave.
 */
function drawMoon() {
  // Reuse the eyes' brightness (how close the moon is) to set the ring thickness
  let ringWeight = map(eyes.brightness, eyes.minBrightness, eyes.maxBrightness, 1, 8);

  push();
  noStroke();
  fill(255, 250, 220, 40);
  ellipse(mouseX, mouseY, moon.glowSize);
  fill(255, 250, 220);
  ellipse(mouseX, mouseY, moon.size);
  pop();

  // Moon ring
  push();
  noFill();
  stroke(255, 250, 220, 120);
  strokeWeight(ringWeight);
  ellipse(mouseX, mouseY, moon.size * 1.4);
  pop();
}

/**
 * Draw the cave as a dark rock mound with a black entrance
 */
function drawCave() {
  push();
  noStroke();
  // Rock
  fill(60, 55, 55);
  ellipse(cave.x, cave.y, cave.width, cave.height);
  // Entrance
  fill(0);
  ellipse(cave.x, cave.y, cave.width * 0.45, cave.height * 0.6);
  pop();
}

/**
 * Draw the bear's glowing eyes inside the cave entrance
 */
function drawEyes() {
  push();
  noStroke();
  fill(eyes.brightness, eyes.brightness, 0);
  ellipse(cave.x - eyes.spacing / 2, eyes.y, eyes.size, eyes.size * 0.7);
  ellipse(cave.x + eyes.spacing / 2, eyes.y, eyes.size, eyes.size * 0.7);
  pop();
}