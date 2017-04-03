project.controller('eventcreateController', function ($scope,$http,$state,Map) {
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
    $scope.createsubmit = function(){
        //validate data here
        //console.log($scope.create);
        if($scope.create.gender_male && !$scope.create.gender_female)
        {
            $scope.create.gender = 'Male';
        }
        else if(!$scope.create.gender_male && $scope.create.gender_female)
        {
            $scope.create.gender = 'Female'
        }
        
        if ($scope.create!= undefined) {
            $http({
                method : 'POST',
                url : '/create_event',
                data: $scope.create
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

    $scope.place = {};
    
    $scope.search = function() {
        $scope.apiError = false;
        Map.search($scope.searchPlace)
        .then(
            function(res) { // success
                Map.addMarker(res);
                $scope.place.name = res.name;
                $scope.place.lat = res.geometry.location.lat();
                $scope.place.lng = res.geometry.location.lng();
            },
            function(status) { // error
                $scope.apiError = true;
                $scope.apiStatus = status;
            }
        );
    }
    
    $scope.send = function() {
        alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
    }
    
    Map.init();
});



