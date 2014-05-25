'use strict';

angular.module('App.services', [])
  .factory('storageKeys', ['$window', function ($window) {
    return {
      listsKey: "GroceryLists",
      locationKey: "GroceryListsMyLocation",
      itemsKey:"GroceryListItems"
    };
  }]);
