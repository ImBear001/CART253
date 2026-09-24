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
}/**
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