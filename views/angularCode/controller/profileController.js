project.controller('profileController', function ($scope,$http,$state,$stateParams) {
    //check login
    $http({
        method: 'GET',
        url: '/check',
    }).then(function (response) {
        $scope.my_id = response.data;
        // console.log($scope.my_id );
        if(response.data === 'error')
        {
            $state.go('login');
        }
    }, function (response) {
        console.log("ERROR");
        $state.go('login');
    });

    //console.log($scope.id );
    //console.log($scope.my_id );

    $http({
        method: 'GET',
        url: '/profile/' + $stateParams.id 
    }).then(function (response) {
        $scope.member = response.data[0];
        $scope.following = response.data[1];
        $scope.follower = response.data[2];
        $scope.events = response.data[3];
        $scope.following_status = response.data[4];
        //console.log($scope.following_status)
        if( $scope.my_id == $stateParams.id)
        {
            $scope.IsOwner = true;
        }
        else
        {
            $scope.IsOwner = false;
        }
    }, function (response) {
        console.log("ERROR");
    });


    $scope.followsubmit = function(){
        console.log($stateParams.id );
        $http({
            method: 'GET',
            url: '/follow/' + $stateParams.id 
        }).then(function (response) {
            if(response.data === 'error')
            {
                $scope.errorMgs = "follow error."
                console.log($scope.errorMgs);
            }
            else
            {
                $state.reload();
            }
        }, function (response) {
            console.log("ERROR");
        });
    }

    $scope.unfollowsubmit = function(){
        console.log($stateParams.id );
        $http({
            method: 'GET',
            url: '/unfollow/' + $stateParams.id 
        }).then(function (response) {
            if(response.data === 'error')
            {
                $scope.errorMgs = "unfollow error."
                console.log($scope.errorMgs);
            }
            else
            {
                $state.reload();
            }
        }, function (response) {
            console.log("ERROR");
        });
    }



});