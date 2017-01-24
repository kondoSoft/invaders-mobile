var loadState = {

  preload: function () {
    /*
    Load all game assets
    Place your load bar, some messages.
    In this case of loading, only text is placed...
    */

    var loadingLabel = game.add.text(80, 150, 'loading...', {font: '20px press_start_2pregular', fill: '#fff'});

    //Load your images, spritesheets, bitmaps...
    game.load.image('ship', 'assets/img/nave 4.png')
    //background game
    game.load.image('starfield', 'assets/img/campo_de_estrellas.png');
    game.load.image('planet1', 'assets/img/Planets/planeta.png');
    game.load.image('planet2', 'assets/img/Planets/universo.png');
    game.load.image('comet', 'assets/img/Planets/cometa.png');
    game.load.image('galaxy', 'assets/img/Planets/galaxy.png');
    // homescreen background
    game.load.image('background-414x736', 'assets/img/menú inicio/Inicio_414x736.png');
    game.load.image('background-384x640', 'assets/img/menú inicio/Inicio_384x640.png');
    game.load.image('background-360x640', 'assets/img/menú inicio/Inicio_360x640.png');
    game.load.image('background-320x568', 'assets/img/menú inicio/Inicio_320x568.png');


    //buttons
    game.load.image('start', 'assets/img/start.png');
    game.load.image('highScore', 'assets/img/hight score.png');
    //sprites
    game.load.spritesheet('bala', 'assets/img/balas/balas_1.png', 15, 15);
    game.load.spritesheet('balaEnemigo', 'assets/img/balas/balas_4.png', 15, 15);
    game.load.spritesheet('enemy', 'assets/img/invader.png', 44, 36 );
    game.load.spritesheet('player', 'assets/img/nave4_explosión.png', 29, 14);

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
