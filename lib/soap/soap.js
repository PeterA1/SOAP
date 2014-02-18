var fs = require('fs');

var Soap = function () {
  var body = '', requestAction;
  var actionAttr = 'xmlns="http://schemas.livebookings.net/OneFormat/Aggregator/External/1/0/"';

  var that = {};

  that.buildXML = function (action, params) {
    params = params || {};
    action += 'Request';
    requestAction = action;
    var file = fs.readFileSync(__dirname + '/soap_template.xml').toString();
    var soapBody = '<' + action + ' ' + actionAttr + '>\n';
    soapBody += buildFrom(params);
    soapBody += '</' + action + '>';
    body = file.replace(/\#body/, soapBody);
  }

  var buildFrom = function (params) {
    var xmlTag, soapBody = '';
    for (key in params) {
      key.indexOf('_') !== -1 ? xmlTag = convert(key) : xmlTag = key;
      soapBody += '<' + xmlTag + '>' + params[key] + '</' + xmlTag + '>\n';
    }
    return soapBody;
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
    return {
      host: 'integration.livebookings.net',
      path: '/webservices/external/service.asmx',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': bodyLength()
      },
      method: 'POST',
      SOAPAction: that.action()
    }
  }

  var bodyLength = function () {
    return Buffer.byteLength(body);
  }

  return that;
}

module.exports = Soap;