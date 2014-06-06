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
	if(!list.items){
		list.items = [];
	}


	$scope.myLocation = storage.get(storageKeys.locationKey);
	var remoteStore;
	storage.bind($scope,'myLocation', {defaultValue: {automatic: true, location:{name: 'Unknown Location'}} ,storeName: storageKeys.locationKey});


	$scope.storeType = storage.get(storageKeys.locationType);
	storage.bind($scope,'storeType', {defaultValue: 'grocery_or_supermarket',storeName: storageKeys.locationType});

	$scope.keywords = storage.get(storageKeys.locationKeyword);
	storage.bind($scope,'keywords', {defaultValue: '', storeName: storageKeys.locationKeyword});
	if(!$scope.keywords){
		$scope.keywords = '';
	}
	$scope.previousItems = storage.get(storageKeys.itemHistory);
	storage.bind($scope,'previousItems', {defaultValue: [], storeName: storageKeys.itemHistory});
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
			if(item.qty < 2){
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
		// console.log("currentTarget", e.target);
		if(!$(e.target).hasClass('editItem')){
			// e.preventDefault();
			$scope.lastItem = item;
			item.found = !item.found;
			if(item.found){
				$scope.modal.show();
			}
		}
	};

	var previousItems = $scope.previousItems;
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
	function keyFromName(name){
		return name.toLowerCase().replace(/\s/g, '');
	}
	$scope.newItem = function(){
		// $scope.
		$ionicPopup.show({
				// template: '<input type="password" ng-model="data.wifi">',
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
						console.log('item', $scope);
						var itemName = $scope.newItemName;
						var newItemQty = $scope.newItemQty && !$scope.newItemQty.isBlank()? $scope.newItemQty: 1;
						$scope.newItemQty = '';
					   	$scope.newItemName = '';
						if(itemName){
					 		itemName = itemName.trim().titleize().singularize();
					 		console.log('checking', $scope.list.items);
					 		for (var i = 0; i < $scope.list.items.length; i++) {
					 			var it = $scope.list.items[i];
					 			if(it && it.itemKey === keyFromName(itemName)){
					 				if(confirm('{itemName} is already on the list, add {qty} to it?'.assign({itemName:itemName, qty: newItemQty}))){
					 					it.qty = it.qty?it.qty:0;
					 					it.qty += newItemQty;
					 				}
					 				return;
					 			}
					 		}
					 		var item = {
					 			name: itemName,
					 			id: $scope.list.items.length,
					 			qty: newItemQty,
					 			qtyType: '',
					 			found:false,
					 			itemKey: keyFromName(itemName)
					 		};
					   		$scope.list.items.push(item);
					   		$scope.previousItems = $scope.previousItems.unshift(item.name).unique();
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
			}
			
			
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
