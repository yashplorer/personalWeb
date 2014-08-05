window.onLoad = onLoad();
function onLoad() {
	var passwordAttempt = prompt("Please enter your password");
	if (passwordAttempt === "surfbird") {
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
Parse.initialize("vsF5q80FTmsbItYXMfplXP4MM1qXga7DuHZiD9gF", "QLEH2AXrTVxQ0xLXCTcfYwh5PSWsqHgPm00Ez0b6");
 // var TestObject = Parse.Object.extend("TestObject");
 // var testObject = new TestObject();
 // testObject.save(
 // 	{foo: "bar"}
 // 	).then(function(object) {
 // 		alert("yay! it worked");
 // });
name.set("Name", "Yash");
name.save();