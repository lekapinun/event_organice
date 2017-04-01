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
});
