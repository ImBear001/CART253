/**
 * Additive Light
 * Tyler Myrans
 *
 * An abstract piece about mixing light instead of paint.
 *
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates the canvas and switches to HSB colour
 */
function setup() {
    createCanvas(500, 500);
    // Hue is 0-360 (degrees on the colour wheel),
    // saturation and brightness are 0-100
    colorMode(HSB, 360, 100, 100);
}

/**
 * Draws the scene
 */
function draw() {
    // Almost-black background so the light has something to glow against
    background(0, 0, 5);
}