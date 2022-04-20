let canvasWidth = 1200;
let canvasHeight = 900;

let grid;
let ants;

let speedSlider;
let populationSlider;

let pause = false;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  let pauseButton = createButton('pause / unpause');
  pauseButton.position(30, canvasHeight + 20)
  pauseButton.mousePressed(pauseUnpause);

  let resetButton = createButton('reset grid');
  resetButton.position(185, canvasHeight + 20);
  resetButton.mousePressed(reset);

  speedSlider = createSlider(1, 100, 10);
  speedSlider.position(300, canvasHeight + 20);

  populationSlider = createSlider(1, 10, 1);
  populationSlider.position(475, canvasHeight + 20);

  reset();
}

function draw() {
  background(220)

  if (!pause) {
    for (let s = 0; s < speedSlider.value(); s++) {
      for (let i = 0; i < ants.length; i++) {
        ants[i].update();
      }
    } 
  }

  grid.draw();

  for (let i = 0; i< ants.length; i++) {
    ants[i].draw();
  }
}

function pauseUnpause() {
  pause = !pause;
}

function reset() {
  ants = [];
  grid = new Grid(2);

  let x = floor(grid.cols/2);
  let y = floor(grid.rows/2);
  let ant = new Ant(x,y);
  ants.push(ant);

  for (let i = 1; i < populationSlider.value(); i++) {
    x = floor(random(grid.cols));
    y = floor(random(grid.rows));
    ant = new Ant(x,y);
    ants.push(ant);
  }
}