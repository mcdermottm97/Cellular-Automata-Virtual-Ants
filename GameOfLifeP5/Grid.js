class Grid {
  constructor(res){
    this.cell = [];
    this.cell[0] = [];
    this.res = res;
    this.cols = width/res;
    this.rows = (height-160)/res;
    this.fillCells(false);
  }

  fillCells(state) {
    for (let i = 0; i < this.cols; i++) {
      this.cell[i] = [];
    }

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.cell[x][y] = state;
      }
    }
  }

  draw() {
    noStroke();
    fill(25);
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.cell[x][y]) {
          rect(x * this.res, y * this.res, this.res, this.res);
        }
      }
    }
  }

  cellState(x,y) {
    if (typeof(this.cell[x][y]) == 'undefined'){
      return false;
    } 
    return this.cell[x][y];    
  }

  flipCellState(x,y) {
    this.cell[x][y] = !this.cell[x][y];
  }
}