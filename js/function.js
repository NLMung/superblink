$( document ).ready(function() {


	$("a.expand").click(function(e){
	    var toShow = $(this).attr('href');
	    $(toShow).slideToggle(400);
	    console.log('Expand' + toShow);
	    $(this).toggleClass('open');
	    e.preventDefault();
	});
	$("a.top").click(function(e){
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});

	$("a.download").click(function(e){
		var url = $(this).attr('href');
		ga('send', 'event', {
			eventCategory: 'Download',
			eventAction: 'click',
			eventLabel: event.target.href
		});
		console.log( "track! " + url ); // jQuery 1.3+
	});	
	
	$(".mejs-play").click(function(e){
		var url = $(this).closest('mejs-mediaelement').addClass('test');

		console.log( "play! " + url ); // jQuery 1.3+
	});	


	$(".footer_trigger").click(function(e){
		$(this).children('button').text($(this).text() == '\u00D7 LUKK' ? 'Om Superblink' : '\u00D7 LUKK');
		$("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
	    e.preventDefault();
	});
	
	$("a.menu_trigger.login").click(function(e){
	    var toShow = $(this).attr('href');
	    $(toShow).toggleClass('open');
	    $(this).toggleClass('open');
		$("html, body").animate({ scrollTop: 0 }, "slow");
		$(this).text($(this).text() == '\u00D7 LUKK' ? 'LOGG INN' : '\u00D7 LUKK');
	    e.preventDefault();
	});
	$(".triggers a.expand").click(function(e){
		$(this).text($(this).text() == '\u00D7 LUKK' ? 'LOGG INN' : '\u00D7 LUKK');
	    e.preventDefault();
	});	
	$(".close_open_chat").click(function(e){
		$(this).text($(this).text() == '+ ÅPNE' ? '\u00D7 LUKK' : '+ ÅPNE');
	    e.preventDefault();
	});	
	
	

	
	var currentHash = window.location.hash;
	if (currentHash) {
		console.log(currentHash);
		$(currentHash).addClass('highlight');
	}
	
	
	var width = 0;
	$('#menu-min-superblink li').each(function() {
	    var $this = $(this);
	    width += $this.outerWidth() + 4;
	});
	$('#menu-min-superblink').css({'width':width});

	$('.collected_percent').addClass('active');
	
});

function goBack() {
    window.history.back()
}