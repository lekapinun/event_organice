angular.module('app')
  .controller('menuController', function ($scope,$routeParams,$http,$window) {
  		$http({
	        method: 'GET',
	        url: '/check',
    	}).then(function (response) {
    		console.log(response.data === 'error');
    		if(response.data === 'error'){
    			$scope.errorMgs = "please try agian."
    			$window.location.href = '#!/login';	
    		}
	    }, function (response) {
	        console.log("ERROR");
	    });

  		$http({
	        method: 'GET',
	        url: '/member',
    	}).then(function (response) {
          console.log(response.data[0].USERNAME);
        	$scope.currentUser = response.data[0];
	    }, function (response) {
	        console.log("ERROR");
	        console.log(response);
	    });

      $scope.logout = function(){
          $http({
              method: 'GET',
              url: '/logout',
          }).then(function (response) {
              $window.location.href = '#!/login'; 
          }, function (response) {
              console.log("ERROR");
          });
      }
});