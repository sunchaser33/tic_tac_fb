var ticTacRef;
var IDs;
angular.module("TicTac", ["firebase"])
.controller("TicTacCtrl", function ($scope, $firebase) {

  ticTacRef = new Firebase("https://tic-tac-fire.firebaseio.com/");
  $scope.fbLink = $firebase(ticTacRef);


  $scope.fbLink.$on("loaded", function() {
    IDs = $scope.fbRoot.$getIndex();
    if(IDs.length == 0)
    {
      // What???  No Board????  Let's build one.
      $scope.fbLink.$add( { board:['','','','','','','','','','','','','','','',''],
        xTurn:true} );
      $scope.fbLink.$on("change", function() {
        IDs = $scope.fbLink.$getIndex();
        $scope.obj = $scope.fbLink.$child(IDs[0]);
      });
    }
    else
    {
      $scope.obj = $scope.fbLink.$child(IDs[0]);
    }

  });      

  $scope.fbLink.boxes = ['','','','','','','','',''] // array to use for bo
  $scope.fbLink.xTurn = 'v'; // sets first turn
  $scope.fbLink.turnCounter = 1;
  $scope.takeTurn = function (i) {
    if ($scope.fbRoot.boxes[i] == '') { // checks if clicked boxe is ""
      $scope.fbRoot.boxes[i] = $scope.fbRoot.xTurn; // IF it is "" then clicked is xTurn ie 'v'
      if ($scope.fbRoot.boxes[i] == "v") { // 
        $scope.fbRoot.xTurn = "z" //this z can be anything
      } else {
        $scope.fbRoot.xTurn = "v" // if this x is changed first move is x then doesnt alternate
      };
    } else {
      alert('jackass!') // Top IF -- This pops up if we try to click a box already clicked
    };
    if ($scope.fbRoot.turnCounter >= 5) {
      $scope.fbRoot.checkWin();
    };
    $scope.fbRoot.turnCounter++;
  };
  $scope.checkWin = function () {
    $scope.fbRoot.winAry = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    for (var i = 0; i < 8; i++) {
      if ($scope.fbRoot.boxes[$scope.fbRoot.winAry[i][0]] == $scope.fbRoot.boxes[$scope.fbRoot.winAry[i][1]] && $scope.fbRoot.boxes[$scope.fbRoot.winAry[i][0]] == $scope.fbRoot.boxes[$scope.fbRoot.winAry[i][2]] && $scope.fbRoot.boxes[$scope.fbRoot.winAry[i][0]] !== "") {
          $scope.fbRoot.winner = "Winner!";
          break; // What to add to stop being able to click boxes
        }
      else {
          // alert("im checking winAry position:  "+ i)
      };
    };
  }
};