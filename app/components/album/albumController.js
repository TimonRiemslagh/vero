myApp.controller('AlbumController', ['$scope', '$routeParams', 'Lightbox', function($scope, $routeParams, Lightbox) {

  var albumTitle = $routeParams.album;
  $scope.photosSubSets = [];
  var data = JSON.parse(localStorage.getItem('albums'));

  $scope.$on('updateData', function() {
    console.log('update data');
    data = JSON.parse(localStorage.getItem('albums'));
  });

  if(data.albums) {

    data.albums.forEach(function(album) {
      if(album.title == albumTitle) {
        $scope.photos = album.photos;
        $scope.title = album.summary.title;
      }
    });
  }

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.photos, index);
  };

  $scope.test = function() {
    console.log('bla');
  }

}]);