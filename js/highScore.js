var highScore = {

    create: function () {
      var text = game.add.text(game.world.centerX-100, game.world.centerY, 'High Score', {font:'40px arial', align:'center', fill: '#fff'})
      var record = game.add.text(game.world.centerX - 50, game.world.centerY + 50, score, {font:'40px arial', align:'center', fill: '#fff'})
      this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },

    update: function () {
      if (game.input.activePointer.isDown || this.enter.isDown) {
        restart();
      }
    }

}

function restart () {
  score = 0;
  game.state.start('level1')

}
