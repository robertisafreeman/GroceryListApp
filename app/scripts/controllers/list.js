'use strict';
/* global $ */
angular.module('App.controllers')
.controller('ListCtrl', 
['$scope', 'storage', '$stateParams', '$ionicPopup', '$location', 'storageKeys', 'gmaps', '$ionicModal',
function ($scope, storage, sp, $ionicPopup, $location, storageKeys, gmaps, $ionicModal ) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: {}, storeName: storageKeys.listsKey});
	$scope.list = $scope.lists[sp.listId];
	var list = $scope.list;
	$scope.myLocation = storage.get(storageKeys.locationKey);
	storage.bind($scope,'myLocation', {storeName: storageKeys.locationKey});
	if(!$scope.myLocation){
		$scope.myLocation =  {automatic: true, location:{name: 'Unknown Location'}};
	} 

	if(!list.items){
		list.items = [];
	}
	
	function updateAisles(){
		var found = {};
		var aisles = [];
		for (var i = 0; i < list.items.length; i++) {
			var item =  list.items[i];
			if(item){
				if(typeof item.courseLocation !== 'undefined'){
					item.courseLocation = item.courseLocation;
					if(item.courseLocation !== 'Aisle'){
						item.estimatedAisle = item.courseLocation;	
					} 
				} else {
					item.courseLocation = 'Aisle';
					item.estimatedAisle = 'Unknown';
				}
				var itemAisle =item.estimatedAisle;
				if(!found[itemAisle]){
					found[itemAisle] = {key: itemAisle, num: 1};
					aisles.push(found[itemAisle]);
				}
				else{
					found[itemAisle].num++;
				}	
			}
			
		}
		$scope.aisles = aisles.sort(function(a, b){
			if(typeof a.key === 'string') {
				return true;
			}
			if(typeof b.key === 'string'){
				return false;
			}
			return a.key > b.key;
		});
	}
	updateAisles();
	

	$ionicModal.fromTemplateUrl('views/itemLocation.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hide', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
		// Execute action
	});
	$scope.crossOff = function(item, e){
			// console.log('target', $(e.currentTarget).hasClass('listCheck'))
		if($(e.currentTarget).hasClass('listCheck')){
			e.preventDefault();
			$scope.lastItem = item;
			if(!$scope.lastItem.aisle){
				$scope.lastItem.aisle = 0;
			} 
			item.found = !item.found;
			// This is weird
			if(item.found){
				$scope.modal.show();
				// $scope.closeModal = function() {
				// 	$scope.modal.hide();
				// };
			}	
		}
	};
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
		 		var item = {name: itemName, id: $scope.list.items.length, qty: 1, qtyType: 'qty', found:false};
		   		$scope.list.items.push(item);
		   		updateAisles();
		 	}
		 	
		 });
	};
	$scope.editItem = function(url){
		$location.path(url);
	};
	$scope.updateItemLocation = function(){
		$scope.modal.hide();
		updateAisles();
	};
	function setLocation(){
		gmaps.nearbyStores().then(function(results){
			$scope.myLocation.location = results.data.results[0];
			$scope.myLocation.location = results.data.results[0];
		}, function(){
			// alert("Could not get nearby stores")
		});
	}
	if($scope.myLocation.automatic){
		setLocation();
	}
	if($scope.myLocation.automatic){
		// select closest location every 3 minutes
		window.setInterval(setLocation, 300000);
	}
}]);
angular.module('App.controllers').filter('byAisle', function() {
 	// function searchForKey(arr, key){
 	// 	for (var i = 0; i < arr.length; i++) {
 	// 		console.log("searcher");
 	// 		console.log(arr[i].name, arr[i].courseLocation, arr[i].estimatedAisle, key)
 	// 		if(arr[i].courseLocation === key || arr[i].estimatedAisle === key){
 	// 			console.log("true");
 	// 			return true;
 	// 		}
 	// 	};
 	// 	return false;
 	// }
  return function(input, aisle) {

  	// console.log("Filtering", item, aisle);
  	var ret = [];
  	for (var i = 0; i < input.length; i++) {
  		var item = input[i];
  		if(item.courseLocation === aisle || item.estimatedAisle === aisle){
  			ret.push(item);
  		}
  	}
  	// console.log("aisle filter", aisle, ret);
    return ret;
  };
});
angular.module('App.controllers').filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)){
    	return input;
    }

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a < b;
    });
    return array;
 };
});
