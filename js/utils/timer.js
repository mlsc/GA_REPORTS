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
	* Timer utility for time managment.
	* The Timer class
	* @class Timer
	* @static
	**/
	Timer = function(delay, repeat) {
		this.delay = !isNaN(delay) ? delay : 0;
		this.repeat = !isNaN(repeat) ? Math.abs(repeat) : -1;
	}
	
	Timer._frameRate = 60;
	
	Timer._listeners = [];
	
	Timer.prototype._fps = 0;
	
	Timer.prototype._intervalID = null;
	
	Timer.prototype._isPlay = false;
	
	Timer.prototype._isAnimFrame = false;
	
	Timer.prototype._startTime = 0;
	
	Timer._requestAnimationFrame = function(){
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
      	window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
      	window.msRequestAnimationFrame || function( callback, element){
        	return window.setTimeout(callback, 1000/Timer._frameRate);
      	};
	}()
	
	Timer._cancelRequestAnimationFrame = function(){
		return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame || function( interval){
        	return window.clearInterval(interval);
      	};
	}(),
	
	Timer.animationFrame = function(callback, element, scope){
		return Timer._requestAnimationFrame.call(scope, callback, element);
	}
	
	Timer.clearAnimationFrame = function(interval, scope){
		Timer._cancelRequestAnimationFrame.call(scope, interval);
	}
	
	Timer.prototype.addListener = function(callback){
		if(typeof callback != "function") return;
		var index = Timer._listeners.indexOf(callback);
		if(index == -1) Timer._listeners.push(callback);
	}
		
	Timer.prototype.removeListener = function(callback){
		if(typeof callback != "function") return;
		var index = Ticker._listeners.indexOf(callback);		
		if (index != -1) Ticker._listeners.splice(index, 1);
	}
	
	Timer.prototype.start = function(){
		
		if(this._isPlay) return;
		
		this._startTime = new Date().getTime();
		this._isPlay = true;
		
		var lastTime = new Date().getTime();
		var frameCount = 0;
		
		var ref = this, callback = function(){
			var delta = new Date().getTime() - ref._startTime;
			
			var diffTime = new Date().getTime() - lastTime;
			if (diffTime >= 1000) {
				ref._fps = frameCount;
				frameCount = 0;
				lastTime = new Date().getTime();
			} frameCount++;
			
			if(ref.delay != 0){
				if(delta >= ref.delay){
					for(var index in Timer._listeners)
						Timer._listeners[index].call(Timer._listeners[index], delta);
					
					ref._startTime = new Date().getTime();
				}
			}else {
				for(var index in Timer._listeners)
					Timer._listeners[index].call(Timer._listeners[index], delta);
			}
			
			if(ref._isAnimFrame && ref._isPlay) ref._intervalID = Timer.animationFrame(callback);
		}
		
		if(!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && 
			!(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
			!window.oRequestAnimationFrame && !window.msRequestAnimationFrame) return this._intervalID = window.setInterval(callback, 1000/Timer._frameRate); ;
			
		this._isAnimFrame = true;
		this._intervalID = Timer.animationFrame(callback);
		
	}
	
	Timer.prototype.stop = function(){
		if(!this._isPlay) return;
		
		this._isPlay = false;
		this._isAnimFrame = false;
		
		if(this._intervalID){
			Timer.clearAnimationFrame(this._intervalID);
			this._intervalID = null
		}
		
	}
	
	Timer.prototype.getFPS = function(){
		return Math.min(this._fps, Timer._frameRate) + "/" + Timer._frameRate;
	}
	
	Timer.prototype.toString = function(){
		return 'Timer(' + this.delay + ',' + this.repeat + ')';
	}
	
	window.Timer = Timer;
}(window));

/*
var count = 0;
function loop(delta){
	Debug.log("loop ", delta, " fps:", time.getFPS());
	count++;
	
	if(count == 300){
		Debug.log("stop");
		time.stop();
	}
	
}

var time = new Timer();
time.addListener(loop);
time.start();
Debug.log(time);
*/

/*
function loop(){
	Debug.log("loop");
	//Timer.animationFrame(loop);
}
loop();
*/



