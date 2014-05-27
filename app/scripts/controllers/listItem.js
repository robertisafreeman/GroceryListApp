'use strict';
/* global confirm */
angular.module('App.controllers')
.controller('ListItemCtrl', 
['$scope', 'storage', '$stateParams', '$ionicPopup', '$location', 'storageKeys',
function ($scope, storage, sp, $ionicPopup, $location, storageKeys) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: {}, storeName: storageKeys.listsKey});
	$scope.item = $scope.lists[sp.listId].items[sp.itemId];
	$scope.listId = sp.listId;
	$scope.deleteItem= function(){
		if(confirm('Are you sure you want to delete ' + $scope.lists[sp.listId].items[sp.itemId].name +'?')){
			// delete $scope.lists[sp.listId].items[sp.itemId]
			$scope.lists[sp.listId].items.splice(sp.itemId, 1);

			$location.path('/app/list/'+sp.listId);	
		}
		
	};
}]);
