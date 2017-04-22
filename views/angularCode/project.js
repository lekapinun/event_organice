var project = angular.module('project', ['ngRoute', 'ui.router']);

project.config(function ($routeProvider, $stateProvider, $urlRouterProvider, $sceProvider)  {
     $sceProvider.enabled(false);

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
        url: '/eventlist/:category',
        templateUrl: 'angularCode/templates/eventlist.html',
        controller: 'eventlistController'
    },{
        name: 'home.eventdetail',
        url: '/eventdetail/:id',
        templateUrl: 'angularCode/templates/eventdetail.html',
        controller: 'eventdetailController'
    },{
        name: 'home.eventedit',
        url: '/eventedit/:id',
        templateUrl: 'angularCode/templates/eventedit.html',
        controller: 'eventeditController'
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
        url: '/profile/:id',
        templateUrl: 'angularCode/templates/profile.html',
        controller: 'profileController'
    },{
        name: 'home.editprofile',
        url: '/editprofile',
        templateUrl: 'angularCode/templates/editprofile.html',
        controller: 'editprofileController'
    },{
        name: 'home.eventcreate',
        url: '/eventcreate',
        templateUrl: 'angularCode/templates/eventcreate.html',
        controller: 'eventcreateController'
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

project.service('Map', function($q) {

    this.init = function() {
        var options = {
            center: new google.maps.LatLng(18.78775, 98.99313),
            zoom: 15,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }
    
    this.search = function(str) {
        var d = $q.defer();
        this.places.textSearch({query: str}, function(results, status) {
            if (status == 'OK') {
                d.resolve(results[0]);
            }
            else d.reject(status);
        });
        return d.promise;
    }
    
    this.addMarker = function(res) {
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position: res.geometry.location,
            animation: google.maps.Animation.DROP
        });
        this.map.setCenter(res.geometry.location);
    }
    
    this.init_fixed = function(x,y) {
        var options = {
            center: new google.maps.LatLng(x, y),
            zoom: 18,
            disableDefaultUI: true    
        }
        this.map = new google.maps.Map(
            document.getElementById("map"), options
        );
        this.places = new google.maps.places.PlacesService(this.map);
    }

    this.addMarker_fixed = function(x,y) {
        var myLatlng = new google.maps.LatLng(x,y);
        if(this.marker) this.marker.setMap(null);
        this.marker = new google.maps.Marker({
            map: this.map,
            position : myLatlng,
            animation: google.maps.Animation.DROP
        });
    }

});
