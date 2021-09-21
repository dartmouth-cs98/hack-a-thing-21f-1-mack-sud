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
        this.strokeColor = getRandomFromPalette()
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
        stroke(this.strokeColor)
        strokeWeight(1)
        push()
        translate(width/2, height/2)
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
        stroke(this.strokeColor)
        strokeWeight(this.weight)
        push()
            translate(width/2, height/2)
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
        stroke(this.strokeColor)
        strokeWeight(this.weight)
        push()
        translate(width/2, height/2)
        if (this.isHexagon) {
            hexagon(0, 0, this.crystal_size / 2)
        } else {
            ellipse(0, 0, this.crystal_size, this.crystal_size)
        }
        pop()  
    }
}

