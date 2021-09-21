// Grid line up, for uniform designs
const CRYSTAL_SIZE = 500
const SIDES = 6

// Pallete array for different colors
let PALETTE = []

// All the layers we are randomizing
const layers = []

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
  const layer = new OutlineShape()
  console.log(layer)
  layer.render()
  // put drawing code here
  // testLines()
  // outlineShape()
  // simpleLines()
  // drawCircles()

  // For Random combos
  let picker = random(1)
  if (picker > 0.3) {
    layers.push(new OutlineShape())
  }

  picker = random(1)
  if (picker > 0.5) {
    layers.push(new SimpleLines())
  }

  picker = random(1)
  if (picker > 0.5) {
    layers.push(new Circles())
  }

  // Render everything
  layers.forEach(layer => {
    layer.render()
  })
}








