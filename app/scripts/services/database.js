'use strict';
/* global Firebase */
var baseUrl = 'https://grocerylist.firebaseio.com/';
var storesURL = 'stores/';
angular.module('App.services')
  .factory('database', ['$firebase',  function($firebase){
    var storesRef = new Firebase(baseUrl+storesURL);
    var stores = $firebase(storesRef);
    var testVar = {};// This is used in tests, so that real data isn't touched
    // Public API here
    return {
      store: function(location){
        var storeKey = this.storeKeyFromLocation(location);
        if(!storeKey){
          return;          
        } 
        // If this is a protractor test, do not use real data
        if(window.clientSideScripts){
          return testVar;
        }
          
        return stores.$child(storeKey);
      },
      stores: stores,
      storeKeyFromLocation:function(location){
        if(!location){ 
          return false;
        }
        var key = (location.name.replace(/\W/g, '') + ':' + location.vicinity.replace(/\W/g, '')).trim(); 
        return key;
      }
    };
  }]);
