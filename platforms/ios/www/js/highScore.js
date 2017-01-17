//array with score data
var record = (!JSON.parse(localStorage.getItem('data')))? [] : JSON.parse(localStorage.getItem('data')).scores ;

console.log(record);
var highScore = {
  create: function () {
    //Local storage
    if (score > 0) {
      let name = getName();
      let datos = {};
      datos[name] = score;
      record.push(datos)
      record = orderRecord(record)
      if(record.length > 10) record.pop();
      const dataObj = {'scores': record};
      localStorage.setItem('data', JSON.stringify(dataObj));
    }
    var data = (!JSON.parse(localStorage.getItem('data')))? [] : JSON.parse(localStorage.getItem('data')).scores ;
    //Print scores table
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var names = Object.keys(data[i])
        game.add.text(15, 80 + (i * 50), names[0], {font:'15px press_start_2pregular', align:'center', fill: '#fff'})
        game.add.text(game.world.centerX+50, 80 + (i * 50), data[i][names[0]], {font:'15px press_start_2pregular', align:'center', fill: '#fff'})
      }
    }
    //High Score Title
    this.text = game.add.text(game.world.centerX - 135 , 20, 'High Score')
    this.text.font = 'press_start_2pregular';
    this.text.fill = '#fff';
    //Enter Key
    this.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  },

  update: function () {
    //event listener
    if (game.input.activePointer.isDown || this.enter.isDown) {
      restart();
    }
  }

}
// return to menu main screen
function restart () {
  score = 0;
  game.state.start('menu')
  waveCount = 1;

}
// get User name
function getName() {
  let name = prompt('Enter Your Name');
  name = (name == null || name == '' )? getName(): name;
  return name;
}
// 
function orderRecord(data){
	var arrScores = []
	var arrNames = []
	var mantenerScore;
	var mantenerNames;
	var orderedScores = [];
	var orderedNames = [];
  var result = []
	data.map((item)=>{
		var name = Object.keys(item)
		arrNames.push(name[0])
		arrScores.push(item[name[0]])
	})
	function orderArrays(){
		for( var i = 0; i < arrScores.length - 1; i++ ){
			if(arrScores[i] > arrScores[i+1]){
				mantenerScore = arrScores[i];
				mantenerNames = arrNames[i];
				arrScores[i] = arrScores[i+1];
				arrNames[i] = arrNames[i+1];
				arrScores[i+1] = mantenerScore;
				arrNames[i+1] = mantenerNames;
			}
		}
	}
	while(arrScores.length > 0){
		orderArrays()
		orderedScores.push(arrScores.pop())
		orderedNames.push(arrNames.pop())
	}
  orderedNames.forEach((item, i)=>{
    var obj_scores = {}
    obj_scores[item] = orderedScores[i];
    result.push(obj_scores);
  })
  return result;
}
