/**
 * Cubs Parade
 * Tyler Myrans
 *
 * Mama Bear follows your mouse through the meadow. Click to add a cub
 * and it joins the end of the parade, waddling after the cub in front
 * of it. Every cub has its own name, size and colour. Stop moving and
 * the whole family sits down and dozes off, one cub at a time.
 *
 * Explores arrays: every cub lives in the cubs array. push() adds a new
 * cub, and a for loop moves and draws all of them, no matter how many.
 * An array of names gives each cub something to be called.
 */

"use strict";

// Mama Bear, who follows the mouse
const mama = {
    x: 300,
    y: 250,
    size: 70,
    // Which way she's facing (1 is right, -1 is left)
    facing: 1
};

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Moves Mama, then draws the meadow and Mama
 */
function draw() {
    moveMama();

    drawMeadow();
    drawBear(mama.x, mama.y, mama.size, mama.facing, "#6e4628");

    drawMessage();
}

/**
 * Moves Mama smoothly towards the mouse and turns her to face where she's going
 */
function moveMama() {
    const targetX = constrain(mouseX, 40, width - 40);
    const targetY = constrain(mouseY, 120, height - 40);
    const dx = targetX - mama.x;
    mama.x += dx * 0.05;
    mama.y += (targetY - mama.y) * 0.05;
    if (abs(dx) > 2) {
        mama.facing = Math.sign(dx);
    }
}

/**
 * Draws a bear seen from the side at the position and size passed in,
 * facing left or right, in the fur colour passed in
 */
function drawBear(x, y, size, facing, fur) {
    push();
    translate(x, y);
    // Flip the drawing to face left
    scale(facing, 1);
    noStroke();

    // Shadow on the grass
    fill(0, 0, 0, 40);
    ellipse(0, size * 0.42, size * 1.3, size * 0.2);

    const furColour = color(fur);
    fill(furColour);

    // Legs
    rect(-size * 0.45, size * 0.1, size * 0.2, size * 0.32, size * 0.08);
    rect(size * 0.25, size * 0.1, size * 0.2, size * 0.32, size * 0.08);
    // Body
    ellipse(0, 0, size * 1.25, size * 0.75);
    // Head
    ellipse(size * 0.58, -size * 0.25, size * 0.55, size * 0.5);
    // Ear
    ellipse(size * 0.48, -size * 0.5, size * 0.18);
    // Snout
    fill(lerpColor(furColour, color(240, 210, 170), 0.5));
    ellipse(size * 0.82, -size * 0.18, size * 0.26, size * 0.2);
    // Nose and eye
    fill(25, 15, 10);
    ellipse(size * 0.93, -size * 0.2, size * 0.08);
    ellipse(size * 0.65, -size * 0.32, size * 0.07);
    pop();
}

/**
 * Draws the meadow: sky, rolling hills, grass and a few trees
 */
function drawMeadow() {
    background("#9fd3e6");
    push();
    noStroke();

    // Far hills
    fill("#7fb069");
    ellipse(150, 150, 500, 160);
    ellipse(480, 160, 520, 180);

    // Pine trees along the back
    for (let x = 20; x < width; x += 70) {
        drawTree(x, 130 + (x % 3) * 8);
    }

    // Grass
    fill("#8cc56b");
    rect(0, 140, width, height - 140);

    // A few tufts of grass that stay in the same place
    fill("#74ad55");
    for (let i = 0; i < 25; i++) {
        const tuftX = (i * 97) % width;
        const tuftY = 170 + (i * 53) % (height - 180);
        triangle(tuftX, tuftY, tuftX + 4, tuftY - 10, tuftX + 8, tuftY);
    }
    pop();
}

/**
 * Draws a little pine tree with its base at the position passed in
 */
function drawTree(x, y) {
    push();
    noStroke();
    fill("#5b3a24");
    rect(x - 4, y - 10, 8, 14);
    fill("#3f7d4a");
    triangle(x - 22, y - 8, x + 22, y - 8, x, y - 50);
    triangle(x - 17, y - 28, x + 17, y - 28, x, y - 65);
    pop();
}

/**
 * Draws a message at the top
 */
function drawMessage() {
    push();
    noStroke();
    fill(255, 255, 255, 220);
    rectMode(CENTER);
    rect(width / 2, 28, 420, 36, 18);
    fill(40, 30, 20);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("Mama Bear is out for a walk. Lead her with your mouse!", width / 2, 28);
    pop();
}