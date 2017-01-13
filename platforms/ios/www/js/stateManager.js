var w = screen.width,
  h = screen.height;

console.log('W', w, 'H', h);

/*
For Fullscreen put this code:

var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;
*/
//create a new Game Object
var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');


//add all states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1);
game.state.add('highScore', highScore)
window.onload = function () {

  game.state.start('boot');

}
