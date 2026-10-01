const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#0000ff"
};

const user = {
  x: 320,
  y: 80,
  size: 120,
  fill: "#ff0000"
};

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#aaaaaa");

  moveUser();
  movePuck();

  drawUser();
  drawPuck();
}

function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

function movePuck() {
  const d = dist(user.x, user.y, puck.x, puck.y);

  if (d < user.size / 2 + puck.size / 2) {
    puck.x += (puck.x - user.x) / 10;
    puck.y += (puck.y - user.y) / 10;
  }
}

function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}
function drawTarget() {
  push();
  noStroke();
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}