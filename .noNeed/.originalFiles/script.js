//takes window's dimensions
var viewportWidth = $(window).width();
var viewportHeight = $(window).height();

//sets CSS for index.html
$('#introImg').css('margin-top',(viewportHeight/2)-(0.15*viewportWidth) + 'px')
$('#homeWrapper').css('margin-top',viewportHeight + 'px')

//performs home animation for index.html
$('#introImg').hover(function() {
	$(this).transition({
		scale:.5,
		marginTop:-(0.1*viewportWidth) + 'px'
	}, 1000);
	$('#homeWrapper').transition({
		visibility:'visible',
		marginTop:(0.1*viewportWidth) + 'px',
		height:(0.91*viewportHeight) + 'px'
	}, 1050);
	$('#socialList').transition({ y: -(.2*viewportHeight) + 'px' });
});

//reload window on resize
$(window).resize(function() {
	location.reload();
});


//animates horizontal list items for edu/index.html
//$("#projectList li").hover(function() {
//	$("#projectList p).css('display', 'visible');
//});