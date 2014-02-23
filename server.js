var http = require('http'),
    net = require('net'),
    Soap = require('./lib/soap/soap');
    
var soap = new Soap();
    soap.buildXML('GetSessions');
    console.log(soap.requestOptions());
var req = http.request(soap.requestOptions(), function (res) {
  console.log(res.statusCode);
  var buffer = '';
  res.on('data', function (data) {
    buffer += data + '\n';
  });
  res.on('end', function (data) {
    console.log(buffer);
  });
});

req.write(soap.body());
req.on('error', function (err) { throw err; });
req.end();
