// JavaScript Document
var jTweener=function(){var Q=false;var D=60;var b=navigator.userAgent.toLowerCase();var a=/msie/.test(b)&&!/opera/.test(b);var B={};var W={};var X={time:1,transition:"easeoutexpo",namespace:"default",delay:0,prefix:{},suffix:{},onStart:undefined,onStartParams:undefined,onUpdate:undefined,onUpdateParams:undefined,onComplete:undefined,onCompleteParams:undefined};var J=["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor","borderColor"];var R=/^\s*([+\-])=\s*(\-?\d+)/;var V=false;var Z={};function U(){for(var c in jTweener.easingFunctions){Z[c.toLowerCase()]=jTweener.easingFunctions[c];}V=true;}function H(c,d){if(typeof c=="function"){if(d){c.apply(window,d);}else{c();}}}function G(f,c){if(f.style[c]){return f.style[c];}else{if(a){var e=f.currentStyle;if(c=="opacity"){f.style.zoom=1;return e.filter&&e.filter.indexOf("opacity=")>=0?parseFloat(e.filter.match(/opacity=([^)]*)/)[1])/100:1;}else{return f.currentStyle[c];}}else{if(document.defaultView&&document.defaultView.getComputedStyle){c=c.replace(/([A-Z])/g,"-$1").toLowerCase();var d=document.defaultView.getComputedStyle(f,"");return d&&d.getPropertyValue(c);}else{return null;}}}}function T(c){return(!(c instanceof Array)&&!c.jquery)?[c]:c;}function S(c){return c.nodeType?true:false;}function C(d){for(var c=0;c<J.length;c++){if(J[c]==d){return true;}}return false;}function A(c){return(typeof c=="function");}function E(d,c){var e=0;if(S(d)){e=G(d,c);}else{if(A(d[c])){e=d[c]();}else{e=d[c];}}return e;}function O(d,c){return parseFloat(E(d,c))||0;}function Y(d,e){if(W[d]&&W[d][e]){var f=W[d][e];for(var c=0;c<f.length;c++){H(f[c].func,f[c].params);}}}function M(i,d,h){var c=(i.suffix[d])?h+i.suffix[d]:h;if(A(i.target[d])){i.target[d].call(i.rawTarget,c);}else{if(i.targetPropeties[d].func){i.targetPropeties[d].func.call(i.rawTarget,h);}else{if(C(d)){var g=i.targetPropeties[d];i.target[d]=jTweener.Utils.Color.blend(g.start_color,g.end_color,h)+"";}else{try{if(a&&d=="opacity"&&S(i.rawTarget)){i.target.filter=(i.target.filter||"").replace(/alpha\([^)]*\)/,"")+(parseFloat(h).toString()=="NaN"?"":"alpha(opacity="+h*100+")");}else{i.target[d]=c;}}catch(f){}}}}}function F(){var c=(new Date()-0);var j=0;for(var l in B){var g=B[l];j++;for(var h=0;h<g.length;h++){var f=g[h];var n=c-f.startTime;var k=f.endTime-f.startTime;if(n>=k){for(var m in f.targetPropeties){var e=f.targetPropeties[m];M(f,m,e.b+e.c);}g.splice(h,1);H(f.onUpdate,f.onUpdateParams);H(f.onComplete,f.onCompleteParams);}else{for(var m in f.targetPropeties){var e=f.targetPropeties[m];M(f,m,f.easing(n,e.b,e.c,k));}H(f.onUpdate,f.onUpdateParams);}}Y(l,"onUpdate");if(!g.length){g=null;delete B[l];j--;Y(l,"onComplete");}}if(j>0){setTimeout(F,1000/D);}else{Q=false;}}function I(f,d){var c=0;if(f&&S(f)){f=f.style;}function e(h){for(var j=h.length-1;j>=0;j--){if(h[j].target==f){h.splice(j,1);c++;}}}if(!f&&d){B[d]=[];}else{if(d&&B[d]){e(B[d]);}else{for(var g in B){e(B[g]);}}}return c;}function K(d){var c={};for(var e in X){c[e]=d[e]||X[e];delete d[e];}if(A(c.transition)){c.easing=c.transition;}else{c.easing=Z[c.transition.toLowerCase()];}delete d.easing;return c;}function L(e){var c={};for(var d in e){if(e.hasOwnProperty(d)){c[d]=e[d];}}return c;}function N(h,k){k=L(k);var d=S(h);var e=K(k);e.rawTarget=h;e.target=(d)?h.style:h;e.targetPropeties={};var g;for(var j in k){if(!e.prefix[j]){e.prefix[j]="";}if(!e.suffix[j]){e.suffix[j]=(d&&j!="opacity")?"px":"";}var i=k[j];if(i===null){continue;}if(d){j=j.replace(/\-(\w)/g,function(m,l){return l.toUpperCase();});}if(C(j)){e.targetPropeties[j]={b:0,c:1,start_color:jTweener.Utils.getRGB(E(h,j)),end_color:jTweener.Utils.getRGB(i)};}else{if(A(i)){e.targetPropeties[j]={func:i,b:0,c:1};}else{var f=O(h,j);var c=i;if((g=R.exec(c))){c=f+(g[1]=="-"?-1:1)*parseFloat(g[2]);}else{c=parseFloat(c);}e.targetPropeties[j]={b:f,c:c-f};}}}return e;}function P(e,d){if(!V){U();}var c=d.delay||X.delay;setTimeout(function(){var f=N(e,d);f.startTime=(new Date()-0);f.endTime=f.time*1000+f.startTime;H(f.onStart,f.onStartParams);if(!B[f.namespace]){B[f.namespace]=[];}B[f.namespace].push(f);if(!Q){Q=true;F();}},c*1000);}return{addTween:function(e,c){e=T(e);for(var d=0;d<e.length;d++){P(e[d],c);}},addPercent:function(c){var d={};if(arguments.length==2){d=arguments[0];c=arguments[1];}P(d,c);return d;},addNSAction:function(f,e){e=e||X.namespace;if(!W[e]){W[e]={};}var c=W[e];for(var d in f){if(d.indexOf("Params")==-1){if(!c[d]){c[d]=[];}c[d].push({func:f[d],params:f[d+"Params"]});}}},removeNSActions:function(){switch(arguments.length){case 0:W={};break;default:var e=arguments[0];var f=[].splice.call(arguments,1);if(W[e]){if(f&&f.length){var c=W[e];for(var d=0;d<f.length;d++){delete c[f[d]];}}else{delete W[e];}}}},removeTween:function(){switch(arguments.length){case 0:B={};break;default:var e,c;if(arguments.length==1){if(typeof arguments[0]=="string"){e=arguments[0];}else{c=arguments[0];}}else{e=arguments[0];c=arguments[1];}if(c&&(c instanceof Array||c.jquery)){for(var d=0;
d<c.length;d++){I(c[d],e);}}else{I(c,e);}}}};}();jTweener.Utils={bezier2:function(A,D,C,B){return(1-A)*(1-A)*D+2*A*(1-A)*C+A*A*B;},bezier3:function(A,E,D,C,B){return Math.pow(1-A,3)*E+3*A*Math.pow(1-A,2)*D+3*A*A*(1-A)*C+A*A*A*B;},mergeObjects:function(){var A={};for(var C=0;C<arguments.length;C++){var D=arguments[C];if(!D){continue;}for(var B in D){A[B]=D[B];}}return A;},getRGB:function(B){var A;if(B&&B.constructor==jTweener.Utils.Color){return B;}if(A=/rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1],10),parseInt(A[2],10),parseInt(A[3],10));}if(A=/rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*\)/.exec(B)){return new jTweener.Utils.Color(parseFloat(A[1],10)*2.55,parseFloat(A[2],10)*2.55,parseFloat(A[3],10)*2.55);}if(A=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1],16),parseInt(A[2],16),parseInt(A[3],16));}if(A=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(B)){return new jTweener.Utils.Color(parseInt(A[1]+A[1],16),parseInt(A[2]+A[2],16),parseInt(A[3]+A[3],16));}return new jTweener.Utils.Color(0,0,0);}};jTweener.Utils.Color=function(C,B,A){this.r=Math.max(Math.min(Math.round(C),255),0);this.g=Math.max(Math.min(Math.round(B),255),0);this.b=Math.max(Math.min(Math.round(A),255),0);};jTweener.Utils.Color.blend=function(B,A,C){C=C||0;return new jTweener.Utils.Color(B.r+(A.r-B.r)*C,B.g+(A.g-B.g)*C,B.b+(A.b-B.b)*C);};jTweener.Utils.Color.prototype={r:0,g:0,b:0,toString:function(){return"rgb("+this.r+","+this.g+","+this.b+")";}};jTweener.easingFunctions={easeNone:function(B,A,D,C){return D*B/C+A;},easeInQuad:function(B,A,D,C){return D*(B/=C)*B+A;},easeOutQuad:function(B,A,D,C){return -D*(B/=C)*(B-2)+A;},easeInOutQuad:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B+A;}return -D/2*((--B)*(B-2)-1)+A;},easeInCubic:function(B,A,D,C){return D*(B/=C)*B*B+A;},easeOutCubic:function(B,A,D,C){return D*((B=B/C-1)*B*B+1)+A;},easeInOutCubic:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B+A;}return D/2*((B-=2)*B*B+2)+A;},easeInExpo:function(B,A,D,C){return(B==0)?A:D*Math.pow(2,10*(B/C-1))+A-D*0.001;},easeOutExpo:function(B,A,D,C){return(B==C)?A+D:D*1.001*(-Math.pow(2,-10*B/C)+1)+A;},easeInOutExpo:function(B,A,D,C){if(B==0){return A;}if(B==C){return A+D;}if((B/=C/2)<1){return D/2*Math.pow(2,10*(B-1))+A-D*0.0005;}return D/2*1.0005*(-Math.pow(2,-10*--B)+2)+A;},easeInElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}return -(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;},easeOutElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F)==1){return A+G;}if(!E){E=F*0.3;}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}return(B*Math.pow(2,-10*C)*Math.sin((C*F-D)*(2*Math.PI)/E)+G+A);},easeInOutElastic:function(C,A,G,F,B,E){var D;if(C==0){return A;}if((C/=F/2)==2){return A+G;}if(!E){E=F*(0.3*1.5);}if(!B||B<Math.abs(G)){B=G;D=E/4;}else{D=E/(2*Math.PI)*Math.asin(G/B);}if(C<1){return -0.5*(B*Math.pow(2,10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E))+A;}return B*Math.pow(2,-10*(C-=1))*Math.sin((C*F-D)*(2*Math.PI)/E)*0.5+G+A;},easeInBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}return E*(B/=D)*B*((C+1)*B-C)+A;},easeOutBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}return E*((B=B/D-1)*B*((C+1)*B+C)+1)+A;},easeInOutBack:function(B,A,E,D,C){if(C==undefined){C=1.70158;}if((B/=D/2)<1){return E/2*(B*B*(((C*=(1.525))+1)*B-C))+A;}return E/2*((B-=2)*B*(((C*=(1.525))+1)*B+C)+2)+A;},easeInBounce:function(B,A,D,C){return D-jTweener.easingFunctions.easeOutBounce(C-B,0,D,C)+A;},easeOutBounce:function(B,A,D,C){if((B/=C)<(1/2.75)){return D*(7.5625*B*B)+A;}else{if(B<(2/2.75)){return D*(7.5625*(B-=(1.5/2.75))*B+0.75)+A;}else{if(B<(2.5/2.75)){return D*(7.5625*(B-=(2.25/2.75))*B+0.9375)+A;}else{return D*(7.5625*(B-=(2.625/2.75))*B+0.984375)+A;}}}},easeInOutBounce:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeInBounce(B*2,0,D,C)*0.5+A;}else{return jTweener.easingFunctions.easeOutBounce(B*2-C,0,D,C)*0.5+D*0.5+A;}}};jTweener.easingFunctions.linear=jTweener.easingFunctions.easeNone;(function(){if(!window.jTweener||!jTweener.easingFunctions){return ;}jTweener.easingFunctions=jTweener.Utils.mergeObjects(jTweener.easingFunctions,{easeOutInCubic:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeOutCubic(B*2,A,D/2,C);}return jTweener.easingFunctions.easeInCubic((B*2)-C,A+D/2,D/2,C);},easeInQuart:function(B,A,D,C){return D*(B/=C)*B*B*B+A;},easeOutQuart:function(B,A,D,C){return -D*((B=B/C-1)*B*B*B-1)+A;},easeInOutQuart:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B+A;}return -D/2*((B-=2)*B*B*B-2)+A;},easeOutInQuart:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeOutQuart(B*2,A,D/2,C);}return jTweener.easingFunctions.easeInQuart((B*2)-C,A+D/2,D/2,C);},easeInQuint:function(B,A,D,C){return D*(B/=C)*B*B*B*B+A;},easeOutQuint:function(B,A,D,C){return D*((B=B/C-1)*B*B*B*B+1)+A;
},easeInOutQuint:function(B,A,D,C){if((B/=C/2)<1){return D/2*B*B*B*B*B+A;}return D/2*((B-=2)*B*B*B*B+2)+A;},easeOutInQuint:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeOutQuint(B*2,A,D/2,C);}return jTweener.easingFunctions.easeInQuint((B*2)-C,A+D/2,D/2,C);},easeInSine:function(B,A,D,C){return -D*Math.cos(B/C*(Math.PI/2))+D+A;},easeOutSine:function(B,A,D,C){return D*Math.sin(B/C*(Math.PI/2))+A;},easeInOutSine:function(B,A,D,C){return -D/2*(Math.cos(Math.PI*B/C)-1)+A;},easeOutInSine:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeOutSine(B*2,A,D/2,C);}return jTweener.easingFunctions.easeInSine((B*2)-C,A+D/2,D/2,C);},easeOutInExpo:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeOutExpo(B*2,A,D/2,C);}return jTweener.easingFunctions.easeInExpo((B*2)-C,A+D/2,D/2,C);},easeInCirc:function(B,A,D,C){return -D*(Math.sqrt(1-(B/=C)*B)-1)+A;},easeOutCirc:function(B,A,D,C){return D*Math.sqrt(1-(B=B/C-1)*B)+A;},easeInOutCirc:function(B,A,D,C){if((B/=C/2)<1){return -D/2*(Math.sqrt(1-B*B)-1)+A;}return D/2*(Math.sqrt(1-(B-=2)*B)+1)+A;},easeOutInCirc:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeOutCirc(B*2,A,D/2,C);}return jTweener.easingFunctions.easeInCirc((B*2)-C,A+D/2,D/2,C);},easeOutInElastic:function(C,A,F,E,B,D){if(C<E/2){return jTweener.easingFunctions.easeOutElastic(C*2,A,F/2,E,B,D);}return jTweener.easingFunctions.easeInElastic((C*2)-E,A+F/2,F/2,E,B,D);},easeOutInBack:function(B,A,E,D,C){if(B<D/2){return jTweener.easingFunctions.easeOutBack(B*2,A,E/2,D,C);}return jTweener.easingFunctions.easeInBack((B*2)-D,A+E/2,E/2,D,C);},easeOutInBounce:function(B,A,D,C){if(B<C/2){return jTweener.easingFunctions.easeOutBounce(B*2,A,D/2,C);}return jTweener.easingFunctions.easeInBounce((B*2)-C,A+D/2,D/2,C);}});})();(function(C){if(window.$t||!C){return ;}function B(G){return(typeof G=="function");}function F(){return C.Utils.mergeObjects.apply(this,arguments);}var A="__jto";var E=function(H,G){return new D(H,Array.prototype.slice.call(arguments,1));};function D(H,G){this.obj=H;this.options={};if(G instanceof Array){this.addOptions.apply(this,G);}else{this.addOptions(G);}}D.prototype={tween:function(){var G;if(arguments.length){G=Array.prototype.slice.call(arguments,0);G.unshift(this.options);G=F.apply(this,G);}else{G=this.options;}C.addTween(this.obj,G);return this;},percent:function(){var G=[];for(var H=0;H<arguments.length;H++){if(B(arguments[H])){var I={};I[A+H]=arguments[H];G.push(I);}else{G.push(arguments[H]);}}C.addPercent(this.obj,F.apply(this,G));return this;},stop:function(){C.removeTween(this.obj);return this;},addOptions:function(){var G=Array.prototype.slice.call(arguments,0);G.unshift(this.options);this.options=F.apply(this,G);return this;},clearOptions:function(){this.options={};return this;},removeOptions:function(){for(var G=0;G<arguments.length;G++){delete this.options[String(arguments[G])];}return this;}};window.$t=E;})(jTweener);

var EventDispatcher = function(){
	this.eventHashTable = {};
}

EventDispatcher.prototype.addEventListener = function(eventType,func){
	if(this.eventHashTable[eventType] === undefined) this.eventHashTable[eventType] = [];
	if(this.eventHashTable[eventType].indexOf(func) === -1) this.eventHashTable[eventType].push(func);
};

EventDispatcher.prototype.removeEventListener = function(eventType,func){
	if(this.eventHashTable[eventType] === undefined) return false;
	if(this.eventHashTable[eventType].indexOf(func) > -1) this.eventHashTable[eventType].splice(this.eventHashTable[eventType].indexOf(func),1);
	return true;
};

Array.prototype.indexOf = function(value){
	for(var i=0;i<this.length;i++){
		if(this[i] === value){
			return i;
		}
	}
	return -1;
}

Array.prototype.clone = function(){
	var i=0;
	var l = this.length;
	var a = [];
	for(i=0;i<l;i++){
		a[i] = this[i];
	}
	return a;
}

Array.prototype.sum = function(){
	for(var s = 0, i = this.length; i; s += this[--i]);
    return s;
}

EventDispatcher.prototype.dispatchEvent = function(eventObject){
	var a = this.eventHashTable[eventObject.eventType];
	if(a === undefined || a.constructor != Array){
		return false;
	}
	for(var i=0;i<a.length;i++){
		a[i](eventObject);
	}
};

// Allows for binding context to functions
// when using in event listeners and timeouts

Function.prototype.context = function(obj){
  var method = this,
  temp = function(){
    return method.apply(obj, arguments);
  };
  return temp;
};



// Like context, in that it creates a closure
// But insteaad keep "this" intact, and passes the var as the second argument of the function
// Need for event listeners where you need to know what called the event
// Only use with event callbacks

Function.prototype.evtContext = function(obj){
  var method = this,
  temp = function(){
    var origContext = this;
    return method.call(obj, arguments[0], origContext);
  };
  return temp;
};



// Removeable Event listener with Context
// Replaces the original function with a version that has context
// So it can be removed using the original function name.
// In order to work, a version of the function must already exist in the player/prototype

Function.prototype.rEvtContext = function(obj, funcParent){
  if (this.hasContext === true) { return this; }
  if (!funcParent) { funcParent = obj; }
  for (var attrname in funcParent) {
    if (funcParent[attrname] == this) {
      funcParent[attrname] = this.evtContext(obj);
      funcParent[attrname].hasContext = true;
      return funcParent[attrname];
    }
  }
  return this.evtContext(obj);
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

var Rotate360 = function(options){
	EventDispatcher.call(this);
	this.self = this;
	this.numberOfFrames = options.numberOfFrames;
	this.imageElement = options.imageElement//$('#'+options.imageElement).get(0);
	this._interactiveElement = options.interactiveElement//$('#'+options.interactiveElement).get(0);
	this._imageSequenceNumberPadding = options.imageSequenceNumberPadding;
	this._rotateToTime = options.rotateToSeconds || 1; 
	this.startX;
	this.startY;
	this._currentDegree = 0;
	this._currentImageIndex = 0;
	this._tweenObject = {};
	this.loadedFramesIncrement = 0;
	this._preloadCallBack = undefined;
	this._isAutoPlaying = false;
	this._autoPlayDirection = undefined;
	
	//this._spinnerRotated = 0;
	//this._spinner;
	//this._spinnerInterval;
	
	
	//TOUCH
	this._touchCoordHistory = [];
	
	
	//PRIVATE
	this._scrubDestinationDegree;
	this._scrubInvertModifier;
	this._scrollDestinationDegree;
	
	this.imageBaseURLStart = options.imageBaseURLStart;
	this.imageBaseURLEnd = options.imageBaseURLEnd;
	this.images = [];
	
	
	
	


	this.init();
};
Rotate360.prototype = new EventDispatcher();


//PRIVATE INIT
//____________________________________________________________________________________________________
Rotate360.prototype.init = function(){
	//this.imageElement.style.display = "none";
	
	//this._spinner = id('loading-spinner');
	//this.showSpinners();
	//this.loadImages();

};



Rotate360.prototype.loadImages = function(){
	var image;
	var self = this;
	for(var i=0;i<this.numberOfFrames;i++){
		image = new Image();
		image.onload = this.loadImageComplete.context(this);
		
		//image.src = "rotation/-01.jpg65684dc4-1dd1-4708-b3c8-6064d01eeb67Large-"+String(i+1)+".jpg";
		image.src = this.imageBaseURLStart + this.convertIntegerToFormattedString(i, this._imageSequenceNumberPadding) + this.imageBaseURLEnd;
		this.images[i] = image;
	}
};

Rotate360.prototype.loadImageComplete = function(e){
	this.loadedFramesIncrement++;
	if(this.loadedFramesIncrement === this.numberOfFrames){
		this.loadImagesComplete();
		
		//setTimeout(this.scrollToDegrees.context(this),3000);
	}
};

Rotate360.prototype.loadImagesComplete = function(){
	//this.hideSpinners();
	//this.imageElement.style.display = "block";
	this.activate();
	this.dispatchEvent(new Rotate360Event('loadImagesComplete'));
	if(this._preloadCallBack !== undefined)this._preloadCallBack();
};

/*
Rotate360.prototype.showSpinners = function(){
	this._spinner.style.display = "block";
	this._spinnerInterval = setInterval(this.rotateSpinner.context(this),100);
	this._spinnerRotated = 0;
}

Rotate360.prototype.rotateSpinner = function(){
	this._spinnerRotated += 30;
	this._spinner.style.webkitTransform = "rotate("+this._spinnerRotated+"deg) scale(0.25)";
	//this._spinner.style.webkitTransform = "rotate("+this._spinnerRotated+"deg) scale(0.25)";
	//console.log('spinner.style.webkitTransform:'+this._spinner.style.webkitTransform);
}

Rotate360.prototype.hideSpinners = function(){
	//console.log('hideSpinners');
	this._spinner.style.display = "none";
	clearInterval(this._spinnerInterval);
};*/


//PRIVATE INTERACTIVITY
//____________________________________________________________________________________________________
Rotate360.prototype.activate = function(){
	//addEvent(this._interactiveElement,'touchstart',this.onTouchStart.rEvtContext(this));
	//addEvent(this._interactiveElement,'mousedown',this.onMouseDown.rEvtContext(this));
	//this._interactiveElement.addEventListener('mousedown', this.onMouseDown.rEvtContext(this), false);//use bubbling, as hotspots and buttons use capture 
	
	
	$(this._interactiveElement).bind('mousedown', this.onMouseDown.rEvtContext(this));
	$(this._interactiveElement).bind('touchstart', this.onTouchStart.rEvtContext(this));
	
};

Rotate360.prototype.deactivate = function(){
	$(this._interactiveElement).unbind('touchstart', this.onTouchStart.rEvtContext(this));
	$(window).unbind('touchmove', this.onTouchMove.rEvtContext(this));
	$(window).unbind('touchend', this.onTouchEnd.rEvtContext(this));
	$(this._interactiveElement).unbind('mousedown', this.onMouseDown.rEvtContext(this));
	$(document).unbind('mousemove', this.onMouseMove.rEvtContext(this));
	$(document).unbind('mouseup', this.onMouseUp.rEvtContext(this));
};

Rotate360.prototype.onTouchStart = function(e){
	e.targetTouches = e.targetTouches || e.originalEvent.targetTouches;
	if (e.targetTouches.length != 1) return false;
	$(document).bind('touchmove', this.onTouchMove.rEvtContext(this));
	$(document).bind('touchend', this.onTouchEnd.rEvtContext(this));
	return false;
};
Rotate360.prototype.onTouchMove = function(e){
	e.targetTouches = e.targetTouches || e.originalEvent.targetTouches;
	if (e.targetTouches.length != 1) return false;
	var leftDelta = e.targetTouches[0].clientX - this.startX; 
	var topDelta = e.targetTouches[0].clientY - this.startY; 
	this.startX = e.targetTouches[0].clientX;
	this.startY = e.targetTouches[0].clientY;
	
	if(Math.abs(leftDelta) > Math.abs(topDelta)){
		if(! isNaN(leftDelta)){
			this.scrubDegrees(leftDelta);
		}
		e.preventDefault();
	}
	//return false;
};
Rotate360.prototype.onTouchEnd = function(e){
	e.targetTouches = e.targetTouches || e.originalEvent.targetTouches;
	if (e.targetTouches.length > 0) return false;
	$(document).unbind('touchmove', this.onTouchMove.rEvtContext(this));
	$(document).unbind('touchend', this.onTouchEnd.rEvtContext(this));
	e.preventDefault();
	return false;
};
Rotate360.prototype.onMouseDown = function(e){
	e.preventDefault();
	$(document).bind('mousemove', this.onMouseMove.rEvtContext(this));
	$(document).bind('mouseup', this.onMouseUp.rEvtContext(this));
	this.startX = e.clientX;
	this.startY = e.clientY;
	
	this.recordTouchHistory(e.clientX,e.clientY);
	//--
	
};
Rotate360.prototype.onMouseMove = function(e){
	e.preventDefault();
	this.recordTouchHistory(e.clientX,e.clientY);
	
	var leftDelta = e.clientX - this.startX; 
	var topDelta = e.clientY - this.startY; 
	this.startX = e.clientX;
	this.startY = e.clientY;
	if(! isNaN(leftDelta)){
		this.scrubDegrees(leftDelta);
	}
};
Rotate360.prototype.onMouseUp = function(e){
	e.preventDefault();	
	$(document).unbind('mousemove', this.onMouseMove.rEvtContext(this));
	$(document).unbind('mouseup', this.onMouseUp.rEvtContext(this));
	
	this.anaylyseTouchHistory();
	this.clearTouchHistory();
	

};

Rotate360.prototype.recordTouchHistory = function(x,y) {
	this._touchCoordHistory.push({x:x,y:y,time:new Date()});
};

Rotate360.prototype.clearTouchHistory = function() {
	this._touchCoordHistory = [];
};

Rotate360.prototype.anaylyseTouchHistory = function() {
	var swipeObject = this.getVelocityOfTouchHistory();
	if(swipeObject.velocity > 0.75){
		this.swipe(swipeObject);
	}
};

Rotate360.prototype.getVelocityOfTouchHistory = function() {
	var distance = 0;
	var time;
	var velocity = 0;
	var direction = "";
	
	
	if(this._touchCoordHistory.length > 0){
		var startX = this._touchCoordHistory[0].x;
		var startY = this._touchCoordHistory[0].y;
		var endX = this._touchCoordHistory[this._touchCoordHistory.length-1].x;
		var endY = this._touchCoordHistory[this._touchCoordHistory.length-1].y;
		
		time = this._touchCoordHistory[this._touchCoordHistory.length-1].time.getTime() - this._touchCoordHistory[0].time.getTime();
		distance = Math.sqrt(Math.pow(endX - startX,2) + Math.pow(endX - endY,2));
		velocity = distance/time;
		
		if(Math.abs(endX - startX) > Math.abs(endY - startY) ){
			if(endX>startX){
				direction = "right";	
			}else{
				direction = "left";		
			}
		}else{
			if(endY>startY){
				direction = "down";	
			}else{
				direction = "up";		
			}
		}
		
		//TODO
		//angle
		//normalised vector
	}
	//console.log('time:'+time+' distance:'+distance +' velocity:'+velocity +' direction:'+direction);
	return {velocity:velocity, direction:direction};
}

Rotate360.prototype.swipe = function(swipeObject) {
	
};



//PRIVATE UTILS
//____________________________________________________________________________________________________

Rotate360.prototype.convertDegreesToFrames = function(degrees){
	/*
	var modifier = (35/360);
	var modifiedDegrees = modifier * degrees;
	var roundedFrames = Math.round(modifiedDegrees);
	if(roundedFrames === 0){
		roundedFrames = 35;	
	}
	return roundedFrames;
	*/
	
	
	/* 1 based index
	var f = Math.round((this.numberOfFrames/360) * degrees);
	return (f===0)?this.numberOfFrames:f;
	*/
	//0 based index
	var f = Math.round((this.numberOfFrames/360) * degrees);
	return (f===this.numberOfFrames)?0:f;
	
}

Rotate360.prototype.convertIntegerToFormattedString = function (int,length){
	var str = String(int);
	while(str.length != length){
		str = "0"+str;
	}
	return str;
}

Rotate360.prototype.validateDegrees = function(sourceDegrees){
	var validDegress = sourceDegrees;
	if(sourceDegrees > 360){
	   validDegress = 0  + (sourceDegrees - 360) + -1;
	}else if(sourceDegrees < 0){
		validDegress = 360 + sourceDegrees;
	}
	return validDegress;
}

Rotate360.prototype.updateTween = function(){
	this.setDegrees(this._scrollDestinationDegree);
};

Rotate360.prototype.scrollToDegreesComplete = function(){
	this.dispatchEvent(new Rotate360Event('scrollToDegreesComplete'));
};

Rotate360.prototype.startAutoPlay = function(){
	this._isAutoPlaying = true;
	if(this._autoPlayDirection ===  undefined) this._autoPlayDirection = 1;
	this.autoPlay();
}

Rotate360.prototype.stopAutoPlay = function(){
	this._isAutoPlaying = false;
}

Rotate360.prototype.autoPlay = function(){
	if(this._isAutoPlaying === true){
		this.scrubDegrees(this._autoPlayDirection);
		window.requestAnimFrame(this.autoPlay.context(this),this.imageElement);
	}
}


//PUBLIC
//____________________________________________________________________________________________________
Rotate360.prototype.play = function(speed){
	this._autoPlayDirection = speed;
	this.startAutoPlay();
}

Rotate360.prototype.stop = function(){
	this.stopAutoPlay();
}


Rotate360.prototype.setDegrees = function(degree){
	degree = this.validateDegrees(degree);
	this._currentDegree = degree;
	
	this._currentImageIndex = this.convertDegreesToFrames(this._currentDegree);
	this.imageElement.src = this.images[this._currentImageIndex].src;//non explorer I think
	//console.log('degrees:'+this._currentDegree+' imageIndex:'+this._currentImageIndex);
	this.dispatchEvent(new Rotate360Event(Rotate360Event.SET_DEGREES));
}

Rotate360.prototype.scrubDegrees = function(relativeDegrees){
	jTweener.removeTween(this);
	/*
	var currentFrame = this._currentDegree;
	var destinationFrame;
	var relativeFrame =  relativeDegrees;
	var lastFrame = 360;
	var startFrame = 0;
	var totalFrames = lastFrame - startFrame + 1;
	var invert = 1;
	var absoluteRelativeFrame = Math.abs(relativeFrame);
	if(relativeFrame<0){
		invert = -1;  
	}
	var overlap = Math.floor(absoluteRelativeFrame / totalFrames) * totalFrames;
	var validatedIncrement = absoluteRelativeFrame - overlap;
	var imageNumber;
	validatedIncrement *= invert;
	destinationFrame = currentFrame + validatedIncrement;
	if(destinationFrame > lastFrame){
	   destinationFrame = startFrame  + (destinationFrame - lastFrame) + -1;
	}else if(destinationFrame < startFrame){
		destinationFrame = lastFrame + destinationFrame;
	}
	this._currentDegree = destinationFrame;
	*/
	this._scrubInvertModifier = 1;
	if(relativeDegrees<0){
		this._scrubInvertModifier = -1;  
	}
	
	this._scrubDestinationDegree = this._currentDegree+((Math.abs(relativeDegrees)-(Math.floor(Math.abs(relativeDegrees)/359)*359))*this._scrubInvertModifier);
	
	
	/*
	if(this._scrubDestinationDegree > 360){
	   this._scrubDestinationDegree = 0  + (this._scrubDestinationDegree - 360) + -1;
	}else if(this._scrubDestinationDegree < 0){
		this._scrubDestinationDegree = 360 + this._scrubDestinationDegree;
	}
	
	console.log('this._scrubDestinationDegree:'+this._scrubDestinationDegree)
	*/
	
	this.setDegrees(this._scrubDestinationDegree);
	//this.dispatchEvent(new Rotate360Event(Rotate360Event.SCRUB_DEGREES));
};

Rotate360.prototype.scrollToDegrees = function(absolutenDegrees){
	this.stop();
	//console.log('absolutenDegrees:'+absolutenDegrees);
	this._scrollDestinationDegree = this._currentDegree;//no need to bother to update getter
	jTweener.removeTween(this);
	jTweener.addTween(this,{_scrollDestinationDegree:absolutenDegrees, time:this._rotateToTime, transition:'linear',onComplete:this.scrollToDegreesComplete.context(this), onUpdate:this.updateTween.context(this)});
	
	
};

Rotate360.prototype.getDegrees = function(){
	return this._currentDegree;
}

Rotate360.prototype.preload = function(callBack){
	this._preloadCallBack = callBack;
	this.loadImages();
}


//EVENT
//_____________________________________________________________________
var Rotate360Event = function(eventType){
	this.eventType = eventType; 
};
Rotate360Event.SET_DEGREES = "setDegrees";
Rotate360Event.SCRUB_DEGREES = "scrubDegrees";
Rotate360Event.SCROLL_TO_DEGREES_COMPLETE = "scrollToDegreesComplete";
Rotate360Event.LOAD_IMAGES_COMPLETE = "loadImagesComplete";

