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
	$(this._scrubber).bind('touchstart',this.onMouseDown.rEvtContext(this));
};

Rotate360ScrubberViewController.prototype.onMouseDown = function(e){
	var eventType = (e.type.indexOf('touch')!=-1)?'touch':'mouse';
	if(eventType === "touch"){
		e.targetTouches = e.targetTouches || e.originalEvent.targetTouches;
		if (e.targetTouches.length != 1){
			return false;
		}
		this._startX = e.targetTouches[0].pageX;
		$(document).bind('touchmove',this.onMouseMove.rEvtContext(this));
		$(document).bind('touchend',this.onMouseUp.rEvtContext(this));
	}else{
		this._startX = e.pageX;
		$(document).bind('mousemove',this.onMouseMove.rEvtContext(this));
		$(document).bind('mouseup',this.onMouseUp.rEvtContext(this));
	}
	this._clickOffsetX = this._startX - $(this._scrubber).offset().left;
	
	if(eventType!=='touch'){
		//// don't return false as this causes problems for child elements receiving event on iPad, return false on desktop as this stops highlighing text
		e.preventDefault();
	}
};

Rotate360ScrubberViewController.prototype.onMouseMove = function(e){
	var trackX = this._track.offsetLeft;
	var pageX;
	
	var eventType = (e.type.indexOf('touch')!=-1)?'touch':'mouse';
	if(eventType==='touch'){
		e.targetTouches = e.targetTouches || e.originalEvent.targetTouches;
		if (e.targetTouches.length != 1){
			return false;
		}
		pageX = e.targetTouches[0].pageX;
	}else{
		pageX = e.pageX;
	}
	
	var x = (pageX - trackX) - this._clickOffsetX;
	
	if(x > this._maximumWidth){
		x = this._maximumWidth;
	}else if(x < 0){
		x = 0;
	}
	
	var percentage = x / this._maximumWidth;
	var degrees = Math.round(percentage * 360);
	
	this._rotate360.setDegrees(degrees);
	e.preventDefault();
};

Rotate360ScrubberViewController.prototype.onMouseUp = function(e){
	var eventType = (e.type.indexOf('touch')!=-1)?'touch':'mouse';
	if(eventType==='touch'){
		$(document).unbind('touchmove',this.onMouseMove.rEvtContext(this));
		$(document).unbind('touchend',this.onMouseUp.rEvtContext(this));
	}else{
		$(document).unbind('mousemove',this.onMouseMove.rEvtContext(this));
		$(document).unbind('mouseup',this.onMouseUp.rEvtContext(this));
	}
};


Rotate360ScrubberViewController.prototype.onSetDegrees = function(){
	var degrees = this._rotate360.getDegrees();
	var percentage = degrees / 360;
	var x = Math.round(this._maximumWidth * percentage);
	this._scrubberX = x;
	$(this._scrubber).css('left',x+'px');
	
};