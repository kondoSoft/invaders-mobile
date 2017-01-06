var highScore = {

    create: function () {
      if (score > 0) {
        let name = prompt('Enter Your Name');
        localStorage.setItem(name, score);
      }
      this.text = game.add.text(game.world.centerX - 135 , 20, 'High Score')
      this.text.font = 'press_start_2pregular';
      this.text.fill = '#fff';
      Object.keys(localStorage).map((name, index)=>{
        game.add.text(15, 80 + (index * 30), name, {font:'15px press_start_2pregular', align:'center', fill: '#fff'})
        game.add.text(game.world.centerX+50, 80 + (index * 30), localStorage[name], {font:'15px press_start_2pregular', align:'center', fill: '#fff'})
      })

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
