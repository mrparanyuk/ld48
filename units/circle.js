// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

function Circle(x, y, r, options) {
  options.friction = .1;
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  this.computed = {};
  World.add(world, this.body);


  this.show = function() {
    var pos = this.computed;
    var rad = this.body.circleRadius;
    var angle = this.body.angle;
    push();

    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    circle(0, 0, rad * 2);
    pop();
  }

}
function Player(x, y, r, options) {
  options.friction = .1;
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  this.computed = {};
  World.add(world, this.body);

  // Constraint.create({
  //     bodyB: ropeA.bodies[0],
  //     pointB: { x: -25, y: 0 },
  //     pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
  //     stiffness: 0.5
  // })


  this.show = function() {
    var pos = this.computed;
    var rad = this.body.circleRadius;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    circle(0, 0, rad * 2);
    pop();

    push();
    var vvv = Math.round(textWidth('o') / 2)
    textSize(24);
    fill(0, 255, 0);
    textFont(fontawesome1);
    text('\uf188', pos.x - vvv, pos.y + 10);
  }

}
