'use strict';
/* global confirm */
angular.module('App.controllers')
.controller('ListItemCtrl', 
['$scope', 'storage', '$stateParams', '$ionicPopup', '$location', 'storageKeys', 'keyGen',
function ($scope, storage, sp, $ionicPopup, $location, storageKeys, keyGen) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: {}, storeName: storageKeys.listsKey});
	$scope.item = $scope.lists[sp.listId].items[sp.itemId];
	$scope.listId = sp.listId;
	$scope.deleteItem= function(){
		if(confirm('Are you sure you want to delete ' + $scope.lists[sp.listId].items[sp.itemId].name +'?')){
			$scope.lists[sp.listId].items[sp.itemId] = null;

			$location.path('/app/list/'+sp.listId);	
		}
	};
	$scope.updateItemKey = function(item){
		console.log(item.name, keyGen.itemKey(item.name));
		item.itemKey = keyGen.itemKey(item.name);
	};
}]);
