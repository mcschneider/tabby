/* =============================================================
 * ios-orientation-change-fix.js v1.0.0
 * Fixes zoom on rotation bug in iOS.
 * Script by @scottjehl, rebound by @wilto
 * https://github.com/scottjehl/iOS-Orientationchange-Fix
 * MIT / GPLv2 License
 * ============================================================= */

(function(w){
	
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent;
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}

    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( (!w.orientation || w.orientation === 180) && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );

})( this );





/* =============================================================
 * tabby.js v1.0
 * Simple, mobile-first toggle tabs.
 * Script by Chris Ferdinandi - http://gomakethings.com
 * Licensed under WTFPL - http://www.wtfpl.net
 * ============================================================= */

$(function () {
    $('.tabs a').click(function(e) {
        e.preventDefault(); // Prevent default link behavior.
        var tabID = $(this).attr('href'); // Pull the href value as the tabID.

        $(this).addClass('active').parent().addClass('active'); // Add the .active class to the link and it's parent li (if one exists).
        $(this).siblings().removeClass('active'); // Remove the .active class from sibling tab navigation elements.
        $(this).parent('li').siblings().removeClass('active').children().removeClass('active'); // Remove the .active class from sibling li elements and their links.
        $(tabID).addClass('active'); // Add the .active class to the div with the tab content.
        $(tabID).siblings().removeClass('active'); // Remove the .active class from other tab content divs.
    });
});





/* =============================================================
 * accessibility-styles.js v1.0.0
 * Adds .js class to <body> for progressive enhancement.
 * Script by Chris Ferdinandi - http://gomakethings.com
 * Licensed under WTFPL - http://www.wtfpl.net
 * ============================================================= */

$(function () {
    $('body').addClass('js'); // On page load, add the .js class to the <body> element.
});
