let cnv;
let canvasWidth = 750;
let canvasHeight = 910;
let canvasX;
let canvasY;

let grid;
let ants;
let redAnts;

let pause = false;

let pauseButton;
let resetButton;
let speedSlider;
let scaleSlider;
let populationSlider;
let redAntCheck;
let redAntPopSlider;
let xdistanceSlider;
let ydistanceSlider;

let stepCount = 0;



function setup() {
  cnv = createCanvas(canvasWidth, canvasHeight);
  canvasX = (windowWidth - width) / 2;
  canvasY = (windowHeight - height) /2;
  cnv.position(canvasX, canvasY);

  pauseButton = createButton('Pause / Play');
  pauseButton.position(canvasX + 10, canvasY + 790)
  pauseButton.mousePressed(pauseUnpause);

  resetButton = createButton('Reset Grid');
  resetButton.position(canvasX + 110, canvasY + 790)
  resetButton.mousePressed(reset);

  speedSlider = createSlider(1, 200, 10);
  speedSlider.position(canvasX + 10, canvasY + 840);
  
  scaleSlider = createSlider(1, 10, 2);
  scaleSlider.position(canvasX + 10, canvasY + 880);

  redAntCheck = createCheckbox('Red Ants', false);
  redAntCheck.position(canvasX + 215, canvasY + 790);  

  xdistanceSlider = createSlider(0, 50, 1);
  xdistanceSlider.position(canvasX + 235, canvasY + 845);
  ydistanceSlider = createSlider(0, 50, 1);
  ydistanceSlider.position(canvasX + 235, canvasY + 870);

  populationSlider = createSlider(1, 10, 1);
  populationSlider.position(canvasX + 440, canvasY + 840);

  redAntPopSlider = createSlider(1, 10, 1);
  redAntPopSlider.position(canvasX + 440, canvasY + 880);

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
  text('Steps: ' + stepCount, 10, canvasHeight - 135);
  text('Simulation Speed', 10, canvasHeight -75);
  text('Canvas Scale', 10, canvasHeight - 35);

  text('Red Ant Position', 220, canvasHeight - 75)
  text('X: ', 220, canvasHeight - 50)
  text('Y: ', 220, canvasHeight - 25)

  text('Extra Ants', 440, canvasHeight - 75)
  text('Extra Red Ants', 440, canvasHeight - 35)
  

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
  grid = new Grid(scaleSlider.value());

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