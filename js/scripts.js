//Buisness Logic
function Player(name, score) {
  this.name = name;
  this.totalSubtotal = [];
  this.score = [];
};

var allPlayers = [];

function rollDie() {
  return Math.floor((Math.random() * 6) + 1);
};

function subTotal(array){
  var subTotalResult = 0;
  for (var i = 0; i < array.length; i++) {
    if (parseInt(array[i]) === 1){
      subTotalResult = 0
      $("#turn-total").hide();
      $("#zero").show();
    } else {
      subTotalResult += parseInt(array[i]);
    }
  }
  return subTotalResult;
}

function userTotal(number, array){
  array.push(number);
  forEach(array)
}

//UI Logic
$(function(){
  $("button[name=start]").click(function(){
    var playerName = $("input[name=name]").val();
    var newPlayer = new Player(playerName, 0);
    allPlayers.push(newPlayer);
    $("#player1-name").text(newPlayer.name);
    $(".user-name").hide();
    $(".player1").show();

  });

  $("button[name=roll]").click(function(){
    var result = rollDie();
    var turnSubtotal = allPlayers[0].totalSubtotal;
    var turnTotal = subTotal(turnSubtotal));
    $("#roll-result").text(result);
    turnSubtotal.push(result);
    $("#subtotal").text(turnSubtotal);
    $("#turn-total").text("Turn Total: " + turnTotal);
  });


});
