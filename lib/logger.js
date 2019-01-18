'use strict';

var util = require('util'),
  noop = function () {
  };

module.exports.createConsoleLogger = function (appInfo, conf) {
  var levels = conf.logLevels,
    logLevel = conf.logLevel, //['silly', 'verbose', 'debug', 'info', 'warn', 'error']
    logger = { level: logLevel },
    shouldLog = function (level) {
      return levels.indexOf(level) >= levels.indexOf(logLevel);
    };
  levels.forEach(function (level) {
    logger[level] = shouldLog(level) ? log : noop;

    function log() {
      var prefix = function () {
        return `[${new Date().toISOString()}] [${appInfo.name}] [${level.toUpperCase()}]`;
      };
      var normalizedLevel;

      switch (level) {
        case 'silly':
          normalizedLevel = 'info';
          break;
        case 'verbose':
          normalizedLevel = 'info';
          break;
        case 'debug':
          normalizedLevel = 'info';
          break;
        default:
          normalizedLevel = level;
      }

      prefix = prefix(level);

      if (typeof arguments[0] === 'object')
        arguments[0] = util.inspect(arguments[0], { depth: 4 });

      arguments[0] = util.format(prefix, arguments[0]);

      var args = [].slice.apply(arguments);
      args = args.map(function (arg) {
        if (typeof arg === 'object')
          arg = util.inspect(arg, { depth: 4 });
        return arg;
      });
      console[normalizedLevel](util.format.apply(util, args)); // eslint-disable-line
    }
  });
  return logger;
};

/*
var logger = module.exports.createConsoleLogger({ name: 'Service-Name', version: '1.0.0' }, require('./config'));
logger.info({ a: 'str', b: 2 }, "test message", 123, 45.6, false, [], { a: 1, b: [{ c: 12.4, d: { s: 'hey' } }] }, "another message");
logger.info("another message", { a: 'str', b: 2 });
logger.info({ a: 'str', b: 2 }, 'hello', 'hi');
logger.info({ foo: 'bar' });
*/