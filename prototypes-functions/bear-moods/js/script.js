/**
 * Bear Moods
 * Tyler Myrans
 *
 * Keep the bear happy. His hunger, energy and happiness drain over time,
 * and his mood changes depending on how well you take care of him.
 *
 * Explores functions with parameters and return values: one function
 * draws the bear in any mood, and one function works out his mood.
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Draws the cave scene
 */
function draw() {
    drawCave();
    drawBear(width / 2, 150, 130);
}

/**
 * Draws the whole cave: the rock walls, the floor, the stalactites
 * hanging from the ceiling and the bear's stuff lying around
 */
function drawCave() {
    // Rock walls
    background("#2b211b");

    // Lighter rock around the inside of the cave
    push();
    noStroke();
    fill("#3c2d23");
    ellipse(width / 2, 260, 760, 520);
    fill("#4a382b");
    ellipse(width / 2, 280, 560, 400);
    pop();

    // Floor
    push();
    noStroke();
    fill("#5a4535");
    rect(0, 330, width, height - 330);
    fill("#4d3a2c");
    ellipse(width / 2, 330, 700, 50);
    pop();

    // Stalactites of different sizes along the ceiling
    drawStalactite(40, 70);
    drawStalactite(95, 40);
    drawStalactite(150, 95);
    drawStalactite(450, 85);
    drawStalactite(505, 45);
    drawStalactite(560, 75);

    // The bear's things
    drawHoneyPot(85, 335);
    drawPawprint(420, 395, -0.3);
    drawPawprint(455, 375, -0.3);
    drawPawprint(500, 390, -0.3);
}

/**
 * Draws a pointed rock hanging from the ceiling at the x position
 * passed in, as long as the length passed in
 */
function drawStalactite(x, length) {
    push();
    noStroke();
    fill("#1f1813");
    triangle(x - length * 0.25, 0, x + length * 0.25, 0, x, length);
    // A drip of water at the tip
    fill(160, 200, 220, 160);
    ellipse(x, length + 6, 5, 7);
    pop();
}

/**
 * Draws a honey pot sitting on the floor at the position passed in
 */
function drawHoneyPot(x, y) {
    push();
    noStroke();

    // Pot
    fill("#9a6a3a");
    ellipse(x, y, 70, 60);
    fill("#7d532c");
    rect(x - 28, y - 34, 56, 12, 5);

    // Honey spilling over the top
    fill("#f0b030");
    ellipse(x, y - 34, 50, 10);
    ellipse(x - 12, y - 26, 9, 18);

    // Label
    fill("#f5e6c8");
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("HONEY", x, y + 4);
    pop();
}

/**
 * Draws a muddy bear pawprint at the position passed in,
 * turned by the angle passed in
 */
function drawPawprint(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    noStroke();
    fill("#3a2a1f");

    // Pad
    ellipse(0, 0, 22, 18);

    // Toes
    ellipse(-11, -13, 7, 8);
    ellipse(-4, -17, 7, 8);
    ellipse(4, -17, 7, 8);
    ellipse(11, -13, 7, 8);
    pop();
}

/**
 * Draws the bear sitting in the cave at the position and size passed in.
 * He slowly breathes in and out so he looks alive.
 */
function drawBear(x, y, size) {
    // Breathing: the bear grows and shrinks a tiny bit over time
    const breath = sin(frameCount * 0.05) * size * 0.02;
    const bodySize = size * 1.3 + breath;

    push();
    noStroke();

    // Body
    fill(92, 58, 33);
    ellipse(x, y + size * 0.85, bodySize, bodySize * 0.9);

    // Belly
    fill(150, 105, 70);
    ellipse(x, y + size * 0.95, bodySize * 0.55, bodySize * 0.55);

    // Paws resting on the floor
    fill(80, 50, 28);
    ellipse(x - size * 0.4, y + size * 1.3, size * 0.35, size * 0.22);
    ellipse(x + size * 0.4, y + size * 1.3, size * 0.35, size * 0.22);

    // Ears
    fill(92, 58, 33);
    ellipse(x - size * 0.36, y - size * 0.36, size * 0.34);
    ellipse(x + size * 0.36, y - size * 0.36, size * 0.34);
    fill(150, 105, 70);
    ellipse(x - size * 0.36, y - size * 0.36, size * 0.17);
    ellipse(x + size * 0.36, y - size * 0.36, size * 0.17);

    // Head
    fill(110, 70, 40);
    ellipse(x, y, size, size * 0.92);

    // Muzzle and nose
    fill(196, 156, 116);
    ellipse(x, y + size * 0.17, size * 0.42, size * 0.32);
    fill(35, 22, 15);
    ellipse(x, y + size * 0.09, size * 0.14, size * 0.09);

    // Eyes
    fill(25, 15, 10);
    ellipse(x - size * 0.19, y - size * 0.08, size * 0.08);
    ellipse(x + size * 0.19, y - size * 0.08, size * 0.08);

    // Smile
    noFill();
    stroke(25, 15, 10);
    strokeWeight(size * 0.03);
    arc(x, y + size * 0.22, size * 0.16, size * 0.1, 0, PI);
    pop();
}