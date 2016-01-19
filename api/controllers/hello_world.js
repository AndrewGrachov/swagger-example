 var util = require('util');

function hello(req, res) {
	var name = req.query.name;
	var hello = name ? util.format('Hello, %s', name) : 'Hello, stranger!';
	res.json(hello);
}

function hello_post(req, res) {
	res.send({a: 'b'});
}

module.exports = {
	hello: hello,
	hello_post: hello_post
};
