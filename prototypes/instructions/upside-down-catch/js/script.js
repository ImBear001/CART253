/**
 * Upside Down Catch
 * Tyler Myrans
 *
 * The bear catches a salmon, but everything is flipped.
 *
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws the scene back to front
 */
function draw() {
    drawBackground();
}

/**
 * Draws the sky and a row of pine trees on the horizon
 */
function drawBackground() {
    // Pale sky
    background(170, 210, 235);

    // Pine trees are just dark green triangles
    push();
    noStroke();
    fill(40, 90, 60);
    triangle(0, 200, 40, 90, 80, 200);
    triangle(60, 200, 110, 70, 160, 200);
    triangle(340, 200, 390, 80, 440, 200);
    triangle(420, 200, 465, 100, 510, 200);
    pop();
}