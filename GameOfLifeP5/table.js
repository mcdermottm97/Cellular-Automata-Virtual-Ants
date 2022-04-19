class Table {
  constructor (resolution) {
    this.square = [];
    this.square[0] = [];

    this.changeResolution(resolution);
  }

  fillWith(val) {
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
    if (!this.exist(x, y)) {
      return false;
    } else {
      return (this.square[x][y] == true);
    }
  }

  flipSquareState(x, y) {
    if (this.exist(x, y)) {
      this.square[x][y] = !this.square[x][y];
    }
  }

  exist(x, y) {
    if (this.square[x] == undefined) {
      return false;
    } else if (this.square[x][y] == undefined) {
      return false;
    } else {
      return true;
    }
  }

  changeResolution(resolution) {
    this.columns = floor(width/resolution);
    this.rows = floor(height/resolution);
    this.resolution = resolution;

    let oldSquare = this.square;
    this.square = [];

    for (let i = 0; i < this.columns; i++) {
      this.square[i] = [];
    }

    this.fillWith(false);
    this.addSquares(oldSquare);
  }

  addSquares(oldsquare) {
    let biggerx = getBiggest(this.square.length, oldsquare.length);
    let biggery = getBiggest(this.square[0].length, oldsquare[0].length);

    for (let x = 0; x < biggerx; x++) {
      if (this.square[x] === undefined || oldsquare[x] === undefined) {
        break;
      }
      for (let y = 0; y < biggery; y++) {
        if (this.square[x][y] === undefined || oldsquare[x][y] === undefined) {
          break;
        }
        this.square[x][y] = oldsquare[x][y];
      }
    }
  }
}

function getBiggest(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}