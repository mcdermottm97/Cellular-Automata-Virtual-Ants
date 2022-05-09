class Ant {
  constructor(x,y, red) {
    this.x = x;
    this.y = y;
    this.dir = 0;
    this.red = red;
  }

  draw() {
    noStroke();
    if (this.red == true) {
      fill('red');
    } else {
      fill('blue');
    }
    rect(this.x * grid.res, this.y * grid.res, grid.res, grid.res);
  }

  update() {
    if (grid.cellState(this.x, this.y)) {
      this.turnL();
    } else {
      this.turnR();
    }

    grid.flipCellState(this.x, this.y);
    this.moveForward();
    this.checkEdges();
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
}