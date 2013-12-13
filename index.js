// Request Module v1.0
module.exports = function(options){
	// PARSE url
	var query = url.parse(options.url);
	
	// BASE options
	request_options = {
		host: query.host,
		path: query.path,
		port: 80,
		method: 'GET',
		data: '',
	}
	
	// BASE headers
	var callback = options.end;
	
	// APPEND custom options
	request_options = hook(request_options, options);

	// CALCULATE POST data length
	if(request_options.method == 'POST'){
		request_options.headers['Content-Length'] = request_options.data.length;
	}
	
	// CLEAN up request_options
	delete request_options.url;
	delete request_options.end;
	
	// SEND request http OR https depening on url protocol	 
	var protocol_name 	= query.protocol.split(':')[0];
	var protocol 		= global[protocol_name];
	
	// SET port to 443 if the request is POST
	if(protocol_name == 'https'){ request_options.port = 443; }
	
	// DEFAULT header for HTTP
	if(protocol_name == 'http'){
		if(!request_options.headers){ request_options.headers = {}; }
		if(!request_options.headers['Content-Type']){
			request_options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		}
	}
	
	// RUN request
	var request = protocol.request(request_options, function(res) {
		
		
		switch (res.headers['content-encoding']) {
			case 'gzip':
			case 'deflate':
				// pipe the response into the gunzip to decompress
				var buffer = [];
		        var gunzip = zlib.createUnzip();            
		        res.pipe(gunzip);
		
		        gunzip.on('data', function(data) {
		            // decompression chunk ready, add it to the buffer
		            buffer.push(data.toString('utf-8'))
		
		        }).on("end", function() {
		            // response and decompression complete, join the buffer and return
		            callback(res, buffer.join("")); 
		
		        }).on("error", function(e) {
		            callback(res, e);
		        })
			break;
			default:
				var body = '';
				res.on('data', function(chunk){ 
					body += chunk.toString('utf8'); 
				});
				res.on('end', function(){
					callback(res, body); 
				});
			break;
		}
		
        
		/*
		var body = '';
		res.on('data', function(chunk){ 
			body += chunk.toString('utf8'); 
		});
		res.on('end', function(){
			console.log('response end', res.headers['content-encoding']); 
			if(res.headers['content-encoding'] == 'gzip'){
				console.log('typeof body', body);
				var buffer = new Buffer(body, 'binary');
				console.log('#buffer .... ', buffer);
				zlib.unzip(buffer, function(err, buf) {
					console.log('#BUF', buf);
					console.log('#err', err);
				  if (!err) {
				  	
				    callback(res, buf.toString('utf8'));
				  }
				});
			} else {
				callback(res, body); 
			}
		});*/
	});
	
	// ON request error
	request.on('error', function(e) {
		console.log('Request error ' + e.message);
		res.error = e.message;
		callback(res, null);
	});
	
	// WRITE POST data IF the request is POST
	if(request_options.method == 'POST'){
		request.write(request_options.data);
	}
	
	// END request
	request.end();
}