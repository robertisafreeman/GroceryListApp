'use strict';

angular.module('App.services', [])
  .factory('localstorage', ['$window', function ($window) {
    var storageKey = 'GroceryList';
    var set = function(value) {
      $window.localStorage[storageKey] = value;
    },
    get = function(defaultValue) {
      return $window.localStorage[storageKey] || defaultValue;
    },
    setObject = function(value) {
      $window.localStorage[storageKey] = JSON.stringify(value);
    },
    getObject = function() {
      return JSON.parse($window.localStorage[storageKey] || '[]');
    };
    // key: Returns the name of the key at the position specified.
    // getItem: Returns the item identified by it's key.
    // setItem: Saves and item at the key provided.
    // removeItem: Removes the item identified by it's key.
    // clear: Removes all of the key value pairs.
    // http://docs.phonegap.com/en/1.5.0/phonegap_storage_storage.md.html#localStorage

    // Public API here
    return {
      saveList: function (list) {
        var lists = getObject();
        console.log(lists.length);
        list.id=lists.length > 0? lists.length: 0;
        lists.push(list);
        setObject(lists);
      },
      getList: function(listID){
        return getObject()[listID];
      },
      updateList: function(list){
        var lists = getObject();
        lists[list.id] =  list;
        setObject(lists);
      },
      getAllLists: function(){
        return getObject();
      },

    };
  }]);
