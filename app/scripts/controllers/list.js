'use strict';

angular.module('App.controllers')
.controller('ListCtrl', 
['$scope', 'storage', '$stateParams', '$ionicPopup', '$location', 'storageKeys', 'gmaps',
function ($scope, storage, sp, $ionicPopup, $location, storageKeys, gmaps ) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: {}, storeName: storageKeys.listsKey});
	$scope.list = $scope.lists[sp.listId];
	$scope.myLocation = storage.get(storageKeys.locationKey);
	storage.bind($scope,'myLocation', {storeName: storageKeys.locationKey});
	if(!$scope.myLocation) $scope.myLocation =  {automatic: true, location:{name: 'Unknown Location'}}

	if(!$scope.list.items) $scope.list.items = {};
	if($scope.myLocation.automatic){
		// select closest location every 3 minutes
		window.setInterval(setLocation, 300000);
	}
	$scope.crosssOff = function(item, e){
		console.log(item);
		item.found = !item.found;

	}	
	$scope.newItem = function(){
		$ionicPopup.prompt({
		   title: 'Add New Item',
		   inputType: 'text',
		   inputPlaceholder: 'Item Name',
		   cancelText: 'Cancel',
		    // cancelType: // String (default: 'button-default'). The type of the Cancel button.
		    okText: 'Add Item'// String (default: 'OK'). The text of the OK button.
		    // okType: // String (default: 'button-positive'). The type of the OK button.
		 }).then(function(itemName) {
		 	if(itemName){
		 		var item = {name: itemName, id: Object.keys($scope.list.items).length, qty: 1, qtyType: 'qty'}
		   		$scope.list.items[item.id] = item;	
		 	}
		 	
		 });
	}
	function setLocation(){
		console.log("Determining location")
		gmaps.nearbyStores().then(function(results){
			$scope.myLocation.location = results.data.results[0];
			$scope.myLocation.location = results.data.results[0];
		}, function(){
			alert("Could not get nearby stores")
		});
	}
	if($scope.myLocation.automatic){
		setLocation()
	}
}]);
