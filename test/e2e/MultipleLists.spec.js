'use strict';
var myListsPage = require('./pages/myLists.page');
describe('Reusable Lists', function () {
  beforeEach(function () {
    browser.driver.get('http://127.0.0.1:9000/#/app/mylists');
  });
  it('should create list T1', function () {
    myListsPage.addReusableList.click();
    myListsPage.newListNameInput.sendKeys('Test 1');
    myListsPage.createNewListButton.click();
  });
  it('should create list T2', function () {
    myListsPage.addReusableList.click();
    myListsPage.newListNameInput.sendKeys('Test 2');
    myListsPage.createNewListButton.click();
  });
  it('should create list T3', function () {
    myListsPage.addReusableList.click();
    myListsPage.newListNameInput.sendKeys('Test 3');
    myListsPage.createNewListButton.click();
  });
  it('should create list T4', function () {
    myListsPage.addReusableList.click();
    myListsPage.newListNameInput.sendKeys('Test 4');
    myListsPage.createNewListButton.click();
  });
  it('should have ordered them alphabetically', function () {
    var text;
    text = myListsPage.row1Text.getText();
    expect(text).toContain('Test 1');
    text = myListsPage.row2Text.getText();
    expect(text).toContain('Test 2');
    text = myListsPage.row3Text.getText();
    expect(text).toContain('Test 3');
    text = myListsPage.row4Text.getText();
    expect(text).toContain('Test 4');
  });
});