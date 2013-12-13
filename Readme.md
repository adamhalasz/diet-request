# Diet-Request
With this module you can make internal or cross site requests.

### Install:
```javascript
npm install diet-request
```

### Simple GET request example:
```javascript
new Request({
	url : 'http://twitter.com/api/call',
	end: function(response){
		console.log(response);
	}
});
```

### Request Parameters
```javascript
{
	// required, string
	'url'		: 'http://google.com/', 
	
	// defaults to `GET`, `string
	'method'	: 'GET', 
	
	// defaults to `''`, required if request method is `POST`, `string`
	'data'		: {""}, 
	
	// defaults to `query.host`, `string`
	'host'		: 'google.com', 
	
	// defaults to `query.path`, `string`
	'path'		: '/',
	
	// defaults to `80` if http, `443` if https, `integer`
	'port'		: 80,
	
	// detaults to `[{'Content-Type': 'application/x-www-form-urlencoded'}]`, `array`
	'headers'	: [{'Content-Type': 'application/x-www-form-urlencoded'}]
}
```

