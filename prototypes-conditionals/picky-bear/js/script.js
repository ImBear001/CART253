/**
 * Picky Bear
 * Tyler Myrans
 *
 * A hungry bear with opinions. Click a food on the table to pick it up
 * (honey, fish, berries, or garbage), then bring it close to his mouth.
 * He reacts to whatever you're holding: he loves honey, likes fish, isn't
 * sure about berries, and is disgusted by garbage. Click near his mouth to
 * feed him. Feed him too much and he gets full and refuses everything
 * until he's digested.
 *
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// The bear
let bear = {
  x: 200,
  y: 180,
  size: 170,
  fill: {
    r: 120,
    g: 80,
    b: 50
  },
  // How full he is, and how full he can get
  fullness: 0,
  maxFullness: 6,
  // How fast he digests (fullness goes down by this every frame)
  digestRate: 0.004,
  // How close the food has to be for him to react
  reactDistance: 90
};

// The food you're holding ("none" if you're not holding anything)
let food = "none";
let reaction = "waiting";

// The foods sitting on the table at the bottom
let tableY = 355;
let foodSpots = {
  honey: 60,
  fish: 150,
  berries: 250,
  garbage: 340
};
// How close you have to click to pick a food up
let pickUpDistance = 30;

// A message that pops up after feeding, and how long it stays
let message = "";
let messageTimer = 0;
let messageDuration = 70;

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

/**
 * Work out the bear's reaction, digest, then draw everything
 */
function draw() {
  background(40, 55, 45);

  chooseReaction();
  digest();

  drawTable();
  drawBear();
  if (food !== "none") {
    drawFood(food, mouseX, mouseY);
  }
  drawLabels();
}

/**
 * Decide how the bear feels, based on how close the food is,
 * what it is, and how full he already is
 */
function chooseReaction() {
  let mouthY = bear.y + bear.size * 0.25;
  let distance = dist(mouseX, mouseY, bear.x, mouthY);

  if (food === "none" || distance > bear.reactDistance) {
    reaction = "waiting";
  }
  else if (bear.fullness >= bear.maxFullness) {
    reaction = "full";
  }
  else if (food === "honey") {
    reaction = "love";
  }
  else if (food === "fish") {
    reaction = "like";
  }
  else if (food === "berries") {
    reaction = "unsure";
  }
  else {
    reaction = "gross";
  }
}

/**
 * Slowly digest, so he gets hungry again
 */
function digest() {
  bear.fullness = constrain(bear.fullness - bear.digestRate, 0, bear.maxFullness);
  if (messageTimer > 0) {
    messageTimer -= 1;
  }
}

/**
 * Click a food on the table to pick it up,
 * or click near the bear's mouth to feed him
 */
function mousePressed() {
  // Picking up a food from the table
  if (dist(mouseX, mouseY, foodSpots.honey, tableY) < pickUpDistance) {
    food = "honey";
    return;
  }
  else if (dist(mouseX, mouseY, foodSpots.fish, tableY) < pickUpDistance) {
    food = "fish";
    return;
  }
  else if (dist(mouseX, mouseY, foodSpots.berries, tableY) < pickUpDistance) {
    food = "berries";
    return;
  }
  else if (dist(mouseX, mouseY, foodSpots.garbage, tableY) < pickUpDistance) {
    food = "garbage";
    return;
  }

  // Not close enough to the bear to feed him
  if (reaction === "waiting") {
    return;
  }

  if (reaction === "full") {
    showMessage("I'm stuffed...");
  }
  else if (reaction === "gross") {
    showMessage("BLEH!");
  }
  else if (reaction === "love") {
    bear.fullness += 2;
    food = "none";
    showMessage("HONEY!!!");
  }
  else if (reaction === "like") {
    bear.fullness += 1;
    food = "none";
    showMessage("Mmm, fish.");
  }
  else {
    // Berries: only eats them if he's hungry
    if (bear.fullness < bear.maxFullness / 2) {
      bear.fullness += 1;
      food = "none";
      showMessage("...fine.");
    }
    else {
      showMessage("Nah.");
    }
  }

  bear.fullness = constrain(bear.fullness, 0, bear.maxFullness);
}

/**
 * Show a message above the bear for a little while
 */
function showMessage(text) {
  message = text;
  messageTimer = messageDuration;
}

/**
 * Draw the bear, with a face that matches his reaction
 */
function drawBear() {
  // He gets a bit rounder the fuller he is
  let size = bear.size + bear.fullness * 6;
  let earOffset = size * 0.35;
  let earSize = size * 0.32;

  // Garbage turns him a little green
  let r = bear.fill.r;
  let g = bear.fill.g;
  let b = bear.fill.b;
  if (reaction === "gross") {
    r = 100;
    g = 120;
    b = 60;
  }

  push();
  noStroke();
  fill(r, g, b);
  ellipse(bear.x - earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x + earOffset, bear.y - earOffset, earSize);
  ellipse(bear.x, bear.y, size);
  // Muzzle
  fill(190, 150, 110);
  ellipse(bear.x, bear.y + size * 0.18, size * 0.45, size * 0.32);
  // Nose
  fill(40, 25, 20);
  ellipse(bear.x, bear.y + size * 0.09, size * 0.12, size * 0.08);
  pop();

  drawEyes(size);
  drawMouth(size);

  // Blush when he loves it
  if (reaction === "love") {
    push();
    noStroke();
    fill(255, 120, 140, 150);
    ellipse(bear.x - size * 0.28, bear.y + size * 0.08, size * 0.14, size * 0.08);
    ellipse(bear.x + size * 0.28, bear.y + size * 0.08, size * 0.14, size * 0.08);
    pop();
  }
}

/**
 * Draw the eyes: they follow the food, and change shape with the reaction
 */
function drawEyes(size) {
  let eyeY = bear.y - size * 0.1;
  let eyeOffsetX = size * 0.18;
  let eyeSize = size * 0.11;

  push();
  stroke(20);
  strokeWeight(4);

  if (reaction === "love") {
    // Happy closed eyes (upside-down U shapes)
    noFill();
    arc(bear.x - eyeOffsetX, eyeY, eyeSize, eyeSize, PI, TWO_PI);
    arc(bear.x + eyeOffsetX, eyeY, eyeSize, eyeSize, PI, TWO_PI);
  }
  else if (reaction === "gross" || reaction === "full") {
    // Squeezed shut
    line(bear.x - eyeOffsetX - eyeSize / 2, eyeY, bear.x - eyeOffsetX + eyeSize / 2, eyeY);
    line(bear.x + eyeOffsetX - eyeSize / 2, eyeY, bear.x + eyeOffsetX + eyeSize / 2, eyeY);
  }
  else {
    // Open eyes, with pupils looking at the food
    let lookX = constrain((mouseX - bear.x) * 0.03, -eyeSize * 0.25, eyeSize * 0.25);
    let lookY = constrain((mouseY - eyeY) * 0.03, -eyeSize * 0.25, eyeSize * 0.25);

    noStroke();
    fill(255);
    ellipse(bear.x - eyeOffsetX, eyeY, eyeSize);
    ellipse(bear.x + eyeOffsetX, eyeY, eyeSize);
    fill(0);
    ellipse(bear.x - eyeOffsetX + lookX, eyeY + lookY, eyeSize * 0.45);
    ellipse(bear.x + eyeOffsetX + lookX, eyeY + lookY, eyeSize * 0.45);

    // Unsure: one raised eyebrow
    if (reaction === "unsure") {
      stroke(20);
      strokeWeight(4);
      line(bear.x + eyeOffsetX - eyeSize * 0.6, eyeY - eyeSize * 0.9, bear.x + eyeOffsetX + eyeSize * 0.6, eyeY - eyeSize * 1.3);
    }
  }
  pop();
}

/**
 * Draw the mouth, which changes with the reaction
 */
function drawMouth(size) {
  let mouthY = bear.y + size * 0.25;
  let mouthWidth = size * 0.2;

  push();
  stroke(40, 25, 20);
  strokeWeight(4);
  noFill();

  if (reaction === "love") {
    // Big open smile
    fill(80, 20, 30);
    arc(bear.x, mouthY - 4, mouthWidth * 1.4, mouthWidth * 1.2, 0, PI, CHORD);
  }
  else if (reaction === "like") {
    // Open, ready to eat
    fill(80, 20, 30);
    ellipse(bear.x, mouthY, mouthWidth * 0.7, mouthWidth * 0.6);
  }
  else if (reaction === "unsure") {
    // Wobbly flat line
    line(bear.x - mouthWidth / 2, mouthY, bear.x + mouthWidth / 2, mouthY + 4);
  }
  else if (reaction === "gross") {
    // Frown with tongue out
    arc(bear.x, mouthY + 8, mouthWidth, mouthWidth * 0.6, PI, TWO_PI);
    noStroke();
    fill(230, 100, 120);
    ellipse(bear.x + 4, mouthY + 10, mouthWidth * 0.35, mouthWidth * 0.45);
  }
  else if (reaction === "full") {
    // Puffed cheeks, tiny mouth
    ellipse(bear.x, mouthY, 8);
  }
  else {
    // Waiting: a little smile
    arc(bear.x, mouthY - 4, mouthWidth, mouthWidth * 0.5, 0, PI);
  }
  pop();
}

/**
 * Draw the table with the foods on it (the one you're holding is gone)
 */
function drawTable() {
  push();
  noStroke();
  fill(90, 60, 35);
  rect(0, tableY - 10, width, height - tableY + 10);
  pop();

  if (food !== "honey") {
    drawFood("honey", foodSpots.honey, tableY);
  }
  if (food !== "fish") {
    drawFood("fish", foodSpots.fish, tableY);
  }
  if (food !== "berries") {
    drawFood("berries", foodSpots.berries, tableY);
  }
  if (food !== "garbage") {
    drawFood("garbage", foodSpots.garbage, tableY);
  }
}

/**
 * Draw one food at a position
 */
function drawFood(type, x, y) {
  push();
  noStroke();
  if (type === "honey") {
    // Honey pot
    fill(200, 140, 40);
    ellipse(x, y, 40, 36);
    fill(240, 190, 60);
    ellipse(x, y - 16, 30, 10);
  }
  else if (type === "fish") {
    fill(120, 170, 200);
    ellipse(x, y, 50, 22);
    triangle(x + 22, y, x + 38, y - 12, x + 38, y + 12);
    fill(0);
    ellipse(x - 15, y - 3, 4);
  }
  else if (type === "berries") {
    fill(110, 40, 140);
    ellipse(x - 8, y, 16);
    ellipse(x + 8, y, 16);
    ellipse(x, y - 12, 16);
    fill(60, 140, 60);
    ellipse(x, y - 22, 10, 6);
  }
  else {
    // Garbage: a crumpled can with stink lines
    fill(150);
    rect(x - 12, y - 16, 24, 32, 4);
    stroke(120, 160, 60);
    strokeWeight(2);
    noFill();
    let wiggle = sin(frameCount * 0.2) * 3;
    line(x - 8 + wiggle, y - 22, x - 8 - wiggle, y - 34);
    line(x + 8 - wiggle, y - 22, x + 8 + wiggle, y - 34);
  }
  pop();
}

/**
 * Draw the food name, the fullness bar, and any message
 */
function drawLabels() {
  push();
  fill(255);
  noStroke();
  textSize(16);
  if (food === "none") {
    text("Click a food to pick it up", width / 2, 24);
  }
  else {
    text("Holding: " + food, width / 2, 24);
  }

  // Fullness bar
  let barWidth = 160;
  let filled = map(bear.fullness, 0, bear.maxFullness, 0, barWidth);
  fill(255, 255, 255, 60);
  rect(width / 2 - barWidth / 2, 300, barWidth, 12, 6);
  fill(240, 190, 60);
  rect(width / 2 - barWidth / 2, 300, filled, 12, 6);
  fill(255);
  textSize(12);
  text("fullness", width / 2, 324);

  // Message after feeding
  if (messageTimer > 0) {
    textSize(26);
    textStyle(BOLD);
    text(message, width / 2, 56);
  }
  pop();
}