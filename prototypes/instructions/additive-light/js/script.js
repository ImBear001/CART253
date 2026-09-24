/**
 * Additive Light
 * Tyler Myrans
 *
 * An abstract piece about mixing light instead of paint. Three pure
 * hues (red, green, blue) are drawn as overlapping circles using
 * blendMode(ADD), so wherever they overlap the colours add together
 * the way stage lights do: red + green makes yellow, and all three
 * together make white. Colours are chosen with colorMode(HSB) so
 * each light is picked by its position on the colour wheel.
 * A ring of thick arcs in the same hues frames the whole thing.
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
 * Draws the frame of arcs and the three overlapping lights
 */
function draw() {
    // Almost-black background so the light has something to glow against
    background(0, 0, 5);

    drawFrame();
    drawLights();
}

/**
 * Draws a ring of four thick arcs around the centre, each a
 * different hue, with small gaps between them
 */
function drawFrame() {
    push();
    noFill();
    strokeWeight(14);
    // Square ends make the gaps between arcs crisp
    strokeCap(SQUARE);

    // Each arc covers a bit less than a quarter of the circle
    stroke(0, 100, 100);
    arc(250, 250, 440, 440, 0.05, HALF_PI - 0.05);

    stroke(120, 100, 100);
    arc(250, 250, 440, 440, HALF_PI + 0.05, PI - 0.05);

    stroke(240, 100, 100);
    arc(250, 250, 440, 440, PI + 0.05, PI + HALF_PI - 0.05);

    // The last quarter is dim grey, like a light that's switched off
    stroke(0, 0, 30);
    arc(250, 250, 440, 440, PI + HALF_PI + 0.05, TWO_PI - 0.05);
    pop();

    // A thin inner ring
    push();
    noFill();
    stroke(0, 0, 40);
    strokeWeight(1);
    ellipse(250, 250, 390);
    pop();
}

/**
 * Draws three overlapping circles of pure red, green, and blue
 * that add together where they overlap
 */
function drawLights() {
    push();
    noStroke();
    // ADD makes overlapping colours brighter instead of covering each other
    blendMode(ADD);

    // Red light (hue 0)
    fill(0, 100, 100);
    ellipse(205, 210, 220);

    // Green light (hue 120)
    fill(120, 100, 100);
    ellipse(295, 210, 220);

    // Blue light (hue 240)
    fill(240, 100, 100);
    ellipse(250, 290, 220);

    // Go back to normal blending so the next frame's background
    // covers everything instead of adding to it
    blendMode(BLEND);
    pop();
}