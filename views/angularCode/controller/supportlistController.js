project.controller('supportlistController', function ($scope,$http,$state,$stateParams) {
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
    $scope.type = $stateParams.type;
    console.log($stateParams.type);
    //console.log($stateParams.category);
    if($scope.type == undefined)
    {
        $http({
        method: 'GET',
        url: '/supportlist'
        }).then(function (response) {
            console.log(response.data);
            if(response.data.length === 0){
                $scope.errorMgs = "no event here."
            }
            else{
                $scope.supports = response.data;
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
        url: '/supportlist/' + $scope.type
        }).then(function (response) {
            if(response.data.length === 0){
                $scope.errorMgs = "no event here."
            }
            else{
                $scope.supports = response.data;
                console.log($scope.supports )
            }
        }, function (response) {
            console.log("ERROR");
        }); 
    }    
});
