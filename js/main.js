jQuery(document).ready(function($) {
	// Плавный скролл
	var exceptions = sta_settings.exceptions.split(","),
		exceptionclass = '.accordion a[href*="#"]';

	// check if any more classes need to be excluded
	if( exceptions != "" ) {
		for (var i = 0; i < exceptions.length; i++) {
			exceptionclass += ', ' + exceptions[i] + ' a[href*="#"]';
		}
	}

	$('a[href*="#"]')
		.not('a[href="#"]') // Exception #1: dummy hrefs
		.not('a[href*="#modal"]')
		.not(exceptionclass) // Even more exceptions, when set by the user
		.on('click', function (e) {
			//Split link into part before and after hash mark #
			var linktHref = this.href.split('#');

			if (linktHref[1] === '') { // Exception: orphaned # at end of URL
				return;
			}

			var currentUrlRoot = window.location.href.split('#')[0],
				scrollToAnchor = $('#' + linktHref[1]);

			currentUrlRoot = currentUrlRoot.replace(/\/$/, '');
			linktHref[0] = linktHref[0].replace(/\/$/, '');

			// Do not animate for targets on another page
			if (linktHref[0] !== currentUrlRoot || !scrollToAnchor.length) {
				return;
			}

			$('html, body').animate({
				scrollTop: scrollToAnchor.offset().top - sta_settings.distance
			}, parseInt(sta_settings.speed, 10));

			e.preventDefault();
			return false;
		});

});

var sta_settings = {"distance":"60","speed":"500","exceptions":""};



