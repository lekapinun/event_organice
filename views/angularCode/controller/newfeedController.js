project.controller('newfeedController', function ($scope,$http,$state) {
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
        url: '/newsfeed'
        }).then(function (response) {
        if(response.data.length === 0)
        {
            $scope.errorMgs = "no event here."
        }
        else
        {
            $scope.events = response.data[1];
        }
    }, function (response) {
        console.log("ERROR");
    }); 
});
