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
	* Math2 utility for mathematical operation.
	* The Debug class uses a static interface (ex. Debug.log(vars)) and should not be instantiated.
	* @class Math2
	* @static
	**/
	Math2 = function() {
		throw "Math2 cannot be instantiated"; 
	}
	
	/** 
	* Multiplier for converting degrees to radians.
	* @property DEG_TO_RAD
	* @static
	* @type Number
	**/
	Math2.DEG_TO_RAD = Math.PI / 180;
	
	/** 
	* Multiplier for converting radians to degrees.
	* @property DEG_TO_RAD
	* @static
	* @type Number
	**/
	Math2.RAD_TO_DEG = 180 / Math.PI;
	
	/**
	* Convert number from degrees to radians.
	* @method toRad
	* @param {Number} deg
	* @return {Number} The radians result
	* @static
	**/
	Math2.toRad = function(deg){
		return deg * Math2.DEG_TO_RAD;
	}
	
	/**
	* convert number from radians to degrees.
	* @method toDeg
	* @param {Number} rad
	* @return {Number} The degrees result
	* @static
	**/
	Math2.toDeg = function(rad){
		return rad * Math2.RAD_TO_DEG;
	}
	
	/**
	* Generate random number between minimum and maximum.
	* @method toDeg
	* @param {Number} min
	* @param {Number} max
	* @return {Number} The random value
	* @static
	**/
	Math2.rand = function(min, max){
		if(isNaN(max)){
			max = min; 
			min = 0;
		}
		return Math.floor(Math2.randFloat(min, max));
	}
	
	/**
	* Generate random float number between minimum and maximum.
	* @method toDeg
	* @param {Number} min
	* @param {Number} max
	* @return {Number} The random value
	* @static
	**/
	Math2.randFloat = function(min, max){
		if(isNaN(max)){
			max = min;
			min = 0;
		}
		return Math.random() * (max - min) + min;
	}
	
	/**
	* Lucky result with chance (0 to 100).
	* @method bool
	* @param {Number} chance
	* @return {Boolean} The result value
	* @static
	**/
	Math2.bool = function(chance){
		if(isNaN(chance)) chance = 50;
		if(chance < 0) chance = 0;
		if(chance > 100) chance = 100;
		return (Math.random()*100 < chance) ? true : false;
	}
	
	/*
	Math2.shear = function(ctx, kx, ky){
		if(!ctx) return;
		ctx.transform(1, ky, kx, 1, 0, 0);
	}
	*/
	
	/*
	Math2.rotateAbout = function(ctx, theta, x, y){
		if(!ctx) return;
		var ct = Math.cos(theta), st = Math.sin(theta);
		ctx.transform(ct, -st, st, ct, -x*ct-y*st+x, x*st-y*ct+y);
	}
	*/
	
	window.Math2 = Math2;
}(window));








