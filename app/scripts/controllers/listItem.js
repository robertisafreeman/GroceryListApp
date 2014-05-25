'use strict';

angular.module('App.controllers')
.controller('ListItemCtrl', 
['$scope', 'localstorage', '$stateParams', '$ionicPopup', '$location', 
function ($scope, ls, sp, $ionicPopup, $location) {
	$scope.item = ls.getList(sp.listId).items[sp.itemId];
	$scope.countries = [{name:'USA'}, {name:'CANADA'}]
}]);
