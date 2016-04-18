// Author: Alexander Cheprasov
// Email: alexander@cheprasov.com

(function() {
	"use strict";

	var jThread = window.jThread = function(workerFunction, doneFunction) {

		if (this instanceof jThread) {
			return jThread(workerFunction, doneFunction);
		}

		if (typeof(workerFunction) !== 'function' || typeof(doneFunction) !== 'function') {
			throw new Error('Incorrect arguments for jThread');
		}

		if (!window.Worker || !window.URL || !window.URL.createObjectURL || !window.Blob ) {
			//return simple async function
			return function (/* args */) {
				var args = Array.prototype.slice.call(arguments);
				setTimeout(function() {
					doneFunction(workerFunction.apply(workerFunction, args), 'timer');
				}, 0);
			}
		}

		var worker = new Worker(
			window.URL.createObjectURL(
				new Blob([
						'self.onmessage = function(wrk) {' +
							'var f = ' + Function.toString.call(workerFunction) + ';' +
							'self.postMessage({status: "worker", result: f.apply(f, wrk.data.args)});' +
						'};'
					],
					{type : 'text/javascript'}
				)
			)
		);

		worker.onmessage = function(wrk) {
			doneFunction (wrk.data.result, wrk.data.status);
		}

		return function(/* args */) {
			var obj = {
				args : Array.prototype.slice.call(arguments)
			};
			worker.postMessage(obj);
		}

	}

}());
