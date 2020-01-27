/**
	启动HTTP/HTTPS服务
*/
var fs = require('fs');
var path = require('path');

module.exports = function(app,port){
	var port = normalizePort(port || process.env.PORT || '80');

	var http = require('http');
	var https = require('https');

	//https配置
	var privateKey  = fs.readFileSync(path.join(__dirname, '../openssl/private.pem'), 'utf8');
	var certificate = fs.readFileSync(path.join(__dirname, '../openssl/file.crt'), 'utf8');
	var credentials = {key: privateKey, cert: certificate};
	var httpServer = http.createServer(app.callback());
	var httpsServer = https.createServer(credentials, app.callback());
	//开启HTTP和HTTPS
	httpServer.listen(port, function() {
	    console.log('HTTP Server is running on: port:%s', port);
	});
	httpsServer.listen(443, function() {
	    console.log('HTTPS Server is running on: port:%s', 443);
	});
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
