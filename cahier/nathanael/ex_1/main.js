/**
 * 	Example P5JS canvas
 */

const NUM_X = 32;
const NUM_Y = 32;
const CELL = 16;
var xMargin = (innerWidth - NUM_X * CELL) / 2;
var yMargin = (innerHeight - NUM_Y * CELL) / 2;

const data = new Array(NUM_X * NUM_Y).fill(0);

let offscreen;

function preload() {}

function setup() {
  createCanvas(windowWidth, windowHeight);
  offscreen = createGraphics(NUM_X, NUM_Y);
}

function draw() {
  background(255);
  var tX = frameCount * 0.1;
  var tY = frameCount * 0.05;
  offscreen.background(255);
  offscreen.fill(0);
  offscreen.push();
  offscreen.translate(offscreen.width / 2 + tX, offscreen.height / 2 + tY);
  offscreen.textSize(10);
  offscreen.text("BONSOIR", 0, 0);
  offscreen.textAlign(CENTER, CENTER);
  /* offscreen.filter(blur, 1); */
  /* offscreen.ellipse(0,0,10); */
  offscreen.pop();
  image(offscreen, 0, 0);

  const x1 = Math.sin(frameCount * 0.01) * 0.5;
  const y1 = Math.sin(frameCount * 0.04) * 0.2;
  const x2 = Math.sin(frameCount * 0.02) * 0.235;
  const y2 = Math.sin(frameCount * 0.03) * 0.5;


//---------------------------------------  calculate


  for (var y = 0; y < NUM_Y; y++) {
    for (var x = 0; x < NUM_X; x++) {
      var i = x * NUM_Y + y;
      const u = (x * 2 - NUM_X) / NUM_X;
      /* const v = (y * 2 - NUM_Y) / NUM_Y; */
      const v = brightness(offscreen.get(x, y));
      let d = 1e10;
      d = Math.min(dist(0 + x1, 0 + y1, u, v) - 0.2, d);
      d = Math.min(dist(0.5 + x2, 0 + y2, u, v) - 0.3, d);
      var margin = 0.8;

      /* if (d < margin + 0.07 && d > margin) {
        data[i] = 1;
      } */
      data[i] = v;
      /* data[i] = 1 - Math.exp(-5 * Math.abs(d)); */
      /* data[i] = d; */
    }
  }
  /*   const radius = 16;
  for (var t = 0; t < 360; t++) {
    var x = Math.sin(t) * radius;
    var y = Math.cos(t) * radius;
    x += NUM_X / 2;
    y += NUM_Y / 2;
    x = Math.floor(x);
    y = Math.floor(y);
    var i = x * NUM_Y + y;
    data[i] = 1;
  } */
  textSize(8);
  textAlign(CENTER, CENTER);


  //---------------------------------------  render
  
  for (var y = 0; y < NUM_Y; y++) {
    for (var x = 0; x < NUM_X; x++) {
      var posX = x * CELL + xMargin;
      var posY = y * CELL + yMargin;
      var i = x * NUM_Y + y;
      const v = data[i];
      fill(v * 255);
      /* rect(posX, posY, CELL, CELL); */
      /* ellipse(posX, posY, (CELL / 100) * v, (CELL / 100) * v); */
      const num = map(v, 0, 1, 3, 9);
      aster(x, y, CELL / 2, num);

      /* fill(255, 125, 0);
      text(v, x * CELL + xMargin, y * CELL + yMargin); */
    }
  }
}

function aster(x, y, r, n) {
  for (var i = 0; i < n; i++) {
    const x1 = x + Math.cos(TAU / n) * r;
    const y1 = y + Math.sin(TAU / n) * r;
    line(x, y, x1, y1);
  }
}

function mousePressed() {}

function keyPressed() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  xMargin = (innerWidth - NUM_X * CELL) / 2;
  yMargin = (innerHeight - NUM_Y * CELL) / 2;
}
