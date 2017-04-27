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
			if(response.data === 'error'){
				$scope.errorMgs = "can't join."
				console.log($scope.errorMgs);
			}
			else{
				$scope.eventID = response.data[0];
				$scope.memberID = response.data[1];
				$scope.ISowner = response.data[2];
				$scope.otherID = response.data[3];
				$scope.otherEID = response.data[4];
				$scope.joined = response.data[5];
				console.log($scope.joined);
				Map.init_fixed($scope.eventID.LOCATION_lat,$scope.eventID.LOCATION_lng);
				Map.addMarker_fixed($scope.eventID.LOCATION_lat,$scope.eventID.LOCATION_lng);
				console.log(response);
			}
	    }, function (response) {
	        console.log("ERROR");
	    });
	}

	$scope.joinsubmit = function(){
		$http({
	        method: 'GET',
	        url: '/join/' +  $scope.id
		}).then(function (response) {
			if(response.data.length === 0){
				$scope.errorMgs = "cant join."
				console.log($scope.errorMgs);
			}
			else
			{
				console.log('join suscuess');
				$state.reload();
			}
		}, function (response) {
	        console.log("ERROR");
	    });
	}
});
