/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Original Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 

//////
Enhanced by Jason Post, 2014. 

Added JavaScript to add class, ID and title to img element.

Add a class in top parent span that will be added to all span tags with "data-class"

Add specific classes based on child spans with "class"

<span data-class="parentClassApplied">
    <span class="specificClassOne" ...etc...  ></span>
    <span class="specificClassTwo" ...etc...  ></span>
</span>

Add titles with "data-title" and ID with with "data-id"

You can combine top parent class names with specific names too. The script adds them with a space in the middle. From the preceding example, the complete class added to the first image span would be class="parentClassApplied specificClassOne"

*/

(function( w ){

	// Enable strict mode
	"use strict";

	w.picturefill = function() {
		var ps = w.document.getElementsByTagName( "span" );

		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			if( ps[ i ].getAttribute( "data-picture" ) !== null ){

				var sources = ps[ i ].getElementsByTagName( "span" ),
					matches = [];

				// See if which sources match
				for( var j = 0, jl = sources.length; j < jl; j++ ){
					var media = sources[ j ].getAttribute( "data-media" );
					// if there's no media specified, OR w.matchMedia is supported 
					if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
						matches.push( sources[ j ] );
					}
				}

			// Find any existing img element in the picture element
			var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

			if( matches.length ){
				var matchedEl = matches.pop();
				if( !picImg || picImg.parentNode.nodeName === "NOSCRIPT" ){
					picImg = w.document.createElement( "img" );
					picImg.alt = ps[ i ].getAttribute( "data-alt" );
					picImg.title = ps[ i ].getAttribute( "data-title" );
				}

				picImg.src =  matchedEl.getAttribute( "data-src" );
				picImg.className = ps[ i ].getAttribute( "data-class" ) + " " + matchedEl.getAttribute( "class" );
				picImg.id = ps[ i ].getAttribute( "data-id" )
				matchedEl.appendChild( picImg );
			}
			else if( picImg ){
				picImg.parentNode.removeChild( picImg );
			}
		}
		}
	};

	// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", w.picturefill, false );
		w.addEventListener( "DOMContentLoaded", function(){
			w.picturefill();
			// Run once only
			w.removeEventListener( "load", w.picturefill, false );
		}, false );
		w.addEventListener( "load", w.picturefill, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.picturefill );
	}

}( this ));
