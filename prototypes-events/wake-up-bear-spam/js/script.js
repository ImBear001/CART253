/**
 * Wake Up Bear Spam
 * Tyler Myrans
 *
 * The bear is hibernating and you need him awake. Mash any key to shake
 * him. Every press wakes him up a little more, but stop pressing and he
 * drifts right back to sleep. Get him all the way awake and... well,
 * you asked for it.
 *
 * Explores events: keyPressed() fires once for every key press, so the
 * player has to press over and over. Time passing pulls him back to sleep.
 */

"use strict";

// How awake the bear is, from 0 (deep sleep) to 100 (wide awake)
let awake = 0;

// How much each key press wakes him up
const pressStrength = 6;

// How fast he falls back asleep every frame
const sleepSpeed = 0.6;

// Counts how many keys have been pressed
let presses = 0;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Lets the bear drift back to sleep, then draws the cave, the bear and the meter
 */
function draw() {
    // Time passing pulls him back to sleep
    awake = max(awake - sleepSpeed, 0);

    drawCave();
    drawBear();

    drawMeter();
    drawMessage();
}

/**
 * Every time any key is pressed, the bear wakes up a little more
 */
function keyPressed() {
    awake = min(awake + pressStrength, 100);
    presses += 1;
}

/**
 * Draws the inside of the cave
 */
function drawCave() {
    background("#2b211b");
    push();
    noStroke();
    fill("#3c2d23");
    ellipse(width / 2, 280, 760, 520);
    fill("#4a382b");
    ellipse(width / 2, 300, 560, 400);
    fill("#5a4535");
    rect(0, 340, width, height - 340);
    pop();
}

/**
 * Draws the bear curled up asleep, breathing faster as he wakes up
 */
function drawBear() {
    const x = width / 2;
    // He breathes slowly when asleep and fast when he's waking up
    const breathSpeed = map(awake, 0, 100, 0.03, 0.2);
    const breath = sin(frameCount * breathSpeed) * 4;

    push();
    noStroke();

    // Curled up in a ball on the floor
    fill(92, 58, 33);
    ellipse(x, 300 + breath * 0.5, 300 + breath, 140 + breath);
    drawHead(x - 110, 290, 110);
    if (awake < 40) {
        drawZzz(x - 60, 230);
    }
    pop();
}

/**
 * Draws the bear's head at the position and size passed in,
 * with his face changing as he wakes up
 */
function drawHead(x, y, size) {
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

    // Eyes open wider the more awake he is
    const eyeOpen = map(awake, 0, 100, 0, size * 0.09);
    stroke(25, 15, 10);
    strokeWeight(size * 0.025);
    fill(25, 15, 10);
    ellipse(x - size * 0.19, y - size * 0.08, size * 0.1, max(eyeOpen, 1));
    ellipse(x + size * 0.19, y - size * 0.08, size * 0.1, max(eyeOpen, 1));

    // Sleepy flat mouth
    line(x - size * 0.05, y + size * 0.26, x + size * 0.05, y + size * 0.26);
    pop();
}

/**
 * Draws floating Zzz above the position passed in
 */
function drawZzz(x, y) {
    push();
    fill(255, 255, 255, 200);
    noStroke();
    textStyle(BOLD);
    const bob = sin(frameCount * 0.05) * 6;
    textSize(18);
    text("z", x, y + bob);
    textSize(26);
    text("z", x + 18, y - 22 + bob);
    textSize(36);
    text("Z", x + 40, y - 52 + bob);
    pop();
}

/**
 * Draws the meter showing how awake the bear is
 */
function drawMeter() {
    push();
    noStroke();
    fill(0, 0, 0, 140);
    rect(150, 400, 300, 22, 11);
    // The meter turns from blue (asleep) to red (awake)
    const meterColour = lerpColor(color(90, 130, 220), color(230, 70, 50), awake / 100);
    fill(meterColour);
    rect(150, 400, 300 * awake / 100, 22, 11);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(13);
    text("AWAKE", width / 2, 411);
    pop();
}

/**
 * Draws the instructions, changing as he wakes up
 */
function drawMessage() {
    push();
    noStroke();
    textAlign(CENTER, CENTER);
    fill(255);

    if (awake === 0) {
        textSize(20);
        text("He's hibernating. Mash any key to wake him up.", width / 2, 40);
    }
    else if (awake < 50) {
        textSize(20);
        text("Keep going...", width / 2, 40);
    }
    else {
        textSize(20);
        text("He's stirring! Don't stop!", width / 2, 40);
    }
    pop();
}