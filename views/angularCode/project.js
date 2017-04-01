var project = angular.module('project', ['ngRoute', 'ui.router']);

project.config(function ($routeProvider, $stateProvider, $urlRouterProvider) {

    var states = [{
        name: 'login',
        url: '/',
        templateUrl: 'angularCode/templates/login.html',
        controller: 'loginController'
    },{
        abstract: true,
        name: 'home',
        url: '/home',
        templateUrl: 'angularCode/templates/home.html',
        controller: 'homeController'
    },{
        name: 'home.event',
        url: '/eventlist',
        templateUrl: 'angularCode/templates/eventlist.html',
        controller: 'eventlistController'
    },{
        name: 'home.eventdetail',
        url: '/eventdetail/:id',
        templateUrl: 'angularCode/templates/eventdetail.html',
        controller: 'eventdetailController'
        // params: {
        //     'id' : null
        // }
    }];

    // Loop over the state definitions and register them
    states.forEach(function (state) {
        $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/');
});
