'use strict';
angular.module('App.controllers')
.controller('NewlistCtrl', ['$scope', 'storage', '$location', 'storageKeys', 
	function ($scope, storage, l, storageKeys) {
	$scope.list = {};
	// storage.bind($scope,'lists', {defaultValue: [] ,storeName: $rootScope.listsKey});
	$scope.createList = function(){
		$scope.list.name = $scope.list.name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		var lists = storage.get(storageKeys.listsKey) || {};
		$scope.list.id = Object.keys(lists).length;
		lists[$scope.list.id] = $scope.list;
		storage.set(storageKeys.listsKey, lists);
		l.path('/mylists');
	};
}]);
