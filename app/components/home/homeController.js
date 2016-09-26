myApp.controller('HomeController', ['$scope', 'Albums', '$location',  function($scope, Albums, $location) {

  $scope.data = JSON.parse(localStorage.getItem('albums'));
  var sliderphotosnumber = 5;

  while(!$scope.data) {
    $scope.data = JSON.parse(localStorage.getItem('albums'));
  }

  $scope.$on('updateData', function() {
    console.log('update data');
    $scope.data = JSON.parse(localStorage.getItem('albums'));
  });

  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function(url) {
    slides.push({
      image: url,
      text: "",
      id: currIndex++
    });
  };

  var handleGrid = function() {
    $scope.albumSubSets = [];

    if($scope.data.albums) {

      var subsets = Math.floor($scope.data.albums.length/4);
      var subsetsrest = $scope.data.albums.length % 4;

      for(var t = 0; t < subsets; t++) {
        var albumSubSet = $scope.data.albums.slice((t*4), (t*4)+4);
        $scope.albumSubSets.push(albumSubSet);
      }

      var finalSubSet = $scope.data.albums.slice($scope.data.albums.length - subsetsrest, $scope.data.albums.length);
      $scope.albumSubSets.push(finalSubSet);

    }
  };

  var loadEvent = function() {

    $scope.eventAlbum = $scope.data.eventAlbum;

    if($scope.eventAlbum) {

      console.log($scope.eventAlbum);

      $scope.upcomming = {};
      $scope.upcomming.url = $scope.eventAlbum.photos[0].url;
      $scope.upcomming.desc = JSON.parse($scope.eventAlbum.photos[0].description);
    }

  };

  var loadSlider = function() {
    $scope.sliderAlbum = $scope.data.sliderAlbum;
    if($scope.sliderAlbum) {

      console.log($scope.sliderAlbum);

      for(var t = 0; t < sliderphotosnumber; t++) {
          $scope.addSlide($scope.sliderAlbum.photos[t].url);
      }
    }
  };

  if($scope.data) {
    loadEvent();
    loadSlider();
    handleGrid();
  }

  $scope.showAlbum = function(album) {
    $location.path('/album/' + album);
  };

}]);
