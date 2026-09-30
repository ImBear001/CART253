/**
 * Night in the Cave
 * Tyler Myrans
 *
 * Dusk turns into night outside the Bear Cave.
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

  background(sky.r, sky.g, sky.b);
}

/**
 * Move the sky colour a little closer to night each frame
 */
function updateSky() {
  sky.r = lerp(sky.r, sky.nightR, sky.fadeRate);
  sky.g = lerp(sky.g, sky.nightG, sky.fadeRate);
  sky.b = lerp(sky.b, sky.nightB, sky.fadeRate);
}