project.controller('eventdetailController', function ($scope,$sce,$state, $stateParams, $http) {
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
				$http({
			        method: 'GET',
			        url: '/member/' + $scope.eventID.OWNER_ID
				}).then(function (response) {
					if(response.data.length === 0){
						$scope.errorMgs = "no member here."
						console.log($scope.errorMgs);
					}
					else{
						$scope.memberID = response.data[0];
						//$scope.url = $sce.trustAsResourceUrl(response.data[0].VIDEO);
					}
			    }, function (response) {
			        console.log("ERROR");
			    });
			    console.log($sce.trustAsUrl(response.data[0].VIDEO));
			}
	    }, function (response) {
	        console.log("ERROR");
	    });
	}
});
