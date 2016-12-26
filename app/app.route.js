myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

        when('/', {
          templateUrl: 'app/components/home/homeView.html', controller: 'HomeController'
        }).

        when('/album/:album', {
            templateUrl: 'app/components/album/albumView.html', controller: 'AlbumController'
        }).

        otherwise({
            redirectTo: '/'
        });

}]);
