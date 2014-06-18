'use strict';
/* global Firebase */
var baseUrl = 'https://grocerylist.firebaseio.com/';
var testMode = false;
var firstRun = true;
// If this is a protractor test, do not use real data

var storesURL = 'stores/';
angular.module('App.services')
  .factory('database', ['$firebase',  function($firebase){
    if(window.clientSideScripts){
      console.log('TEST MODE');
      baseUrl = 'https://grocerylist-test.firebaseio.com/';
      testMode = true;
    }
    var storesRef = new Firebase(baseUrl+storesURL);
    var stores = $firebase(storesRef);
    // Public API here
    return {
      store: function(location){
        var storeKey = this.storeKeyFromLocation(location);
        if(!storeKey){
          return;          
        } 
        if(testMode && firstRun){
          firstRun = false;
          stores[storeKey] = null;
          stores.$save(storeKey);
          stores.$child(storeKey);
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
