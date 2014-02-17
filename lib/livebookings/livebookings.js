var fs = require('fs');

var livebookings = function () {
  var body; 
  var actionAttr = 'xmlns="http://schemas.livebookings.net/OneFormat/Aggregator/External/1/0/"';
  var that = {};

  that.buildXML = function (action, params) {
    action += 'Request';
    var file = fs.readFileSync(__dirname + '/soap_template.xml').toString();
    var soapBody = '<' + action + ' ' + actionAttr + '>\n';
    for (key in params) {
      soapBody += '<' + key + '>' + params[key] + '</' + key + '>\n';
    }
    soapBody += '</' + action + '>';
    body = file.replace(/\#body/, soapBody);
  }

  that.body = function () {
    return body;
  }

  return that;
}

module.exports = livebookings;
