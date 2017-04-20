project.controller('eventdetailController', function ($scope,$sce,$state, $stateParams, $http, Map) {
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
	        url: '/event/' + $scope.id
		}).then(function (response) {
			if(response.data.length === 0){
				$scope.errorMgs = "no event here."
				console.log($scope.errorMgs);
			}
			else{
				$scope.eventID = response.data[0];
				$scope.memberID = response.data[1];
				$scope.otherID = response.data[2];
				$scope.otherEID = response.data[3];
				Map.init_fixed($scope.eventID.LOCATION_lat,$scope.eventID.LOCATION_lng);
				Map.addMarker_fixed($scope.eventID.LOCATION_lat,$scope.eventID.LOCATION_lng);
				console.log(response);
			}
	    }, function (response) {
	        console.log("ERROR");
	    });
	}
});