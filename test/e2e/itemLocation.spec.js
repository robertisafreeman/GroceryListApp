'use strict';
var listPage = require('./pages/list.page');
var myListsPage = require('./pages/myLists.page');
var appPage = require('./pages/app.page');
describe('Selecting Item Location', function () {
  beforeEach(function () {
  	appPage.backButton.click(); 
  });
  describe('on list 1', function () {
    it('Milk should be on the back wall', function () {
      myListsPage.row1EditButton.click();
      listPage.milk.click();
      listPage.BackWallSelect.click();
      listPage.saveLocationButton.click();
      expect(listPage.milk.getAttribute('class')).toMatch('cat-BackWall');
    });
  });
});