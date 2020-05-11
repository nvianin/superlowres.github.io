/**
 * 	Example P5JS canvas
 */

function preload(){

}

function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){
	//background(255)
	fill(255)
	stroke(0)
	rect(20, 20, 100, 100)
	ellipse(180, 70, 100, 100)

	if (mouseIsPressed){
		line(mouseX, mouseY, pmouseX, pmouseY)
	}
}

function mousePressed(){

}

function keyPressed(){

}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}