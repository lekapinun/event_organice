project.controller('eventeditController', function ($scope,$sce,$state, $stateParams, $http, Map) {
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


    $scope.id= $stateParams.id;
    if($scope.id == undefined)
    {
        $state.go('home.event');
    }
    else
    {
        $http({
            method: 'GET',
            url: '/event/' + $scope.id
        }).then(function (response) {
            if(response.data.length === 0){
                $scope.errorMgs = "no event here."
                console.log($scope.errorMgs);
            }
            else{
                $scope.event = response.data[0];
                console.log($scope.event);
                Map.init_fixed($scope.event.LOCATION_lat,$scope.event.LOCATION_lng);
                Map.addMarker_fixed($scope.event.LOCATION_lat,$scope.event.LOCATION_lng);
                console.log(response);
            }
        }, function (response) {
            console.log("ERROR");
        });
    }


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
        else
        {
            $scope.create.gender = 'None'
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



