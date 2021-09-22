// Draws a hexagon with the help of point on circle function
const hexagon = (posX, posY, radius) => {                     
    const rotAngle = 360 / 6
    beginShape()
    for (let i = 0; i < 6; i++) {
        const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle)
        vertex(thisVertex.x, thisVertex.y)
    }
    endShape(CLOSE)
}
 
// Finds a point on a circle circumference based on x, y, radius and angle
const pointOnCircle = (posX, posY, radius, angle) => {         
    const x = posX + radius * cos(angle)
    const y = posY + radius * sin(angle)
    return createVector(x, y)
}

// Choosing the number of sides
const randomFiftyFifty = () => {
    const randomNum = random(1)
    return randomNum > 0.5 ? true : false
}
  
// Function for choosing a random color from our palette
const getRandomFromPalette = () => {
  const ranStrokeColor = floor(random(0, PALETTE.length))
  return PALETTE[ranStrokeColor]
}

// Simple lines to see whether we understand randomization 
const testLines = (state) => {
  state.numShapes = randomFiftyFifty() ? SIDES : SIDES * 2
  state.angle = 360 / state.numShapes

  return ({
    name: 'Test Lines',
    state,
    render: () => {
      stroke(state.layerColor)
      noFill()
      strokeWeight(state.thickStroke)
      push()
      if (state.lines) {
        for (let i = 0; i < 360 - 0.1; i += state.angle) {
          line(0, 0, 0, CRYSTAL_SIZE /2)
          rotate(state.angle)
        }
      }
      if (state.circle) {
        ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
      }
      pop()
    }
  })
}

const myTriangle = (center, radius, direction) => {
  if (direction) {
      beginShape();
      vertex(center + radius * cos(0), radius * sin(0));
      vertex(center + radius * cos(120), radius * sin(120));
      vertex(center + radius * cos(240), radius * sin(240));
      endShape(CLOSE); 
  } else {
      beginShape();
      vertex(center + radius * cos(180), radius * sin(180));
      vertex(center + radius * cos(300), radius * sin(300));
      vertex(center + radius * cos(60), radius * sin(60));
      endShape(CLOSE);
  }
}

const allLayers = [
  {
    name: "Outline Shapes",
    init: (props) => outlineShape({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: "Centered Shape",
    init: (props) => centeredShape({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: "Circles",
    init: (props) => circles({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Simple Lines',
    init: (props) => simpleLines({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Dotted Lines',
    init: (props) => dottedLines({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Shapes Ring',
    init: (props) => shapesRing({
      ...props,
      ...setState(state)
    }),
    weight: 0.3
  },
  {
    name: 'Layered Hexagons',
    init: (props) => layeredHexagons({
      ...props,
      ...setState(state)
    }),
    weight: 0.6
  },
  {
    name: 'Test Lines',
    init: (props) => testLines({
      lines: false,
      circle: false,
      ...props,
      ...setState(state)
    }),
    weight: 1
  }
]

const makeCrystal = (pos) => {
  const layers = allLayers.map(layer => {
    let picker = random(1)
    const draw =  picker > layer.weight
    return layer.init({
      pos,
      draw
    })
  })
  return layers
}

const drawCrystal = (crystal) => {
  crystal.forEach(layer => {
    if (layer.state.draw) {
      push()
      translate(layer.state.pos.x, layer.state.pos.y)
      layer.render()
      pop()
    }
  })
}