myApp.controller('AlbumController', ['$scope', '$routeParams', 'Lightbox', function($scope, $routeParams, Lightbox) {

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
        $scope.title = album.summary.title;
      }
    });

    setTimeout(function(){

      $('.imageWrapper').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery:{enabled:true}
        // other options
      });

      //console.log($('.imageWrapper').children().length);

    }, 1);
  
    //console.log($('.imageWrapper'));

    //console.log($scope.photos);
  }

  $scope.openLightboxModal = function (index) {
    //Lightbox.openModal($scope.photos, index);



  };

  $scope.test = function() {
    console.log('bla');
  }

}]);
