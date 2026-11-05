/**
 * Lines
 * Pippin Barr
 * Looped (and jazzed up) by Tyler Myrans
 * 
 * A series of lines across the canvas, over a scrolling rainbow.
 * The vertical lines sway like tall grass, and the horizontal lines
 * all reach out to follow your mouse.
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws the rainbow background, the swaying vertical lines,
 * and the horizontal lines that reach for the mouse
 */
function draw() {
    drawGradient();

    // Where the first vertical line starts, its colour and its thickness
    let x = 0;
    let shade = 0;
    let weight = 1;

    // Keep drawing vertical lines until we run off the right side
    while (x <= width) {
        // The bottom of each line sways back and forth, a little after the one before it
        const sway = sin(frameCount * 0.04 + x * 0.02) * 30;
        stroke(shade);
        strokeWeight(weight);
        line(x, 0, x + sway, height);

        // Move over, get lighter and get thicker for the next line
        x += 50;
        shade += 25;
        weight += 1;
    }

    // Now the horizontal lines, starting at the top and starting white
    let y = 0;
    shade = 250;
    strokeWeight(2);

    // Keep drawing lines until we run off the bottom. Each one stays fixed
    // on the left edge while its other end reaches for the mouse
    while (y <= height) {
        stroke(shade);
        line(0, y, mouseX, mouseY);

        // Move down and get darker for the next line
        y += 50;
        shade -= 25;
    }
}

/**
 * Fills the background with a rainbow that waves back and forth and
 * scrolls across, made out of one vertical line for every pixel across
 */
function drawGradient() {
    push();
    colorMode(HSB);
    strokeWeight(1);

    for (let x = 0; x < width; x++) {
        // sin() makes the hue swing back and forth, and frameCount makes it scroll
        const hue = map(sin(x * 0.015 + frameCount * 0.03), -1, 1, 0, 360);
        stroke(hue, 60, 100);
        line(x, 0, x, height);
    }
    pop();
}