
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