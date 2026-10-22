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

// // The seven stars of the Big Dipper, the brightest part of the Great Bear
let alkaid = undefined;
let mizar = undefined;
let alioth = undefined;
let megrez = undefined;
let phecda = undefined;
let merak = undefined;
let dubhe = undefined;

// Other real stars nearby, there to trick you
let alcor = undefined;
let thuban = undefined;
let corCaroli = undefined;
let muscida = undefined;
let talitha = undefined;
let polaris = undefined;

// Which star the player needs to click next (1 is the first star)
let nextStar = 1;

/**
 * Creates the canvas and the stars
 */
function setup() {
    createCanvas(600, 450);

    // The Great Bear's stars, numbered in the order you click them
    alkaid = makeStar(70, 175, "Alkaid", 1);
    mizar = makeStar(135, 140, "Mizar", 2);
    alioth = makeStar(195, 135, "Alioth", 3);
    megrez = makeStar(255, 150, "Megrez", 4);
    phecda = makeStar(262, 215, "Phecda", 5);
    merak = makeStar(352, 222, "Merak", 6);
    dubhe = makeStar(365, 150, "Dubhe", 7);

    // Trick stars all have an order of 0, so they're never right
    alcor = makeStar(156, 120, "Alcor", 0);
    thuban = makeStar(95, 90, "Thuban", 0);
    corCaroli = makeStar(160, 232, "Cor Caroli", 0);
    muscida = makeStar(440, 100, "Muscida", 0);
    talitha = makeStar(425, 262, "Talitha", 0);
    polaris = makeStar(318, 95, "Polaris", 0);
}

/**
 * Draws the sky, the stars, the lines between them and the little bear
 */
function draw() {
    drawSky();

    // A line between each pair of stars that has been connected
    connectStars(alkaid, mizar);
    connectStars(mizar, alioth);
    connectStars(alioth, megrez);
    connectStars(megrez, phecda);
    connectStars(phecda, merak);
    connectStars(merak, dubhe);
    // The last line closes the bowl of the dipper
    connectStars(megrez, dubhe);

    drawStar(alkaid);
    drawStar(mizar);
    drawStar(megrez);
    drawStar(phecda);
    drawStar(merak);
    drawStar(dubhe);
    drawStar(alcor);
    drawStar(thuban);
    drawStar(corCaroli);
    drawStar(muscida);
    drawStar(talitha);
    drawStar(polaris);
    drawHill();
}

/**
 * Returns a new star at the position passed in, with its real name
 * and its place in the order the player has to click it
 */
function makeStar(x, y, name, order) {
    const star = {
        x: x,
        y: y,
        name: name,
        order: order,
        size: random(9, 13),
        // Each star twinkles at its own speed
        twinkleSpeed: random(0.04, 0.08),
        twinkleOffset: random(0, 100)
    };
    return star;
}

/**
 * Returns true if the mouse is close enough to the star passed in
 */
function isHovered(star) {
    const distance = dist(mouseX, mouseY, star.x, star.y);
    return distance < 13;
}

/**
 * Returns true if the star passed in has already been clicked
 */
function isConnected(star) {
    return star.order > 0 && star.order < nextStar;
}

/**
 * Draws the star passed in: twinkling, glowing when hovered,
 * gold when connected, with its name when the mouse is over it
 */
function drawStar(star) {
    const twinkle = sin(frameCount * star.twinkleSpeed + star.twinkleOffset);
    const size = star.size + twinkle * 2;

    push();
    noStroke();

    // Soft glow, bigger when hovered
    let glowSize = size * 2.5;
    if (isHovered(star)) {
        glowSize = size * 4;
    }
    fill(200, 220, 255, 50);
    ellipse(star.x, star.y, glowSize);

    // The star itself, gold once it's connected
    if (isConnected(star)) {
        fill(255, 215, 120);
    }
    else {
        fill(240, 245, 255);
    }
    ellipse(star.x, star.y, size);

    // A little four-pointed sparkle
    stroke(255, 255, 255, 180);
    strokeWeight(1.5);
    line(star.x - size, star.y, star.x + size, star.y);
    line(star.x, star.y - size, star.x, star.y + size);

    // The star's real name when you hover over it
    if (isHovered(star)) {
        noStroke();
        fill(220, 230, 255);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(star.name, star.x, star.y - 16);
    }
    pop();
}

/**
 * Draws a glowing line from starA to starB if starB has been connected
 */
function connectStars(starA, starB) {
    if (isConnected(starB)) {
        drawLine(starA, starB, 255);
    }
}

/**
 * Draws a glowing gold line between the two stars passed in,
 * as see-through as the alpha passed in
 */
function drawLine(starA, starB, alpha) {
    push();
    stroke(255, 215, 120, alpha * 0.3);
    strokeWeight(8);
    line(starA.x, starA.y, starB.x, starB.y);
    stroke(255, 225, 150, alpha);
    strokeWeight(2);
    line(starA.x, starA.y, starB.x, starB.y);
    pop();
}

/**
 * Checks if the star passed in was clicked, and whether it was the right one
 */
function checkStar(star) {
    if (!isHovered(star) || isConnected(star)) {
        return;
    }

    if (star.order === nextStar) {
        nextStar += 1;
    }
    else {
        // Wrong star: the lines fade and you start again
        nextStar = 1;
    }
}

/**
 * Checks every star when the mouse is clicked
 */
function mousePressed() {
    checkStar(alkaid);
    checkStar(mizar);
    checkStar(alioth);
        checkStar(megrez);
    checkStar(phecda);
    checkStar(merak);
    checkStar(dubhe);
    checkStar(alcor);
    checkStar(thuban);
    checkStar(corCaroli);
    checkStar(muscida);
    checkStar(talitha);
    checkStar(polaris);
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