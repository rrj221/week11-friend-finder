//friends
app.get('/friends', function (req, res) {
	res.sendFile(path.join(__dirname, 'friends.html'));
});

//post
app.post()