class Ant {
  constructor(x,y, neighborhood) {
    this.x = x;
    this.y = y;
    this.neighborhood = neighborhood;
    this.dir = 0;
  }

  draw() {
    noStroke();
    fill('blue');
    rect(this.x * grid.res, this.y * grid.res, grid.res, grid.res);
  }

  update() {
    
    this.checkNeighborhood();
    grid.flipCellState(this.x, this.y);
  }

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

  moveBackward() {
    if (this.dir == 0) {
      this.y++;
    } else if (this.dir == 1) {
      this.x--;
    } else if (this.dir == 2) {
      this.y--;
    } else if (this.dir == 3) {
      this.x++;
    }
  }

  checkEdges() {
    if (this.x >= grid.cols) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = grid.cols - 1;
    }

    if (this.y >= grid.rows) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = grid.rows - 1;
    }
  }

  checkNeighborhood() {
    let sum = 0;
    let x = this.x;
    let y = this.y;

    if (this.neighborhood == 1){
      if (grid.cellState(this.x, this.y)) {
        this.turnL();
        this.checkEdges();
        this.moveForward();
        return;
      } else {
        this.turnR();
        this.checkEdges();
        this.moveForward();
        return;
      }

    } else if (this.neighborhood == 5) {
      sum += grid.cellState(x, y);
      sum += grid.cellState(x, y-1);
      sum += grid.cellState(x, y+1);
      sum += grid.cellState(x-1, y);
      sum += grid.cellState(x+1, y);
      if (sum > 1) {
        this.turnL();
        this.moveForward();
      } else {
        this.turnR();
        this.moveForward();
      }
      return;

    } else {
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          sum += grid.cellState(x + i, y + j);
        }
      }
      if (sum < 3) {
        this.turnL();
        this.moveForward();
      } else {
        this.turnR();
        this.moveForward();
      }
      return;
    }

    
  }
}