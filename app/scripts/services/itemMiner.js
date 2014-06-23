'use strict';
angular.module('App.services')
  .service('itemMiner', function() {
  	var ingredientRegex = /((\d+(\/\d+)?)[^\d]+?(\(.*?)?(pounds?|tablespoons?|cubes?|cups?|teaspoons?|ounces?|large|cans?)+\)?\s+([^(\d+(\/\d+)?)])*)/gi;
  	return {
  		pageExtraction: function(html){
  			var parser = new DOMParser();
  			var tl = parser.parseFromString(html, 'text/html');
  			$('script', tl).remove();

  			$('*', tl).each(function(el){
  				console.log(el);
  				if(this.innerText.trim().length === 0 ||
  					(this.innerText.trim().length > 100 && !this.innerText.match(ingredientRegex))){
  					$(this).remove();
  				}
  			});
  			console.log(tl);
  			var body = tl.getElementsByTagName('body')[0];
  			if(!body) {
  				throw new Error('Could not interpret web page.');
  			}

  			// var lines = [];
  			// body.innerText.lines(function(line){
  			// 	if(line.trim().length > 0) lines.push(line.trim());
  			// });
  			// console.log(lines);
  			console.log(body.innerText.compact().match(ingredientRegex));
  			// body.innerText.lines(function(line){
  			// 	if(line.trim().length === 0){
					// 	return;  					
  			// 	} 
  			// 	console.log(line);
  			// });
  		}
  	};
  }
);