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
    $http({
        method: 'GET',
        url: '/member'
    }).then(function (response) {
        if(response.data.length === 0)
        {
            console.log('fail!');
        }
        else
        {
            $scope.member = response.data[0];
        }
    }, function (response) {
        console.log("ERROR");
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
