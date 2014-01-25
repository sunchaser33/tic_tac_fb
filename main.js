var ticTacRef;
var IDs;
angular.module("TicTac", ["firebase"])
.controller("TicTacCtrl", function ($scope, $firebase) {

  ticTacRef = new Firebase("https://tic-tac-fire.firebaseio.com/");
  $scope.fbLink = $firebase(ticTacRef); // .fbLink w/ all fb 


  $scope.fbLink.$on("loaded", function() {
    IDs = $scope.fbLink.$getIndex();
    if(IDs.length == 0)
    {
      // What???  No Board????  Let's build one.
      $scope.fbLink.$add({ 
        boxes: ['','','','','','','','',''],
        xTurn: 'v',
        turnCounter: 1,
        // winner: '',
      });
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

  
  $scope.takeTurn = function (i) {
    if ($scope.obj.boxes[i] == '') { // checks if clicked boxe is ""
      $scope.obj.boxes[i] = $scope.obj.xTurn; // IF it is "" then clicked is xTurn ie 'v'
      if ($scope.obj.boxes[i] == "v") { // 
        $scope.obj.xTurn = "z" //this z can be anything
      } else {
        $scope.obj.xTurn = "v" // if this x is changed first move is x then doesnt alternate
      };
    } else {
      alert('jackass!') // Top IF -- This pops up if we try to click a box already clicked
    };
    if ($scope.obj.turnCounter >= 5) {
      $scope.obj.checkWin();
    };
    $scope.obj.turnCounter++;
    $scope.obj.$save()
  };
  $scope.checkWin = function () {
    $scope.obj.winAry = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    for (var i = 0; i < 8; i++) {
      if ($scope.obj.boxes[$scope.obj.winAry[i][0]] == $scope.obj.boxes[$scope.obj.winAry[i][1]] && $scope.obj.boxes[$scope.obj.winAry[i][0]] == $scope.obj.boxes[$scope.obj.winAry[i][2]] && $scope.obj.boxes[$scope.obj.winAry[i][0]] !== "") {
          $scope.obj.winner = "Winner!";
          break; // What to add to stop being able to click boxes
        }
      else {
          // alert("im checking winAry position:  "+ i)
      };
    };
  }
});