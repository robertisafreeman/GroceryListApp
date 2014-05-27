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
        console.log(location);
        var storeKey = this.storeKeyFromLocation(location);
        // var store; 
        if(!stores[storeKey]){
          stores[storeKey] = {meta: location};
          stores.$save(storeKey);
        }
        // console.log('retrieving', stores.$child(storeKey), storeKey);
        return stores.$child(storeKey);
        // try{
        //   store = stores.$child(storeKey);
        // } catch (e) {
        //   console.log("creating store", e);
        //   stores.$add(storeKey, {meta: location});
        //   store = stores.$child(storeKey);
        //   store.$save();
        // }
        
        // return store;
      },
      stores: stores,
      storeKeyFromLocation:function(location){
        var key = (location.name.replace(/\W/g, '') + ':' + location.vicinity.replace(/\W/g, '')).trim(); 
        return key;

      }
    };
  }]);
