'use strict';
angular.module('App.controllers')
.controller('NewlistCtrl', ['$scope', 'storage', '$location', 'storageKeys', 
	function ($scope, storage, $location, storageKeys) {
	$scope.list = {};
	$scope.createList = function(){
		// Get all currently stored lists.
		var lists = storage.get(storageKeys.listsKey) || {};
		// Create a new list from scripts/objects/list.js
		$scope.list = new List({name: $scope.list.name});
		console.log('saving list', $scope.list);
		lists[$scope.list.id] = $scope.list;
		console.log('lists',lists);
		storage.set(storageKeys.listsKey, lists);
		$location.path('/mylists');
	};
}]);
