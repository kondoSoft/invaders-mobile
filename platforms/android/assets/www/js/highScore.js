var highScore = {

    create: function () {
      // var name = prompt('Cual es tu nombre');
      // localStorage.setItem(name)
      this.text = game.add.text(game.world.centerX-100, game.world.centerY, 'High Score')
      this.text.font = 'press_start_2pregular';
      this.text.size = 40;
      this.text.fill = '#fff';

      this.record = game.add.text(game.world.centerX - 50, game.world.centerY + 50, score, {font:'40px arial', align:'center', fill: '#fff'})
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
  game.state.start('menu')

}
