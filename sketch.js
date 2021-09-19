const CRYSTAL_SIZE = 500
const SIDES = 6
let PALETTE = []

function setup() {
  // put setup code here
  createCanvas(530, 530, SVG)

  PALETTE = [
    color (255, 52, 154),
    color (4, 0, 152),
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

function randomFiftyFifty () {
  const randomNum = random(1)
  if (randomNum > 0.5) {
    return true
  } else {
    return false
  }
}

function getRandomFromPalette () {
  const ranStrokeColor = floor(random(0, PALETTE.length))
  return PALETTE[ranStrokeColor]
}