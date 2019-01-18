'use strict';

// From https://www.npmjs.com/package/regex-iso-date:
var IsoDateRegex = /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/;
var expect = require('chai').expect;
var intercept = require('intercept-stdout');
var Sut = require('../lib/index');
var util = require('util');

describe('logging', function () {
  var unhook, nfsComponents, sampleObj = {foo: 'bar'};

  beforeEach(function () {
    unhook = intercept(
      function (stdout) {
        nfsComponents = stdout.split(' ');
      });

    var sut = Sut.createConsoleLogger({name: 'Expected-Service-Name', version: 'Expected-Service-Version'});

    sut.info('Expected-Info-Message', sampleObj);
  });

  afterEach(function () {
    unhook();
  });

  it('should show ISO timestamp first', function () {
    expect(IsoDateRegex.test(nfsComponents[0])).to.be.true;
  });

  it('should show service-name', function () {
    expect(nfsComponents[1]).to.equal('[Expected-Service-Name]');
  });

  it('should show log level third', function () {
    expect(nfsComponents[2]).to.equal('[INFO]');
  });

  it('should show message fourth', function () {
    expect(nfsComponents[3]).to.equal('Expected-Info-Message');
  });

  it('should show the stringified version of the object argument', function () {
    var objStr = nfsComponents.slice(4).join(' ');
    expect(objStr).to.equal(util.inspect(sampleObj) + '\n');
  });
});

