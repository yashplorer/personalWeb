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
