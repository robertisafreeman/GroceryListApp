'use strict';
angular.module('App.controllers')
.controller('MylistsCtrl', ['$scope', 'storage', 'storageKeys', '$ionicPopup',
function ($scope, storage, storageKeys, $ionicPopup) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: {}, storeName: storageKeys.listsKey});
	if(!$scope.lists){
		$scope.lists = {};
	}
	
	if(Object.keys($scope.lists).length === 0){
		// Initialize the master list.
		var list = new List({name: 'Master List', id:0});
		$scope.lists[list.id] = list;
	}

	$scope.editName = function(list, e){
		e.preventDefault();
		$ionicPopup.prompt({
		   title: 'Edit Name',
		   inputType: 'text',
		   inputPlaceholder: 'List Name',
		   cancelText: 'Cancel',
		   okText: 'Change Name'
		 }).then(function(name) {
		 	if(name){
		 		list.name = name;
		 	}
		 	
		 });
		 return false;
	};
}]);
