'use strict';
angular.module('App.services')
  .service('keyGen', [function Gmaps() {
  	return {
  		itemKey: function(name){
  			return name.toLowerCase().replace(/\s/g, '').singularize();
  		}
  	};
  }
]);
