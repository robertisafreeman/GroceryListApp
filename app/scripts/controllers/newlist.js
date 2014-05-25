'use strict';
angular.module('App.controllers')
.controller('NewlistCtrl', ['$scope', 'storage', '$location', 'storageKeys', 
	function ($scope, storage, l, storageKeys) {
	$scope.list = {};
	// storage.bind($scope,'lists', {defaultValue: [] ,storeName: $rootScope.listsKey});
	$scope.createList = function(){
		var lists = storage.get(storageKeys.listsKey) || {};
		$scope.list.id = Object.keys(lists).length;
		console.log(Object.keys(lists).length)
		lists[$scope.list.id] = $scope.list;
		storage.set(storageKeys.listsKey, lists);
		l.path('/mylists')
	}
}]);
