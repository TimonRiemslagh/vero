myApp.controller('AlbumController', ['$scope', '$routeParams', function($scope, $routeParams) {

  window.scrollTo(0, 0);

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
        $scope.title = album.elementTitle;
      }
    });

    setTimeout(function(){

      $('.imageWrapper').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{enabled:true}
      });

    }, 1);
  }

}]);
