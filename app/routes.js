var Nerd = require('./models/nerd');
var fs	 = require('fs');
module.exports = function(app) {
	app.get('/api/nerds', function(req, res){
		Nerd.find(function(err, nerds){
			if (err)
				res.send(err);
			res.json(nerds);
		});
	});

	app.get('/comments.json', function (req, res){
		console.log('eh');
		fs.readFile('_comments.json', function (err, data){
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		});
	});

	app.post( '/comments.json', function(req, res) {
		fs.readFile('_comments.json', function(err, data){
			var comments = JSON.parse(data);
			comments.push(req.body);
			fs.writeFile('_comments.json', JSON.stringify(comments, null, 4), function(error) {
				res.setHeader('Content-Type', 'application/json');
				res.setHeader('Cache-Control', 'no-cache');
				res.send(JSON.stringify(comments));
			});
		});	
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html');
	});
};


