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
	* Sound utility for time managment.
	* The Sound class
	* @class Sound
	* @static
	**/
	Sound = function(path, loop, volume, autoplay, timestart) {
		
		this.audio = document.createElement('audio');
		
		this.audio.loop = (loop)? loop : false;
		this.audio.autoplay = (autoplay)? autoplay : false;
		this.audio.volume = (volume)? volume : 0.5;
		//this.audio.currentTime = (timestart)? timestart : 1;
		
		path = path.substring(0, path.length-4);
		this.sources = [
			[path+".mp3", "audio/mpeg"],
			[path+".ogg", "audio/ogg"]
		];
		
		for (var i = 0; i < this.sources.length; i++) {
			var src = document.createElement('source');
			src.setAttribute("src", this.sources[i][0]);
			src.setAttribute("type", this.sources[i][1]);
			this.audio.appendChild(src);
		}
		
	}
	
	Sound.prototype.volume = function(vol){
		if(isNaN(vol)) return;
		this.audio.volume = vol;
	}
	
	Sound.prototype.play = function(){
		this.audio.play();
	}
	
	Sound.prototype.stop = function(){
		this.audio.stop();
	}
	
	Sound.prototype.toString = function(){
		return 'Sound(' + this.delay + ',' + this.repeat + ')';
	}
	
	window.Sound = Sound;
}(window));




/*
var s = new Sound("img/cannon-01.mp3", false, 1, false, 0);
s.audio.addEventListener('onended', end);
function end(){
	console.log("fine");
}
s.volume(0.5);
//s.play();
//s.stop();
Debug.log(s);
*/


