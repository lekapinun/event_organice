angular.module('app')
	.controller('loginController',function ($scope,$routeParams,$http,$rootScope,$location,$window) {
		// $rootScope.userLogin = undefined;
		$http({
	        method: 'GET',
	        url: '/check',
    	}).then(function (response) {
    		if(response.data === 'error'){
    			$scope.errorMgs = "please try agian."
    		}
    		else{
    			$window.location.href = '#!/index';	
    		}
	    }, function (response) {
	        console.log("ERROR");
	    });

	    $scope.login = function(){
	    	var datalogin = {
	    		email:$scope.login.email,
	    		pass:$scope.login.password
	    	}
	    	$http({
	        method: 'POST',
	        url: '/login',
	        data: datalogin
    	}).then(function (response) {
    		$window.location.href = '#!/index';
	    }, function (response) {
	    	$scope.errorMgs = "please try agian."
	        console.log(response);
	    });
	    }
  		
});