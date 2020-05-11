/**
 * 	Example P5JS canvas
 */

const NUM_X = 32;
const NUM_Y = 32;
const CELL = 16;

const data = new Array(NUM_X * NUM_Y).fill(0);
function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  for (var y = 0; y < NUM_Y; y++) {
    for (var x = 0; x < NUM_X; x++) {
      var i = x * NUM_Y + y;
      data[i] = (x + y) % 2;
    }
  }

  for (var y = 0; y < NUM_Y; y++) {
    for (var x = 0; x < NUM_X; x++) {
      var posX = x * CELL + width / 4;
      var posY = y * CELL + height / 4;
      var i = x * NUM_Y + y;
      const v = data[i];
      fill(v * 255);
      rect(posX, posY, CELL, CELL);
    }
  }
}

function mousePressed() {}

function keyPressed() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
