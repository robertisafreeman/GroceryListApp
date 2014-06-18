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
		

		// Milk
    milk:   						{ get: function() { return this.findElement(this.by.id('milk-row')); } },
    milkText:   				{ get: function() { return this.findElement(this.by.id('milk-text')); } },
    milkQty:   					{ get: function() { return this.findElement(this.by.id('milk-qty')); } },
    milkEditButton:    { get: function() { return this.findElement(this.by.id('milk-EditButton')); } },
    // Chips
    chip:   						{ get: function() { return this.findElement(this.by.id('chip-row')); } },
    chipText:   				{ get: function() { return this.findElement(this.by.id('chip-text')); } },
    chipQty:   					{ get: function() { return this.findElement(this.by.id('chip-qty')); } },
    chipQtyType:   					{ get: function() { return this.findElement(this.by.id('chip-qtyType')); } },
    // Cheese
    cheese:   						{ get: function() { return this.findElement(this.by.id('cheese-row')); } },
    cheeseText:   				{ get: function() { return this.findElement(this.by.id('cheese-text')); } },
    cheeseQty:   					{ get: function() { return this.findElement(this.by.id('cheese-qty')); } },
    cheeseQtyType:   					{ get: function() { return this.findElement(this.by.id('cheese-qtyType')); } },
});