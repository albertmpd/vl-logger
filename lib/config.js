'use strict';

var convict = require('convict'),
  logLevels = ['silly', 'verbose', 'debug', 'info', 'warn', 'error'];

var conf = convict({
  logLevel: {
    doc: 'Logging level, valid values: ' + logLevels,
    format: function check (val) {
      if (logLevels.indexOf(val) < 0) {
        throw new Error('Valid values are: ' + logLevels);
      }
    },
    default: 'info'
  }
});

conf.validate({allowed: 'strict'});
conf.logLevels = logLevels;

module.exports = conf;