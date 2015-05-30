jThread
=======

Simple way to use multi thread in javascript.
Web workers without a separate Javascript file.

Syntax: 
------

	var thread = jThread(workerFunction, onDoneFunction);
	    thread(param [, param2 [, ...]]);
	
	* This function returns a new function based web worker (or timeout).
	* Returned function takes one or several params.

	* workerFunction - function for new thread;  Example: workerFunction = function(a, b, c) {return a+ b + c;}
	
	* onDoneFunction (result, status) - function called when worker function will be finished;
	* status === 'worker' - using Web Worker.
	* status === 'timer' - using Timers (Browser not support web workers, for old Browsers)


Using:
------
Use tag 'script' for include "jThread.js" file.

	// Example 1

	// function for Thread
	var worker = function(arr) {
		var i = arr.length;
		while (--i > 0) {
			// do something
		}
		return arr;
	};
	
	// onDone function
	// this function will be called when function "worker" makes return ;
	var onDone = function(result) {
		console.log(result);
	};
	
	// create new Thread-function.
	var thread = jThread(worker, onDone);
	// and execute it with array
	thread([1, 2, 3, 4, 5]);



	// Example 2
		
	// You can use simple calling like this
	jThread(
		function(a, b, c) {
			return a * b * c;
		}
		,function(result, status) {
			alert(result + ' : ' + status);
		}
	)(10, 15, 25);
