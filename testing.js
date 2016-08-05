
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



function answersToNum(obj) {
	for (var key in obj) {
		if (key === 'answers') {
			obj[key].forEach(function (answer, i) {
				obj[key][i] = parseInt(answer);
				console.log(answer);
			});
		}
	}
	// return obj;
}

friends.forEach(function (friend, i) {
	answersToNum(friend);
});








