var menuState = {
  create: function () {
    var background
    //384x640
    // game.add.plugin(Phaser.Plugin.Debug);
    var width = screen.width;
    var height =  screen.height;
    if(width < 414 && width >= 384 && height < 736 && height >= 640){
      background = game.add.image(0, 0, 'background-384x640');

    }else if (width >= 360 && width < 384 && height >= 640 && height < 736 ){
      background = game.add.image(0, 0, 'background-384x640');

    }else if (width >= 320 && width < 360 && height >= 568 && height < 640){
      background = game.add.image(0, 0, 'background-320x568');

    }else {
      background = game.add.image(0, 0, 'background-414x736');

    }

    //start Button
    const start_btn = game.add.button(0, game.world.centerY-38, 'start', ()=>{game.state.start('level1')});
    //High Score Button
    const highScore_btn = game.add.button(0, game.world.centerY+32, 'highScore', ()=>{game.state.start('highScore')});
    // game.add.plugin(Phaser.Plugin.Inspector);

    //Enter Fullscreen
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.input.onDown.add(gofull, this);


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
