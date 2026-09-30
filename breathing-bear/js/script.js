/**
 * Breathing Bear
 * Tyler Myrans
 *
 * A bear sitting in the dark, breathing. Move the mouse to the right
 * and he starts to panic: he breathes faster, deeper, and flushes red.
 * Move it back left and he calms down again. The more he panics,
 * the more his mouth tenses up (a thicker, wider line).
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The bear
let bear = {
  x: 200,
  y: 220,
  // Size when resting between breaths
  baseSize: 150,
  size: 150,
  // Colour when calm
  calmFill: {
    r: 120,
    g: 80,
    b: 50
  },
  // Colour when panicking
  panicFill: {
    r: 200,
    g: 40,
    b: 30
  }
};

// How panicked the bear is (0 = calm, 1 = full panic)
let panic = 0;

// Where we are in the breathing cycle
let breathAngle = 0;

// Breathing speed and depth at each end of the panic scale
let minBreathSpeed = 0.02;
let maxBreathSpeed = 0.3;
let minBreathAmount = 8;
let maxBreathAmount = 30;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Update the bear's panic and breathing, then draw him
 */
function draw() {
  background(30, 40, 60);

  updatePanic();
  updateBreathing();
  drawBear();
}

/**
 * Mouse on the left = calm, mouse on the right = full panic
 */
function updatePanic() {
  panic = constrain(map(mouseX, 0, width, 0, 1), 0, 1);
}

/**
 * Use sine to make the bear's size swell and shrink like breathing
 */
function updateBreathing() {
  let breathSpeed = lerp(minBreathSpeed, maxBreathSpeed, panic);
  let breathAmount = lerp(minBreathAmount, maxBreathAmount, panic);

  breathAngle += breathSpeed;

  // sin() goes between -1 and 1, so the size swings around baseSize
  bear.size = bear.baseSize + sin(breathAngle) * breathAmount;
}

/**
 * Draw the bear's head, ears, and eyes, coloured by how panicked he is
 */
function drawBear() {
  // Blend between calm and panic colours
  let r = lerp(bear.calmFill.r, bear.panicFill.r, panic);
  let g = lerp(bear.calmFill.g, bear.panicFill.g, panic);
  let b = lerp(bear.calmFill.b, bear.panicFill.b, panic);

  let earOffset = bear.size * 0.35;
  let earSize = bear.size * 0.35;

  push();
  noStroke();
  fill(r, g, b);
  // Ears
  ellipse(bear.x - earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x + earOffset, bear.y - earOffset, earSize);
  // Head
  ellipse(bear.x, bear.y, bear.size);
  pop();

  // Eyes get wider as he panics
  let eyeSize = lerp(10, 28, panic);
  let eyeOffsetX = bear.size * 0.18;
  let eyeY = bear.y - bear.size * 0.08;

  push();
  noStroke();
  fill(255);
  ellipse(bear.x - eyeOffsetX, eyeY, eyeSize);
  ellipse(bear.x + eyeOffsetX, eyeY, eyeSize);
  fill(0);
  ellipse(bear.x - eyeOffsetX, eyeY, eyeSize * 0.4);
  ellipse(bear.x + eyeOffsetX, eyeY, eyeSize * 0.4);
  pop();

  drawNoseAndMouth();
}

/**
 * Draw a nose, and a mouth that gets thicker and wider as he panics
 */
function drawNoseAndMouth() {
  let noseY = bear.y + bear.size * 0.1;
  let mouthY = bear.y + bear.size * 0.25;
  let mouthWidth = lerp(bear.size * 0.1, bear.size * 0.3, panic);
  let mouthWeight = lerp(2, 9, panic);

  // Nose
  push();
  noStroke();
  fill(40, 25, 20);
  ellipse(bear.x, noseY, bear.size * 0.12, bear.size * 0.08);
  pop();

  // Mouth
  push();
  stroke(40, 25, 20);
  strokeWeight(mouthWeight);
  line(bear.x - mouthWidth / 2, mouthY, bear.x + mouthWidth / 2, mouthY);
  pop();
}