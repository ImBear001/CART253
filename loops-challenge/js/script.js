/**
 * Lines
 * Pippin Barr
 * Looped by Tyler Myrans
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("pink");

    // Where the first line starts, its colour and its thickness
    let x = 0;
    let shade = 0;
    let weight = 1;

    // Keep drawing lines until we run off the canvas
    while (x <= width) {
        stroke(shade);
        strokeWeight(weight);
        line(x, 0, x, height);

        // Move over, get lighter and get thicker for the next line
        x += 50;
        shade += 25;
        weight += 1;
    }
}