'use strict';

describe('Service: localhost', function () {

  // load the service's module
  beforeEach(module('appApp'));

  // instantiate service
  var localhost;
  beforeEach(inject(function (_localhost_) {
    localhost = _localhost_;
  }));

  it('should do something', function () {
    expect(!!localhost).toBe(true);
  });

});
