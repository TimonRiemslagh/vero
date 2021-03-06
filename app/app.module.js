var myApp = angular.module('myApp', ['ngRoute','ngAnimate', 'ngTouch', 'ui.bootstrap', 'wu.masonry']);

myApp.service( 'Albums', [ '$http', '$rootScope', function( $http, $rootScope ) {
  var data = {
    albums: [],
    eventAlbum: {},
    sliderAlbum: {}
  };

  var getData = function() {
    $http.get('https://picasaweb.google.com/data/feed/api/user/krisrpr?alt=json').then(function(res) {
        handleAlbums(res.data);
    }, function(errorRes) {
        console.log(errorRes);
    });
  };

  var handleAlbums = function(d) {

    d.feed.entry.forEach(function(entry) {

      if(entry.title.$t.substr(0,2) === "vc") {
        var summaryObj = "";
        if(entry.summary.$t) {
          summaryObj = JSON.parse(entry.summary.$t);
        }

        var album = {title: entry.title.$t, summary: summaryObj, link: entry.link[0].href};

        if(album.title !== "vcEvents" && album.title !== "vcSlideShow") {
          data.albums.push(album);
        }

        $http.get(album.link).then(function(res) {
            handlePhotos(res.data, album);

        }, function(errorRes) {
            console.log(errorRes);
        });
      }
    });

  };

  var counter = 0;

  var handlePhotos = function(d, object) {
    var phs = [];
    d.feed.entry.forEach(function(entry) {
        phs.push({'url': entry.content.src, 'description': entry.summary.$t});
    });
    object.photos = phs;

    if(object.title == "vcEvents") {
      data.eventAlbum = object;
    }

    else if(object.title == "vcSlideShow") {
      data.sliderAlbum = object;
    }

    else {
      counter++;
    }

    if(counter == data.albums.length && data.eventAlbum && data.sliderAlbum) {

      for(var t = 0; t < data.albums.length; t++) {
        var sub = data.albums[t].title.split('--');
        data.albums[t].elementTitle = sub[1];
        data.albums[t].elementDesc = sub[2];
      }

      localStorage.setItem('albums', JSON.stringify(data));
      $rootScope.$broadcast('updateData');
    }

  };

  var service = {
    getData: getData
  };

  return service;
}])
.controller('MainController', ['Albums', function(Albums) {
  Albums.getData();
}]);
