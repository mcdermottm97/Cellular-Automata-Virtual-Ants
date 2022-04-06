function Cell(x, y, columnIndex, rowIndex, isAlive = false) {
	this.x = x;
	this.y = y;
	this.columnIndex = columnIndex;
	this.rowIndex = rowIndex;
	this.isAlive = isAlive;
}

Cell.prototype.contains = function (x, y, xSize, ySize) {
	return x >= this.x &&
		x <= this.x + xSize &&
		y >= this.y &&
		y <= this.y + ySize;
}

Cell.prototype.show = function (xSize, ySize) {
	if (this.isAlive) fill(0
	);
	else fill(255);
	rect(this.x, this.y, xSize, ySize);
}

Cell.prototype.getNewUpdated = function (nbrOfAliveNeighbourCells) {
	if (!this.isAlive && nbrOfAliveNeighbourCells === 3)
		return new Cell(this.x, this.y, this.columnIndex, this.rowIndex, true);
	else if (this.isAlive && (nbrOfAliveNeighbourCells < 2 || nbrOfAliveNeighbourCells > 3))
		return new Cell(this.x, this.y, this.columnIndex, this.rowIndex);
	return new Cell(this.x, this.y, this.columnIndex, this.rowIndex, this.isAlive);
}

Cell.prototype.changeState = function () {
	this.isAlive = !this.isAlive;
}




function Grid(cols, rows, width, height) {
	this.cols = cols;
	this.rows = rows;
	this.width = width;
	this.height = height;
	this.xRez = width / cols;
	this.yRez = height / rows;
	this.gridArray = (function () {
		const arr = new Array(cols);
		for (let i = 0; i < cols; i++) {
			arr[i] = new Array(rows);
			for (let j = 0; j < rows; j++)
				arr[i][j] = new Cell(i * (width / cols), j * (height / rows), i, j);
		}
		return arr;
	})()
}

Grid.prototype.findCell = function (x, y) {
	for (let i = 0; i < columns; i++)
		for (let j = 0; j < rows; j++)
			if (this.gridArray[i][j].contains(x, y, this.xRez, this.yRez)) return this.gridArray[i][j];
	return null;
}

Grid.prototype.isValidNeighbourCell = function (columnIndex, rowIndex) {
	return !!(this.gridArray[columnIndex] && this.gridArray[columnIndex][rowIndex]);
}

Grid.prototype.getNeighbourCells = function (cell) {
	const
		neighbourCells = [],
		i = cell.columnIndex,
		j = cell.rowIndex,
		neighboursIndex = [
			[i - 1, j - 1],
			[i, j - 1],
			[i + 1, j - 1],
			[i - 1, j],
			[i + 1, j],
			[i - 1, j + 1],
			[i, j + 1],
			[i + 1, j + 1]
		];

	for (let i = 0; i < neighboursIndex.length; i++)
		neighbourCells.push(
			this.isValidNeighbourCell(neighboursIndex[i][0], neighboursIndex[i][1])
				? this.gridArray[neighboursIndex[i][0]][neighboursIndex[i][1]] : null);
	return neighbourCells;
}

Grid.prototype.evaluateNeighbourCells = function (neighbourCells) {
	let alive = 0;
	for (let i = 0; i < neighbourCells.length; i++)
		if (neighbourCells[i]?.isAlive) alive += 1;
	return alive;
}

Grid.prototype.makeNextGrid = function () {
	const arr = new Array(this.cols);
	for (let i = 0; i < this.cols; i++) {
		arr[i] = new Array(this.rows);
	}
	return arr;
}

Grid.prototype.updateGrid = function () {
	const nextGrid = this.makeNextGrid();
	for (let i = 0; i < this.cols; i++)
		for (let j = 0; j < this.rows; j++) {
			const cell = this.gridArray[i][j];
			const neighbourCells = this.getNeighbourCells(cell);
			const nbrOfAliveNeighbourCells = this.evaluateNeighbourCells(neighbourCells);
			nextGrid[i][j] = cell.getNewUpdated(nbrOfAliveNeighbourCells);
		}
	this.gridArray = nextGrid;
}

Grid.prototype.showGrid = function () {
	for (let i = 0; i < columns; i++)
		for (let j = 0; j < rows; j++)
			this.gridArray[i][j].show(this.xRez, this.yRez);
}

Grid.prototype.changeCellState = function (x, y) {
	const cell = this.findCell(x, y);
	if (cell)	cell.changeState();
}





const
	columns = 50,
	rows = 25,
	width = 1800,
	height = 900;

let
	grid,
	pause = true,
	pauseButton;

function setup() {
	frameRate(15);
	grid = new Grid(columns, rows, width, height);

	createCanvas(width, height);
	strokeWeight(1.5);
	background(255);

	pauseButton = createButton('pause - unpause');
	pauseButton.mousePressed(function () {
		pause = !pause;
	});

	stroke(0);
	for (let i = 0; i <= columns; i++) {
		line(width / columns * i, 0, width / columns * i, height);
		for (let j = 0; j <= rows; j++) {
			line(0, height / rows * j, width, height / rows * j);
		}
	}
}

function mousePressed() {
	grid.changeCellState(mouseX, mouseY);
}

function keyPressed() {
	if (keyCode === 32) pause = !pause;
}

function draw() {
	if (!pause) grid.updateGrid();
	grid.showGrid();
}
