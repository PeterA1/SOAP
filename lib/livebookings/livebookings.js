var fs = require('fs');

var livebookings = function () {
  var body, requestAction;
  var actionAttr = 'xmlns="http://schemas.livebookings.net/OneFormat/Aggregator/External/1/0/"';
  var requestOptions = {
    host: 'integration.livebookings.net',
    path: '/webservices/external/service.asmx',
    'Content-Type': 'text/xml; charset=utf-8'
  }
  var that = {};

  that.buildXML = function (action, params) {
    params = params || {};
    action += 'Request';
    requestAction = action;
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

  that.action = function () {
    if (!requestAction) throw new Error('run buildXML beforehand'); 
    return 'http://schemas.livebookings.net/OneFormat/Aggregator/External/1/0/ExternalPortType/' + requestAction;
  }

  that.requestOptions = function () {
    return requestOptions;
  }

  return that;
}

module.exports = livebookings;
