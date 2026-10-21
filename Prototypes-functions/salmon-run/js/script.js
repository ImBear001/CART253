/**
 * Salmon Run
 * Tyler Myrans
 *
 * Salmon leap out of the river and the bear is hungry.
 * Click a salmon to catch it for him.
 *
 * Explores functions with parameters and return values.
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Draws the river and the bear every frame
 */
function draw() {
    drawRiver();
    drawBear();
}

/**
 * Draws the forest, the far bank and the moving water
 */
function drawRiver() {
    background(126, 176, 196);
    noStroke();

    // Forest on the far bank
    fill(64, 98, 60);
    rect(0, 0, width, 120);
    fill(44, 72, 44);
    for (let i = 0; i < 9; i++) {
        triangle(i * 75 - 10, 120, i * 75 + 30, 20 + (i % 3) * 18, i * 75 + 70, 120);
    }

    // Water
    fill(38, 100, 140);
    rect(0, 250, width, height - 250);

    // Ripples drifting across the water
    stroke(160, 205, 225, 140);
    strokeWeight(3);
    for (let i = 0; i < 6; i++) {
        const rippleX = (frameCount * 1.5 + i * 130) % (width + 100) - 50;
        line(rippleX, 280 + i * 28, rippleX + 40, 280 + i * 28);
    }
}

/**
 * Draws the bear's head on the bank, mouth open because he's hungry
 */
function drawBear() {
    const x = width - 70;
    const y = 180;
    const size = 90;

    push();
    noStroke();

    // Ears
    fill(92, 58, 33);
    ellipse(x - size * 0.36, y - size * 0.36, size * 0.34);
    ellipse(x + size * 0.36, y - size * 0.36, size * 0.34);

    // Head
    fill(110, 70, 40);
    ellipse(x, y, size, size * 0.92);

    // Muzzle and nose
    fill(196, 156, 116);
    ellipse(x, y + size * 0.17, size * 0.42, size * 0.32);
    fill(35, 22, 15);
    ellipse(x, y + size * 0.09, size * 0.14, size * 0.09);

    // Eyes
    ellipse(x - size * 0.19, y - size * 0.08, size * 0.08);
    ellipse(x + size * 0.19, y - size * 0.08, size * 0.08);

    // Open hungry mouth
    fill(120, 30, 30);
    ellipse(x, y + size * 0.24, size * 0.1, size * 0.09);
    pop();
}/**
 * Salmon Run
 * Tyler Myrans
 *
 * Salmon leap out of the river and the bear is hungry.
 * Click a salmon to catch it for him.
 *
 * Explores functions with parameters and return values.
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Draws the river and the bear every frame
 */
function draw() {
    drawRiver();
    drawBear();
}

/**
 * Draws the forest, the far bank and the moving water
 */
function drawRiver() {
    background(126, 176, 196);
    noStroke();

    // Forest on the far bank
    fill(64, 98, 60);
    rect(0, 0, width, 120);
    fill(44, 72, 44);
    for (let i = 0; i < 9; i++) {
        triangle(i * 75 - 10, 120, i * 75 + 30, 20 + (i % 3) * 18, i * 75 + 70, 120);
    }

    // Water
    fill(38, 100, 140);
    rect(0, 250, width, height - 250);

    // Ripples drifting across the water
    stroke(160, 205, 225, 140);
    strokeWeight(3);
    for (let i = 0; i < 6; i++) {
        const rippleX = (frameCount * 1.5 + i * 130) % (width + 100) - 50;
        line(rippleX, 280 + i * 28, rippleX + 40, 280 + i * 28);
    }
}

/**
 * Draws the bear's head on the bank, mouth open because he's hungry
 */
function drawBear() {
    const x = width - 70;
    const y = 180;
    const size = 90;

    push();
    noStroke();

    // Ears
    fill(92, 58, 33);
    ellipse(x - size * 0.36, y - size * 0.36, size * 0.34);
    ellipse(x + size * 0.36, y - size * 0.36, size * 0.34);

    // Head
    fill(110, 70, 40);
    ellipse(x, y, size, size * 0.92);

    // Muzzle and nose
    fill(196, 156, 116);
    ellipse(x, y + size * 0.17, size * 0.42, size * 0.32);
    fill(35, 22, 15);
    ellipse(x, y + size * 0.09, size * 0.14, size * 0.09);

    // Eyes
    ellipse(x - size * 0.19, y - size * 0.08, size * 0.08);
    ellipse(x + size * 0.19, y - size * 0.08, size * 0.08);

    // Open hungry mouth
    fill(120, 30, 30);
    ellipse(x, y + size * 0.24, size * 0.1, size * 0.09);
    pop();
}