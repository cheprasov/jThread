// Author: Alexander Cheprasov
// Email: alexander@cheprasov.com

(function(){
	"use strict";

	var jThread = window.jThread = function ( thread, done, config ) {

		config = config || {
			once : false
		}

		if ( this instanceof jThread ) return jThread(thread, done);

		if (
			! thread || typeof(thread) !== 'function'
			|| ! done || typeof(done) !== 'function'
		) return null;

		if ( ! window.Worker || ! window.URL || ! window.URL.createObjectURL || ! window.Blob ) {

			//return simple async function
			var times = 0;
			return function ( ) {
				var args = Array.prototype.slice.call(arguments);
				if ( config.once && times ) return ;
				setTimeout(function(){
					if ( config.once && times ) return ;
					times += 1;
					done ( thread.apply(thread, args), 'timer' )
				},1);
			}//fun

		}//if

		var worker = new Worker (
				window.URL.createObjectURL(
					new Blob(
						['self.onmessage = function ( wrk ) { var f = '+ Function.toString.call(thread) +'; self.postMessage( { status : "done", result : f.apply(f, wrk.data.args ) } ); '+ ( config.once ? ' self.close(); ' : '' ) +' };']
						,{type : 'text/javascript'}
					)
				)
			);

		worker.onmessage = function ( wrk ) {
			if ( typeof(wrk.data) === 'object' && wrk.data.status ) {
				done (wrk.data.result, wrk.data.status);
			} else {
				done (wrk.data);
			}//if
		}//fun

		return function (/* args */) {
			var obj = {
				args : Array.prototype.slice.call(arguments)
			};
			worker.postMessage(obj);
		}//fun

	}//fun

}());
