'use strict';
angular.module('App.controllers')
.controller('MylistsCtrl', 
['$scope', 'storage', 'storageKeys', '$ionicActionSheet', '$location', '$ionicPopup',
function ($scope, storage, storageKeys, $ionicActionSheet, $location, $ionicPopup) {
	$scope.lists = storage.get(storageKeys.listsKey);
	storage.bind($scope,'lists', {defaultValue: [], storeName: storageKeys.listsKey});
	if(!$scope.lists){
		$scope.lists = [];
	}
	
	if(Object.keys($scope.lists).length === 0){
		// Initialize the master list.
		var list = new List({name: 'Combined List', id:0});
		$scope.lists[list.id] = list;
	}

	function renameList(list){
		$scope.listToRename = list;
	  $ionicPopup.show({
	    template: '<input type="text" id="renameListInput" ng-model="listToRename.name">',
	    title: 'Rename List',
	    subTitle: list.name,
	    scope: $scope,
	    buttons: [
	      { text: 'Cancel' },
	      {
	        text: '<b>Save</b>',
	        type: 'button-positive',
	      },
	    ]
	  });
	}

	function setListPruchached(list, val){
		console.log('list', list);
		list.items.forEach(function(item){
			item.found = val;
		});
	}
	$scope.addToMasterList = function(e, list){
		if($(e.target).hasClass('editLink')){
			return;
		} 
		$ionicActionSheet.show({
			 buttons: [
			   { text: (list.include?'Hide':'Show')+' in Combined List' },
			   { text: 'Mark purchased'},
			   { text: 'Mark unpurchased'},
			   { text: 'Rename'},
			   { text: 'Edit' },
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
			 		case 1: // mark purchased
			 			setListPruchached(list, true);
			 			break;
			 		case 2: // mark unpuchased
			 			setListPruchached(list, false);
			 			break;
			 		case 3: // Rename List
			 			renameList(list);
			 			break;
			 		case 4: // Edit List
			 			$location.path('/app/list/'+list.id);
			 			break;
			 	}
			  return true;
			 }
		});
		 return false;
	};
}]);
