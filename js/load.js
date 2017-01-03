var loadState = {

    preload: function () {

        /*
        Load all game assets
        Place your load bar, some messages.
        In this case of loading, only text is placed...
        */

        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#fff'});

        //Load your images, spritesheets, bitmaps...
        game.load.image('boiler-logo', 'assets/img/boilerplate-logo.png');
        game.load.image('kondo-logo', 'assets/img/KONDO-LOGO-copy.png');
        game.load.image('ship', 'assets/img/nave 4.png');
        game.load.image('bullet', 'assets/img/new_bullet.png');
        game.load.image('starfield', 'assets/img/stars.jpg');
        game.load.image('bg-menu', 'assets/img/Inicio.png');
        game.load.image('start', 'assets/img/start.png');
        game.load.image('highScore', 'assets/img/hight score.png');

        game.load.spritesheet('bala', 'assets/img/balas/balas_1.png', 15, 15);
        game.load.spritesheet('balaEnemigo', 'assets/img/balas/balas_4.png', 15, 15);
        game.load.spritesheet('enemy', 'assets/img/invader.png', 45, 36 );

        //Load your sounds, efx, music...
        //Example: game.load.audio('rockas', 'assets/snd/rockas.wav');
        game.load.audio('laser1', 'assets/sound/laser4.wav');
        game.load.audio('laser2', 'assets/sound/laser5.wav');
        game.load.audio('music', 'assets/sound/high tech lab.ogg');
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
