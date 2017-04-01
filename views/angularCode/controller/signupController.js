project.controller('signupController', function ($scope,$http,$state) {
    $scope.signupsubmit = function(){
        //validate email & password here
        if ($scope.signup!= undefined) {
            $http({
                method : 'POST',
                url : '/signup',
                data: $scope.signup
            })
            .then(function (response) {
                if(response.data === 'error'){
                    $scope.msgError = "Don't have space in this form,please try agian."
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
            $scope.msgError = 'please enter form';
        }
        
    }
});
