class Table {
  constructor (resolution) {
    this.square = [];
    this.square[0] = [];
    this.columns = width/resolution;
    this.rows = height/resolution;
    this.resolution = resolution;
    this.fillWith(false);
  }

  fillWith(val) {
    for (let i = 0; i < this.columns; i++) {
      this.square[i] = [];
    }
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.square[x][y] = val;
      }
    }
  }

  draw() {
    noStroke(); 
    fill(30);

    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.square[x][y]) {
          rect(
            x * this.resolution,
            y * this.resolution,
            this.resolution,
            this.resolution
          );
        }
      }
    }
  }

  squareState(x, y) {
    return (this.square[x][y]);
  }

  flipSquareState(x, y) {
    this.square[x][y] = !this.square[x][y];
  }
}