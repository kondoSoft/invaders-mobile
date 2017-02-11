var loadState = {

  preload: function () {
    /*
    Load all game assets
    Place your load bar, some messages.
    In this case of loading, only text is placed...
    */

    var loadingLabel = game.add.text(80, 150, 'loading...', {font: '20px press_start_2pregular', fill: '#fff'});

    //Load your images, spritesheets, bitmaps...
    game.load.image('ship', 'assets/atack-of-trump/sombrero.png')
    //background game
    game.load.image('starfield', 'assets/atack-of-trump/inicio/fondo.png');
    // game.load.image('planet1', 'assets/img/Planets/planeta.png');
    // game.load.image('planet2', 'assets/img/Planets/universo.png');
    // game.load.image('comet', 'assets/img/Planets/cometa.png');
    // game.load.image('galaxy', 'assets/img/Planets/galaxy.png');
    // homescreen background
    game.load.image('background-414x736', 'assets/atack-of-trump/inicio/414x736.png');
    game.load.image('background-384x640', 'assets/atack-of-trump/inicio/384x640.png');
    game.load.image('background-360x640', 'assets/atack-of-trump/inicio/360x640.png');
    game.load.image('background-320x568', 'assets/atack-of-trump/inicio/320x568.png');


    //buttons
    game.load.image('start', 'assets/img/start.png');
    game.load.image('highScore', 'assets/img/hight score.png');
    //sprites
    game.load.spritesheet('bala', 'assets/atack-of-trump/balas.png', 15, 15);
    game.load.spritesheet('balaEnemigo', 'assets/atack-of-trump/ladrillo.png', 17, 16);
    game.load.spritesheet('enemy', 'assets/atack-of-trump/trump.png', 34, 36 );
    game.load.spritesheet('player', 'assets/atack-of-trump/sombrero.png', 29, 14);

    //Load your sounds, efx, music...
    //Example: game.load.audio('rockas', 'assets/snd/rockas.wav');


    game.load.audio('laser1', 'assets/sound/laser4.wav');
    game.load.audio('laser2', 'assets/sound/laser5.wav');
    game.load.audio('music', 'assets/sound/high tech lab.wav');
    game.load.audio('explosion2', 'assets/sound/Explosion_02.wav');
    game.load.audio('explosion1', 'assets/sound/Explosion.wav')

    //Load your data, JSON, Querys...
    //Example: game.load.json('version', 'http://phaser.io/version.json');

  },

  create: function () {

    game.stage.setBackgroundColor('#000');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.state.start('menu');
  }
};
