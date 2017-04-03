project.controller('loginController', function ($scope,$http,$state) {
    $http({
        method: 'GET',
        url: '/check',
    }).then(function (response) {
        if(response.data === 'error'){
            $state.go('login');
        }
        else{
            $state.go('home.event');
        }
    }, function (response) {
        $state.go('login');
    });
    $scope.loginsubmit = function(){
        //validate email & password here
        if ($scope.login!= undefined) {
            $http({
                method : 'POST',
                url : '/login',
                data: $scope.login
            })
            .then(function (response) {
                if(response.data === 'error'){
                    $scope.msgError = "wrong email & password,please try agian."
                }
                else{
                    $state.go('home.event');
                }
                
            }, function (response) {
                $scope.msgError = "system down please contact dev"
                console.log(response);
            });
        }
        else{
            $scope.msgError = 'please enter email & password';
        }
    }
});