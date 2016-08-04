var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//set up express app
var app = express();
var PORT = 3000;

//set up express to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//DATA?////////////////
var friends = [];


//ROUTES///////////////
//home page
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'app/public/home.html'));
});

//survey
app.get('/survey', function (req, res) {
	res.sendFile(path.join(__dirname, 'app/public/survey.html'));
});

//show all friends
app.get('/friends/all', function (req, res) {

});

//new friend
app.post('/friends', function (req, res) {
	var newFriend = req.body;
	friends.push(newFriend);

	console.log(newFriend);
	res.json(friends);
});











//LISTEN/////////////
app.listen(PORT, function () {
	console.log('App listening on PORT', PORT);
});