'use strict';
describe('Reusable Lists', function () {
  beforeEach(function(){
    browser.driver.get('http://127.0.0.1:9000/#/app/mylists'); 
  });
  it('should create list T1', function () {
    element(by.id('addResuableList')).click();
    element(by.model('list.name')).sendKeys('Test 1');
    element(by.id('createNewList')).click();
  });
  it('should create list T2', function () {
    element(by.id('addResuableList')).click();
    element(by.model('list.name')).sendKeys('Test 2');
    element(by.id('createNewList')).click();
  });
  it('should create list T3', function () {
    element(by.id('addResuableList')).click();
    element(by.model('list.name')).sendKeys('Test 3');
    element(by.id('createNewList')).click();
  });
  it('should create list T4', function () {
    element(by.id('addResuableList')).click();
    element(by.model('list.name')).sendKeys('Test 4');
    element(by.id('createNewList')).click();
  });
  it('should have ordered them alphabetically', function(){
    var text;
    text = element(by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/ion-item[3]')).getText();
    expect(text).toContain('Test 1');
    
    text = element(by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/ion-item[4]')).getText();
    expect(text).toContain('Test 2');

    text = element(by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/ion-item[5]')).getText();
    expect(text).toContain('Test 3');

    text = element(by.xpath('/html/body/ion-nav-view/div/ion-pane/ion-nav-view/ion-view/ion-content/div[1]/ion-list/div/ion-item[6]')).getText();
    expect(text).toContain('Test 4'); 
  });
});