'use strict';
/* global Firebase */
var baseUrl = 'https://grocerylist.firebaseio.com/';
var storesURL = 'stores/';
angular.module('App.services')
  .factory('database', ['$firebase',  function($firebase){
    var storesRef = new Firebase(baseUrl+storesURL);
    var stores = $firebase(storesRef);
    // Public API here
    return {
      store: function(location){
        var storeKey = this.storeKeyFromLocation(location);
        if(!storeKey) return;
        // var store; 
        // if(!stores[storeKey]){
        //   console.log(storeKey);
        //   stores[storeKey] = {meta: location};
        //   stores.$save(storeKey);
        // }
        return stores.$child(storeKey);
      },
      stores: stores,
      storeKeyFromLocation:function(location){
        if(!location) return false;
        var key = (location.name.replace(/\W/g, '') + ':' + location.vicinity.replace(/\W/g, '')).trim(); 
        return key;
      }
    };
  }]);
