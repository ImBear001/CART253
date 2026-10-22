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

// The seven stars of the Big Dipper, the brightest part of the Great Bear
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

// How many frames are left until sunrise (60 frames is one second)
const nightLength = 60 * 45;
let nightTimer = nightLength;

// How many frames the shape of the Great Bear is shown at the start
const hintLength = 60 * 4;

// How many frames since this night started
let nightClock = 0;

// How far the sky has drifted this frame
let skyAngle = 0;

// Counts down after a wrong click so the sky can flash red
let wrongTimer = 0;

/**
 * Creates the canvas and all the stars
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
 * Runs the night: moves the sky, draws everything and checks for sunrise
 */
function draw() {
    updateNight();

    drawSky();

    // Move every star with the drifting sky
    updateStar(alkaid);
    updateStar(mizar);
    updateStar(alioth);
    updateStar(megrez);
    updateStar(phecda);
    updateStar(merak);
    updateStar(dubhe);
    updateStar(alcor);
    updateStar(thuban);
    updateStar(corCaroli);
    updateStar(muscida);
    updateStar(talitha);
    updateStar(polaris);

    // At the start, show the shape of the Great Bear for a few seconds
    drawHint();

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
    drawStar(alioth);
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

    // The sun rises from behind the hill
    drawSun();
    drawHill();
    drawWrongFlash();
    drawMessage();
}

/**
 * Counts down to sunrise and slowly drifts the sky back and forth
 */
function updateNight() {
    nightClock += 1;
    if (!isComplete() && nightTimer > 0) {
        nightTimer -= 1;
    }
    skyAngle = sin(frameCount * 0.006) * 0.12;
}

/**
 * Returns how close it is to sunrise, from 0 (middle of the night) to 1 (sunrise)
 */
function dawnAmount() {
    return 1 - nightTimer / nightLength;
}

/**
 * Returns true if the sun has come up before the Great Bear was found
 */
function isSunrise() {
    return nightTimer <= 0 && !isComplete();
}

/**
 * Returns a new star at the position passed in, with its real name
 * and its place in the order the player has to click it (0 for trick stars)
 */
function makeStar(x, y, name, order) {
    const star = {
        // Where the star sits before the sky drifts
        baseX: x,
        baseY: y,
        // Where the star is right now
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
 * Moves the star passed in to where it is in the drifting sky,
 * by turning it around a point high above the canvas
 */
function updateStar(star) {
    const centreX = width / 2;
    const centreY = -300;
    const dx = star.baseX - centreX;
    const dy = star.baseY - centreY;
    star.x = centreX + dx * cos(skyAngle) - dy * sin(skyAngle);
    star.y = centreY + dx * sin(skyAngle) + dy * cos(skyAngle);
}

/**
 * Returns true if the mouse is close enough to the star passed in
 */
function isHovered(star) {
    const distance = dist(mouseX, mouseY, star.x, star.y);
    return distance < 13;
}

/**
 * Returns true if the star passed in is part of the Great Bear
 * and has already been clicked
 */
function isConnected(star) {
    return star.order > 0 && star.order < nextStar;
}

/**
 * Returns true once all seven stars have been connected
 */
function isComplete() {
    return nextStar > 7;
}

/**
 * Draws the star passed in: twinkling, glowing when hovered,
 * gold when connected, with its name when the mouse is over it.
 * Stars fade as the sun comes up.
 */
function drawStar(star) {
    const twinkle = sin(frameCount * star.twinkleSpeed + star.twinkleOffset);
    const size = star.size + twinkle * 2;
    const fade = map(dawnAmount(), 0.6, 1, 255, 60, true);

    push();
    noStroke();

    // Soft glow, bigger when hovered
    let glowSize = size * 2.5;
    if (isHovered(star)) {
        glowSize = size * 4;
    }
    fill(200, 220, 255, fade * 0.2);
    ellipse(star.x, star.y, glowSize);

    // The star itself, gold once it's connected
    if (isConnected(star)) {
        fill(255, 215, 120, fade);
    }
    else {
        fill(240, 245, 255, fade);
    }
    ellipse(star.x, star.y, size);

    // A little four-pointed sparkle
    stroke(255, 255, 255, fade * 0.7);
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
 * For the first few seconds, shows the shape of the Great Bear,
 * fading out so the player has to remember it
 */
function drawHint() {
    if (nightClock > hintLength) {
        return;
    }
    const alpha = map(nightClock, hintLength * 0.5, hintLength, 160, 0, true);
    drawLine(alkaid, mizar, alpha);
    drawLine(mizar, alioth, alpha);
    drawLine(alioth, megrez, alpha);
    drawLine(megrez, phecda, alpha);
    drawLine(phecda, merak, alpha);
    drawLine(merak, dubhe, alpha);
    drawLine(dubhe, megrez, alpha);
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
        // Wrong star: the lines fade, you start again and lose 3 seconds
        nextStar = 1;
        wrongTimer = 30;
        nightTimer = max(nightTimer - 60 * 3, 0);
    }
}

/**
 * Checks every star when the mouse is clicked
 */
function mousePressed() {
    if (isComplete() || isSunrise()) {
        return;
    }
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
 * Starts a new night when R is pressed
 */
function keyPressed() {
    if (key === "r" || key === "R") {
        nextStar = 1;
        nightTimer = nightLength;
        nightClock = 0;
    }
}

/**
 * Draws the night sky, getting lighter as sunrise gets closer,
 * with lots of small twinkling background stars
 */
function drawSky() {
    const night = color("#0b1026");
    const dawn = color("#e58a5c");
    background(lerpColor(night, dawn, map(dawnAmount(), 0.5, 1, 0, 1, true)));

    // A lighter band near the horizon
    push();
    noStroke();
    fill(40, 50, 100, 120);
    ellipse(width / 2, height, width * 1.6, 360);
    pop();

    // Background stars. Using the same random seed every frame keeps them
    // in the same places, and noise() makes each one twinkle on its own.
    const fade = map(dawnAmount(), 0.5, 1, 1, 0, true);
    push();
    randomSeed(253);
    noStroke();
    for (let i = 0; i < 140; i++) {
        const x = random(width);
        const y = random(height - 80);
        const brightness = noise(i, frameCount * 0.02) * 255 * fade;
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

/**
 * Draws the sun peeking over the hill once it's sunrise
 */
function drawSun() {
    if (!isSunrise()) {
        return;
    }
    push();
    noStroke();
    fill(255, 200, 90, 90);
    ellipse(470, height - 60, 200);
    fill(255, 210, 110);
    ellipse(470, height - 60, 120);
    pop();
}

/**
 * Tints the sky red for a moment after a wrong star is clicked
 */
function drawWrongFlash() {
    if (wrongTimer > 0) {
        push();
        noStroke();
        fill(200, 40, 40, wrongTimer * 3);
        rect(0, 0, width, height);
        pop();
        wrongTimer -= 1;
    }
}

/**
 * Draws the instructions and time left, or the ending message
 */
function drawMessage() {
    push();
    noStroke();
    textAlign(CENTER, CENTER);

    if (isComplete()) {
        fill(255, 225, 150);
        textSize(30);
        textStyle(BOLD);
        text("Ursa Major", width / 2, 40);
        textStyle(NORMAL);
        textSize(15);
        fill(200, 215, 255);
        const secondsLeft = ceil(nightTimer / 60);
        text("You found the Great Bear with " + secondsLeft + "s to spare.   Press R to play again", width / 2, 72);
    }
    else if (isSunrise()) {
        fill(60, 25, 20);
        textSize(26);
        textStyle(BOLD);
        text("The sun came up", width / 2, 40);
        textStyle(NORMAL);
        textSize(15);
        text("The Great Bear is hiding until tomorrow night.   Press R to try again", width / 2, 72);
    }
    else if (nightClock < hintLength) {
        fill(255, 225, 150);
        textSize(18);
        textStyle(BOLD);
        text("Remember the shape...", width / 2, 30);
    }
    else {
        fill(200, 215, 255);
        textSize(16);
        const secondsLeft = ceil(nightTimer / 60);
        text("Find the Great Bear (" + (nextStar - 1) + "/7)      Sunrise in " + secondsLeft + "s", width / 2, 30);
    }
    pop();
}