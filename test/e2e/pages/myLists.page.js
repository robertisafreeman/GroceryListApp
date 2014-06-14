'use strict';
var Page = require('astrolabe').Page;

module.exports = Page.create({
	addReusableList:{ get: function() { return this.findElement(this.by.id('addResuableList')); } }, 
	newListNameInput:{ get: function() { return this.findElement(this.by.model('list.name')); } }, 
	createNewListButton: { get: function() { return this.findElement(this.by.id('createNewList')); } }, 
  row1EditButton: { get: function() { return this.findElement(this.by.id('list1EditButton')); } },
  row2EditButton: { get: function() { return this.findElement(this.by.id('list2EditButton')); } },
  row3EditButton: { get: function() { return this.findElement(this.by.id('list3EditButton')); } },
  row4EditButton: { get: function() { return this.findElement(this.by.id('list4EditButton')); } },
  row1Text: { get: function() { return this.findElement(this.by.id('list1Name')); } },
  row2Text: { get: function() { return this.findElement(this.by.id('list2Name')); } },
  row3Text: { get: function() { return this.findElement(this.by.id('list3Name')); } },
  row4Text: { get: function() { return this.findElement(this.by.id('list4Name')); } },
});