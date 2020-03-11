// var path = Vertices.fromPath('10 0 0 10');
// Bodies.fromVertices(10, 10, path, {}, true}
function Vertex(x, y, verticles, options) {
    this.body = Bodies.fromVertices(
        x,
        y,
        Vertices.fromPath(verticles),
        options,
        false
    );
    this.computedVertices = {};
    this.type = UNITS.TYPE_VERTICES;
    World.add(world, this.body);

    this.show = function() {
        drawVertices(this.body.computedVertices);
    }
}

function drawVertices(vertices) {
    push();
    beginShape();
    stroke(255,255,255);
    for (var i = 0; i < vertices.length; i++) {
        fill(0, 0, 255)
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
    pop();
}