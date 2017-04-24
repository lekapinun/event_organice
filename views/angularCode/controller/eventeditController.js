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
                $scope.TIME_START_E = $scope.event.start_date + "T" + $scope.event.start_time;
                $scope.TIME_END_E = $scope.event.end_date + "T" + $scope.event.end_time;
                console.log($scope.event);
                Map.init_fixed($scope.event.LOCATION_lat,$scope.event.LOCATION_lng);
                Map.addMarker_fixed($scope.event.LOCATION_lat,$scope.event.LOCATION_lng);
                console.log(response);
            }
        }, function (response) {
            console.log("ERROR");
        });
    }


    $scope.editsubmit = function(){
        $http({
            method: 'GET',
            url: '/event/' + $scope.id
        }).then(function (response) {
            if(response.data.length === 0){
                $scope.errorMgs = "no event here."
                console.log($scope.errorMgs);
            }
            else{
                console.log($scope.create);
                if( $scope.create.EVENT_NAME == undefined)
                {
                    $scope.create.EVENT_NAME = $scope.event.EVENT_NAME;
                }
                if( $scope.create.CATEGORY == undefined)
                {
                    $scope.create.CATEGORY = $scope.event.CATEGORY;
                }
                if( $scope.create.DETAIL == undefined)
                {
                    $scope.create.DETAIL = $scope.event.DETAIL;
                }
                if( $scope.create.PICTURE == undefined)
                {
                    $scope.create.PICTURE = $scope.event.PICTURE;
                }
                if( $scope.create.VIDEO == undefined)
                {
                    $scope.create.VIDEO = $scope.event.VIDEO;
                }
                if( $scope.create.TIME_START_E == undefined)
                {
                    $scope.create.TIME_START_E = $scope.event.TIME_START_E;
                }
                if( $scope.create.TIME_END_E == undefined)
                {
                    $scope.create.TIME_END_E = $scope.event.TIME_END_E;
                }
                if( $scope.create.CONDITION_MIN_AGE == undefined)
                {
                    $scope.create.CONDITION_MIN_AGE = $scope.event.CONDITION_MIN_AGE;
                }
                if( $scope.create.CONDITION_MAX_AGE == undefined)
                {
                    $scope.create.CONDITION_MAX_AGE = $scope.event.CONDITION_MAX_AGE;
                }
                if( $scope.create.CONDITION_SEX == undefined)
                {
                    $scope.create.CONDITION_SEX = $scope.event.CONDITION_SEX;
                }
                if( $scope.create.MAX_SEAT == undefined)
                {
                    $scope.create.MAX_SEAT = $scope.event.MAX_SEAT;
                }
                if( $scope.create.PRICE == undefined)
                {
                    $scope.create.PRICE = $scope.event.PRICE;
                }
                if( $scope.create.LOCATION_lat == undefined)
                {
                    $scope.create.LOCATION_lat = $scope.event.LOCATION_lat;
                }
                if( $scope.create.LOCATION_lng == undefined)
                {
                    $scope.create.LOCATION_lng = $scope.event.LOCATION_lng;
                }
                
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
                console.log($scope.create);
                if ($scope.create!= undefined) {
                    $http({
                        method : 'POST',
                        url : /edit_event/ + $stateParams.id ,
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
        }, function (response) {
            console.log("ERROR");
        });
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



