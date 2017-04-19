project.controller('eventlistController', function ($scope,$http,$state,$stateParams) {
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
    $scope.category = $stateParams.category;
    //console.log($stateParams.category);
    if($scope.category == undefined)
    {
        $http({
        method: 'GET',
        url: '/AllEvent'
        }).then(function (response) {
            if(response.data.length === 0){
                $scope.errorMgs = "no event here."
            }
            else{
                $scope.events = response.data[0];
                //console.log($scope.events);
                $scope.categorys = response.data[1];
                //console.log($scope.category);
            }
        }, function (response) {
            console.log("ERROR");
        });        
    }
    else
    {
        //console.log($stateParams);
        //console.log($scope.category);
        $http({
        method: 'GET',
        url: '/AllEvent/' + $scope.category
        }).then(function (response) {
            if(response.data.length === 0){
                $scope.errorMgs = "no event here."
            }
            else{
                $scope.events = response.data[0];
                //console.log($scope.events);
                $scope.categorys = response.data[1];
                //console.log($scope.category);
            }
        }, function (response) {
            console.log("ERROR");
        }); 
        //console.log('/AllEvent/' + $scope.category)
    }    
});
