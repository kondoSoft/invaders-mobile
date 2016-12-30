// Variables Globales
var player;
var enemies;
var bullets;
var bulletTime = 0;
var cursors;
var score = 0;
var lives;
var fireButton;
var enemyBullets;
var livingEnemies = [];
var starfield;
var firingTimer = 0;
var scoreText, scoreString;
var music;

var level1 = {
  create: function() {
    //background music
    music = document.getElementById('music')
    music.loop = true;
    music.play();

    //added background
    starfield = game.add.tileSprite(0,0,game.world.width, game.world.height, 'starfield')

    //our Bullets group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bala');
    bullets.setAll('anchor.x', -0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'balaEnemigo');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    //create a player (the ship)
    player = game.add.sprite(game.world.centerX-15, game.world.centerY+302, 'ship');
    game.physics.enable(player, Phaser.Physics.ARCADE)
    player.body.collideWorldBounds = true;

    //Create a enemy group
    enemies = game.add.group()
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    createEnemies()

    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '28px Arial', fill: '#fff' });

    //  Lives group
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives', { font: '28px Arial', fill: '#fff' });


    //lives img
    for (var i = 0; i < 3; i++)
    {
      var ship = lives.create(game.world.width - 95 + (30 * i), 50, 'ship');
      ship.anchor.setTo(0.5, 0.5);
      ship.alpha = 0.5;
    }

    //create cursors Keys
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // setting gyroscope update frequency
    gyro.frequency = 10;

    console.log();

  },

  update: function () {
    // scroll the background
    starfield.tilePosition.y +=2;

    //moving the player
    if (player.alive) {
      player.body.velocity.setTo(0,0);

      if (cursors.left.isDown) {
        player.body.velocity.x = -200;
      }else if (cursors.right.isDown){
        player.body.velocity.x = 200;
      }

      if (fireButton.isDown || game.input.activePointer.isDown) {
        fireBullet();
      }

      if (game.time.now > firingTimer) {
        enemyFires();
      }

      //Collision Listeners
      game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this)
      game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this)

    }
    if (enemies.countLiving() < 1) {
        createEnemies()
    }
    //Accelerometer movement
    if (window.DeviceMotionEvent != undefined && player.alive === true) {
      window.ondevicemotion = function(e) {
        player.body.velocity.x = e.accelerationIncludingGravity.x * -100;
      }

    }
    // // start gyroscope detection
    // gyro.startTracking(function(o) {
    //      // updating player velocity
    //      player.body.velocity.x += o.gamma/20;
    //      player.body.velocity.y += o.beta/20;
    // });

  },

}


// enemy fire

function enemyFires () {
  let fireSound = document.getElementById('laser2')
  fireSound.volume = 0.7;
  fireSound.play();
  //  Grab the first bullet we can from the pool
  enemyBullet = enemyBullets.getFirstExists(false);

  livingEnemies.length=0;

  enemies.forEachAlive(function(alien){

    // put every living enemy in an array
    livingEnemies.push(alien);
  });


  if (enemyBullet && livingEnemies.length > 0)
  {

    var random=game.rnd.integerInRange(0,livingEnemies.length-1);

    // randomly select one of them
    var shooter=livingEnemies[random];
    // And fire the bullet from this enemy
    enemyBullet.reset(shooter.body.x, shooter.body.y);

    game.physics.arcade.moveToObject(enemyBullet,player,120);
    if (score > 4000) {
      firingTimer = game.time.now + 1000;
    } else if (score > 7000){
      firingTimer = game.time.now + 700;
    } else if (score > 10000){
      firingTimer = game.time.now + 400;
    }else {
      firingTimer = game.time.now + 2000;
    }
  }

}

//fire bullets player

function fireBullet () {
  let fireSound = document.getElementById('laser1')
  fireSound.volume = 0.8;
  fireSound.play();

  //  To avoid them being allowed to fire too fast we set a time limit
  if (game.time.now > bulletTime)
  {
    //  Grab the first bullet we can from the pool
    bullet = bullets.getFirstExists(false);

    if (bullet)
    {
      //  And fire it
      bullet.reset(player.x, player.y + 8);
      bullet.body.velocity.y = -400;
      bulletTime = game.time.now + 300;
    }
  }

}

function resetBullet (bullet) {

  //  Called if the bullet goes out of the screen
  bullet.kill();

}

//create enemies
function createEnemies () {

  for (var y = 0; y < 5; y++)
  {
    for (var x = 0; x < 6; x++)
    {
      var alien = enemies.create(x * 48, y * 50, 'enemy');
      alien.anchor.setTo(0.5, 0.5);
      alien.animations.add('fly', [ 0, 1], 2, true);
      alien.animations.add('explode', [2], 1, true);
      alien.play('fly');
      alien.body.moves = false;
    }
  }

  enemies.x = 30;
  enemies.y = 100;

  //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
  var tween = game.add.tween(enemies).to( { x: game.world.centerX/2 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

  //  When the tween loops it calls descend
  tween.onLoop.add(()=>enemies.y+=10, this);
}

function collisionHandler (bullet, enemy) {
  let explosionSound = document.getElementById('explosion2')
  explosionSound.load();
  explosionSound.volume = 0.3;
  explosionSound.play();
  enemy.play('explode')
  bullet.kill()
  setTimeout(function () {

    enemy.kill();

  }, 150);

  score += 20;
  scoreText.text = scoreString + score


  // if (enemy.countLiving() == 0) {
  //   score += 1000;
  //   scoreText.text = scoreString + score;
  //
  //   enemyBullets.callAll('kill', this);
  //
  // }
}


function enemyHitsPlayer(player, bullet) {
  let explosion = document.getElementById('explosion1')
  explosion.volume = 0.8;
  explosion.play();
  bullet.kill();
  player.kill();

  setTimeout(function () {
    player.revive()
  }, 500);

  let live = lives.getFirstAlive();

  if (live) live.kill()

  if (lives.countLiving() < 1)
  {
    music.load()
    player.kill();
    // enemyBullets.callAll('kill');

    game.state.start('highScore');
  }
}
