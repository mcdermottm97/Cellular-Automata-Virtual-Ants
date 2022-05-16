/*
  Author: Matthew McDermott - 16032635
  Last updated: 16/05/2022
*/

class Grid {
  constructor(scale){
    // prep for 2d array
    this.cell = [];
    this.cell[0] = [];

    // define dimensions based on scale slider, set portion of canvas for grid.
    this.scale = scale;
    this.cols = (width-260)/scale;
    this.rows = (height-160)/scale;

    // create populate 2d array
    this.fillCells(false);
  }

  fillCells(state) {
    // create columns
    for (let i = 0; i < this.cols; i++) {
      this.cell[i] = [];
    }

    // create and populate rows
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.cell[x][y] = state;
      }
    }
  }

  // loop through cells and draw them if their state is true
  draw() {
    noStroke();
    fill(1);
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.cell[x][y]) {
          rect(x * this.scale, y * this.scale, this.scale, this.scale);
        }
      }
    }
  }

  // returns current state of a cell
  cellState(x,y) {

    // larger neighbourhoods required edge checking for adjacent cells
    if (x >= this.cols) {
      x = 0
    } else if (x < 0) {
      x = this.cols - 1;
    }
    if (y >= this.rows) {
      y = 0
    } else if (y < 0) {
      y = this.rows - 1;
    }

    return this.cell[x][y];    
  }

  // flips current state of a cell
  flipCellState(x,y) {
    this.cell[x][y] = !this.cell[x][y];
  }
}