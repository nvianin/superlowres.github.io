/**
 * 	Example P5JS canvas
 */
const Cells = new Array();
const x_size = 64;
const y_size = 64;

var scalingFactor;

function findScale() {
  let lowerSide = window.innerWidth;
  if (window.innerHeight < lowerSide) {
    lowerSide = window.innerHeight;
  }
  scalingFactor = lowerSide / x_size;
  return scalingFactor;
}

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);

  findScale();

  for (var x = 0; x < x_size; x++) {
    for (var y = 0; y < y_size; y++) {
      var cell = new Cell(x, y);
      Cells.push(cell);
    }
  }
}

function draw() {
  /* console.log(frameRate()); */
  background(255);

  for (var i = 0; i < Cells.length; i++) {
    Cells[i].draw();
  }

  diffuse(x_size, 0.001, 0.1);

  if (mouseIsPressed) {
    try {
      addDensity(mouseX, mouseY, 5);
    } catch (e) {}
  }

  stroke(255);
  textSize(30);
  text(Math.round(frameRate()), 20, 40);
}

function diffuse(N, diff, dt) {
  var a = dt * diff * N * N;
  /* console.log("diffusing"); */
  for (var k = 0; k < 20; k++) {
    for (var i = 0; i < Cells.length; i++) {
      var cell = Cells[i];
      cell.density =
        (cell.prevDensity +
          a *
            (getDensity(cell.x - 1, cell.y) +
              getDensity(cell.x + 1, cell.y) +
              getDensity(cell.x, cell.y - 1) +
              getDensity(cell.x, cell.y + 1))) /
        (1 + 4 * a);
    }
  }
}

function advect(N, dt) {
  var dt0 = dt * N;
  var x0, y0, x1, y1;
  var s0, s1, t0, t1;
  for (var i = 0; i < Cells.length; i++) {
    cell = Cells[i];
    thisVel = getVelocity(cell.x, cell.y);
    var x = cell.x - dt0 * thisVel.x;
    var y = cell.y - dt0 * thisVel.y;

    if (x < 0.5) x = 0.5;
    if (x > N + 0.5) x = N + 0.5;
    x0 = x;
    x1 = x0 + 1;

    if (y < 0.5) y = 0.5;
    if (y > N + 0.5) y = N + 0.5;
    y0 = y;
    y1 = y0 + 1;

    s1 = x - x0;
    s0 = 1 - s1;
    t1 = y - y0;
    t0 = 1 - t1;

    cell.density = s0 * (t0 * Cells[toIndex(cell.x, cell.y)].prevDensity);
  }
}

function addDensity(x, y, n) {
  x /= scalingFactor;
  y /= scalingFactor;
  x = Math.floor(x);
  y = Math.floor(y);
  /* console.log(x, y); */

  var i = x * y_size + y;
  i = toIndex(x, y);
  /* console.log(i); */
  Cells[i].density += n;
}

function mousePressed() {}

function keyPressed() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let lowerSide = window.innerWidth;
  if (window.innerHeight < lowerSide) {
    lowerSide = window.innerHeight;
  }

  scalingFactor = lowerSide / x_size;

  for (var i = 0; i < Cells.length; i++) {
    Cells[i].refreshScaling();
  }
}

function toIndex(x, y) {
  return x * x_size + y;
}

function getDensity(x, y) {
  if (Cells[toIndex(x, y)] != null) {
    return Cells[toIndex(x, y)].density;
  } else {
    return 0;
  }
}

function getVelocity(x, y) {
  if (Cells[toIndex(x, y)] != null) {
    return Cells[toIndex(x, y).velocity];
  } else {
    return createVector(0, 0);
  }
}
