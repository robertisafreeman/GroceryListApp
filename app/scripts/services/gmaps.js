'use strict';

angular.module('App.services')
  .service('gmaps', ['$http', '$q', function Gmaps($http, $q) {
  	var apiKey = "AIzaSyCEzTx6QcQ0JzHkzoyFnFVEzGAtbBKgyok";

    return {
    	setLon:function(longitude){
    		lon = longitude;
    	},
    	setLat:function(latitude){
    		lat = latitude;
    	},
    	nearbyStores: function(){
    		var ret = $q.defer();
    		var lon,lat;
    		console.log('getting location');
    		var onSuccess = function(position) {
    		    // alert('Latitude: '          + position.coords.latitude          + '\n' +
    		    //       'Longitude: '         + position.coords.longitude         + '\n' +
    		    //       'Altitude: '          + position.coords.altitude          + '\n' +
    		    //       'Accuracy: '          + position.coords.accuracy          + '\n' +
    		    //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    		    //       'Heading: '           + position.coords.heading           + '\n' +
    		    //       'Speed: '             + position.coords.speed             + '\n' +
    		    //       'Timestamp: '         + position.timestamp                + '\n');
    		    lat = position.coords.latitude;
    		    lon = position.coords.longitude;
    		    console.log('got location', position);
    		    ret.resolve(position);
    		};

    		var onError = function(error) {
    		    alert(error);
    		};

    		navigator.geolocation.getCurrentPosition(onSuccess, onError);
    		return ret.promise.then(function(){
    			var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    						+'rankby=distance'
    						+'&types=grocery_or_supermarket'
    						+'&location='+lat+','+lon
    						// +'&radius=500&'
    						+'&sensor=false'
    						+'&key='+apiKey;
    			console.log(url)
	    			return $http({
		    			method: 'GET',
		    			url: url
		    		});
	    		});
    	}
    }
  }]);
