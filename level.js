var screen = {
    width: 1200,
    height: 800
}

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
	v,
    forseX = 1,
    isLoading = true,
    youWin = false
;

setTimeout(function () {
    isLoading = false;
}, 1000)

var engine,
    world,
    runner,
    player,
    button,
    ground,
    fontawesome1,
    vertexFont
;

function preload() {
    fontawesome1 = loadFont('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/webfonts/fa-solid-900.ttf')
    // vertexFont = loadFont('');
    // vertexFont = loadFont('https://fonts.gstatic.com/s/librebarcode128text/v9/fdNv9tubt3ZEnz1Gu3I4-zppwZ9CWZ16Z0w5QVrS6Q.woff2')z;
}

function setup() {
    createCanvas(screen.width, screen.height);
    engine = Engine.create();
    world = engine.world;

    // create runner
    runner = Runner.create();
    Runner.run(runner, engine);
    // Engine.run(engine);
    var options = {
        isStatic: true
    };

    ground = new Box(screen.width / 2, screen.height - 50, screen.width, 1, options);
    var ground1 = new Box(screen.width + screen.width, screen.height - 50, screen.width, 1, options);
    var ceiling = new Box(screen.width + screen.width / 2, 100, screen.width *  2, 100,  { label: 'multiplerForseX',isStatic: true});

    // player = new Player(screen.width / 2 - 800, screen.height - 100, 40, {label: 'Player', mass: 50});
    player = new Player(screen.width / 2 + 250, 0, 40, {label: 'Player', mass: 10});

    // var v = new Vertex(2 * width + width / 2, screen.height, '0 0 1500 -500 1500 0', { isStatic: true});
    // v = new Vertex((2 * screen.width + screen.width / 2) + 230, screen.height - 100, '0 0 1550 0 1550 -150', { label: 'multiplerForseX',isStatic: true});
    var bridge = new Bridge(screen.width, screen.height - 75, 12, 1, 5, 5);
    var bridge2 = new Bridge(100, screen.height - 475, 12, 1, 5, 5);
    var g = new Box(screen.width / 2 + 250, screen.height - 100, 40, 40, {label: 'Gravity'}, false, '\uf35b');
    var g2 = new Box(screen.width, 170, 40, 40, {label: 'Gravity', isStatic: true}, false, '\uf358');

    // var falledBox = new Box(
    //     width / 2 + 250,
    //     0,
    //     40,
    //     40,
    //     {label: 'Gravity'},
    //     false,
    //     '\uf35b'
    // );
    // var falledBox = new Box(
    //     width - 200,
    //     -1250,
    //     40,
    //     140,
    //     {frictionAir: 0.0005}
    //     // {isStatic: true}
    // );
    // var falledBox1 = new Box(
    //     width - 100,
    //     -1250,
    //     40,
    //     140,
    //     {frictionAir: 0.05}
    //     // {isStatic: true}
    // );
    // var falledBox2 = new Box(
    //     width,
    //     -1250,
    //     40,
    //     140,
    //     {frictionAir: 0.001}
    //     // {isStatic: true}
    // );

    var f = new Finish(1900, -350, 0);
    var f1 = new Finish(1940, -350, 1);
    var f2 = new Finish(1980, -350, 0);

    Scene.add(scene, new Snow(width / 2 + 300, -1000));
    var snowC = 10;
    var interval = setInterval(function() {
        if (snowC === 0) {
            clearInterval(interval);
        }
        Scene.add(scene, new Snow(width / 2 + 300, -1000));
        snowC--;
    }, 1000);



    var t2 = new Triangle(screen.width / 2 + 350, -50, 20, {isStatic: true});
    var t = new Triangle(screen.width / 2 + 350, 0, 40, {isStatic: true});
    var g = new Box(screen.width / 2 + 350, 40, 20, 40, {isStatic: true}, false);

    Scene.add(scene, player);
    Scene.add(scene, ground);
    Scene.add(scene, ground1);
    Scene.add(scene, ceiling);
    // Scene.add(scene, v);
    Scene.add(scene, g);
    Scene.add(scene, g2);
    Scene.add(scene, f);
    Scene.add(scene, f1);
    Scene.add(scene, f2);
    Scene.add(scene, bridge);
    Scene.add(scene, bridge2);
    Scene.add(scene, t);
    Scene.add(scene, t2);
    // Scene.add(scene, falledBox);
    // Scene.add(scene, falledBox1);
    // Scene.add(scene, falledBox2);

    var finishCollection = [f, f1, f2];

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

            if(bodies.filter(function (item) {
                return item.label === 'Player' || item.label === 'multiplerForseX';
            }).length === 2) {
                // multiplerForseX(4);
            }

            if(
                bodies.filter(function (item) {
                    return item.label === 'Player' || item.label === 'Finish';
                }).length === 2
                &&
                bodies.filter(function (item) {
                    return item.label === 'Finish';
                }).length === 1
                && ! youWin
            ) {
                youWin = true;
                slowmotion();
            }
        })
    });
    Events.on(engine, 'collisionEnd', (event) => {
        event.pairs.forEach(function (items) {
            var bodies = [items.bodyA, items.bodyB,];

            if(bodies.filter(function (item) {
                return item.label === 'Player' || item.label === 'multiplerForseX';
            }).length === 2) {
                multiplerForseX(1);
            }
        })
    })
    Events.on(runner, "tick", function (e) {
        if (
            player.body.position.y > screen.height + 10
            || (engine.world.gravity.y < 0 && player.body.position.y + 10 < -1000)
        ) {
            gameOver = true;
        }


    })

}

var keyboardHandler = function () {
    if (youWin) {
        return false;
    }

    if (keyCode === LEFT_ARROW) {
        Matter.Body.applyForce(player.body, player.body.position, {x: -0.5 * multiplerForseX(), y: 0})
    } else if (keyCode === RIGHT_ARROW) {
        Matter.Body.applyForce(player.body, player.body.position, {x: 0.5 * multiplerForseX(), y: 0})
    } else if (keyCode === 32) {
        Matter.Body.applyForce(player.body, player.body.position, {x: 0, y: -.3 * engine.world.gravity.y})
    }
}

var timeScaleTarget = 1,
    counter = 0;

function slowmotion(intensity)
{
    intensity = intensity || 200;
    var step = 0;
    var interval = setInterval(function() {
        step += 10;
        var scale = step * 0.005;

        if (scale >= 1) {
            clearInterval(interval);
        }

        engine.timing.timeScale = scale;
    }, intensity);
}

function multiplerForseX()
{
    if (arguments.length) {
        forseX = arguments[0];
    }

    return forseX;
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

var blinkLoading = 0,
divideResult = 0;
function loading()
{
    background(26, 29, 33);

    textSize(148);
    fill(159, 123, 225);
    textFont('Faster');
    var cTW1 = textWidth('VERTEX') / 2;
    // textFont('Codystar');

    // textFont('Press Start 2P');
    // textFont('Barcode');

    text('VERTEX', (screen.width / 2) - cTW1, screen.height / 4);

    textFont('Codystar');
    textSize(60);
    var cTW1 = textWidth('Loading...') / 2;

    if (blinkLoading <= 12) {
        text('Loading', (screen.width / 2) - cTW1, screen.height / 4 + 200);
        blinkLoading++;
    } else {
        blinkLoading = 0;
        if (divideResult > 1) {
            divideResult = 0;
        } else {
            divideResult++;
        }
    }

    baseTriangle = screen.width / 12;

    for (var x = 0; x < 12; x++) {
        if (x % 3 === divideResult) {
            fill(159, 123, 225);
        } else if ((x + 1) % 3 === divideResult) {
            fill(55, 63, 68);
        } else {
            fill(36, 46, 50);
        }


        triangle(
            x * baseTriangle,
            screen.height,
            // x * baseTriangle + baseTriangle / 2,
            // screen.height - 200,
            screen.width / 2,
            screen.height / 2,
            x * baseTriangle + baseTriangle,
            screen.height
        );
    }
}

function showGameOver()
{
    var cTW1 = Math.round(textWidth('You loose') / 2);
    background(200, 0, 0);
    fill(100, 0, 0);
    noStroke(255);
    rectMode(CENTER);
    rect(ground.body.position.x, ground.body.position.y, screen.width, 100);
    fill(50, 0, 0);
    textSize(24);
    text('You loose', ground.body.position.x - cTW1, ground.body.position.y - 15);
}

function draw() {
  if (isLoading) {
      loading();
  } else if (gameOver) {
      showGameOver();
  } else {
      Engine.update(engine);
      fill(50, 0, 0);
      background(51);

      Scene.computeScene(
          scene,
          youWin
              ? { x: player.body.position.x - 350, y: player.body.position.y }
              : player.body.position
      ).forEach(function (item) {
          item.show();
      });

      if (youWin) {
          push();
          fill('rgba(255,255,255,.2)');
          rect(0, 0, screen.width, screen.height);

          textSize(148);
          fill(0, 0, 0);
          textFont('Faster');
          var cTW1 = textWidth('You win') / 2;
          // textFont('Codystar');

          // textFont('Press Start 2P');
          textFont(fontawesome1);

          text('You win', (screen.width / 2) - cTW1, screen.height / 4);
          // text('\uf188', (screen.width / 2) - cTW1, screen.height / 4);
          pop();
      }
  }
}
