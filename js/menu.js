var start;

var menuState = {

    create: function () {
        // var initGame = game.add.text(100 ,game.world.centerY,' Start Game', { font: '40px helvetica', fill: '#fff' });
        // var highScore = game.add.text(100 ,game.world.centerY+100,' High Score', { font: '40px helvetica', fill: '#fff' });

        // game.add.plugin(Phaser.Plugin.Debug);
        game.add.image(0, 0, 'bg-menu');
        start = game.add.image(0, 330, 'start');
        game.add.image(0, 400, 'highScore');
        console.log(start.events.onInputDown);

        // game.add.plugin(Phaser.Plugin.Inspector);

    },

    update: function() {
      // if (game.input.activePointer.isDown) {
      //   game.state.start('level1')
      // }
    }

};






/// Motion Event \\\
// if (window.DeviceMotionEvent == undefined) {
//         //No accelerometer is present. Use buttons.
//         alert("no accelerometer");
//     }
//     else {
//         // alert("accelerometer found");
//         window.addEventListener("devicemotion", (e)=>{
//           console.log(e);
//           alert('X '+e.acceleration.x)
//         }, true);
// }
