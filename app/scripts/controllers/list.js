'use strict';

angular.module('App.controllers')
.controller('ListCtrl', 
['$scope', 'localstorage', '$stateParams', '$ionicPopup', '$location', 
function ($scope, ls, sp, $ionicPopup, $location) {
	$scope.list = ls.getList(sp.listId);
	console.log($scope.list);

	if(!$scope.list.items || $scope.list.items.constructor.name !== 'Array') $scope.list.items = [];

	$scope.newItem = function(){
		$ionicPopup.prompt({
		   title: 'Add New Item',
		   inputType: 'text',
		   inputPlaceholder: 'Item Name'
		 }).then(function(itemName) {
		 	var item = {name: itemName, id: $scope.list.items.length, qty: 1, unitType: 'qty'}
		   	$scope.list.items.push(item);
		   	ls.updateList($scope.list);
		 });
	}
}]);
