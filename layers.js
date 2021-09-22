// The big boy class for all shapes
class Layer {

    // Constructor
    constructor() {
        this.sides = SIDES
        this.crystal_size = CRYSTAL_SIZE
        this.numShapes = this.sides
        this.angle = 360/this.numShapes
        this.stepsOut = 8
        this.singleStep = (this.crystal_size / 2) / this.stepsOut
        this.thinStroke = 1
        this.thickStroke = 3
        this.layerColor = getRandomFromPalette()
    }
}

// For some random smaller circles on our canvas
class Circles extends Layer {
    constructor() {
        super()
        this.shapeSize = (this.crystal_size / 2) * .93
        this.position = (this.crystal_size / 2) - (this.shapeSize / 2)
    }

    render() {
        noFill()
        stroke(this.layerColor)
        strokeWeight(1)
        push()
        for (let i = 0; i < this.numShapes; i++) {
            ellipse(this.position, 0, this.shapeSize, this.shapeSize)
            rotate(this.angle)
        }
        pop()
    }
}

// For some simple lines starting a certain n steps out and ending a certain greater n steps out
class SimpleLines extends Layer {
    constructor() {
        super()
        this.numSteps = randomFiftyFifty() ? this.stepsOut : int(this.stepsOut * 1.25)
        this.step = (this.crystal_size / 2) / this.numSteps
        this.start = floor(random(0, this.numSteps))
        this.stop = floor(random(this.start, this.numSteps + 1))
        this.weight = randomFiftyFifty() ? this.thinStroke : this.thickStroke
        this.numShapes = randomFiftyFifty() ? this.sides : this.sides * 2
        this.angle = 360 / this.numShapes
    }

    render() {
        noFill()
        stroke(this.layerColor)
        strokeWeight(this.weight)
        push()
            for (let i = 0; i < this.numShapes; i++) {
                line(this.start * this.step, 0, this.stop * this.step, 0)  
                rotate(this.angle)
            }
        pop()
    }
}

// Outlines our shape, can either be a hexagon or a circle
class OutlineShape extends Layer {
    constructor() {
        super()
        this.weight = randomFiftyFifty() ? 1 : 3
        this.isHexagon = randomFiftyFifty()
    }

    render() {
        stroke(this.layerColor)
        strokeWeight(this.weight)
        push()
        if (this.isHexagon) {
            hexagon(0, 0, this.crystal_size / 2)
        } else {
            ellipse(0, 0, this.crystal_size, this.crystal_size)
        }
        pop()  
    }
}

// Dotted lines, very similar to simple lines, just drawing small rectangles with an offset instead
class DottedLines extends Layer {
    constructor() {
        super()
        this.numShapes = randomFiftyFifty() ? this.sides : this.sides * 2
        this.angle = 360 / this.numShapes
        this.shapeSize = 3
        this.centerOffset = this.singleStep
    }

    render () {
        fill(this.layerColor)
        noStroke()
        push()
        for(let i = 0; i <= this.numShapes; i++) {
            for(let x = this.centerOffset; x < CRYSTAL_SIZE / 2; x += this.singleStep) {
                rect(x, 0, this.shapeSize, this.shapeSize)
            }
          rotate(this.angle)
        }
        pop()
      }

}

// Draws a flat out shape on the canvas with fill!
class CenteredShape extends Layer {                     
    constructor () {
        super()
        this.randomShape = random(1)
        this.shapeSize = floor(random(this.stepsOut / 2, this.stepsOut - 2)) * this.singleStep
    }
  
    render () {
        fill(this.layerColor)
        noStroke()
        push()

        if (this.randomShape < 0.1) {
            rect(0, 0, this.shapeSize * 2, this.shapeSize * 2)
        } else if (this.randomShape >= 0.1 && this.randomShape < 0.6) {
            ellipse(0, 0, this.shapeSize * 2, this.shapeSize * 2)
        } else if (this.randomShape >= 0.6) {
            rotate(this.angle / 2) 
            hexagon(0, 0, this.shapeSize)
        }
      pop()
    }
}

// A random ring of shapes in a random direction. Very fun
class ShapesRing extends Layer {                    
    constructor () {
        super()
        this.steps = floor(random(1, this.stepsOut))
        this.center = this.steps * this.singleStep
        this.randomShape = random(1)
        this.orientation = randomFiftyFifty()
        this.fillColor = randomFiftyFifty() ? this.layerColor : color(0, 1)
        this.weight = randomFiftyFifty() ? this.thinStroke : this.thickStroke
    
        // For the sake of radius overlapping
        if (this.steps < this.stepsOut / 2) {
            this.radius = floor(random(1, this.steps)) * this.singleStep
        } else if (this.steps > this.stepsOut / 2) {
            this.radius = floor(random(1, this.stepsOut - this.steps)) * this.singleStep
        } else {
            this.radius = floor(random(1, (this.stepsOut / 2) + 1)) * this.singleStep
        }
    }
  
    render () {
        stroke(this.layerColor)
        fill(this.fillColor)
        strokeWeight(this.weight)
        push()
        for (let i = 0; i < this.numShapes; i++) {
            if (this.randomShape < 0.33) {
                ellipse(0, this.center, this.radius, this.radius)
            } else if (this.randomShape >= 0.33 && this.randomShape < 0.66) {
                rect(0, this.center, this.radius, this.radius)
            } else if (this.randomShape >= 0.66) {
                myTriangle(this.center, this.radius, this.orientation)
            }
            rotate(this.angle)
        }
        pop()
    }
}

// Cool lil layer of hexagons, starts a certain x steps out and ends a certain y steps out.
class LayeredHexagons extends Layer {                 
    constructor () {
        super()
        this.numSteps = randomFiftyFifty() ? this.stepsOut : this.stepsOut * 1.25
        this.centerOffset = (CRYSTAL_SIZE / 2) * 0.15
        this.singleStep = ((CRYSTAL_SIZE / 2) - this.centerOffset) / this.numSteps
        this.weight = randomFiftyFifty() ? this.thinStroke : this.thickStroke
    }
  
    render () {
        stroke(this.layerColor)
        noFill()
        strokeWeight(this.weight)
        push()
        rotate(this.angle / 2) 
        for (let i = 1; i < this.numSteps + 1; i++) {
            hexagon(0, 0, this.centerOffset + (i * this.singleStep))
        }
        pop()
    }
}

