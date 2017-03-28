angular.module('app')
  .controller('menuController', function ($scope,$routeParams,$http) {
  		$http({
	        method: 'GET',
	        url: '/test',
    	}).then(function (response) {
        	console.log(response);
	    }, function (response) {
	    	$window.location.href = 'http://localhost:5555/login.html';
	        console.log("ERROR");
	        console.log(response);
	    });

  		$http({
	        method: 'GET',
	        url: '/member',
    	}).then(function (response) {
        	$scope.currentUser = response.data[0];
	    }, function (response) {
	        console.log("ERROR");
	        console.log(response);
	    });

	    $scope.signout = function(){

	    }
});