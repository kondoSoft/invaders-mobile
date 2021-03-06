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
var waveCount = 1;
var waveText;
var acceleration = (navigator.userAgent.indexOf('iPhone') != -1) ? 100: -100;
//sounds
var music;
var laser_enemy, laser_player;
var explosion_player, explosion_enemy;

var level1 = {
  create: function() {
    //background music
    music = game.add.audio('music');
    music.loop = true;
    music.play()
    //added sounds
    //shot sounds
    laser_enemy = game.add.audio('laser2');
    laser_enemy.volume = 0.7;
    laser_player = game.add.audio('laser1');
    laser_player.volume = 0.8;
    //explosion sounds
    explosion_player = game.add.audio('explosion1');
    explosion_player.volume = 0.8;
    explosion_enemy = game.add.audio('explosion2');
    explosion_enemy.volume = 0.3;

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
    player = game.add.sprite(game.world.centerX-15, game.world.height - 100, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE)
    player.body.collideWorldBounds = true;
    player.animations.add('alive', [0], 1, true);
    player.animations.add('dead-player', [2], 1, true);


    //Create a enemy group
    enemies = game.add.group()
    enemies.enableBody = true;
    enemies.physicsBodyType = Phaser.Physics.ARCADE;
    createEnemies()

    //  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, game.world.height-25, scoreString + score, { font: '10px press_start_2pregular', fill: '#fff' });

    //  Lives group
    lives = game.add.group();
    game.add.text(game.world.centerX, game.world.height-25, 'Lives', { font: '10px press_start_2pregular', fill: '#fff' });

    //wave text
    waveText = game.add.text(game.world.centerX-50, game.world.centerY, 'Wave ' + waveCount, { font: '20px press_start_2pregular', fill: '#fff' })
    setTimeout(function () {
      waveText.visible = false;

    }, 1500);


    //lives img
    for (var i = 0; i < 3; i++)
    {
      var ship = lives.create(game.world.width - 90 + (30 * i),game.world.height - 20, 'ship');
      ship.anchor.setTo(0.5, 0.5);
      ship.alpha = 0.5;
    }

    //create cursors Keys
    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // setting gyroscope update frequency
    // gyro.frequency = 10;

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
        player.x = game.world.centerX-15;
        waveCount++;
        enemyBullets.callAll('kill');
        bullets.callAll('kill')
        createEnemies()
        score += 200;
        waveText.text = 'Wave ' + waveCount;
        waveText.visible = true;
        setTimeout(function () {
          waveText.visible = false;
        }, 1500);
    }
    //Accelerometer movement
    if (window.DeviceMotionEvent != undefined && player.alive === true) {
      window.ondevicemotion = function(e) {
        player.body.velocity.x = e.accelerationIncludingGravity.x * acceleration;
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
    enemyBullet.reset(shooter.body.x+20, shooter.body.y+20);
    //play sound
    laser_enemy.play()
    game.physics.arcade.moveToObject(enemyBullet,player,120);
    if (score > 4000 && score < 7000) {
      firingTimer = game.time.now + 1000;
    } else if (score > 7000 && score < 15000){
      firingTimer = game.time.now + 700;
    } else if (score > 15000){
      firingTimer = game.time.now + 400;
    }else {
      firingTimer = game.time.now + 2000;
    }
  }

}

//fire bullets player

function fireBullet () {
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
      //play sound
      laser_player.play();
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
      var alien = enemies.create(x * 50, y * 50, 'enemy');
      alien.anchor.setTo(0.5, 0.5);
      alien.animations.add('fly', [ 0, 1], 2, true);
      alien.animations.add('explode', [2], 1, true);
      alien.play('fly');
      game.physics.enable(alien, Phaser.Physics.ARCADE)
      alien.body.collideWorldBounds = true;
      alien.body.moves = false;
    }
  }

  enemies.x = 30;
  enemies.y = 40;
  let posX = (game.world.width <= 360)? game.world.centerX/2-35 : game.world.centerX/2+30;
  let vel = (game.world.width <= 360)? 600: 2000;
  //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
  var tween = game.add.tween(enemies).to( { x: posX }, vel , Phaser.Easing.Linear.None, true, 0, 1000, true);

  //  When the tween loops it calls descend
  tween.onLoop.add(()=>enemies.y+=10, this);
}

function collisionHandler (bullet, enemy) {
  explosion_enemy.play();

  enemy.play('explode')
  bullet.kill()
  setTimeout(function () {

    enemy.kill();

  }, 150);

  score += 20;
  scoreText.text = scoreString + score

}

//
function enemyHitsPlayer(player, bullet) {
  explosion_player.play();
  bullet.kill();
  player.play('dead-player');
  enemyBullets.callAll('kill');
  bullets.callAll('kill')


  setTimeout(function () {
    player.kill();
  }, 150);
  setTimeout(function () {
    player.x = game.world.centerX-15;
    player.revive()
    player.play('alive')

  }, 500);

  let live = lives.getFirstAlive();

  if (live) live.kill()

  if (lives.countLiving() < 1)
  {
    music.pause();
    player.play('dead-player')
    setTimeout(function () {
      player.kill();
      game.state.start('highScore');

    }, 150);
  }
}
