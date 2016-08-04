


//ROUTES///////////////
//home page
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'app/public/home.html'));
});

//survey
app.get('/survey', function (req, res) {
	res.sendFile(path.join(__dirname, 'app/public/survey.html'));
});

//friends
app.get('/friends', function (req, res) {
	res.sendFile(path.join(__dirname, 'friends.html'));
});