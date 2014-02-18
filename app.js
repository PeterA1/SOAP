var http = require('http'),
    net = require('net'),
    soap = require('./lib/soap/soap')();
    
    soap.buildXML('GetSessions');
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
