var app = angular.module("mapSearch", []);

app.controller("MainController", ['$scope', function($scope){
  $scope.title = "Map Search";
  $scope.places = [];
  $scope.favorites = [];
  $scope.showResults = false;
  $scope.showSavedResults = false;
  var lat;
  var long;

  var x = document.getElementById("error");
  $scope.location = function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(myPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
  };

  function myPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    initialize();
  }

  function initialize(){
    var service;
    var input = document.getElementById('searchInput').value;
    var pyrmont = new google.maps.LatLng(lat,long);
    var request = {
      location: pyrmont,
      radius: '500',
      query: input
    };
    if(input!=''){
      service = new google.maps.places.PlacesService(document.createElement('div'));
      service.textSearch(request, callback);
    }else{
      $scope.places = [];
      $scope.showResults = false;
      $scope.$apply();
    }
  }

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      $scope.places = results;
      $scope.showResults = true;
      $scope.$apply();
    }
    console.log($scope.places);
  }

  $scope.save = function(place){
    if($scope.favorites.indexOf(place)<0){
      $scope.favorites.push(place);
      $scope.showSavedResults = true;
    }
  }

}]);
