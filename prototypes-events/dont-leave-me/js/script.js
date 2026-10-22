/**
 * Don't Leave Me
 * Tyler Myrans
 *
 * A very clingy bear. He loves it when your mouse is with him: his eyes
 * follow you everywhere and clicking him pets him. Move your mouse off
 * the canvas and he starts to panic. Switch to another browser tab and
 * when you come back he's crying and tells you exactly how long you
 * were gone. Resize the window and he gets squished.
 *
 * Explores events: mouseMoved() and mousePressed(), the canvas
 * mouseOver() and mouseOut() events, windowResized(), and the browser's
 * "visibilitychange" event for when the player switches tabs.
 */

"use strict";

// How the bear feels: "happy" or "petted"
let mood = "happy";

// Counts down while the bear is being petted
let moodTimer = 0;

// Where the bear is looking (follows the mouse)
let lookX = 0;
let lookY = 0;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Updates how the bear feels, then draws him and what he's saying
 */
function draw() {
    updateMood();

    drawRoom();
    drawBear(width / 2, 180, 160);
    drawMessage();
}

/**
 * Works out the bear's mood
 */
function updateMood() {
    // Being petted lasts for a little while
    if (moodTimer > 0) {
        moodTimer -= 1;
        return;
    }

    mood = "happy";
}

/**
 * When the mouse moves, the bear's eyes follow it
 */
function mouseMoved() {
    lookX = map(mouseX, 0, width, -1, 1, true);
    lookY = map(mouseY, 0, height, -1, 1, true);
}

/**
 * Clicking on the bear pets him
 */
function mousePressed() {
    if (dist(mouseX, mouseY, width / 2, 180) < 85) {
        mood = "petted";
        moodTimer = 60 * 2;
    }
}

/**
 * Draws the bear's warm room
 */
function drawRoom() {
    background("#e8c9a0");

    push();
    noStroke();
    fill(0, 0, 0, 30);
    rect(0, 330, width, height - 330);
    pop();
}

/**
 * Draws the bear at the position and size passed in, in his current mood
 */
function drawBear(x, y, size) {
    push();
    translate(x, y);

    // Happy and petted: he bounces
    if (mood === "happy" || mood === "petted") {
        translate(0, sin(frameCount * 0.1) * 4);
    }

    noStroke();

    // Body
    fill(92, 58, 33);
    ellipse(0, size * 0.95, size * 1.2, size * 0.9);

    // Ears
    ellipse(-size * 0.36, -size * 0.36, size * 0.34);
    ellipse(size * 0.36, -size * 0.36, size * 0.34);

    // Head
    fill(110, 70, 40);
    ellipse(0, 0, size, size * 0.92);

    // Muzzle and nose
    fill(196, 156, 116);
    ellipse(0, size * 0.17, size * 0.42, size * 0.32);
    fill(35, 22, 15);
    ellipse(0, size * 0.09, size * 0.14, size * 0.09);

    drawEyes(size);
    drawMouth(size);
    pop();
}

/**
 * Draws the bear's eyes, which follow the mouse
 */
function drawEyes(size) {
    const eyeX = size * 0.19;
    const eyeY = -size * 0.08;

    push();
    noStroke();

    if (mood === "petted") {
        // Happy closed eyes
        stroke(25, 15, 10);
        strokeWeight(size * 0.025);
        noFill();
        arc(-eyeX, eyeY + size * 0.02, size * 0.12, size * 0.08, PI, TWO_PI);
        arc(eyeX, eyeY + size * 0.02, size * 0.12, size * 0.08, PI, TWO_PI);
    }
    else {
        // White eyes with pupils that look at the mouse
        fill(255);
        ellipse(-eyeX, eyeY, size * 0.15);
        ellipse(eyeX, eyeY, size * 0.15);
        fill(25, 15, 10);
        const pupilX = lookX * size * 0.035;
        const pupilY = lookY * size * 0.035;
        ellipse(-eyeX + pupilX, eyeY + pupilY, size * 0.07);
        ellipse(eyeX + pupilX, eyeY + pupilY, size * 0.07);
    }

    pop();
}

/**
 * Draws the bear's smile and blush
 */
function drawMouth(size) {
    push();
    stroke(25, 15, 10);
    strokeWeight(size * 0.025);
    noFill();

    arc(0, size * 0.24, size * 0.16, size * 0.1, 0, PI);
    // Blush
    noStroke();
    fill(235, 120, 120, 130);
    ellipse(-size * 0.3, size * 0.08, size * 0.14, size * 0.08);
    ellipse(size * 0.3, size * 0.08, size * 0.14, size * 0.08);
    pop();
}

/**
 * Draws what the bear is saying
 */
function drawMessage() {
    let message = "Hi!! Stay with me okay?";

    if (mood === "petted") {
        message = "Hehe. More pets please.";
    }

    push();
    noStroke();
    fill(255, 255, 255, 230);
    rectMode(CENTER);
    rect(width / 2, 36, 520, 46, 22);
    fill(40);
    textAlign(CENTER, CENTER);
    textSize(19);
    text(message, width / 2, 36);

    // A hint for the player at the bottom
    fill(0, 0, 0, 120);
    textSize(13);
    text("Move your mouse around. Click him to pet him.", width / 2, 430);
    pop();
}