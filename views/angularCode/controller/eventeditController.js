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
                if( $scope.create.event_name == undefined)
                {
                    $scope.create.event_name = $scope.event.EVENT_NAME;
                }
                if( $scope.create.category == undefined)
                {
                    $scope.create.category = $scope.event.CATEGORY;
                }
                if( $scope.create.detail == undefined)
                {
                    $scope.create.detail = $scope.event.DETAIL;
                }
                if( $scope.create.pic == undefined)
                {
                    $scope.create.pic = $scope.event.PICTURE;
                }
                if( $scope.create.video == undefined)
                {
                    $scope.create.video = $scope.event.VIDEO;
                }
                if( $scope.create.start_time == undefined)
                {
                    $scope.create.start_time = $scope.TIME_START_E + '.000Z';
                }
                if( $scope.create.end_time == undefined)
                {
                    $scope.create.end_time = $scope.TIME_END_E + '.000Z';
                }
                if( $scope.create.min_age == undefined)
                {
                    $scope.create.min_age = $scope.event.CONDITION_MIN_AGE;
                }
                if( $scope.create.max_age == undefined)
                {
                    $scope.create.max_age = $scope.event.CONDITION_MAX_AGE;
                }
                if( $scope.create.gender == undefined)
                {
                    $scope.create.gender = $scope.event.CONDITION_SEX;
                }
                if( $scope.create.max_seat == undefined)
                {
                    $scope.create.max_seat = $scope.event.MAX_SEAT;
                }
                if( $scope.create.ticket_price == undefined)
                {
                    $scope.create.ticket_price = $scope.event.PRICE;
                }
                if( $scope.create.location_lat == undefined)
                {
                    $scope.create.location_lat = $scope.event.LOCATION_lat;
                }
                if( $scope.create.location_lng == undefined)
                {
                    $scope.create.location_lng = $scope.event.LOCATION_lng;
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
                            $state.go('home.eventdetail', { "id" : $stateParams.id });
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



