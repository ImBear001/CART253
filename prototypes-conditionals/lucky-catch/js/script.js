/**
 * Lucky Catch
 * Tyler Myrans
 *
 * The bear is fishing at the river. Click to swipe a paw into the water.
 * Most of the time you get a regular fish, sometimes a boot or nothing
 * at all, and very rarely (about 1 in 30) a glowing golden salmon.
 * The bear's face changes depending on what he caught, and he gets
 * grumpier the longer he goes without a fish.
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The bear on the riverbank
let bear = {
  x: 200,
  y: 130,
  size: 150,
  fill: {
    r: 120,
    g: 80,
    b: 50
  },
  // How many swipes in a row with no fish
  dryStreak: 0
};

// The chance of each catch (they're checked in this order)
let goldenChance = 0.033;
let bootChance = 0.12;
let nothingChance = 0.35;

// What came out of the water last, and how long it stays on screen
let catchResult = "none";
let catchTimer = 0;
let catchDuration = 60;

// The paw swipe animation
let swipeTimer = 0;
let swipeDuration = 15;

// Catch counts
let fishCount = 0;
let bootCount = 0;
let goldenCount = 0;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

/**
 * Update the timers, then draw the scene
 */
function draw() {
  drawBackground();
  drawRiver();
  drawBear();
  drawPaw();
  drawCatch();
  drawScore();

  if (catchTimer > 0) {
    catchTimer -= 1;
  }
  if (swipeTimer > 0) {
    swipeTimer -= 1;
  }
}

/**
 * Click to swipe (but not while the last catch is still showing)
 */
function mousePressed() {
  if (catchTimer > 0) {
    return;
  }

  swipeTimer = swipeDuration;
  catchTimer = catchDuration;

  // One random roll decides what you catch
  let roll = random();

  if (roll < goldenChance) {
    catchResult = "golden";
    goldenCount += 1;
    bear.dryStreak = 0;
  }
  else if (roll < goldenChance + bootChance) {
    catchResult = "boot";
    bootCount += 1;
    bear.dryStreak += 1;
  }
  else if (roll < goldenChance + bootChance + nothingChance) {
    catchResult = "nothing";
    bear.dryStreak += 1;
  }
  else {
    catchResult = "fish";
    fishCount += 1;
    bear.dryStreak = 0;
  }
}

/**
 * Sky, or a golden flash when you catch the rare one
 */
function drawBackground() {
  if (catchResult === "golden" && catchTimer > 0) {
    // Flash between gold and orange
    if (frameCount % 10 < 5) {
      background(255, 220, 80);
    }
    else {
      background(255, 170, 60);
    }
  }
  else {
    background(150, 200, 230);
  }

  // Riverbank
  push();
  noStroke();
  fill(90, 140, 70);
  rect(0, 170, width, 60);
  pop();
}

/**
 * Draw the river with waves that move using sin()
 */
function drawRiver() {
  push();
  noStroke();
  fill(50, 110, 170);
  rect(0, 220, width, height - 220);

  // Little wave lines
  stroke(180, 220, 255, 150);
  strokeWeight(3);
  for (let y = 240; y < height; y += 30) {
    for (let x = 0; x < width; x += 50) {
      let offset = sin(frameCount * 0.05 + x * 0.05 + y) * 8;
      line(x + offset, y, x + 25 + offset, y);
    }
  }
  pop();
}

/**
 * Draw the bear, with a face that depends on the last catch
 */
function drawBear() {
  let earOffset = bear.size * 0.35;
  let earSize = bear.size * 0.32;
  let eyeY = bear.y - bear.size * 0.08;
  let eyeOffsetX = bear.size * 0.18;
  let mouthY = bear.y + bear.size * 0.22;

  push();
  noStroke();
  fill(bear.fill.r, bear.fill.g, bear.fill.b);
  ellipse(bear.x - earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x + earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x, bear.y, bear.size);
  fill(40, 25, 20);
  ellipse(bear.x, bear.y + bear.size * 0.08, bear.size * 0.12, bear.size * 0.08);
  pop();

  // Pick a mood from the last catch (only while it's showing)
  let mood = "focused";
  if (catchTimer > 0) {
    if (catchResult === "golden") {
      mood = "amazed";
    }
    else if (catchResult === "fish") {
      mood = "happy";
    }
    else if (catchResult === "boot") {
      mood = "annoyed";
    }
    else {
      mood = "sad";
    }
  }
  // A long dry streak makes him grumpy even between swipes
  else if (bear.dryStreak >= 3) {
    mood = "annoyed";
  }

  push();
  stroke(20);
  strokeWeight(4);
  noFill();

  // Eyes
  if (mood === "amazed") {
    fill(255);
    ellipse(bear.x - eyeOffsetX, eyeY, 30);
    ellipse(bear.x + eyeOffsetX, eyeY, 30);
    fill(0);
    ellipse(bear.x - eyeOffsetX, eyeY, 10);
    ellipse(bear.x + eyeOffsetX, eyeY, 10);
  }
  else if (mood === "happy") {
    arc(bear.x - eyeOffsetX, eyeY, 18, 18, PI, TWO_PI);
    arc(bear.x + eyeOffsetX, eyeY, 18, 18, PI, TWO_PI);
  }
  else if (mood === "annoyed") {
    // Angry slanted brows over flat eyes
    line(bear.x - eyeOffsetX - 10, eyeY - 12, bear.x - eyeOffsetX + 8, eyeY - 6);
    line(bear.x + eyeOffsetX + 10, eyeY - 12, bear.x + eyeOffsetX - 8, eyeY - 6);
    line(bear.x - eyeOffsetX - 6, eyeY + 2, bear.x - eyeOffsetX + 6, eyeY + 2);
    line(bear.x + eyeOffsetX - 6, eyeY + 2, bear.x + eyeOffsetX + 6, eyeY + 2);
  }
  else if (mood === "sad") {
    noStroke();
    fill(0);
    ellipse(bear.x - eyeOffsetX, eyeY, 10);
    ellipse(bear.x + eyeOffsetX, eyeY, 10);
    stroke(20);
    // Sad brows
    line(bear.x - eyeOffsetX - 8, eyeY - 8, bear.x - eyeOffsetX + 6, eyeY - 13);
    line(bear.x + eyeOffsetX + 8, eyeY - 8, bear.x + eyeOffsetX - 6, eyeY - 13);
  }
  else {
    // Focused: eyes looking down at the water
    noStroke();
    fill(0);
    ellipse(bear.x - eyeOffsetX, eyeY + 4, 10);
    ellipse(bear.x + eyeOffsetX, eyeY + 4, 10);
  }

  // Mouth
  stroke(40, 25, 20);
  noFill();
  if (mood === "amazed") {
    fill(80, 20, 30);
    ellipse(bear.x, mouthY, 24, 30);
  }
  else if (mood === "happy") {
    arc(bear.x, mouthY - 6, 34, 24, 0, PI);
  }
  else if (mood === "sad" || mood === "annoyed") {
    arc(bear.x, mouthY + 6, 30, 18, PI, TWO_PI);
  }
  else {
    line(bear.x - 10, mouthY, bear.x + 10, mouthY);
  }
  pop();
}

/**
 * Draw the paw swiping down into the water
 */
function drawPaw() {
  if (swipeTimer <= 0) {
    return;
  }

  // The paw goes down and comes back up during the swipe
  let progress = 1 - swipeTimer / swipeDuration;
  let pawY = 210 + sin(progress * PI) * 70;

  push();
  noStroke();
  fill(bear.fill.r, bear.fill.g, bear.fill.b);
  ellipse(260, pawY, 50, 40);
  // Claws
  fill(240);
  ellipse(250, pawY + 18, 6, 10);
  ellipse(260, pawY + 20, 6, 10);
  ellipse(270, pawY + 18, 6, 10);
  pop();
}

/**
 * Draw whatever came out of the water
 */
function drawCatch() {
  if (catchTimer <= 0 || swipeTimer > 0) {
    return;
  }

  let x = 290;
  let y = 250;

  push();
  noStroke();
  textSize(22);
  textStyle(BOLD);

  if (catchResult === "golden") {
    // Sparkles in random spots around the salmon
    fill(255, 255, 200);
    for (let i = 0; i < 12; i++) {
      ellipse(x + random(-70, 70), y + random(-50, 50), random(3, 8));
    }
    fill(255, 200, 0);
    ellipse(x, y, 90, 36);
    triangle(x + 40, y, x + 65, y - 20, x + 65, y + 20);
    fill(0);
    ellipse(x - 28, y - 5, 6);
    fill(120, 60, 0);
    text("GOLDEN SALMON!!", width / 2, 330);
  }
  else if (catchResult === "fish") {
    fill(120, 170, 200);
    ellipse(x, y, 70, 28);
    triangle(x + 32, y, x + 52, y - 15, x + 52, y + 15);
    fill(0);
    ellipse(x - 22, y - 4, 5);
    fill(255);
    text("A fish!", width / 2, 330);
  }
  else if (catchResult === "boot") {
    fill(80, 50, 30);
    rect(x - 15, y - 35, 30, 50, 4);
    rect(x - 15, y + 5, 55, 20, 6);
    fill(255);
    text("...a boot?!", width / 2, 330);
  }
  else {
    fill(255);
    text("Nothing.", width / 2, 330);
  }
  pop();
}

/**
 * Draw the catch counts in the corner
 */
function drawScore() {
  push();
  fill(255);
  stroke(0, 80);
  strokeWeight(3);
  textSize(14);
  textAlign(LEFT, TOP);
  text("Fish: " + fishCount, 12, 10);
  text("Boots: " + bootCount, 12, 28);
  text("Golden: " + goldenCount, 12, 46);
  pop();
}