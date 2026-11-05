/**
 * Bear Choir
 * Tyler Myrans
 *
 * Seven bears stand in a row, each one singing a different note of
 * the scale, from the big low-voiced bear on the left to the tiny
 * high-voiced cub on the right. Click a bear (or press A S D F G H J)
 * to make him sing. Press R to record a song, R again to stop, and
 * P to have the whole choir play it back for you.
 *
 * Explores arrays: the bears are an array, their notes and names come
 * from arrays, the floating music notes are an array, and the song
 * you record is an array of which bear sang and when.
 *
 * Uses p5.sound (included in the template) to make the tones.
 */

"use strict";

// What each bear's note is called, from low to high
const noteNames = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"];

// The key that makes each bear sing
const keys = ["a", "s", "d", "f", "g", "h", "j"];

// The colour of each bear's choir robe
const robeColours = ["#c0392b", "#e67e22", "#f1c40f", "#27ae60", "#2980b9", "#8e44ad", "#d35490"];

// The bears in the choir, created in setup()
let bears = [];

/**
 * Creates the canvas and the seven bears
 */
function setup() {
    createCanvas(600, 450);

    for (let i = 0; i < noteNames.length; i++) {
        bears.push(createBear(i));
    }
}

/**
 * Draws the stage and every bear in the choir
 */
function draw() {
    drawStage();

    for (let i = 0; i < bears.length; i++) {
        drawBear(bears[i]);
    }

    drawMessage();
}

/**
 * Returns a new bear for the place in the choir passed in. Bears on the
 * left are bigger with lower voices, bears on the right are smaller.
 */
function createBear(index) {
    const size = map(index, 0, noteNames.length - 1, 86, 52);

    const bear = {
        x: 90 + index * 70,
        y: 300 - size * 0.3,
        size: size,
        robe: robeColours[index],
        noteName: noteNames[index],
        key: keys[index]
    };
    return bear;
}

/**
 * Draws the stage with its curtains, spotlight and wooden floor
 */
function drawStage() {
    background("#2a1420");
    push();
    noStroke();

    // Spotlight
    fill(255, 240, 200, 25);
    ellipse(width / 2, 300, 700, 300);

    // Curtains on each side, swaying a little
    fill("#8b1e2d");
    const sway = sin(frameCount * 0.02) * 4;
    for (let i = 0; i < 4; i++) {
        rect(i * 18 + sway, 0, 14, height);
        rect(width - 14 - i * 18 - sway, 0, 14, height);
    }
    rect(0, 0, width, 40);
    fill("#a5283a");
    for (let x = 0; x < width; x += 30) {
        arc(x + 15, 40, 30, 24, 0, PI);
    }

    // Wooden floor
    fill("#7a5230");
    rect(0, 340, width, height - 340);
    stroke("#6a4528");
    strokeWeight(2);
    for (let y = 360; y < height; y += 22) {
        line(0, y, width, y);
    }
    pop();
}

/**
 * Draws the bear passed in wearing his choir robe,
 * with his note name and key underneath
 */
function drawBear(bear) {
    const x = bear.x;
    const y = bear.y;
    const size = bear.size;

    push();
    noStroke();

    // Robe
    fill(bear.robe);
    rect(x - size * 0.45, y + size * 0.3, size * 0.9, size * 0.9, size * 0.2, size * 0.2, 4, 4);
    // White collar
    fill(245);
    arc(x, y + size * 0.32, size * 0.6, size * 0.3, 0, PI);

    // Ears
    fill(92, 58, 33);
    ellipse(x - size * 0.34, y - size * 0.34, size * 0.3);
    ellipse(x + size * 0.34, y - size * 0.34, size * 0.3);

    // Head
    fill(110, 70, 40);
    ellipse(x, y, size, size * 0.92);

    // Muzzle and nose
    fill(196, 156, 116);
    ellipse(x, y + size * 0.17, size * 0.42, size * 0.32);
    fill(35, 22, 15);
    ellipse(x, y + size * 0.08, size * 0.13, size * 0.08);

    // Eyes and a little closed mouth
    fill(25, 15, 10);
    ellipse(x - size * 0.18, y - size * 0.07, size * 0.08);
    ellipse(x + size * 0.18, y - size * 0.07, size * 0.08);
    stroke(25, 15, 10);
    strokeWeight(size * 0.025);
    line(x - size * 0.05, y + size * 0.26, x + size * 0.05, y + size * 0.26);
    pop();

    // Note name and key under each bear
    push();
    noStroke();
    textAlign(CENTER, CENTER);
    fill(255, 235, 200);
    textStyle(BOLD);
    textSize(15);
    text(bear.noteName, x, 385);
    textStyle(NORMAL);
    textSize(12);
    fill(255, 235, 200, 160);
    text(bear.key.toUpperCase(), x, 405);
    pop();
}

/**
 * Draws the name of the show at the top
 */
function drawMessage() {
    push();
    noStroke();
    fill(255, 235, 200);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("The Bear Choir is warming up...", width / 2, 72);
    pop();
}