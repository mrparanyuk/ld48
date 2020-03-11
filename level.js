// module aliases
var Engine = Matter.Engine,
    Runner = Matter.Runner,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Vertices = Matter.Vertices,
    score = 0,
    frame = 0,
    level = [],
    scene = Scene.create(),
    gameOver = false,
	v
;

var engine,
    world,
    runner,
    player,
    button,
    ground,
    fontawesome
;

function preload() {
    fontawesome = loadFont('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/webfonts/fa-solid-900.ttf')
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    engine = Engine.create();
    world = engine.world;

    // create runner
    runner = Runner.create();
    Runner.run(runner, engine);
    // Engine.run(engine);
    var options = {
        isStatic: true
    };

    ground = new Box(width / 2, height - 50, width, 1, options);
    var ground1 = new Box(width + width, height - 50, width, 1, options);
    var ceiling = new Box(width + width / 2, 100, width *  2, 100, options);

    player = new Player(width / 2 , height - 100, 40, {label: 'Player'});

    // var v = new Vertex(2 * width + width / 2, height, '0 0 1500 -500 1500 0', { isStatic: true});
    v = new Vertex((2 * width + width / 2) + 230, height - 100, '0 0 1550 0 1550 -150', { isStatic: true});
    var bridge = new Bridge(width, height - 75, 12, 1, 5, 5);
    var bridge2 = new Bridge(100, height - 475, 12, 1, 5, 5);
    var g = new Box(width / 2 + 250, height - 100, 40, 40, {label: 'Gravity'}, false, '\uf35b');
    var g2 = new Box(width, 170, 40, 40, {label: 'Gravity', isStatic: true}, false, '\uf358');
    Scene.add(scene, player);
    Scene.add(scene, ground);
    Scene.add(scene, ground1);
    Scene.add(scene, ceiling);
    Scene.add(scene, v);
    Scene.add(scene, g);
    Scene.add(scene, g2);


    Scene.add(scene, bridge);
    Scene.add(scene, bridge2);

    // button = createButton('restart');
    // button.position(ground.body.position.x - 50 + 100, ground.body.position.y - 50);
    // button.mousePressed(function () {
    //     restart();
    // });
    // button.hide();

    // Gameover
    Events.on(engine, 'collisionStart', (event) => {
        event.pairs.forEach(function (items) {
            var bodies = [items.bodyA, items.bodyB,];

            if(bodies.filter(function (item) {
                return item.label === 'Player' || item.label === 'Gravity';
            }).length === 2) {
                var collisionBox = bodies.filter(function (item) {
                    return item.label === 'Gravity';
                })[0];

                scene = Scene.remove(scene, collisionBox);
                World.remove(world, g.body)


                setTimeout(function() {
                    engine.world.gravity.y = -1 * engine.world.gravity.y;
                }, 100);
            }


        })
    });
    Events.on(runner, "tick", function (e) {
        if (
            player.body.position.y > height + 10
            || (engine.world.gravity.y < 0 && player.body.position.y + 10 < -1000)
        ) {
            gameOver = true;
        }


    })
}

var keyboardHandler = function () {
    if (keyCode === LEFT_ARROW) {
        Matter.Body.applyForce(player.body, player.body.position, {x: -0.05, y: 0})
    } else if (keyCode === RIGHT_ARROW) {
        Matter.Body.applyForce(player.body, player.body.position, {x: 0.05, y: 0})
    } else if (keyCode === 32) {
        Matter.Body.applyForce(player.body, player.body.position, {x: 0, y: -0.1 * engine.world.gravity.y})
    }
}

function keyPressed() {
    keyboardHandler();
}
function keyTyped() {
    keyboardHandler();
}

function restart() {
    Engine.clear(engine);
    gameOver = false;
    World.clear(world, true);
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
      rect(ground.body.position.x, ground.body.position.y, width, 100);
      fill(50, 0, 0);
      textSize(24);
      text('You loose', ground.body.position.x - cTW1, ground.body.position.y - 15);
  } else {
      Engine.update(engine);
      fill(50, 0, 0);
      background(51);


      Scene.computeScene(scene, player).forEach(function (item) {
          item.show();
      });

  }
}
