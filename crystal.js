// A class that brings everything together
class Crystal {
    constructor(x, y) {
        this.x = x
        this.y = y

        // layers we randomize
        this.layers = []

        allLayers.forEach(layer => {
            let picker = random(1)
            if (picker > layer.weight) {
                this.layers.push(layer.init())
            }
        })
    }

    render() {
        push()
        translate(this.x, this.y)
        this.layers.forEach(layer => {
            layer.render()
        })
        pop()
    }
}