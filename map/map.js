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



(lib.Bitmap11 = function() {
	this.initialize(img.Bitmap11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,857,982);


(lib.Bitmap12 = function() {
	this.initialize(img.Bitmap12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,644);


(lib.map01 = function() {
	this.initialize(img.map01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,8000,4500);


(lib.Bitmap13 = function() {
	this.initialize(img.Bitmap13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,644);// helper functions:

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
	this.shape_1.graphics.f("#697CB9").s().p("AgTAMQgIgFAAgHQAAgGAIgFQAIgFALAAQAMAAAIAFQAIAFAAAGQAAAGgIAFQgJAFgLAAIgBABQgLAAgHgFg");
	this.shape_1.setTransform(2.825,1.6523);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,5.7,3.3), null);


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


(lib.coffee1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// window
	this.instance = new lib.Path();
	this.instance.setTransform(11.2,2.65,1,1,0,0,0,13.2,9.2);
	this.instance.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// door
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#8E6F45").ss(0.5,1).p("AABgSIgBAOQgBAPACAH");
	this.shape.setTransform(-28.2225,7.65);

	this.instance_1 = new lib.Path_1();
	this.instance_1.setTransform(-25.05,8.85,1,1,0,0,0,4.4,9.8);
	this.instance_1.alpha = 0.8789;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape}]}).wait(1));

	// coffeesign
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E9CB37").s().p("AgdghIAsgIIADAUIgTAEIABAIIATgEIAEASIgUAEIACAJIAVgEIAEAUIgtAIgAgQgaIALA5IAYgFIAAgCIgVAEIgGgZIAWgDIgBgDIgVADIgEgXIAVgFIAAgCg");
	this.shape_1.setTransform(23.95,-18.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E9CB37").s().p("AgdghIAsgIIADAUIgTAEIABAIIAUgEIAEASIgVAEIACAJIAVgEIAEAUIgtAIgAgQgaIALA5IAYgFIAAgDIgVAFIgGgZIAVgDIAAgDIgVADIgFgYIAWgEIAAgDg");
	this.shape_2.setTransform(18.7,-17.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E9CB37").s().p("AgaghIAsgIIAEAUIgVAEIACAIIAUgEIAEASIgVAEIAGAdIgXAEgAgNgaIALA5IACgBIgEgbIAVgDIgBgDIgVADIgEgYIAWgEIgBgDg");
	this.shape_3.setTransform(13.275,-16.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E9CB37").s().p("AgZghIArgIIAEATIgUAFIABAIIAUgEIAEASIgVAEIAGAdIgYAEgAgNgaIALA5IADgBIgFgcIAVgCIAAgDIgWADIgEgYIAWgEIgBgDg");
	this.shape_4.setTransform(8.15,-15.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E9CB37").s().p("AgHAoQgIgCgHgEQgFgEgGgHQgEgIgCgHQgCgHADgIQABgIAEgHQAFgGAGgFQAIgEAHgCQAIgBAIABQAHACAHAFQAIAFADAGQAFAHABAIQABAHgCAIQgBAIgEAGQgFAHgHAEQgGAEgIACIgIABIgHgBgAgFgcIgLAEIgIAIIgEALQgCAFACAGQAAAFAEAGQADAEAFAEQAFADAGABQAGABAFgBQAFAAAGgEQAFgEADgEQADgFABgGQACgFgCgFQgBgGgDgFQgDgFgFgDQgFgEgFgBIgHgBIgFABgAgFAaQgFgBgEgDQgDgCgEgFQgDgFgBgFQgCgFACgFIAEgJQADgEAEgDQADgCAHgCQAFgBAFABQAEABAFADQAFAEACADQADADACAHQAAAFgBAFQgBAEgDAFIgHAHQgFAEgFAAIgFABIgFgBgAgCgPIgGADIgFAEIgCAGIAAAFIACAGIAFAFQADACADAAIAFAAIAGgCIAEgFIADgFIAAgGQgBgEgCgCQgBgDgDgBIgGgDIgDAAIgCAAg");
	this.shape_5.setTransform(1.6,-14.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E9CB37").s().p("AgEAoQgJgBgGgFQgGgDgFgIQgEgGgCgJQgCgJACgHQACgIAEgHQAFgGAHgEQAHgEAIgCIAKgBIAKACIAIACIgIAYIgFgCIgFgBIgGAAIgFADIgFAEIgCAGIAAAFIACAGIAFAEQABACAEABQADABAEgBIAGgCIAEgDIAEgEIAQATIgHAGIgIAEQgGADgGABIgJABIgGgBgAgBgcQgGABgEADQgFADgEAFQgDAEgBAGQgCAFABAHQACAGADAFQAEAGAEACQAFAEAGAAQAFABAGgBIAGgCIAEgCIAEgCIgCgDIgDADIgEACIgGABQgGABgEgBQgGAAgEgEQgDgCgEgFQgCgDgCgHIAAgKQABgFADgEQADgEAEgDQAFgDAGgBIAEgBIAIABIABgDIgJgBg");
	this.shape_6.setTransform(-5.6821,-13.1679);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8E6F45").s().p("AgHARIAAghQAAgIAHAAQAIAAAAAIIAAAhQAAAIgIAAQgHAAAAgIg");
	this.shape_7.setTransform(23.575,-13.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8E6F45").s().p("AgEAXQgDgDAAgCIAAgiQAAgEADgCQACgCACAAQAIAAAAAIIAAAiQAAAHgIAAQgCAAgCgCg");
	this.shape_8.setTransform(-5.025,-8.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// shop_outsite
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A98B67").s().p("AjbhdIG3hNIAAEHIm3BOgAh/hNIAACLIEHgvIAAiKg");
	this.shape_9.setTransform(10.8,5.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8E6F45").s().p("AhqBUIgBkKIDXBlIAAEIg");
	this.shape_10.setTransform(-21.975,4.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#B4946D").s().p("AlHgLIG4hNIDXBkIm4BNg");
	this.shape_11.setTransform(0.025,-12.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]}).wait(1));

	// Layer_11
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F38360").s().p("AgBASIgCgEIAAgcQAAgEADAAQAEAAAAAEIAAAdIAAAEIgDAAIgCgBg");
	this.shape_12.setTransform(16.5,3.495);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1));

	// Layer_12
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F38360").s().p("AgKAGQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBgEADAAIASgFQADgBACABQABABAAAAQABABAAAAQAAABAAABQAAAAAAABQAAAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAIgLADIgIACg");
	this.shape_13.setTransform(15.4139,5.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_13).wait(1));

	// Layer_13
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8E6F45").s().p("AgCAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAgBAAAAQABAAABABQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_14.setTransform(13.125,1.3);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E2E8F1").s().p("AgDAAQAAAAAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQABAAAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAQgDAAAAgCg");
	this.shape_15.setTransform(13.125,1.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#A6D0ED").s().p("AgDAEIAAgGQAAgBAAAAQABgBAAAAQABAAABAAQAAAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAAAABIAAAGQAAAAAAAAQgBABAAAAQgBAAAAAAQgBABgBAAQAAAAAAgBQgBAAgBAAQAAAAgBgBQAAAAAAAAg");
	this.shape_16.setTransform(13.125,1.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14}]}).wait(1));

	// Layer_14
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E2E8F1").s().p("AAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAAAIABAAQAAABAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAg");
	this.shape_17.setTransform(12.05,5.425);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#283E91").s().p("AANATIgXgNIgBgCIgDgVQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAIABAAIAXANIABABIADAVQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAAAAAIgBAAg");
	this.shape_18.setTransform(12.2167,5.4018);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#92C0E5").s().p("AAOATIgXgNIgBgBIgEgVIABgCIACAAIAXANIABABIADAVQAAABAAAAQgBABAAAAQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_19.setTransform(12.2938,5.306);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#A6D0ED").s().p("AgKgBIAFgEIAQAIIgHADg");
	this.shape_20.setTransform(13.65,5.6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EDF8FD").s().p("AgYAAIAUgNIAdAPIgZAMg");
	this.shape_21.setTransform(13.55,5.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#92C0E5").s().p("AAAAOIgXgNIASgOIAdAPIAAACIgUAKIgDAAIgBAAg");
	this.shape_22.setTransform(13.65,5.8625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]}).wait(1));

	// Layer_15
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#8E6F45").s().p("AAUAaIhSgvQgBAAAAAAQAAgBAAAAQgBAAAAgBQAAAAAAgBIAAgCIBWAxIArgXIAAABIgCADIgnAWIgCABIgCgBg");
	this.shape_23.setTransform(11.875,6.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E4A64B").s().p("AhAgMIArgYIBWAxIgrAYg");
	this.shape_24.setTransform(11.875,5.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23}]}).wait(1));

	// Layer_16
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#8E6F45").s().p("AgDAcIAAg3QAAgBABgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAABAAQAAABABAAQAAABAAAAQABABAAABIAAA3QAAABgBABQAAAAAAABQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQgBgBAAgBg");
	this.shape_25.setTransform(17.4,9.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(1));

	// Layer_17
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#8E6F45").s().p("AgDAdIAAg4QABgBAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQABAAABABQAAAAABAAQAAABAAAAQABABAAABIAAA4QAAAAgBABQAAAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBgBAAg");
	this.shape_26.setTransform(14.15,11.15);

	this.timeline.addTween(cjs.Tween.get(this.shape_26).wait(1));

	// Layer_18
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#8E6F45").s().p("AgCAcIAAg3QAAgBAAgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAABAAQAAABABAAQAAABAAAAQABABAAABIAAA3QAAABgBABQAAAAAAABQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAgBg");
	this.shape_27.setTransform(9.55,5.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_27).wait(1));

	// Layer_19
	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#8E6F45").s().p("AgCAcIAAg3QAAgBAAgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAABAAQAAABABAAQAAABAAAAQABABAAABIAAA3QAAABgBABQAAAAAAABQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAgBg");
	this.shape_28.setTransform(6.3,7.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_28).wait(1));

	// Layer_20
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#4A6AAF").s().p("AgFAFIgCgBQgCgDACgCQADgEAEAAQADgBADADQADADgCACIABAAQgDAEgFAAIgFgBg");
	this.shape_29.setTransform(14.85,-0.2891);

	this.timeline.addTween(cjs.Tween.get(this.shape_29).wait(1));

	// Layer_21
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#F38360").s().p("AgDAIQgBgCgCgEIAAgCQgBgHABgBQAFgCADAEQAEAEACADIAAABQAAAEgDACIgDACQgDAAgCgCg");
	this.shape_30.setTransform(15,0.2417);

	this.timeline.addTween(cjs.Tween.get(this.shape_30).wait(1));

	// _Group__2
	this.instance_2 = new lib.Group_2();
	this.instance_2.setTransform(15.4,0.95,1,1,0,0,0,0.3,0.5);
	this.instance_2.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_23
	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#F38360").s().p("AAAADIgBgCIABgBIAAAAQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQAAABABAAQAAAAAAABQAAAAAAAAIgBACIgBABIAAAAg");
	this.shape_31.setTransform(15.9,0.2563);

	this.timeline.addTween(cjs.Tween.get(this.shape_31).wait(1));

	// Layer_25
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#F38360").s().p("AgCAHQgBgBAAgFIABgCIAAgFIAGAAIAAAHIAAADQgEADgBAAIgBAAg");
	this.shape_32.setTransform(15.4375,1.1938);

	this.timeline.addTween(cjs.Tween.get(this.shape_32).wait(1));

	// Layer_27
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#4A6AAF").s().p("AAKAYQgDgBgBgFQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAgBIACgEQgBgFgGgDIgKgCIgEgCQgEgEgBgGQgBgHAHgCQAHgEAFAGIAFAJIAIAKQAGAFgDAHIgDAGIACAEQAAAAAAABQgBAAAAABQAAAAAAAAQgBABAAAAIgCABIgCgBg");
	this.shape_33.setTransform(15.9824,1.2855);

	this.timeline.addTween(cjs.Tween.get(this.shape_33).wait(1));

	// Layer_29
	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#F38360").s().p("AgCACQgCgCADgBQABgBAAgBQAAAAABAAQABAAAAAAQABABAAABQACABgDACIgCACIgCgCg");
	this.shape_34.setTransform(12.8864,1.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_34).wait(1));

	// Layer_30
	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F38360").s().p("AgEAFIgCgDIABgDIABgDIABAAIAGADIABAAIADABIgFADIgCACIgCAAIgCAAg");
	this.shape_35.setTransform(15.45,1.545);

	this.timeline.addTween(cjs.Tween.get(this.shape_35).wait(1));

	// Layer_32
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#E2E8F1").s().p("AgFAKIgHgCIgBgBQgBgEACgCIADgEIAAgDQAAgGAFABIABABIAIADIACABIAEABQAEABgBAEIgCAEIgCADQgCADgDACIgDAAQgCAAgFgCg");
	this.shape_36.setTransform(15.3661,2.1429);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#CFD7E8").s().p("AgHAQQgBgBgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAIgCgMQgBgDACgCIADgFIAAgDQAAgGAFABIABABIAIADIACABIAEABQAEABgBAEIgCAFIgCAPQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAgBABQgCABgEAAQgDAAgGgCg");
	this.shape_37.setTransform(15.3661,2.7444);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36}]}).wait(1));

	// Layer_33
	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#4672B5").s().p("AgDAVIgVgPIASgOIAKgNIAVAFIgCARQgDAIgHAEIgNAIIgBABIgCgBg");
	this.shape_38.setTransform(13.875,5.87);

	this.timeline.addTween(cjs.Tween.get(this.shape_38).wait(1));

	// Layer_34
	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F38360").s().p("AgDACIAAgDIAAgBIADgBIADAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBAAIAAACIAAACIgCABQgDAAgBgDg");
	this.shape_39.setTransform(14.3071,6.0917);

	this.timeline.addTween(cjs.Tween.get(this.shape_39).wait(1));

	// Layer_35
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#F38360").s().p("AgDAGIAAgCIACgJQABAAAAgBQAAAAAAAAQAAAAABABQAAAAABABIABADIAAABQgBADgCACIgBACIgCgBg");
	this.shape_40.setTransform(12.55,11.9418);

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(1));

	// Layer_36
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#283E91").s().p("AgDAIIgBAAIABgFIACgGQABgEABAAQAFgBgBAGIAAACIgEAFIgBACIgDABg");
	this.shape_41.setTransform(12.475,12.3183);

	this.timeline.addTween(cjs.Tween.get(this.shape_41).wait(1));

	// Layer_37
	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F38360").s().p("AgEAWIgBgjQABgGAEgDQADgBADAEIgBAGIgEAkQAAAAgBAAQAAAAAAAAQAAAAgBAAQgBABgBAAg");
	this.shape_42.setTransform(12.7563,9.5972);

	this.timeline.addTween(cjs.Tween.get(this.shape_42).wait(1));

	// Layer_38
	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F38360").s().p("AgRAMQgBgEACgBIAQgJIAEgEIAFgJIAJAEIgFAKQgCAEgGADIgQAJIAAABIgBAAQgFAAAAgEg");
	this.shape_43.setTransform(14.37,6.5525);

	this.timeline.addTween(cjs.Tween.get(this.shape_43).wait(1));

	// Layer_39
	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#F38360").s().p("AgQANQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBIABgCIAUgKIAGgKIAIAFIgGAKIgCACIgSAKIgEAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_44.setTransform(13.075,5.7944);

	this.timeline.addTween(cjs.Tween.get(this.shape_44).wait(1));

	// Layer_40
	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F38360").s().p("AgMgGQgCgCAAgEQABgEADgBIADABIAFAGIARAXIgEAFg");
	this.shape_45.setTransform(12.5,8.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_45).wait(1));

	// Layer_41
	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#F38360").s().p("AgDAGIAAgBIABgHIABgCQABgBAAAAQAAAAAAAAQABAAABAAQAAABABABIABADIAAAAQgBADgDADIgCAAIgBAAg");
	this.shape_46.setTransform(13.8,10.035);

	this.timeline.addTween(cjs.Tween.get(this.shape_46).wait(1));

	// Layer_42
	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#283E91").s().p("AgEAIIAAgFIADgGQAAgBAAgBQABgBAAAAQAAgBAAAAQAAAAAAAAQAFgBAAAGIgBACIgCADIgCAEIgDABg");
	this.shape_47.setTransform(13.775,10.4729);

	this.timeline.addTween(cjs.Tween.get(this.shape_47).wait(1));

	// Layer_43
	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#A6D0ED").s().p("AgGANIgPgIQAAgBgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAABgBQAAAAABAAIANgIQAKgHALAFIAGAEQAEACAAAEQAAADgFACIgNAIQgEACgCAAQgDAAgDgBg");
	this.shape_48.setTransform(14.425,7.048);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#4672B5").s().p("AgGANIgPgIQAAgBgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIAAgDIAHgCIAJgFQAEgDAGgBQAGAAAFACIAHAEIADABIAAAEQgBAEgEACIgNAIQgDACgDAAIgGgBg");
	this.shape_49.setTransform(14.425,7.4851);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#A6D0ED").s().p("AAFAbIgOgKQgHgEACgIIADgWQABgGADgDQAEgCADACIAHAFQAEACADAHQACAGgBAGIgDAWQgBAGgDAAIgDgBg");
	this.shape_50.setTransform(16.4752,3.1135);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#4672B5").s().p("AADAZIgMgIQgHgEACgJIADgWIABgFIAAgCIAEgCIABAAQADgBACACIAHAEQAEADADAGQACAGgBAGIgDAWQgBAEgCACIAAAAIgFACg");
	this.shape_51.setTransform(16.9252,2.9929);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#283E91").s().p("AgCAJQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQAAgBABAAQAAAAAAAAIACAAIABgBIAAgKQAAAAAAgBQABAAAAAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAIAAAKQAAABAAAAQAAABgBAAQAAABgBAAQAAABgBAAIgDABg");
	this.shape_52.setTransform(16.1107,5.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#92C0E5").s().p("AgCANIAAgYQAAgBABAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQABAAAAABIAAAYQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAg");
	this.shape_53.setTransform(14.8,8.7);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#F0F6FC").s().p("AgDAAQAAgCADAAQAEAAAAACQAAABAAAAQAAABgBAAQAAAAgBABQgBAAgBAAQgDAAAAgDg");
	this.shape_54.setTransform(14.775,10.175);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#92C0E5").s().p("AgFABIACgDQAAAAABgBQAAAAABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAIACADQAAAEgGAAQgFAAAAgEg");
	this.shape_55.setTransform(14.775,10.375);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#F0F6FC").s().p("AALAKIgLgGIgKAGQgDACgEgCQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAIALgHIgLgFQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIABgCQAEgCADACIAKAGIALgGQAEgCADACIABACQAAAAAAAAQAAABAAAAQAAAAgBAAQAAABAAAAIgLAFIALAHQABAAAAABQABAAAAABQAAAAgBAAQAAABgBAAIgDABIgEgBg");
	this.shape_56.setTransform(14.775,10.475);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#F0F6FC").s().p("AALAKIgLgGIgKAGQgDACgEgCQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAIALgHIgLgFQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAIABgCQAEgCADACIAKAGIALgGQAEgCADACIABACQAAAAAAAAQAAABAAAAQAAAAgBAAQAAABAAAAIgLAFIALAHQABAAAAABQABAAAAABQAAAAgBAAQAAABgBAAIgDABIgEgBg");
	this.shape_57.setTransform(14.775,10.475);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#A6D0ED").s().p("AAAADQgCgCAAgBQAAgBAAgBQABAAAAgBQAAAAABAAQAAABAAAAQADACAAACQAAAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgCgBg");
	this.shape_58.setTransform(16.175,10.0886);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#A6D0ED").s().p("AAAADQgCgCAAgBQAAgBAAgBQABAAAAgBQAAAAABAAQAAABAAAAQADACAAACQAAAAAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgCgBg");
	this.shape_59.setTransform(16.175,10.0886);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#4A66AC").s().p("AgCgBIACgCIACADIABACIgDACg");
	this.shape_60.setTransform(16.3,10.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#4A66AC").s().p("AAAADQAAgBAAAAQgBAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQABABAAAAQAAABgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_61.setTransform(16.4,9.975);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#4A66AC").s().p("AAAADQAAgBAAAAQgBAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQABABAAAAQAAABgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_62.setTransform(16.4,9.975);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#A6D0ED").s().p("AAAADQgBgBgBgCQAAgBABgBQAAAAAAAAQAAAAABAAQAAAAAAAAQADACAAACQAAAAgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_63.setTransform(13.25,11.7893);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#A6D0ED").s().p("AAAADQgBgBgBgCQAAgBABgBQAAAAAAAAQAAAAABAAQAAAAAAAAQADACAAACQAAAAgBAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_64.setTransform(13.25,11.7893);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#4A66AC").s().p("AgCgCIACAAIADACIAAADIgCABg");
	this.shape_65.setTransform(13.35,11.75);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#4A66AC").s().p("AAAADQAAgBAAAAQgBAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQABAAAAABQAAABgBAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_66.setTransform(13.45,11.675);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#4A66AC").s().p("AAAADQAAgBAAAAQgBAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQABAAAAABQAAABgBAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_67.setTransform(13.45,11.675);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#A6D0ED").s().p("AAAADQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_68.setTransform(13.1,10.025);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#A6D0ED").s().p("AAAADQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAAAQAAAAAAABQAAABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_69.setTransform(13.1,10.025);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#4A66AC").s().p("AgCgCIACgBIACADIABACIgCACg");
	this.shape_70.setTransform(13.2,9.975);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#4A66AC").s().p("AAAADQgBgCAAgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQADABgBACQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_71.setTransform(13.3,9.9107);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#4A66AC").s().p("AAAADQgBgCAAgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQADABgBACQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_72.setTransform(13.3,9.9107);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#A6D0ED").s().p("AAAADQgCgBABgDQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQACABAAACQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_73.setTransform(16.1,11.7107);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#A6D0ED").s().p("AAAADQgCgBABgDQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQACABAAACQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_74.setTransform(16.1,11.7107);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#4A66AC").s().p("AgCgCIACgBIACADIABACIgDACg");
	this.shape_75.setTransform(16.25,11.675);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#4A66AC").s().p("AAAADQgBgCAAgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQADACgBABQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_76.setTransform(16.35,11.6107);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#4A66AC").s().p("AAAADQgBgCAAgCQAAAAAAgBQAAAAAAAAQAAAAABAAQAAAAAAAAQADACgBABQAAABAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAIgBAAg");
	this.shape_77.setTransform(16.35,11.6107);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48}]}).wait(1));

	// _Path_
	this.instance_3 = new lib.Path_2();
	this.instance_3.setTransform(14.9,11.2,1,1,0,0,0,2.8,1.7);
	this.instance_3.alpha = 0.2109;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_45
	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#F38360").s().p("AgEAMQgDgCABgDIAGgQQABgDAEABQADACgBADIgHAQQAAABAAAAQAAABAAAAQgBAAAAAAQgBAAAAAAIgCAAg");
	this.shape_78.setTransform(14.36,2.3264);

	this.timeline.addTween(cjs.Tween.get(this.shape_78).wait(1));

	// Layer_46
	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#F38360").s().p("AACAKIgJgQQAAAAAAgBQgBgBABAAQAAgBAAAAQABgBABAAQAAgBABAAQABAAAAAAQABAAAAABQABAAAAABIAJAQQAAAAAAABQABABgBAAQAAABAAAAQgBABgBAAIgCABQAAAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAg");
	this.shape_79.setTransform(13.325,2.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_79).wait(1));

	// Layer_47
	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#D7BAA5").s().p("AhqBTIgBkJIDXBlIAAEIg");
	this.shape_80.setTransform(21.875,-3.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_80).wait(1));

	// Layer_48
	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#CCAC94").s().p("AlHgLIG2hNIDZBkIm4BNg");
	this.shape_81.setTransform(0.025,14.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_81).wait(1));

	// Layer_49
	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#E7CDB5").s().p("AjbhdIG3hNIgBEIIm2BNgAh+hNIAACLIEGgwIAAiIg");
	this.shape_82.setTransform(-10.75,-4.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_82).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.coffee1, new cjs.Rectangle(-32.7,-22.9,65.5,45.8), null);


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
		//this.coffee1.stop();
		
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
			animatemove(_this.coffee1, 4, -1650, -800);
		});
		
		_this.done.on('click', function (e) {
			animateDone()
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

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
		{src:"images/Bitmap11.png", id:"Bitmap11"},
		{src:"images/Bitmap12.png", id:"Bitmap12"},
		{src:"images/map01.png", id:"map01"},
		{src:"images/Bitmap13.png", id:"Bitmap13"}
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