// Grid line up, for uniform designs
const CRYSTAL_SIZE = 500
const SIDES = 6

// Pallete array for different colors
let PALETTE = []

function setup() {
  // put setup code here
  createCanvas(530, 530, SVG)

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
  // put drawing code here
  // testLines()
  // outlineShape()
  // simpleLines()
  // drawCircles()

  // For Random combos
  let picker = random(1)
  if (picker > 0.3) {
    outlineShape()
  }

  picker = random(1)
  if (picker > 0.5) {
    simpleLines()
  }

  picker = random(1)
  if (picker > 0.5) {
    drawCircles()
  }
}

// Draws smaller circles around the canvas
function drawCircles () {
  const numShapes = SIDES
  const angle = 360 / numShapes
  const shapeSize = (CRYSTAL_SIZE / 2) * .93
  const position = (CRYSTAL_SIZE / 2) - (shapeSize / 2)
  const strokeColor = getRandomFromPalette()

  stroke(strokeColor)
  strokeWeight(1)
  push()
  translate(width/2, height/2)
    for (let i = 0; i < numShapes; i++) {
      ellipse(position, 0, shapeSize, shapeSize)
      rotate(angle)
    }
  pop()
}

// Outlines our shape, can either be a hexagon or a circle
function outlineShape () {
  const strokeColor = getRandomFromPalette()
  const weight = randomFiftyFifty() ? 1 : 3
  const isHexagon = randomFiftyFifty()

  stroke(strokeColor)
  strokeWeight(weight)

  push()
  translate(width/2, height/2)
  if (isHexagon) {
    hexagon(0, 0, CRYSTAL_SIZE / 2)
  } else {
    ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
  }
  pop()
}

// Makes lines that start from a specific point on a circle, a random fraction of the radius away and then stops at the end, also a choice
function simpleLines () {
  const stepsOut = 8
  const numSteps = randomFiftyFifty() ? stepsOut : int(stepsOut * 1.25)
  const step = (CRYSTAL_SIZE / 2) / numSteps
  const start = floor(random(0, numSteps))
  const stop = floor(random(start, numSteps + 1))

  let numShapes = randomFiftyFifty() ? SIDES : SIDES * 2
  const strokeColor = getRandomFromPalette()
  const weight = randomFiftyFifty() ? 1 : 3

  const angle = 360 / numShapes
  
  noFill()
  stroke(strokeColor)
  strokeWeight(weight)
  push()
    translate(width/2, height/2)
    for (let i = 0; i < numShapes; i++) {
      line(start * step, 0, stop * step, 0)  
      rotate(angle)
    }
  pop()
}

// Simple lines to see whether we understand randomization 
function testLines () {
  const numShapes = randomFiftyFifty() ? SIDES : SIDES * 2
  const strokeColor = getRandomFromPalette()

  noFill()
  push()
    translate(width/2, height/2)
    stroke(strokeColor)
    const angle = 360 / numShapes
    for (let i = 0; i < numShapes; i++) {
      line(0, 0, CRYSTAL_SIZE /2)
      rotate (angle)
    }
  pop()
}

