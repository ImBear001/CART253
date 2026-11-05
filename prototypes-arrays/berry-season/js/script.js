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

// All the bears in the forest
let bears = [];

// All the berry bushes
let bushes = [];

// How many berries a full bush has
const maxBerries = 8;

/**
 * Creates the canvas, the starting bushes and the starting bears
 */
function setup() {
    createCanvas(600, 450);

    // Start with a few bushes spread around the forest
    const bushSpots = [[100, 160], [480, 150], [300, 260], [130, 380], [470, 370]];
    for (let i = 0; i < bushSpots.length; i++) {
        bushes.push(createBush(bushSpots[i][0], bushSpots[i][1]));
    }

    // And a few bears
    for (let i = 0; i < 4; i++) {
        bears.push(createBear());
    }
}

/**
 * Lets every bush grow and every bear live, then draws the forest
 */
function draw() {
    for (let i = 0; i < bushes.length; i++) {
        growBerries(bushes[i]);
    }
    for (let i = 0; i < bears.length; i++) {
        updateBear(bears[i]);
    }

    drawForest();
    for (let i = 0; i < bushes.length; i++) {
        drawBush(bushes[i]);
    }

    for (let i = 0; i < bears.length; i++) {
        drawBear(bears[i]);
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
 * Returns a new bear at a random spot
 */
function createBear() {
    const bear = {
        x: random(80, width - 80),
        y: random(140, height - 60),
        fur: random(["#6e4628", "#8a5a34", "#4a3020", "#a0703f"]),
        // 0 is starving, 100 is completely full
        fullness: random(40, 80),
        // Where the bear is walking to
        targetX: random(60, width - 60),
        targetY: random(140, height - 40),
        // The bush the bear is heading to, if he's hungry
        bush: undefined,
        facing: 1,
        // Counts down while the bear is eating a berry
        chewing: 0
    };
    return bear;
}

/**
 * Grows a new berry on the bush passed in every so often, until it's full
 */
function growBerries(bush) {
    if (bush.berries.length < maxBerries) {
        bush.growTimer += 1;
        if (bush.growTimer > 150) {
            bush.berries.push(createBerry());
            bush.growTimer = 0;
        }
    }
}

/**
 * Runs one moment of the bear's life: getting hungrier, finding food,
 * eating it, or just wandering around
 */
function updateBear(bear) {
    bear.fullness = max(bear.fullness - 0.08, 0);

    if (bear.chewing > 0) {
        bear.chewing -= 1;
        return;
    }

    if (bear.fullness < 50) {
        // Hungry: find the nearest bush with berries on it
        bear.bush = findNearestBush(bear);
        if (bear.bush !== undefined) {
            bear.targetX = bear.bush.x;
            bear.targetY = bear.bush.y + 20;
        }
    }

    walkToTarget(bear);

    // Close enough to the bush? Eat a berry
    if (bear.bush !== undefined && dist(bear.x, bear.y, bear.bush.x, bear.bush.y + 20) < 10) {
        eatBerry(bear, bear.bush);
    }
}

/**
 * Returns the nearest bush to the bear passed in that still has berries,
 * or undefined if every bush has been picked bare
 */
function findNearestBush(bear) {
    let nearest = undefined;
    let nearestDistance = Infinity;
    for (let i = 0; i < bushes.length; i++) {
        const bush = bushes[i];
        const d = dist(bear.x, bear.y, bush.x, bush.y);
        if (bush.berries.length > 0 && d < nearestDistance) {
            nearest = bush;
            nearestDistance = d;
        }
    }
    return nearest;
}

/**
 * Walks the bear passed in towards where he wants to go. Hungry bears
 * walk faster. When he gets there he picks somewhere new to wander.
 */
function walkToTarget(bear) {
    let speed = 0.8;
    if (bear.fullness < 50) {
        speed = 1.6;
    }

    const dx = bear.targetX - bear.x;
    const dy = bear.targetY - bear.y;
    const distance = dist(bear.x, bear.y, bear.targetX, bear.targetY);

    if (distance > speed) {
        bear.x += dx / distance * speed;
        bear.y += dy / distance * speed;
        if (abs(dx) > 1) {
            bear.facing = Math.sign(dx);
        }
    }
    else if (bear.bush === undefined) {
        // Got there, so wander somewhere else
        bear.targetX = random(60, width - 60);
        bear.targetY = random(140, height - 40);
    }
}

/**
 * The bear passed in eats one berry off the bush passed in.
 * Once he's full he stops eating and goes for a wander.
 */
function eatBerry(bear, bush) {
    if (bush.berries.length > 0) {
        bush.berries.pop();
        bear.fullness = min(bear.fullness + 14, 100);
        bear.chewing = 25;
    }
    if (bear.fullness > 90 || bush.berries.length === 0) {
        bear.bush = undefined;
        bear.targetX = random(60, width - 60);
        bear.targetY = random(140, height - 40);
    }
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
 * Draws the bear passed in from the side, bobbing while he walks.
 * A bar above him shows how full he is.
 */
function drawBear(bear) {
    const size = 46;
    let bob = 0;
    if (bear.chewing === 0) {
        bob = abs(sin(frameCount * 0.2 + bear.x * 0.05)) * -2;
    }

    push();
    translate(bear.x, bear.y + bob);
    scale(bear.facing, 1);
    noStroke();

    // Shadow
    fill(0, 0, 0, 40);
    ellipse(0, size * 0.42, size * 1.2, size * 0.2);

    const fur = color(bear.fur);
    fill(fur);
    // Legs
    rect(-size * 0.42, size * 0.1, size * 0.2, size * 0.32, 4);
    rect(size * 0.22, size * 0.1, size * 0.2, size * 0.32, 4);
    // Body
    ellipse(0, 0, size * 1.15, size * 0.7);
    // Head
    ellipse(size * 0.6, -size * 0.25, size * 0.55, size * 0.5);
    ellipse(size * 0.5, -size * 0.5, size * 0.18);
    // Snout, nose and eye
    fill(lerpColor(fur, color(240, 210, 170), 0.5));
    ellipse(size * 0.84, -size * 0.2, size * 0.26, size * 0.2);
    fill(25, 15, 10);
    ellipse(size * 0.95, -size * 0.22, size * 0.08);
    ellipse(size * 0.67, -size * 0.32, size * 0.07);
    pop();

    // Fullness bar above him
    push();
    noStroke();
    fill(0, 0, 0, 90);
    rect(bear.x - 18, bear.y - size * 0.72, 36, 5, 3);
    // Green when full, red when starving
    fill(lerpColor(color(220, 60, 50), color(80, 200, 90), bear.fullness / 100));
    rect(bear.x - 18, bear.y - size * 0.72, 36 * bear.fullness / 100, 5, 3);
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
    text("Bears: " + bears.length + "    Bushes: " + bushes.length + "    Berries: " + berryCount, 12, 17);
    textAlign(RIGHT, CENTER);
    text("Click to plant a bush", width - 12, 17);
    pop();
}