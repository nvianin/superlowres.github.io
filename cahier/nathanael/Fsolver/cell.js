class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.scaledX = this.x * scalingFactor;
    this.scaledY = this.y * scalingFactor;
    this.density = 0;
    this.prevDensity = 0;
    this.velocity = createVector(0, 0);
    if (this.x == 32) {
      this.velocity.x = 10;
    }
  }

  draw() {
    /* console.log(this.density, this.prevDensity); */
    line(
      this.scaledX,
      this.scaledY,
      this.scaledX + this.velocity.x,
      this.scaledY + this.velocity.y
    );
    fill(this.density * 255);
    rect(this.scaledX, this.scaledY, 10, 10);
    

    /* textSize(10);
    text(this.density, this.scaledX, this.scaledY); */

    this.prevDensity = this.density;
  }

  refreshScaling() {
    this.scaledX = this.x * scalingFactor;
    this.scaledY = this.y * scalingFactor;
  }
}
