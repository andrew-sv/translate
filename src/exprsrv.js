var express = require('express');
var path = require('path');
var translator = require('./translate/translate');

var app = express();

app.use(express.static(path.join(__dirname, "./client")));

app.get('/api', function (req, res) {
    res.send('API is running');
});

app.get('/api/translate', function (req, res) {
	var query = req.query;
	var from = query.from || 'en',
		to = query.to || 'de',
		text = query.text || '';
	translator.translate(from, to, text, function(orig, trans){
		res.send({ original: orig, translated: trans });
	});
});

app.listen(1337, function(){
	console.log('Express server listening on 1337 port')
});