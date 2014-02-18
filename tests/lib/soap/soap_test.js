var Soap = require('../../../lib/soap/soap.js'),
    fs = require('fs'),
    xml2js = require('xml2js');

describe('soap', function () {
  describe('buildXML', function () {
    var soap = Soap();
    it('is a function', function () {
      expect(soap.buildXML).to.be.a('function');
    });

    describe('request body', function () {
      var xml, parse = xml2js.parseString;
      before(function (done) {
        var file = fs.readFileSync(rootDir + '/files/test_soap.xml').toString();
        parse(file, function (err, result) {
          xml = JSON.stringify(result);
          done();
        });
      });
      describe('no need for converting', function () {
        before(function () {
          soap.buildXML('SearchAvailabilityOneLocation', { SessionId: 'secret_id' });
        });

        it('stores in a variable', function (done) {
          parse(soap.body(), function (err, result) {
            result = JSON.stringify(result);
            result.should.eq(xml);
            done();
          });
        });

      });

      describe('converts key', function () {
        before(function () {
          soap.buildXML('SearchAvailabilityOneLocation', { session_id: 'secret_id' });
        });

        it('stores in a variable', function (done) {
          parse(soap.body(), function (err, result) {
            result = JSON.stringify(result);
            result.should.eq(xml);
            done();
          });
        });

      });
    });
  });
  describe('soapAction', function () {
    var soap = Soap();
    it('unknown', function () {
      expect(soap.action).to.throw('run buildXML beforehand');
    });
    describe('body has been build', function () {
      before(function () {
        soap.buildXML('SearchAvailabilityOneLocation', { session_id: 'secret_id' });
      });
      it('has been stored', function () {
        expect(soap.action()).to.eq('http://schemas.livebookings.net/OneFormat/Aggregator/External/1/0/ExternalPortType/SearchAvailabilityOneLocationRequest');
      });
    });
  });
});
