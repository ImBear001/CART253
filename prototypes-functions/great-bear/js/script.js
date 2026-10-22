/**
 * The Great Bear
 * Tyler Myrans
 *
 * A little bear sits on a hill looking up at the night sky. Somewhere up
 * there is Ursa Major, the Great Bear. Its shape glows for a few seconds
 * at the start, then disappears. Click its seven stars in order, from the
 * tip of the tail to the front of the bowl, before the sun comes up.
 * Watch out: other stars are mixed in, the sky slowly drifts, and every
 * wrong click resets your lines and costs you time.
 *
 * Explores refactoring with functions: every star is made by makeStar()
 * and handled by the same few functions, instead of copies of code.
 */

"use strict";

// The first three stars of the Great Bear's tail
let alkaid = undefined;
let mizar = undefined;
let alioth = undefined;

// Which star the player needs to click next (1 is the first star)
let nextStar = 1;

/**
 * Creates the canvas and the stars
 */
function setup() {
    createCanvas(600, 450);

    alkaid = {
        x: 70,
        y: 175,
        name: "Alkaid",
        order: 1,
        size: random(9, 13),
        twinkleSpeed: random(0.04, 0.08),
        twinkleOffset: random(0, 100)
    };
    mizar = {
        x: 135,
        y: 140,
        name: "Mizar",
        order: 2,
        size: random(9, 13),
        twinkleSpeed: random(0.04, 0.08),
        twinkleOffset: random(0, 100)
    };
    alioth = {
        x: 195,
        y: 135,
        name: "Alioth",
        order: 3,
        size: random(9, 13),
        twinkleSpeed: random(0.04, 0.08),
        twinkleOffset: random(0, 100)
    };
}

/**
 * Draws the sky, the stars, the lines between them and the little bear
 */
function draw() {
    drawSky();

    // Lines between the stars that have been connected
    if (mizar.order < nextStar) {
        push();
        stroke(255, 215, 120, 70);
        strokeWeight(8);
        line(alkaid.x, alkaid.y, mizar.x, mizar.y);
        stroke(255, 225, 150);
        strokeWeight(2);
        line(alkaid.x, alkaid.y, mizar.x, mizar.y);
        pop();
    }
    if (alioth.order < nextStar) {
        push();
        stroke(255, 215, 120, 70);
        strokeWeight(8);
        line(mizar.x, mizar.y, alioth.x, alioth.y);
        stroke(255, 225, 150);
        strokeWeight(2);
        line(mizar.x, mizar.y, alioth.x, alioth.y);
        pop();
    }

    // Alkaid
    push();
    noStroke();
    const alkaidSize = alkaid.size + sin(frameCount * alkaid.twinkleSpeed + alkaid.twinkleOffset) * 2;
    let alkaidGlow = alkaidSize * 2.5;
    if (dist(mouseX, mouseY, alkaid.x, alkaid.y) < 13) {
        alkaidGlow = alkaidSize * 4;
    }
    fill(200, 220, 255, 50);
    ellipse(alkaid.x, alkaid.y, alkaidGlow);
    if (alkaid.order < nextStar) {
        fill(255, 215, 120);
    }
    else {
        fill(240, 245, 255);
    }
    ellipse(alkaid.x, alkaid.y, alkaidSize);
    stroke(255, 255, 255, 180);
    strokeWeight(1.5);
    line(alkaid.x - alkaidSize, alkaid.y, alkaid.x + alkaidSize, alkaid.y);
    line(alkaid.x, alkaid.y - alkaidSize, alkaid.x, alkaid.y + alkaidSize);
    if (dist(mouseX, mouseY, alkaid.x, alkaid.y) < 13) {
        noStroke();
        fill(220, 230, 255);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(alkaid.name, alkaid.x, alkaid.y - 16);
    }
    pop();

    // Mizar
    push();
    noStroke();
    const mizarSize = mizar.size + sin(frameCount * mizar.twinkleSpeed + mizar.twinkleOffset) * 2;
    let mizarGlow = mizarSize * 2.5;
    if (dist(mouseX, mouseY, mizar.x, mizar.y) < 13) {
        mizarGlow = mizarSize * 4;
    }
    fill(200, 220, 255, 50);
    ellipse(mizar.x, mizar.y, mizarGlow);
    if (mizar.order < nextStar) {
        fill(255, 215, 120);
    }
    else {
        fill(240, 245, 255);
    }
    ellipse(mizar.x, mizar.y, mizarSize);
    stroke(255, 255, 255, 180);
    strokeWeight(1.5);
    line(mizar.x - mizarSize, mizar.y, mizar.x + mizarSize, mizar.y);
    line(mizar.x, mizar.y - mizarSize, mizar.x, mizar.y + mizarSize);
    if (dist(mouseX, mouseY, mizar.x, mizar.y) < 13) {
        noStroke();
        fill(220, 230, 255);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(mizar.name, mizar.x, mizar.y - 16);
    }
    pop();

    // Alioth
    push();
    noStroke();
    const aliothSize = alioth.size + sin(frameCount * alioth.twinkleSpeed + alioth.twinkleOffset) * 2;
    let aliothGlow = aliothSize * 2.5;
    if (dist(mouseX, mouseY, alioth.x, alioth.y) < 13) {
        aliothGlow = aliothSize * 4;
    }
    fill(200, 220, 255, 50);
    ellipse(alioth.x, alioth.y, aliothGlow);
    if (alioth.order < nextStar) {
        fill(255, 215, 120);
    }
    else {
        fill(240, 245, 255);
    }
    ellipse(alioth.x, alioth.y, aliothSize);
    stroke(255, 255, 255, 180);
    strokeWeight(1.5);
    line(alioth.x - aliothSize, alioth.y, alioth.x + aliothSize, alioth.y);
    line(alioth.x, alioth.y - aliothSize, alioth.x, alioth.y + aliothSize);
    if (dist(mouseX, mouseY, alioth.x, alioth.y) < 13) {
        noStroke();
        fill(220, 230, 255);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(alioth.name, alioth.x, alioth.y - 16);
    }
    pop();

    drawHill();
}

/**
 * Checks each star when the mouse is clicked. The right star connects,
 * any other star resets the lines.
 */
function mousePressed() {
    // Alkaid
    if (dist(mouseX, mouseY, alkaid.x, alkaid.y) < 13 && alkaid.order >= nextStar) {
        if (alkaid.order === nextStar) {
            nextStar += 1;
        }
        else {
            nextStar = 1;
        }
    }
    // Mizar
    if (dist(mouseX, mouseY, mizar.x, mizar.y) < 13 && mizar.order >= nextStar) {
        if (mizar.order === nextStar) {
            nextStar += 1;
        }
        else {
            nextStar = 1;
        }
    }
    // Alioth
    if (dist(mouseX, mouseY, alioth.x, alioth.y) < 13 && alioth.order >= nextStar) {
        if (alioth.order === nextStar) {
            nextStar += 1;
        }
        else {
            nextStar = 1;
        }
    }
}

/**
 * Draws the night sky with lots of small twinkling background stars
 */
function drawSky() {
    background("#0b1026");

    // A lighter band near the horizon
    push();
    noStroke();
    fill(40, 50, 100, 120);
    ellipse(width / 2, height, width * 1.6, 360);
    pop();

    // Background stars. Using the same random seed every frame keeps them
    // in the same places, and noise() makes each one twinkle on its own.
    push();
    randomSeed(253);
    noStroke();
    for (let i = 0; i < 140; i++) {
        const x = random(width);
        const y = random(height - 80);
        const brightness = noise(i, frameCount * 0.02) * 255;
        fill(255, 255, 255, brightness);
        ellipse(x, y, random(1, 2.5));
    }
    // Go back to proper randomness for everything else
    randomSeed(millis());
    pop();
}

/**
 * Draws the dark hill at the bottom with the little bear sitting on it,
 * looking up at the sky
 */
function drawHill() {
    push();
    noStroke();

    // Hill
    fill("#05070f");
    ellipse(150, height + 40, 520, 200);
    ellipse(470, height + 60, 480, 160);

    // Little bear seen from behind: body, head and ears
    fill("#120d0a");
    ellipse(120, 388, 54, 50);
    ellipse(120, 352, 36, 34);
    ellipse(106, 338, 13);
    ellipse(134, 338, 13);
    pop();
}