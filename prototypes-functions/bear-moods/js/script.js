/**
 * Bear Moods
 * Tyler Myrans
 *
 * Keep the bear happy. His hunger, energy and happiness drain over time,
 * and his mood changes depending on how well you take care of him.
 *
 * Explores functions with parameters and return values: one function
 * draws the bear in any mood, and one function works out his mood.
 */

"use strict";
// The bear and how he is feeling
const bear = {
    mood: "happy"
};

// The four mood buttons, created in setup()
let happyButton = undefined;
let hungryButton = undefined;
let sleepyButton = undefined;
let grumpyButton = undefined;
/**
 * Creates the canvas
 */
/**
 * Creates the canvas and the four mood buttons
 */
function setup() {
    createCanvas(600, 450);

    happyButton = makeButton(80, "Happy", "happy", "#d9822b");
    hungryButton = makeButton(227, "Hungry", "hungry", "#b84a3a");
    sleepyButton = makeButton(373, "Sleepy", "sleepy", "#4f6aa3");
    grumpyButton = makeButton(520, "Grumpy", "grumpy", "#6b3fa0");
}

/**
 * Draws the cave, the bear and the buttons
 */
function draw() {
    drawCave();
    drawBear(width / 2, 150, 130, bear.mood);

    drawButton(happyButton);
    drawButton(hungryButton);
    drawButton(sleepyButton);
    drawButton(grumpyButton);
}
/**
 * Draws the whole cave: the rock walls, the floor, the stalactites
 * hanging from the ceiling and the bear's stuff lying around
 */
function drawCave() {
    // Rock walls
    background("#2b211b");

    // Lighter rock around the inside of the cave
    push();
    noStroke();
    fill("#3c2d23");
    ellipse(width / 2, 260, 760, 520);
    fill("#4a382b");
    ellipse(width / 2, 280, 560, 400);
    pop();

    // Floor
    push();
    noStroke();
    fill("#5a4535");
    rect(0, 330, width, height - 330);
    fill("#4d3a2c");
    ellipse(width / 2, 330, 700, 50);
    pop();

    // Stalactites of different sizes along the ceiling
    drawStalactite(40, 70);
    drawStalactite(95, 40);
    drawStalactite(150, 95);
    drawStalactite(450, 85);
    drawStalactite(505, 45);
    drawStalactite(560, 75);

    // The bear's things
    drawHoneyPot(85, 335);
    drawPawprint(430, 362, -1.2);
    drawPawprint(470, 345, -1.2);
    drawPawprint(510, 362, -1.2);
}

/**
 * Draws a pointed rock hanging from the ceiling at the x position
 * passed in, as long as the length passed in
 */
function drawStalactite(x, length) {
    push();
    noStroke();
    fill("#1f1813");
    triangle(x - length * 0.25, 0, x + length * 0.25, 0, x, length);
    // A drip of water at the tip
    fill(160, 200, 220, 160);
    ellipse(x, length + 6, 5, 7);
    pop();
}

/**
 * Draws a honey pot sitting on the floor at the position passed in
 */
function drawHoneyPot(x, y) {
    push();
    noStroke();

    // Pot
    fill("#9a6a3a");
    ellipse(x, y, 70, 60);
    fill("#7d532c");
    rect(x - 28, y - 34, 56, 12, 5);

    // Honey spilling over the top
    fill("#f0b030");
    ellipse(x, y - 34, 50, 10);
    ellipse(x - 12, y - 26, 9, 18);

    // Label
    fill("#f5e6c8");
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("HONEY", x, y + 4);
    pop();
}

/**
 * Draws a muddy bear pawprint at the position passed in,
 * turned by the angle passed in
 */
function drawPawprint(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    noStroke();
    fill("#3a2a1f");

    // Pad
    ellipse(0, 0, 22, 18);

    // Toes
    ellipse(-11, -13, 7, 8);
    ellipse(-4, -17, 7, 8);
    ellipse(4, -17, 7, 8);
    ellipse(11, -13, 7, 8);
    pop();
}

/**
 *  * Draws the bear sitting in the cave at the position and size passed in,
 * with a face that matches the mood passed in. He slowly breathes in and out.
 */
function drawBear(x, y, size, mood) {
    // Breathing: the bear grows and shrinks a tiny bit over time
    const breath = sin(frameCount * 0.05) * size * 0.02;
    const bodySize = size * 1.3 + breath;

    push();
    noStroke();

    // Body
    fill(92, 58, 33);
    ellipse(x, y + size * 0.85, bodySize, bodySize * 0.9);

    // Belly
    fill(150, 105, 70);
    ellipse(x, y + size * 0.95, bodySize * 0.55, bodySize * 0.55);

    // Paws resting on the floor
    fill(80, 50, 28);
    ellipse(x - size * 0.4, y + size * 1.3, size * 0.35, size * 0.22);
    ellipse(x + size * 0.4, y + size * 1.3, size * 0.35, size * 0.22);

    // Ears
    fill(92, 58, 33);
    ellipse(x - size * 0.36, y - size * 0.36, size * 0.34);
    ellipse(x + size * 0.36, y - size * 0.36, size * 0.34);
    fill(150, 105, 70);
    ellipse(x - size * 0.36, y - size * 0.36, size * 0.17);
    ellipse(x + size * 0.36, y - size * 0.36, size * 0.17);

    // Head
    fill(110, 70, 40);
    ellipse(x, y, size, size * 0.92);

    // Muzzle and nose
    fill(196, 156, 116);
    ellipse(x, y + size * 0.17, size * 0.42, size * 0.32);
    fill(35, 22, 15);
    ellipse(x, y + size * 0.09, size * 0.14, size * 0.09);

       pop();

    // The face changes with his mood
    drawEyes(x, y, size, mood);
    drawMouth(x, y, size, mood);
    drawMoodExtras(x, y, size, mood); 
}

/**
 * Draws the bear's eyes for the mood passed in
 */
function drawEyes(x, y, size, mood) {
    const eyeX = size * 0.19;
    const eyeY = y - size * 0.08;

    push();
    fill(25, 15, 10);
    stroke(25, 15, 10);
    strokeWeight(size * 0.03);

    if (mood === "sleepy") {
        // Closed, droopy eyes
        noFill();
        arc(x - eyeX, eyeY, size * 0.12, size * 0.06, 0, PI);
        arc(x + eyeX, eyeY, size * 0.12, size * 0.06, 0, PI);
    }
    else if (mood === "grumpy") {
        // Small eyes with angry eyebrows
        noStroke();
        ellipse(x - eyeX, eyeY + size * 0.02, size * 0.07);
        ellipse(x + eyeX, eyeY + size * 0.02, size * 0.07);
        stroke(25, 15, 10);
        line(x - eyeX - size * 0.07, eyeY - size * 0.08, x - eyeX + size * 0.06, eyeY - size * 0.03);
        line(x + eyeX + size * 0.07, eyeY - size * 0.08, x + eyeX - size * 0.06, eyeY - size * 0.03);
    }
    else {
        // Normal round eyes with a little shine
        noStroke();
        ellipse(x - eyeX, eyeY, size * 0.08);
        ellipse(x + eyeX, eyeY, size * 0.08);
        fill(255);
        ellipse(x - eyeX + size * 0.015, eyeY - size * 0.015, size * 0.025);
        ellipse(x + eyeX + size * 0.015, eyeY - size * 0.015, size * 0.025);
    }
    pop();
}

/**
 * Draws the bear's mouth for the mood passed in
 */
function drawMouth(x, y, size, mood) {
    const mouthY = y + size * 0.22;

    push();
    noFill();
    stroke(25, 15, 10);
    strokeWeight(size * 0.03);

    if (mood === "happy") {
        // Smile
        arc(x, mouthY, size * 0.16, size * 0.1, 0, PI);
    }
    else if (mood === "grumpy") {
        // Frown
        arc(x, mouthY + size * 0.05, size * 0.16, size * 0.08, PI, TWO_PI);
    }
    else if (mood === "hungry") {
        // Open mouth with a tongue
        noStroke();
        fill(120, 30, 30);
        ellipse(x, mouthY + size * 0.02, size * 0.1, size * 0.09);
        fill(230, 110, 120);
        ellipse(x, mouthY + size * 0.05, size * 0.07, size * 0.035);
    }
    else {
        // Flat, tired mouth
        line(x - size * 0.05, mouthY + size * 0.02, x + size * 0.05, mouthY + size * 0.02);
    }
    pop();
}

/**
 * Draws the little extra that goes with each mood:
 * blush when happy, drool when hungry, Zzz when sleepy
 * and an anger mark when grumpy
 */
function drawMoodExtras(x, y, size, mood) {
    push();
    noStroke();

    if (mood === "happy") {
        // Pink cheeks
        fill(235, 120, 120, 120);
        ellipse(x - size * 0.3, y + size * 0.08, size * 0.14, size * 0.08);
        ellipse(x + size * 0.3, y + size * 0.08, size * 0.14, size * 0.08);
    }
    else if (mood === "hungry") {
        // A drop of drool that slowly stretches down
        const drip = (frameCount % 60) / 60;
        fill(170, 210, 240, 200);
        ellipse(x + size * 0.03, y + size * 0.3 + drip * size * 0.08, size * 0.04, size * 0.06 + drip * size * 0.05);
    }
    else if (mood === "sleepy") {
        // Zzz floating up from his head
        fill(255, 255, 255, 200);
        textStyle(BOLD);
        const bob = sin(frameCount * 0.05) * 6;
        textSize(size * 0.16);
        text("z", x + size * 0.5, y - size * 0.35 + bob);
        textSize(size * 0.22);
        text("z", x + size * 0.65, y - size * 0.55 + bob);
        textSize(size * 0.3);
        text("Z", x + size * 0.82, y - size * 0.8 + bob);
    }
    else if (mood === "grumpy") {
        // A red anger mark that pulses
        const pulse = 1 + sin(frameCount * 0.2) * 0.15;
        stroke(220, 50, 50);
        strokeWeight(size * 0.035);
        const markX = x + size * 0.42;
        const markY = y - size * 0.42;
        const m = size * 0.07 * pulse;
        line(markX - m, markY - m * 0.3, markX - m * 0.3, markY - m * 0.3);
        line(markX - m * 0.3, markY - m * 0.3, markX - m * 0.3, markY - m);
        line(markX + m, markY - m * 0.3, markX + m * 0.3, markY - m * 0.3);
        line(markX + m * 0.3, markY - m * 0.3, markX + m * 0.3, markY - m);
        line(markX - m, markY + m * 0.3, markX - m * 0.3, markY + m * 0.3);
        line(markX - m * 0.3, markY + m * 0.3, markX - m * 0.3, markY + m);
        line(markX + m, markY + m * 0.3, markX + m * 0.3, markY + m * 0.3);
        line(markX + m * 0.3, markY + m * 0.3, markX + m * 0.3, markY + m);
    }
    pop();
}

/**
 * Returns a new mood button at the x position passed in,
 * with its own label, mood and colour
 */
function makeButton(x, label, mood, colour) {
    const button = {
        x: x,
        y: 410,
        w: 125,
        h: 50,
        label: label,
        mood: mood,
        colour: colour
    };
    return button;
}

/**
 * Returns true if the mouse is over the button passed in
 */
function isHovered(button) {
    const insideX = mouseX > button.x - button.w / 2 && mouseX < button.x + button.w / 2;
    const insideY = mouseY > button.y - button.h / 2 && mouseY < button.y + button.h / 2;
    return insideX && insideY;
}

/**
 * Draws the button passed in, lifting it up when the mouse is over it
 */
function drawButton(button) {
    let lift = 0;
    if (isHovered(button)) {
        lift = 4;
    }

    push();
    rectMode(CENTER);
    noStroke();

    // Shadow
    fill(0, 0, 0, 100);
    rect(button.x, button.y + 4, button.w, button.h, 12);

    // Button
    fill(button.colour);
    rect(button.x, button.y - lift, button.w, button.h, 12);

    // Label
    fill(255);
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(button.label, button.x, button.y - lift);
    pop();
}

/**
 * Changes the bear's mood to the button's mood if it was clicked
 */
function checkButton(button) {
    if (isHovered(button)) {
        bear.mood = button.mood;
    }
}

/**
 * Checks every button when the mouse is clicked
 */
function mousePressed() {
    checkButton(happyButton);
    checkButton(hungryButton);
    checkButton(sleepyButton);
    checkButton(grumpyButton);
}