
// points for vector field
points = []

const mult = 0.005

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(30)

    noiseDetail(1)
    angleMode(DEGREES)
    density = 100
    space = width / density

    for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
            point = createVector(x, y)
            random(-20, 20)
            points.push(point)
        }
    }
}

function draw() {
    noStroke()
    fill(255)

    for(let i = 0; i < points.length; i++) {

        red = map(points[i].x, 0, width, 50, 255)
        green = map(points[i].y, 0, height, 50, 255)
        blue = map(points[i].x, 0, width, 255, 50)
        
        fill(red, green, blue)
        
        // angle for each point for a vector field
        angle = map(noise(points[i].x * mult, points[i].y * mult,), 0, 1, 0, 720)

        points[i].add(createVector(cos(angle), sin(angle)))

        ellipse(points[i].x, points[i].y, 1)
    }
}