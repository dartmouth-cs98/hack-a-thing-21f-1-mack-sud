
// points for vector field
points = []

var mult

// Elts of randomness
var red1, red2, green1, green2, blue1, blue2

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(30)

    noiseDetail(1)
    angleMode(DEGREES)
    density = 60
    space = width / density

    for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
            point = createVector(x, y)
            random(-20, 20)
            points.push(point)
        }
    }

    shuffle(points, true)

    red1 = random(255)
    red2 = random(255)
    green1 = random(255)
    green2 = random(255)
    blue1 = random(255)
    blue2 = random(255)

    mult = random(.002, .01)
}

function draw() {
    noStroke()

    if (frameCount * 5 <= points.length) {
        max = frameCount
    } else {
        max = points.length
    }

    for(let i = 0; i < points.length; i++) {

        red = map(points[i].x, 0, width, red1, red2)
        green = map(points[i].y, 0, height, green1, green2)
        blue = map(points[i].x, 0, width, blue1, blue2)
        alpha = map(dist(width/2, height/2, points[i].x, points[i].y), 0, 350, 400, 0)
        
        fill(red, green, blue)
        
        // angle for each point for a vector field
        angle = map(noise(points[i].x * mult, points[i].y * mult,), 0, 1, 0, 720)

        points[i].add(createVector(cos(angle), sin(angle)))

        // if (dist(width/2, height/2, points[i].x, points[i].y) < 350) {
            ellipse(points[i].x, points[i].y, 1)
        // }
    }
}

function mouseClicked() {
    saveCanvas('flowfield', 'png')
}