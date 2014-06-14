'use strict';
var Page = require('astrolabe').Page;

module.exports = Page.create({		
    addItem: 						{ get: function() { return this.findElement(this.by.id('addItem')); } },
    newItemNameInput:   { get: function() { return this.findElement(this.by.id('newItemNameInput')); } },
    newItemQtyInput:   	{ get: function() { return this.findElement(this.by.id('newItemQtyInput')); } },
    addNewItemButton:   { get: function() { return this.findElement(this.by.xpath('/html/body/div[2]/div[3]/button[2]')); } },

		ProduceSelect: 			{ get: function() { return this.findElement(this.by.id('ProduceSelect')); } },
		FrontOfStoreSelect: { get: function() { return this.findElement(this.by.id('FrontOfStoreSelect')); } },
		BackWallSelect: 		{ get: function() { return this.findElement(this.by.id('BackWallSelect')); } },
		BakerySelect: 			{ get: function() { return this.findElement(this.by.id('BakerySelect')); } },
		MeatAndDeliSelect: 	{ get: function() { return this.findElement(this.by.id('MeatAndDeliSelect')); } },
		AisleNumInput: 			{ get: function() { return this.findElement(this.by.id('AisleNumInput')); } },
		saveLocationButton: { get: function() { return this.findElement(this.by.id('saveLocationButton')); } },
		
    unknownRow1:   						{ get: function() { return this.findElement(this.by.id('Unknownitem0')); } },
    unknownRow1Text:   				{ get: function() { return this.findElement(this.by.id('Unknownitem0Name')); } },
    unknownRow1Qty:   					{ get: function() { return this.findElement(this.by.id('Unknownitem0Qty')); } },
    unknownItem1EditButton:    { get: function() { return this.findElement(this.by.id('Unknownitem0EditButton')); } },
    unknownRow2:   						{ get: function() { return this.findElement(this.by.id('Unknownitem1')); } },
    unknownRow2Text:   				{ get: function() { return this.findElement(this.by.id('Unknownitem1Name')); } },
    unknownRow2Qty:   					{ get: function() { return this.findElement(this.by.id('Unknownitem1Qty')); } },
});