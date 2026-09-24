/**
 * Upside Down Catch
 * Tyler Myrans
 *
 * The bear from Bear Cave catches a salmon, but everything is flipped.
 *
 * Uses:
 * p5.js
 * https://p5js.org/
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws the scene back to front
 */
function draw() {
    drawBackground();
    drawWaterfall();
    drawBearFish();
    drawGiantSalmon();
}

/**
 * Draws the sky and a row of pine trees on the horizon
 */
function drawBackground() {
    // Pale sky
    background(170, 210, 235);

    // Pine trees are just dark green triangles
    push();
    noStroke();
    fill(40, 90, 60);
    triangle(0, 200, 40, 90, 80, 200);
    triangle(60, 200, 110, 70, 160, 200);
    triangle(340, 200, 390, 80, 440, 200);
    triangle(420, 200, 465, 100, 510, 200);
    pop();
}

/**
 * Draws the rock ledge, the waterfall pouring off it, and the river
 */
function drawWaterfall() {
    // Rock ledge across the whole canvas
    push();
    noStroke();
    fill(110, 105, 100);
    rect(0, 190, 500, 40);
    pop();

    // Falling water
    push();
    noStroke();
    fill(120, 180, 230);
    rect(0, 225, 500, 115);
    pop();

    // White streaks so the water looks like it's falling
    push();
    stroke(235, 245, 255);
    strokeWeight(3);
    line(30, 235, 30, 320);
    line(90, 240, 90, 300);
    line(150, 230, 150, 330);
    line(360, 235, 360, 315);
    line(420, 240, 420, 330);
    line(470, 230, 470, 300);
    pop();

    // The river at the bottom
    push();
    noStroke();
    fill(60, 120, 190);
    rect(0, 330, 500, 170);
    pop();
}

/**
 * Draws the bear-fish: a bear head poking out of the water
 * on top of a brown fish body with a tail
 */
function drawBearFish() {
    push();
    noStroke();
    fill(110, 70, 40);

    // Long fish body lying in the water
    ellipse(200, 420, 220, 70);

    // Fish tail is two triangles making a V
    triangle(300, 420, 360, 385, 345, 420);
    triangle(300, 420, 345, 420, 360, 455);

    // Little fin on the back
    triangle(170, 390, 215, 390, 200, 365);
    pop();

    // Scales are small arcs along the body
    push();
    noFill();
    stroke(160, 110, 75);
    strokeWeight(2);
    arc(170, 425, 20, 20, 0, PI);
    arc(195, 425, 20, 20, 0, PI);
    arc(220, 425, 20, 20, 0, PI);
    arc(245, 425, 20, 20, 0, PI);
    arc(182, 440, 20, 20, 0, PI);
    arc(207, 440, 20, 20, 0, PI);
    arc(232, 440, 20, 20, 0, PI);
    pop();

    push();
    noStroke();

    // Ears go first so the head covers their bottom halves
    fill(110, 70, 40);
    ellipse(110, 300, 36);
    ellipse(180, 300, 36);
    fill(160, 110, 75);
    ellipse(110, 300, 18);
    ellipse(180, 300, 18);

    // Head poking up out of the water
    fill(110, 70, 40);
    ellipse(145, 345, 110, 100);

    // Wide scared eyes, looking up at the giant salmon
    fill(255);
    ellipse(125, 330, 24);
    ellipse(165, 330, 24);
    fill(0);
    ellipse(131, 325, 10);
    ellipse(171, 325, 10);

    // Muzzle and nose
    fill(175, 130, 90);
    ellipse(145, 360, 50, 36);
    fill(30, 20, 15);
    ellipse(145, 352, 16, 11);

    // Mouth open in a tiny scream
    ellipse(145, 372, 10, 12);
    pop();
}

/**
 * Draws a giant salmon diving head-first out of the sky
 * with its mouth wide open
 */
function drawGiantSalmon() {
    // Speed lines above the salmon so it looks like it's diving fast
    push();
    stroke(255);
    strokeWeight(3);
    line(270, 40, 275, 110);
    line(390, 40, 385, 110);
    line(250, 90, 258, 150);
    line(410, 90, 402, 150);
    pop();

    push();
    noStroke();

    // Body is a tall ellipse (the tail end is hidden in the cloud)
    fill(245, 130, 115);
    ellipse(330, 120, 100, 230);

    // Stripe down the middle
    fill(255, 175, 160);
    ellipse(330, 125, 16, 170);

    // Head is a triangle pointing down at the bear-fish
    fill(225, 110, 95);
    triangle(282, 200, 378, 200, 330, 290);

    // Open mouth
    fill(120, 20, 30);
    triangle(305, 235, 355, 235, 330, 290);

    // Teeth are tiny white triangles along the top of the mouth
    fill(255);
    triangle(310, 235, 320, 235, 315, 247);
    triangle(325, 235, 335, 235, 330, 247);
    triangle(340, 235, 350, 235, 345, 247);

    // Hungry eyes looking down and to the left at the bear-fish
    fill(255);
    ellipse(305, 210, 22);
    ellipse(355, 210, 22);
    fill(0);
    ellipse(300, 214, 10);
    ellipse(350, 214, 10);
    pop();

    // Angry eyebrows
    push();
    stroke(120, 20, 30);
    strokeWeight(4);
    line(292, 192, 316, 200);
    line(368, 192, 344, 200);
    pop();
}