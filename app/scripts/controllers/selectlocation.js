'use strict';

angular.module('App.controllers')
.controller('SelectLocationCtrl', 
['$scope', 'storage', 'storageKeys', 'gmaps', '$ionicNavBarDelegate',
function ($scope, storage, storageKeys, gmaps, $ionicNavBarDelegate) {
	$scope.myLocation = storage.get(storageKeys.locationKey);
	if(!$scope.myLocation) $scope.myLocation =  {automatic: true, location:{name: 'Unknown Location'}}
	storage.bind($scope,'myLocation', {storeName: storageKeys.locationKey});
	$scope.goBack = function() {
	    $ionicNavBarDelegate.back();
	};
	function setLocation(){
		gmaps.nearbyStores().then(function(results){
			console.log(results.data.results);
			$scope.locations = results.data.results;
			if($scope.myLocation.mode == 'automatic'){
				$scope.myLocation.location= results.data.results[0];	
			}
			
		}, function(){
			alert("Could not get nearby stores");
		});	
	}
	setLocation();
	


	$scope.setLocation = function(location){
		$scope.myLocation = {location: location, mode: 'manual'};
	}
}]);
