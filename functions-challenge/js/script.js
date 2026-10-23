/**
 * Bouncy Ball Ball Bonanza (Habs Edition)
 * Pippin Barr, modified by Tyler Myrans
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions! Now a two-player hockey game on a rink in
 * Canadiens colours. The left player's stick follows the mouse,
 * the right player uses the UP and DOWN arrow keys. Hit the pucks
 * back and forth, and get one past the other player's stick to score.
 */

"use strict";

// Canadiens colours
const habsRed = "#af1e2d";
const habsBlue = "#192168";
const ice = "#f4f8fb";

// Our puck
const ball = {
    x: 300,
    y: 150,
    width: 14,
    height: 14,
    velocity: {
        x: 5,
        y: 2
    }
};

// Our second puck
const ball2 = {
    x: 300,
    y: 100,
    width: 14,
    height: 14,
    velocity: {
        x: -4,
        y: -3
    }
};

// The left player's stick (follows the mouse)
const paddle = {
    x: 30,
    y: 150,
    width: 12,
    height: 80
};

// The right player's stick (UP and DOWN arrow keys)
const paddle2 = {
    x: 570,
    y: 150,
    width: 12,
    height: 80,
    speed: 7
};

// Goals scored by each player
let leftScore = 0;
let rightScore = 0;

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the pucks and sticks on the rink
*/
function draw() {
    drawRink();

    movePaddle(paddle);
    movePaddleWithKeys(paddle2);
    moveBall(ball);
    moveBall(ball2);

    handleBounce(ball, paddle);
    handleBounce(ball2, paddle);
    handleBounce(ball, paddle2);
    handleBounce(ball2, paddle2);

    bounceOffBoards(ball);
    bounceOffBoards(ball2);

    checkGoal(ball);
    checkGoal(ball2);

    drawPaddle(paddle);
    drawPaddle(paddle2);
    drawBall(ball);
    drawBall(ball2);
    drawScore();
}

/**
 * Moves the paddle up and down with the mouse
 */
function movePaddle(paddle) {
    paddle.y = constrain(mouseY, paddle.height / 2, height - paddle.height / 2);
}

/**
 * Moves the paddle passed in up and down with the arrow keys,
 * keeping it on the rink
 */
function movePaddleWithKeys(paddle) {
    if (keyIsDown(UP_ARROW)) {
        paddle.y -= paddle.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        paddle.y += paddle.speed;
    }
    paddle.y = constrain(paddle.y, paddle.height / 2, height - paddle.height / 2);
}

/**
 * Moves the ball passed in as a parameter
 */
function moveBall(ball) {
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
}

/**
 * Bounces the provided ball off the provided paddle,
 * sending it back the way it came
 */
function handleBounce(ball, paddle) {
    if (checkOverlap(ball, paddle)) {
        if (ball.x < paddle.x) {
            // Hit the left side of the stick, so go left
            ball.velocity.x = -abs(ball.velocity.x);
        }
        else {
            // Hit the right side of the stick, so go right
            ball.velocity.x = abs(ball.velocity.x);
        }
    }
}

/**
 * Bounces the puck passed in off the top and bottom boards
 */
function bounceOffBoards(ball) {
    if (ball.y < ball.height / 2) {
        ball.velocity.y = abs(ball.velocity.y);
    }
    else if (ball.y > height - ball.height / 2) {
        ball.velocity.y = -abs(ball.velocity.y);
    }
}

/**
 * Checks if the puck passed in went past a stick into a goal.
 * The other player scores and the puck is dropped back at centre ice.
 */
function checkGoal(ball) {
    if (ball.x < 0) {
        rightScore += 1;
        faceoff(ball, 1);
    }
    else if (ball.x > width) {
        leftScore += 1;
        faceoff(ball, -1);
    }
}

/**
 * Drops the puck passed in at centre ice, heading towards
 * the side passed in (1 for right, -1 for left)
 */
function faceoff(ball, direction) {
    ball.x = width / 2;
    ball.y = random(80, height - 80);
    ball.velocity.x = random(4, 6) * direction;
    ball.velocity.y = random(-3, 3);
}

/**
 * Draws the ice with its red centre line, blue lines,
 * faceoff circle, goal creases and the boards around the edge
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
    ellipse(110, 80, 10);
    ellipse(110, 220, 10);
    ellipse(490, 80, 10);
    ellipse(490, 220, 10);

    // Blue goal creases at each end
    fill(120, 160, 230, 120);
    stroke(habsRed);
    strokeWeight(2);
    arc(0, height / 2, 90, 90, -HALF_PI, HALF_PI);
    arc(width, height / 2, 90, 90, HALF_PI, PI + HALF_PI);

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
    rect(paddle.x, paddle.y, paddle.width * 0.5, paddle.height);
    fill(255);
    rect(paddle.x, paddle.y, paddle.width * 0.15, paddle.height);
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
 * Draws each player's score at the top of their half of the rink
 */
function drawScore() {
    push();
    noStroke();
    fill(habsBlue);
    textAlign(CENTER, CENTER);
    textSize(28);
    textStyle(BOLD);
    text(leftScore, width / 2 - 50, 30);
    text(rightScore, width / 2 + 50, 30);
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