jThread
=======

A simple way to use multi-threading in javascript. Based on web workers.
Web workers without a separate Javascript file.

Syntax: 
------

	var thread = jThread ( worker, done );
	    thread( param );
	
	* this function returns new function based on worker and done;
	* returned function takes one param to send it to worker-function.
	
	* worker (data) - function for new thread; Only one param to getting. Example: work = function(arr){...};
	
	* done (data, status) - function called when worked will be finished;
	
	* param - only one param, but you can use object or array like group for several params;

Using:
------
Use tag 'script' for include "jThread.js" file.

	// Example 1

	// function for Thread
	var worker = function ( arr ) {
		
		var i = arr.length;
		while ( --i > 0 ) {
			// do something
		}//while
		
		return arr;
		
	};// fun
	
	// done function
	// this function will be called when function "worker" makes return ;
	var done = function ( arr ) {
		console.log(arr);
	};//fun
	
	// create new Thread-function.
	var thread = jThread( worker, done );
		thread( [1,2,3,4,5,6,7] );
	
	
	// Example 2
		
	// You can use simple calling like this
	jThread(
		function(arr){
			...
			return arr;
		}
		,function(arr){
			...
		}
	)( [1,2,3,4,5,6,7] );
