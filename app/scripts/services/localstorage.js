'use strict';

angular.module('App.services', [])
  .factory('storageKeys', ['$window', function () {
    return {
      listsKey: 'GroceryLists',
      locationKey: 'GroceryListsMyLocation',
      itemsKey:'GroceryListItems'
    };
  }]);
