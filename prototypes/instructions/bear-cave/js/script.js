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
 * Draws the night sky with a crescent moon and a few stars
 */
function drawSky() {
    // Dark blue night
    background(20, 25, 55);

    // The moon is a full circle with a sky-coloured circle
    // drawn slightly off-centre on top to "bite" it into a crescent
    push();
    noStroke();
    fill(250, 240, 200);
    ellipse(400, 90, 70);
    fill(20, 25, 55);
    ellipse(415, 80, 60);
    pop();

    // Stars are single points made bigger with strokeWeight()
    push();
    stroke(255, 255, 230);
    strokeWeight(3);
    point(60, 60);
    point(130, 110);
    point(210, 40);
    point(300, 95);
    point(460, 170);
    point(30, 170);
    pop();
}