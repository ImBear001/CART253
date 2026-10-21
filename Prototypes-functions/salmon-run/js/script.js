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

// The three salmon, created in setup()
let salmonA = undefined;
let salmonB = undefined;
let salmonC = undefined;

// How many salmon the bear has eaten
let caught = 0;

// Counts down after a catch so the bear smiles for a moment
let chompTimer = 0;

/**
 * Creates the canvas and the three salmon
 */
function setup() {
    createCanvas(600, 450);

    salmonA = createSalmon();
    salmonB = createSalmon();
    salmonC = createSalmon();
}

/**
 * Draws the river, moves and draws the salmon, then draws the bear
 */
function draw() {
    drawRiver();

    moveSalmon(salmonA);
    moveSalmon(salmonB);
    moveSalmon(salmonC);

    drawSalmon(salmonA);
    drawSalmon(salmonB);
    drawSalmon(salmonC);

    drawBear();
    drawScore();
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

    // Mouth: a happy smile right after a catch, otherwise open and hungry
    if (chompTimer > 0) {
        noFill();
        stroke(35, 22, 15);
        strokeWeight(3);
        arc(x, y + size * 0.22, size * 0.16, size * 0.1, 0, PI);
        chompTimer -= 1;
    }
    else {
        fill(120, 30, 30);
        ellipse(x, y + size * 0.24, size * 0.1, size * 0.09);
    }
    pop();
}

/**
 * Returns a brand new salmon that leaps out from one side of the river
 */
function createSalmon() {
    // Pick a side to jump from
    let fromLeft = false;
    if (random() < 0.5) {
        fromLeft = true;
    }

    let startX = width + 40;
    let speedX = -random(2.5, 4.5);
    if (fromLeft) {
        startX = -40;
        speedX = random(2.5, 4.5);
    }

    const salmon = {
        x: startX,
        y: random(300, 360),
        velocityX: speedX,
        velocityY: -random(7, 10),
        size: random(36, 56),
        tint: random(180, 235)
    };
    return salmon;
}

/**
 * Moves the salmon passed in along its leap, with gravity
 * pulling it back down, and replaces it once it's gone
 */
function moveSalmon(salmon) {
    salmon.x += salmon.velocityX;
    salmon.y += salmon.velocityY;
    salmon.velocityY += 0.22;

    const offBottom = salmon.y > height + 60;
    const offSides = salmon.x < -80 || salmon.x > width + 80;
    if (offBottom || offSides) {
        resetSalmon(salmon);
    }
}

/**
 * Gives the salmon passed in a fresh leap by copying in
 * the properties of a newly created salmon
 */
function resetSalmon(salmon) {
    const fresh = createSalmon();
    salmon.x = fresh.x;
    salmon.y = fresh.y;
    salmon.velocityX = fresh.velocityX;
    salmon.velocityY = fresh.velocityY;
    salmon.size = fresh.size;
    salmon.tint = fresh.tint;
}

/**
 * Draws the salmon passed in, pointed in the direction it's moving
 */
function drawSalmon(salmon) {
    push();
    translate(salmon.x, salmon.y);
    rotate(atan2(salmon.velocityY, salmon.velocityX));
    noStroke();

    // Body and tail
    fill(salmon.tint, 95, 85);
    ellipse(0, 0, salmon.size, salmon.size * 0.42);
    triangle(-salmon.size * 0.45, 0,
        -salmon.size * 0.78, -salmon.size * 0.22,
        -salmon.size * 0.78, salmon.size * 0.22);

    // Eye
    fill(255);
    ellipse(salmon.size * 0.28, -salmon.size * 0.05, salmon.size * 0.1);
    fill(20);
    ellipse(salmon.size * 0.3, -salmon.size * 0.05, salmon.size * 0.05);
    pop();
}

/**
 * Returns true if the mouse is on the salmon passed in
 */
function isClicked(salmon) {
    const distance = dist(mouseX, mouseY, salmon.x, salmon.y);
    return distance < salmon.size * 0.6;
}

/**
 * Catches the salmon passed in if it was clicked: adds a point,
 * makes the bear chomp, and sends the salmon back into the river
 */
function checkCatch(salmon) {
    if (isClicked(salmon)) {
        caught += 1;
        chompTimer = 15;
        resetSalmon(salmon);
    }
}

/**
 * Checks every salmon for a catch when the mouse is clicked
 */
function mousePressed() {
    checkCatch(salmonA);
    checkCatch(salmonB);
    checkCatch(salmonC);
}

/**
 * Draws how many salmon the bear has eaten
 */
function drawScore() {
    push();
    noStroke();
    fill(255);
    textSize(22);
    textAlign(LEFT, TOP);
    text("Salmon caught: " + caught, 18, 16);
    pop();
}