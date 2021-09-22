
// points for vector field
points = []

const mult = 0.005

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(30)

    density = 50
    space = width / density

    for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
            point = createVector(x, y)
            points.push(point)
        }
    }
}

function draw() {
    noStroke()
    fill(255)

    for(let i = 0; i < points.length; i++) {
        
        // angle for each point for a vector field
        angle = map(noise(points[i].x * mult, points[i].y * mult,), 0, 1, 0, 720)

        points[i].add(createVector(cos(angle), sin(angle)))

        ellipse(points[i].x, points[i].y, 1)
    }
}