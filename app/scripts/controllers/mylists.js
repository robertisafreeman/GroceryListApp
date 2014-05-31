'use strict';
angular.module('App.controllers')
.controller('MylistsCtrl', ['$scope', 'storage', 'storageKeys', '$ionicPopup', '$location',
function ($scope, storage, storageKeys, $ionicPopup, $location) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: [], storeName: storageKeys.listsKey});
	if(typeof $scope.lists === 'undefined'){
		$scope.lists = [];
	}
	console.log("listLength", $scope.lists.length);
	if($scope.lists.length === 0){
		window.setTimeout(function(){
			$location.path('/app/newlist');
		}, 2);
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
