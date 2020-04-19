function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Snow(x, y) {
    this.boxes = [];
    this.type = UNITS.TYPE_ARRAY_VERTICES;
    this.body = Composites.stack(x, y, 1, 10, 10, 1, (function(x, y){
        var newBox = new BoxComposite(x + Math.round(getRandomArbitrary(1, 200)), y, 2, 2,
            {
                // isStatic: true,
                label: 'Snow',
                mass: .01,
                frictionAir:  getRandomArbitrary(.9, 0.01)
            }
        )

        this.boxes.push(newBox);

        return newBox.body;
    }).bind(this));

    World.add(world, this.body);

    this.show = function() {
        stroke(255);
        fill(255);
        drawSnow(this.boxes);
        noStroke();
        fill(128);
    }
}

function drawSnow(boxes) {
    boxes.forEach(function(item) {
        drawVertices(item.body.computedVertices)
    })
}

