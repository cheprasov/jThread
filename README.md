jThread
=======

A simple way to use multi-threading in javascript. Based on web workers.

Syntax: 
------

	jThread ( worker, done );
	
	* this function returns new function based on worker and done;
	* returned function takes one param to send it to worker-function.
	
	* worker - function for new thread;
	
	* done - function called when worked will be finished;

Using:
------
Use script tag for include "jThread.js" file.

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
