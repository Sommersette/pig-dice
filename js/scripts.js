//Buisness Logic
function AllPlayers() {
  this.players = [];
}

function Player(name, score, totalSubtotal) {
  this.name = name;
  this.totalSubtotal = [];
  this.score = [];
};

function rollDie() {
  return Math.floor((Math.random() * 6) + 1);
};

function userTotal(number, array){
  var score = 0;
  array.push(number);
  array.forEach(function(num){
    score += num;
  })
  return score;
}

//UI Logic
function subTotal(array){
  var subTotalResult = 0;
  for (var i = 0; i < array.length; i++) {
    if (parseInt(array[i]) === 1){
      subTotalResult = 0
      $("#turn-total, button[name=roll]").hide();
      $("#zero").show();
    } else {
      subTotalResult += parseInt(array[i]);
    }
  }
  return subTotalResult;
}


$(function(){



  $("input[name=opponent]").click(function(){
    var newGame = new AllPlayers();
    var index = 1;

    $("button[name=start]").click(function(){

      var playerName = $("input[name=name]").val();
      var newPlayer = new Player(playerName, 0, 0);
      var arrayIndex = index - 1;
      newGame.players.push(newPlayer);
      $(".user-name").append('<div class="player' + index + '">' +
                                '<input type="radio" name="roller" value="'  + arrayIndex + '">' +
                                '<h2 class="player' + index + '-name"></h2>' +
                                '<h3 class="userTotal"></h3>' +
                                '<h3 class="userRoundScores"></h3>' +
                             '</div>');
      $(`.player${index}-name`).text(newGame.players[arrayIndex].name); //replace allPlayers with newGame.players
      // $(".user-name").hide();
      $(`.player${index}`).show();
      console.log(newGame);
      index++;
    });

    $("button[name=roll]").click(function(){
      var result = rollDie();
      var index = parseInt($("input[name=roller]:checked").val());
      var turnSubtotal = newGame.players[index].totalSubtotal;
      turnSubtotal.push(result);
      $("#roll-result").text(result);
      var turnTotal = subTotal(turnSubtotal);
      $("#subtotal").text(turnSubtotal);
      $("#turn-total").text("Turn Total: " + turnTotal);
    });

    $("button[name=pass]").click(function() {
      var index = parseInt($("input[name=roller]:checked").val());
      var playerClass = index + 1;
      var turnSubtotal = newGame.players[index].totalSubtotal;
      var turnTotal = subTotal(turnSubtotal);
      var playerScore = newGame.players[index].score;
      var aggregate = userTotal(turnTotal, playerScore);

      $(`.player${playerClass} .userTotal`).text("Total Score: " + aggregate);
      $(`.player${playerClass} .userRoundScores`).text("Turn Scores: " + playerScore);
      $("button[name=roll]").show();
      if (aggregate >= 100) {
        $(".rounds").hide();
        $(".winner").show();
      } else {
        newGame.players[index].totalSubtotal = [];
        $("#turn-total").show();
        $("#zero").hide();
        $("#turn-total, #subtotal, #roll-result").text("");
      }
    });
  });

});
