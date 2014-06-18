'use strict';
var listPage = require('./pages/list.page');
var myListsPage = require('./pages/myLists.page');
var appPage = require('./pages/app.page');
var ptor = protractor.getInstance();
var first = true;
describe('Add Items', function () {
  beforeEach(function () {
    if(first){
        first = false;
        return;
    }
    appPage.backButton.click(); 
  });
  describe('to list 1', function () {
    it('Should add 1 Milk to Test 1', function () {
      myListsPage.row1EditButton.click();
      listPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Milk');
      listPage.newItemQtyInput.sendKeys('1');
      listPage.addNewItemButton.click();
      var text = listPage.milkText.getText();
      expect(text).toContain('Milk');
      text = listPage.milkQty.getText();
      expect(text).toContain('1');
    });
    it('should add 2 more milk to the total of milks totaling 3 milks', function () {
      myListsPage.row1EditButton.click();
      listPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Milk');
      listPage.newItemQtyInput.sendKeys('2');
      listPage.addNewItemButton.click();
      ptor.switchTo().alert().accept();
      var text = listPage.milkText.getText();
      expect(text).toContain('Milk');
      text = listPage.milkQty.getText();
      expect(text).toContain('3');
    });
    it('Should add 1 Chip to Test 1', function () {
      myListsPage.row1EditButton.click();
      listPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Chip');
      listPage.newItemQtyInput.sendKeys('1');
      listPage.addNewItemButton.click();
      var text = listPage.chipText.getText();
      expect(text).toContain('Chip');
      text = listPage.chipQty.getText();
      expect(text).toContain('1');
    });
    it('should add 2 more chips to the total of chips totaling 3 chips', function () {
      myListsPage.row1EditButton.click();
      listPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Chip');
      listPage.newItemQtyInput.sendKeys('2');
      listPage.addNewItemButton.click();
      ptor.switchTo().alert().accept();
      var text = listPage.chipText.getText();
      expect(text).toContain('Chips');
      text = listPage.chipQty.getText();
      expect(text).toContain('3');
    });
  });
	describe('to list 2', function () {
		it('should not contain anything from list 1', function () {
			myListsPage.row2EditButton.click();
			var pageText = element(by.xpath('/html')).getText();
			expect(pageText).not.toContain('Milk');
			expect(pageText).not.toContain('Chip');
			
		});
		it('should add Cheese', function () {
			myListsPage.row2EditButton.click();
			listPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Cheese');
      listPage.newItemQtyInput.sendKeys('1');
      listPage.addNewItemButton.click();
      var text = listPage.cheeseText.getText();
      expect(text).toContain('Cheese');
      text = listPage.cheeseQty.getText();
      expect(text).toContain('1');
		});
	});
	describe('list 1', function () {
		it('should not contain cheese from list 2', function () {
			myListsPage.row1EditButton.click();
			var pageText = element(by.xpath('/html')).getText();
			expect(pageText).not.toContain('Cheese');
			// appPage.backButton.click(); 
		});
	});
});