function Bridge(xx, yy, columns, rows, columnGap, rowGap) {
    var group = Body.nextGroup(true);
    this.boxes = [];
    this.itemWidth = ((width / 2 - columnGap / (columns - 1)) / columns);
    this.w = columns *  this.itemWidth + 5 + 50;

    var rects = Composites.stack(xx, yy, columns, rows, columnGap, rowGap, (function(x, y) {
        var newBox = new BoxComposite(x, y, this.itemWidth, 20, { collisionFilter: { group: group } })

        this.boxes.push(newBox);

        return newBox.body;
    }).bind(this));
    this.body = Composites.chain(rects, 0.5, 0, -0.5, 0, {stiffness: .5, angularStiffness: .5, length: 2, render: {type: 'line'}});
    this.type = UNITS.TYPE_BRIDGE;

    World.add(world, this.body);

    // left and right fix point of bridgedebugger;
    Composite.add(rects, Constraint.create({
        pointA: {x: xx, y: yy},
        bodyB: rects.bodies[0],
        pointB: {x: -1 * this.itemWidth / 2, y: 0},
        stiffness:.5,
        angularStiffness: .5
    }));
    Composite.add(rects, Constraint.create({
        pointA: {x: xx + this.w, y: yy},
        bodyB: rects.bodies[rects.bodies.length-1],
        pointB: {x: +this.itemWidth / 2, y: 0},
        stiffness: .5,
        angularStiffness: .5
    }));

    this.computed = {};

    this.show = function () {
        stroke(255);
        fill(255);
        drawBodies(this.boxes);
        noStroke();
        fill(128);

    }
}

function drawConstraints(constraints) {
    for (var i = 0; i < constraints.length; i++) {
        drawConstraint(constraints[i]);
    }
}

function drawBodies(bodies) {
    bodies.map(function (body) {
        drawBoxes(body);
    })
}

function drawConstraint(constraint) {
    var offsetA = constraint.pointA;
    var posA = {x:0, y:0};
    if (constraint.bodyA) {
        posA = constraint.bodyA.position;
    }
    var offsetB = constraint.pointB;
    var posB = {x:0, y:0};
    if (constraint.bodyB) {
        posB = constraint.bodyB.position;
    }
    line(
        posA.x + offsetA.x,
        posA.y + offsetA.y,
        posB.x + offsetB.x,
        posB.y + offsetB.y
    );
}

function drawVertices1(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}

function drawBoxes(box) {
    var pos = box.computed;
    var angle = box.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(0, 0, box.w, box.h);
    pop();
}
