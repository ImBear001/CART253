/**
 * Berry Season
 * Tyler Myrans
 *
 * A little forest ecosystem. Bears wander around, and when they get
 * hungry they head for the nearest bush that still has berries and eat
 * until they're full. Bushes get picked bare and slowly grow their
 * berries back. Well-fed bears get round and chubby, hungry bears get
 * skinny. Click to plant a new bush, press B to let another bear in.
 *
 * Explores arrays: the bears and the bushes are both arrays, and every
 * bear checks every bush to find food, so the two arrays interact.
 * Each bush stores its berries as an array of positions, and the
 * bears get their names from an array too.
 */

"use strict";

// All the berry bushes
let bushes = [];

// How many berries a full bush has
const maxBerries = 8;

/**
 * Creates the canvas and the starting bushes
 */
function setup() {
    createCanvas(600, 450);

    // Start with a few bushes spread around the forest
    const bushSpots = [[100, 160], [480, 150], [300, 260], [130, 380], [470, 370]];
    for (let i = 0; i < bushSpots.length; i++) {
        bushes.push(createBush(bushSpots[i][0], bushSpots[i][1]));
    }
}

/**
 * Draws the forest and every bush in it
 */
function draw() {
    drawForest();
    for (let i = 0; i < bushes.length; i++) {
        drawBush(bushes[i]);
    }

    drawMessage();
}

/**
 * Returns a new bush at the position passed in, full of berries.
 * Each berry is stored as a little offset from the middle of the bush.
 */
function createBush(x, y) {
    const bush = {
        x: x,
        y: y,
        berries: [],
        // Counts up until the next berry grows
        growTimer: 0
    };
    for (let i = 0; i < maxBerries; i++) {
        bush.berries.push(createBerry());
    }
    return bush;
}

/**
 * Returns a berry at a random spot on a bush
 */
function createBerry() {
    const berry = {
        offsetX: random(-24, 24),
        offsetY: random(-18, 8)
    };
    return berry;
}

/**
 * Clicking plants a new bush
 */
function mousePressed() {
    if (mouseY > 120) {
        bushes.push(createBush(mouseX, mouseY));
    }
}

/**
 * Draws the forest floor and the trees along the back
 */
function drawForest() {
    background("#7fae5f");
    push();
    noStroke();

    // Dark treeline
    fill("#2f5a35");
    rect(0, 0, width, 110);
    for (let x = 0; x < width + 40; x += 45) {
        fill("#26492b");
        triangle(x - 30, 115, x + 30, 115, x, 20 + (x % 4) * 6);
    }

    // Patches of darker grass that stay in place
    fill("#729f54");
    for (let i = 0; i < 14; i++) {
        ellipse((i * 131) % width, 150 + (i * 71) % (height - 160), 90, 30);
    }
    pop();
}

/**
 * Draws the bush passed in with all of its berries
 */
function drawBush(bush) {
    push();
    noStroke();
    fill("#3e7a3a");
    ellipse(bush.x - 16, bush.y, 40, 34);
    ellipse(bush.x + 16, bush.y, 40, 34);
    ellipse(bush.x, bush.y - 12, 44, 38);

    // Each berry in the array
    fill("#5b3fbf");
    for (let i = 0; i < bush.berries.length; i++) {
        const berry = bush.berries[i];
        ellipse(bush.x + berry.offsetX, bush.y + berry.offsetY, 8);
    }
    pop();
}

/**
 * Draws the counts and instructions at the top
 */
function drawMessage() {
    let berryCount = 0;
    for (let i = 0; i < bushes.length; i++) {
        berryCount += bushes[i].berries.length;
    }

    push();
    noStroke();
    fill(0, 0, 0, 120);
    rect(0, 0, width, 34);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(14);
    text("Bushes: " + bushes.length + "    Berries: " + berryCount, 12, 17);
    textAlign(RIGHT, CENTER);
    text("Click to plant a bush", width - 12, 17);
    pop();
}