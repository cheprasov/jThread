// Author: Alexander Cheprasov
// Email: alexander@cheprasov.com

(function(){
	"use strict";

	var jThread = window.jThread = function ( thread, done ) {

		if ( this instanceof jThread ) return jThread(thread, done);

		if (
			! thread || typeof(thread) !== 'function'
			|| ! done || typeof(done) !== 'function'
		) return null;

		if (! window.Worker || ! window.URL || ! window.URL.createObjectURL || ! window.Blob ) {
			
			//return simple async function
			return function ( msg ) {
				setTimeout(function(){done(thread(msg))},1);
			}//fun

		}//if

		var worker = new Worker (
				window.URL.createObjectURL(
					new Blob(
						['onmessage = function(w){ postMessage({status:"done",result:(' + Function.toString.call(thread)+'(w.data))}); };']
						,{type : 'text/javascript'}
					)
				)
			);

		worker.onmessage = function ( w ) {
			if ( typeof(w.data) === 'object' && w.data.status === 'done' ) {
				done (w.data.result, w.data.status);
			} else {
				done (w.data);
			}//if
		}//fun

		return function ( msg ) {
			worker.postMessage(msg);
		}//fun

	}//fun

}());
