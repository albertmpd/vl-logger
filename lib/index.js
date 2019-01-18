'use strict';

var conf = require('./config');
var Logger = require('./logger');
  
module.exports.createConsoleLogger = function (appInfo, options) {
  conf.load(options || {});
  conf.validate({allowed: 'strict'});
  var logger = Logger.createConsoleLogger(appInfo, conf);
  return logger;
};


