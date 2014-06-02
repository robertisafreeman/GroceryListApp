'use strict';
angular.module('App.controllers')
.controller('MylistsCtrl', ['$scope', 'storage', 'storageKeys', '$ionicPopup', '$location',
function ($scope, storage, storageKeys, $ionicPopup, $location) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: [], storeName: storageKeys.listsKey});
	if(!$scope.lists){
		$scope.lists = [];
	}
	// console.log("listLength", typeof $scope.lists, $scope.lists.length);
	if($scope.lists.length === 0){
		console.log("GO to new list");
		// window.setTimeout(function(){
			$location.path('/app/newlist');
		// }, 2);
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
