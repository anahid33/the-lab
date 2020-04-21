(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib._23x = function() {
	this.initialize(img._23x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib._13x = function() {
	this.initialize(img._13x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib._53x = function() {
	this.initialize(img._53x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib._43x = function() {
	this.initialize(img._43x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.map01 = function() {
	this.initialize(img.map01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,8000,4500);


(lib._73x = function() {
	this.initialize(img._73x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.Bitmap13 = function() {
	this.initialize(img.Bitmap13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,644);


(lib._63x = function() {
	this.initialize(img._63x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib._33x = function() {
	this.initialize(img._33x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.Bitmap12 = function() {
	this.initialize(img.Bitmap12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,644);


(lib.Bitmap11 = function() {
	this.initialize(img.Bitmap11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,857,982);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap13();
	this.instance.setTransform(-41.7,-61,0.1895,0.1895);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,-61,83.4,122.1);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap13();
	this.instance.setTransform(-41.7,-61,0.1895,0.1895);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,-61,83.4,122.1);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap12();
	this.instance.setTransform(-41.7,-61,0.1895,0.1895);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,-61,83.4,122.1);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap12();
	this.instance.setTransform(-41.7,-61,0.1895,0.1895);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.7,-61,83.4,122.1);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap11();
	this.instance.setTransform(-75.9,-86.95,0.1771,0.1771);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.9,-86.9,151.8,173.9);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap11();
	this.instance.setTransform(-75.9,-86.95,0.1771,0.1771);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.9,-86.9,151.8,173.9);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A5fS0MAAAglnMAy/AAAMAAAAlng");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.1,-120.4,326.29999999999995,240.9);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A5fS0MAAAglnMAy/AAAMAAAAlng");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.1,-120.4,326.29999999999995,240.9);


(lib.purplemove = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#660066").s().p("AnOHPIAAudIOdAAIAAOdg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.purplemove, new cjs.Rectangle(-46.2,-46.2,92.5,92.5), null);


(lib.Group_20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#697CB9").s().p("AgsAaQgTgLAAgPQAAgOATgLQASgLAaAAQAbAAASALQATALAAAOQAAAPgTALQgSALgbAAQgaAAgSgLg");
	this.shape.setTransform(6.4,3.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_20, new cjs.Rectangle(0,0,12.8,7.4), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiDguIEHguIAACJIkGAwg");
	this.shape.setTransform(13.175,9.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,26.4,18.6), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9CB37").s().p("AgrA5IAAiaIBXAoIAACbg");
	this.shape.setTransform(4.425,9.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,8.9,19.5), null);


(lib.Group_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F38360").s().p("AgCAEIAAgIIAEAAIABABIAAACQAAACgCACIgCABg");
	this.shape.setTransform(0.3,0.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_2, new cjs.Rectangle(0,0,0.6,0.9), null);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#697CB9").s().p("AgSAMQgHgFgBgHQABgGAHgFQAIgFAKAAQALAAAIAFQAHAFABAGQgBAHgHAFQgIAEgLABIgBAAQgKAAgHgFg");
	this.shape_1.setTransform(2.65,1.6773);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,5.3,3.4), null);


(lib.boxmove = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// box
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#66FF00").s().p("AnOHPIAAudIOdAAIAAOdg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.boxmove, new cjs.Rectangle(-46.2,-46.2,92.5,92.5), null);


(lib.purple = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// whitedot
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiNCOQg7g7AAhTQAAhSA7g7QA7g7BSAAQBTAAA7A7QA7A7AABSQAABTg7A7Qg7A7hTAAQhSAAg7g7g");
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(150).to({_off:false},0).wait(30));

	// phone2
	this.instance = new lib.Bitmap13();
	this.instance.setTransform(-26,-56,0.1895,0.1895);

	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(15.7,5);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween8("synched",0);
	this.instance_2.setTransform(15.7,5);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},89).to({state:[{t:this.instance_1}]},40).to({state:[{t:this.instance_2}]},20).to({state:[]},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(129).to({_off:false},0).to({_off:true,alpha:0},20).wait(31));

	// phone1
	this.instance_3 = new lib.Tween5();
	this.instance_3.setTransform(15.7,5);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween6("synched",0);
	this.instance_4.setTransform(15.7,5);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(35).to({_off:false},0).to({_off:true,alpha:1,mode:"synched",startPosition:0},14).wait(131));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(35).to({_off:false},14).to({startPosition:0},80).to({alpha:0},20).to({_off:true},1).wait(30));

	// hand
	this.instance_5 = new lib.Tween3();
	this.instance_5.setTransform(-7.1,46.95);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.instance_6 = new lib.Tween4("synched",0);
	this.instance_6.setTransform(-7.1,46.95);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(35).to({_off:false},0).to({_off:true,alpha:1,mode:"synched",startPosition:0},14).wait(131));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(35).to({_off:false},14).to({startPosition:0},80).to({alpha:0},20).to({_off:true},1).wait(30));

	// background
	this.instance_7 = new lib.Tween1();
	this.instance_7.setTransform(14.05,25.7);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.instance_8 = new lib.Tween2("synched",0);
	this.instance_8.setTransform(14.05,25.7);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(35).to({_off:false},0).to({_off:true,alpha:1,mode:"synched",startPosition:0},14).wait(131));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(35).to({_off:false},14).to({startPosition:0},80).to({alpha:0},20).to({_off:true},1).wait(30));

	// purplemove
	this.purple = new lib.purplemove();
	this.purple.name = "purple";

	this.timeline.addTween(cjs.Tween.get(this.purple).wait(1).to({rotation:6.2069},0).wait(1).to({rotation:12.4138},0).wait(1).to({rotation:18.6207},0).wait(1).to({rotation:24.8276},0).wait(1).to({rotation:31.0345},0).wait(1).to({rotation:37.2414},0).wait(1).to({rotation:43.4483},0).wait(1).to({rotation:49.6552},0).wait(1).to({rotation:55.8621},0).wait(1).to({rotation:62.069},0).wait(1).to({rotation:68.2759},0).wait(1).to({rotation:74.4828},0).wait(1).to({rotation:80.6897},0).wait(1).to({rotation:86.8966},0).wait(1).to({rotation:93.1034},0).wait(1).to({rotation:99.3103},0).wait(1).to({rotation:105.5172},0).wait(1).to({rotation:111.7241},0).wait(1).to({rotation:117.931},0).wait(1).to({rotation:124.1379},0).wait(1).to({rotation:130.3448},0).wait(1).to({rotation:136.5517},0).wait(1).to({rotation:142.7586},0).wait(1).to({rotation:148.9655},0).wait(1).to({rotation:155.1724},0).wait(1).to({rotation:161.3793},0).wait(1).to({rotation:167.5862},0).wait(1).to({rotation:173.7931},0).wait(1).to({rotation:180},0).wait(151));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.1,-94.7,326.29999999999995,240.89999999999998);


(lib.lock = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// frame
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("AkMiWIIZAAIAAEtIoZAAg");
	this.shape.setTransform(31.2153,10.4165,1.097,1.097);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(233,232,233,0)").s().p("AkMCXIAAktIIYAAIAAEtg");
	this.shape_1.setTransform(31.2153,10.4165,1.097,1.097);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(289));

	// Layer_14
	this.instance = new lib._73x();
	this.instance.setTransform(19,-1,0.0154,0.0154);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(209).to({_off:false},0).to({_off:true},75).wait(5));

	// Layer_17
	this.instance_1 = new lib._63x();
	this.instance_1.setTransform(19,-1,0.0154,0.0154);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(134).to({_off:false},0).to({_off:true},99).wait(56));

	// Layer_12
	this.instance_2 = new lib._53x();
	this.instance_2.setTransform(19,-1,0.0154,0.0154);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(59).to({_off:false},0).to({_off:true},175).wait(55));

	// arm
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F38360").s().p("AiSC+IBEkiQALguAogZQAngZAvALQAuALAZAoQAZAogLAuIg4Dug");
	this.shape_2.setTransform(29.3814,19.8212,0.5738,0.5738);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(59).to({_off:false},0).to({_off:true},225).wait(5));

	// whiteframe
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(0.1,1,1).p("AmPkEIMfAAIAAIJIsfAAg");
	this.shape_3.setTransform(31.825,11.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.698)").s().p("AmPEFIAAoJIMfAAIAAIJg");
	this.shape_4.setTransform(31.825,11.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},59).to({state:[]},225).wait(5));

	// dog
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#4672B5").s().p("AAwBYQgogOgagZQgOgNgLgSQgJgNgHgVIgPgkQgLgZgFgIQgNgBgKgCQgIgCgBgEQgCgHAGgEQgFAFACAFQABADAIACQAHACAQAAIABAAQAJAPAJATIAPAkQANAnAbAYQAZAYAnARQAnAPAjAFQgpgEgigOg");
	this.shape_5.setTransform(28.2476,11.518,0.4451,0.4451);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#4672B5").s().p("AgbgCIACgFIAUAHQAVAEALgCQABADgBACIgJABQgWAAgXgKg");
	this.shape_6.setTransform(32.7555,16.0041,0.4453,0.4453);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C06F38").s().p("AACAHIgHgHIgDgCIgDgIIAFAEQADADACgEQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAAAQACAFAEAEQAAAAABABQAAAAABAAQAAABAAAAQABAAAAAAIADAEIgBABQgFAAgEgEg");
	this.shape_7.setTransform(32.2456,20.8276,0.4453,0.4453);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#CFA570").s().p("AABAAIAAAAIgBABQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAABAAg");
	this.shape_8.setTransform(30.1417,21.4386,0.4453,0.4453);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1F2325").s().p("AgBAHQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAgBAAgBIADgHQACgCAAAEIAAAHIgBABIgCACIAAAAIgBAAg");
	this.shape_9.setTransform(28.739,20.9785,0.4453,0.4453);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#CECFCF").s().p("AgJAAIAGgFQAAABAAAAQAAABAAAAQAAABAAAAQABAAAAAAIAFACQAEAAADAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQgHAAgGAEQACgFgEgBg");
	this.shape_10.setTransform(34.3719,15.4273,0.4453,0.4453);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#9C6832").s().p("AACAHQgDgEgCgEQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAgBgBIADgEIABACQABAFACgFIABgBQgBAHADAEIABAGQgBAAAAgBQAAAAgBAAQAAAAgBgBQAAAAgBgBg");
	this.shape_11.setTransform(32.4015,20.6705,0.4453,0.4453);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#CFA570").s().p("AgGADQAAgDADAAQADAAAHgGQADAIgGABIgEgBIgEAFQgBgBgBAAQAAAAAAgBQAAAAgBgBQAAAAABgBg");
	this.shape_12.setTransform(34.1919,15.0711,0.4453,0.4453);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#CFA570").s().p("AACAPQgEgBgFgFIgGgFQgDgCAAgCIAAgFIACgEQAAAAAAAAQABAAAAAAQABAAAAABQABAAABAAIAAgDQAAAAAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQACgCADADQAAAGAGALQAEAGAGAAIAFABQgEAEgHAAIgFAAg");
	this.shape_13.setTransform(33.4145,21.1183,0.4453,0.4453);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#CFA570").s().p("AgTAkQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAgBQAKgBgCgLQgBgFAEgKIAHgIIgDAAQABgEAIgIQAJgGACgEQADgEgCgBIAAgBQACgCAFgCQAAAAAAAAQAAABAAAAQAAABAAAAQAAABgBABIgEAHQAAACgGAFQgHAIgFAHQgCADgBAFIgHARQgDAJAKAAIACAAQACADgDACQgEABgEAAQgEAAgEgBg");
	this.shape_14.setTransform(29.5381,22.8468,0.4453,0.4453);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#BB7C3A").s().p("AgRAtQgJAAACgJIAIgRQABgHACgCQAFgHAIgHQAEgFABgDIAEgHQAAAAAAgBQABAAAAgBQAAAAAAgBQAAAAgBAAIACgCQAHgEADgKIADgGIACADIgCAFIAAAGIgBABIgDAFQgKARgNALQgFAEgCAGQgCAFgFAKQgEALAHAFg");
	this.shape_15.setTransform(30.0967,22.229,0.4453,0.4453);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#48494A").s().p("AAEARQgKgIgEgFQgCgCgBgHQAAAAABgBQAAAAAAgBQABAAAAgBQABAAABAAQAKgFAEgDQADgCAEACQACABgBAEIgBAFQgDAGAAAFIAAALQAAAAAAABQgBAAAAAAQAAABAAAAQgBAAAAAAIgDgBg");
	this.shape_16.setTransform(33.3541,14.7126,0.4453,0.4453);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#1F2325").s().p("AgRAPIABgBIgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBQAFgNADgPIADgHQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABIABAHQABAEgBADQgBABAAAAQAAAAABAAQAAABAAAAQABAAABAAQAJABAHgGQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAABQABAAAAAAQAAAAAAAAQAAABAAAAQAAABAAAAIADARIgBABQgDAFgBgFIgBgCIgDAFQgBAEgDgDIgFgEIgCgGQAAgBAAAAQAAAAgBgBQAAAAgBAAQAAAAAAAAQgEADgCAFIgCgDIgDAHQgDAJgHAEQAAgEAEgGg");
	this.shape_17.setTransform(31.5555,19.9803,0.4453,0.4453);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#48494A").s().p("AgBABQgBgCABgDQABAAAAABQAAAAABAAQAAAAABABQAAAAAAAAQACAEgDACIgCgDg");
	this.shape_18.setTransform(35.0376,14.6592,0.4453,0.4453);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#342C2E").s().p("Ag+BuIAEgKIABgLQABgGACgEQAEgEAAgCIgBgBIACgDQAAgBAAAAQAAgBAAAAQAAgBAAAAQgBgBAAAAQADgEAAgCIgEAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAgBgBQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAAAAAQACgEAAgDIAAgIQAAgEgDACQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAgBAAQgCgBgBgDIgBgFQAAgBAAAAQAAAAAAAAQgBgBAAAAQAAAAgBABIgBAAIgBgCQACgEgDgCQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAIABgFQAAgDABgCIAAgBIgCABIAEgHIAAgDIgCABQACgEAHgFQAHgHAMgGIAVgKQALgGAFgHIAKgRQABgCABgEIACgGQACgEAAgHQgBgIAGgJQADgGAKgDQAQgFAOAJQADACADAFQACADAGACQABAFgDAFQgHAFgEABQgDAAAAAEQAAAAAAABQAAAAAAAAQAAABABAAQAAABABAAQADADgCAEIAAADQAAAAgBABQAAAAAAAAQAAAAAAABQAAAAAAAAIAAATIACAHQABAAAAAAQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAAAABQAAAAAAAAQAAABAAABIABAFIAAADQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAgBABQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBALgDAFQgCAEgCAGIgCALQgEABgBAEIAAAHIABAGQABAAAAABQAAAAAAAAQgBABAAAAQAAAAgBAAQgDgCgDACQAAAAAAAAQAAAAgBABQAAAAAAABQAAAAAAABIAAADQgBgBgBAAQAAgBgBAAQgBAAAAAAQAAAAgBAAIgCAFQgDgDABgKIgDgSQABgBAAAAQAAgBgBAAQAAAAAAgBQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAAAgBAAQAAABgBAAQgHAHgKgBQgBAAgBgBQAAAAAAAAQgBAAAAgBQABAAAAAAQABgDgBgEIgBgHQAAgBAAAAQAAgBAAAAQAAAAAAAAQgBAAgBAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAABIgDAHQgDAPgFAOQAAAAAAABQAAAAAAAAQAAAAABAAQAAAAABAAIABABIgBABQgEAGAAAEIgCACQgFACgCACQAAAAgBAAQAAAAAAABQgBAAAAAAQAAABAAABIADgCQABABgCAEQgDAEgJAGQgIAIgCAEIADAAIgGAJQgFAKABAFQACALgKABgAAyhtQgEADgLAEQAAAAgBABQgBAAAAAAQgBABAAAAQAAABAAABQABAHACACQAEAGALAHQABABABAAQAAAAABAAQABAAAAgBQAAAAAAgBIABgKQgBgGAEgHIABgFQABgEgDgBIgDgBIgEACg");
	this.shape_19.setTransform(31.3257,18.8875,0.4453,0.4453);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#B0B1AF").s().p("AgJAEQAGgEAIAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAgBABgBQgDABgEgBIgFgBQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAAAIAEABQADADAIgCIgCAEQgDADgCAAQgDgBgIAFIgBAAg");
	this.shape_20.setTransform(34.4498,15.4941,0.4453,0.4453);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#1F2325").s().p("AgDADQABgDgBgCIgDgFIABgCIABgDQAAAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIAAADQAAAAAAABQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAIABAFQAAABABAAQAAABAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAABABAAQAAAAAAABIABADQgDAAgDACIgDADQgDgHACgDg");
	this.shape_21.setTransform(28.4273,20.1919,0.4453,0.4453);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CECFCF").s().p("AgHAJQAGgCgDgHQACgDgCgFQAAgBAAAAQABgBAAAAQAAAAAAAAQABAAAAAAIADABIAEACQgBACABADIADADQAAAEgEAFIgEABQgEAAgDgCg");
	this.shape_22.setTransform(34.717,14.8249,0.4453,0.4453);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#BB7C3A").s().p("AAGAWQgGAAgDgGQgIgMABgFQAAAAABAAQAAgBAAAAQAAAAAAgBQAAAAAAgBIgBgFIAAgIQABgDAEgCQABANgBAHIAAAJQADAKAGAAQAEAAADADIAAACIgBABIgEgBg");
	this.shape_23.setTransform(33.7422,20.5926,0.4453,0.4453);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#C06F38").s().p("AgLAmQgGgBAAgGQgBgFACgGQADgKAAgDQgBgIAGgHIACgDQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBgBIACgDIABgCQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIACgCQADgEAAgEIADgDQADgCACAAIABABQABAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAIgEAJQAAABAAABQABAAAAABQAAABAAAAQAAAAABAAQAAABAAAAQABAAAAAAQAAAAAAAAQABAAAAgBIACgCIABAAQAAACgCAFQAAAAAAAAQABAAAAAAQAAAAABgBQAAAAAAAAQABABAAAAQAAABABAAQAAAAAAAAQABAAAAAAIAEgBQAAADgDADIgDADQgEADgFAKIAAABIgCADQgHAQAJAJIAAABQgDACgHAAIgEAAg");
	this.shape_24.setTransform(28.3912,22.2346,0.4453,0.4453);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(289));

	// finger
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#F38360").s().p("AgDAOIgBgaQAAgEAEgBQAEAAAAAEIABAaQAAAEgEABQgEAAAAgEg");
	this.shape_25.setTransform(23.0687,5.6799,0.4001,0.4001);

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(15).to({scaleX:0.4,scaleY:0.4,rotation:-14.9988,x:22.9825,y:5.634},0).wait(14).to({scaleX:0.4001,scaleY:0.4001,rotation:0,x:23.1671,y:5.6781},0).wait(260));

	// man
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#A6D0ED").s().p("AgEAyIgBgCIgDgIIgThBQgDgIAEgHQAEgHAIgCQAIgDAGAEQAGAEADAIIATBBIABABIgBACIgBABQgLAKgOAGIgCABIgBABIgBAAIgCgBg");
	this.shape_26.setTransform(21.1377,7.1875,0.3988,0.3988);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#F38360").s().p("AAAA6QgTgBgIgYIgMhJIgEgLQgCgFAFgBQAHgBAFADQAFAEABAGIAYBFIAAABIACgDQAEgHACgHIAEgoQAAgHAFgEQAFgEAGABQAHABAEAEQAEAFgBAHIgFAtQgBAJgHAMQgLAVgTAAg");
	this.shape_27.setTransform(22.2731,8.1011,0.4,0.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#92C0E5").s().p("AgNAyQAHgKABgHQAAgFgFgZQgFgXABgFIAHgPQABgFgFgQQgFgOAGgGQACgDAGgCIAIgCQAGAIAAAIIAHCZIgOAEQgFADgKABQgNgVAKgSg");
	this.shape_28.setTransform(20.7782,8.7266,0.3987,0.3987);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#A6D0ED").s().p("AgRBbIgdgRQgIgFAAgGIAEiCQAAgUASgLQAFgDAIAAIAIABQAUADAPAJIADACIAKAHIAFAEQAHAHAAAJIAGCYIgNAFQgHACgJABIgIABQgSAAgRgLg");
	this.shape_29.setTransform(19.3181,8.2265,0.3987,0.3987);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#4672B5").s().p("AAdCNQgEgBgDgCQgDgDgBgEQAJhZgFgZIgRhAIAAAAIgPgNIAGBGIgNBgQABAFgEAEQgDAEgFgBIgGgBQgIAAgBgJIAAhxIgPhaIAAgfIBXgNIATAsIALBtIgLB0QAAAEgDAEQgEADgEAAg");
	this.shape_30.setTransform(19.5516,15.396,0.3988,0.3988);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#E2E8F1").s().p("AgGAQQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAIAAgbQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAIANAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABIAAAbQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAg");
	this.shape_31.setTransform(20.7979,20.9299,0.3988,0.3988);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E2E8F1").s().p("AgGAQQgBAAAAAAQgBAAAAAAQAAgBAAAAQgBgBAAAAIABgbQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIANAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAIAAAbQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAg");
	this.shape_32.setTransform(18.2653,19.9328,0.3988,0.3988);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#4A66AC").s().p("AAFAPIgHgCIgMAAQgEAAgGgCIgFgDQgCgCAAgGQAAgGABgDQACgEADgBQABAAAAAAQAAgBABAAQABAAAAAAQABAAABAAQAIAAANAHIAWAJQAFACACACQADAEgCADQgBACgEABQgFABgGAAIgKgBg");
	this.shape_33.setTransform(21.4568,21.7502,0.3988,0.3988);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#4A66AC").s().p("AgPASQgHgBgDgFIgBgHIABgGQgBgFAJgCIANgDIANgFQAKgDAEADQAHAEgHAJQgEAEgJAFIgPAIQgGAEgDAAg");
	this.shape_34.setTransform(18.8287,20.4236,0.3988,0.3988);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#A6D0ED").s().p("AAEBKIgZgqQgFgJgCgKQgEgNAEgRIAOg0QABgFAGgDQAFgDAEABQAGABADADQADAEgBAEIgNA0QgDANADALIAEAMIAaApQACAEgCAFQgCAFgFACIgEABIgFABQgHAAgDgGg");
	this.shape_35.setTransform(17.9278,7.7409,0.3987,0.3987);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#4A66AC").s().p("AgCARQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAIAAggQAAAAAAAAQAAAAABAAQAAAAAAAAQAAgBABAAIAFAAQABAAAAABQAAAAAAAAQABAAAAAAQAAAAAAAAIAAAgQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBAAg");
	this.shape_36.setTransform(20.5739,2.4174,0.3987,0.3987);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#283E91").s().p("AgKAEIAVgJIAAACIgVAJg");
	this.shape_37.setTransform(21.0523,2.6666,0.3987,0.3987);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F38360").s().p("AgCAJQgDgCgCgFQgBgDABgEQACgDADgBQACgBAEACQACADABAEQABADgBAEQgBAEgDAAIgCABQgBAAAAgBQAAAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_38.setTransform(20.2251,3.0852,0.3987,0.3987);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#4A66AC").s().p("AgJAJIgCgYIAXAAIAAAfg");
	this.shape_39.setTransform(19.7666,3.155,0.3987,0.3987);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#4A66AC").s().p("AAAAoIgGgHQgEgFgDAAIgKgCQgHgBgCgDIgCgFQgFgSgBgHQAAgPAKgLQAKgLAWgBQAXAAAMAKQAGAEgDAHQgBADgCACQgEADgHAEQgHADgDADQgDADgCANQgCANABABQAEAEAHABQAGAAADgDQACAJgBADQgDAGgFADIgGABQgIAAgJgHg");
	this.shape_40.setTransform(20.0214,2.5701,0.3987,0.3987);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F38360").s().p("AACAgIgRgZQgBgBAAAAQAAAAgBAAQAAAAgBAAQgBAAAAABQgBABAAAAQgBABAAAAQAAAAgBgBQAAAAAAAAQAAgDgEgBQgDgCAAgCQAAgBACgDIADgGQACgFAFgEQAGgEAHgBIAQgEIABgFIARAAIAAAxIAAACQgCAJgJAEQgFADgEAAIgIgCg");
	this.shape_41.setTransform(20.0158,2.9264,0.3987,0.3987);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#283E91").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDgAgFgFQgCACAAADQAAAJAHAAQADAAADgDQACgDAAgDQAAgDgCgCQgDgDgDAAQgDAAgCADg");
	this.shape_42.setTransform(21.1718,2.6616,0.3983,0.3983);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F38360").s().p("AgCAVQgGAAgEgCQgEgDAAgDIAGgiIAbAAIgEAiQABAJgNAAIgDgBg");
	this.shape_43.setTransform(19.4309,3.8936,0.3988,0.3988);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#283E91").s().p("AgMAJQgFgDAAgGQAAgFAFgDQAFgEAHAAQAIAAAFAEQAFADAAAFQAAAGgFADQgFAEgIAAQgHAAgFgEg");
	this.shape_44.setTransform(19.2325,4.6275,0.3988,0.3988);

	this.instance_3 = new lib.Group_20();
	this.instance_3.setTransform(20.55,21.45,0.4008,0.4008,0,0,0,6.5,3.9);
	this.instance_3.alpha = 0.1797;

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F38360").s().p("AgIANQgEgFgBgHQAAgGAEgGQADgFAGAAQAEgBAFAFQAEAFAAAHQABAGgDAGQgFAFgFAAQgFAAgEgEg");
	this.shape_45.setTransform(23.4464,6.3448,0.4,0.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#92C0E5").s().p("AgCAcIgPgKQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAIARgoIACgCIACABIAPAKQABABAAAAQAAABAAAAQABABgBAAQAAABAAAAIgRAoIgCABIAAABg");
	this.shape_46.setTransform(23.202,4.6676,0.4,0.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#314682").s().p("AgDAfIgRgNQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIAUgrQAAgBAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAIASANQAAAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAIgTArQAAABAAABQgBAAAAABQgBAAAAAAQAAAAAAAAIgDAAg");
	this.shape_47.setTransform(23.1925,4.6699,0.4,0.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#283E91").s().p("AgHAfIgNgNQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAIASgsQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAIASANQAAAAABAAQAAAAAAABQAAAAAAAAQAAABgBAAIgTArQgBADgCAAIgCAAIgEAAg");
	this.shape_48.setTransform(23.2878,4.6676,0.4,0.4);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#F38360").s().p("AgJANQgFgFAAgIQAAgHAFgFQAEgFAFAAQAGAAAFAFQAEAFAAAHQAAAIgEAFQgFAFgGAAQgFAAgEgFg");
	this.shape_49.setTransform(22.5979,5.3475,0.4,0.4);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F38360").s().p("AgFgbIAJgQQAEgFAGgBQAGgCAGAEQAFADABAGQACAHgEAFIgKAPQgNAVgIAMQgOARgQALg");
	this.shape_50.setTransform(21.6454,7.3166,0.4,0.4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAAAMIgGgFIgBgBIAHgQIAAgBIABABIAGAEIABACIgHAPIgBABg");
	this.shape_51.setTransform(23.2833,4.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50,p:{scaleX:0.4,scaleY:0.4,x:21.6454,y:7.3166}},{t:this.shape_49,p:{scaleX:0.4,scaleY:0.4,x:22.5979,y:5.3475}},{t:this.shape_48,p:{scaleX:0.4,scaleY:0.4,x:23.2878,y:4.6676}},{t:this.shape_47,p:{scaleX:0.4,scaleY:0.4,x:23.1925,y:4.6699}},{t:this.shape_46},{t:this.shape_45,p:{scaleX:0.4,scaleY:0.4,x:23.4464,y:6.3448}},{t:this.instance_3},{t:this.shape_44,p:{scaleX:0.3988,scaleY:0.3988,x:19.2325,y:4.6275}},{t:this.shape_43,p:{scaleX:0.3988,scaleY:0.3988,x:19.4309,y:3.8936}},{t:this.shape_42,p:{scaleX:0.3983,scaleY:0.3983,x:21.1718,y:2.6616}},{t:this.shape_41,p:{scaleX:0.3987,scaleY:0.3987,x:20.0158,y:2.9264}},{t:this.shape_40,p:{scaleX:0.3987,scaleY:0.3987,x:20.0214,y:2.5701}},{t:this.shape_39,p:{scaleX:0.3987,scaleY:0.3987,x:19.7666,y:3.155}},{t:this.shape_38,p:{scaleX:0.3987,scaleY:0.3987,x:20.2251,y:3.0852}},{t:this.shape_37,p:{scaleX:0.3987,scaleY:0.3987,x:21.0523,y:2.6666}},{t:this.shape_36,p:{scaleX:0.3987,scaleY:0.3987,x:20.5739,y:2.4174}},{t:this.shape_35,p:{scaleX:0.3987,scaleY:0.3987,x:17.9278,y:7.7409}},{t:this.shape_34,p:{scaleX:0.3988,scaleY:0.3988,x:18.8287,y:20.4236}},{t:this.shape_33,p:{scaleX:0.3988,scaleY:0.3988,x:21.4568,y:21.7502}},{t:this.shape_32,p:{scaleX:0.3988,scaleY:0.3988,x:18.2653,y:19.9328}},{t:this.shape_31,p:{scaleX:0.3988,scaleY:0.3988,x:20.7979,y:20.9299}},{t:this.shape_30,p:{scaleX:0.3988,scaleY:0.3988,x:19.5516,y:15.396}},{t:this.shape_29,p:{scaleX:0.3987,scaleY:0.3987,x:19.3181,y:8.2265}},{t:this.shape_28,p:{scaleX:0.3987,scaleY:0.3987,x:20.7782,y:8.7266}},{t:this.shape_27,p:{scaleX:0.4,scaleY:0.4,x:22.2731,y:8.1011}},{t:this.shape_26,p:{scaleX:0.3988,scaleY:0.3988,x:21.1377,y:7.1875}}]}).to({state:[{t:this.shape_50,p:{scaleX:0.4007,scaleY:0.4007,x:21.7172,y:7.4045}},{t:this.shape_49,p:{scaleX:0.4007,scaleY:0.4007,x:22.6714,y:5.4319}},{t:this.shape_48,p:{scaleX:0.4007,scaleY:0.4007,x:23.3626,y:4.7507}},{t:this.shape_47,p:{scaleX:0.4007,scaleY:0.4007,x:23.2671,y:4.753}},{t:this.shape_51},{t:this.shape_45,p:{scaleX:0.4007,scaleY:0.4007,x:23.5215,y:6.4309}},{t:this.instance_3},{t:this.shape_44,p:{scaleX:0.4005,scaleY:0.4005,x:19.3901,y:4.8217}},{t:this.shape_43,p:{scaleX:0.4005,scaleY:0.4005,x:19.5894,y:4.0846}},{t:this.shape_42,p:{scaleX:0.4005,scaleY:0.4005,x:21.3854,y:2.9008}},{t:this.shape_41,p:{scaleX:0.4005,scaleY:0.4005,x:20.1883,y:3.1267}},{t:this.shape_40,p:{scaleX:0.4005,scaleY:0.4005,x:20.1939,y:2.7689}},{t:this.shape_39,p:{scaleX:0.4005,scaleY:0.4005,x:19.938,y:3.3564}},{t:this.shape_38,p:{scaleX:0.4005,scaleY:0.4005,x:20.3986,y:3.2863}},{t:this.shape_37,p:{scaleX:0.4005,scaleY:0.4005,x:21.2296,y:2.8658}},{t:this.shape_36,p:{scaleX:0.4005,scaleY:0.4005,x:20.749,y:2.6154}},{t:this.shape_35,p:{scaleX:0.4005,scaleY:0.4005,x:18.0907,y:7.9634}},{t:this.shape_34,p:{scaleX:0.4005,scaleY:0.4005,x:18.9845,y:20.6856}},{t:this.shape_33,p:{scaleX:0.4005,scaleY:0.4005,x:21.624,y:22.0178}},{t:this.shape_32,p:{scaleX:0.4005,scaleY:0.4005,x:18.4188,y:20.1926}},{t:this.shape_31,p:{scaleX:0.4005,scaleY:0.4005,x:20.9622,y:21.1939}},{t:this.shape_30,p:{scaleX:0.4005,scaleY:0.4005,x:19.7105,y:15.6364}},{t:this.shape_29,p:{scaleX:0.4005,scaleY:0.4005,x:19.4874,y:8.4513}},{t:this.shape_28,p:{scaleX:0.4005,scaleY:0.4005,x:20.9542,y:8.9536}},{t:this.shape_27,p:{scaleX:0.4007,scaleY:0.4007,x:22.346,y:8.1905}},{t:this.shape_26,p:{scaleX:0.4005,scaleY:0.4005,x:21.3035,y:7.3927}}]},29).wait(260));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.1,-15.4,81.89999999999999,54.199999999999996);


(lib.coffee1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// frame
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("AkMiWIIZAAIAAEtIoZAAg");
	this.shape.setTransform(10.6,5.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(233,232,233,0)").s().p("AkMCXIAAktIIYAAIAAEtg");
	this.shape_1.setTransform(10.6,5.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape}]},60).to({state:[]},299).wait(66));

	// iphone_4
	this.instance = new lib._43x();
	this.instance.setTransform(1,-10,0.0153,0.0154);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(344).to({_off:false},0).to({_off:true},75).wait(6));

	// iphone_3
	this.instance_1 = new lib._33x();
	this.instance_1.setTransform(1,-10,0.0153,0.0154);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(269).to({_off:false},0).to({_off:true},149).wait(7));

	// iphone_2
	this.instance_2 = new lib._23x();
	this.instance_2.setTransform(1,-10,0.0153,0.0154);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(194).to({_off:false},0).to({_off:true},224).wait(7));

	// iphone_1
	this.instance_3 = new lib._13x();
	this.instance_3.setTransform(1,-10,0.0153,0.0154);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(119).to({_off:false},0).to({_off:true},299).wait(7));

	// arm
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F38360").s().p("AiSC+IBEkiQALguAogZQAngZAvALQAuALAZAoQAZAogLAuIg4Dug");
	this.shape_2.setTransform(11.6314,11.0212,0.5738,0.5738);
	this.shape_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(119).to({_off:false},0).to({_off:true},300).wait(6));

	// whiteframe
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#333333").ss(0.1,1,1).p("AkcikII5AAIAAFJIo5AAg");
	this.shape_3.setTransform(10.75,5.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.698)").s().p("AkcClIAAlJII5AAIAAFJg");
	this.shape_4.setTransform(10.75,5.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},119).to({state:[]},300).wait(6));

	// window
	this.instance_4 = new lib.Path();
	this.instance_4.setTransform(11.9,3.25,1,1,0,0,0,13.2,9.2);
	this.instance_4.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:0},29).wait(396));

	// shop
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#8E6F45").ss(0.5,1).p("AABgRIgBAOQgBAPACAH");
	this.shape_5.setTransform(-27.5225,8.25);

	this.instance_5 = new lib.Path_1();
	this.instance_5.setTransform(-24.35,9.45,1,1,0,0,0,4.4,9.8);
	this.instance_5.alpha = 0.8789;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E9CB37").s().p("AgdghIArgIIAFAUIgUAEIABAIIAUgEIADASIgUAEIABAJIAWgEIAEAUIgtAIgAgQgaIALA5IAZgFIgBgCIgWAEIgEgZIAUgDIAAgDIgVADIgFgXIAXgFIgBgCg");
	this.shape_6.setTransform(24.65,-18.075);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E9CB37").s().p("AgdghIAsgIIADAUIgTAEIABAIIAUgEIAEASIgVAEIACAJIAVgEIAEAUIgtAIgAgQgaIALA5IAYgFIAAgDIgVAFIgGgZIAWgDIgBgDIgVADIgEgYIAVgEIAAgDg");
	this.shape_7.setTransform(19.4,-17.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E9CB37").s().p("AgaghIAsgIIAEAUIgVAEIACAIIAUgEIAEASIgVAEIAGAdIgXAEgAgNgaIALA5IACgBIgEgbIAVgDIgBgDIgVADIgEgYIAWgEIgBgDg");
	this.shape_8.setTransform(13.975,-16.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E9CB37").s().p("AgZghIArgIIAEATIgVAFIACAIIAUgEIAEASIgUAEIAFAcIgXAFgAgNgaIAMA5IACgBIgFgcIAVgCIAAgDIgWADIgEgYIAWgEIgBgDg");
	this.shape_9.setTransform(8.85,-15.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E9CB37").s().p("AgIAoQgHgCgHgEQgFgEgGgHQgFgIgBgHQgBgHACgIQABgIAEgHQAFgGAHgFQAHgEAHgCQAIgBAHABQAJACAGAFQAIAFADAGQAFAHABAIQABAHgBAIQgCAIgEAGQgFAHgGAEQgHAEgJACIgHABIgIgBgAgEgcIgMAEIgIAIIgEALQgCAFACAGQAAAFAEAGQAEAEAEAEQAFADAGABQAGABAFgBQAFAAAGgEQAFgEADgEQADgFABgGQABgFgBgFQgBgGgDgFQgEgFgEgDQgFgEgFgBIgHgBIgEABgAgEAaQgHgBgDgDQgEgCgDgFQgDgFgBgFQgBgFABgFIAEgJQADgEAFgDQACgCAHgCQAFgBAFABQAEABAFADQAFAEADADIADAKQACAFgCAFQgBAEgDAFIgHAHQgFAEgFAAIgFABIgEgBgAgCgPIgGADIgEAEIgDAGIAAAFIADAGIAEAFQADACADAAIAFAAIAGgCIAFgFIACgFIAAgGQgBgEgBgCQgCgDgDgBIgFgDIgEAAIgCAAg");
	this.shape_10.setTransform(2.3,-13.875);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E9CB37").s().p("AgEAoQgJgBgGgFQgGgDgFgIQgEgGgCgJQgCgJACgHQACgIAEgHQAFgGAHgEQAHgEAIgCIAKgBIAKACIAIACIgIAYIgFgCIgFgBIgGAAIgFADIgFAEIgCAGIAAAFIACAGIAFAEQABACAEABQADABAEgBIAGgCIAEgDIAEgEIAQATIgHAGIgIAEQgGADgGABIgJABIgGgBgAgBgcQgGABgEADQgFADgEAFQgDAEgBAGQgCAFABAHQACAGADAFQAEAGAEACQAFAEAGAAQAFABAGgBIAGgCIAEgCIAEgCIgCgDIgDADIgEACIgGABQgGABgEgBQgGAAgEgEQgDgCgEgFQgCgDgCgHIAAgKQABgFADgEQADgEAEgDQAFgDAGgBIAEgBIAIABIABgDIgJgBg");
	this.shape_11.setTransform(-4.9821,-12.5679);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#8E6F45").s().p("AgEAXQgDgCAAgEIAAghQAAgEADgCQACgCACAAQAIAAAAAIIAAAhQAAAIgIAAQgCAAgCgCg");
	this.shape_12.setTransform(24.275,-13.075);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#8E6F45").s().p("AgEAXQgDgCAAgDIAAgiQAAgIAHAAQAIAAAAAIIAAAiQAAADgDACQgCACgDAAQgCAAgCgCg");
	this.shape_13.setTransform(-4.325,-8.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#B4946D").s().p("AlHgLIG4hNIDXBkIm4BNg");
	this.shape_14.setTransform(0.725,-11.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#A98B67").s().p("AjbhdIG3hNIAAEIIm3BMgAh/hMIAACKIEGgwIAAiIg");
	this.shape_15.setTransform(11.5,6.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#8E6F45").s().p("AhqBUIgBkKIDXBlIAAEIg");
	this.shape_16.setTransform(-21.275,5.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.instance_5},{t:this.shape_5}]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.instance_5},{t:this.shape_5}]},60).wait(365));

	// LUarm
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F38360").s().p("AgBASIgCgEIAAgcQAAgEADAAQAEAAAAAEIAAAdIgBAEIgCAAIgCgBg");
	this.shape_17.setTransform(17.2,4.095);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(425));

	// LLarm
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F38360").s().p("AgKAGQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBgEADAAIASgFQADgBACABQABABAAAAQABABAAAAQAAABAAABQAAAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAIgLADIgIACg");
	this.shape_18.setTransform(16.1139,6.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(60).to({scaleX:0.9957,scaleY:0.9957,rotation:29.9979,x:16.0071,y:5.2952},0).wait(296).to({scaleX:1,scaleY:1,rotation:0,x:16.1139,y:6.075},0).wait(69));

	// cup
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#8E6F45").s().p("AgCAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAgBAAAAQABAAABABQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBABgBAAQAAAAAAgBQgBAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_19.setTransform(13.825,1.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E2E8F1").s().p("AgDAAQAAAAAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQABAAAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAQgDAAAAgCg");
	this.shape_20.setTransform(13.825,1.925);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#A6D0ED").s().p("AgDAEIAAgGQAAgBAAAAQABgBAAAAQABAAABAAQAAAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAAAABIAAAGQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABgBAAQAAAAAAgBQgBAAgBAAQAAAAgBgBQAAAAAAAAg");
	this.shape_21.setTransform(13.825,2.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:2.25}},{t:this.shape_20,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:1.925}},{t:this.shape_19,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:1.9}}]}).to({state:[{t:this.shape_21,p:{scaleX:0.9946,scaleY:0.9946,rotation:105.0003,x:13.0046,y:3.9033}},{t:this.shape_20,p:{scaleX:0.9946,scaleY:0.9946,rotation:105.0003,x:13.5168,y:3.8369}},{t:this.shape_19,p:{scaleX:0.9946,scaleY:0.9946,rotation:105.0003,x:13.5408,y:3.8434}}]},60).to({state:[{t:this.shape_21,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:2.25}},{t:this.shape_20,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:1.925}},{t:this.shape_19,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:1.9}}]},296).wait(69));

	// computer
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E2E8F1").s().p("AAAAAIAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAQAAAAAAAAg");
	this.shape_22.setTransform(12.825,5.625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#283E91").s().p("AAMASIgVgMIgBgBIgDgVQAAAAAAgBQAAAAAAAAQABAAAAAAQAAAAABAAIAVAMIABACIADAUIAAABIgCAAg");
	this.shape_23.setTransform(12.9625,5.5833);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#92C0E5").s().p("AAMASIgUgNIgCgBIgEgUIABgBIACgBIAWANIABABIADAUQAAABAAAAQAAABAAAAQgBAAAAABQAAAAgBAAIgBgBg");
	this.shape_24.setTransform(13.05,5.5621);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#92C0E5").s().p("AABAEIgLgFIgBAAIAKgCIAMAFIABABIgKABg");
	this.shape_25.setTransform(14.525,6.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#EDF8FD").s().p("AgUgCQgBgBAAAAQgBAAAAAAQAAAAAAAAQAAgBABAAIASgDIAZALIABABIgSADg");
	this.shape_26.setTransform(14.2,6.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#92C0E5").s().p("AABAHIgWgKQAAAAgBAAQAAAAAAgBQgBAAAAAAQABAAAAAAIASgDIAaAKQABABAAAAQAAAAABAAQAAAAgBABQAAAAgBAAIgSADIgBAAIgCgBg");
	this.shape_27.setTransform(14.2568,6.5833);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#8E6F45").s().p("AAAAEIgBgBIgBAAIgBgBIAAAAIgBAAIgBgBIgCgBIgBAAIAAAAIgBgBIAGgCIANAFIAAABIgIABIgCAAg");
	this.shape_28.setTransform(14.675,6.4875);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#92C0E5").s().p("AAFAEIgCgBIACABIADAAIgCAAgAgGgBIgBAAIAJgCIgGABIABABIABABIABAAIABABIAAABIABAAIAAAAg");
	this.shape_29.setTransform(14.1375,6.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#8E6F45").s().p("AAKAHIgBAAIgBgBIAAAAIgBAAIgDgBIgEAAQgCgBgDgCIgBgBIgBgBIgBAAIgBgBIgCAAIgBgBIgCAAIgCgBIgCgBIAAAAIALgCIAYALIACABIgJABg");
	this.shape_30.setTransform(14.6125,6.375);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#EDF8FD").s().p("AgQgDQAAgBgBAAQAAAAAAAAQgBAAAAAAQABgBAAAAIAIgBIAAAAIABABIADACIACAAIABAAIABABIABABIAAABIABAAIACAAQACACADABIAFAAIADABIAAABIABAAIABAAIABABIgKABg");
	this.shape_31.setTransform(13.7625,6.55);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#8E6F45").s().p("AAJAGIgBAAIgBgBIAAAAIgBAAIgDgBIgDAAQgDgBgDgCIgBgBIgBAAIgBAAIgBgCIgCAAIgBgBIgCAAIgCgBIgBAAIAKgCIAZAKQABAAAAABQABAAAAAAQAAAAAAABQgBAAAAAAIgIABIgBgBg");
	this.shape_32.setTransform(14.7193,6.4875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#92C0E5").s().p("AAGAGIgWgKQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAAAIAJgBIABAAIACABIACAAIABABIACAAIABACIAAAAIABABIABABQADABADABIAEAAIADABIABAAIAAAAIABABIABAAIABABIgLACIAAAAIgCgBg");
	this.shape_33.setTransform(13.825,6.6583);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22}]}).to({state:[{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22}]},60).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22}]},296).wait(69));

	// coffee
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#8E6F45").s().p("AAHANIgIgIIgIgEIgLgCQgEgBgBgGQgBgFADAAQAEgBALAEIAHAEQAGAEADAAQABAAAAABQABAAABAAQAAAAAAABQABAAAAAAIACADQABACAEACIAGACQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBAAQgBAAAAAAIgIABIgCAAIgFgBg");
	this.shape_34.setTransform(15.9018,6.7444,0.8113,0.8113);
	this.shape_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_34).wait(60).to({_off:false},0).to({_off:true},296).wait(69));

	// table
	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#E4A64B").s().p("AhVgRIBEgMIBnAwIhEALg");
	this.shape_35.setTransform(11.825,6.15);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#8E6F45").s().p("AAQAdIhlguIAAgEIAJACIA5gKIAEABIBXAoIAOADIAAADIhDAMIgBAAIgCgBg");
	this.shape_36.setTransform(11.825,6.5333);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#8E6F45").s().p("AgCAYIAAgvQAAgBAAgBQAAgBAAAAQABgBAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAAAABQAAABAAABIAAAvQAAABAAABQAAABAAAAQgBABAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAgBAAgBg");
	this.shape_37.setTransform(18.85,10.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#8E6F45").s().p("AgDAcIAAg3QAAgBABgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAABAAQAAABABAAQAAABAAAAQABABAAABIAAA3QAAABgBABQAAAAAAABQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBgBAAgBg");
	this.shape_38.setTransform(12.05,11.075);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#8E6F45").s().p("AgDAcIAAg3QAAgBABgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAABAAQAAABABAAQAAABAAAAQAAABAAABIAAA3QAAABAAABQAAAAAAABQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBgBAAgBg");
	this.shape_39.setTransform(9.9,6.725);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#8E6F45").s().p("AgCAcIAAg3QAAgBAAgBQAAAAABgBQAAAAABgBQAAAAAAAAQABAAABAAQAAABABAAQAAABAAAAQAAABAAABIAAA3QAAABAAABQAAAAAAABQgBAAAAABQgBAAgBAAQAAAAAAAAQgBgBAAAAQgBgBAAAAQAAgBAAgBg");
	this.shape_40.setTransform(4.425,7.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]},60).wait(365));

	// head
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#4A6AAF").s().p("AgFAFIgBgBQgDgDADgCQACgEAEAAQADgBADADQACADgBACIABAAQgDAEgFAAIgFgBg");
	this.shape_41.setTransform(15.55,0.3109);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F38360").s().p("AgDAIIgDgGIAAgCQgCgHACgBQAFgCADAEQAEAEACADIAAABQgBAEgCACIgDACQgDAAgCgCg");
	this.shape_42.setTransform(15.7,0.8417);

	this.instance_6 = new lib.Group_2();
	this.instance_6.setTransform(16.1,1.55,1,1,0,0,0,0.3,0.5);
	this.instance_6.compositeOperation = "multiply";

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F38360").s().p("AAAADIgBgCIABgBIAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAAAIgBACIgBABIAAAAg");
	this.shape_43.setTransform(16.6,0.8563);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#F38360").s().p("AgCAHQgBgBAAgFIABgCIAAgFIAGAAIAAAHIAAADQgEADgBAAIgBAAg");
	this.shape_44.setTransform(16.1375,1.7938);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#4A6AAF").s().p("AAKAYQgDgBgBgFQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAgBIACgEQgBgFgGgDIgKgCIgEgCQgEgEgBgGQgBgHAHgCQAHgEAFAGIAFAJIAIAKQAGAFgDAHIgDAGIACAEQAAAAAAABQgBAAAAABQAAAAAAAAQgBABAAAAIgCABIgCgBg");
	this.shape_45.setTransform(16.6824,1.8855);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance_6},{t:this.shape_42},{t:this.shape_41}]}).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.instance_6},{t:this.shape_42},{t:this.shape_41}]},60).wait(365));

	// lady
	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#F38360").s().p("AgEAFIgCgDIABgDIACgDIABAAIAFADIACAAIACABIgFADIgCACIgCAAIgCAAg");
	this.shape_46.setTransform(16.15,2.145);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#E2E8F1").s().p("AgFAKIgHgCIgBgBQgBgEACgCIADgEIAAgDQAAgGAFABIABABIAIADIACABIAEABQAEABgBAEIgCAEIgCADQgCADgDACIgDAAQgCAAgFgCg");
	this.shape_47.setTransform(16.0661,2.7429);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#CFD7E8").s().p("AgHAQQgBgBgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAIgCgMQgBgDACgCIADgFIAAgDQAAgGAFABIABABIAIADIACABIAEABQAEABgBAEIgCAFIgCAPQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAgBABQgCABgEAAQgDAAgGgCg");
	this.shape_48.setTransform(16.0661,3.3444);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#4672B5").s().p("AgDAVIgVgPIASgOIAKgNIAVAFIgCARQgDAIgHAEIgNAIIgBABIgCgBg");
	this.shape_49.setTransform(14.575,6.47);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F38360").s().p("AgDACIAAgDIAAgBIADgBIADAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBAAIAAACIAAACIgCABQgDAAgBgDg");
	this.shape_50.setTransform(15.0071,6.6917);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46}]}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46}]},60).wait(365));

	// Lfoot
	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#F38360").s().p("AgDAGIAAgCIACgJQAAAAABgBQAAAAAAAAQAAAAABABQABAAAAABIABADIAAABQgBADgCACIgBACIgCgBg");
	this.shape_51.setTransform(13.25,12.5418);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#283E91").s().p("AgDAIIgBAAIABgFIACgGQABgEABAAQAFgBgBAGIAAACIgEAFIgBACIgDABg");
	this.shape_52.setTransform(13.175,12.9183);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_52},{t:this.shape_51}]}).to({state:[{t:this.shape_52},{t:this.shape_51}]},60).wait(365));

	// LLleg
	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#F38360").s().p("AgEAWIgBgjQABgGAEgDQADgBADAEIgBAGIgEAkQAAAAgBAAQAAAAAAAAQAAAAgBAAQgBABgBAAg");
	this.shape_53.setTransform(13.4563,10.1972);

	this.timeline.addTween(cjs.Tween.get(this.shape_53).wait(425));

	// LUleg
	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#F38360").s().p("AgRAMQgBgEACgBIAQgJIAEgEIAFgJIAJAEIgFAKQgCAEgGADIgQAJIAAABIgBAAQgFAAAAgEg");
	this.shape_54.setTransform(15.07,7.1525);

	this.timeline.addTween(cjs.Tween.get(this.shape_54).wait(425));

	// RUleg
	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#F38360").s().p("AgQANQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIABgCIAUgKIAGgKIAIAFIgGAKIgCACIgSAKIgEAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_55.setTransform(13.775,6.3944);

	this.timeline.addTween(cjs.Tween.get(this.shape_55).wait(425));

	// RLleg
	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#F38360").s().p("AgMgGQgCgCAAgEQABgEACgBIAEABIAFAGIARAXIgDAFg");
	this.shape_56.setTransform(13.2,8.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_56).wait(425));

	// Rfoot
	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#F38360").s().p("AgDAGIAAgBIABgHIACgCQAAgBAAAAQAAAAABAAQAAAAABAAQAAABAAABIABADIAAAAQgBADgCADIgCAAIgBAAg");
	this.shape_57.setTransform(14.5,10.635);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#283E91").s().p("AgEAIIAAgFIADgGQAAgBAAgBQABgBAAAAQAAgBAAAAQAAAAAAAAQAFgBAAAGIgBACIgCADIgCAEIgDABg");
	this.shape_58.setTransform(14.475,11.0729);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_58},{t:this.shape_57}]}).to({state:[{t:this.shape_58},{t:this.shape_57}]},60).wait(365));

	// chair
	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#A6D0ED").s().p("AgGANIgPgIQAAgBgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAABgBQAAAAABAAIANgIQAKgHALAFIAGAEQAEACAAAEQAAADgFACIgNAIQgEACgCAAQgDAAgDgBg");
	this.shape_59.setTransform(15.125,7.648);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#4672B5").s().p("AgGANIgPgIQAAgBgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIAAgDIAHgCIAJgFQAEgDAGgBQAGAAAFACIAHAEIADABIAAAEQgBAEgEACIgNAIQgDACgDAAIgGgBg");
	this.shape_60.setTransform(15.125,8.0851);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#A6D0ED").s().p("AAFAbIgOgKQgHgEACgIIADgWQABgGADgDQAEgCADACIAHAFQAEACADAHQACAGgBAGIgDAWQgBAGgDAAIgDgBg");
	this.shape_61.setTransform(17.1752,3.7135);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#4672B5").s().p("AADAZIgMgIQgHgEACgJIADgWIABgFIAAgCIAEgCIABAAQADgBACACIAHAEQAEADADAGQACAGgBAGIgDAWQgBAEgCACIAAAAIgFACg");
	this.shape_62.setTransform(17.6252,3.5929);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#283E91").s().p("AgCAJQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQAAgBABAAQAAAAAAAAIACAAIABgBIAAgKQAAAAAAgBQABAAAAAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAIAAAKQAAABAAAAQAAABgBAAQAAABgBAAQAAABgBAAIgDABg");
	this.shape_63.setTransform(16.8107,6.325);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#92C0E5").s().p("AgBAMIAAgXQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIAAAXQAAABAAABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAgBg");
	this.shape_64.setTransform(15.5,9.3);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#F0F6FC").s().p("AgDAAQAAgCADAAQAEAAAAACQAAABAAAAQAAABgBAAQAAAAgBABQgBAAgBAAQgDAAAAgDg");
	this.shape_65.setTransform(15.475,10.775);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#92C0E5").s().p("AgFABIACgDQAAAAABgBQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIACADQAAAEgGAAQgFAAAAgEg");
	this.shape_66.setTransform(15.475,10.975);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#F0F6FC").s().p("AALAKIgLgGIgKAGQgDACgEgCQgBAAAAgBQgBAAAAAAQAAgBABAAQAAgBABAAIALgHIgLgFQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIABgCQAEgCADACIAKAGIALgGQAEgCADACIABACQAAAAAAAAQAAABAAAAQAAAAgBAAQAAABAAAAIgLAFIALAHQABAAAAABQABAAAAABQAAAAgBAAQAAABgBAAIgDABIgEgBg");
	this.shape_67.setTransform(15.475,11.075);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#F0F6FC").s().p("AALAKIgLgGIgKAGQgDACgEgCQgBAAAAgBQgBAAAAAAQAAgBABAAQAAgBABAAIALgHIgLgFQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIABgCQAEgCADACIAKAGIALgGQAEgCADACIABACQAAAAAAAAQAAABAAAAQAAAAgBAAQAAABAAAAIgLAFIALAHQABAAAAABQABAAAAABQAAAAgBAAQAAABgBAAIgDABIgEgBg");
	this.shape_68.setTransform(15.475,11.075);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#A6D0ED").s().p("AAAADQgCgCAAgBQAAgBAAgBQABAAAAgBQAAAAABAAQAAABAAAAQADACAAACQAAAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgCgBg");
	this.shape_69.setTransform(16.875,10.6886);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#A6D0ED").s().p("AAAADQgCgCAAgBQAAgBAAgBQABAAAAgBQAAAAABAAQAAABAAAAQADACAAACQAAAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgCgBg");
	this.shape_70.setTransform(16.875,10.6886);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#4A66AC").s().p("AgCgBIACgCIACADIABACIgCACg");
	this.shape_71.setTransform(17,10.625);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#4A66AC").s().p("AAAADQAAgBAAAAQgBAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQABABAAAAQAAABgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_72.setTransform(17.1,10.575);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#4A66AC").s().p("AAAADQAAgBAAAAQgBAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQABABAAAAQAAABgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_73.setTransform(17.1,10.575);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#A6D0ED").s().p("AAAADQgCgBAAgCQAAgBABgBQAAAAAAAAQAAAAABAAQAAAAAAAAQACACABACQAAAAgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_74.setTransform(13.95,12.3893);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#A6D0ED").s().p("AAAADQgCgBAAgCQAAgBABgBQAAAAAAAAQAAAAABAAQAAAAAAAAQACACABACQAAAAgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_75.setTransform(13.95,12.3893);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#4A66AC").s().p("AgCgCIACgBIACADIABADIgCABg");
	this.shape_76.setTransform(14.05,12.35);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#4A66AC").s().p("AAAADQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_77.setTransform(14.15,12.275);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#4A66AC").s().p("AAAADQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_78.setTransform(14.15,12.275);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#A6D0ED").s().p("AAAADQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_79.setTransform(13.8,10.625);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#A6D0ED").s().p("AAAADQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_80.setTransform(13.8,10.625);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#4A66AC").s().p("AgCgCIACgBIACADIABACIgDACg");
	this.shape_81.setTransform(13.9,10.575);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#4A66AC").s().p("AAAADQgCgCABgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQACABAAACQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_82.setTransform(14,10.5107);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#4A66AC").s().p("AAAADQgCgCABgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQACABAAACQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_83.setTransform(14,10.5107);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#A6D0ED").s().p("AAAADQgBgBgBgDQABAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQADABAAACQAAABgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_84.setTransform(16.8,12.3107);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#A6D0ED").s().p("AAAADQgBgBgBgDQABAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQADABAAACQAAABgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_85.setTransform(16.8,12.3107);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#4A66AC").s().p("AgCgCIACgBIACADIABACIgDACg");
	this.shape_86.setTransform(16.95,12.275);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#4A66AC").s().p("AAAADQgCgCABgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQACACAAABQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_87.setTransform(17.05,12.2107);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#4A66AC").s().p("AAAADQgCgCABgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQACACAAABQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_88.setTransform(17.05,12.2107);

	this.instance_7 = new lib.Path_2();
	this.instance_7.setTransform(15.4,11.75,1,1,0,0,0,2.6,1.7);
	this.instance_7.alpha = 0.2109;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59}]}).to({state:[{t:this.instance_7},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59}]},60).wait(365));

	// RUarm
	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#F38360").s().p("AgEAMQgDgCABgDIAGgQQABgDAEABQADACgBADIgHAQQAAABAAAAQAAABAAAAQgBAAAAAAQgBAAAAAAIgCAAg");
	this.shape_89.setTransform(15.06,2.9264);

	this.timeline.addTween(cjs.Tween.get(this.shape_89).wait(425));

	// RLarm
	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#F38360").s().p("AACAKIgJgPQAAgBAAgBQgBgBABAAQAAgBAAAAQABgBABAAQAAAAABgBQABAAAAAAQABAAAAABQABAAAAABIAJAQQAAAAAAABQABABgBAAQAAABAAAAQgBABgBAAIgCABQAAAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAg");
	this.shape_90.setTransform(14.025,3.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_90).wait(60).to({scaleX:0.9945,scaleY:0.9945,rotation:-45,x:13.3965,y:4.0465},0).wait(296).to({scaleX:1,scaleY:1,rotation:0,x:14.025,y:3.15},0).wait(69));

	// back_of_shop
	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#D7BAA5").s().p("AhqBTIgBkJIDXBlIAAEIg");
	this.shape_91.setTransform(22.575,-2.475);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#CCAC94").s().p("AlHgLIG2hNIDZBkIm4BNg");
	this.shape_92.setTransform(0.725,14.625);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#E7CDB5").s().p("AjbhdIG3hNIgBEIIm1BNgAh+hNIAACLIEFgwIAAiIg");
	this.shape_93.setTransform(-10.05,-3.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_93},{t:this.shape_92},{t:this.shape_91}]}).to({state:[{t:this.shape_93},{t:this.shape_92},{t:this.shape_91}]},60).wait(365));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32,-22.3,72.2,45.8);


(lib.box = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// boxmove
	this.boxmove = new lib.boxmove();
	this.boxmove.name = "boxmove";

	this.timeline.addTween(cjs.Tween.get(this.boxmove).wait(1).to({rotation:6.2069},0).wait(1).to({rotation:12.4138},0).wait(1).to({rotation:18.6207},0).wait(1).to({rotation:24.8276},0).wait(1).to({rotation:31.0345},0).wait(1).to({rotation:37.2414},0).wait(1).to({rotation:43.4483},0).wait(1).to({rotation:49.6552},0).wait(1).to({rotation:55.8621},0).wait(1).to({rotation:62.069},0).wait(1).to({rotation:68.2759},0).wait(1).to({rotation:74.4828},0).wait(1).to({rotation:80.6897},0).wait(1).to({rotation:86.8966},0).wait(1).to({rotation:93.1034},0).wait(1).to({rotation:99.3103},0).wait(1).to({rotation:105.5172},0).wait(1).to({rotation:111.7241},0).wait(1).to({rotation:117.931},0).wait(1).to({rotation:124.1379},0).wait(1).to({rotation:130.3448},0).wait(1).to({rotation:136.5517},0).wait(1).to({rotation:142.7586},0).wait(1).to({rotation:148.9655},0).wait(1).to({rotation:155.1724},0).wait(1).to({rotation:161.3793},0).wait(1).to({rotation:167.5862},0).wait(1).to({rotation:173.7931},0).wait(1).to({rotation:180},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.4,-65.4,130.8,130.9);


// stage content:
(lib._06map = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
		var _this = this;
		this.stop();
		this.purple.stop();
		this.box.stop();
		this.coffee1.stop();
		this.lock.stop();
		
		var target1 = null;
		var played = {};
		function animateDone(){
			animatemove(_this.done, 1, 0, 0);
		}
		
		function animatemove(target, zoom, pX, pY) {
			if (target != _this.done && played[target] ){
				return;
			}
			played[target] = true;
			target1 = target;
			createjs.Tween.get(_this).to({x:pX, y:pY, scaleY:zoom, scaleX:zoom},1500).call(completeF);
		}
		
		function completeF(){
			target1.loop = 0
			target1.play();
		}
		
		_this.purple.on('click', function (e) {
			if ( target1 == _this.purple ){
				animateDone()
				return;
			}
			animatemove(_this.purple, 2, -600, -200);
		});
		
		_this.box.on('click', function (e) {
			if ( target1 == _this.box ){
				animateDone()
				return;
			}
			animatemove(_this.box, 2, -5, -200);
		});
		
		_this.coffee1.on('click', function (e) {
			if ( target1 == _this.coffee1 ){
				animateDone()
				return;
			}
			animatemove(_this.coffee1, 14, -6900, -3500);
		});
		
		/*
		_this.restaurant.on('click', function (e) {
			if ( target1 == _this.restaurant ){
				animateDone()
				return;
			}
			animatemove(_this.restaurant, 10, -1300, -3500);
		});
		*/
		
		_this.lock.on('click', function (e) {
			if ( target1 == _this.lock ){
				animateDone()
				return;
			}
			animatemove(_this.lock, 12, -4355, -4260);
		});
		
		_this.done.on('click', function (e) {
			animateDone()
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// lock
	this.lock = new lib.lock();
	this.lock.name = "lock";
	this.lock.setTransform(369.55,360);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("AkrAnIAAhNIJXAAIAABN");
	this.shape.setTransform(134.525,319.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.004)").s().p("AkrAoIAAhOIJXAAIAABOg");
	this.shape_1.setTransform(134.525,319.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.lock}]}).wait(1));

	// coffee1
	this.coffee1 = new lib.coffee1();
	this.coffee1.name = "coffee1";
	this.coffee1.setTransform(509.2,259.75);

	this.timeline.addTween(cjs.Tween.get(this.coffee1).wait(1));

	// scene
	this.instance = new lib.map01();
	this.instance.setTransform(0,0,0.0933,0.0933);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// purple
	this.purple = new lib.purple();
	this.purple.name = "purple";
	this.purple.setTransform(571.9,194.6);

	this.timeline.addTween(cjs.Tween.get(this.purple).wait(1));

	// box
	this.box = new lib.box();
	this.box.name = "box";
	this.box.setTransform(149.4,187.55);

	this.timeline.addTween(cjs.Tween.get(this.box).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(373.5,210,373,209.89999999999998);
// library properties:
lib.properties = {
	id: 'E22D5EA26317416D8D80A4DEC59F1E11',
	width: 747,
	height: 420,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/_23x.png", id:"_23x"},
		{src:"images/_13x.png", id:"_13x"},
		{src:"images/_53x.png", id:"_53x"},
		{src:"images/_43x.png", id:"_43x"},
		{src:"images/map01.png", id:"map01"},
		{src:"images/_73x.png", id:"_73x"},
		{src:"images/Bitmap13.png", id:"Bitmap13"},
		{src:"images/_63x.png", id:"_63x"},
		{src:"images/_33x.png", id:"_33x"},
		{src:"images/Bitmap12.png", id:"Bitmap12"},
		{src:"images/Bitmap11.png", id:"Bitmap11"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['E22D5EA26317416D8D80A4DEC59F1E11'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;