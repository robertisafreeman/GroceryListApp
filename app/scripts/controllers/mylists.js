'use strict';
angular.module('App.controllers')
.controller('MylistsCtrl', ['$scope', 'storage', 'storageKeys', '$ionicActionSheet',
function ($scope, storage, storageKeys, $ionicActionSheet) {
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

	$scope.addToMasterList = function(e, list){
		if($(e.target).hasClass('editLink')){
			return;
		} 
		$ionicActionSheet.show({
			 buttons: [
			   { text: 'Add unpurchased items' },
			   { text: 'Add all items' },
			 ],
			 destructiveText: 'Delete List',
			 destructiveButtonClicked: function(){
			 	if(confirm('Are you sure you want to delete this list?')){
			 		console.log('Delete the list');
			 	}
			 },
			 titleText: 'Add to Master List',
			 cancelText: 'Cancel',
			 buttonClicked: function(index) {
			 	console.log(index);
			   return true;
			 }
		});
		 return false;
	};
}]);
