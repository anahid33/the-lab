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



(lib.L4 = function() {
	this.initialize(img.L4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.c4 = function() {
	this.initialize(img.c4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.L2 = function() {
	this.initialize(img.L2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.c1 = function() {
	this.initialize(img.c1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.c2 = function() {
	this.initialize(img.c2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.L1 = function() {
	this.initialize(img.L1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.map01 = function() {
	this.initialize(img.map01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,8000,4500);


(lib.c3 = function() {
	this.initialize(img.c3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);// helper functions:

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
	this.instance = new lib.L4();
	this.instance.setTransform(20,-3,0.0154,0.0154);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(209).to({_off:false},0).to({_off:true},75).wait(5));

	// Layer_17
	this.instance_1 = new lib.L2();
	this.instance_1.setTransform(20,-3,0.0154,0.0154);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(134).to({_off:false},0).to({_off:true},99).wait(56));

	// Layer_12
	this.instance_2 = new lib.L1();
	this.instance_2.setTransform(20,-3,0.0154,0.0154);
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
	this.shape_5.setTransform(28.2467,11.5172,0.445,0.445);

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
	this.shape_25.setTransform(23.0439,5.6516,0.3998,0.3998);

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(15).to({rotation:-14.9952,x:22.9471,y:5.615},0).wait(14).to({rotation:0,x:23.1423,y:5.6498},0).wait(260));

	// man
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#A6D0ED").s().p("AgEAyIgBgCIgDgIIgThBQgDgIAEgHQAEgHAIgCQAIgDAGAEQAGAEADAIIATBBIABABIgBACIgBABQgLAKgOAGIgCABIgBABIgBAAIgCgBg");
	this.shape_26.setTransform(21.0829,7.1197,0.3983,0.3983);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#F38360").s().p("AAAA6QgTgBgIgYIgMhJIgEgLQgCgFAFgBQAHgBAFADQAFAEABAGIAYBFIAAABIACgDQAEgHACgHIAEgoQAAgHAFgEQAFgEAGABQAHABAEAEQAEAFgBAHIgFAtQgBAJgHAMQgLAVgTAAg");
	this.shape_27.setTransform(22.2488,8.0713,0.3997,0.3997);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#92C0E5").s().p("AgNAyQAHgKABgHQAAgFgFgZQgFgXABgFIAHgPQABgFgFgQQgFgOAGgGQACgDAGgCIAIgCQAGAIAAAIIAHCZIgOAEQgFADgKABQgNgVAKgSg");
	this.shape_28.setTransform(20.7195,8.6509,0.3981,0.3981);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#A6D0ED").s().p("AgRBbIgdgRQgIgFAAgGIAEiCQAAgUASgLQAFgDAIAAIAIABQAUADAPAJIADACIAKAHIAFAEQAHAHAAAJIAGCYIgNAFQgHACgJABIgIABQgSAAgRgLg");
	this.shape_29.setTransform(19.2616,8.1516,0.3981,0.3981);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#4672B5").s().p("AAdCNQgEgBgDgCQgDgDgBgEQAJhZgFgZIgRhAIAAAAIgPgNIAGBGIgNBgQABAFgEAEQgDAEgFgBIgGgBQgIAAgBgJIAAhxIgPhaIAAgfIBXgNIATAsIALBtIgLB0QAAAEgDAEQgEADgEAAg");
	this.shape_30.setTransform(19.499,15.3166,0.3983,0.3983);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#E2E8F1").s().p("AgGAQQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAIAAgbQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAIANAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABIAAAbQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAg");
	this.shape_31.setTransform(20.7436,20.8426,0.3983,0.3983);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E2E8F1").s().p("AgGAQQgBAAAAAAQgBAAAAAAQAAgBAAAAQgBgBAAAAIABgbQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIANAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAIAAAbQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAg");
	this.shape_32.setTransform(18.2146,19.8469,0.3983,0.3983);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#4A66AC").s().p("AAFAPIgHgCIgMAAQgEAAgGgCIgFgDQgCgCAAgGQAAgGABgDQACgEADgBQABAAAAAAQAAgBABAAQABAAAAAAQABAAABAAQAIAAANAHIAWAJQAFACACACQADAEgCADQgBACgEABQgFABgGAAIgKgBg");
	this.shape_33.setTransform(21.4016,21.6618,0.3983,0.3983);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#4A66AC").s().p("AgPASQgHgBgDgFIgBgHIABgGQgBgFAJgCIANgDIANgFQAKgDAEADQAHAEgHAJQgEAEgJAFIgPAIQgGAEgDAAg");
	this.shape_34.setTransform(18.7772,20.3371,0.3983,0.3983);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#A6D0ED").s().p("AAEBKIgZgqQgFgJgCgKQgEgNAEgRIAOg0QABgFAGgDQAFgDAEABQAGABADADQADAEgBAEIgNA0QgDANADALIAEAMIAaApQACAEgCAFQgCAFgFACIgEABIgFABQgHAAgDgGg");
	this.shape_35.setTransform(17.8735,7.6667,0.3981,0.3981);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#4A66AC").s().p("AgCARQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAIAAggQAAAAAAAAQAAAAABAAQAAAAAAAAQAAgBABAAIAFAAQABAAAAABQAAAAAAAAQABAAAAAAQAAAAAAAAIAAAgQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBAAg");
	this.shape_36.setTransform(20.5156,2.3514,0.3981,0.3981);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#283E91").s().p("AgKAEIAVgJIAAACIgVAJg");
	this.shape_37.setTransform(20.9933,2.6002,0.3981,0.3981);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F38360").s().p("AgCAJQgDgCgCgFQgBgDABgEQACgDADgBQACgBAEACQACADABAEQABADgBAEQgBAEgDAAIgCABQgBAAAAgBQAAAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_38.setTransform(20.1673,3.0182,0.3981,0.3981);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#4A66AC").s().p("AgJAJIgCgYIAXAAIAAAfg");
	this.shape_39.setTransform(19.7095,3.0878,0.3981,0.3981);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#4A66AC").s().p("AAAAoIgGgHQgEgFgDAAIgKgCQgHgBgCgDIgCgFQgFgSgBgHQAAgPAKgLQAKgLAWgBQAXAAAMAKQAGAEgDAHQgBADgCACQgEADgHAEQgHADgDADQgDADgCANQgCANABABQAEAEAHABQAGAAADgDQACAJgBADQgDAGgFADIgGABQgIAAgJgHg");
	this.shape_40.setTransform(19.9639,2.5039,0.3981,0.3981);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F38360").s().p("AACAgIgRgZQgBgBAAAAQAAAAgBAAQAAAAgBAAQgBAAAAABQgBABAAAAQgBABAAAAQAAAAgBgBQAAAAAAAAQAAgDgEgBQgDgCAAgCQAAgBACgDIADgGQACgFAFgEQAGgEAHgBIAQgEIABgFIARAAIAAAxIAAACQgCAJgJAEQgFADgEAAIgIgCg");
	this.shape_41.setTransform(19.9583,2.8596,0.3981,0.3981);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#283E91").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDgAgFgFQgCACAAADQAAAJAHAAQADAAADgDQACgDAAgDQAAgDgCgCQgDgDgDAAQgDAAgCADg");
	this.shape_42.setTransform(21.1006,2.5819,0.3975,0.3975);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F38360").s().p("AgCAVQgGAAgEgCQgEgDAAgDIAGgiIAbAAIgEAiQABAJgNAAIgDgBg");
	this.shape_43.setTransform(19.3786,3.8304,0.3983,0.3983);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#283E91").s().p("AgMAJQgFgDAAgGQAAgFAFgDQAFgEAHAAQAIAAAFAEQAFADAAAFQAAAGgFADQgFAEgIAAQgHAAgFgEg");
	this.shape_44.setTransform(19.1804,4.5633,0.3983,0.3983);

	this.instance_3 = new lib.Group_20();
	this.instance_3.setTransform(20.55,21.45,0.4008,0.4008,0,0,0,6.5,3.9);
	this.instance_3.alpha = 0.1797;

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F38360").s().p("AgIANQgEgFgBgHQAAgGAEgGQADgFAGAAQAEgBAFAFQAEAFAAAHQABAGgDAGQgFAFgFAAQgFAAgEgEg");
	this.shape_45.setTransform(23.4214,6.3161,0.3997,0.3997);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#92C0E5").s().p("AgCAcIgPgKQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAIARgoIACgCIACABIAPAKQABABAAAAQAAABAAAAQABABgBAAQAAABAAAAIgRAoIgCABIAAABg");
	this.shape_46.setTransform(23.1771,4.6399,0.3997,0.3997);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#314682").s().p("AgDAfIgRgNQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIAUgrQAAgBAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAIASANQAAAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAIgTArQAAABAAABQgBAAAAABQgBAAAAAAQAAAAAAAAIgDAAg");
	this.shape_47.setTransform(23.1676,4.6422,0.3997,0.3997);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#283E91").s().p("AgHAfIgNgNQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAIASgsQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAIASANQAAAAABAAQAAAAAAABQAAAAAAAAQAAABgBAAIgTArQgBADgCAAIgCAAIgEAAg");
	this.shape_48.setTransform(23.2629,4.6399,0.3997,0.3997);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#F38360").s().p("AgJANQgFgFAAgIQAAgHAFgFQAEgFAFAAQAGAAAFAFQAEAFAAAHQAAAIgEAFQgFAFgGAAQgFAAgEgFg");
	this.shape_49.setTransform(22.5734,5.3194,0.3997,0.3997);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F38360").s().p("AgFgbIAJgQQAEgFAGgBQAGgCAGAEQAFADABAGQACAHgEAFIgKAPQgNAVgIAMQgOARgQALg");
	this.shape_50.setTransform(21.6215,7.2873,0.3997,0.3997);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAAAMIgGgFIgBgBIAHgQIAAgBIABABIAGAEIABACIgHAPIgBABg");
	this.shape_51.setTransform(23.2833,4.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50,p:{scaleX:0.3997,scaleY:0.3997,x:21.6215,y:7.2873}},{t:this.shape_49,p:{scaleX:0.3997,scaleY:0.3997,x:22.5734,y:5.3194}},{t:this.shape_48,p:{scaleX:0.3997,scaleY:0.3997,x:23.2629,y:4.6399}},{t:this.shape_47,p:{scaleX:0.3997,scaleY:0.3997,x:23.1676,y:4.6422}},{t:this.shape_46},{t:this.shape_45,p:{scaleX:0.3997,scaleY:0.3997,x:23.4214,y:6.3161}},{t:this.instance_3},{t:this.shape_44,p:{scaleX:0.3983,scaleY:0.3983,x:19.1804,y:4.5633}},{t:this.shape_43,p:{scaleX:0.3983,scaleY:0.3983,x:19.3786,y:3.8304}},{t:this.shape_42,p:{scaleX:0.3975,scaleY:0.3975,x:21.1006,y:2.5819}},{t:this.shape_41,p:{scaleX:0.3981,scaleY:0.3981,x:19.9583,y:2.8596}},{t:this.shape_40,p:{scaleX:0.3981,scaleY:0.3981,x:19.9639,y:2.5039}},{t:this.shape_39,p:{scaleX:0.3981,scaleY:0.3981,x:19.7095,y:3.0878}},{t:this.shape_38,p:{scaleX:0.3981,scaleY:0.3981,x:20.1673,y:3.0182}},{t:this.shape_37,p:{scaleX:0.3981,scaleY:0.3981,x:20.9933,y:2.6002}},{t:this.shape_36,p:{scaleX:0.3981,scaleY:0.3981,x:20.5156,y:2.3514}},{t:this.shape_35,p:{scaleX:0.3981,scaleY:0.3981,x:17.8735,y:7.6667}},{t:this.shape_34,p:{scaleX:0.3983,scaleY:0.3983,x:18.7772,y:20.3371}},{t:this.shape_33,p:{scaleX:0.3983,scaleY:0.3983,x:21.4016,y:21.6618}},{t:this.shape_32,p:{scaleX:0.3983,scaleY:0.3983,x:18.2146,y:19.8469}},{t:this.shape_31,p:{scaleX:0.3983,scaleY:0.3983,x:20.7436,y:20.8426}},{t:this.shape_30,p:{scaleX:0.3983,scaleY:0.3983,x:19.499,y:15.3166}},{t:this.shape_29,p:{scaleX:0.3981,scaleY:0.3981,x:19.2616,y:8.1516}},{t:this.shape_28,p:{scaleX:0.3981,scaleY:0.3981,x:20.7195,y:8.6509}},{t:this.shape_27,p:{scaleX:0.3997,scaleY:0.3997,x:22.2488,y:8.0713}},{t:this.shape_26,p:{scaleX:0.3983,scaleY:0.3983,x:21.0829,y:7.1197}}]}).to({state:[{t:this.shape_50,p:{scaleX:0.4005,scaleY:0.4005,x:21.6933,y:7.3752}},{t:this.shape_49,p:{scaleX:0.4005,scaleY:0.4005,x:22.6469,y:5.4038}},{t:this.shape_48,p:{scaleX:0.4005,scaleY:0.4005,x:23.3377,y:4.723}},{t:this.shape_47,p:{scaleX:0.4005,scaleY:0.4005,x:23.2422,y:4.7253}},{t:this.shape_51},{t:this.shape_45,p:{scaleX:0.4005,scaleY:0.4005,x:23.4964,y:6.4022}},{t:this.instance_3},{t:this.shape_44,p:{scaleX:0.4,scaleY:0.4,x:19.338,y:4.7576}},{t:this.shape_43,p:{scaleX:0.4,scaleY:0.4,x:19.537,y:4.0215}},{t:this.shape_42,p:{scaleX:0.3997,scaleY:0.3997,x:21.3142,y:2.8211}},{t:this.shape_41,p:{scaleX:0.3999,scaleY:0.3999,x:20.1308,y:3.0599}},{t:this.shape_40,p:{scaleX:0.3999,scaleY:0.3999,x:20.1364,y:2.7026}},{t:this.shape_39,p:{scaleX:0.3999,scaleY:0.3999,x:19.8809,y:3.2893}},{t:this.shape_38,p:{scaleX:0.3999,scaleY:0.3999,x:20.3407,y:3.2193}},{t:this.shape_37,p:{scaleX:0.3999,scaleY:0.3999,x:21.1705,y:2.7994}},{t:this.shape_36,p:{scaleX:0.3999,scaleY:0.3999,x:20.6907,y:2.5494}},{t:this.shape_35,p:{scaleX:0.3999,scaleY:0.3999,x:18.0364,y:7.8892}},{t:this.shape_34,p:{scaleX:0.4,scaleY:0.4,x:18.9331,y:20.599}},{t:this.shape_33,p:{scaleX:0.4,scaleY:0.4,x:21.5687,y:21.9294}},{t:this.shape_32,p:{scaleX:0.4,scaleY:0.4,x:18.3681,y:20.1068}},{t:this.shape_31,p:{scaleX:0.4,scaleY:0.4,x:20.9079,y:21.1067}},{t:this.shape_30,p:{scaleX:0.4,scaleY:0.4,x:19.658,y:15.557}},{t:this.shape_29,p:{scaleX:0.3999,scaleY:0.3999,x:19.431,y:8.3763}},{t:this.shape_28,p:{scaleX:0.3999,scaleY:0.3999,x:20.8955,y:8.8779}},{t:this.shape_27,p:{scaleX:0.4005,scaleY:0.4005,x:22.3217,y:8.1607}},{t:this.shape_26,p:{scaleX:0.4,scaleY:0.4,x:21.2487,y:7.3249}}]},29).wait(260));

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
	this.instance = new lib.c4();
	this.instance.setTransform(1,-10,0.0154,0.0154);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(344).to({_off:false},0).to({_off:true},75).wait(6));

	// iphone_3
	this.instance_1 = new lib.c3();
	this.instance_1.setTransform(1,-10,0.0154,0.0154);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(269).to({_off:false},0).to({_off:true},149).wait(7));

	// iphone_2
	this.instance_2 = new lib.c2();
	this.instance_2.setTransform(1,-10,0.0154,0.0154);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(194).to({_off:false},0).to({_off:true},224).wait(7));

	// iphone_1
	this.instance_3 = new lib.c1();
	this.instance_3.setTransform(1,-10,0.0154,0.0154);
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

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(60).to({scaleX:0.9923,scaleY:0.9923,rotation:29.9988,x:15.9139,y:5.1324},0).wait(296).to({scaleX:1,scaleY:1,rotation:0,x:16.1139,y:6.075},0).wait(69));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:2.25}},{t:this.shape_20,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:1.925}},{t:this.shape_19,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:1.9}}]}).to({state:[{t:this.shape_21,p:{scaleX:0.9906,scaleY:0.9906,rotation:104.9985,x:13.0506,y:2.8}},{t:this.shape_20,p:{scaleX:0.9906,scaleY:0.9906,rotation:104.9984,x:13.6593,y:2.9857}},{t:this.shape_19,p:{scaleX:0.9909,scaleY:0.9909,rotation:104.998,x:13.6242,y:3.1525}}]},60).to({state:[{t:this.shape_21,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:2.25}},{t:this.shape_20,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:1.925}},{t:this.shape_19,p:{scaleX:1,scaleY:1,rotation:0,x:13.825,y:1.9}}]},296).wait(69));

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

	this.timeline.addTween(cjs.Tween.get(this.shape_90).wait(60).to({scaleX:0.9899,scaleY:0.9899,rotation:-45,x:13.6162,y:3.6129},0).wait(296).to({scaleX:1,scaleY:1,rotation:0,x:14.025,y:3.15},0).wait(69));

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


// stage content:
(lib._09map = function(mode,startPosition,loop) {
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
		
		_this.coffee1.on('click', function (e) {
			if ( target1 == _this.coffee1 ){
				animateDone()
				return;
			}
			animatemove(_this.coffee1, 14, -17800, -9000);
		});
		
		/*
		_this.skyscraper.on('click', function (e) {
			if ( target1 == _this.skyscraper ){
				animateDone()
				return;
			}
			animatemove(_this.skyscraper, 14, -6900, -3500);
		});
		*/
		
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
			animatemove(_this.lock, 12, -11200, -10950);
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
	this.lock.setTransform(950.45,925.9,2.572,2.572);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("AsDBlIAAjJIYHAAIAADJ");
	this.shape.setTransform(346.025,821.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.004)").s().p("AsDBmIAAjLIYHAAIAADLg");
	this.shape_1.setTransform(346.025,821.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.lock}]}).wait(1));

	// coffee1
	this.coffee1 = new lib.coffee1();
	this.coffee1.name = "coffee1";
	this.coffee1.setTransform(1310.4,667.05,2.572,2.572);

	this.timeline.addTween(cjs.Tween.get(this.coffee1).wait(1));

	// scene
	this.instance = new lib.map01();
	this.instance.setTransform(0,0,0.24,0.24);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(960,540,960.0999999999999,540);
// library properties:
lib.properties = {
	id: 'E22D5EA26317416D8D80A4DEC59F1E11',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/L4.png", id:"L4"},
		{src:"images/c4.png", id:"c4"},
		{src:"images/L2.png", id:"L2"},
		{src:"images/c1.png", id:"c1"},
		{src:"images/c2.png", id:"c2"},
		{src:"images/L1.png", id:"L1"},
		{src:"images/map01.png", id:"map01"},
		{src:"images/c3.png", id:"c3"}
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