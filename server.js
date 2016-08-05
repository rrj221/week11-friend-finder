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
var friends = [{
	name: 'Agree-able Person', 
	link: 'https://pbs.twimg.com/profile_images/3439323223/a4167927b491d857dac9d8b27f50b983.jpeg',
	answers: ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5']
}, {
	name: 'Disagree-able Person',
	link: 'http://pbs.twimg.com/profile_images/2959341443/0d8728a5fe41e23bb3287451ecaf25f0.png',
	answers: ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1']
}];




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

	//convert array to numbers
	friends.forEach(function (friend, i) {
		answersToNum(friend);
	});

	//FIND FRIEND and serve to browser
	res.json(friends[friendFinder(createDiffsArray(friends.length - 1))]);

	// console.log(newFriend);
	// res.json(friends);
});











//LISTEN/////////////
app.listen(PORT, function () {
	console.log('App listening on PORT', PORT);
});



//FUNCTIONS
function answersToNum(obj) {
	for (var key in obj) {
		if (key === 'answers') {
			obj[key].forEach(function (answer, i) {
				obj[key][i] = parseInt(answer);
				console.log(answer);
			});
		}
	}
}


//friend finder functions
function friendFinder(diffs) {	
	//initialize lowestDiff
	var bestFriendIndex = 0;
	if (diffs[0] === 'self') {
		bestFriendIndex = 1;
	}
	var lowestDiff = diffs[bestFriendIndex];

	//if the total difference is lower than the current one, set the 
	//lowest diff index to this one
	diffs.forEach(function (diff, i) {
		console.log(i, diff)
		if (diff !== 'self') {
			if (diff < lowestDiff) {
				lowestDiff = diff;
				bestFriendIndex = i;
			}
		}
	});
	console.log(bestFriendIndex, lowestDiff);

	//because the indexes of the diffs array and the friends object line up,
	//this returns the index of the friends array that is the best friend
	return bestFriendIndex;  
}



function createDiffsArray(i) {           //returns an array that looks like this
	var lonely = friends[i].answers;		//[[1,1,1,2,4,2...], [3,2,4,2...],...,'self']
	console.log(lonely);					//the indexes line up with the friends object
	var diffs = [];							//even if a friend besides the last one is passed in
	friends.forEach(function(object, j) {
		if (i !== j) {
			var possibleMatch = object.answers;
			diffs.push(getDiff(lonely, possibleMatch));
		} else {
			diffs.push('self');
		}
	});
	return diffs;
}

function getDiff(lonelyArray, possibleMatchArray) {
	var totalDiff = 0;

	//loops through and gets the difference in absolute values, then adds to total difference
	lonelyArray.forEach(function(object, k) {
		var diff = Math.abs(lonelyArray[k] - possibleMatchArray[k]);
		totalDiff += diff;
	})
	return totalDiff;
}