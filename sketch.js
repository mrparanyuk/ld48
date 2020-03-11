// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  Runner = Matter.Runner,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies,
  score = 0,
  gameOver = false
;

var engine;
var world;
var runner;
var boxes = [];
var button;

var ground;

function setup() {
  createCanvas(innerWidth, innerHeight);
  engine = Engine.create();
  world = engine.world;

  // create runner
  runner = Runner.create();
  Runner.run(runner, engine);
  //Engine.run(engine);
  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle(width / 2, height, width, 100, options);

  World.add(world, ground);

button = createButton('restart');
button.position(ground.position.x - 50 + 100, ground.position.y - 50);
button.mousePressed(function () {
    restart();
});
button.hide();

  // Gameover
    Events.on(engine, 'collisionStart', (event) => {
        event.pairs.forEach(function (items) {
            var bodies = [items.bodyA, items.bodyB,];

            if(bodies.filter(function (item) {
                return item.isStatic;
            }).length > 0) {
                return false;
            }

            Engine.clear(engine);
            gameOver = true;
            button.show();
            console.error('Game over')
        })
    });
    Events.on(runner, "tick", function (e) {
        score += .1;
    })
}

function mousePressed(e) {
    if (e.target.tagName !== 'BUTTON' && ! gameOver) {
        boxes.push(new Circle(mouseX, mouseY, 40));
    }
}

function restart() {
    Engine.clear(engine);
    boxes = new Array();
    gameOver = false;
    World.clear(world, true)
    score = 0;
    button.hide();
}

function draw() {
  if (gameOver) {

      var cTW1 = Math.round(textWidth('You loose') / 2);
      background(200, 0, 0);
      fill(100, 0, 0);
      noStroke(255);
      rectMode(CENTER);
      rect(ground.position.x, ground.position.y, width, 100);
      fill(50, 0, 0);
      text('You loose', ground.position.x - cTW1, ground.position.y - 15);

  } else {
      background(51);
      Engine.update(engine);
      for (var i = 0; i < boxes.length; i++) {
          boxes[i].show();
      }
      noStroke(255);
      fill(170);
      rectMode(CENTER);
      rect(ground.position.x, ground.position.y, width, 100);
      textSize(30);
      fill(0, 0, 100);
      var textScore = 'Score: ' + Math.round(score).toString()
      var cTW = Math.round(textWidth(textScore) / 2);
      text(textScore, ground.position.x - cTW, ground.position.y - 15);
  }
}
