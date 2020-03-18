function Finish(x, y, startIndex) {
    this.boxes = [];
    this.type = UNITS.TYPE_ARRAY_VERTICES;
    this.body = Composites.stack(x, y, 1, 10, 0, 0, (function(x, y){
        var newBox = new BoxComposite(x, y, 40, 40,
             {
                // isStatic: true,
                 label: 'Finish',
                 mass: .1
             }
        )

        this.boxes.push(newBox);

        return newBox.body;
    }).bind(this));

    World.add(world, this.body);

    this.show = function() {
        stroke(255);
        fill(255);
        drawFinish(this.boxes, startIndex);
        noStroke();
        fill(128);
    }
}

function drawFinish(boxes, startIndex) {
    boxes.forEach(function(item, index) {
        if (index % 2 === startIndex) {
            fill('rgba(255, 255, 255, .5)');
        } else {
            fill('rgba(0,0,0, .5)');
        }

        drawVertices(item.body.computedVertices)
    })
}

