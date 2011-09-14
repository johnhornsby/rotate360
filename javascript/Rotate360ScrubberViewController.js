var Rotate360ScrubberViewController = function(options){
	this._rotate360 = options.rotate360;
	this._track = options.trackElement;
	this._scrubber = options.scrubberElement;
	
	this._trackWidth=0;
	this._srubberWidth=0;
	this._maximumWidth=0;
	this._percentage=0;
	
	this._clickOffsetX=0;
	this._scrubberX=0;
	this._startX=0;
	
	this.init();
};

Rotate360ScrubberViewController.prototype.init = function(){
	this._trackWidth = $(this._track).width();
	this._srubberWidth = $(this._scrubber).width();
	this._maximumWidth = this._trackWidth - this._srubberWidth;
	
	this._rotate360.addEventListener(Rotate360Event.LOAD_IMAGES_COMPLETE,this.activate.context(this));
	this._rotate360.addEventListener(Rotate360Event.SET_DEGREES,this.onSetDegrees.context(this));
};



Rotate360ScrubberViewController.prototype.activate = function(){
	$(this._scrubber).bind('mousedown',this.onMouseDown.rEvtContext(this));
};

Rotate360ScrubberViewController.prototype.onMouseDown = function(e){
	this._clickOffsetX = e.clientX - $(this._scrubber).offset().left;
	this._startX = e.clientX;
	$(document).bind('mousemove',this.onMouseMove.rEvtContext(this));
	$(document).bind('mouseup',this.onMouseUp.rEvtContext(this));
	
	e.preventDefault();
};

Rotate360ScrubberViewController.prototype.onMouseMove = function(e){
	var trackX = this._track.offsetLeft;
	
	var x = (e.clientX - trackX) - this._clickOffsetX;
	
	if(x > this._maximumWidth){
		x = this._maximumWidth;
	}else if(x < 0){
		x = 0;
	}
	//this._scrubberX = x;
	//$(this._scrubber).css('left',this._scrubberX+'px');
	
	var percentage = x / this._maximumWidth;
	var degrees = Math.round(percentage * 360);
	
	//console.log('x:'+ x + " p:"+ percentage +" d:"+degrees);
	
	this._rotate360.setDegrees(degrees);
	e.preventDefault();
};

Rotate360ScrubberViewController.prototype.onMouseUp = function(e){
	$(document).unbind('mousemove',this.onMouseMove.rEvtContext(this));
	$(document).unbind('mouseup',this.onMouseUp.rEvtContext(this));
};


Rotate360ScrubberViewController.prototype.onSetDegrees = function(){
	var degrees = this._rotate360.getDegrees();
	var percentage = degrees / 360;
	var x = Math.round(this._maximumWidth * percentage);
	this._scrubberX = x;
	$(this._scrubber).css('left',x+'px');
	
};




//PUBLIC
//_________________________________________________________________________________
Rotate360ScrubberViewController.prototype.setValue = function(n){
	
};