class Ant {
  constructor(initx, inity) {
    this.x = initx;
    this.y = inity;
    this.dir = floor(random(4));
  }

  draw() {
    noStroke();
    fill('red');
    rect(
      this.x * table.resolution,
      this.y * table.resolution,
      table.resolution,
      table.resolution
      );
  }

  update() {
    // rules
    if (table.squareState(this.x, this.y)) {
      this.turnLeft();
    } else {
      this.turnRight();
    }

    table.flipSquareState(this.x, this.y);
    this.forward();
    this.checkBoundaries();
  }

  turnRight() {
    this.dir++;
    if(this.dir > 3) {
      this.dir = 0;
    }
  }

  turnLeft() {
    this.dir--;
    if(this.dir < 0) {
      this.dir = 3;
    }
  }
  
  forward() {
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

  checkBoundaries() {
    if (this.x >= table.columns){
      this.x = 0;
    } else if (this.x < 0) {
      this.x = table.columns -1;
    }

    if (this.y >= table.rows){
      this.y = 0;
    } else if (this.y < 0) {
      this.y = table.rows -1;
    }
  }
}