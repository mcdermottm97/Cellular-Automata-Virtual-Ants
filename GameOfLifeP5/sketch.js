let canvasWidth = screen.width * .8;
let canvasHieght = screen.height * .8;

let table;
let ants;

let slNumAnts;
let slFastFwd;
let slRes;

function setup() {
  createCanvas(canvasWidth, canvasHieght);

  slNumAnts = createSlider(1, 10, 1);
  slNumAnts.changed(numAntsChanged);
  slNumAnts.position(screen.width * .1, canvasHieght + 20);
  
  slFastFwd = createSlider(1, 100, 10);
  slFastFwd.position(screen.width * .3, canvasHieght + 20);

  slRes = createSlider(2, 200, 40); // divided by 10
  slRes.position(screen.width * .5, canvasHieght + 20);
  slRes.changed(resolutionChanged);

  let resetButton = createButton('reset');
  resetButton.position(screen.width * .7, canvasHieght + 20);
  resetButton.mousePressed(resetapp);
  resetapp();
}

function draw() {
  background(220);

  for (let f = 0; f < slFastFwd.value(); f++) {
    for (let i = 0; i < ants.length; i++) {
      ants[i].update();
    }
  }

  table.draw();

  for (let i = 0; i < ants.length; i++) {
    ants[i].draw();
  }
}

function resetapp() {
  ants = [];
  table = new Table(slRes.value()/10);

  // first ant in center
  let posx = floor(table.columns/2);
  let posy = floor(table.rows/2);
  let ant = new Ant(posx, posy);
  ants.push(ant);

  // any others random
  for (let i = 1; i < slNumAnts.value(); i++) {
    posx = floor(random(table.columns));
    posy = floor(random(table.rows));
    ant =  new Ant(posx, posy);
    ants.push(ant);
  }
}

function numAntsChanged() {
  let difference = slNumAnts.value() - ants.length;
  if (difference > 0) {
    for (let i = 0; i < difference; i++) {
      let posx = floor(random(table.colums));
      let posy = floor(random(table.rows));
      let ant = new Ant(posx, posy);
      ants.push(ant);
    }
  } else if (difference < 0) {
    for (let i = 0; i > difference; i--) {
      ants.pop();
    }
  }
}

function resolutionChanged() {
  table.changeResolution(slRes.value()/10);
}