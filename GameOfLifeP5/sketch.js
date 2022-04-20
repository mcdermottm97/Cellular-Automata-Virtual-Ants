let canvasWidth = 1200;
let canvasHieght = 900;

let table;
let ants;

let slNumAnts;
let slFastFwd;
let play = true;

function setup() {
  createCanvas(canvasWidth, canvasHieght);
  

  slNumAnts = createSlider(1, 10, 1);

  slNumAnts.position(700, canvasHieght + 20);
  
  slFastFwd = createSlider(1, 100, 10);
  slFastFwd.position(500, canvasHieght + 20);

  let pauseButton = createButton('pause/play');
  pauseButton.position(30, canvasHieght + 20)
  pauseButton.mousePressed(playPause);

  let resetButton = createButton('reset');
  resetButton.position(150, canvasHieght + 20);
  resetButton.mousePressed(resetapp);
  resetapp();


}

function draw() {
  background(220);

  if (play) {
    for (let f = 0; f < slFastFwd.value(); f++) {
      for (let i = 0; i < ants.length; i++) {
        ants[i].update();
      }
    }
  }
  
  table.draw();

  for (let i = 0; i < ants.length; i++) {
    ants[i].draw();
  }
  
}

function playPause() {
  play = !play;
}

function resetapp() {
  ants = [];
  table = new Table(2);

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
