let canvasWidth = 1200;
let canvasHeight = 900;

let grid;
let ants;
let redAnts;

let pause = false;

let pauseButton;
let resetButton;
let speedSlider;
let populationSlider;
let redAntCheck;
let redAntPopSlider;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  pauseButton = createButton('pause / unpause');
  pauseButton.position(30, canvasHeight + 20)
  pauseButton.mousePressed(pauseUnpause);

  resetButton = createButton('reset grid');
  resetButton.position(185, canvasHeight + 20);
  resetButton.mousePressed(reset);

  speedSlider = createSlider(1, 100, 10);
  speedSlider.position(300, canvasHeight + 20);
  

  populationSlider = createSlider(1, 10, 1);
  populationSlider.position(475, canvasHeight + 20);

  redAntCheck = createCheckbox('opposite ants', false);
  redAntCheck.position(650, canvasHeight + 20);

  redAntPopSlider = createSlider(1, 10, 1)
  redAntPopSlider.position(800, canvasHeight + 20);

  reset();
}

function draw() {
  background(220)
  if (!pause) {
    for (let s = 0; s < speedSlider.value(); s++) {
      for (let i = 0; i < ants.length; i++) {
        ants[i].update();
      }
      for (let i = 0; i < redAnts.length; i++) {
        redAnts[i].update();
      }
    } 
  }

  grid.draw();

  for (let i = 0; i< ants.length; i++) {
    ants[i].draw();
  }
  for (let i = 0; i < redAnts.length; i++) {
    redAnts[i].draw();
  }
}

function pauseUnpause() {
  pause = !pause;
}

function reset() {
  ants = [];
  redAnts = [];
  grid = new Grid(2);

  let x = floor(grid.cols/2);
  let y = floor(grid.rows/3*2);
  let ant = new Ant(x,y);
  ants.push(ant);

  for (let i = 1; i < populationSlider.value(); i++) {
    x = floor(random(grid.cols));
    y = floor(random(grid.rows));
    ant = new Ant(x,y);
    ants.push(ant);
  }
  
  if (redAntCheck.checked()) {
    x = floor(grid.cols/2);
    y = floor(grid.rows/3);
    ant = new WhiteAnt(x,y);
    redAnts.push(ant); 

    for (let i = 1; i < redAntPopSlider.value(); i++) {
      x = floor(random(grid.cols));
      y = floor(random(grid.rows));
      ant = new WhiteAnt(x,y);
      redAnts.push(ant);
    }
  }
  
}