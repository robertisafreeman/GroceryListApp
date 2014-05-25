'use strict';
angular.module('App.controllers')
.controller('MylistsCtrl', ['$scope', 'storage', 'storageKeys', '$ionicPopup',
function ($scope, storage, storageKeys, $ionicPopup) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: {}, storeName: storageKeys.listsKey});
	if(typeof $scope.lists == 'undefined') $scope.lists = ['test']
	$scope.editName = function(list, e){
		e.preventDefault();
		$ionicPopup.prompt({
		   title: 'Edit Name',
		   inputType: 'text',
		   inputPlaceholder: 'List Name',
		   cancelText: 'Cancel',
		    // cancelType: // String (default: 'button-default'). The type of the Cancel button.
		    okText: 'Change Name'// String (default: 'OK'). The text of the OK button.
		    // okType: // String (default: 'button-positive'). The type of the OK button.
		 }).then(function(name) {
		 	if(name){
		 		list.name = name;
		 	}
		 	
		 });
		 return false;
	}
}]);
