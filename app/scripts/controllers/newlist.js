'use strict';
angular.module('App.controllers')
.controller('NewlistCtrl', ['$scope', 'storage', '$location', 'storageKeys','$ionicNavBarDelegate', 
	function ($scope, storage, $location, storageKeys, $ionicNavBarDelegate) {
		$scope.goBack = function() {
		    $ionicNavBarDelegate.back();
		};
	$scope.list = {};
	$scope.createList = function(){
		// Get all currently stored lists.
		var lists = storage.get(storageKeys.listsKey) || {};
		// Create a new list from scripts/objects/list.js
		$scope.list = new List({name: $scope.list.name, id:lists.length});
		lists[$scope.list.id] = $scope.list;
		storage.set(storageKeys.listsKey, lists);
		$location.path('/mylists');
	};
}]);
