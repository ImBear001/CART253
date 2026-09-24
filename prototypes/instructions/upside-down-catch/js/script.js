/**
 * Upside Down Catch
 * Tyler Myrans
 *
 * The bear from the Cave catches a salmon, but everything is flipped.
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
    drawWaterfall();
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

/**
 * Draws the rock ledge, the waterfall pouring off it, and the river
 */
function drawWaterfall() {
    // Rock ledge across the whole canvas
    push();
    noStroke();
    fill(110, 105, 100);
    rect(0, 190, 500, 40);
    pop();

    // Falling water
    push();
    noStroke();
    fill(120, 180, 230);
    rect(0, 225, 500, 115);
    pop();

    // White streaks so the water looks like it's falling
    push();
    stroke(235, 245, 255);
    strokeWeight(3);
    line(30, 235, 30, 320);
    line(90, 240, 90, 300);
    line(150, 230, 150, 330);
    line(360, 235, 360, 315);
    line(420, 240, 420, 330);
    line(470, 230, 470, 300);
    pop();

    // The river at the bottom
    push();
    noStroke();
    fill(60, 120, 190);
    rect(0, 330, 500, 170);
    pop();
}