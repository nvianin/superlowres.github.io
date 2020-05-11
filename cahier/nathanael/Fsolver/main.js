/**
 * 	Example P5JS canvas
 */
const Cells = new Array();
const x_size = 64;
const y_size = 64;

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var x = 0; x < x_size; x++) {
    for (var y = 0; y < y_size; y++) {
      var cell = new Cell(x, y);
      Cells.push(cell);
    }
  }
}

function draw() {}

function mousePressed() {}

function keyPressed() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
