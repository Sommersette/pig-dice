//Buisness Logic
// function AllPlayers(player) {
//   this.players = [player];
// }

function Player(name, score, totalSubtotal) {
  this.name = name;
  this.totalSubtotal = [];
  this.score = [];
};

var allPlayers = [];


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

// function increment(index) {
//   index++;
//   return index;
// }

$(function(){
  // var newGame = new AllPlayers(player);
  var index = 0;

  // $("input[name=opponent]").click(function(){
  //   console.log(newGame);
  // });

  $("button[name=start]").click(function(){

    var playerName = $("input[name=name]").val();
    var newPlayer = new Player(playerName, 0, 0);
    allPlayers.push(newPlayer);
    $(".user-name").append('<div class="player' + index + '">' +
                              '<h2 class="player' + index + '-name"></h2>' +
                              '<h3 class="userTotal"></h3>' +
                              '<h3 class="userRoundScores"></h3>' +
                              '<button type="button" name="roll" class="btn btn-primary">Roll</button>' +
                              '<button class="btn btn-sm btn-danger" type="button" name="pass">Pass/Hold</button>' +
                           '</div>');
    $(`.player${index}-name`).text(allPlayers[index].name);
    // $(".user-name").hide();
    $(`.player${index}`).show();

    $("button[name=roll]").last().click(function(){
      var result = rollDie();
      var turnSubtotal = allPlayers[index].totalSubtotal;
      turnSubtotal.push(result);
      $("#roll-result").text(result);
      var turnTotal = subTotal(turnSubtotal);
      $("#subtotal").text(turnSubtotal);
      $("#turn-total").text("Turn Total: " + turnTotal);
    });

    $("button[name=pass]").last().click(function() {
      var turnSubtotal = allPlayers[index].totalSubtotal;
      var turnTotal = subTotal(turnSubtotal);
      var playerScore = allPlayers[index].score;
      var aggregate = userTotal(turnTotal, playerScore);

      $(".userTotal").text("Total Score: " + aggregate);
      $(".userRoundScores").text("Turn Scores: " + playerScore);
      $("button[name=roll]").show();
      if (aggregate >= 100) {
        $(".rounds").hide();
        $(".winner").show();
      } else {
        allPlayers[index].totalSubtotal = [];
        $("#turn-total").show();
        $("#zero").hide();
        $("#turn-total, #subtotal, #roll-result").text("");
      }
    });

    // increment(index);
  });


});
