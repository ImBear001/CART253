/**
 * Dear Bear
 * Tyler Myrans
 *
 * Write a letter to the bear. Type anything you want, then press ENTER
 * to send it. He reads every word and reacts: mention honey and he
 * drools, mention bees and he panics, say goodbye and he cries. Tell him
 * a secret and he promises not to tell. Say something he doesn't
 * understand and he just tilts his head.
 *
 * Explores events: keyTyped() catches every letter the player types,
 * and keyPressed() handles BACKSPACE and ENTER.
 */

"use strict";

// The letter the player is typing right now
let letter = "";

// The longest letter the bear will read
const maxLetterLength = 60;

// How the bear is reacting to the last letter he read
let reaction = "waiting";

// What the bear says back
let reply = "Write me a letter! Press ENTER to send it.";

// Counts down while the bear reacts, then he goes back to waiting
let reactionTimer = 0;

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(600, 450);
}

/**
 * Draws the bear, his speech bubble and the letter being written
 */
function draw() {
    // After a while the bear calms down and waits for another letter
    if (reactionTimer > 0) {
        reactionTimer -= 1;
        if (reactionTimer === 0) {
            reaction = "waiting";
            reply = "Write me another one!";
        }
    }

    drawRoom();
    drawBear(width / 2, 165, 150);
    drawSpeechBubble();
    drawLetter();
}

/**
 * Adds every letter, number and space the player types to the letter
 */
function keyTyped() {
    if (letter.length < maxLetterLength && key !== "Enter") {
        letter += key;
    }
    // Stop the browser doing anything else with the key (like scrolling on space)
    return false;
}

/**
 * Handles the special keys: BACKSPACE deletes, ENTER sends the letter
 */
function keyPressed() {
    if (keyCode === BACKSPACE) {
        letter = letter.slice(0, -1);
        return false;
    }
    else if (keyCode === ENTER) {
        sendLetter();
        return false;
    }
}

/**
 * Lets the bear read the letter, react to it, and clears the paper
 */
function sendLetter() {
    if (letter.trim() === "") {
        return;
    }
    reaction = readLetter(letter.toLowerCase());
    reply = getReply(reaction);
    reactionTimer = 60 * 4;
    letter = "";
}

/**
 * Returns how the bear feels about the letter passed in,
 * by looking for words he cares about
 */
function readLetter(text) {
    if (text.includes("bee")) {
        return "scared";
    }
    else if (text.includes("honey") || text.includes("salmon") || text.includes("fish")) {
        return "hungry";
    }
    else if (text.includes("bye") || text.includes("leave")) {
        return "sad";
    }
    else if (text.includes("love") || text.includes("hug") || text.includes("friend")) {
        return "loved";
    }
    else if (text.includes("secret")) {
        return "secret";
    }
    else if (text.includes("sleep") || text.includes("tired")) {
        return "sleepy";
    }
    return "confused";
}

/**
 * Returns what the bear says back for the reaction passed in
 */
function getReply(mood) {
    if (mood === "scared") {
        return "BEES?! WHERE?!";
    }
    else if (mood === "hungry") {
        return "Did somebody say snacks?";
    }
    else if (mood === "sad") {
        return "You're leaving...? :(";
    }
    else if (mood === "loved") {
        return "Aww. Bear hug!";
    }
    else if (mood === "secret") {
        return "I won't tell anyone. Promise.";
    }
    else if (mood === "sleepy") {
        return "Yawn... is it hibernation time?";
    }
    return "...I don't know what that means.";
}

/**
 * Draws the cozy room behind the bear
 */
function drawRoom() {
    background("#3b2a20");
    push();
    noStroke();
    // Wallpaper stripes
    fill(255, 255, 255, 10);
    for (let x = 0; x < width; x += 40) {
        rect(x, 0, 20, 300);
    }
    // Floor
    fill("#5c4433");
    rect(0, 300, width, height - 300);
    pop();
}

/**
 * Draws the bear at the position and size passed in,
 * with his face showing his current reaction
 */
function drawBear(x, y, size) {
    push();

    // When scared he shakes, when confused he tilts his head
    if (reaction === "scared") {
        translate(random(-4, 4), random(-4, 4));
    }
    translate(x, y);
    if (reaction === "confused") {
        rotate(0.25);
    }
    noStroke();

    // Body
    fill(92, 58, 33);
    ellipse(0, size * 0.95, size * 1.3, size * 0.9);

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

    drawFace(size);
    pop();
}

/**
 * Draws the bear's eyes, mouth and extras for his current reaction.
 * While waiting, his eyes follow the end of the letter as you type.
 */
function drawFace(size) {
    const eyeX = size * 0.19;
    const eyeY = -size * 0.08;

    push();
    fill(25, 15, 10);
    stroke(25, 15, 10);
    strokeWeight(size * 0.025);

    if (reaction === "scared") {
        // Huge eyes and a wobbly mouth
        fill(255);
        ellipse(-eyeX, eyeY, size * 0.16);
        ellipse(eyeX, eyeY, size * 0.16);
        fill(25, 15, 10);
        ellipse(-eyeX, eyeY, size * 0.05);
        ellipse(eyeX, eyeY, size * 0.05);
        noFill();
        arc(0, size * 0.28, size * 0.14, size * 0.06, PI, TWO_PI);
        // Sweat drop
        noStroke();
        fill(150, 200, 255);
        ellipse(size * 0.42, -size * 0.15, size * 0.07, size * 0.11);
    }
    else if (reaction === "sleepy" || reaction === "sad") {
        // Droopy closed eyes
        noFill();
        arc(-eyeX, eyeY, size * 0.12, size * 0.06, 0, PI);
        arc(eyeX, eyeY, size * 0.12, size * 0.06, 0, PI);
        if (reaction === "sad") {
            // Frown and falling tears
            arc(0, size * 0.3, size * 0.14, size * 0.07, PI, TWO_PI);
            noStroke();
            fill(150, 200, 255);
            const drip = (frameCount % 40) / 40 * size * 0.25;
            ellipse(-eyeX, eyeY + size * 0.08 + drip, size * 0.04, size * 0.06);
            ellipse(eyeX, eyeY + size * 0.08 + drip, size * 0.04, size * 0.06);
        }
        else {
            // Big yawn
            noStroke();
            fill(120, 30, 30);
            ellipse(0, size * 0.28, size * 0.1, size * 0.14);
        }
    }
    else {
        // Normal eyes. While waiting they look along the letter as you type.
        let lookX = 0;
        if (reaction === "waiting") {
            lookX = map(letter.length, 0, maxLetterLength, -size * 0.03, size * 0.03);
        }
        noStroke();
        ellipse(-eyeX + lookX, eyeY + size * 0.03, size * 0.08);
        ellipse(eyeX + lookX, eyeY + size * 0.03, size * 0.08);

        stroke(25, 15, 10);
        noFill();
        if (reaction === "hungry") {
            // Open mouth and drool
            noStroke();
            fill(120, 30, 30);
            ellipse(0, size * 0.28, size * 0.12, size * 0.1);
            fill(170, 210, 240);
            const drip = (frameCount % 50) / 50 * size * 0.1;
            ellipse(size * 0.04, size * 0.34 + drip, size * 0.04, size * 0.06);
        }
        else if (reaction === "confused") {
            line(-size * 0.05, size * 0.27, size * 0.05, size * 0.25);
            noStroke();
            fill(255);
            textSize(size * 0.3);
            textStyle(BOLD);
            text("?", size * 0.45, -size * 0.35);
        }
        else {
            // Smile for waiting, loved and secret
            arc(0, size * 0.24, size * 0.16, size * 0.1, 0, PI);
        }

        if (reaction === "loved") {
            drawHeart(-size * 0.55, -size * 0.45, size * 0.12);
            drawHeart(size * 0.55, -size * 0.3, size * 0.16);
            drawHeart(size * 0.4, -size * 0.65, size * 0.1);
        }
        if (reaction === "secret") {
            // A paw over his mouth
            noStroke();
            fill(92, 58, 33);
            ellipse(size * 0.05, size * 0.28, size * 0.3, size * 0.2);
        }
    }
    pop();
}

/**
 * Draws a little floating heart at the position and size passed in
 */
function drawHeart(x, y, size) {
    const bob = sin(frameCount * 0.08 + x) * 5;
    push();
    noStroke();
    fill(235, 90, 110);
    ellipse(x - size * 0.25, y + bob, size * 0.55);
    ellipse(x + size * 0.25, y + bob, size * 0.55);
    triangle(x - size * 0.52, y + bob + size * 0.08, x + size * 0.52, y + bob + size * 0.08, x, y + bob + size * 0.6);
    pop();
}

/**
 * Draws the speech bubble with the bear's reply
 */
function drawSpeechBubble() {
    push();
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(width / 2, 34, 470, 44, 20);
    fill(30);
    textAlign(CENTER, CENTER);
    textSize(19);
    text(reply, width / 2, 34);
    pop();
}

/**
 * Draws the piece of paper with the letter being typed on it,
 * with a blinking cursor at the end
 */
function drawLetter() {
    push();
    // Paper
    noStroke();
    fill(245, 236, 215);
    rect(60, 330, 480, 95, 6);
    // Lines on the paper
    stroke(200, 185, 160);
    line(80, 375, 520, 375);
    line(80, 405, 520, 405);

    noStroke();
    fill(70, 50, 40);
    textSize(13);
    text("Dear Bear,", 80, 352);

    // The letter itself, with a blinking cursor
    textSize(17);
    let cursor = "";
    if (frameCount % 60 < 30) {
        cursor = "|";
    }
    text(letter + cursor, 80, 398);

    // How much room is left
    fill(150, 130, 110);
    textSize(11);
    textAlign(RIGHT);
    text(letter.length + "/" + maxLetterLength, 528, 420);
    pop();
}