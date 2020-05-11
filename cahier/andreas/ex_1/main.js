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

function draw(){

	for (let j=0; j<NUM_Y; j++){
		for (let i=0; i<NUM_X; i++){
			const idx = i + j * NUM_X
			data[idx] = (i + j) % 2
		}
	}

	// rendering

	const ox = (width - NUM_X * CELL) / 2
	const oy = (height - NUM_Y * CELL) / 2

	for(let j=0; j<NUM_Y; j++) {
		for(let i=0; i<NUM_X; i++) {
			const x = i * CELL + ox
			const y = j * CELL + oy
			const idx = i + j * NUM_X
			const v = data[idx]
			fill(v * 255)
			rect(x, y, CELL, CELL)
		}
	}
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}