/*
  Author: Matthew McDermott - 16032635
  Last updated: 16/05/2022
*/

class RedAnt {
  constructor(x,y, neighborhood) {
    // take parameters
    this.x = x;
    this.y = y;
    this.neighborhood = neighborhood;

    // set initial direction to down (opposite of normal ant)
    this.dir = 2;
  }

  // draw red to show current poition of alternative agent
  draw() {
    noStroke();
    fill('red');
    rect(this.x * grid.scale, this.y * grid.scale, grid.scale, grid.scale);
  }

  // change direction based on neigbourhood, flip current cell, then move forward.
  update() {
    // opposite directions to normal ant
    if(this.checkNeighborhood()){
      this.turnR();
    } else {
      this.turnL();
    }

    grid.flipCellState(this.x, this.y);
    this.moveForward();
    this.checkEdges();
  }

  // functions for changing direction
  turnR() {
    this.dir++;
    if (this.dir > 3) {
      this.dir = 0;
    }
  }
  turnL() {
    this.dir--;
    if (this.dir < 0) {
      this.dir = 3;
    }
  }

  // function to change position based on direction
  moveForward() {
    if (this.dir == 0) {
      this.y--;
    } else if (this.dir == 1) {
      this.x++;
    } else if (this.dir == 2) {
      this.y++;
    } else if (this.dir == 3) {
      this.x--;
    }
  }

  // implement wrap-around of grid, if exceeds edge move to opposite edge
  checkEdges() {
    if (this.x >= grid.rows) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = round(grid.rows - 1);
    }

    if (this.y >= grid.cols) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = round(grid.cols - 1);
    }
  }

  // returns true if population of neighbourhood exceeds threshold
  checkNeighborhood() {
    let sum = 0;
    let x = this.x;
    let y = this.y;

    
    if (this.neighborhood == 1){    // neighbourhood of 1
      if (grid.cellState(this.x, this.y)) {
        return true;
      } else {
        return false;
      }

      
    } else if (this.neighborhood == 5) {    // neighbourhood of 5
      sum += grid.cellState(x, y);
      sum += grid.cellState(x, y-1);
      sum += grid.cellState(x, y+1);
      console.log(x-1,y);
      sum += grid.cellState(x-1, y);
      sum += grid.cellState(x+1, y);
      if (sum > 1) {
        return true;
      } else {
        return false;
      }

      
    } else {   // neighbourhood of 9
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          sum += grid.cellState(x + i, y + j);
        }
      }
      if (sum < 4) {
        return true;
      } else {
        
        return false;
      }
    }
  }
}