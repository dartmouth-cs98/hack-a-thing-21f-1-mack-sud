// Grid line up, for uniform designs
const CRYSTAL_SIZE = 100
const SIDES = 6
const SPACING = 110

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
  createCanvas(displayWidth, displayHeight, SVG)

  // Two colors we will be using for the generated crystals
  PALETTE = [
    color(230, 57, 70),
    color(241, 250, 238),
    color(168, 218, 220),
    color(69, 123, 157),
    color(29, 53, 87)
  ]

  noLoop()
  angleMode(DEGREES)
  rectMode(CENTER)
}

function draw() {
  clear()
  for (let x = 0; x < displayWidth; x += SPACING) {
    for (let y = 0; y < displayHeight; y += SPACING) {
      const crystal = makeCrystal({x: x, y: y})
      drawCrystal(crystal)
    }
  }
}
