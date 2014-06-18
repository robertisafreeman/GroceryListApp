'use strict';
var Page = require('astrolabe').Page;

module.exports = Page.create({		
    backButton: 						{ get: function() { return this.findElement(this.by.id('backButton')); } },
});