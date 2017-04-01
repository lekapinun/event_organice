project.controller('eventlistController', function ($scope,$http,$state) {
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
    //get event
    $http({
        method: 'GET',
        url: '/AllEvent',
	}).then(function (response) {
		if(response.data.length === 0){
			$scope.errorMgs = "no event here."
		}
		else{
			$scope.events = response.data;
		}
    }, function (response) {
        console.log("ERROR");
    });
});
