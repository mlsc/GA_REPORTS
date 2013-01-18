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
	* Vector2 utility for vector managment.
	* The Vector2 class
	* @class Vector2
	* @static
	**/
	Vector2 = function(vx, vy) {
		this.vx = vx ? vx : 0;
		this.vy = vy ? vy : 0;
	}
	
	Vector2.fn = Vector2.prototype;
	
	Vector2.fn.scale = function(scale){
		if (isNaN(scale)) return;
		this.vx *= scale;
		this.vy *= scale;
	}
	
	Vector2.fn.add = function(vec2){
		if(vec2.vx) this.vx += vec2.vx;
    	if(vec2.vy) this.vy += vec2.vy;
	}
	
	Vector2.fn.sub = function(vec2){
		if(vec2.vx) this.vx -= vec2.vx;
    	if(vec2.vy) this.vy -= vec2.vy;
	}
	
	Vector2.fn.negate = function(){
		this.vx = -this.vx;
   	    this.vy = -this.vy;
	}
	
	Vector2.fn.length = function(){
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	}
	
	Vector2.fn.lengthSquared = function(){
		return this.vx * this.vx + this.vy * this.vy;
	}
	
	Vector2.fn.normalize = function(){
		var len = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (len) {
            this.vx /= len;
            this.vy /= len;
        }
        return len;
	}

	Vector2.fn.rotate = function(angle){
		if(isNaN(angle)) return;
		var vx = this.vx, vy = this.vy;
		var cosVal = Math.cos(angle), sinVal = Math.sin(angle);
    	this.vx = vx * cosVal - vy * sinVal;
    	this.vy = vx * sinVal + vy * cosVal;
	}
	
	Vector2.fn.clone = function(){
        return new Vector2(this.vx, this.vy );
	}
	
	Vector2.fn.toString = function(){
		return 'Vector2(' + this.vx.toFixed(3) + ',' + this.vy.toFixed(3) + ')';
	}
	
	window.Vector2 = Vector2;
}(window));







