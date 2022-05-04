let canvasWidth = 750;
let canvasHeight = 910;

let grid;
let ants;
let redAnts;

let pause = false;

let pauseButton;
let resetButton;
let speedSlider;
let resSlider;
let populationSlider;
let redAntCheck;
let redAntPopSlider;
let xdistanceSlider;
let ydistanceSlider;

let stepCount = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  pauseButton = createButton('Pause / Play');
  pauseButton.position(10, canvasHeight - 120)
  pauseButton.mousePressed(pauseUnpause);

  resetButton = createButton('Reset Grid');
  resetButton.position(110, canvasHeight - 120);
  resetButton.mousePressed(reset);

  speedSlider = createSlider(1, 200, 10);
  speedSlider.position(210, canvasHeight - 110);
  
  resSlider = createSlider(1, 10, 2);
  resSlider.position(350, canvasHeight - 110);

  redAntCheck = createCheckbox('Red Ants', false);
  redAntCheck.position(490, canvasHeight - 120);  

  xdistanceSlider = createSlider(0, 50, 1);
  xdistanceSlider.position(595, canvasHeight -110);
  ydistanceSlider = createSlider(0, 50, 1);
  ydistanceSlider.position(595, canvasHeight - 90);

  populationSlider = createSlider(1, 10, 1);
  populationSlider.position(900, canvasHeight - 30);

  redAntPopSlider = createSlider(1, 10, 1);
  redAntPopSlider.position(1050, canvasHeight - 30);

  

  reset();
}

function draw() {
  background(220)
  noFill();
  stroke(100);
  rect(0, 0, canvasWidth-1, canvasHeight-1)
  rect(0, canvasHeight - 160, canvasWidth, 0);
  

  fill('black');
  textSize(15);
  text('Steps: ' + stepCount, 20, canvasHeight - 135);
  text('Simulation Speed', 215, canvasHeight -115);
  text('Canvas Scale', 370, canvasHeight - 115);
  text('Red Ant Position', 600, canvasHeight - 115)
  text('Extra Ants', 200, canvasHeight - 45)
  text('Extra Red Ants', 1050, canvasHeight - 45)
  

  if (!pause) {
    

    for (let s = 0; s < speedSlider.value(); s++) {
      stepCount++;
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
  stepCount = 0;
  ants = [];
  redAnts = [];
  grid = new Grid(resSlider.value());

  let x = floor(grid.cols/2);
  let y = floor(grid.rows/3);
  let ant = new Ant(x,y);
  ants.push(ant);

  for (let i = 1; i < populationSlider.value(); i++) {
    x = floor(random(grid.cols));
    y = floor(random(grid.rows));
    ant = new Ant(x,y);
    ants.push(ant);
  }
  
  if (redAntCheck.checked()) {
    x = floor(grid.cols/2 + xdistanceSlider.value());
    y = floor(grid.rows/3 + ydistanceSlider.value());
    ant = new RedAnt(x,y);
    redAnts.push(ant); 

    for (let i = 1; i < redAntPopSlider.value(); i++) {
      x = floor(random(grid.cols));
      y = floor(random(grid.rows));
      ant = new RedAnt(x,y);
      redAnts.push(ant);
    }
  }
  
}