// Matthew McDermott - 16032635
// based off a CodingTrain challenge on Langtons ants


// instantiate global variables for the grid and the ant
let grid;
let x;
let y;
let dir;

// set global variables for direction
let up = 0;
let right = 1;
let down = 2;
let left = 3;

// create canvas, create grid, and set initial ant position and direction
function setup(){
  createCanvas(600,600);
  grid = make2DArray(width, height);
  x = width/2;
  y = height/2;
  dir = up;
}

// main draw funciton 
function draw() {
  strokeWeight(1);
  // this loop processes multiple steps for each rendered frame.
  // essentially speed-multiplier at the cost of missed frames.
  for (let n = 0; n < 100; n++) {
    let state = grid[x][y];
    if (state == 0) {
      turnRight();
      grid[x][y] = 1;
    } else if (state == 1) {
      turnLeft();
      grid[x][y] = 0;
    }

    stroke(color(255));
    if (grid[x][y] == 1) {
      stroke(color(0));
    }
    point(x, y);
    moveForward();
  }

}

// function that returns a 2D array populated with 0 integers (white cells)
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++){
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

// funciton to rotate ant +90 degrees
function turnRight() {
  dir++;
  // using ascending integers for direction means wrapping back round requires selection
  if (dir > left) {
    dir = up
  }
}

// funciton to rotate ant -90 degrees
function turnLeft() {
  dir --;
  // using ascending integers for direction means wrapping back round requires selection
  if(dir < up) {
    dir = left;
  }
}

// function to move ant forward in its current direction
function moveForward() {
  if (dir == up) {
    y--;
  } else if (dir == right) {
    x++;
  } else if (dir == down) {
    y++;
  } else if (dir == left) {
    x--;
  }

  // controls wraparound on x axis
  if (x > width - 1) {
    x = 0;
  } else if (x < 0) {
    x = width - 1;
  }

  // controls wraparound on y axis
  if (y > height -1) {
    y = 0;
  } else if (y < 0) { 
    y = height - 1;
  }

}