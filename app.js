var http = require('http'),
    net = require('net'),
    livebookings = require('./lib/livebookings/livebookings')();
    
    livebookings.buildXML('GetSessions');
var req = http.request(livebookings.requestOptions(), function (res) {
  console.log(res.statusCode);
  var buffer = '';
  res.on('data', function (data) {
    buffer += data + '\n';
  });
  res.on('end', function (data) {
    console.log(buffer);
  });
});

req.write(livebookings.body());
req.on('error', function (err) { throw err; });
req.end();
