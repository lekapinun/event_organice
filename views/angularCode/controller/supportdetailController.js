project.controller('supportdetailController', function ($scope,$sce,$state, $stateParams, $http, Map) {
	//check login 
	$http({
        method: 'GET',
        url: '/check',
    }).then(function (response) {
        if(response.data === 'error'){
            $state.go('login');
        }
    }, function (response) {
    	console.log("ERROR");
        $state.go('login');
    });
    
    //get detail by id
	$scope.id= $stateParams.id;
	console.log($stateParams);
	if($scope.id == undefined){
		$state.go('home.event');
	}
	else{
		$http({
	        method: 'GET',
	        url: '/supportdetail/' + $scope.id
		}).then(function (response) {
			if(response.data === 'error'){
				$scope.errorMgs = "can't join."
				console.log($scope.errorMgs);
			}
			else{
				$scope.support = response.data[0];
				$scope.other = response.data[1];
				Map.init_fixed($scope.support.location_lat,$scope.support.location_lng);
				Map.addMarker_fixed($scope.support.location_lat,$scope.support.location_lng);
				console.log($scope.support);
			}
	    }, function (response) {
	        console.log("ERROR");
	    });
	}

});
