/**
 * Bear Choir
 * Tyler Myrans
 *
 * Seven bears stand in a row, each one singing a different note of
 * the scale, from the big low-voiced bear on the left to the tiny
 * high-voiced cub on the right. Click a bear (or press A S D F G H J)
 * to make him sing. Press R to record a song, R again to stop, and
 * P to have the whole choir play it back for you.
 *
 * Explores arrays: the bears are an array, their notes and names come
 * from arrays, the floating music notes are an array, and the song
 * you record is an array of which bear sang and when.
 *
 * Uses p5.sound (included in the template) to make the tones.
 */

"use strict";

// The note each bear sings, from low to high (in Hz). These are a
// pentatonic scale, which has no clashing notes, so any bears you
// mash together still sound good
const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];

// The sound each bear makes when he sings, from the deep bass bear to the tiny cub
const voices = ["Bum", "Bom", "Doo", "Dah", "La", "Lee", "Yip"];

// The key that makes each bear sing
const keys = ["a", "s", "d", "f", "g", "h", "j"];

// The colour of each bear's choir robe
const robeColours = ["#c0392b", "#e67e22", "#f1c40f", "#27ae60", "#2980b9", "#8e44ad", "#d35490"];

// The bears in the choir, created in setup()
let bears = [];

// Music notes floating up from the bears who are singing
let musicNotes = [];

// The song being recorded: a list of { bear, frame } moments
let song = [];

// "idle", "recording" or "playing"
let mode = "idle";

// The frame the recording or playback started on
let modeStart = 0;

// Which moment of the song is up next during playback
let songStep = 0;

/**
 * Creates the canvas and the seven bears
 */
function setup() {
    createCanvas(600, 450);

    for (let i = 0; i < notes.length; i++) {
        bears.push(createBear(i));
    }
}

/**
 * Plays back the song if it's playing, then draws the stage,
 * the bears and the floating music notes
 */
function draw() {
    if (mode === "playing") {
        playSong();
    }

    drawStage();

    for (let i = 0; i < bears.length; i++) {
        drawBear(bears[i]);
    }

    // Go backwards so removing a note doesn't skip the next one
    for (let i = musicNotes.length - 1; i >= 0; i--) {
        updateMusicNote(musicNotes[i]);
        drawMusicNote(musicNotes[i]);
        // Remove notes once they've faded away
        if (musicNotes[i].life <= 0) {
            musicNotes.splice(i, 1);
        }
    }

    drawMessage();
}

/**
 * Returns a new bear for the place in the choir passed in. Bears on the
 * left are bigger with lower voices, bears on the right are smaller.
 */
function createBear(index) {
    const size = map(index, 0, notes.length - 1, 86, 52);

    // Every bear gets its own oscillator (the thing that makes the tone)
    // and envelope (which makes the tone fade in and out like a voice)
    const voice = new p5.Oscillator("triangle");
    voice.freq(notes[index]);
    voice.amp(0);
    voice.start();
    const envelope = new p5.Envelope();
    envelope.setADSR(0.02, 0.2, 0.3, 0.4);
    envelope.setRange(0.35, 0);

    const bear = {
        x: 90 + index * 70,
        y: 300 - size * 0.3,
        size: size,
        robe: robeColours[index],
        sound: voices[index],
        key: keys[index],
        voice: voice,
        envelope: envelope,
        // Counts down while the bear is singing
        singing: 0
    };
    return bear;
}

/**
 * Makes the bear passed in sing his note, open his mouth and send
 * a music note floating up. If we're recording, it gets added to the song.
 */
function sing(bear) {
    bear.envelope.play(bear.voice);
    bear.singing = 20;
    musicNotes.push(createMusicNote(bear.x, bear.y - bear.size * 0.7, bear.robe));

    if (mode === "recording") {
        song.push({
            bear: bears.indexOf(bear),
            frame: frameCount - modeStart
        });
    }
}

/**
 * Returns a new music note floating up from the position passed in
 */
function createMusicNote(x, y, colour) {
    const musicNote = {
        x: x,
        y: y,
        colour: colour,
        drift: random(-0.6, 0.6),
        life: 60
    };
    return musicNote;
}

/**
 * Floats the music note passed in upwards and fades it out
 */
function updateMusicNote(musicNote) {
    musicNote.y -= 1.5;
    musicNote.x += musicNote.drift + sin(musicNote.life * 0.2) * 0.6;
    musicNote.life -= 1;
}

/**
 * Plays the recorded song back, making each bear sing at the moment he sang
 */
function playSong() {
    const now = frameCount - modeStart;
    while (songStep < song.length && song[songStep].frame <= now) {
        sing(bears[song[songStep].bear]);
        songStep += 1;
    }
    // Once every moment has been sung, the song is over
    if (songStep >= song.length) {
        mode = "idle";
    }
}

/**
 * Clicking a bear makes him sing
 */
function mousePressed() {
    // The browser only allows sound after the player does something
    userStartAudio();

    for (let i = 0; i < bears.length; i++) {
        if (dist(mouseX, mouseY, bears[i].x, bears[i].y) < bears[i].size * 0.6) {
            sing(bears[i]);
        }
    }
}

/**
 * The A S D F G H J keys make each bear sing, R records and P plays back
 */
function keyPressed() {
    userStartAudio();

    for (let i = 0; i < bears.length; i++) {
        if (key === bears[i].key) {
            sing(bears[i]);
        }
    }

    if (key === "r") {
        if (mode === "recording") {
            mode = "idle";
        }
        else {
            // Start a brand new song
            song = [];
            mode = "recording";
            modeStart = frameCount;
        }
    }
    else if (key === "p" && song.length > 0 && mode !== "recording") {
        mode = "playing";
        // Start right at the first note instead of waiting through the silence before it
        modeStart = frameCount - song[0].frame;
        songStep = 0;
    }
}

/**
 * Draws the stage with its curtains, spotlight and wooden floor
 */
function drawStage() {
    background("#2a1420");
    push();
    noStroke();

    // Spotlight
    fill(255, 240, 200, 25);
    ellipse(width / 2, 300, 700, 300);

    // Curtains on each side, swaying a little
    fill("#8b1e2d");
    const sway = sin(frameCount * 0.02) * 4;
    for (let i = 0; i < 4; i++) {
        rect(i * 18 + sway, 0, 14, height);
        rect(width - 14 - i * 18 - sway, 0, 14, height);
    }
    rect(0, 0, width, 40);
    fill("#a5283a");
    for (let x = 0; x < width; x += 30) {
        arc(x + 15, 40, 30, 24, 0, PI);
    }

    // Wooden floor
    fill("#7a5230");
    rect(0, 340, width, height - 340);
    stroke("#6a4528");
    strokeWeight(2);
    for (let y = 360; y < height; y += 22) {
        line(0, y, width, y);
    }
    pop();
}

/**
 * Draws the bear passed in wearing his choir robe, with his mouth
 * open while he sings and his sound and key underneath
 */
function drawBear(bear) {
    const x = bear.x;
    const size = bear.size;

    // He hops a little when he sings
    let hop = 0;
    if (bear.singing > 0) {
        hop = -sin(map(bear.singing, 20, 0, 0, PI)) * 10;
        bear.singing -= 1;
    }
    const y = bear.y + hop;

    push();
    noStroke();

    // Robe
    fill(bear.robe);
    rect(x - size * 0.45, y + size * 0.3, size * 0.9, size * 0.9, size * 0.2, size * 0.2, 4, 4);
    // White collar
    fill(245);
    arc(x, y + size * 0.32, size * 0.6, size * 0.3, 0, PI);

    // Ears
    fill(92, 58, 33);
    ellipse(x - size * 0.34, y - size * 0.34, size * 0.3);
    ellipse(x + size * 0.34, y - size * 0.34, size * 0.3);

    // Head
    fill(110, 70, 40);
    ellipse(x, y, size, size * 0.92);

    // Muzzle and nose
    fill(196, 156, 116);
    ellipse(x, y + size * 0.17, size * 0.42, size * 0.32);
    fill(35, 22, 15);
    ellipse(x, y + size * 0.08, size * 0.13, size * 0.08);

    // Eyes: closed and happy while singing, open otherwise
    if (bear.singing > 0) {
        noFill();
        stroke(25, 15, 10);
        strokeWeight(size * 0.03);
        arc(x - size * 0.18, y - size * 0.07, size * 0.12, size * 0.08, PI, TWO_PI);
        arc(x + size * 0.18, y - size * 0.07, size * 0.12, size * 0.08, PI, TWO_PI);
        // Big round singing mouth
        noStroke();
        fill(120, 30, 30);
        ellipse(x, y + size * 0.26, size * 0.16, size * 0.18);
    }
    else {
        fill(25, 15, 10);
        ellipse(x - size * 0.18, y - size * 0.07, size * 0.08);
        ellipse(x + size * 0.18, y - size * 0.07, size * 0.08);
        stroke(25, 15, 10);
        strokeWeight(size * 0.025);
        line(x - size * 0.05, y + size * 0.26, x + size * 0.05, y + size * 0.26);
    }
    pop();

    // Sound and key under each bear
    push();
    noStroke();
    textAlign(CENTER, CENTER);
    fill(255, 235, 200);
    textStyle(BOLD);
    textSize(15);
    text(bear.sound, x, 385);
    textStyle(NORMAL);
    textSize(12);
    fill(255, 235, 200, 160);
    text(bear.key.toUpperCase(), x, 405);
    pop();
}

/**
 * Draws the music note passed in, fading out as it floats away
 */
function drawMusicNote(musicNote) {
    const fade = map(musicNote.life, 0, 60, 0, 255);
    const c = color(musicNote.colour);
    c.setAlpha(fade);

    push();
    noStroke();
    fill(c);
    // The note's head and stem
    ellipse(musicNote.x, musicNote.y, 12, 9);
    rect(musicNote.x + 4, musicNote.y - 18, 2.5, 18);
    // The little flag
    triangle(musicNote.x + 6.5, musicNote.y - 18, musicNote.x + 14, musicNote.y - 12, musicNote.x + 6.5, musicNote.y - 10);
    pop();
}

/**
 * Draws the instructions and shows when the choir is recording or playing
 */
function drawMessage() {
    let message = "Click a bear or press A S D F G H J.   R to record, P to play";
    let colour = color(255, 235, 200);

    if (mode === "recording") {
        message = "Recording... " + song.length + " notes.   Press R to stop";
        colour = color(255, 120, 120);
        // A blinking red dot while recording
        if (frameCount % 40 < 20) {
            push();
            noStroke();
            fill(230, 50, 50);
            ellipse(110, 72, 14);
            pop();
        }
    }
    else if (mode === "playing") {
        message = "The Bear Choir presents: your song";
    }
    else if (song.length > 0) {
        message = "Song saved (" + song.length + " notes). Press P to hear the choir sing it";
    }

    push();
    noStroke();
    fill(colour);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(message, width / 2, 72);
    pop();
}