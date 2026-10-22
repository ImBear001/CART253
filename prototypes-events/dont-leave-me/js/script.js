/**
 * Don't Leave Me
 * Tyler Myrans
 *
 * A very clingy bear. He loves it when your mouse is with him: his eyes
 * follow you everywhere and clicking him pets him. Move your mouse off
 * the canvas and he starts to panic. Switch to another browser tab and
 * when you come back he's crying and tells you exactly how long you
 * were gone. Resize the window and he gets squished.
 *
 * Explores events: mouseMoved() and mousePressed(), the canvas
 * mouseOver() and mouseOut() events, windowResized(), and the browser's
 * "visibilitychange" event for when the player switches tabs.
 */

"use strict";

// The canvas, kept so we can listen for the mouse entering and leaving it
let canvas = undefined;

// How the bear feels: "happy", "worried", "crying", "squished" or "petted"
let mood = "happy";

// How many frames the mouse has been away from the canvas
let awayFrames = 0;

// Is the mouse over the canvas right now?
let mouseIsHere = true;

// When the player switched to another tab (in milliseconds)
let leftAt = 0;

// How many seconds the player was gone the last time they switched tabs
let secondsGone = 0;

// Counts down while the bear is crying, squished or being petted
let moodTimer = 0;

// Where the bear is looking (follows the mouse)
let lookX = 0;
let lookY = 0;

/**
 * Creates the canvas and starts listening for the mouse
 * leaving the canvas and the player switching tabs
 */
function setup() {
    canvas = createCanvas(600, 450);
    canvas.mouseOver(mouseEntered);
    canvas.mouseOut(mouseLeft);

    // A browser event (not from p5) for when the tab is hidden or shown
    document.addEventListener("visibilitychange", tabChanged);
}

/**
 * Updates how the bear feels, then draws him and what he's saying
 */
function draw() {
    updateMood();

    drawRoom();
    drawBear(width / 2, 180, 160);
    drawMessage();
}

/**
 * Works out the bear's mood from where the mouse is and what just happened
 */
function updateMood() {
    // Crying, squished and petted last for a little while
    if (moodTimer > 0) {
        moodTimer -= 1;
        return;
    }

    if (mouseIsHere) {
        mood = "happy";
        awayFrames = 0;
    }
    else {
        mood = "worried";
        awayFrames += 1;
    }
}

/**
 * When the mouse moves, the bear's eyes follow it
 */
function mouseMoved() {
    lookX = map(mouseX, 0, width, -1, 1, true);
    lookY = map(mouseY, 0, height, -1, 1, true);
}

/**
 * Clicking on the bear pets him
 */
function mousePressed() {
    if (dist(mouseX, mouseY, width / 2, 180) < 85) {
        mood = "petted";
        moodTimer = 60 * 2;
    }
}

/**
 * Called when the mouse comes back onto the canvas
 */
function mouseEntered() {
    mouseIsHere = true;
}

/**
 * Called when the mouse leaves the canvas
 */
function mouseLeft() {
    mouseIsHere = false;
}

/**
 * Called when the browser window changes size: the bear gets squished
 */
function windowResized() {
    mood = "squished";
    moodTimer = 60 * 2;
}

/**
 * Called when the player switches away from this tab or comes back to it
 */
function tabChanged() {
    if (document.hidden) {
        // The player just left, remember when
        leftAt = millis();
    }
    else {
        // The player is back: work out how long they were gone
        secondsGone = round((millis() - leftAt) / 1000);
        mood = "crying";
        moodTimer = 60 * 5;
    }
}

/**
 * Draws the bear's room, which gets darker the longer you're away
 */
function drawRoom() {
    const lonely = constrain(awayFrames / (60 * 5), 0, 1);
    const warm = color("#e8c9a0");
    const cold = color("#4a5266");
    background(lerpColor(warm, cold, lonely));

    push();
    noStroke();
    fill(0, 0, 0, 30);
    rect(0, 330, width, height - 330);
    pop();
}

/**
 * Draws the bear at the position and size passed in, in his current mood
 */
function drawBear(x, y, size) {
    push();
    translate(x, y);

    // Squished: flat and wide
    if (mood === "squished") {
        scale(1.4, 0.6);
    }
    // Worried: he shakes more the longer you're gone
    if (mood === "worried") {
        const shake = constrain(awayFrames / 60, 0, 5);
        translate(random(-shake, shake), random(-shake, shake));
    }
    // Happy and petted: he bounces
    if (mood === "happy" || mood === "petted") {
        translate(0, sin(frameCount * 0.1) * 4);
    }

    noStroke();

    // Body and arms
    fill(92, 58, 33);
    ellipse(0, size * 0.95, size * 1.2, size * 0.9);
    // Arms reach out towards you when he's worried
    if (mood === "worried" || mood === "crying") {
        ellipse(-size * 0.7, size * 0.6, size * 0.45, size * 0.22);
        ellipse(size * 0.7, size * 0.6, size * 0.45, size * 0.22);
    }

    // Ears
    ellipse(-size * 0.36, -size * 0.36, size * 0.34);
    ellipse(size * 0.36, -size * 0.36, size * 0.34);

    // Head
    fill(110, 70, 40);
    ellipse(0, 0, size, size * 0.92);

    // Muzzle and nose
    fill(196, 156, 116);
    ellipse(0, size * 0.17, size * 0.42, size * 0.32);
    fill(35, 22, 15);
    ellipse(0, size * 0.09, size * 0.14, size * 0.09);

    drawEyes(size);
    drawMouth(size);
    pop();
}

/**
 * Draws the bear's eyes, which follow the mouse and fill with tears when he's upset
 */
function drawEyes(size) {
    const eyeX = size * 0.19;
    const eyeY = -size * 0.08;

    push();
    noStroke();

    if (mood === "petted") {
        // Happy closed eyes
        stroke(25, 15, 10);
        strokeWeight(size * 0.025);
        noFill();
        arc(-eyeX, eyeY + size * 0.02, size * 0.12, size * 0.08, PI, TWO_PI);
        arc(eyeX, eyeY + size * 0.02, size * 0.12, size * 0.08, PI, TWO_PI);
    }
    else {
        // White eyes with pupils that look at the mouse
        fill(255);
        ellipse(-eyeX, eyeY, size * 0.15);
        ellipse(eyeX, eyeY, size * 0.15);
        fill(25, 15, 10);
        const pupilX = lookX * size * 0.035;
        const pupilY = lookY * size * 0.035;
        ellipse(-eyeX + pupilX, eyeY + pupilY, size * 0.07);
        ellipse(eyeX + pupilX, eyeY + pupilY, size * 0.07);
    }

    // Tears when he's crying, or when he's been worried for a while
    if (mood === "crying" || (mood === "worried" && awayFrames > 90)) {
        fill(150, 200, 255);
        const drip = (frameCount % 30) / 30 * size * 0.3;
        ellipse(-eyeX, eyeY + size * 0.1 + drip, size * 0.05, size * 0.07);
        ellipse(eyeX, eyeY + size * 0.1 + drip, size * 0.05, size * 0.07);
    }
    pop();
}

/**
 * Draws the bear's mouth for his current mood
 */
function drawMouth(size) {
    push();
    stroke(25, 15, 10);
    strokeWeight(size * 0.025);
    noFill();

    if (mood === "happy" || mood === "petted") {
        arc(0, size * 0.24, size * 0.16, size * 0.1, 0, PI);
        // Blush
        noStroke();
        fill(235, 120, 120, 130);
        ellipse(-size * 0.3, size * 0.08, size * 0.14, size * 0.08);
        ellipse(size * 0.3, size * 0.08, size * 0.14, size * 0.08);
    }
    else if (mood === "squished") {
        // Squiggly mouth
        line(-size * 0.07, size * 0.27, -size * 0.02, size * 0.24);
        line(-size * 0.02, size * 0.24, size * 0.02, size * 0.27);
        line(size * 0.02, size * 0.27, size * 0.07, size * 0.24);
    }
    else {
        // Wobbly upset mouth
        arc(0, size * 0.3, size * 0.16, size * 0.08, PI, TWO_PI);
    }
    pop();
}

/**
 * Draws what the bear is saying
 */
function drawMessage() {
    let message = "Hi!! Stay with me okay?";

    if (mood === "petted") {
        message = "Hehe. More pets please.";
    }
    else if (mood === "squished") {
        message = "HEY! Stop squishing me!";
    }
    else if (mood === "crying") {
        message = "You were gone for " + secondsGone + " seconds!! Where did you go?!";
    }
    else if (mood === "worried") {
        if (awayFrames < 60 * 2) {
            message = "Wait... where are you going?";
        }
        else if (awayFrames < 60 * 5) {
            message = "Hello?? Come back!!";
        }
        else {
            message = "...I guess I'll just wait here. Alone.";
        }
    }

    push();
    noStroke();
    fill(255, 255, 255, 230);
    rectMode(CENTER);
    rect(width / 2, 36, 520, 46, 22);
    fill(40);
    textAlign(CENTER, CENTER);
    textSize(19);
    text(message, width / 2, 36);

    // A hint for the player at the bottom
    fill(0, 0, 0, 120);
    textSize(13);
    text("Click him to pet him. Try moving your mouse away, switching tabs or resizing the window.", width / 2, 430);
    pop();
}