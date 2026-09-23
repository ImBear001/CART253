/**
 * Bear Cave
 * Tyler Myrans
 *
 * A bear peeking out of its cave on a quiet night.
 *
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates a square canvas for the scene
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws the night scene back to front
 */
function draw() {
    drawSky();
}

/**
 * Draws the night sky
 */
function drawSky() {
    // Dark blue night
    background(20, 25, 55);
}