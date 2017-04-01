project.controller('homeController', function ($scope,$http,$state) {
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
    //logout function
    $scope.logout = function(){
		$http({
			method: 'GET',
			url: '/logout',
		}).then(function (response) {
			$state.go('login');
		}, function (response) {
			alert("you can't logout until 100th floor must be clear.");
		});
    }
});
