// Grid line up, for uniform designs
const CRYSTAL_SIZE = 150
const SIDES = 6

// Pallete array for different colors
let PALETTE = []

// Some layout vars
const ROWS = 4
const COLUMNS = 3
const PADDING = CRYSTAL_SIZE * 0.2
const MARGIN =  CRYSTAL_SIZE / 2
const GRID = CRYSTAL_SIZE + PADDING
const STARTPOINT = (CRYSTAL_SIZE / 2) + MARGIN

// Hold all crystals
allCrystals = []



function setup() {
  const gridX = MARGIN + GRID * COLUMNS
  const gridY = MARGIN + GRID * ROWS
  // put setup code here
  createCanvas(gridX, gridY, SVG)

  // Two colors we will be using for the generated crystals
  PALETTE = [
    color (255, 52, 154), // pink
    color (4, 0, 152),    // blue
  ]

  noLoop()
  angleMode(DEGREES)
  rectMode(CENTER)
}

function draw() {

  for (let x = 0; x < COLUMNS; x++) {
    for (let y = 0; y < ROWS; y++) {
      const crystalX = MARGIN + (x * GRID)
      const crystalY = MARGIN + (y * GRID)
      allCrystals.push(new Crystal(crystalX, crystalY))
    }
  }


  allCrystals.forEach(crystal => {
    crystal.render()
  });
}








