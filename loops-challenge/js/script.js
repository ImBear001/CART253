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
 * Draws a gradient background, then lines across the canvas with
 * increasing thickness and gradually lightening colour, then lines
 * going down the canvas that get darker
 */
function draw() {
    drawGradient();

    // Where the first vertical line starts, its colour and its thickness
    let x = 0;
    let shade = 0;
    let weight = 1;

    // Keep drawing vertical lines until we run off the right side
    while (x <= width) {
        stroke(shade);
        strokeWeight(weight);
        line(x, 0, x, height);

        // Move over, get lighter and get thicker for the next line
        x += 50;
        shade += 25;
        weight += 1;
    }

    // Now the horizontal lines, starting at the top and starting white
    let y = 0;
    shade = 250;
    strokeWeight(2);

    // Keep drawing horizontal lines until we run off the bottom
    while (y <= height) {
        stroke(shade);
        line(0, y, width, y);

        // Move down and get darker for the next line
        y += 50;
        shade -= 25;
    }
}

/**
 * Fills the background with a gradient from pink to purple
 * made out of one vertical line for every pixel across
 */
function drawGradient() {
    push();
    strokeWeight(1);
    const left = color("pink");
    const right = color("purple");

    for (let x = 0; x < width; x++) {
        // How far across the canvas we are, from 0 to 1
        const amount = map(x, 0, width, 0, 1);
        stroke(lerpColor(left, right, amount));
        line(x, 0, x, height);
    }
    pop();
}