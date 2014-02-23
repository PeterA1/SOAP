var fs = require('fs');

var Soap = (function () {

  function Soap() {
    var actionAttr = 'xmlns="http://schemas.livebookings.net/OneFormat/Aggregator/External/1/0/"', body = '', requestAction;
    this.actionAttr = function () { return actionAttr; }
    this.getBody = function () { return body; }
    this.setBody = function (content) { body = content; }
    this.getRequestAction = function () { return requestAction; }
    this.setRequestAction = function (content) { requestAction = content; }
  }

  Soap.prototype.buildXML = function (action, params) {
    params = params || {};
    action += 'Request';
    this.requestAction(action);
    var file = fs.readFileSync(__dirname + '/soap_template.xml').toString();
    var soapBody = '<' + action + ' ' + this.actionAttr() + '>\n';
    soapBody += this._buildFrom(params);
    soapBody += '</' + action + '>';
    this.body(file.replace(/\#body/, soapBody));
  }

  Soap.prototype.requestAction = function (content) {
    if (typeof content === 'string') {
      this.setRequestAction(content);
      return this.getRequestAction();
    } else {
      return this.getRequestAction();
    }
  }

  Soap.prototype.body = function (content) {
    if (typeof content === 'string') {
      this.setBody(content);
      return this.getBody();
    } else {
      return this.getBody();
    }
  }

  Soap.prototype._buildFrom = function (params) {
    var xmlTag, soapBody = '';
    for (key in params) {
      key.indexOf('_') !== -1 ? xmlTag = this._convert(key) : xmlTag = key;
      soapBody += '<' + xmlTag + '>' + params[key] + '</' + xmlTag + '>\n';
    }
    return soapBody;
  }

  Soap.prototype._convert = function (key) {
    var tmp = key.split('_'), tag;
    for(var i = 0; i < tmp.length; ++i) {
      tmp[i] = tmp[i].capitalize();
    }
    return tmp.join(',').replace(',', '');
  }

  if (typeof String.prototype.capitalize !== 'function') {
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }

  Soap.prototype.action = function () {
    if (!this.requestAction()) throw new Error('run buildXML beforehand'); 
    return 'http://schemas.livebookings.net/OneFormat/Aggregator/External/1/0/ExternalPortType/' + this.requestAction();
  }

  Soap.prototype.requestOptions = function () {
    return {
      host: 'integration.livebookings.net',
      path: '/webservices/external/service.asmx',
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Content-Length': this._bodyLength()
      },
      method: 'POST',
      SOAPAction: this.action()
    }
  }

  Soap.prototype._bodyLength = function () {
    return Buffer.byteLength(this.body('get'));
  }


  return Soap;
})();

module.exports = Soap;

