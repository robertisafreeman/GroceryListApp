'use strict';
var foodUnits = [
	'pounds?',
	'tablespoons?',
	'cubes?',
	'cups?',
	'teaspoons?',
	'ounces?',
	'large',
	'cans?',
	'slices?',
	'small',
	'buns?',
	'wedges?',
	'slices?'
].join('|');
angular.module('App.services')
  .service('itemMiner', function() {
  	// First regex is for looking for the pattern when all of the text is
  	// on one line. When searching through the dom, the inner text is all
  	// compressed to one line, to avoid having to deal with strangely placed 
  	// new lines.
  	var ingredientRegex = new RegExp('((\\d+(\\s+)?((\\d+)?\\\/\\d+)?)[^\\d]+?(\\(.*?)?('+foodUnits+')+\\)?\\s+([^(\\d+(\\\/\\d+)?)])*)', 'gi');
  	return {
  		pageExtraction: function(html){
  			var parser = new DOMParser(); // Dom parse
  			var recipePage = parser.parseFromString(html, 'text/html');
  			// Remove any script tags from the page, because they can trigger false
  			// positives.
  			$('script', recipePage).remove();

  			var guessedElement = {
  				ele:null,
  				ratio: 0,
  				matches: null
  			};
  			// Check each element in the dom.
  			$('*', recipePage).each(function(){
  				var text = this.innerText;
  				// If it's got less than 50 chars, it's not the list we are looking
  				// for.
  				if(!text || text.length < 50){ 
  					return;
  				}
  				text = this.innerText;
  				var matches = text.compact().match(ingredientRegex);
  				// No ingredients in this dom
  				if(!matches){
  					return;
  				}
  				// one match is probably a false positive, unless they page only has
  				// one ingredient, what kind of recipe is that.
  				if(matches.length > 1){
  					// The number of ingredient matches / how large the element is
  					// a list of ingredients should have a very high ratio.
  					var ratio = matches.length/text.compact().length;
  					// If the ratio of ingredients to to text is greater then the last
  					// one we found, use this.
  					if(ratio > guessedElement.ratio){
  						guessedElement.ratio = ratio;
	  					guessedElement.ele = $(this);
	  					guessedElement.matches = matches;
	  					guessedElement.text = text;
  					}
  				}
  			});
  			var items = []; // will hold the final list of ingredients
  			// loop through each line of the matches and parse them into groups.
  			guessedElement.matches.forEach(function(str){
  				var item = {};
  				// Extract qty from item.
  				item.qty = /(\d+(?:\.)?(?:\s+)?(?:\d+)?(?:\s*\/\d+)?)/.exec(str)[1].trim();
  				str = str.replace(item.qty, '').trim();
  				// Extract quantity type from string
  				item.qtyType = new RegExp('('+foodUnits+')').exec(str)[1].trim();
  				str = str.replace(item.qtyType, '');
  				item.name = str.trim();
  				items.push(item);
  			});
  			return items;
  		}
  	};
  }
);