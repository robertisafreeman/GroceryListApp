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

	$scope.storeTypes = [
	'grocery_or_supermarket',
	'convenience_store',
	'department_store',
	'electronics_store',
	'furniture_store',
	'home_goods_store',
	'pet_store',
	'shoe_store',
	'shopping_mall',
	'liquor_store'
	];
	$scope.storeType = storage.get(storageKeys.locationType);
	storage.bind($scope,'storeType', {storeName: storageKeys.locationType});
	if($scope.storeType.isBlank()){
		$scope.storeType = $scope.storeTypes[0];
	}
	$scope.keywords = storage.get(storageKeys.locationKeyword);
	storage.bind($scope,'keywords', {defaultValue: '', storeName: storageKeys.locationKeyword});
	if($scope.keywords.isBlank()){
		$scope.keywords = '';
	}
	console.log($scope.keywords);

	$scope.goBack = function() {
	    $ionicNavBarDelegate.back();
	};
	function automaticLocation(){
		gmaps.nearbyStores($scope.storeType, $scope.keywords).then(function(results){

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
	automaticLocation();
	
	


	$scope.setLocation = function(location){
		$scope.myLocation = {location: location, mode: 'manual'};
		$scope.store = db.store($scope.myLocation.location);
		window.setTimeout($scope.goBack, 3);
	};
}]);
