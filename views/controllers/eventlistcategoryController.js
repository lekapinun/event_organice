angular.module('app')
  .controller('eventlistcategoryController', function ($scope,$routeParams,$http,$window) {
      var category = $routeParams.category
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
    			$window.location.href = '#!/event/'+category;	
    		}
	    }, function (response) {
	        console.log("ERROR");
	    });

      $http({
          method: 'GET',
          url: '/AllEvent/'+category,
      }).then(function (response) {
        console.log(response);
        $scope.eventsCat = response.data;
      }, function (response) {
          console.log("ERROR");
          console.log(response);
      });
});