'use strict';

angular.module('App.controllers')
.controller('SelectLocationCtrl', 
['$scope', 'storage', 'storageKeys', 'gmaps', '$ionicNavBarDelegate', 'database',	
function ($scope, storage, storageKeys, gmaps, $ionicNavBarDelegate, db) {
	$scope.myLocation = storage.get(storageKeys.locationKey);
	if(!$scope.myLocation){
		$scope.myLocation =  {automatic: true, location:{name: 'Unknown Location'}};
	}
	storage.bind($scope,'myLocation', {storeName: storageKeys.locationKey});



	$scope.goBack = function() {
	    $ionicNavBarDelegate.back();
	};
	function automaticLocation(){
		gmaps.nearbyStores().then(function(results){
			// console.log(results.data.results);
			$scope.locations = results.data.results;
			if($scope.myLocation.automatic){
				$scope.myLocation.location= results.data.results[0];
				$scope.store = db.store($scope.myLocation.location);	
			}
			
		}, function(e){
			console.log(e);
		});	
	}
	$scope.automaticLocation = automaticLocation;
	var timer;
	automaticLocation();
	
	


	$scope.setLocation = function(location){
		$scope.myLocation = {location: location, mode: 'manual'};
		$scope.store = db.store($scope.myLocation.location);
		window.setTimeout($scope.goBack, 3);
	};
}]);
