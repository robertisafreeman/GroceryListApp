'use strict';
var listPage = require('./pages/list.page');
var myListsPage = require('./pages/myLists.page');
// var ptor = protractor.getInstance();
describe('Selecting Item Location', function () {
  beforeEach(function () {
    browser.driver.get('http://127.0.0.1:9000/#/app/mylists');
  });
  describe('on list 1', function () {
    it('Milk should be on the back wall', function () {
      myListsPage.row1EditButton.click();
      listPage.unknownRow1.click();
      listPage.BackWallSelect.click();
      listPage.saveLocationButton.click();
      browser.debugger();
    });
  });
});