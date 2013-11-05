jThread
=======

A simple way to use multi-threading in javascript. Based on web workers.
<br>
Web workers without a separate Javascript file.

Syntax: 
------

	var thread = jThread ( worker, done, config );
	    thread( param [, param2 [, ...]] );
	
	* this function returns new function based on worker and done;
	* returned function takes params to send it to worker-function.
	* param - one or several params;
	
	* worker (data) - function for new thread;  Example: work = function(a, b, c){...};
	
	* done (data, status) - function called when worked will be finished;
	* status === 'done' - using Worker.
	* status === 'timer' - using Timers (Browser not support works, for old Browsers )

	* default config = {
	*		once : false // The worker function will be called more that one times
	*	}
	


Using:
------
Use tag 'script' for include "jThread.js" file.

	// Example 1

	// function for Thread
	var worker = function (arr) {
		
		var i = arr.length;
		while ( --i > 0 ) {
			// do something
		}//while
		
		return arr;
		
	};// fun
	
	// done function
	// this function will be called when function "worker" makes return ;
	var done = function (arr) {
		console.log(arr);
	};//fun
	
	// create new Thread-function.
	var thread = jThread( worker, done );
		thread( [1, 2, 3, 4, 5] );



	// Example 2
		
	// You can use simple calling like this
	jThread(
		function (a, b, c) {
			return a * b * c;
		}
		,function (res, status) {
			alert(res +' : '+ status);
		}
	)( 10, 15, 25 );
