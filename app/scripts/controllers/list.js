'use strict';
/* global $ */
angular.module('App.controllers')
.controller('ListCtrl', 
['$scope', 'storage', '$stateParams', '$ionicPopup', '$location', 'storageKeys', 'gmaps', '$ionicModal', 'database',
function ($scope, storage, sp, $ionicPopup, $location, storageKeys, gmaps, $ionicModal, database ) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: {}, storeName: storageKeys.listsKey});
	$scope.list = $scope.lists[sp.listId];
	var list = $scope.list;

	$scope.myLocation = storage.get(storageKeys.locationKey);
	var remoteStore;
	storage.bind($scope,'myLocation', {storeName: storageKeys.locationKey});
	if(!$scope.myLocation){
		$scope.myLocation =  {automatic: true, location:{name: 'Unknown Location'}};
	} 

	if(!list.items){
		list.items = [];
	}
	function aisleGuess(item){
		var bestGuess = null;
		var itemKey = item.itemKey;
		if(item){
			if(remoteStore && remoteStore.items && remoteStore.items[itemKey]){
				var remoteItem = remoteStore.items[itemKey];
				Object.merge(item,
					Object.reject(remoteStore.items[itemKey], ['qty', 'qtyType']),
					false
				);
				if(item.qtyType === 'qty'){
					item.qtyType = remoteItem.qtyType;
				}
			} 
			if(typeof item.courseLocation === 'undefined'){
				item.courseLocation = 'Aisle';
			} else {
				bestGuess = item.courseLocation;
			}
			if(item.courseLocation === 'Aisle') {
				if(!item.estimatedAisle){
					item.estimatedAisle = 'Unknown';
				}
				bestGuess = item.estimatedAisle;
			}
			if(item.qty === 1){
				item.name = item.name.singularize();
				item.qtyType = item.qtyType.singularize();
			} else {
				item.name = item.name.pluralize();
				item.qtyType = item.qtyType.pluralize();
			}
		}

		return bestGuess;
	}
	function updateAisles(){
		var found = {};
		var aisles = [];
		for (var i = 0; i < list.items.length; i++) {
			var item =  list.items[i];
			if(item){
				item.bestGuess = aisleGuess(item);
				var itemAisle = item.bestGuess;
				if(!found[itemAisle]){
					var prettyKey = typeof itemAisle === 'number'? 'Aisle '+String(itemAisle): itemAisle;
					found[itemAisle] = {
						key: itemAisle,
						prettyKey:prettyKey.spacify().titleize(),
						num: 1
					};
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
		if($(e.currentTarget).hasClass('listCheck')){
			e.preventDefault();
			$scope.lastItem = item;
			item.found = !item.found;
			if(item.found){
				$scope.modal.show();
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
		 		itemName = itemName.trim().titleize().singularize();
		 		var item = {
		 			name: itemName,
		 			id: $scope.list.items.length,
		 			qty: 1,
		 			qtyType: '',
		 			found:false,
		 			itemKey: itemName.toLowerCase().replace(/\s/g, '')
		 		};
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
		var li = $scope.lastItem;
		console.log("Updated item", $scope.lastItem);
		// li.bestGuess = aisleGuess(li);
		if(!remoteStore.items){
			remoteStore.items = {};
			remoteStore.$save('items');	
		}
		
		var items = remoteStore.$child('items');
		items[$scope.lastItem.itemKey] = Object.reject($scope.lastItem, ['id', 'found', 'qty']);
		items.$save($scope.lastItem.itemKey);
		console.log("Updated item", $scope.lastItem);
		updateAisles();
	};
	function setLocation(){
		gmaps.nearbyStores().then(function(results){
			$scope.myLocation.location = results.data.results[0];
			$scope.myLocation.location = results.data.results[0];
			remoteStore = database.store($scope.myLocation.location);
			remoteStore.$on('loaded', function(){
				updateAisles();
				// remoteStore.$bind($scope, 'myLocation');
			});
			
		}, function(){
			// alert("Could not get nearby stores")
		});
	}
	if($scope.myLocation.automatic){
		setLocation();
		// select closest location every 5 minutes
		window.setInterval(setLocation, 300000);
	}
}]);
angular.module('App.controllers').filter('byAisle', function() {
	return function(input, listedAisle) {
		return input.filter(function(item){
			return item && item.bestGuess === listedAisle;
		});
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
