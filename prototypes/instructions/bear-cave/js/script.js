/**
 * Bear Cave
 * Tyler Myrans
 *
 * A bear peeking out of its cave on a quiet night. The whole scene is
 * built by layering simple shapes on top of each other: the rock is a
 * custom shape made with beginShape() and vertex(), the cave mouth is
 * an arc(), and the bear is a stack of ellipses with its paws resting
 * over the edge of the ground.
 *
 * The idea of splitting the drawing into small named functions comes
 * from Pippin Barr's "Cat" example.
 *
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates a square canvas for the scene
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws the night scene back to front
 */
function draw() {
    drawSky();
    drawRock();
    drawCaveMouth();
    drawGround();
    drawBear();
    drawCampfire();
}

/**
 * Draws the night sky with a crescent moon and a few stars
 */
function drawSky() {
    // Dark blue night
    background(20, 25, 55);

    // The moon is a full circle with a sky-coloured circle
    // drawn slightly off-centre on top to "bite" it into a crescent
    push();
    noStroke();
    fill(250, 240, 200);
    ellipse(400, 90, 70);
    fill(20, 25, 55);
    ellipse(415, 80, 60);
    pop();

    // Stars are single points made bigger with strokeWeight()
    push();
    stroke(255, 255, 230);
    strokeWeight(3);
    point(60, 60);
    point(130, 110);
    point(210, 40);
    point(300, 95);
    point(460, 170);
    point(30, 170);
    pop();
}

/**
 * Draws the big rock the cave is carved into
 */
function drawRock() {
    push();
    noStroke();
    fill(95, 88, 82);
    // A lumpy mountain shape made point by point
    beginShape();
    vertex(40, 390);
    vertex(90, 260);
    vertex(170, 190);
    vertex(260, 160);
    vertex(350, 200);
    vertex(430, 280);
    vertex(470, 390);
    endShape(CLOSE);
    pop();
}

/**
 * Draws the dark opening of the cave
 */
function drawCaveMouth() {
    push();
    noStroke();
    fill(15, 12, 10);
    // Top half of an ellipse (from PI to TWO_PI) makes an archway
    arc(250, 390, 220, 240, PI, TWO_PI, CHORD);
    pop();
}

/**
 * Draws the grassy ground in front of the cave
 */
function drawGround() {
    push();
    noStroke();
    fill(40, 70, 45);
    rect(0, 390, 500, 110);
    pop();
}

/**
 * Draws the whole bear
 */
function drawBear() {
    drawBearHead();
    drawBearFace();
    drawBearPaws();
}

/**
 * Draws the bear's head and ears
 */
function drawBearHead() {
    push();
    noStroke();

    // Ears go first so the head covers their bottom halves
    fill(110, 70, 40);
    ellipse(210, 305, 36);
    ellipse(290, 305, 36);

    // Inside of the ears
    fill(160, 110, 75);
    ellipse(210, 305, 18);
    ellipse(290, 305, 18);

    // Head
    fill(110, 70, 40);
    ellipse(250, 345, 120, 100);
    pop();
}

/**
 * Draws the bear's eyes, muzzle, and nose
 */
function drawBearFace() {
    push();
    noStroke();

    // Whites of the eyes
    fill(255);
    ellipse(228, 332, 16);
    ellipse(272, 332, 16);

    // Pupils are nudged right so the bear is looking off to the side
    fill(0);
    ellipse(231, 332, 8);
    ellipse(275, 332, 8);

    // Lighter muzzle
    fill(175, 130, 90);
    ellipse(250, 365, 56, 40);

    // Nose
    fill(30, 20, 15);
    ellipse(250, 356, 20, 14);
    pop();
}

/**
 * Draws the bear's paws hanging over the edge of the ground
 */
function drawBearPaws() {
    push();
    noStroke();
    fill(110, 70, 40);
    ellipse(215, 392, 44, 26);
    ellipse(285, 392, 44, 26);
    pop();

    // Little claw marks on each paw
    push();
    stroke(230, 220, 200);
    strokeWeight(2);
    line(205, 398, 205, 404);
    line(215, 399, 215, 405);
    line(225, 398, 225, 404);
    line(275, 398, 275, 404);
    line(285, 399, 285, 405);
    line(295, 398, 295, 404);
    pop();
}

/**
 * Draws a small campfire on the grass beside the cave
 */
function drawCampfire() {
    // Warm glow on the grass (the 4th number in fill() is transparency)
    push();
    noStroke();
    fill(255, 150, 80,100);
    ellipse(100, 460, 160, 60);
    pop();

    // Two crossed logs
    push();
    noStroke();
    fill(90, 55, 30);
    quad(70, 455, 80, 445, 130, 460, 120, 470);
    quad(70, 460, 120, 445, 130, 455, 80, 470);
    pop();

    // Flames: big orange triangle with a smaller yellow one inside
    push();
    noStroke();
    fill(255, 120, 30);
    triangle(80, 455, 120, 455, 100, 400);
    fill(255, 220, 80);
    triangle(90, 455, 110, 455, 100, 420);
    pop();
}