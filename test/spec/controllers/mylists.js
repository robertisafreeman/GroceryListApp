'use strict';

describe('Controller: MylistsCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var MylistsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MylistsCtrl = $controller('MylistsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
