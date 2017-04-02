angular.module('app')
  .controller('detaileventController', function ($scope,$routeParams,$http,$window) {
  		var id = $routeParams.id
  		$http({
	        method: 'GET',
	        url: '/check'
    	}).then(function (response) {
    		console.log(response.data);
    		if(response.data === 'error'){
    			$scope.errorMgs = "please try agian."
    			$window.location.href = '#!/login';	
    		}
	    }, function (response) {
	        console.log("ERROR");
	    });
	    $http({
	        method: 'GET',
	        url: '/event/' + id
	        // url: '/event/1'
    	}).then(function (response) {
    		console.log(response.data[0].DETAIL);
    		if(response.data.length === 0){
    			$scope.errorMgs = "no event here."
    			console.log($scope.errorMgs);
    		}
    		else{
    			$scope.eventID = response.data[0];
    		}
	    }, function (response) {
	        console.log("ERROR");
	    });
});
