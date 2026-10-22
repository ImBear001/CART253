/**
 * The Great Bear
 * Tyler Myrans
 *
 * A little bear sits on a hill looking up at the night sky. Somewhere up
 * there is Ursa Major, the Great Bear. Its shape glows for a few seconds
 * at the start, then disappears. Click its seven stars in order, from the
 * tip of the tail to the front of the bowl, before the sun comes up.
 * Watch out: other stars are mixed in, the sky slowly drifts, and every
 * wrong click resets your lines and costs you time.
 *
 * Explores refactoring with functions: every star is made by makeStar()
 * and handled by the same few functions, instead of copies of code.
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Draws the night sky and the little bear on his hill
 */
function draw() {
    drawSky();
    drawHill();
}

/**
 * Draws the night sky with lots of small twinkling background stars
 */
function drawSky() {
    background("#0b1026");

    // A lighter band near the horizon
    push();
    noStroke();
    fill(40, 50, 100, 120);
    ellipse(width / 2, height, width * 1.6, 360);
    pop();

    // Background stars. Using the same random seed every frame keeps them
    // in the same places, and noise() makes each one twinkle on its own.
    push();
    randomSeed(253);
    noStroke();
    for (let i = 0; i < 140; i++) {
        const x = random(width);
        const y = random(height - 80);
        const brightness = noise(i, frameCount * 0.02) * 255;
        fill(255, 255, 255, brightness);
        ellipse(x, y, random(1, 2.5));
    }
    // Go back to proper randomness for everything else
    randomSeed(millis());
    pop();
}

/**
 * Draws the dark hill at the bottom with the little bear sitting on it,
 * looking up at the sky
 */
function drawHill() {
    push();
    noStroke();

    // Hill
    fill("#05070f");
    ellipse(150, height + 40, 520, 200);
    ellipse(470, height + 60, 480, 160);

    // Little bear seen from behind: body, head and ears
    fill("#120d0a");
    ellipse(120, 388, 54, 50);
    ellipse(120, 352, 36, 34);
    ellipse(106, 338, 13);
    ellipse(134, 338, 13);
    pop();
}