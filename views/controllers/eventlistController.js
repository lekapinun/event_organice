angular.module('app')
  .controller('eventlistController', function ($scope,$routeParams,$http,$window) {
		$http({
	        method: 'GET',
	        url: '/check',
    	}).then(function (response) {
    		console.log(response.data === 'error');
    		if(response.data === 'error'){
    			$scope.errorMgs = "please try agian."
    			$window.location.href = '#!/login';	
    		}
    		else{
    			$window.location.href = '#!/index';	
    		}
	    }, function (response) {
	        console.log("ERROR");
	    });
		$http({
	        method: 'GET',
	        url: '/AllEvent',
    	}).then(function (response) {
    		console.log(response.data);
    		if(response.data.length === 0){
    			$scope.errorMgs = "no event here."
    			console.log($scope.errorMgs);
    		}
    		else{

    			$scope.events = response.data;
                 
    		}
	    }, function (response) {
	        console.log("ERROR");
	    });
});