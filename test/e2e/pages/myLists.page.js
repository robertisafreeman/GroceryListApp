'use strict';
var Page = require('astrolabe').Page;

module.exports = Page.create({
    addItem: { get: function() { return this.findElement(this.by.id('addItem')); } }, // finds an input element with the name 'username'
});