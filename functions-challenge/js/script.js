/**
 * Bouncy Ball Ball Bonanza (Habs Edition)
 * Pippin Barr, modified by Tyler Myrans
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions! Now on a hockey rink in Canadiens colours,
 * with pucks instead of balls and a stick instead of a paddle.
 * The pucks bounce off the boards, and if one gets past your
 * stick it's dropped back in from the top.
 */

"use strict";

// Canadiens colours
const habsRed = "#af1e2d";
const habsBlue = "#192168";
const ice = "#f4f8fb";

// Our puck
const ball = {
    x: 300,
    y: 20,
    width: 14,
    height: 14,
    velocity: {
        x: 0,
        y: 10
    }
};

// Our second puck
const ball2 = {
    x: 150,
    y: 60,
    width: 14,
    height: 14,
    velocity: {
        x: 2,
        y: 6
    }
};

// Our stick
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 12
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the pucks and stick on the rink
*/
function draw() {
    drawRink();

    movePaddle(paddle);
    moveBall(ball);
    moveBall(ball2);

    handleBounce(ball, paddle);
    handleBounce(ball2, paddle);

    bounceOffBoards(ball);
    bounceOffBoards(ball2);

    drawPaddle(paddle);
    drawBall(ball);
    drawBall(ball2);
}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
    paddle.x = mouseX;
}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
}

/**
 * Bounces the provided ball off the provided paddle
 */
function handleBounce(ball, paddle) {
    if (checkOverlap(ball, paddle)) {
        ball.velocity.y *= -1;
    }
}

/**
 * Bounces the puck passed in off the boards on the sides and top.
 * If it gets past the stick at the bottom, it's dropped back in at the top.
 */
function bounceOffBoards(ball) {
    // Left and right boards
    if (ball.x < ball.width / 2 || ball.x > width - ball.width / 2) {
        ball.velocity.x *= -1;
        ball.x = constrain(ball.x, ball.width / 2, width - ball.width / 2);
    }
    // Top boards
    if (ball.y < ball.height / 2) {
        ball.velocity.y = abs(ball.velocity.y);
    }
    // Missed it! Drop the puck back in from the top
    if (ball.y > height + ball.height) {
        ball.x = random(100, width - 100);
        ball.y = 0;
    }
}

/**
 * Draws the ice with its red centre line, blue lines,
 * faceoff circle and the boards around the edge
 */
function drawRink() {
    background(ice);

    push();
    // Blue lines
    noStroke();
    fill(habsBlue);
    rect(170, 0, 10, height);
    rect(420, 0, 10, height);

    // Red centre line
    fill(habsRed);
    rect(297, 0, 6, height);

    // Centre faceoff circle and dot
    noFill();
    stroke(habsBlue);
    strokeWeight(3);
    ellipse(width / 2, height / 2, 110);
    noStroke();
    fill(habsBlue);
    ellipse(width / 2, height / 2, 12);

    // Red faceoff dots in each zone
    fill(habsRed);
    ellipse(90, height / 2, 12);
    ellipse(510, height / 2, 12);

    // The boards around the rink
    noFill();
    stroke(habsRed);
    strokeWeight(8);
    rect(4, 4, width - 8, height - 8, 40);
    pop();
}

/**
 * Draws the specified paddle on the canvas as a hockey stick blade,
 * blue with a red and white stripe like a Habs jersey
 */
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(habsBlue);
    rect(paddle.x, paddle.y, paddle.width, paddle.height, 4);
    fill(habsRed);
    rect(paddle.x, paddle.y, paddle.width, paddle.height * 0.5);
    fill(255);
    rect(paddle.x, paddle.y, paddle.width, paddle.height * 0.15);
    pop();
}

/**
 * Draws the specified ball on the canvas as a black hockey puck
 */
function drawBall(ball) {
    push();
    noStroke();
    // A little shadow on the ice
    fill(0, 0, 0, 40);
    ellipse(ball.x + 2, ball.y + 3, ball.width, ball.height * 0.8);
    // The puck
    fill(20);
    ellipse(ball.x, ball.y, ball.width, ball.height);
    fill(60);
    ellipse(ball.x - 2, ball.y - 2, ball.width * 0.4);
    pop();
}

/**
 * Returns true if rectA and rectB overlap, and false otherwise
 * Assumes rectA and rectB have properties x, y, width and height to describe
 * their rectangles, and that rectA and rectB are displayed CENTERED on their
 * x,y coordinates.
 */
function checkOverlap(rectA, rectB) {
  return (rectA.x + rectA.width/2 > rectB.x - rectB.width/2 &&
          rectA.x - rectA.width/2 < rectB.x + rectB.width/2 &&
          rectA.y + rectA.height/2 > rectB.y - rectB.height/2 &&
          rectA.y - rectA.height/2 < rectB.y + rectB.height/2);
}