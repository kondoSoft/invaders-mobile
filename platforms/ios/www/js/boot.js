var bootState = {

    create: function () {
      var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px press_start_2pregular', fill: '#fff'});
        loadingLabel.visible = false;
        //Initial GameSystem (Arcade, P2, Ninja)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Initial Load State
        game.state.start('load');
    }
};
