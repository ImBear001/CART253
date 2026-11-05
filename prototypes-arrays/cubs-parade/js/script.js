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

// All the cubs in the parade, in order from front to back
let cubs = [];

// How much space each bear keeps from the one in front (scaled by their sizes)
const followGap = 0.62;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Moves Mama and her cubs, then draws the meadow and the whole parade
 */
function draw() {
    moveMama();
    for (let i = 0; i < cubs.length; i++) {
        // Each cub follows the cub in front, and the first cub follows Mama
        let leader = mama;
        if (i > 0) {
            leader = cubs[i - 1];
        }
        moveCub(cubs[i], leader);
    }

    drawMeadow();

    // Draw from the back of the line to the front so the front overlaps
    for (let i = cubs.length - 1; i >= 0; i--) {
        drawCub(cubs[i], i);
    }
    drawBear(mama.x, mama.y, mama.size, mama.facing, "#6e4628");

    drawMessage();
}

/**
 * Clicking adds a new cub to the end of the parade
 */
function mousePressed() {
    // The new cub starts just behind whoever is last in line
    let last = mama;
    if (cubs.length > 0) {
        last = cubs[cubs.length - 1];
    }
    const cub = createCub(last.x - last.size * last.facing, last.y);
    cubs.push(cub);
}

/**
 * Pressing BACKSPACE sends the last cub home
 */
function keyPressed() {
    if (keyCode === BACKSPACE && cubs.length > 0) {
        cubs.pop();
    }
}

/**
 * Returns a brand new cub at the position passed in
 */
function createCub(x, y) {
    const cub = {
        x: x,
        y: y,
        size: 34,
        fur: "#8a5a34",
        facing: 1,
        // Each cub waddles at its own rhythm
        waddleOffset: random(0, 100)
    };
    return cub;
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
 * Moves the cub passed in towards its leader, stopping a little way behind it
 */
function moveCub(cub, leader) {
    // Bigger bears need more room
    const followDistance = (leader.size + cub.size) * followGap;
    const distance = dist(cub.x, cub.y, leader.x, leader.y);
    if (distance > followDistance) {
        // Move most of the way to the gap behind the leader
        const amount = (distance - followDistance) / distance;
        const dx = (leader.x - cub.x) * amount;
        cub.x += dx * 0.3;
        cub.y += (leader.y - cub.y) * amount * 0.3;
        if (abs(dx) > 0.3) {
            cub.facing = Math.sign(dx);
        }
    }
}

/**
 * Draws the cub passed in, bobbing up and down as it waddles
 */
function drawCub(cub, placeInLine) {
    const bob = abs(sin(frameCount * 0.25 + cub.waddleOffset)) * -4;
    drawBear(cub.x, cub.y + bob, cub.size, cub.facing, cub.fur);
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
 * Draws the cub count and a message that changes as the parade grows
 */
function drawMessage() {
    let message = "Click to add a cub to the parade!";
    if (cubs.length >= 40) {
        message = "MAMA BEAR DID NOT SIGN UP FOR THIS";
    }
    else if (cubs.length >= 20) {
        message = "Okay that's a LOT of cubs.";
    }
    else if (cubs.length > 0) {
        message = "Lead them around! Backspace sends one home.";
    }

    push();
    noStroke();
    fill(255, 255, 255, 220);
    rectMode(CENTER);
    rect(width / 2, 28, 420, 36, 18);
    fill(40, 30, 20);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(message, width / 2, 28);

    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    fill(40, 30, 20);
    text("Cubs: " + cubs.length, 14, 60);
    pop();
}