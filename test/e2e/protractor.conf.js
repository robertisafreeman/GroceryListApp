// An example configuration file.
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
  }
};