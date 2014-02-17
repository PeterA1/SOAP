var livebookings = require('../../../lib/livebookings/livebookings.js')(),
    fs = require('fs'),
    xml2js = require('xml2js');

describe('livebookings', function () {
  describe('buildXML', function () {

    it('is a function', function () {
      expect(livebookings.buildXML).to.be.a('function');
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
      before(function () {
        livebookings.buildXML('SearchAvailabilityOneLocation', { SessionId: 'secret_id' });
      });
      it('stores in a variable', function (done) {
        parse(livebookings.body(), function (err, result) {
          result = JSON.stringify(result);
          result.should.eq(xml);
          done();
        });
      });
    });
  });

});
