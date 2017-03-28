var app = angular.module('app',['ngRoute']);
app.config(['$routeProvider','$httpProvider' ,function ($routeProvider,$httpProvider){
	$routeProvider
		.when('/',{
			templateUrl:'templates/home.html',
			controller: 'loginController'
		})
		.when('/index',{
			templateUrl:'templates/eventList.html',
			controller: 'eventlistController'
		})
		// .when('/detail',{
		.when('/detail/:id',{
			templateUrl:'templates/detailEvent.html',
			controller: 'detaileventController'
		})
		.otherwise({
			redirectTo:'/'
		});
}]);
