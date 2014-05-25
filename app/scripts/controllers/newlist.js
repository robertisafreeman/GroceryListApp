'use strict';
angular.module('App.controllers')
.controller('NewlistCtrl', ['$scope', 'storage', '$location', '$rootScope', function ($scope, storage, l, $rootScope) {
	var list = {};
	
	// storage.bind($scope,'lists', {defaultValue: [] ,storeName: $rootScope.listsKey});
	$scope.createList = function(){
		var lists = storage.get($rootScope.listKey) || [];
		lists.push($scope.list);
		storage.set($rootScope.listKey,lists);
	}
}]);
