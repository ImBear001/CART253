/**
 * Dear Bear
 * Tyler Myrans
 *
 * Write a letter to the bear. Type anything you want, then press ENTER
 * to send it. He reads every word and reacts: mention honey and he
 * drools, mention bees and he panics, say goodbye and he cries. Tell him
 * a secret and he promises not to tell. Say something he doesn't
 * understand and he just tilts his head.
 *
 * Explores events: keyTyped() catches every letter the player types,
 * and keyPressed() handles BACKSPACE and ENTER.
 */

"use strict";

// What the bear says
let reply = "Write me a letter!";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Draws the bear, his speech bubble and the letter being written
 */
function draw() {
    drawRoom();
    drawBear(width / 2, 165, 150);
    drawSpeechBubble();
    drawLetter();
}

/**
 * Draws the cozy room behind the bear
 */
function drawRoom() {
    background("#3b2a20");
    push();
    noStroke();
    // Wallpaper stripes
    fill(255, 255, 255, 10);
    for (let x = 0; x < width; x += 40) {
        rect(x, 0, 20, 300);
    }
    // Floor
    fill("#5c4433");
    rect(0, 300, width, height - 300);
    pop();
}

/**
 * Draws the bear at the position and size passed in
 */
function drawBear(x, y, size) {
    push();
    translate(x, y);
    noStroke();

    // Body
    fill(92, 58, 33);
    ellipse(0, size * 0.95, size * 1.3, size * 0.9);

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

    drawFace(size);
    pop();
}

/**
 * Draws the bear's eyes and smile
 */
function drawFace(size) {
    const eyeX = size * 0.19;
    const eyeY = -size * 0.08;
    const lookX = 0;

    push();
    noStroke();
    fill(25, 15, 10);
    ellipse(-eyeX + lookX, eyeY + size * 0.03, size * 0.08);
    ellipse(eyeX + lookX, eyeY + size * 0.03, size * 0.08);

    // Smile
    stroke(25, 15, 10);
    strokeWeight(size * 0.025);
    noFill();
    arc(0, size * 0.24, size * 0.16, size * 0.1, 0, PI);
    pop();
}

/**
 * Draws the speech bubble with the bear's reply
 */
function drawSpeechBubble() {
    push();
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(width / 2, 34, 470, 44, 20);
    fill(30);
    textAlign(CENTER, CENTER);
    textSize(19);
    text(reply, width / 2, 34);
    pop();
}

/**
 * Draws the piece of paper the letter will be written on
 */
function drawLetter() {
    push();
    // Paper
    noStroke();
    fill(245, 236, 215);
    rect(60, 330, 480, 95, 6);
    // Lines on the paper
    stroke(200, 185, 160);
    line(80, 375, 520, 375);
    line(80, 405, 520, 405);

    noStroke();
    fill(70, 50, 40);
    textSize(13);
    text("Dear Bear,", 80, 352);

    pop();
}