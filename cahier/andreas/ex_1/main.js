/**
 * 	Example P5JS canvas
 */

const NUM_X = 32
const NUM_Y = 32
const CELL  = 16

const data = new Array(NUM_X * NUM_Y)

function setup(){
	createCanvas(windowWidth, windowHeight)
}

function sign(v) {
	if (v < 0) return -1
	else return 1
}

function draw(){

	const x1 = Math.sin(frameCount*0.021)*0.4
	const y1 = Math.cos(frameCount*0.032)*0.4
	const x2 = Math.sin(frameCount*0.043)*0.4
	const y2 = Math.cos(frameCount*0.034)*0.4


	for (let j=0; j<NUM_Y; j++){
		for (let i=0; i<NUM_X; i++){
			const idx = i + j * NUM_X
			const u = (i * 2 - NUM_X) / NUM_X
			const v = (j * 2 - NUM_Y) / NUM_Y
			let d = 1e100
			d = Math.min(dist(0, 0, u+x1, v+y1) - 0.3, d)
			d = Math.min(dist(0, 0, u-x2, v-y2) - 0.3, d)
			// data[idx] = d
			// data[idx] = sign(d)
			data[idx] = 1.0 - Math.exp(-10 * Math.abs(d))
		}
	}

	// rendering
	const ox = (width - NUM_X * CELL) / 2
	const oy = (height - NUM_Y * CELL) / 2

	textSize(9)
	textAlign(CENTER, CENTER)

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X
			const v = data[idx]
			fill(v * 255)
			rect(x, y, CELL, CELL)
			// fill(255,0,0)
			// text(v, x+CELL/2, y+CELL/2)
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}