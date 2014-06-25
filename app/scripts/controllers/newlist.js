'use strict';
angular.module('App.controllers')
.controller('NewlistCtrl', [
	'$scope',
	'storage',
	'$location',
	'storageKeys',
	'$ionicNavBarDelegate',
	'$ionicLoading',
	'$http',
	'itemMiner',
	function ($scope, storage, $location, storageKeys, $ionicNavBarDelegate, $ionicLoading, $http, itemMiner) {
		$scope.goBack = function() {
		    $ionicNavBarDelegate.back();
		};
	$scope.list = {};
	$scope.createList = function(){
		// Get all currently stored lists.
		var lists = storage.get(storageKeys.listsKey) || {};
		// Create a new list from scripts/objects/list.js
		$scope.list = new List({name: $scope.list.name, id:lists.length});
		lists[$scope.list.id] = $scope.list;
		storage.set(storageKeys.listsKey, lists);
		$location.path('/mylists');
	};
	// $scope.recipeURL = 'http://allrecipes.com/Recipe/Slow-Cooker-Pepper-Steak/Detail.aspx?soid=carousel_0_rotd&prop24=rotd';
	$scope.recipeURL = 'http://www.epicurious.com/articlesguides/bestof/toprecipes/bestburgerrecipes/recipes/food/views/Grilled-Turkey-Burgers-with-Cheddar-and-Smoky-Aioli-354289';
	// $scope.recipeURL = 'http://example.com';
	$scope.importRecipe = function(url){
		// var iframe = document.getElementById('miniBrowser');
		// console.log(iframe);
		// var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
		// var ifBody = iframeDocument.getElementsByTagName('body');
		// console.log('htmlBody', ifBody);
		$ionicLoading.show({
			template: '<span class="icon ion-refreshing">Loading. . .</span>'
		});
		console.log(url);
	  $http.get(url, {
	  	'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36',
	  	'timeout': 2500
	  }).
    success(function(data, status, headers, config) {
    	$ionicLoading.hide();
    	console.log(itemMiner.pageExtraction(data));
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
    	$ionicLoading.hide();
    	/* global alert */
    	alert('Unable to load the web page, Please try again later.');
    	
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
	};
}]);
