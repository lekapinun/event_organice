angular.module('app')
  .controller('createeventController', function ($scope,$routeParams,$http,$window) {
      $scope.submit = function(){
        // var dataCreate = {
          // event_name:$scope.create.event_name,
          // category:$scope.create.category,
          // start_date:$scope.create.start_date,
          // start_time:$scope.create.start_time,
          // end_date:$scope.create.end_date,
          // end_time:$scope.create.end_time,
          // min_age:$scope.create.min_age,
          // max_age:$scope.create.max_age,
          // max_seat=$("#max_seat").val();
          // location_lat=$("#location_lat").val();
          // location_lng=$("#location_lng").val();
          // detail=$("#detail").val();
          // ticket_price=$("#ticket_price").val();
          // pic=$("#pic").val();
          // video=$("#video").val();
        // }
        if($scope.create.gendermale != undefined && $scope.create.genderfemale != undefined){
          if($scope.create.gendermale === true && $scope.create.genderfemale === true){
            $scope.create.gender = 'Male&Female';
          }
          else if($scope.create.gendermale === true && $scope.create.genderfemale !== true ){
            $scope.create.gender = 'Male';
          }
          else if($scope.create.gendermale !== true && $scope.create.genderfemale === true ){
            $scope.create.gender = 'Female';
          }
          else{
            $scope.create.gender = 'none';
          }
        }
        $http({
          method: 'POST',
          url: '/create_event',
          data: $scope.create
      }).then(function (response) {
        $window.location.href = '#!/index';
      }, function (response) {
        $scope.errorMgs = "please try agian."
          console.log(response);
      });
      }
});