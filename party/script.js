window.onLoad = onLoad();
function onLoad() {
	var passwordAttempt = prompt("Please enter your password");
	if (passwordAttempt === "kayak") {
		$("*").css("color", "black");
		$(".dec").css("color", "red");
		$(".conf").css("color", "green");
		$('img').attr('src', 'weather.png');
		console.log('hi');
	} else {
		alert("Incorrect password!");
	};
	if ($(window).width() < 989){
		$('img').css('width','100%');
	};
};
// Parse.initialize("vsF5q80FTmsbItYXMfplXP4MM1qXga7DuHZiD9gF", "QLEH2AXrTVxQ0xLXCTcfYwh5PSWsqHgPm00Ez0b6");






// var Invitees = Parse.Object.extend("Invitees");
// // var invitee = new Invitees();
// // invitee.save({
// //   name: 'Yash Plorer',
// //   status: 'Confirmed',
// //   linkedIn: 'false',
// //   source: 'birth'
// // }, {
// //   success: function(invitee) {
// //     // The object was saved successfully.
// //   },
// //   error: function(invitee, error) {
// //     // The save failed.
// //     // error is a Parse.Error with an error code and description.
// //   }
// // });
// var query = new Parse.Query(Invitees);
// var invitee = new Invitees();
// console.log(invitee.get("name"));
// // var hi = query.get('Ydq0h4smmg', {
// //   success: function(invitee) {
// //     // The object was retrieved successfully.
// //   },
// //   error: function(object, error) {
// //     // The object was not retrieved successfully.
// //     // error is a Parse.Error with an error code and description.
// //   }
// // });
// // console.log(hi);