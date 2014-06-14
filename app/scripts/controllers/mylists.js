'use strict';
angular.module('App.controllers')
.controller('MylistsCtrl', 
['$scope', 'storage', 'storageKeys', '$ionicActionSheet', '$location',
function ($scope, storage, storageKeys, $ionicActionSheet, $location) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: [], storeName: storageKeys.listsKey});
	if(!$scope.lists){
		$scope.lists = [];
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
			   { text: (list.include?'Remove from':'Add to')+' Master List' },
			   { text: 'Edit List' },
			 ],
			 destructiveText: 'Delete List',
			 destructiveButtonClicked: function(){
			 	if(confirm('Are you sure you want to delete ' + list.name + '?')){
			 		delete $scope.lists[list.id];
			 		return true;
			 	}
			 },
			 titleText: 'Reusable List Options',
			 cancelText: 'Cancel',
			 cancel:function(){
			 	return true;
			 },
			 buttonClicked: function(index) {
			 	switch(index){
			 		case 0: // Show in master list
			 			list.include = list.include?false:true;
			 			break;
			 		case 1: // Edit List
			 			$location.path('/app/list/'+list.id);
			 			break;
			 	}
			  return true;
			 }
		});
		 return false;
	};
}]);
