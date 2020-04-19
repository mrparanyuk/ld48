function Triangle(x, y, radius, options) {
    this.type = UNITS.TYPE_VERTICES;
    this.body = Bodies.polygon(x, y, 3, radius, options);
    Body.setAngle(this.body, Math.PI / 2);
    var v = this.body.vertices;

    this.x0 = v[0].x;
    this.y0 = v[0].y;

    this.x1 = v[1].x;
    this.y1 = v[1].y;

    this.x2 = v[2].x;
    this.y2 = v[2].y;

    World.add(world, this.body);

    this.computedVertices = {};

    this.show = function() {
        drawVertices(this.body.computedVertices);
    }
}

function TriangleComposite(x, y, radius, options) {
    this.type = UNITS.TYPE_ARRAY_VERTICES;
    this.body = Bodies.polygon(x, y, radius, options);



    this.radius = radius;
    this.computed = {};

    // uncomment to die
    // World.add(world, this.body);

}

// $.get('./new.svg').done(
//     (function(data) {
//         var vertexSets = [];
//         $(data).find('path').each(function(i, path) {
//             vertexSets = Matter.Svg.pathToVertices(path, 40);
//         });
//
//         this.body = Bodies.fromVertices(x, y, vertexSets, {isStatic: true}, true);
//         this.body.computedVertices = {};
//
//         World.add(world, this.body);
//     }).bind(this)
// );