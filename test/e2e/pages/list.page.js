'use strict';
var Page = require('astrolabe').Page;

module.exports = Page.create({
    newItemNameInput:   { get: function() { return this.findElement(this.by.xpath('/html/body/div[2]/div[2]/input[1]')); } },
    newItemQtyInput:   { get: function() { return this.findElement(this.by.xpath('/html/body/div[2]/div[2]/input[2]')); } },
    addNewItemButton:   { get: function() { return this.findElement(this.by.xpath('/html/body/div[2]/div[3]/button[2]')); } },
    row1Text:   { get: function() { return this.findElement(this.by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/span/ion-item[1]/span[2]')); } },
    row1Qty:   { get: function() { return this.findElement(this.by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/span/ion-item[1]/a[1]/span[1]')); } },
    row2Text:   { get: function() { return this.findElement(this.by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/span/ion-item[2]/span[2]')); } },
    row2Qty:   { get: function() { return this.findElement(this.by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/span/ion-item[2]/a[1]/span[1]')); } },
});