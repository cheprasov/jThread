jThread
=======

A simple way to use multi-threading in javascript. Based on web workers.


Using:
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

