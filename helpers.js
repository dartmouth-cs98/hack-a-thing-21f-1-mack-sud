
// Draws a hexagon with the help of point on circle function
function hexagon (posX, posY, radius) {                     
    const rotAngle = 360 / 6
    beginShape()
    for (let i = 0; i < 6; i++) {
        const thisVertex = pointOnCircle(posX, posY, radius, i * rotAngle)
        vertex(thisVertex.x, thisVertex.y)
    }
    endShape(CLOSE)
}
 
// Finds a point on a circle circumference based on x, y, radius and angle
function pointOnCircle (posX, posY, radius, angle) {         
    const x = posX + radius * cos(angle)
    const y = posY + radius * sin(angle)
    return createVector(x, y)
}

// Choosing the number of sides
function randomFiftyFifty () {
    const randomNum = random(1)
    if (randomNum > 0.5) {
      return true
    } else {
      return false
    }
  }
  
  // Function for choosing a random color from our palette
  function getRandomFromPalette () {
    const ranStrokeColor = floor(random(0, PALETTE.length))
    return PALETTE[ranStrokeColor]
  }

// Simple lines to see whether we understand randomization 
function testLines () {
    const numShapes = randomFiftyFifty() ? SIDES : SIDES * 2
    const strokeColor = getRandomFromPalette()
  
    noFill()
    push()
      translate(width/2, height/2)
      ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
      stroke(strokeColor)
      const angle = 360 / numShapes
      for (let i = 0; i < numShapes; i++) {
        line(0, 0, CRYSTAL_SIZE /2)
        rotate (angle)
      }
    pop()
  }