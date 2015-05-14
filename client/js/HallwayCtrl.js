angular.module('drawTogether.hall', [])
.controller('HallwayCtrl', ['User','$scope', '$location', '$http', function(User, $scope, $location, $http) {
	
	if (!User.name) { $location.path('/index'); }
	
	var _this = this;
	var socket = User.socket;
	getRooms();
	
  this.enterRoom = function(room) {
  	User.setRoom(room);
  	$location.path('/room/' + encodeURIComponent(room));
  }

	this.createRoom = function(room) {
		room = cleanInput(room);
  	User.setRoom(room);
		$http.post('/newRoom', {room: room}).success(function(data, status) {
			$location.path('/room/' + encodeURIComponent(room));
	  })
	  .error(function(data, status) {
	    console.log("Could not post room", status);
	  });
	}

	function cleanInput (input) {
	  return $('<div/>').text(input).text();
	}

	function getRooms() {
		$http.get('/hallway').success(function(data, status) {
	    _this.rooms = data;
	  })
	  .error(function(data, status) {
	    console.log("Could not get rooms");
	  });
	}

	socket.on('deleted room', function(room) {
		getRooms();
	})

}]);

