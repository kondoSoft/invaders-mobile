var w = screen.width,
  h = screen.height;

console.log('W', w, 'H', h);

// alert('W: ' + w + " " + 'H: ' + h)
/*
For Fullscreen put this code:

var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;
*/

var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1);
game.state.add('highScore', highScore)

game.state.start('boot');
