'use strict';

var expect = require('chai').expect;
var Sut = require('../lib/index');

describe('config', function () {
  var originalLogLevel;

  before(function() {
    originalLogLevel = require('../lib/config').get('logLevel');
  });

  afterEach(function () {
    Sut.createConsoleLogger({}, {logLevel: originalLogLevel});
  });

  describe('log level', function() {
    it('should be configurable', function () {
      var sut = Sut.createConsoleLogger({}, {logLevel: 'debug'});
      expect(sut.level).to.equal('debug');
    });

    it('should default to "info"', function () {
      var sut = Sut.createConsoleLogger({});
      expect(sut.level).to.equal('info');
    });

    it('should be valid', function () {
      expect(Sut.createConsoleLogger.bind(Sut, {}, {logLevel: 'non-existent'}))
        .to.throw('logLevel: Valid values are: silly,verbose,debug,info,warn,error: value was "non-existent"');
    });

    it('should be case sensitive', function () {
      expect(Sut.createConsoleLogger.bind(Sut, {}, {logLevel: 'DeBug'}))
        .to.throw('logLevel: Valid values are: silly,verbose,debug,info,warn,error: value was "DeBug"');
    });
  });
});
