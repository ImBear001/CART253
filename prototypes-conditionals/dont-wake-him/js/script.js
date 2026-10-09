/**
 * Don't Wake Him
 * Tyler Myrans
 *
 * The bear is asleep in the cave and you want his honey.
 * Start at the blue circle, sneak over to the honey, click to grab it,
 * then sneak it back to the blue circle to win.
 *
 * Things that wake him up:
 * - Moving too fast near him (the meter at the top fills up)
 * - Stepping on a stick (CRACK!)
 * Carrying the honey makes you clumsier, so you have to go even slower.
 * If the meter fills up, he wakes up and it's game over.
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The sleeping bear
let bear = {
  x: 200,
  y: 260,
  width: 220,
  height: 120,
  fill: {
    r: 120,
    g: 80,
    b: 50
  },
  // How disturbed he is (0 = deep sleep, 100 = awake)
  disturbed: 0,
  maxDisturbed: 100,
  // How fast he settles back down when you're careful
  calmRate: 0.3,
  // How close you have to be for him to hear you
  hearingDistance: 170
};

// Where you start (and where you bring the honey back to)
let start = {
  x: 40,
  y: 200,
  size: 44
};

// The honey jar
let honey = {
  x: 360,
  y: 290,
  size: 36
};

// Crunchy sticks on the cave floor
let stickSize = 30;
let stick1 = {
  x: 110,
  y: 170
};
let stick2 = {
  x: 300,
  y: 190
};
let stick3 = {
  x: 250,
  y: 350
};
let stickNoise = 35;

// How fast you can move before it counts as "too fast"
let sneakSpeed = 6;
let carryingSpeed = 3.5;

// Are you holding the honey?
let hasHoney = false;

// A "CRACK!" message when you step on a stick
let crackTimer = 0;

// The state of the game: "start", "sneaking", "caught", or "won"
let state = "start";

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  resetGame();
}

/**
 * Put everything back to how it starts
 */
function resetGame() {
  bear.disturbed = 0;
  hasHoney = false;
  crackTimer = 0;
  state = "start";
}

/**
 * Run whichever part of the game we're in
 */
function draw() {
  if (state === "start") {
    drawCave();
    drawSticks();
    drawBear();
    drawHoney();
    drawStart();
    checkStart();
  }
  else if (state === "sneaking") {
    updateDisturbance();
    checkSticks();
    checkWin();

    drawCave();
    drawSticks();
    drawBear();
    drawHoney();
    drawStart();
    drawPlayer();
    drawMeter();
    drawCrack();

    if (bear.disturbed >= bear.maxDisturbed) {
      state = "caught";
    }
  }
  else if (state === "caught") {
    drawCaught();
  }
  else if (state === "won") {
    drawWon();
  }
}

/**
 * Start sneaking once the mouse is on the start circle
 */
function checkStart() {
  let distance = dist(mouseX, mouseY, start.x, start.y);
  if (distance < start.size / 2) {
    state = "sneaking";
  }
}

/**
 * Moving fast near the bear disturbs him. Being careful lets him calm down.
 */
function updateDisturbance() {
  // How far the mouse moved since the last frame
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  let distanceToBear = dist(mouseX, mouseY, bear.x, bear.y);

  // Carrying the honey makes you clumsier
  let limit = sneakSpeed;
  if (hasHoney) {
    limit = carryingSpeed;
  }

  if (distanceToBear < bear.hearingDistance && speed > limit) {
    // Closer and faster = more disturbing
    let closeness = map(distanceToBear, 0, bear.hearingDistance, 1, 0.2);
    bear.disturbed += speed * closeness;
  }
  else {
    bear.disturbed -= bear.calmRate;
  }

  bear.disturbed = constrain(bear.disturbed, 0, bear.maxDisturbed);
}

/**
 * Stepping on a stick makes a loud CRACK
 */
function checkSticks() {
  // Only count it on the frame you step onto the stick, not every frame you stand on it
  let onStickNow = isOnStick(mouseX, mouseY);
  let onStickBefore = isOnStick(pmouseX, pmouseY);

  if (onStickNow && !onStickBefore) {
    bear.disturbed += stickNoise;
    crackTimer = 40;
  }

  if (crackTimer > 0) {
    crackTimer -= 1;
  }
}

/**
 * Is this position on top of any of the sticks?
 */
function isOnStick(x, y) {
  if (dist(x, y, stick1.x, stick1.y) < stickSize / 2) {
    return true;
  }
  else if (dist(x, y, stick2.x, stick2.y) < stickSize / 2) {
    return true;
  }
  else if (dist(x, y, stick3.x, stick3.y) < stickSize / 2) {
    return true;
  }
  else {
    return false;
  }
}

/**
 * You win if you bring the honey back to the start circle
 */
function checkWin() {
  let distance = dist(mouseX, mouseY, start.x, start.y);
  if (hasHoney && distance < start.size / 2) {
    state = "won";
  }
}

/**
 * Click on the honey to grab it, or click to play again after the game ends
 */
function mousePressed() {
  if (state === "caught" || state === "won") {
    resetGame();
  }
  else if (state === "sneaking" && !hasHoney) {
    let distance = dist(mouseX, mouseY, honey.x, honey.y);
    if (distance < honey.size) {
      hasHoney = true;
      // Grabbing it makes a little noise
      bear.disturbed += 10;
    }
  }
}

/**
 * Draw the inside of the cave
 */
function drawCave() {
  background(25, 20, 18);
  push();
  noStroke();
  // Cave floor
  fill(45, 38, 32);
  ellipse(width / 2, 340, 520, 200);
  pop();
}

/**
 * Draw the sticks on the floor
 */
function drawSticks() {
  drawStick(stick1.x, stick1.y);
  drawStick(stick2.x, stick2.y);
  drawStick(stick3.x, stick3.y);
}

/**
 * Draw one stick as a couple of crossed lines
 */
function drawStick(x, y) {
  push();
  stroke(170, 130, 85);
  strokeWeight(4);
  line(x - stickSize / 2, y + 4, x + stickSize / 2, y - 4);
  strokeWeight(3);
  line(x - 4, y - 8, x + 6, y + 8);
  pop();
}

/**
 * Draw the sleeping bear. He twitches and opens his eyes
 * depending on how disturbed he is.
 */
function drawBear() {
  // Twitch more the more disturbed he is
  let twitch = 0;
  if (bear.disturbed > 30) {
    twitch = random(-1, 1) * map(bear.disturbed, 30, 100, 0, 4);
  }
  let x = bear.x + twitch;
  let y = bear.y;

  push();
  noStroke();
  fill(bear.fill.r, bear.fill.g, bear.fill.b);
  // Body
  ellipse(x, y, bear.width, bear.height);
  // Head resting on the left
  ellipse(x - 90, y - 20, 90, 80);
  ellipse(x - 115, y - 55, 28);
  ellipse(x - 70, y - 58, 28);
  fill(40, 25, 20);
  ellipse(x - 125, y - 10, 14, 10);
  pop();

  let eyeX1 = x - 105;
  let eyeX2 = x - 80;
  let eyeY = y - 28;

  push();
  stroke(20);
  strokeWeight(3);
  if (bear.disturbed >= 80) {
    // Nearly awake: both eyes open, red
    fill(255, 80, 60);
    ellipse(eyeX1, eyeY, 12, 9);
    ellipse(eyeX2, eyeY, 12, 9);
  }
  else if (bear.disturbed >= 50) {
    // Half awake: slits
    fill(255);
    ellipse(eyeX1, eyeY, 12, 4);
    ellipse(eyeX2, eyeY, 12, 4);
  }
  else {
    // Asleep: closed eyes
    noFill();
    arc(eyeX1, eyeY, 12, 8, 0, PI);
    arc(eyeX2, eyeY, 12, 8, 0, PI);
  }
  pop();

  // Snoring Zs only while he's sleeping soundly
  push();
  fill(220);
  noStroke();
  if (bear.disturbed < 30) {
    textSize(18);
    let floatY = sin(frameCount * 0.05) * 6;
    text("z", x - 60, y - 90 + floatY);
    textSize(24);
    text("Z", x - 40, y - 115 + floatY);
  }
  pop();
}

/**
 * Draw the honey jar (unless you're carrying it)
 */
function drawHoney() {
  if (hasHoney) {
    return;
  }
  drawJar(honey.x, honey.y, honey.size);
}

/**
 * Draw a honey jar at a position
 */
function drawJar(x, y, size) {
  push();
  noStroke();
  // Glow so you know where to go
  fill(255, 200, 60, 50);
  ellipse(x, y, size * 2);
  fill(200, 140, 40);
  ellipse(x, y, size, size * 0.9);
  fill(240, 190, 60);
  ellipse(x, y - size * 0.4, size * 0.7, size * 0.25);
  pop();
}

/**
 * Draw the start circle, with instructions before the game starts
 */
function drawStart() {
  push();
  noStroke();
  let pulse = map(sin(frameCount * 0.08), -1, 1, 0.8, 1.2);
  // It glows brighter once you have the honey, to show where to go
  if (hasHoney) {
    fill(120, 255, 160, 160);
  }
  else {
    fill(120, 200, 255, 120);
  }
  ellipse(start.x, start.y, start.size * pulse);

  fill(255);
  textSize(15);
  if (state === "start") {
    text("Put your mouse on the blue circle to start.", width / 2, 30);
    text("Click the honey to grab it, then bring it back.", width / 2, 52);
    text("Don't step on the sticks.", width / 2, 74);
  }
  else if (hasHoney) {
    text("Got it! Now sneak it back to the circle.", width / 2, 80);
  }
  pop();
}

/**
 * Draw the player as a small paw print (holding the honey if you have it)
 */
function drawPlayer() {
  if (hasHoney) {
    drawJar(mouseX + 14, mouseY + 10, 24);
  }

  push();
  noStroke();
  fill(230);
  ellipse(mouseX, mouseY, 14);
  ellipse(mouseX - 8, mouseY - 9, 6);
  ellipse(mouseX, mouseY - 11, 6);
  ellipse(mouseX + 8, mouseY - 9, 6);
  pop();
}

/**
 * Draw the disturbance meter at the top
 */
function drawMeter() {
  let barWidth = 200;
  let filled = map(bear.disturbed, 0, bear.maxDisturbed, 0, barWidth);

  // The bar goes from green to red as he gets more disturbed
  let r = map(bear.disturbed, 0, bear.maxDisturbed, 80, 230);
  let g = map(bear.disturbed, 0, bear.maxDisturbed, 200, 50);

  push();
  noStroke();
  fill(255, 255, 255, 40);
  rect(width / 2 - barWidth / 2, 20, barWidth, 14, 7);
  fill(r, g, 60);
  rect(width / 2 - barWidth / 2, 20, filled, 14, 7);
  fill(255);
  textSize(12);
  text("how awake he is", width / 2, 48);
  pop();
}

/**
 * Show "CRACK!" for a moment after stepping on a stick
 */
function drawCrack() {
  if (crackTimer <= 0) {
    return;
  }
  push();
  fill(255, 230, 120);
  noStroke();
  textSize(28);
  textStyle(BOLD);
  text("CRACK!", mouseX, mouseY - 30);
  pop();
}

/**
 * Game over screen
 */
function drawCaught() {
  background(140, 20, 20);
  push();
  // The bear's angry eyes filling the screen
  noStroke();
  fill(255, 220, 0);
  ellipse(130, 170, 90, 60);
  ellipse(270, 170, 90, 60);
  fill(0);
  ellipse(130, 170, 20, 50);
  ellipse(270, 170, 20, 50);
  fill(255);
  textSize(36);
  textStyle(BOLD);
  text("HE'S AWAKE.", width / 2, 280);
  textSize(16);
  textStyle(NORMAL);
  text("Click to try again", width / 2, 320);
  pop();
}

/**
 * Win screen
 */
function drawWon() {
  background(240, 190, 60);
  push();
  noStroke();
  fill(200, 140, 40);
  ellipse(width / 2, 170, 120, 110);
  fill(255, 220, 100);
  ellipse(width / 2, 125, 90, 30);
  fill(80, 40, 0);
  textSize(32);
  textStyle(BOLD);
  text("You got the honey!", width / 2, 280);
  textSize(16);
  textStyle(NORMAL);
  text("He never knew. Click to play again.", width / 2, 320);
  pop();
}