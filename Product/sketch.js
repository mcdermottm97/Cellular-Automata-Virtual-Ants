/*
  Author: Matthew McDermott - 16032635
  Last updated: 16/05/2022
*/

// Global access to canvas variables
let cnv;
let canvasWidth = 1010;
let canvasHeight = 910;
let canvasX;
let canvasY;

// Global access to class variables
let grid;
let ants;
let redAnts;

// Global access to UI elements
let pauseButton;
let pause = true;
let resetButton;
let speedSlider;
let scaleSlider;
let populationSlider;
let redAntCheck;
let redAntPopSlider;
let xdistanceSlider;
let ydistanceSlider;
let ydistanceVal;
let neighborSlider;
let stepCount = 0;
let descr = 'This product was produced to answer the question "To what extent does interaction between virtual agents affect their ability to perform complex tasks?" in the context of self-organization. This open-source web application allows easy experimentation with a variety of adjustable variables.';
let instr1 = 'The first Ant will be placed in the centre and will follow the original Langton\'s ant ruleset. A Red Ant follows the same rules but in reverse, moving backwards and turning the opposite direction. If Red Ants are enabled then the initial position, relative to the centre, is controlled by the X and Y sliders (this range is limited to allow precise control). Additional ants of both types can be added using the Extra sliders, this function is experimental and Ants are currently placed randomly.';
let instr2 = 'The Neighbourhood Size slider adjusts how many surrounding cells an agent uses to determine its behaviour. Observe how increasing the neighbourhood affects the resulatant pattern. Neighbourhood size is this product\'s primary method of adjusting the level of interaction between Virtual Agents. All changes to settings require the grid to be reset.';


function setup() {
  // create canvas all interactive UI elements
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
  
  scaleSlider = createSlider(1, 3, 1);
  scaleSlider.position(canvasX + 10, canvasY + 880);

  redAntCheck = createCheckbox('Red Ants', false);
  redAntCheck.position(canvasX + 215, canvasY + 790);  

  xdistanceSlider = createSlider(0, 50, 1);
  xdistanceSlider.position(canvasX + 235, canvasY + 845);
  ydistanceSlider = createSlider(0, 50, 0);
  ydistanceSlider.position(canvasX + 235, canvasY + 870);

  populationSlider = createSlider(1, 10, 1);
  populationSlider.position(canvasX + 410, canvasY + 840);

  redAntPopSlider = createSlider(1, 10, 1);
  redAntPopSlider.position(canvasX + 410, canvasY + 880);

  neighborSlider = createSlider(1, 9, 1, 4);
  neighborSlider.position(canvasX + 570, canvasY + 860);

  // some setup in the reset funciton to avoid duplication
  reset();
}

function draw() {
  let xdistanceVal = xdistanceSlider.value()
  let ydistanceVal = ydistanceSlider.value()

  // draw non-interactive UI elements and UI labels
  background(220)
  noFill();
  stroke(100);
  rect(0, 0, canvasWidth-1, canvasHeight-1)
  rect(0, canvasHeight - 160, canvasWidth - 260, 0);
  rect(canvasWidth - 260, 0, 0, canvasHeight);
  fill('black');
  textSize(15);
  text('Steps: ' + stepCount, 10, canvasHeight - 135);
  text('Simulation Speed', 10, canvasHeight -75);
  text('Scale: ' + grid.rows + 'x' + grid.cols, 10, canvasHeight - 35);
  text('Red Ant Position', 220, canvasHeight - 75)
  text('X: ' + xdistanceVal, 200, canvasHeight - 50);
  text('Y: ' + ydistanceVal, 200, canvasHeight - 25);
  text('Extra Ants', 410, canvasHeight - 75);
  text('Extra Red Ants', 410, canvasHeight - 35);
  text('1           5            9', 575, canvasHeight - 15);
  text('Neighborhood Size', 570, canvasHeight - 55)

  // draw description and user instructions
  text('Description: ', 770, 80);
  text(descr, 770, 90, 220, 500);
  text('Instructions: ', 770, 315)
  text(instr1, 770, 325, 220, 500);
  text(instr2, 770, 650, 220, 500);
  fill('blue');
  textSize(25);
  text('Virtual Ants', 770, 40);

  // loop through ants and call their update functions
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

  // call draw function for grid and ants
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
  // set/reset the grid, the ant arrays, and some UI elements
  pause = true;
  stepCount = 0;
  ants = [];
  redAnts = [];
  grid = new Grid(scaleSlider.value());

  // create and place initial ant in centre, add ant to array
  let x = floor(grid.cols/2);
  let y = floor(grid.rows/2);
  let ant = new Ant(x,y,neighborSlider.value());
  ants.push(ant);

  // create any extra ants and place randomly, add them to ant array
  for (let i = 1; i < populationSlider.value(); i++) {
    x = floor(random(grid.cols));
    y = floor(random(grid.rows));
    ant = new Ant(x,y,neighborSlider.value());
    ants.push(ant);
  }
  
  // if red ants are enabled then do the same for them
  if (redAntCheck.checked()) {
    x = floor(grid.cols/2 + xdistanceSlider.value());
    y = floor(grid.rows/2 + ydistanceSlider.value());
    ant = new RedAnt(x,y,neighborSlider.value());
    redAnts.push(ant); 

    for (let i = 1; i < redAntPopSlider.value(); i++) {
      x = floor(random(grid.cols));
      y = floor(random(grid.rows));
      ant = new RedAnt(x,y,neighborSlider.value());
      redAnts.push(ant);
    }
  }
  
}
