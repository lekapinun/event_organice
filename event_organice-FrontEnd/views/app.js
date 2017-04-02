var app = angular.module('app',['ngRoute']);
app.config(['$routeProvider','$httpProvider' ,function ($routeProvider,$httpProvider){
	$routeProvider
		.when('/',{
			templateUrl:'templates/signin.html',
			controller: 'loginController'
		})
		.when('/index',{
			templateUrl:'templates/eventList.html',
			controller: 'eventlistController'
		})
		.when('/detail/:id',{
			templateUrl:'templates/detailEvent.html',
			controller: 'detaileventController'
		})
		.when('/event/:category',{
			templateUrl:'templates/eventListCategory.html',
			controller: 'eventlistcategoryController'
		})
		.when('/create',{
			templateUrl:'templates/createEvent.html',
			controller: 'createeventController'
		})
		.otherwise({
			redirectTo:'/'
		});
}]);
