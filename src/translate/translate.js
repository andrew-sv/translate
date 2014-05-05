exports.translate = function(orig, trans, text, callback) {
	var http = require('http');

	var translateUrl = 'http://translate.google.ru/translate_a/t?client=x&sl='+orig+'&tl='+trans+'&text='+text;

	var options = {
		host: 'translate.google.ru',
		port: 80,
		path: '/translate_a/t?client=x&sl='+orig+'&tl='+trans+'&text='+text,
		method: 'GET',
		headers: {'accept': 'text/javascript; charset=UTF-8', 'accept-charset': 'UTF-8'}
	}

	var req = http.request(options, function(res) {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
	  	res.setEncoding('utf8');
	  	var body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function(){
			var resp = JSON.parse(body);
			var original = resp.sentences[0].orig;
			var translated = resp.sentences[0].trans;
			callback(original, translated);
			console.log('Original: ' + resp.sentences[0].orig);
			console.log('Translate: ' + resp.sentences[0].trans);
		})
	});
	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});
	req.end();
}

