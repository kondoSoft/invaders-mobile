var w = screen.width,
  h = screen.height;

console.log('W', w, 'H', h);

/*
For Fullscreen put this code:

var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;
*/
//create a new Game

const esChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
var renderMethod = Phaser.AUTO

if(esChrome){
  renderMethod = Phaser.CANVAS
}

var game = new Phaser.Game(w, h, renderMethod, 'gameContainer');


//add all states
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1);
game.state.add('highScore', highScore)
window.onload = function () {

  game.state.start('boot');

}
