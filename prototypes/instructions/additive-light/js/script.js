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
 * Draws the three lights
 */
function draw() {
    // Almost-black background so the light has something to glow against
    background(0, 0, 5);

    drawLights();
}

/**
 * Draws three overlapping circles of pure red, green, and blue
 */
function drawLights() {
    push();
    noStroke();

    // Red light (hue 0)
    fill(0, 100, 100);
    ellipse(205, 210, 220);

    // Green light (hue 120)
    fill(120, 100, 100);
    ellipse(295, 210, 220);

    // Blue light (hue 240)
    fill(240, 100, 100);
    ellipse(250, 290, 220);
    pop();
}