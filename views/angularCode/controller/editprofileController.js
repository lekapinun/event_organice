project.controller('editprofileController', function ($scope,$http,$state) {
    //check login
    $http({
        method: 'GET',
        url: '/check',
    }).then(function (response) {
        if(response.data === 'error'){
            $state.go('login');
        }
        else
        {
            $http({
                method : 'GET',
                url : '/member/' + response.data,
            })
            .then(function (response) {
                if(response.data != 'error'){
                    $scope.memberID = response.data[0];
                    console.log($scope.memberID);
                }

            }, function (response) {
                $scope.msgError = "system down please contact dev"
                console.log(response);
            });
        }
    }, function (response) {
        console.log("ERROR");
        $state.go('login');
    });



    $scope.editprofilesubmit = function(){
        //validate data here
        if ($scope.editprofile!= undefined) {
            $http({
                method : 'POST',
                url : '/editprofile',
                data: $scope.editprofile
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