//here i used to have everything that is in the survey.html script


//testing out the algarithm for finding your friend

var friends = [];

var Friends = function (name, link, answers) {
	this.name = name;
	this.link = link;
	this.answers = answers;
} 

Friends.prototype.save = function () {
	friends.push(this);
}

var f1 = new Friends('ryan', 'google.com', [1,1,2,2,3,3,4,4,5,5]);
var f2 = new Friends('ryan2', 'twitter.com', [1,1,2,2,3,3,4,4,5,4]);
var f3 = new Friends('ryan3', 'bootstrap.com', [2,2,1,1,2,2,3,3,1,1]);
var f4 = new Friends('ryan4', 'facebook.com', [1,1,1,1,1,1,1,1,1,1]);

f1.save();
f2.save();
f3.save();
f4.save();


console.log(friends);

console.log(createDiffsArray(3));
friendFinder(createDiffsArray(3));
console.log(friends[friendFinder(createDiffsArray(3))].name);


function friendFinder(diffs) {	
	var bestFriendIndex = 0;

	//initialize lowestDiff
	if (diffs[0] === 'self') {
		bestFriendIndex = 1;
	}
	var lowestDiff = diffs[bestFriendIndex];

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
	return bestFriendIndex;
}



function createDiffsArray(i) {
	var lonely = friends[i].answers;
	console.log(lonely);
	var diffs = [];
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
	lonelyArray.forEach(function(object, k) {
		var diff = Math.abs(lonelyArray[k] - possibleMatchArray[k]);
		totalDiff += diff;
	})
	return totalDiff;
}


