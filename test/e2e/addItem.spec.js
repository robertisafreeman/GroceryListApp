'use strict';
var listPage = require('./pages/list.page');
var myListsPage = require('./pages/myLists.page');
var ptor = protractor.getInstance();
describe('Add Items', function () {
  beforeEach(function(){
    browser.driver.get('http://127.0.0.1:9000/#/app/mylists'); 
  });
  describe('to list 1', function () {
    it('Should add 1 Milk to Test 1', function () {
      element(by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/ion-item[3]/a')).click();
      myListsPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Milk');
      listPage.newItemQtyInput.sendKeys('1');
      listPage.addNewItemButton.click();
      var text = listPage.row1Text.getText();
      expect(text).toContain('Milk');
      text = listPage.row1Qty.getText();
      expect(text).toContain('1');
    });
    it('should add 2 more milk to the total of milks totaling 3 milks', function(){
      element(by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/ion-item[3]/a')).click();
      myListsPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Milk');
      listPage.newItemQtyInput.sendKeys('2');
      listPage.addNewItemButton.click();
      ptor.switchTo().alert().accept();
      var text = listPage.row1Text.getText();
      expect(text).toContain('Milk');

      text = listPage.row1Qty.getText();
      expect(text).toContain('3');
    }); 
    it('Should add 1 Chip to Test 1', function () {
      element(by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/ion-item[3]/a')).click();
      myListsPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Chip');
      listPage.newItemQtyInput.sendKeys('1');
      listPage.addNewItemButton.click();
      var text = listPage.row2Text.getText();
      expect(text).toContain('Chip');
      browser.debugger();
      text = listPage.row2Qty.getText();
      expect(text).toContain('1');
    });
    it('should add 2 more chips to the total of chips totaling 3 chips', function(){
      element(by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/ion-item[3]/a')).click();
      myListsPage.addItem.click();
      listPage.newItemNameInput.sendKeys('Chip');
      listPage.newItemQtyInput.sendKeys('2');
      listPage.addNewItemButton.click();
      ptor.switchTo().alert().accept();
      var text = listPage.row2Text.getText();
      expect(text).toContain('Chips');

      text = listPage.row2Qty.getText();
      expect(text).toContain('3');
      browser.debugger();
    });  
  });
  
});