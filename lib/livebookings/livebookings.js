var fs = require('fs');

var livebookings = function () {
  var body; 
  var actionAttr = 'xmlns="http://schemas.livebookings.net/OneFormat/Aggregator/External/1/0/"';
  var that = {};

  that.buildXML = function (action, params) {
    params = params || {};
    action += 'Request';
    var xmlTag;
    var file = fs.readFileSync(__dirname + '/soap_template.xml').toString();
    var soapBody = '<' + action + ' ' + actionAttr + '>\n';
    for (key in params) {
      key.indexOf('_') !== -1 ? xmlTag = convert(key) : xmlTag = key;
      soapBody += '<' + xmlTag + '>' + params[key] + '</' + xmlTag + '>\n';
    }
    soapBody += '</' + action + '>';
    body = file.replace(/\#body/, soapBody);
  }

  var convert = function (key) {
    var tmp = key.split('_'), tag;
    for(var i = 0; i < tmp.length; ++i) {
      tmp[i] = capitalize(tmp[i]);
    }
    return tmp.join(',').replace(',', '');
  }

  var capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  that.body = function () {
    return body;
  }

  return that;
}

module.exports = livebookings;
