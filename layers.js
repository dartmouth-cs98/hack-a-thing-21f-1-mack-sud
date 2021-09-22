const state = {
    sides: SIDES,
    crystal_size: CRYSTAL_SIZE,
    stepsOut: 8,
    thinStroke: 1,
    thickStroke: 3
}

const setState = (state) => {
    state.numShapes = state.sides,
    state.angle = 360 / state.numShapes,
    state.singleStep = (state.crystal_size / 2) / state.stepsOut,
    state.layerColor = getRandomFromPalette()
    return state
}

// For some random smaller circles on our canvas
const circles = (state) => {
    state.shapeSize = (state.crystal_size / 2) * .93
    state.position = (state.crystal_size / 2) - (state.shapeSize / 2)

    return ({
        name: 'Circles',
        state,
        render: () => {
            noFill()
            stroke(state.layerColor)
            strokeWeight(1)
            push()
            for (let i = 0; i < state.numShapes; i++) {
                ellipse(state.position, 0, state.shapeSize, state.shapeSize)
                rotate(state.angle)
            }
            pop()
        }
    })
}

// For some simple lines starting a certain n steps out and ending a certain greater n steps out
const simpleLines = (state) => {
    state.numSteps = randomFiftyFifty() ? state.stepsOut : int(state.stepsOut * 1.25)
    state.step = (state.crystal_size / 2) / state.numSteps
    state.start = floor(random(0, state.numSteps))
    state.stop = floor(random(state.start, state.numSteps + 1))
    state.weight = randomFiftyFifty() ? state.thinStroke : state.thickStroke
    state.numShapes = randomFiftyFifty() ? state.sides : state.sides * 2
    state.angle = 360 / state.numShapes

    return ({
        name: 'Simple Lines',
        state,
        render: () => {
            noFill()
            stroke(state.layerColor)
            strokeWeight(state.weight)
            push()
                for (let i = 0; i < state.numShapes; i++) {
                    line(state.start * state.step, 0, state.stop * state.step, 0)  
                    rotate(state.angle)
                }
            pop()
        }
    })
}

// Outlines our shape, can either be a hexagon or a circle
const outlineShape = (state) => {
    state.weight = randomFiftyFifty() ? 1 : 3
    state.isHexagon = randomFiftyFifty()

    return ({
        name: 'Outline Shape',
        state,
        render: () => {
            stroke(state.layerColor)
            strokeWeight(state.weight)
            push()
            if (state.isHexagon) {
                hexagon(0, 0, state.crystal_size / 2)
            } else {
                ellipse(0, 0, state.crystal_size, state.crystal_size)
            }
            pop()  
        }
    })
}

// Dotted lines, very similar to simple lines, just drawing small rectangles with an offset instead
const dottedLines = (state) => {
    state.numShapes = randomFiftyFifty() ? state.sides : state.sides * 2
    state.angle = 360 / state.numShapes
    state.shapeSize = 3
    state.centerOffset = state.singleStep

    return ({
        name: 'Dotted Lines',
        state,
        render: () => {
            fill(state.layerColor)
            noStroke()
            push()
            for(let i = 0; i <= state.numShapes; i++) {
                for(let x = state.centerOffset; x < CRYSTAL_SIZE / 2; x += state.singleStep) {
                    rect(x, 0, state.shapeSize, state.shapeSize)
                }
              rotate(state.angle)
            }
            pop()
          }
    })
}

// Draws a flat out shape on the canvas with fill!
const centeredShape = (state) => {                     
    state.randomShape = random(1)
    state.shapeSize = floor(random(state.stepsOut / 2, state.stepsOut - 2)) * state.singleStep
  
    return ({
        name: 'Centered Shape',
        state,
        render: () => {
            fill(state.layerColor)
            noStroke()
            push()
    
            if (state.randomShape < 0.1) {
                rect(0, 0, state.shapeSize * 2, state.shapeSize * 2)
            } else if (state.randomShape >= 0.1 && state.randomShape < 0.6) {
                ellipse(0, 0, state.shapeSize * 2, state.shapeSize * 2)
            } else if (state.randomShape >= 0.6) {
                rotate(state.angle / 2) 
                hexagon(0, 0, state.shapeSize)
            }
          pop()
        }
    })
}

// A random ring of shapes in a random direction. Very fun
const shapesRing = (state) => {                    
    state.steps = floor(random(1, state.stepsOut))
    state.center = state.steps * state.singleStep
    state.randomShape = random(1)
    state.orientation = randomFiftyFifty()
    state.fillColor = randomFiftyFifty() ? state.layerColor : color(0, 1)
    state.weight = randomFiftyFifty() ? state.thinStroke : state.thickStroke

    // For the sake of radius overlapping
    if (state.steps < state.stepsOut / 2) {
        state.radius = floor(random(1, state.steps)) * state.singleStep
    } else if (state.steps > state.stepsOut / 2) {
        state.radius = floor(random(1, state.stepsOut - state.steps)) * state.singleStep
    } else {
        state.radius = floor(random(1, (state.stepsOut / 2) + 1)) * state.singleStep
    }
  
    return ({
        name: 'Shapes Ring',
        state,
        render: () => {
            stroke(state.layerColor)
            fill(state.fillColor)
            strokeWeight(state.weight)
            push()
            for (let i = 0; i < state.numShapes; i++) {
                if (state.randomShape < 0.33) {
                    ellipse(0, state.center, state.radius, state.radius)
                } else if (state.randomShape >= 0.33 && state.randomShape < 0.66) {
                    rect(0, state.center, state.radius, state.radius)
                } else if (state.randomShape >= 0.66) {
                    myTriangle(state.center, state.radius, state.orientation)
                }
                rotate(state.angle)
            }
            pop()
        }
    })
}

// Cool lil layer of hexagons, starts a certain x steps out and ends a certain y steps out.
const layeredHexagons = (state) => {                 
    state.numSteps = randomFiftyFifty() ? state.stepsOut : state.stepsOut * 1.25
    state.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
    state.singleStep = ((CRYSTAL_SIZE / 2) - state.centerOffset) / state.numSteps
    state.weight = randomFiftyFifty() ? state.thinStroke : state.thickStroke
  
    return ({
        name: 'Layered Hexagons',
        state,
        render: () => {
            stroke(state.layerColor)
            noFill()
            strokeWeight(state.weight)
            push()
            rotate(state.angle / 2) 
            for (let i = 1; i < state.numSteps + 1; i++) {
                hexagon(0, 0, state.centerOffset + (i * state.singleStep))
            }
            pop()
        }
    })
}

