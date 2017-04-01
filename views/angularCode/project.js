var project = angular.module('project', ['ngRoute', 'ui.router']);

project.config(function ($routeProvider, $stateProvider, $urlRouterProvider) {

    var states = [{
        name: 'signup',
        url: '/signup',
        templateUrl: 'angularCode/templates/signup.html',
        controller: 'signupController'
    },{
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
        name: 'home.feed',
        url: '/newfeed',
        templateUrl: 'angularCode/templates/newfeed.html',
        controller: 'newfeedController'
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
    },{
        name: 'home.friends',
        url: '/friendslist',
        templateUrl: 'angularCode/templates/friendslist.html',
        controller: 'friendslistController'
    },{
        name: 'home.contact',
        url: '/contact',
        templateUrl: 'angularCode/templates/contact.html',
    },{
        name: 'home.profile',
        url: '/profile',
        templateUrl: 'angularCode/templates/profile.html',
        controller: 'profileController'
    },{
        name: 'home.editprofile',
        url: '/editprofile',
        templateUrl: 'angularCode/templates/editprofile.html',
        controller: 'editprofileController'
    },{
        name: 'home.managedevent',
        url: '/managed-event',
        templateUrl: 'angularCode/templates/managedevent.html',
        controller: 'managedeventController'
    }];

    // Loop over the state definitions and register them
    states.forEach(function (state) {
        $stateProvider.state(state);
    });

    $urlRouterProvider.otherwise('/');
});
