myApp.controller('HomeController', ['$scope', 'Albums', '$location',  function($scope, Albums, $location) {

  $scope.data = JSON.parse(localStorage.getItem('albums'));

  console.log($(window).width());

  $scope.$on('updateData', function() {
    console.log('update data');
    $scope.data = JSON.parse(localStorage.getItem('albums'));
    $scope.loadEvent();
    $scope.loadSlider();
    $scope.albums = $scope.data.albums;
  });

  $scope.myInterval = 2000;
  $scope.noWrapSlides = false;
  $scope.active = 0;

  $scope.loadEvent = function() {

    $scope.eventAlbum = $scope.data.eventAlbum;

    if($scope.eventAlbum) {

      $scope.upcomming = {};
      $scope.upcomming.url = $scope.eventAlbum.photos[0].url;
      $scope.upcomming.desc = JSON.parse($scope.eventAlbum.photos[0].description);

    }

  };

  $scope.loadSlider = function() {
    var currIndex = 0;
    $scope.slides = [];
    $scope.sliderAlbum = $scope.data.sliderAlbum;
    if($scope.sliderAlbum) {
      for(var t = 0; t < $scope.sliderAlbum.photos.length; t++) {
        $scope.slides.push({
          image: $scope.sliderAlbum.photos[t].url,
          text: "",
          id: currIndex++
        });
      }
    }
  };

  if($scope.data) {
    $scope.loadEvent();
    $scope.loadSlider();
    $scope.albums = $scope.data.albums;

  }

  $scope.showAlbum = function(album) {
    $location.path('/album/' + album);
  };

}]);
