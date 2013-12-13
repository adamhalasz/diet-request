# Request
With this module you can make internal or cross site requests.

## Simple GET request example:
```
	new Request({
		url : 'http://twitter.com/api/call',
		end: function(response){
			console.log(response);
		}
	});
```

## Request Parameters
```javascript
{
	// required, string
	'url'		: 'http://google.com/', 
	
	// defaults to `GET`, `string
	'method'	: 'GET', 
	
	// defaults to `''`, required if request method is `POST`, `string`
	'data'		: {""}, 
	
	// defaults to `query.host`, `string`
	'host'		: 'google.com', // required string
	
	// defaults to `query.path`, `string`
	'path'		: '/', // required string
	
	// defaults to `80` if http, `443` if https, `integer`
	'port'		: 80, // required string
	
	// detaults to `[{'Content-Type': 'application/x-www-form-urlencoded'}]`, `array`
	'headers'	: [{'Content-Type': 'application/x-www-form-urlencoded'}], // required string
}
```

