'use strict';
/* global $ */
/* global confirm */
/* global alert */
/* global List */
angular.module('App.controllers')
.controller('ListCtrl', 
['$scope', 'storage', '$stateParams', '$ionicPopup', '$location', 'storageKeys', 'gmaps', '$ionicModal', 'database',
function ($scope, storage, sp, $ionicPopup, $location, storageKeys, gmaps, $ionicModal, database ) {






	// Initialize Lists
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: {}, storeName: storageKeys.listsKey});
	$scope.list = $scope.lists[sp.listId];
	var thisList = $scope.list || new List();

	// Initialize Locations
	$scope.myLocation = storage.get(storageKeys.locationKey);
	var remoteStore;
	storage.bind($scope,'myLocation', 
		{
			defaultValue: {automatic: true, location:{name: 'Unknown Location'}},
			storeName: storageKeys.locationKey
		}
	);
	$scope.storeType = storage.get(storageKeys.locationType);
	storage.bind($scope,'storeType', {defaultValue: 'grocery_or_supermarket',storeName: storageKeys.locationType});
	$scope.keywords = storage.get(storageKeys.locationKeyword);
	storage.bind($scope,'keywords', {defaultValue: '', storeName: storageKeys.locationKeyword});
	if(!$scope.keywords){
		$scope.keywords = '';
	}

	// Initialize Previous Items
	$scope.previousItems = storage.get(storageKeys.itemHistory);
	storage.bind($scope,'previousItems', {defaultValue: [], storeName: storageKeys.itemHistory});
	var previousItems = $scope.previousItems;
	// This sets items to visible or invisible in the previous items search.
	$scope.itemSearch = function(searchTerm){
		if(!searchTerm || searchTerm.isBlank()){
			$scope.searchResults = previousItems;
			return ;
		}
		$scope.searchResults = [];
		previousItems.each(function(item){

			if(item.toLowerCase().has(searchTerm.toLowerCase())){
				$scope.searchResults.push(item);
			}

		});
	};

	// Assigns our best location guess to an Aisle.
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
			if(item.displayQty === 1){
				item.name = item.name.singularize();
				item.qtyType = item.qtyType.singularize();
			} else {
				item.name = item.name.pluralize();
				item.qtyType = item.qtyType.pluralize();
			}
		}

		return bestGuess;
	}
	var found, aisles;
	function compileLists(key, list){
		if(!list) {
			return;
		}
		if(list !== thisList && !list.include){
			return;
		}
		for (var i = 0; i < list.items.length; i++) {
			var item = list.items[i];
			if(item){
				item.bestGuess = aisleGuess(item);
				var itemAisle = item.bestGuess;
				if(typeof found[itemAisle] === 'undefined'){
					var prettyKey = typeof itemAisle === 'number'? 'Aisle '+String(itemAisle): itemAisle;
					found[itemAisle] = {
						key: itemAisle,
						prettyKey:prettyKey.spacify().titleize(),
						num: 1,
						items: [item]
					};
					item.displayQty = item.qty;
					aisles.push(found[itemAisle]);
				}
				else{
					found[itemAisle].num++;
					var itemInList = false;
					found[itemAisle].items.forEach(function(itm){
						if(itm.itemKey === item.itemKey && itm.qtyType === item.qtyType){
							itm.displayQty += item.qty;
							itemInList = true;
						}
					});
					if(!itemInList){
						found[itemAisle].items.push(item);
					}
				}	
			}
			
		}
	}
	// Reorderes items on the list to be organized by aisle.
	function updateAisles(){
		found = {};
		aisles = [];
		if(thisList.id === 0){
			Object.keys($scope.lists, compileLists);
		} else {
			compileLists(0, thisList);
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
	
	// Initial Item location Modal
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
	// $scope.$on('modal.hide', function() {
	// 	// Execute action
	// });
	// // Execute action on remove modal
	// $scope.$on('modal.removed', function() {
	// 	// Execute action
	// });
	
	// Marks an Item as found and requrest it's location from the user via the modal.
	$scope.crossOff = function(item, e){
		if(!$(e.target).hasClass('editItem')){
			$scope.lastItem = item;
			item.found = !item.found;
			if(item.found){
				$scope.modal.show();
			}
		}
	};


	function keyFromName(name){
		return name.toLowerCase().replace(/\s/g, '');
	}
	// New pop up to add an item to the list.
	$scope.newItem = function(){
		$ionicPopup.show({
				templateUrl: 'views/newItem.html',
				title: 'Create New Item',
				subTitle: 'Enter item details',
				scope: $scope,
				buttons: [
					{ text: 'Cancel', type:'button-assertive' },
					{
					text: '<b>Save</b>',
					type: 'button-balanced',
					onTap: function() {
						var itemName = $scope.newItemName;
						var newItemQty = $scope.newItemQty && !String($scope.newItemQty).isBlank()? $scope.newItemQty: 1;
						$scope.newItemQty = '';
					   	$scope.newItemName = '';
						if(itemName){
					 		itemName = itemName.trim().titleize().singularize();
					 		for (var i = 0; i < $scope.list.items.length; i++) {
					 			var it = $scope.list.items[i];
					 			if(it && it.itemKey === keyFromName(itemName)){
					 				if(confirm('{itemName} is already on the list, add {qty} to it?'.assign({itemName:itemName, qty: newItemQty}))){
					 					it.qty = it.qty?it.qty:1;
					 					it.qty += newItemQty;
					 					it.displayQty = it.qty;
					 				}
					   			
					 				return updateAisles();
					 			}
					 		}
					 		var item = {
					 			name: itemName,
					 			id: $scope.list.items.length,
					 			qty: newItemQty,
					 			displayQty: newItemQty,
					 			qtyType: '',
					 			found:false,
					 			itemKey: keyFromName(itemName)
					 		};
					   		$scope.list.items.push(item);
					   		$scope.previousItems.unshift(item.name);
					   		 $scope.previousItemsunshift = $scope.previousItems.unique();
					   		updateAisles();
					 	}
					}
				},
			]
		});
		$scope.itemSearch();
	};
	$scope.editItem = function(url){
		$location.path(url);
	};
	$scope.updateItemLocation = function(){
		$scope.modal.hide();
		if(!remoteStore.items){
			remoteStore.items = {};
			remoteStore.$save('items');	
		}
		
		var items = remoteStore.$child('items');
		items[$scope.lastItem.itemKey] = Object.reject($scope.lastItem, ['id', 'found', 'qty']);
		items.$save($scope.lastItem.itemKey);
		updateAisles();
	};
	function setLocation(){
		gmaps.nearbyStores($scope.storeType, $scope.keywords).then(function(results){
			$scope.myLocation.location = results.data.results[0];
			$scope.myLocation.location = results.data.results[0];
			remoteStore = database.store($scope.myLocation.location);
			if(remoteStore){
				remoteStore.$on('loaded', function(){
					updateAisles();
				});	
			} else {
				alert('problem saving store store information');
			}
			
			
		}, function(){
			// alert("Could not get nearby stores")
		});
	}
	
	// select closest location every 5 minutes
	if($scope.myLocation.automatic){
		setLocation();
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
