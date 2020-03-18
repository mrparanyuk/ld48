function Box(x, y, w, h, options, angle, icon) {
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  this.computed = {};
  World.add(world, this.body);

  if (angle) {
      // in radian ex. Math.PI / 2
      Body.setAngle(this.body, angle);
  }

  this.show = function() {
    var pos = this.computed;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(0, 0, this.w, this.h);
    pop();

    push();
    var vvv = Math.round(textWidth('o') / 2)
      if (icon) {
          textSize(24);
          fill(0, 255, 0);
          textFont(fontawesome1);
          text(icon, pos.x - vvv, pos.y + 10);
      }

      pop();


  }
}

function BoxComposite(x, y, w, h, options, angle) {
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  this.computed = {};
  // uncomment to start big performance problem
  // World.add(world, this.body);



  if (angle) {
      // in radian ex. Math.PI / 2
      Body.setAngle(this.body, angle);
  }

  this.show = function() {
    var pos = this.computed;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

function BoxGround(x, y, w, h, options, angle) {
    this.body = Bodies.rectangle(x, y - (h / 2), w, 1, options);
    this.w = w;
    this.h = h;
    this.computed = {};
    World.add(world, this.body);

    if (angle) {
        // in radian ex. Math.PI / 2
        Body.setAngle(this.body, angle);
    }

    this.show = function() {
        var pos = this.computed;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(127);
        rect(0, 0, this.w, this.h);
        pop();
    }
}