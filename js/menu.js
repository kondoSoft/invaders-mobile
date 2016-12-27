var menuState = {

    create: function () {
        // game.add.plugin(Phaser.Plugin.Debug);
        game.add.image(0, 0, 'bg-menu');

        //start Button
        const start_btn = game.add.button(0, game.world.centerY-38, 'start', ()=>{game.state.start('level1')});
        //High Score Button
        const highScore_btn = game.add.button(0, game.world.centerY+32, 'highScore', ()=>{game.state.start('highScore')});
        // game.add.plugin(Phaser.Plugin.Inspector);

        //Enter Fullscreen
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.input.onDown.add(gofull, this);


    },

    update: function() {
      // if (start.events.onInputDown) {
      //   game.state.start('level1')
      // }
    }
};


function gofull() {
  if (!game.scale.isFullScreen) {
    game.scale.startFullScreen(false);
  }
}



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
