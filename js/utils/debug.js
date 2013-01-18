/*
* Debug by Gianluca Cirone. Oct 5, 2011
* Visit http://flashdevit.com/ for documentation, updates and examples.
*
*
* Copyright (c) 2011 Gianluca Cirone
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

/**
* The flashdevit Javascript library provides a helper
* classes for javascript developers.
* @module flashdevit
**/


(function(window) {
	
	/**
	* Debug utility for console logging.
	* The Debug class uses a static interface (ex. Debug.log(vars)) and should not be instantiated.
	* @class Debug
	* @static
	**/
	Debug = function() {
		throw "Debug cannot be instantiated"; 
	}
	
	/** 
	* @property trace
	* @type Boolean
	* @public
	**/
	Debug.trace = true;
	
	/**
	* Log variables in browser console.
	* @method log
	* @static
	**/
	Debug.log = function() {
		if (typeof console == "undefined" || !Debug.trace) return;
		if(Function.prototype.bind) Function.prototype.bind.call(console.log, console).apply(console, arguments);
		else console.log(Array.prototype.slice.call(arguments));
	}
	
	/**
	* Log Error in browser console.
	* @method error
	* @static
	**/
	Debug.error = function() {
		if (typeof console == "undefined" || !Debug.trace) return;
		if(Function.prototype.bind) Function.prototype.bind.call(console.error, console).apply(console, arguments);
		else console.log(Array.prototype.slice.call(arguments));
	}

	window.Debug = Debug;
}(window));
