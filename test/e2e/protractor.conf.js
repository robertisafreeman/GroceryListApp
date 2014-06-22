'use strict';
// An example configuration file.
/* global protractor */
exports.config = {
  capabilities: { 'browserName': 'chrome' },
  specs: [
    'MultipleLists.spec.js',
    'AddItem.spec.js',
    'ItemLocation.spec.js'
  ],
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: true,
    // includeStackTrace: false
  },
  allScriptsTimeout: 20000,
  onPrepare: function(){
      var ptor = protractor.getInstance();
      browser.driver.manage().window().maximize();  
      // ptor.ignoreSynchronization = true;    
      browser.driver.get('http://localhost:4400/?enableripple=cordova-3.0.0-Nexus4');
      browser.sleep(2000);
      browser.driver.switchTo().frame(0);
    }
};