'use strict';
angular.module('App.controllers')
.controller('MylistsCtrl', ['$scope', 'storage', '$rootScope', function ($scope, storage, $rootScope) {
	$scope.lists = storage.get($rootScope.listKey);
	storage.bind($scope,'lists', {defaultValue: [], storeName: $rootScope.listsKey});
	if(typeof $scope.lists == 'undefined') $scope.lists = ['test']
	// $scope.lists = lists;
	console.log($scope.lists);
}]);
