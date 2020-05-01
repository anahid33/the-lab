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



(lib.A33x = function() {
	this.initialize(img.A33x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1455,2133);


(lib.a5 = function() {
	this.initialize(img.a5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1501,2180);


(lib.Image = function() {
	this.initialize(img.Image);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4717,2949);


(lib.a0 = function() {
	this.initialize(img.a0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1077,123);


(lib.map01 = function() {
	this.initialize(img.map01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,8000,4500);


(lib.A73x = function() {
	this.initialize(img.A73x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1455,2133);


(lib.Image_0 = function() {
	this.initialize(img.Image_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,468,1046);


(lib.Image_1 = function() {
	this.initialize(img.Image_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,113,193);


(lib.A63x = function() {
	this.initialize(img.A63x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1455,2133);


(lib.A13x = function() {
	this.initialize(img.A13x);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1455,2133);


(lib.a2 = function() {
	this.initialize(img.a2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1501,2180);


(lib.a4 = function() {
	this.initialize(img.a4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1501,2180);


(lib.Image_2 = function() {
	this.initialize(img.Image_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4717,2949);// helper functions:

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


(lib.Tween55 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#92CF9F").s().p("Eh0NBPqMAAAifTMDobAAAMAAACfTg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-743.7,-509.8,1487.5,1019.7);


(lib.Tween54 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9E9E9").s().p("Eh0NBPtMAAAifaMDobAAAMAAACfag");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-743.7,-510.1,1487.5,1020.3);


(lib.Tween36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgnFVIi0h7QgMgIgEgOQgEgOAGgNIDYntQAHgRASgFQATgFAPALICyB+QAMAIAEAOQADAOgFANIjXHpQgHARgSAGIgLABQgMAAgKgHg");
	this.shape.setTransform(-0.0317,-0.0413,0.9058,0.9058);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.5,-31.6,43,63.2);


(lib.Tween34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1B1516").s().p("AhWBqQgmgmAAhEQAAgpARghQARghAegSQAegTAlAAQA3AAAgAlQAfAkAAA/IAAAQIjKAAQACAxAYAZQAYAZArAAQAwAAApgiIAQAiQgTARgcAKQgdAKgeAAQhAAAglgmgABVgUQgCgqgUgXQgUgWgkgBQgjAAgWAYQgWAWgEAqIChAAIAAAAg");
	this.shape.setTransform(129.125,4.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1516").s().p("AhOCPIAAkWIAtAAIAAAxQAXgxBEgGIARgBIAEApIgfACQgqAEgTAXQgTAXAAAiIAACeg");
	this.shape_1.setTransform(106.075,4.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1B1516").s().p("AhFB/QgdgSgRggQgQgiAAgrQAAgqAQghQARghAdgSQAfgRAmgBQAnABAfARQAeASAQAhQAQAhAAAqQAAArgQAiQgQAggeASQgfARgnAAQgmAAgfgRgAg+hNQgWAbAAAyQAAA0AWAbQAWAbAoAAQApAAAWgbQAWgbAAg0QAAgygWgbQgWgcgpAAQgoAAgWAcg");
	this.shape_2.setTransform(78.075,4.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1516").s().p("ACUDJIAAk2IiDD2IggAAIiDj0IAAE0IgrAAIAAmRIAnAAICXEjICXkjIAmAAIAAGRg");
	this.shape_3.setTransform(38.225,-1.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1B1516").s().p("ABKCPIAAirQAAgogPgRQgQgRghAAQglgBgXAXQgXAYAAAoIAACfIguAAIAAkWIAuAAIAAAuQAOgZAYgOQAZgOAeAAQBkAAAABuIAACvg");
	this.shape_4.setTransform(-16.575,4.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1B1516").s().p("AhOCPIAAkWIAtAAIAAAxQAXgxBEgGIARgBIAEApIgfACQgqAEgTAXQgTAXAAAiIAACeg");
	this.shape_5.setTransform(-40.825,4.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1B1516").s().p("AhACFQgXgKgMgTQgOgUAAgXQAAgfAQgSQAQgRAlgHQAkgIBAAAIANAAIAAgTQAAgjgOgQQgPgPgfAAQgwAAgvAeIgQgiQAXgQAdgJQAggKAbAAQA1AAAaAbQAaAcAAA3IAACvIgtAAIAAgwQgLAYgWAOQgXANgcAAQgaAAgXgLgAgRANQgaAFgLAJQgMAKAAAUQAAAWAQAPQARAOAZAAQAgAAAXgXQAWgYAAgkIAAgRIgLAAQgxABgaAEg");
	this.shape_6.setTransform(-68.55,4.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1B1516").s().p("AhWBqQgmgmAAhEQAAgpARghQARghAegSQAegTAlAAQA3AAAgAlQAfAkAAA/IAAAQIjKAAQACAxAYAZQAYAZArAAQAwAAApgiIAQAiQgTARgcAKQgdAKgeAAQhAAAglgmgABVgUQgCgqgUgXQgUgWgkgBQgjAAgWAYQgWAWgEAqIChAAIAAAAg");
	this.shape_7.setTransform(-98.225,4.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1B1516").s().p("Ah7DJIAAmRIAvAAIAAFpIDIAAIAAAog");
	this.shape_8.setTransform(-126.725,-1.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-146.2,-40.9,292.4,81.9);


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgjDUIAAhIIBHAAIAABIgAgSBdIgTkvIBKAAIgTEvg");
	this.shape.setTransform(496.5,70.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgSQgPgRgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkjIA7AAIAAAuQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_1.setTransform(472.175,76.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_2.setTransform(447.625,70.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhDDEQgigKgagSIASgsQAdASAbAJQAaAIAegBQBSAAAAhTIAAguQgMAbgaAPQgaAOghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgsARggQARgiAegSQAdgSAnAAQAgAAAaAPQAZAOAOAaIAAgvIA8AAIAAEMQAABDgkAiQgkAihFAAQglAAgigKgAg8iDQgWAaAAAuQAAAuAXAYQAWAaAmAAQAnAAAXgaQAWgYAAguQAAgtgWgbQgWgagoAAQgmAAgXAag");
	this.shape_3.setTransform(421.625,82.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhLCGQghgTgRgiQgSgjAAgtQAAguASgiQARgjAhgSQAhgTArAAQAqAAAhATQAhASASAjQARAiAAAuQAAAtgRAjQgSAighATQghASgqAAQgrAAghgSgAg8hMQgVAbAAAyQAAAzAVAZQAVAbAoAAQAnAAAWgbQAVgZAAgzQAAgygVgbQgWgbgnAAQgoAAgVAbg");
	this.shape_4.setTransform(387.75,76.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgdDUIAAmmIA7AAIAAGmg");
	this.shape_5.setTransform(363.575,70.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACLQAABAA7AAIAbgCIgDAuIgfACQg5ABgbgcg");
	this.shape_6.setTransform(329.95,72.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgQgLgIQgKgKgagFIgwgLQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvAAQgaAAgQALQgQALAAATQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_7.setTransform(304.875,76.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhYCWIAAkjIA7AAIAAAyQAXgzBHgGIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_8.setTransform(281.675,76.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_9.setTransform(261.325,70.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgxDVIAAj2Ig4AAIAAguIA4AAIAAgFQAAg+AggeQAdgfBAgDIAbgBIAEAuIgcABQgkACgQARQgQAQAAAjIAAAPIBRAAIAAAuIhRAAIAAD2g");
	this.shape_10.setTransform(244.55,70.35);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("ACcCWIAAizQAAgkgMgSQgNgRgdAAQghAAgTAXQgUAXAAAoIAACkIg7AAIAAizQAAgkgNgSQgOgRgcAAQghAAgTAXQgUAXAAAoIAACkIg8AAIAAkjIA7AAIAAAsQAOgZAXgOQAYgNAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_11.setTransform(191.975,76.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhLCGQgggTgSgiQgSgjAAgtQAAguASgiQASgjAggSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAuQAAAtgRAjQgTAiggATQghASgqAAQgrAAghgSgAg8hMQgVAbAAAyQAAAzAVAZQAVAbAoAAQAoAAAVgbQAVgZAAgzQAAgygVgbQgWgbgnAAQgnAAgWAbg");
	this.shape_12.setTransform(149.15,76.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AhYCWIAAkjIA7AAIAAAyQAXgzBHgGIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_13.setTransform(123.425,76.6);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgxDVIAAj2Ig4AAIAAguIA4AAIAAgFQABg+AegeQAfgfA/gDIAbgBIADAuIgbABQgkACgQARQgPAQAAAjIAAAPIBQAAIAAAuIhQAAIAAD2g");
	this.shape_14.setTransform(100.8,70.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AA9DUIiJiLIAACLIg9AAIAAmmIA9AAIAAEFIB/iDIBLAAIiJCMICVCYg");
	this.shape_15.setTransform(61,70.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhYCWIAAkjIA7AAIAAAyQAXgzBHgGIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_16.setTransform(34.175,76.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhLCGQghgTgRgiQgSgjAAgtQAAguASgiQARgjAhgSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAuQAAAtgRAjQgTAiggATQghASgqAAQgrAAghgSgAg8hMQgVAbgBAyQABAzAVAZQAVAbAoAAQAoAAAUgbQAWgZAAgzQAAgygWgbQgVgbgnAAQgnAAgWAbg");
	this.shape_17.setTransform(4.15,76.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("ABNCSIhNjQIhNDQIg2AAIhwkjIA+AAIBQDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_18.setTransform(-38.15,76.975);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AhLCGQghgTgRgiQgSgjAAgtQAAguASgiQARgjAhgSQAhgTArAAQArAAAgATQAgASATAjQARAiAAAuQAAAtgRAjQgTAiggATQggASgrAAQgrAAghgSgAg8hMQgVAbgBAyQABAzAVAZQAVAbAoAAQAoAAAUgbQAWgZAAgzQAAgygWgbQgVgbgnAAQgnAAgWAbg");
	this.shape_19.setTransform(-96.3,76.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACLQAABAA7AAIAbgCIgDAuIgfACQg5ABgbgcg");
	this.shape_20.setTransform(-123.8,72.75);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhRDIIAzh0Ih7kbIA/AAIBbDfIBcjfIA9AAIiuGPg");
	this.shape_21.setTransform(-165.7,82.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgjAdgSQAegSAmgBQAgAAAZAOQAZAPANAZIAAiwIA9AAIAAGmIg9AAIAAgzQgNAbgZAOQgZAOgggBQgmABgdgUgAg7gOQgWAaAAAwQAAAyAWAcQAWAcAmAAQAoAAAVgbQAWgbgBgyQABgygWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_22.setTransform(-199.95,70.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhICMQgYgLgOgVQgNgVAAgaQAAggAQgSQARgSAmgHQAmgIBBAAIAPAAIAAgSQAAghgPgPQgOgPgfAAQgyAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgwQgMAZgWANQgWAOgeAAQgcAAgYgMgAgRAQQgZADgLAKQgKAKgBATQAAAVAQAOQAPAPAYAAQAhAAAUgYQAWgWAAgjIAAgQIgMAAQguAAgZAFg");
	this.shape_23.setTransform(-233.3,76.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiABQgigBgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_24.setTransform(-264.725,76.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AhYCWIAAkjIA7AAIAAAyQAXgzBHgGIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_25.setTransform(-289.425,76.6);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgQgLgIQgKgKgagFIgwgLQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvAAQgaAAgQALQgQALAAATQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_26.setTransform(-332.875,76.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACLQAABAA7AAIAbgCIgDAuIgfACQg5ABgbgcg");
	this.shape_27.setTransform(-357.85,72.75);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_28.setTransform(-375.625,70.425);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgjAdgSQAegSAmgBQAgAAAZAOQAZAPANAZIAAiwIA9AAIAAGmIg9AAIAAgzQgNAbgZAOQgZAOgggBQgmABgdgUgAg7gOQgWAaAAAwQAAAyAWAcQAWAcAmAAQAoAAAVgbQAWgbgBgyQABgygWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_29.setTransform(-417.3,70.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgSQgPgRgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkjIA7AAIAAAuQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_30.setTransform(-451.375,76.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_31.setTransform(-475.925,70.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgwDVIAAj2Ig6AAIAAguIA6AAIAAgFQAAg+AegeQAegfBAgDIAbgBIAEAuIgcABQgkACgQARQgQAQAAAjIAAAPIBQAAIAAAuIhQAAIAAD2g");
	this.shape_32.setTransform(-492.7,70.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAgtQAAgtASgjQARgjAhgSQAhgTAqAAQArAAAhATQAhASARAjQASAjAAAtQAAAtgSAiQgRAjghASQghATgrAAQgqAAghgTgAg8hMQgWAbAAAyQAAAyAWAaQAVAbAnAAQApAAAUgbQAWgaAAgyQAAgygWgbQgVgbgoAAQgmAAgWAbg");
	this.shape_33.setTransform(577.6,4.95);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACLQAABAA7AAIAbgCIgDAvIgfACQg5gBgbgbg");
	this.shape_34.setTransform(550.1,0.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhQDDQgdgUgRgiQgRgjAAgtQAAguARghQARgjAdgSQAdgTAnAAQAgABAZAOQAZAOANAZIAAixIA8AAIAAGmIg7AAIAAgyQgNAagaAOQgZAOggABQgmgBgegSgAg7gOQgWAZAAAyQAAAxAWAbQAWAdAmAAQAoAAAVgbQAVgcABgxQgBgygVgaQgVgbgoAAQgnAAgVAbg");
	this.shape_35.setTransform(505.15,-1.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggTQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgVgiAAQgiAAgUAVQgVAWgEApICZAAIAAAAg");
	this.shape_36.setTransform(472.475,4.95);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvABQgaAAgQAKQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_37.setTransform(442.075,4.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_38.setTransform(420.475,-1.425);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXgzBHgGIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_39.setTransform(404.375,4.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeATAQAiQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9iAQgVAcAAAyQAAAxAVAaQAWAbAnAAQAnABAVgcQAWgaAAgwQAAgygWgcQgWgbgmgBQgnAAgWAbg");
	this.shape_40.setTransform(374.375,10.15);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXgzBHgGIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_41.setTransform(346.975,4.75);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_42.setTransform(316.725,5.325);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvABQgaAAgQAKQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_43.setTransform(285.225,4.95);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvABQgaAAgQAKQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_44.setTransform(240.525,4.95);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_45.setTransform(218.925,-1.425);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AhQDDQgdgUgRgiQgRgjAAgtQAAguARghQARgjAdgSQAegTAmAAQAgABAZAOQAZAOANAZIAAixIA9AAIAAGmIg9AAIAAgyQgNAagZAOQgZAOggABQgmgBgegSgAg7gOQgWAZAAAyQAAAxAWAbQAWAdAmAAQAoAAAVgbQAWgcgBgxQABgygWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_46.setTransform(177.25,-1.2);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgSQgPgRgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_47.setTransform(143.175,4.75);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhICMQgYgLgOgVQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAPAAIAAgSQgBghgOgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgwQgMAZgWAOQgXANgdAAQgcAAgYgMgAgQAPQgaAFgKAKQgMAKAAASQAAAVAQAOQAQAOAXAAQAhABAUgXQAWgXAAgkIAAgPIgLAAQgvAAgYAEg");
	this.shape_48.setTransform(109.35,4.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeATAQAiQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9iAQgVAcAAAyQAAAxAVAaQAWAbAnAAQAnABAVgcQAWgaAAgwQAAgygWgcQgWgbgmgBQgnAAgWAbg");
	this.shape_49.setTransform(61.075,10.15);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAgtQAAgtASgjQASgjAggSQAhgTAqAAQArAAAhATQAgASASAjQASAjAAAtQAAAtgSAiQgSAjggASQghATgrAAQgqAAghgTgAg8hMQgWAbABAyQgBAyAWAaQAVAbAnAAQAoAAAWgbQAVgaAAgyQAAgygVgbQgWgbgoAAQgnAAgVAbg");
	this.shape_50.setTransform(25.6,4.95);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACLQAABAA7AAIAbgCIgDAvIgfACQg5gBgbgbg");
	this.shape_51.setTransform(-1.9,0.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeATAQAiQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9iAQgVAcAAAyQAAAxAVAaQAWAbAnAAQAnABAVgcQAWgaAAgwQAAgygWgcQgWgbgmgBQgnAAgWAbg");
	this.shape_52.setTransform(-29.325,10.15);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AhICMQgYgLgNgVQgOgVAAgaQAAggAQgSQAQgRAngIQAmgIBCAAIANAAIAAgSQABghgOgPQgPgPgfAAQgxAAgyAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAdAeQAcAdAAA8IAAC0Ig6AAIAAgwQgLAZgXAOQgXANgcAAQgdAAgYgMgAgRAPQgYAFgMAKQgLAKABASQAAAVAPAOQAPAOAZAAQAfABAWgXQAUgXAAgkIAAgPIgLAAQguAAgZAEg");
	this.shape_53.setTransform(-64.4,4.95);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_54.setTransform(-87.275,-1.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("ABNCSIhNjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_55.setTransform(-135.7,5.125);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggTQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgVgiAAQgiAAgUAVQgVAWgEApICZAAIAAAAg");
	this.shape_56.setTransform(-176.975,4.95);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgSQgPgRgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_57.setTransform(-210.075,4.75);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvABQgaAAgQAKQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_58.setTransform(-257.725,4.95);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_59.setTransform(-279.325,-1.425);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfAAQgjgBgWAXQgXAXAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgNQAagNAfgBQBoAAAAB1IAAC2g");
	this.shape_60.setTransform(-303.825,-1.4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvABQgaAAgQAKQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_61.setTransform(-351.475,4.95);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgSQgPgRgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_62.setTransform(-383.075,4.75);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggTQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgVgiAAQgiAAgUAVQgVAWgEApICZAAIAAAAg");
	this.shape_63.setTransform(-416.225,4.95);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeATAQAiQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9iAQgVAcAAAyQAAAxAVAaQAWAbAnAAQAnABAVgcQAWgaAAgwQAAgygWgcQgWgbgmgBQgnAAgWAbg");
	this.shape_64.setTransform(-448.975,10.15);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAgtQAAgtASgjQASgjAggSQAhgTArAAQAqAAAhATQAgASATAjQARAjAAAtQAAAtgRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hMQgVAbAAAyQAAAyAVAaQAVAbAoAAQAoAAAVgbQAVgaAAgyQAAgygVgbQgWgbgnAAQgnAAgWAbg");
	this.shape_65.setTransform(-484.45,4.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggTQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgVgiAAQgiAAgUAVQgVAWgEApICZAAIAAAAg");
	this.shape_66.setTransform(-532.975,4.95);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AB2DTIAAi9IjrAAIAAC9Ig+AAIAAmmIA+AAIAAC4IDrAAIAAi4IA9AAIAAGmg");
	this.shape_67.setTransform(-571.7,-1.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-654.1,-42.9,1308.2,157.7);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("ECWngAoIAABRMktNAAAIAAhR");
	this.shape.setTransform(-3.9,657.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("ECV/BmrMktMAAAI/UAAMAAAjNVMFtDAAAMAAADNVg");
	this.shape_1.setTransform(0.025,-4.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1168.1,-661.2,2336.3,1323.4);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4E4E4").s().p("EADGA0oMgjFgKuQhvgjg3hmQg2hmAihwMAaWhWIQAhhvBng3QBmg2BvAiMAjGAKvQBvAiA2BmQA3BngiBuMgaWBWJQgiBvhmA2Qg/AihDAAQgpAAgrgNg");
	this.shape.setTransform(36.2387,-335.9383,1.039,1.039);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F4F4F4").s().p("EAC5A27Mgj/gLAQiegxhOiSQhOiSAxifMAakhW3QAwifCThOQCShNCeAwMAj/ALAQCeAxBOCSQBOCSgxCfMgakBW4QgwCeiSBOQhbAwhfAAQg7AAg8gTg");
	this.shape_1.setTransform(36.8277,-335.5266,1.039,1.039);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F49076").s().p("EgboB1tQk5hJkCi9Qj5i2ijkHQijkHg0kwQg2k6BKk6MAr9i7QQBKk6C7kBQC2j5EHijQEIikEvg0QE7g1E5BJQE6BKECC8QD5C2CjEHQCjEHA0EwQA2E7hKE5Mgr+C7QQhJE6i8ECQi2D5kHCjQkHCjkwA0QiFAWiFAAQi1AAi1gqg");
	this.shape_2.setTransform(-47.9833,302.5917);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("Ei2/hz5MFt/AAAMAAADnzMlt/AAAg");
	this.shape_3.setTransform(0.025,-318.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1172.1,-1061.1,2344.3,2121.3);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9E9E9").s().p("Eh0NBN3MAAAibtMDobAAAMAAACbtg");
	this.shape.setTransform(0.075,2.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-743.7,-495.4,1487.6,996.5);


(lib.Symbol15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.A73x();
	this.instance.setTransform(-260.9,-382.5,0.3586,0.3586);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol15, new cjs.Rectangle(-260.9,-382.5,521.8,765), null);


(lib.Symbol14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.A13x();
	this.instance.setTransform(-260.9,-382.5,0.3586,0.3586);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol14, new cjs.Rectangle(-260.9,-382.5,521.8,765), null);


(lib.Symbol13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F69073").s().p("EgXpBMgQjbhBiuiPQioiLhojBQhpjBgYjZQgYjgBBjaMAcIhdRQAVjJBOi6QBNi0B9iZQDonVFsm9QHEopGpjMQEViFDXBGQC9A+CADVQBxC8AzEUQAuD8gRD9QgaGLhaKeQAeCNAACOQAAGKjTFLQjOFClWCnMgYxBSIQhBDbiQCuQiLCojBBoQjABpjZAYQg+AHg9AAQiiAAiegwg");
	this.shape.setTransform(231.419,494.3505);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol13, new cjs.Rectangle(0,0,462.9,988.7), null);


(lib.Symbol12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg5VgSMMBxeAAAMATfAkZMiXPAAAQEnpBElpEQJMyIgGgMg");
	this.shape.setTransform(484.025,116.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EhLnASNQEnpBElpEQJMyIgGgMMBxeAAAMATfAkZg");
	this.shape_1.setTransform(484.025,116.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol12, new cjs.Rectangle(-1,-1,970.1,235), null);


(lib.Symbol11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg5VgSMMBxeAAAMATfAkZMiXPAAAQEnpBElpEQJMyIgGgMg");
	this.shape.setTransform(484.025,116.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CFD5E0").s().p("EhLnASNQEnpBElpEQJMyIgGgMMBxeAAAMATfAkZg");
	this.shape_1.setTransform(484.025,116.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(-1,-1,970.1,235), null);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F69073").s().p("AgbDOQgRgQgBgXIgSlHQgBgYAPgQQAPgRAXgCQAWAAARAPQARAOABAXIASFJQABAWgPARQgPARgXABIgDABQgUAAgQgOg");
	this.shape.setTransform(5.7169,19.8585,0.9057,0.9057);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(0,0,11.6,39.8), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E6E8EA").s().p("AC/JBQhKgEgzg4QgIgchXiUIixkvQjwmlAug7QAOgyAqgkQAoggA1gMQA1gLAxAOQA0AQAgApIHEMvQAkBFgYBEQgVA+g8AnQg3Alg9AAIgLgBg");
	this.shape.setTransform(40.8731,57.7722);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,81.8,115.6), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FB8E71").s().p("AH/DUIwiiFQg9gHglgwQglgvAHg8QAIg8AwglQAwgmA8AIIQiCEQBLAIAkBFQAlBFgkBCQgUAogoAVQghASgkAAIgTgBg");
	this.shape.setTransform(67.6627,21.2425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,135.4,42.5), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E6E8EA").s().p("Ai/JcQgRgDgVgIQg4gVgggpQgggqgNhDIgBgEIFAtTQAlhkBSgwQBTgxBRAeQBQAeAfBcQAeBbglBjIlMN2IgHABQg3AMg0ABIgOABQgrAAgggJg");
	this.shape.setTransform(36.4391,61.2656);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FB8E71").s().p("AjhJSQg9gdggg3Qghg7AWg7IFJt6QAZhEBCgeQBCgeBEAZQBDAZAfBCQAeBCgZBEIlKN6QgiBKhDATQgVAGgVAAQgnAAgpgTg");
	this.shape_1.setTransform(37.4321,65.7246);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,72.9,127.1), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FB8E71").s().p("AAyKfQgsgJgfghQggghgHguIifwfQgJg8AkgxQAkgxA8gJQA8gJAwAkQAwAkAJA8ICfQfQAJA8gkAxQgkAxg8AJQgLABgLAAQgPAAgOgDg");
	this.shape.setTransform(22.625,67.4692);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#373040").s().p("AgQAiQgRgIgGgQQgHgPAHgOQAHgOARgEQAQgFAQAJQARAIAGAQQAHAPgHAOQgHAOgRAFIgLABQgKAAgLgGg");
	this.shape_1.setTransform(56.475,147.5861);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1D181E").s().p("ACNEAImfkMQgPgLAFgOIBRjPQAFgOAVgEQAVgDAQAKIGfEMQAQALgGANIhQDQQgGAOgVADIgMACQgOAAgLgIg");
	this.shape_2.setTransform(45.0844,139.5098);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#373040").s().p("AB1ELImGkiQgIgFgDgGQgCgHACgGIAwi6QAHgSAcgNQAhgPAdANIGeENQAHAEADAHQADAGgDAHIhQDPQgLAWgfALQgPAGgMAAQgLAAgIgGg");
	this.shape_3.setTransform(48.35,138.4046);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,77,165.9), null);


(lib.notification2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.a0();
	this.instance.setTransform(-212.3,-24.25,0.3943,0.3943);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgYAtIAAhXIAOAAIAAAPQAIgPAUgCIAGAAIABANIgKABQgNABgFAHQgGAIAAAKIAAAxg");
	this.shape.setTransform(171.075,67.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag0BAIAAh+IArAAQAdAAARAQQAQARAAAdQAAAegQARQgRARgdAAgAglAzIAbAAQAwAAAAgzQAAgygwAAIgbAAg");
	this.shape_1.setTransform(160.825,65.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_2.setTransform(144.675,67.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAXAtIAAg1QAAgNgEgFQgFgGgLABQgLgBgHAIQgHAHAAANIAAAxIgPAAIAAhXIAPAAIAAAOQAEgIAIgDQAHgFAJAAQAgAAAAAjIAAA2g");
	this.shape_3.setTransform(134.825,67.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgGA/IAAhXIANAAIAABXgAgIgtIAAgRIARAAIAAARg");
	this.shape_4.setTransform(127.625,65.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AAZAsIgZhDIgYBDIgOAAIgghXIAPAAIAZBFIAZhFIAMAAIAZBFIAZhFIAOAAIggBXg");
	this.shape_5.setTransform(117.975,67.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgVA8IAOghIglhWIAQAAIAcBHIAehHIAPAAIg0B3g");
	this.shape_6.setTransform(105.8,68.95);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgWA7QgJgGgFgKQgEgLAAgOQAAgNAEgJQAFgKAJgGQAJgGALAAQAKAAAHAFQAIAEAEAIIAAg2IAOAAIAAB+IgOAAIAAgQQgEAIgIAFQgHAEgKAAQgLAAgJgFgAgTgFQgHAIAAAPQAAAQAHAJQAIAJALAAQANAAAHgJQAHgJAAgQQAAgPgHgIQgHgJgNABQgLgBgIAJg");
	this.shape_7.setTransform(95.675,65.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAXAtIAAg1QAAgNgEgFQgFgGgLABQgLgBgHAIQgHAHAAANIAAAxIgPAAIAAhXIAPAAIAAAOQAEgIAIgDQAHgFAJAAQAgAAAAAjIAAA2g");
	this.shape_8.setTransform(85.625,67.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgTAqQgIgDgEgGQgEgHAAgGQAAgLAFgFQAFgFALgCQAMgCAUgBIADAAIAAgGQABgKgFgFQgEgGgLABQgOgBgOAKIgGgKQAIgFAJgEQAJgCAIAAQASgBAHAJQAJAJAAARIAAA3IgPAAIAAgQQgDAJgHADQgHAFgIAAQgJAAgGgEgAgFAEQgIABgEAEQgDADAAAGQAAAHAFAEQAFAFAIAAQAJAAAIgHQAGgHAAgMIAAgFIgDAAIgXABg");
	this.shape_9.setTransform(75.65,67.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgYAtIAAhXIAOAAIAAAPQAIgPAUgCIAGAAIABANIgKABQgNABgFAHQgGAIAAAKIAAAxg");
	this.shape_10.setTransform(68.475,67.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgvBAIAAh+IAzAAQATgBALAJQALAJAAAPQAAALgFAHQgGAIgKADQAMACAFAIQAGAIABAMQAAARgLAJQgLAIgVABgAggAzIAkAAQAPAAAHgFQAHgGAAgLQABgYgeAAIgkAAgAgggGIAiAAQAOAAAHgGQAIgGAAgLQAAgVgdAAIgiAAg");
	this.shape_11.setTransform(58.85,65.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgmBAIAAgLIArgxQAJgJAFgIQADgIAAgIQAAgLgFgFQgHgGgKAAQgSAAgSAPIgGgLQAIgIALgEQAMgEALAAQARAAAKAJQAKAJAAAPQAAALgFAKQgFAJgLANIgjAnIA+AAIAAAMg");
	this.shape_12.setTransform(42.6,65.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgfAxQgNgQAAgeQABgUAFgPQAHgQAKgIQAMgIAOAAQALAAAKAEQALAFAHAHIgFALQgJgIgIgDQgJgEgIABQgPAAgKAOQgJAOAAAaIAAADQAEgJAKgHQAJgFALAAQAMAAAIAFQAJAFAGAIQAEAJAAAMQAAAMgEAJQgGAKgKAEQgJAGgLAAQgXAAgMgQgAgRAEQgHAIAAAMQAAANAHAIQAIAHAMAAQAMABAIgIQAHgIAAgNQAAgNgHgHQgIgHgMAAQgLAAgJAHg");
	this.shape_13.setTransform(31.85,65.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgRAAIAAgMIARAAIAAgbIANAAIAAAbIAZAAIAAAMIgZAAIAAAsQABAUASAAIAIAAIAAALIgKABQgPAAgHgIg");
	this.shape_14.setTransform(18.75,66.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgTAqQgIgDgEgGQgEgHAAgGQAAgLAFgFQAFgFALgCQAMgCATgBIAEAAIAAgGQABgKgFgFQgEgGgLABQgOgBgPAKIgFgKQAIgFAJgEQAJgCAIAAQASgBAHAJQAJAJAAARIAAA3IgPAAIAAgQQgDAJgHADQgHAFgIAAQgJAAgGgEgAgFAEQgIABgEAEQgDADAAAGQAAAHAFAEQAFAFAIAAQAJAAAIgHQAGgHAAgMIAAgFIgDAAIgXABg");
	this.shape_15.setTransform(10.85,67.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgWA7QgJgGgFgKQgEgLAAgOQAAgNAEgJQAFgKAJgGQAJgGALAAQAKAAAHAFQAIAEAEAIIAAg2IAOAAIAAB+IgOAAIAAgQQgEAIgIAFQgHAEgKAAQgLAAgJgFgAgTgFQgHAIAAAPQAAAQAHAJQAIAJALAAQANAAAHgJQAHgJAAgQQAAgPgHgIQgHgJgNABQgLgBgIAJg");
	this.shape_16.setTransform(-3.875,65.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_17.setTransform(-13.525,67.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgGAsIgmhXIAQAAIAcBHIAehHIAOAAIglBXg");
	this.shape_18.setTransform(-22.9,67.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgGA/IAAhXIANAAIAABXgAgIgtIAAgRIARAAIAAARg");
	this.shape_19.setTransform(-29.625,65.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgYAtIAAhXIAOAAIAAAPQAIgPAUgCIAGAAIABANIgKABQgNABgFAHQgGAIAAAKIAAAxg");
	this.shape_20.setTransform(-34.225,67.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgYAtIAAhXIAOAAIAAAPQAIgPAUgCIAGAAIABANIgKABQgNABgFAHQgGAIAAAKIAAAxg");
	this.shape_21.setTransform(-40.575,67.2);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgUAqQgHgDgEgGQgEgHAAgGQAAgLAFgFQAFgFAMgCQALgCATgBIAFAAIAAgGQAAgKgFgFQgFgGgJABQgPgBgPAKIgEgKQAGgFAKgEQAKgCAIAAQARgBAHAJQAJAJAAARIAAA3IgOAAIAAgQQgEAJgHADQgHAFgIAAQgIAAgIgEgAgFAEQgIABgEAEQgDADAAAGQAAAHAFAEQAFAFAIAAQAJAAAIgHQAGgHABgMIAAgFIgEAAIgXABg");
	this.shape_22.setTransform(-49.25,67.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgiAjIAFgMQAHAGAHACQAIADAIAAQAKAAAEgEQAGgDgBgGQAAgFgCgDQgEgDgIgCIgOgEQgLgCgGgFQgGgHAAgIQAAgMAJgHQAKgIAOABQAJAAAJACQAHADAGAGIgEALQgNgKgOAAQgIAAgGADQgEAEAAAGQAAAFACADQAEAEAGABIAPADQAMADAGAFQAGAGAAAJQAAAMgJAHQgKAGgQABQgVgBgNgKg");
	this.shape_23.setTransform(-62.8,67.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgTAqQgIgDgEgGQgEgHAAgGQAAgLAFgFQAFgFALgCQAMgCATgBIAEAAIAAgGQABgKgFgFQgEgGgLABQgOgBgPAKIgFgKQAIgFAJgEQAJgCAIAAQASgBAHAJQAJAJAAARIAAA3IgPAAIAAgQQgDAJgHADQgHAFgIAAQgJAAgGgEgAgFAEQgIABgEAEQgDADAAAGQAAAHAFAEQAFAFAIAAQAJAAAIgHQAGgHAAgMIAAgFIgDAAIgXABg");
	this.shape_24.setTransform(-71.95,67.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAXBAIAAg2QAAgMgEgFQgFgGgLAAQgLAAgHAIQgHAFAAANIAAAzIgPAAIAAh+IAPAAIAAA1QAEgIAIgEQAHgFAJABQAgAAAAAiIAAA3g");
	this.shape_25.setTransform(-81.675,65.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_26.setTransform(-96.075,67.25);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgkAyIAFgLQAJAGAHACQAIADAJAAQAMAAAHgHQAGgGAAgNIAAgQQgDAJgIAEQgIAFgKAAQgLAAgJgGQgJgFgFgKQgFgJAAgNQAAgNAFgKQAFgKAJgFQAJgGALAAQAKAAAHAFQAIAEAEAJIAAgPIAPAAIAABQQAAAUgKAKQgKAKgUAAQgWAAgQgMgAgTgoQgHAIAAAPQAAAPAHAHQAHAIAMAAQANAAAHgIQAHgHAAgPQAAgPgHgIQgHgIgNAAQgMAAgHAIg");
	this.shape_27.setTransform(-106.325,68.875);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgUAqQgHgDgEgGQgEgHAAgGQAAgLAFgFQAFgFAMgCQALgCATgBIAFAAIAAgGQgBgKgEgFQgFgGgJABQgPgBgPAKIgEgKQAGgFAKgEQAKgCAIAAQARgBAHAJQAJAJAAARIAAA3IgOAAIAAgQQgEAJgHADQgHAFgIAAQgIAAgIgEgAgFAEQgIABgEAEQgDADAAAGQAAAHAFAEQAFAFAIAAQAJAAAHgHQAIgHAAgMIAAgFIgEAAIgXABg");
	this.shape_28.setTransform(-116.2,67.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAUBAIgsgqIAAAqIgOAAIAAh+IAOAAIAABNIApgmIASAAIgrApIAvAug");
	this.shape_29.setTransform(-124.6,65.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgQAoQgKgGgFgKQgFgJAAgOQAAgNAFgLQAGgKAJgGQAKgFAMAAQAJgBAIAEQAJADAFAFIgFALQgMgKgNAAQgNAAgHAJQgIAIAAAQQAAAPAIAJQAHAJANgBQANAAAMgKIAFAMQgGAEgIADQgJAEgJAAQgMgBgJgFg");
	this.shape_30.setTransform(-133.925,67.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgUAqQgHgDgEgGQgEgHAAgGQAAgLAFgFQAFgFAMgCQALgCATgBIAFAAIAAgGQAAgKgFgFQgFgGgJABQgPgBgPAKIgEgKQAGgFAKgEQAKgCAIAAQARgBAHAJQAJAJAAARIAAA3IgOAAIAAgQQgEAJgHADQgHAFgIAAQgIAAgIgEgAgFAEQgIABgEAEQgDADAAAGQAAAHAFAEQAFAFAIAAQAJAAAIgHQAGgHABgMIAAgFIgEAAIgXABg");
	this.shape_31.setTransform(-143.3,67.25);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgpA9IAAh3IAPAAIAAAPQAEgIAIgFQAHgEAKAAQALAAAJAGQAIAFAGALQAEAKAAAOQAAAOgEAJQgGAKgIAFQgIAGgMAAQgKAAgHgFQgIgEgEgIIAAAwgAgTgnQgHAIAAAQQAAAPAHAJQAHAJAMAAQAMAAAIgJQAGgIABgPQgBgQgGgJQgIgJgMAAQgMAAgHAJg");
	this.shape_32.setTransform(-152.9,68.825);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgYAtIAAhXIAOAAIAAAPQAIgPAUgCIAGAAIABANIgKABQgNABgFAHQgGAIAAAKIAAAxg");
	this.shape_33.setTransform(-165.525,67.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgcAkQgIgJAAgRIAAg1IAOAAIAAA1QAAALAFAGQAFAFAKAAQAKAAAHgHQAHgIAAgMIAAgwIAPAAIAABWIgOAAIAAgPQgEAIgIAEQgHAEgJAAQgPAAgIgIg");
	this.shape_34.setTransform(-174.375,67.375);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgVAoQgJgGgGgKQgEgKAAgOQAAgNAEgKQAGgKAJgGQAKgFALAAQAMAAAKAFQAKAGAEAKQAGAKAAANQAAAOgGAKQgEAKgKAGQgKAFgMABQgLgBgKgFgAgTgYQgHAJAAAPQAAAQAHAJQAHAJAMgBQANABAHgJQAGgJAAgQQABgPgIgJQgGgJgNABQgMgBgHAJg");
	this.shape_35.setTransform(-184.35,67.25);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgGBAIAAg9IgzhBIASAAIAnA3IAog3IARAAIgyBBIAAA9g");
	this.shape_36.setTransform(-194.75,65.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AAyAyIAAg6QAAgLgEgGQgEgEgIAAQgLAAgFAGQgGAHAAANIAAA1IgXAAIAAg6QAAgLgEgGQgEgEgIAAQgLAAgFAGQgGAHABANIAAA1IgZAAIAAhhIAYAAIAAAOQAEgIAIgEQAIgEAKAAQAVAAAHASQAFgJAJgFQAIgEALAAQARAAAHAKQAIAJAAAVIAAA7g");
	this.shape_37.setTransform(-100.3,41.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgZAtQgLgHgHgLQgGgMAAgPQAAgPAGgLQAHgMALgGQALgGAOAAQAPAAAMAGQALAGAGAMQAGALAAAPQAAAPgGAMQgGALgLAHQgMAGgPAAQgOAAgLgGgAgRgXQgHAIAAAPQAAAPAHAIQAGAIALAAQAMAAAGgIQAHgIAAgPQAAgPgHgIQgGgIgMAAQgLAAgGAIg");
	this.shape_38.setTransform(-114.8,41.525);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgZA/QgPgIgJgRQgIgRAAgVQAAgVAIgQQAJgRAPgJQAPgIAUgBQAPABAMAEQAMAFAJAHIgIATQgKgHgJgEQgKgDgLAAQgTAAgLANQgLANAAAYQAAAZALANQALANATAAQALAAAKgDQAJgDAKgJIAIATQgJAJgMAEQgMAFgPgBQgUAAgPgJg");
	this.shape_39.setTransform(-127.2,39.4);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgsAJIAAg6IAZAAIAAA7QAAAKAEAFQAEAFAJAAQAJAAAHgHQAGgHAAgLIAAg2IAZAAIAABhIgYAAIAAgPQgFAIgIAFQgIAEgIAAQgkAAAAgpg");
	this.shape_40.setTransform(-139.875,41.625);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgxBEIAAiFIAZAAIAAAPQAEgIAJgFQAIgEAJAAQANAAAKAGQAKAGAFAMQAGAMAAAPQAAAQgGAKQgFALgKAGQgKAHgNAAQgJgBgIgEQgIgEgFgIIAAAzgAgSgnQgGAIAAAPQAAAPAGAHQAHAIALAAQAMAAAGgIQAHgHAAgPQAAgPgHgIQgGgJgMAAQgLAAgHAJg");
	this.shape_41.setTransform(-151.375,43.25);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AAyAyIAAg6QAAgLgEgGQgEgEgIAAQgLAAgFAGQgGAHABANIAAA1IgYAAIAAg6QgBgLgDgGQgEgEgJAAQgKAAgFAGQgGAHABANIAAA1IgZAAIAAhhIAYAAIAAAOQAEgIAIgEQAIgEAKAAQAVAAAHASQAFgJAJgFQAIgEALAAQAQAAAJAKQAHAJAAAVIAAA7g");
	this.shape_42.setTransform(-166.35,41.45);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgZAtQgLgHgHgLQgGgMAAgPQAAgPAGgLQAHgMALgGQALgGAOAAQAPAAALAGQAMAGAGAMQAGALAAAPQAAAPgGAMQgGALgMAHQgLAGgPAAQgOAAgLgGgAgSgXQgGAIAAAPQAAAPAGAIQAHAIALAAQAMAAAGgIQAHgIAAgPQAAgPgHgIQgGgIgMAAQgLAAgHAIg");
	this.shape_43.setTransform(-180.85,41.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgZA/QgPgIgJgRQgIgRAAgVQAAgVAIgQQAJgRAPgJQAPgIAUgBQAOABANAEQANAFAIAHIgIATQgKgHgJgEQgKgDgLAAQgTAAgLANQgLANAAAYQAAAZALANQALANATAAQALAAAKgDQAJgDAKgJIAIATQgIAJgNAEQgNAFgOgBQgUAAgPgJg");
	this.shape_44.setTransform(-193.25,39.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("A/roSMA/XAAAQBQAAAABQIAAOFQAABQhQAAMg/XAAAQhQAAAAhQIAAuFQAAhQBQAAg");
	this.shape_45.setTransform(-3.9316,35.9693,1.0186,1.135);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(255,255,255,0.8)").s().p("A/rITQhQAAAAhQIAAuFQAAhQBQAAMA/XAAAQBQAAAABQIAAOFQAABQhQAAg");
	this.shape_46.setTransform(-3.9316,35.9693,1.0186,1.135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_46},{t:this.shape_45}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.notification2, new cjs.Rectangle(-219.6,-25.3,432,122.6), null);


(lib.notification1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.a0();
	this.instance.setTransform(-212.3,-24.25,0.3943,0.3943);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAgAJIAAgRIASAAIAAARgAgIAJIAAgRIARAAIAAARgAgxAJIAAgRIASAAIAAARg");
	this.shape.setTransform(170.525,95.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgWA6QgJgGgFgJQgEgLAAgOQAAgNAEgKQAFgJAJgGQAJgGALAAQAKAAAHAEQAIAFAEAJIAAg3IAOAAIAAB+IgOAAIAAgQQgEAIgIAFQgHAEgKAAQgLAAgJgGgAgTgFQgHAHAAAQQAAAQAHAKQAIAIALAAQANAAAHgIQAHgKAAgQQAAgQgHgHQgHgJgNAAQgLAAgIAJg");
	this.shape_1.setTransform(158.875,89.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgbAhQgLgMAAgUQAAgNAFgKQAFgLAJgGQAKgFALgBQARAAAKAMQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJADgJABQgUAAgMgNgAAagFQAAgNgGgIQgHgHgLAAQgKAAgHAHQgHAIgCANIAyAAIAAAAg");
	this.shape_2.setTransform(149.225,91.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgSAAIAAgMIASAAIAAgbIAOAAIAAAbIAYAAIAAAMIgYAAIAAAsQAAAUATAAIAIAAIgBALIgJABQgQAAgHgIg");
	this.shape_3.setTransform(141.4,90.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgYAtIAAhXIAOAAIAAAQQAIgPAUgDIAGAAIABAMIgKABQgNACgFAHQgGAHAAALIAAAxg");
	this.shape_4.setTransform(135.825,91.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgUAqQgHgDgEgGQgEgHAAgGQAAgKAFgGQAFgEAMgDQALgDATABIAFAAIAAgHQAAgKgFgGQgFgEgJAAQgPAAgPAJIgEgKQAGgGAKgCQAKgDAIgBQARAAAHAJQAJAJAAARIAAA2IgOAAIAAgOQgEAHgHAEQgHAEgIABQgIgBgIgDgAgFAEQgIACgEACQgDAEAAAGQAAAHAFAFQAFAEAIAAQAJAAAIgHQAGgIABgLIAAgFIgEAAIgXABg");
	this.shape_5.setTransform(127.15,91.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgSAAIAAgMIASAAIAAgbIANAAIAAAbIAZAAIAAAMIgZAAIAAAsQABAUASAAIAJAAIgBALIgJABQgQAAgHgIg");
	this.shape_6.setTransform(119.45,90.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgiAiIAFgLQAHAGAHACQAHADAJAAQAJAAAGgDQAEgDAAgHQAAgFgDgDQgDgDgIgCIgOgDQgLgDgGgFQgGgGAAgJQAAgMAKgHQAIgIAPAAQAJABAIADQAJADAFAFIgFALQgMgKgOAAQgJgBgEAEQgGADAAAHQAAAFADADQAEADAHACIANADQANADAGAFQAGAGAAAKQAAALgJAHQgKAHgQAAQgVAAgNgMg");
	this.shape_7.setTransform(112.1,91.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgSAAIAAgMIASAAIAAgbIAOAAIAAAbIAYAAIAAAMIgYAAIAAAsQgBAUAUAAIAIAAIgCALIgJABQgPAAgHgIg");
	this.shape_8.setTransform(100.15,90.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgbAhQgLgMAAgUQAAgNAFgKQAFgLAJgGQAKgFALgBQARAAAKAMQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJADgJABQgUAAgMgNgAAagFQAAgNgGgIQgHgHgLAAQgKAAgHAHQgHAIgCANIAyAAIAAAAg");
	this.shape_9.setTransform(92.425,91.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgkAyIAFgLQAJAGAHACQAIADAJAAQAMAAAHgHQAGgGAAgNIAAgQQgDAJgIAEQgIAFgKAAQgLAAgJgGQgJgFgFgKQgFgJAAgNQAAgNAFgKQAFgKAJgFQAJgGALAAQAKAAAHAFQAIAEAEAJIAAgPIAPAAIAABQQAAAUgKAKQgKAKgUAAQgWAAgQgMgAgTgoQgHAIAAAPQAAAPAHAHQAHAIAMAAQANAAAHgIQAHgHAAgPQAAgPgHgIQgHgIgNAAQgMAAgHAIg");
	this.shape_10.setTransform(82.175,93.425);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgVAoQgKgFgEgLQgGgKABgOQgBgMAGgLQAEgKAKgGQAJgFAMgBQAMABAKAFQAJAGAGAKQAEALAAAMQAAAOgEAKQgGALgJAFQgKAGgMAAQgMAAgJgGgAgTgXQgHAIAAAPQAAAQAHAJQAHAIAMAAQANAAAHgIQAHgJAAgQQgBgPgGgIQgIgKgMABQgMgBgHAKg");
	this.shape_11.setTransform(67.6,91.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgRAAIAAgMIARAAIAAgbIANAAIAAAbIAZAAIAAAMIgZAAIAAAsQAAAUAUAAIAHAAIgBALIgJABQgPAAgHgIg");
	this.shape_12.setTransform(59.55,90.575);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgoA9IAAh3IAOAAIAAAPQAEgIAHgFQAJgEAIAAQAMAAAJAGQAJAFAEALQAGAKAAAOQAAAOgGAJQgEAKgJAFQgIAGgNAAQgIAAgJgFQgHgEgEgIIAAAwgAgTgnQgHAIAAAQQAAAPAHAJQAHAJAMAAQANAAAGgJQAIgIgBgPQABgQgIgJQgGgJgNAAQgMAAgHAJg");
	this.shape_13.setTransform(46.95,93.375);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgpA9IAAh3IAPAAIAAAPQAEgIAHgFQAJgEAIAAQAMAAAJAGQAJAFAEALQAFAKABAOQgBAOgFAJQgEAKgJAFQgJAGgMAAQgIAAgJgFQgHgEgEgIIAAAwgAgTgnQgHAIAAAQQAAAPAHAJQAHAJAMAAQAMAAAHgJQAIgIgBgPQABgQgIgJQgHgJgMAAQgMAAgHAJg");
	this.shape_14.setTransform(36.5,93.375);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgTAqQgIgDgEgGQgEgHAAgGQAAgKAFgGQAFgEALgDQAMgDATABIAEAAIAAgHQABgKgFgGQgEgEgLAAQgOAAgPAJIgFgKQAIgGAJgCQAJgDAIgBQASAAAHAJQAJAJAAARIAAA2IgPAAIAAgOQgDAHgHAEQgHAEgIABQgJgBgGgDgAgFAEQgIACgEACQgDAEAAAGQAAAHAFAFQAFAEAIAAQAJAAAIgHQAGgIAAgLIAAgFIgDAAIgXABg");
	this.shape_15.setTransform(26.15,91.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgWA5QgOgHgHgQQgHgOAAgUQAAgTAHgOQAHgPAOgIQANgIARAAQANAAALAEQALAEAIAIIgGALQgIgHgKgEQgIgDgLAAQgUAAgMANQgKAOgBAYQABAZAKAOQAMANAUAAQALAAAIgDQAKgDAIgIIAGALQgIAIgLAEQgLAEgNAAQgRAAgNgIg");
	this.shape_16.setTransform(10.95,89.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgWA5QgOgHgHgQQgHgOAAgUQAAgTAHgOQAHgPAOgIQANgIARAAQANAAALAEQALAEAIAIIgGALQgIgHgKgEQgIgDgLAAQgUAAgMANQgKAOgBAYQABAZAKAOQAMANAUAAQALAAAIgDQAKgDAIgIIAGALQgIAIgLAEQgLAEgNAAQgRAAgNgIg");
	this.shape_17.setTransform(-1.2,89.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgbAhQgLgMAAgUQAAgNAFgKQAFgLAJgGQAKgFALgBQARAAAKAMQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJADgJABQgUAAgMgNgAAagFQAAgNgGgIQgHgHgLAAQgKAAgHAHQgHAIgCANIAyAAIAAAAg");
	this.shape_18.setTransform(-16.675,91.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAXA/IAAg2QAAgLgEgGQgFgFgLAAQgLAAgHAIQgHAFAAAOIAAAxIgPAAIAAh+IAPAAIAAA2QAEgIAIgEQAHgFAJAAQAgABAAAhIAAA3g");
	this.shape_19.setTransform(-26.525,89.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgRAAIAAgMIARAAIAAgbIANAAIAAAbIAZAAIAAAMIgZAAIAAAsQABAUASAAIAIAAIgBALIgJABQgPAAgHgIg");
	this.shape_20.setTransform(-34.7,90.575);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgWA6QgJgGgFgJQgEgLAAgOQAAgNAEgKQAFgJAJgGQAJgGALAAQAKAAAHAEQAIAFAEAJIAAg3IAOAAIAAB+IgOAAIAAgQQgEAIgIAFQgHAEgKAAQgLAAgJgGgAgTgFQgHAHAAAQQAAAQAHAKQAIAIALAAQANAAAHgIQAHgKAAgQQAAgQgHgHQgHgJgNAAQgLAAgIAJg");
	this.shape_21.setTransform(-47.825,89.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgTAqQgIgDgEgGQgEgHAAgGQAAgKAFgGQAFgEALgDQAMgDAUABIADAAIAAgHQABgKgFgGQgEgEgLAAQgOAAgOAJIgGgKQAIgGAJgCQAKgDAHgBQARAAAIAJQAJAJAAARIAAA2IgPAAIAAgOQgDAHgHAEQgHAEgIABQgJgBgGgDgAgFAEQgIACgEACQgDAEAAAGQAAAHAFAFQAFAEAIAAQAJAAAIgHQAGgIAAgLIAAgFIgDAAIgXABg");
	this.shape_22.setTransform(-57.65,91.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgVAoQgJgFgGgLQgEgKAAgOQAAgMAEgLQAGgKAJgGQAKgFALgBQANABAJAFQAKAGAEAKQAGALAAAMQAAAOgGAKQgEALgKAFQgJAGgNAAQgLAAgKgGgAgTgXQgHAIAAAPQAAAQAHAJQAHAIAMAAQANAAAHgIQAGgJAAgQQABgPgIgIQgGgKgNABQgMgBgHAKg");
	this.shape_23.setTransform(-67.25,91.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgGA/IAAh+IANAAIAAB+g");
	this.shape_24.setTransform(-74.325,89.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAXAtIAAg1QAAgMgEgGQgFgGgLAAQgLAAgHAIQgHAHAAANIAAAxIgPAAIAAhXIAPAAIAAAPQAEgIAIgFQAHgEAJAAQAgAAAAAjIAAA2g");
	this.shape_25.setTransform(-81.475,91.75);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AAZAsIgZhDIgYBDIgOAAIgghXIAPAAIAZBFIAZhFIAMAAIAZBFIAZhFIAOAAIggBXg");
	this.shape_26.setTransform(-94.175,91.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgVAoQgKgFgEgLQgFgKgBgOQABgMAFgLQAEgKAKgGQAKgFALgBQAMABAKAFQAKAGAEAKQAFALABAMQgBAOgFAKQgEALgKAFQgKAGgMAAQgLAAgKgGgAgTgXQgHAIAAAPQAAAQAHAJQAHAIAMAAQANAAAHgIQAGgJABgQQAAgPgIgIQgGgKgNABQgMgBgHAKg");
	this.shape_27.setTransform(-106.7,91.8);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgWA6QgJgGgFgJQgEgLAAgOQAAgNAEgKQAFgJAJgGQAJgGALAAQAKAAAHAEQAIAFAEAJIAAg3IAOAAIAAB+IgOAAIAAgQQgEAIgIAFQgHAEgKAAQgLAAgJgGgAgTgFQgHAHAAAQQAAAQAHAKQAIAIALAAQANAAAHgIQAHgKAAgQQAAgQgHgHQgHgJgNAAQgLAAgIAJg");
	this.shape_28.setTransform(-117.175,89.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgWA6QgJgGgFgJQgEgLAAgOQAAgNAEgKQAFgJAJgGQAJgGALAAQAKAAAHAEQAIAFAEAJIAAg3IAOAAIAAB+IgOAAIAAgQQgEAIgIAFQgHAEgKAAQgLAAgJgGgAgTgFQgHAHAAAQQAAAQAHAKQAIAIALAAQANAAAHgIQAHgKAAgQQAAgQgHgHQgHgJgNAAQgLAAgIAJg");
	this.shape_29.setTransform(-132.225,89.95);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgbAhQgLgMAAgUQAAgNAFgKQAFgLAJgGQAKgFALgBQARAAAKAMQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJADgJABQgUAAgMgNgAAagFQAAgNgGgIQgHgHgLAAQgKAAgHAHQgHAIgCANIAyAAIAAAAg");
	this.shape_30.setTransform(-141.875,91.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgbAhQgLgMAAgUQAAgNAFgKQAFgLAJgGQAKgFALgBQARAAAKAMQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJADgJABQgUAAgMgNgAAagFQAAgNgGgIQgHgHgLAAQgKAAgHAHQgHAIgCANIAyAAIAAAAg");
	this.shape_31.setTransform(-151.325,91.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AAXAtIAAg1QAAgMgEgGQgFgGgLAAQgLAAgHAIQgHAHAAANIAAAxIgPAAIAAhXIAPAAIAAAPQAEgIAIgFQAHgEAJAAQAgAAAAAjIAAA2g");
	this.shape_32.setTransform(-161.175,91.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgcAkQgIgJAAgRIAAg1IAOAAIAAA1QAAALAFAGQAFAFAKAAQAKAAAHgHQAHgIAAgMIAAgwIAPAAIAABWIgOAAIAAgPQgEAIgIAEQgHAEgJAAQgPAAgIgIg");
	this.shape_33.setTransform(-175.925,91.925);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgVAoQgKgFgEgLQgFgKgBgOQABgMAFgLQAEgKAKgGQAKgFALgBQAMABAKAFQAKAGAEAKQAFALABAMQgBAOgFAKQgEALgKAFQgKAGgMAAQgLAAgKgGgAgTgXQgHAIAAAPQAAAQAHAJQAHAIAMAAQANAAAHgIQAGgJABgQQAAgPgIgIQgGgKgNABQgMgBgHAKg");
	this.shape_34.setTransform(-185.9,91.8);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgVA8IAOgiIglhVIAQAAIAcBHIAehHIAOAAIgzB3g");
	this.shape_35.setTransform(-195.5,93.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AAXBAIAAg2QAAgMgEgFQgFgGgLAAQgLAAgHAIQgHAFAAANIAAAzIgPAAIAAh+IAPAAIAAA1QAEgIAIgEQAHgFAJABQAgAAAAAiIAAA3g");
	this.shape_36.setTransform(168.675,65.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgQAoQgKgGgFgKQgFgJAAgOQAAgNAFgLQAGgKAJgGQAKgFAMAAQAJgBAIAEQAJADAFAFIgFALQgMgKgNAAQgNAAgHAJQgIAIAAAQQAAAPAIAJQAHAJANgBQANAAAMgKIAFAMQgGAEgIADQgJAEgJAAQgMgBgJgFg");
	this.shape_37.setTransform(159.475,67.25);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_38.setTransform(150.275,67.25);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgRAAIAAgMIARAAIAAgbIAOAAIAAAbIAYAAIAAAMIgYAAIAAAsQgBAUAUAAIAIAAIgCALIgJABQgPAAgHgIg");
	this.shape_39.setTransform(142.45,66.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_40.setTransform(130.125,67.25);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AAXBAIAAg2QAAgMgEgFQgFgGgLAAQgLAAgHAIQgHAFAAANIAAAzIgPAAIAAh+IAPAAIAAA1QAEgIAIgEQAHgFAJABQAgAAAAAiIAAA3g");
	this.shape_41.setTransform(120.275,65.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgRAAIAAgMIARAAIAAgbIANAAIAAAbIAZAAIAAAMIgZAAIAAAsQAAAUATAAIAIAAIgBALIgJABQgPAAgHgIg");
	this.shape_42.setTransform(112.1,66.025);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgRAAIAAgMIARAAIAAgbIANAAIAAAbIAZAAIAAAMIgZAAIAAAsQAAAUAUAAIAHAAIgBALIgJABQgPAAgHgIg");
	this.shape_43.setTransform(101.4,66.025);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_44.setTransform(93.675,67.25);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgkAyIAFgLQAJAGAHACQAIADAJAAQAMAAAHgHQAGgGAAgNIAAgQQgDAJgIAEQgIAFgKAAQgLAAgJgGQgJgFgFgKQgFgJAAgNQAAgNAFgKQAFgKAJgFQAJgGALAAQAKAAAHAFQAIAEAEAJIAAgPIAPAAIAABQQAAAUgKAKQgKAKgUAAQgWAAgQgMgAgTgoQgHAIAAAPQAAAPAHAHQAHAIAMAAQANAAAHgIQAHgHAAgPQAAgPgHgIQgHgIgNAAQgMAAgHAIg");
	this.shape_45.setTransform(83.425,68.875);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgVAoQgJgGgGgKQgEgKAAgOQAAgNAEgKQAGgKAJgGQAJgFAMAAQANAAAJAFQAJAGAGAKQAEAKAAANQAAAOgEAKQgGAKgJAGQgJAFgNABQgMgBgJgFgAgTgYQgHAJAAAPQAAAQAHAJQAHAJAMgBQANABAHgJQAHgJgBgQQAAgPgGgJQgIgJgMABQgMgBgHAJg");
	this.shape_46.setTransform(68.85,67.25);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgHBAIAAhyIgsAAIAAgMIBnAAIAAAMIgtAAIAAByg");
	this.shape_47.setTransform(58.475,65.35);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgIBAIAAgTIARAAIAAATgAgEAeIgEhcIARAAIgFBcg");
	this.shape_48.setTransform(46.45,65.35);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgYAtIAAhXIAOAAIAAAPQAIgPAUgCIAGAAIABANIgKABQgNABgFAHQgGAIAAAKIAAAxg");
	this.shape_49.setTransform(41.875,67.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_50.setTransform(33.375,67.25);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgSAAIAAgMIASAAIAAgbIAOAAIAAAbIAYAAIAAAMIgYAAIAAAsQgBAUAUAAIAIAAIgBALIgJABQgQAAgHgIg");
	this.shape_51.setTransform(25.55,66.025);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_52.setTransform(17.825,67.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgtBAIAAh+IAxAAQAUAAALAKQALAJAAASQAAASgLAJQgLAKgUAAIgiAAIAAA0gAgeAAIAhAAQAdAAAAgZQAAgZgdAAIghAAg");
	this.shape_53.setTransform(7.625,65.35);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgOA8QgIgFgEgIIAAAQIgOAAIAAh+IAOAAIAAA2QAEgIAIgEQAHgFAKAAQALAAAJAGQAIAGAGAKQAEAJAAANQAAAOgEALQgGAKgIAGQgJAFgLAAQgKAAgHgEgAgTgFQgHAIAAAPQAAAQAHAJQAHAJAMAAQAMAAAIgJQAGgJAAgQQAAgPgGgIQgIgJgMABQgMgBgHAJg");
	this.shape_54.setTransform(-8.1,65.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgVAoQgJgGgGgKQgEgKAAgOQAAgNAEgKQAGgKAJgGQAJgFAMAAQANAAAJAFQAKAGAEAKQAGAKgBANQABAOgGAKQgEAKgKAGQgJAFgNABQgMgBgJgFgAgTgYQgHAJAAAPQAAAQAHAJQAHAJAMgBQANABAHgJQAHgJgBgQQAAgPgGgJQgIgJgMABQgMgBgHAJg");
	this.shape_55.setTransform(-18.55,67.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgVBEIAIAAQATgCgBgTIAAhXIAPAAIAABVQAAARgIAIQgIAIgQABIgIAAgAAEg+IAAgQIARAAIAAAQg");
	this.shape_56.setTransform(-26.9,67.075);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AAZAsIgZhDIgYBDIgOAAIgghXIAPAAIAZBFIAZhFIAMAAIAZBFIAZhFIAOAAIggBXg");
	this.shape_57.setTransform(-39.875,67.325);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_58.setTransform(-52.125,67.25);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AAXAtIAAg1QAAgNgEgFQgFgGgLABQgLgBgHAIQgHAHAAANIAAAxIgPAAIAAhXIAPAAIAAAOQAEgIAIgDQAHgFAJAAQAgAAAAAjIAAA2g");
	this.shape_59.setTransform(-61.975,67.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgbAhQgLgLAAgVQAAgNAFgLQAFgKAJgGQAKgFALAAQARAAAKALQAKAMAAATIAAAFIg/AAQABAPAHAIQAIAIANAAQAPAAANgLIAFALQgGAFgJADQgJAEgJAAQgUgBgMgMgAAagGQAAgMgGgIQgHgHgLAAQgKAAgHAHQgHAIgCAMIAyAAIAAAAg");
	this.shape_60.setTransform(-76.375,67.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AAXBAIAAg2QAAgMgEgFQgFgGgLAAQgLAAgHAIQgHAFAAANIAAAzIgPAAIAAh+IAPAAIAAA1QAEgIAIgEQAHgFAJABQAgAAAAAiIAAA3g");
	this.shape_61.setTransform(-86.225,65.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgSAAIAAgMIASAAIAAgbIAOAAIAAAbIAYAAIAAAMIgYAAIAAAsQAAAUASAAIAJAAIgBALIgJABQgQAAgHgIg");
	this.shape_62.setTransform(-94.4,66.025);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AAXAtIAAg1QAAgNgEgFQgFgGgLABQgLgBgHAIQgHAHAAANIAAAxIgPAAIAAhXIAPAAIAAAOQAEgIAIgDQAHgFAJAAQAgAAAAAjIAAA2g");
	this.shape_63.setTransform(-107.125,67.2);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgVAoQgJgGgGgKQgEgKAAgOQAAgNAEgKQAGgKAJgGQAKgFALAAQANAAAJAFQAKAGAEAKQAGAKAAANQAAAOgGAKQgEAKgKAGQgJAFgNABQgLgBgKgFgAgTgYQgHAJAAAPQAAAQAHAJQAHAJAMgBQANABAHgJQAGgJAAgQQABgPgIgJQgGgJgNABQgMgBgHAJg");
	this.shape_64.setTransform(-117.2,67.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgiAjIAFgMQAHAGAHACQAIADAIAAQAJAAAGgEQAEgDAAgGQAAgFgCgDQgEgDgIgCIgOgEQgLgCgGgFQgGgHAAgIQAAgMAJgHQAJgIAPABQAJAAAIACQAJADAFAGIgFALQgMgKgOAAQgIAAgGADQgEAEAAAGQAAAFACADQADAEAHABIAOADQANADAGAFQAGAGAAAJQAAAMgJAHQgKAGgQABQgVgBgNgKg");
	this.shape_65.setTransform(-131.1,67.25);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgDAyQgIgJAAgOIAAgtIgRAAIAAgMIARAAIAAgbIANAAIAAAbIAZAAIAAAMIgZAAIAAAsQAAAUAUAAIAHAAIgBALIgJABQgPAAgHgIg");
	this.shape_66.setTransform(-138.45,66.025);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgUAqQgHgDgEgGQgEgHAAgGQAAgLAFgFQAFgFAMgCQALgCATgBIAFAAIAAgGQgBgKgEgFQgFgGgJABQgPgBgPAKIgEgKQAGgFAKgEQAKgCAIAAQARgBAHAJQAJAJAAARIAAA3IgOAAIAAgQQgEAJgHADQgHAFgIAAQgIAAgIgEgAgFAEQgIABgEAEQgDADAAAGQAAAHAFAEQAFAFAIAAQAJAAAHgHQAIgHAAgMIAAgFIgEAAIgXABg");
	this.shape_67.setTransform(-146.35,67.25);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgYAtIAAhXIAOAAIAAAPQAIgPAUgCIAGAAIABANIgKABQgNABgFAHQgGAIAAAKIAAAxg");
	this.shape_68.setTransform(-153.525,67.2);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgkAyIAFgLQAJAGAHACQAIADAJAAQAMAAAHgHQAGgGAAgNIAAgQQgDAJgIAEQgIAFgKAAQgLAAgJgGQgJgFgFgKQgFgJAAgNQAAgNAFgKQAFgKAJgFQAJgGALAAQAKAAAHAFQAIAEAEAJIAAgPIAPAAIAABQQAAAUgKAKQgKAKgUAAQgWAAgQgMgAgTgoQgHAIAAAPQAAAPAHAHQAHAIAMAAQANAAAHgIQAHgHAAgPQAAgPgHgIQgHgIgNAAQgMAAgHAIg");
	this.shape_69.setTransform(-162.825,68.875);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AAXAtIAAg1QAAgNgEgFQgFgGgLABQgLgBgHAIQgHAHAAANIAAAxIgPAAIAAhXIAPAAIAAAOQAEgIAIgDQAHgFAJAAQAgAAAAAjIAAA2g");
	this.shape_70.setTransform(-172.925,67.2);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgVAoQgJgGgGgKQgEgKAAgOQAAgNAEgKQAGgKAJgGQAKgFALAAQAMAAAKAFQAKAGAEAKQAGAKAAANQAAAOgGAKQgEAKgKAGQgKAFgMABQgLgBgKgFgAgTgYQgHAJAAAPQAAAQAHAJQAHAJAMgBQANABAHgJQAGgJAAgQQABgPgIgJQgGgJgNABQgMgBgHAJg");
	this.shape_71.setTransform(-183,67.25);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgWA5QgOgHgHgQQgHgOAAgUQAAgTAHgOQAHgPAOgIQANgIARAAQANAAALAEQALAFAIAHIgFALQgKgHgIgEQgJgDgLAAQgUAAgLANQgLAOAAAYQAAAZALAOQALANAUAAQALAAAJgEQAIgDAKgHIAFALQgIAIgLAEQgLAEgNAAQgRAAgNgIg");
	this.shape_72.setTransform(-193.95,65.35);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AAyAyIAAg6QAAgLgEgGQgEgEgIAAQgLAAgFAGQgGAHAAANIAAA1IgXAAIAAg6QAAgLgEgGQgEgEgIAAQgLAAgFAGQgGAHABANIAAA1IgZAAIAAhhIAYAAIAAAOQAEgIAIgEQAIgEAKAAQAVAAAHASQAFgJAJgFQAIgEALAAQARAAAHAKQAIAJAAAVIAAA7g");
	this.shape_73.setTransform(-100.3,41.45);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgZAtQgLgHgHgLQgGgMAAgPQAAgPAGgLQAHgMALgGQALgGAOAAQAPAAAMAGQALAGAGAMQAGALAAAPQAAAPgGAMQgGALgLAHQgMAGgPAAQgOAAgLgGgAgRgXQgHAIAAAPQAAAPAHAIQAGAIALAAQAMAAAGgIQAHgIAAgPQAAgPgHgIQgGgIgMAAQgLAAgGAIg");
	this.shape_74.setTransform(-114.8,41.525);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgZA/QgPgIgJgRQgIgRAAgVQAAgVAIgQQAJgRAPgJQAPgIAUgBQAPABAMAEQAMAFAJAHIgIATQgKgHgJgEQgKgDgLAAQgTAAgLANQgLANAAAYQAAAZALANQALANATAAQALAAAKgDQAJgDAKgJIAIATQgJAJgMAEQgMAFgPgBQgUAAgPgJg");
	this.shape_75.setTransform(-127.2,39.4);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgsAJIAAg6IAZAAIAAA7QAAAKAEAFQAEAFAJAAQAJAAAHgHQAGgHAAgLIAAg2IAZAAIAABhIgYAAIAAgPQgFAIgIAFQgIAEgIAAQgkAAAAgpg");
	this.shape_76.setTransform(-139.875,41.625);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgxBEIAAiFIAZAAIAAAPQAEgIAJgFQAIgEAJAAQANAAAKAGQAKAGAFAMQAGAMAAAPQAAAQgGAKQgFALgKAGQgKAHgNAAQgJgBgIgEQgIgEgFgIIAAAzgAgSgnQgGAIAAAPQAAAPAGAHQAHAIALAAQAMAAAGgIQAHgHAAgPQAAgPgHgIQgGgJgMAAQgLAAgHAJg");
	this.shape_77.setTransform(-151.375,43.25);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AAyAyIAAg6QAAgLgEgGQgEgEgIAAQgLAAgFAGQgGAHABANIAAA1IgYAAIAAg6QgBgLgDgGQgEgEgJAAQgKAAgFAGQgGAHABANIAAA1IgZAAIAAhhIAYAAIAAAOQAEgIAIgEQAIgEAKAAQAVAAAHASQAFgJAJgFQAIgEALAAQAQAAAJAKQAHAJAAAVIAAA7g");
	this.shape_78.setTransform(-166.35,41.45);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("AgZAtQgLgHgHgLQgGgMAAgPQAAgPAGgLQAHgMALgGQALgGAOAAQAPAAALAGQAMAGAGAMQAGALAAAPQAAAPgGAMQgGALgMAHQgLAGgPAAQgOAAgLgGgAgSgXQgGAIAAAPQAAAPAGAIQAHAIALAAQAMAAAGgIQAHgIAAgPQAAgPgHgIQgGgIgMAAQgLAAgHAIg");
	this.shape_79.setTransform(-180.85,41.525);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgZA/QgPgIgJgRQgIgRAAgVQAAgVAIgQQAJgRAPgJQAPgIAUgBQAOABANAEQANAFAIAHIgIATQgKgHgJgEQgKgDgLAAQgTAAgLANQgLANAAAYQAAAZALANQALANATAAQALAAAKgDQAJgDAKgJIAIATQgIAJgNAEQgNAFgOgBQgUAAgPgJg");
	this.shape_80.setTransform(-193.25,39.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("A/roSMA/XAAAQBQAAAABQIAAOFQAABQhQAAMg/XAAAQhQAAAAhQIAAuFQAAhQBQAAg");
	this.shape_81.setTransform(-3.9316,47.1228,1.0186,1.3443);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(255,255,255,0.8)").s().p("A/rITQhQAAAAhQIAAuFQAAhQBQAAMA/XAAAQBQAAAABQIAAOFQAABQhQAAg");
	this.shape_82.setTransform(-3.9316,47.1228,1.0186,1.3443);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_82},{t:this.shape_81}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.notification1, new cjs.Rectangle(-219.6,-25.2,432,144.7), null);


(lib.Path_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9ECF2").s().p("AEsCUQlFiyi5BBQh7AsiMgjQhGgSgtgaQBeAJBlgMQDJgaAdhtQAehsA+g6QAfgcAZgHQgcASgVAlQgqBKAmBeQAUAyBBAoQAcARB/A5QEBB2CgCuQh+hnijhZg");
	this.shape.setTransform(58.925,34.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,117.9,68.1), null);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9ECF2").s().p("Ag/RmQlCgbjyiRQhVgzhAg/IgCgBQhyhhhViyQhViygijWQgjjiAgjaQAijvBvjCQBiirBQhoQBNhmBEgxQhfDAgaDmQgXDUAmDYQAkDNBUCoQBTCpBuBdIABABQBAA/BVAzQETCmEuApQFkAxEMiYQCnhfAHi1QAzDpiGDSQiQDkktBaQj5BKj5AAQhGAAhEgGg");
	this.shape.setTransform(111.5319,113.189);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,223.1,226.4), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9ECF2").s().p("AgsGHQlCgbjyiRQhVgzhAg/IgBgBQhbhNhKiCQhJiDgtiiQCGELC4CYQEsD7HqApQF/AgEqiPQBlgxBZhEQAggYBIg/QhEBshuBRQh1BXiaAvQj6BKj5AAQhFAAhFgGg");
	this.shape.setTransform(104.175,39.689);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,208.4,79.4), null);


(lib.Path_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5B3535").s().p("ArCD0QklhlAAiPQAAhFBPhAQBMg+CKgwQElhlGdAAQGeAAElBlQElBlAACOQAACPklBlQklBlmeAAQmdAAklhlg");
	this.shape.setTransform(99.975,34.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0, new cjs.Rectangle(0,0,200,69.1), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#5B3535").s().p("AtgEqQipg6hdhMQhghOAAhWQAAhVBghOQBdhMCpg7QFmh8H6AAQH7AAFmB8QCpA7BdBMQBgBOAABVQAABWhgBOQhdBMipA6QlmB8n7ABQn6gBlmh8g");
	this.shape.setTransform(122.325,42.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,244.7,84.5), null);


(lib.Group_16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#726A70").s().p("AkrA6IGyjqIClBxImkDwg");
	this.shape.setTransform(30,17.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_16, new cjs.Rectangle(0,0,60,35.5), null);


(lib.Group_15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#726A70").s().p("AidAeIDPh+IBsA+IjTCDg");
	this.shape.setTransform(15.775,9.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_15, new cjs.Rectangle(0,0,31.6,19.5), null);


(lib.Path_0_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#050304").s().p("A7kAfIRzoFMAlVAHJIxxIEg");
	this.shape_1.setTransform(176.45,48.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0_1, new cjs.Rectangle(0,0,352.9,97.4), null);


(lib.Path_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#050304").s().p("A+8A6IVJprMAovAH5I1HJqg");
	this.shape_1.setTransform(198.05,56.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4, new cjs.Rectangle(0,0,396.1,112.4), null);


(lib.Path2842 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#060405").s().p("AyADPQgOAAgKgKQgKgKAAgPQAAgMAHgJIETlbQAHgKALABIbtAAQAMAAAHAJIESFbQAJALgCAOQgCAPgLAIQgKAIgLAAg");
	this.shape.setTransform(118.7363,20.6455);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path2842, new cjs.Rectangle(0,0,237.5,41.3), null);


(lib.Path284 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#060405").s().p("AzHDbQgPAAgKgKQgLgLAAgPQAAgNAHgKIEklxQAIgJAMAAIdaAAQAMAAAIAJIEjFxQAJAMgCAPQgBAPgMAJQgLAIgMAAg");
	this.shape.setTransform(126.0424,21.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path284, new cjs.Rectangle(0,0,252.1,43.9), null);


(lib.Path_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ai4AkQgHAAgFgFQgEgEAAgHIAAgnQAAgHAEgEQAFgFAHAAIFwAAQAIAAAEAFQAFAFAAAGIAAAnQAAAHgFAEQgEAFgIAAg");
	this.shape_1.setTransform(20.1,3.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(0,0,40.2,7.3), null);


(lib.Path_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ai4AkQgHAAgFgFQgEgFAAgGIAAgnQAAgHAEgFQAFgEAHAAIFwAAQAIAAAEAEQAFAFAAAHIAAAnQAAAGgFAFQgEAFgIAAg");
	this.shape_2.setTransform(20.1,3.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(0,0,40.2,7.2), null);


(lib.ClipGroup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AtinFIbEgCIABOOI7EABg");
	mask.setTransform(90.725,59.075);

	// Layer_3
	this.instance = new lib.Image();
	this.instance.setTransform(0,0,0.0383,0.0383);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(4.1,13.5,173.3,91.2), null);


(lib.coffee = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AluIdIAAwmICAAAIAACGQAkhKBEgnQBDgoBaAAQBlAABPAzQBOAzAqBcQAsBbAAB5QAAB5gsBZQgqBahNAyQhOAxhnAAQhaAAhDgoQhEgogkhJIAAGtgAiwljQg+BMAACOQAACMA+BOQA9BNByAAQBvAAA/hMQA+hMAAiMQAAiMg+hPQg/hPhvAAQhyAAg9BNg");
	this.shape.setTransform(631.975,125.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjBFiQhUgygshbQgvhcABh5QgBh4AvhbQAshcBUgxQBUgyBtAAQBuAABUAyQBVAxAsBcQAuBbgBB4QABB5guBcQgsBbhVAyQhUAxhuAAQhtAAhUgxgAivjaQg+BNAACNQAACQA+BMQA9BMByAAQBzAAA9hLQA8hMABiRQAAiNg+hNQg+hNhxAAQhwAAg/BNg");
	this.shape_1.setTransform(539.1,111.425);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ADNIxIAAnfQABhsgqgwQgsgyhbAAQhqAAhABBQhABBAABvIAAG8IiBAAIAAxhICBAAIAAHXQAnhGBDglQBEgkBXAAQEWAAABEyIAAHng");
	this.shape_2.setTransform(449.9,94.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AkzEuIArhfQA+AxBAAWQBBAVBQAAQBWAAAugdQAtgeAAg3QAAgvgegaQgfgbhGgRIiBgeQhjgWg0g1Qg1g3AAhPQAAhnBRhAQBShACGAAQBRAABKAaQBJAbAxAxIgrBeQhrhbh/AAQhQAAguAfQgtAfAAA4QAAAuAcAcQAbAcA+AOICEAgQBsAaA1AzQA0AzAABTQAABmhSA9QhSA8iNAAQjDAAhzhlg");
	this.shape_3.setTransform(366.075,111.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AjzEoQhohqAAi9QAAh2AuhbQAuhcBUgzQBUgzBqAAQCaAABYBlQBXBlAACxIAAAvIo2AAQAGCHBDBFQBDBGB6AAQCHAAByhdIArBeQgzAwhQAcQhQAchTAAQi0AAhphrgADsg6QgEh2g4g/Qg4g/hkAAQhlAAg9BAQg+BAgKB0IHCAAIAAAAg");
	this.shape_4.setTransform(245.25,111.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AjzEoQhohqAAi9QAAh2AvhbQAthcBUgzQBUgzBpAAQCbAABYBlQBXBlAACxIAAAvIo2AAQAHCHBCBFQBDBGB6AAQCIAABxhdIArBeQg0AwhPAcQhQAchTAAQi0AAhphrgADrg6QgDh2g4g/Qg4g/hkAAQhlAAg+BAQg9BAgLB0IHCAAIAAAAg");
	this.shape_5.setTransform(161.35,111.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Ah2I0IAAqhIiXAAIAAhmICXAAIAAgZQAAibBNhPQBNhQCggKIBAgDIAKBlIhKAEQhhAGgsAxQgtAxAABkIAAArIDcAAIAABmIjcAAIAAKhg");
	this.shape_6.setTransform(95.175,94.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ah2I0IAAqhIiXAAIAAhmICXAAIAAgZQAAibBNhPQBNhQCggKIBAgDIAKBlIhKAEQhhAGgsAxQgtAxAABkIAAArIDcAAIAABmIjcAAIAAKhg");
	this.shape_7.setTransform(42.975,94.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AjBFiQhUgygshbQgvhcAAh5QAAh4AvhbQAshcBUgxQBUgyBtAAQBuAABUAyQBVAxAsBcQAuBbgBB4QABB5guBcQgsBbhVAyQhUAxhuAAQhtAAhUgxgAiujaQg/BNAACNQAACQA+BMQA9BMByAAQBzAAA9hLQA9hMAAiRQAAiNg+hNQg+hNhxAAQhxAAg9BNg");
	this.shape_8.setTransform(-29.35,111.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AiXFiQhUgygthaQguhaAAh5QAAh4AwhbQAuhcBWgzQBVgzByAAQBOAABKAcQBLAcAvAuIgrBgQhvhahwAAQh3AAhDBPQhDBNAACNQAACNBDBMQBDBMB3AAQBwAABvhZIArBfQgyAvhLAbQhLAbhQAAQhxAAhVgxg");
	this.shape_9.setTransform(-109.775,111.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8E6F45").s().p("EgnrAfGMgAJhipMBPnAlMMAACBh7g");
	this.shape_10.setTransform(-520.55,90.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#B4946D").s().p("Eh5KgEbMCi0gcUMBPhAlSMiixAcNg");
	this.shape_11.setTransform(0,-313.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#A98B67").s().p("EhRWgiyMCitgcRMAAABhqMiiqAceg");
	this.shape_12.setTransform(254.825,119.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.coffee, new cjs.Rectangle(-775.5,-523,1551,1046.1), null);


(lib.ClipGroup_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("Eh0ABNuMAAAibaMDoAAAAMAAACbag");
	mask_1.setTransform(1798,524.5);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#282926").s().p("AgfBxIhyiwIgDgIQgCgIAEgIQAOgZBEABQBDgBBQBwQAoA5AbA4g");
	this.shape.setTransform(2304.7917,241.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#282926").s().p("AiVBxIATgjQAXgrAZgjQBQhwBDABQBFgBANAZQAGAMgHAMIhxCwg");
	this.shape_1.setTransform(1792.8315,241.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#414340").ss(14).p("EAw6ARsMhhyAAAQgQAAgKgKQgLgLAAgPMAAAgiOQAAgQALgKQAKgLAQAAMBhyAAAQAPAAALALQALAKAAAQMAAAAiOQAAAPgLALQgLAKgPAAg");
	this.shape_2.setTransform(2052.35,120.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#282926").s().p("Egw4ARsQgQAAgKgKQgMgLAAgPMAAAgiOQAAgPAMgLQAKgLAQAAMBhxAAAQAQAAAKALQAMALgBAPMAAAAiOQABAPgMALQgKAKgQAAg");
	this.shape_3.setTransform(2052.35,120.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#282926").s().p("AiVBxIATgjQAXgrAZgjQBQhwBDABQBFgBANAZQAGAMgHAMIhxCwg");
	this.shape_4.setTransform(2284.5315,241.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#282926").s().p("AggBxIhxiwQgCgDgBgFQgCgIAEgIQANgZBFABQBDgBBQBwQAoA5AbA4g");
	this.shape_5.setTransform(1813.8417,241.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#593B2D").s().p("AgzKoIAA29IBnAAIAAYrg");
	this.shape_6.setTransform(2339.925,378.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#593B2D").s().p("AgzsVIBnAAIAAW9IhnBug");
	this.shape_7.setTransform(1762.425,378.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#593B2D").s().p("Eg22AAcIE3g3MBkxAAAIEFA3g");
	this.shape_8.setTransform(2051.15,252.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#634534").s().p("AibMWIAA4rIE2AAIAAYrg");
	this.shape_9.setTransform(1741.7,378.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#634534").s().p("AiaMWIAA4rIE1AAIAAYrg");
	this.shape_10.setTransform(2360.625,378.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#634534").s().p("Eg2AADdQgWAAgQgQQgRgQABgXIAAmCMBttAAAIAAGCQAAAXgQAQQgQAQgWAAg");
	this.shape_11.setTransform(2051.15,277.575);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#9DBC6C").s().p("Ai0KuQh5hDgGlYQgVnpAFinQAFiGAYhDQAchMA8gMQCrgiBLgCQA2gCBpATQBSAOAcBSQAQAuAABdIAALZQAADMgiBUQgxB4iQAJQhnAMgvADIgWAAQhCAAgogVg");
	this.shape_12.setTransform(2509.5929,397.472);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#B8D989").s().p("AirKnQh6hCgGlYQgCiIgQjpQgPjbgBhSQAAiLAag/QAfhJBKADQB5AEB8gVQBmgRA+ALQBTAPAcBRQAQAuAABdIAALaQAADMgjBUQgxB3iQAKQhoAMguACIgVABQhCAAgogWg");
	this.shape_13.setTransform(2494.1245,398.1115);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#7C6559").s().p("AmMBGQilgdABgpQgBgoClgdQCkgdDoAAQDpAACkAdQClAdAAAoQAAApilAdQilAdjoAAQjnAAilgdg");
	this.shape_14.setTransform(2502.15,468.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#9DBC6C").s().p("AgzHBQjdj9gFjpQgGjqAsjWQANhEARg5IAOgrIHaTeIhvA9QhthPhuh+g");
	this.shape_15.setTransform(2465.6441,283.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#B8D989").s().p("Ak7pvIBIArQBYA2BPA7QD8C9BICnQBICngEEZQgDCMgQBrIiJAog");
	this.shape_16.setTransform(2477.5855,280.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#9DBC6C").s().p("AjLKWQgsiHgSiuQgjleCIjLQCHjKCkieQBThOA3gmIlaVJg");
	this.shape_17.setTransform(2526.7658,262.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#B8D989").s().p("AkGKMIFa1JIAjBQQApBkAfBiQBkE7goC6QgnC7isDtQg1BKg9BGIgxA4g");
	this.shape_18.setTransform(2545.6612,264.725);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#9DBC6C").s().p("AhPGvQiUlAAujmQAujpBWjGQAbg+AbgzQANgaAJgNICmVjIhzAZQhShwhLifg");
	this.shape_19.setTransform(2482.3796,240.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#B8D989").s().p("AgpKwIim1jIA5BBQBFBQA7BUQC/EKAdC8QAeC7hBETQggCKgnBkg");
	this.shape_20.setTransform(2505.8129,239.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#F1AC28").s().p("EiGMAOqMAjzgdTMDEzAAAMAjzAdTg");
	this.shape_21.setTransform(1568.05,717.725);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#ECC07C").s().p("EiyLAWQMA1jgsfMD5RAAAMA1jAsfg");
	this.shape_22.setTransform(1571.525,717.7);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#ECD0A1").s().p("Ej1iAgAMBbSg/+ME0hAAAMBbSA/+g");
	this.shape_23.setTransform(1571.525,745.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#292637").s().p("Ej1iABOIAAibMHrFAAAIAACbg");
	this.shape_24.setTransform(1571.525,957.725);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#91796A").s().p("EiKFAtfMAAAha9MEULAAAMAAABa9g");
	this.shape_25.setTransform(1799.35,730.775);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(1055.6,27.2,1484.9,994.6999999999999), null);


(lib.Path_1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ArhCSQgeAAgXgWQgVgWgBgfIAAiNQABgfAVgWQAXgWAeAAIXCAAQAgAAAVAWQAXAWAAAfIAACNQAAAfgXAWQgVAWggAAg");
	this.shape_2.setTransform(81.25,14.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_2, new cjs.Rectangle(0,0,162.5,29.2), null);


(lib.Path_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ArhCSQgeAAgXgWQgVgWgBgfIAAiNQABgfAVgWQAXgWAeAAIXCAAQAgAAAVAWQAXAWAAAfIAACNQAAAfgXAWQgVAWggAAg");
	this.shape_3.setTransform(81.25,14.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,162.5,29.2), null);


(lib.ClipGroup_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("Eg2sgcqMBtVgAHMAAFA5dMhtXAAGg");
	mask_2.setTransform(366.5,238.6);

	// Layer_3
	this.instance_1 = new lib.Image_2();
	this.instance_1.setTransform(0,0,0.1546,0.1546);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(16.4,54.4,700.3000000000001,368.5), null);


(lib.Path_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F3D3A0").s().p("Eg0egB6MBGhgMRMAicAQJMhGfAMOg");
	this.shape.setTransform(335.9,90.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8, new cjs.Rectangle(0,0,671.8,181.6), null);


(lib.Group_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#352C2E").s().p("AokE9QjkiDAAi6QAAi4DkiEQDkiEFAAAQFCAADjCEQDkCEAAC4QAAC6jkCDQjjCDlCABQlAgBjkiDg");
	this.shape.setTransform(77.65,44.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_5, new cjs.Rectangle(0,0,155.3,89.7), null);


(lib.Path_21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#352C2E").s().p("AtjG3QjGhyAAiiQAAihDGhyQB2hECfgdQCagbCfAPQAQg8Avg3QAxg5BOgtQDFhyEYAAQEYAADGByQDGByAACiQAACijGBxQiGBNi1AaQg+AMhKAWQiUAsg8AyQgwA1hJAqQjFBykYAAQkYAAjGhyg");
	this.shape.setTransform(106.575,55.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_21, new cjs.Rectangle(0,0,213.2,110.7), null);


(lib.Path_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#71667C").s().p("EhUug4TMCpbBP/IACIFMibohMyMAAABajIt1Kyg");
	this.shape_4.setTransform(542.325,360.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7, new cjs.Rectangle(0,0,1084.7,720.9), null);


(lib.Path_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#847C8E").s().p("EhN+ALAMAAAhfUMCbmBJeMAAXBfKg");
	this.shape_5.setTransform(499.125,539.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9, new cjs.Rectangle(0,0,998.3,1079.3), null);


(lib.Path_10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#EFDFD4").s().p("EA5BAdQQmbgKnXg0Q3him39oMQ4FoPy4tsQl5kSkrkUQiViKhKhUIgusyMB77A6gQg6ADhUAAQhNAAhigCg");
	this.shape_6.setTransform(396.625,187.3941);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_10, new cjs.Rectangle(0,0,793.3,374.8), null);


(lib.Image_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Image_0();
	this.instance.setTransform(0,0,0.2749,0.2749);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Image_3, new cjs.Rectangle(0,0,128.7,287.6), null);


(lib.Path_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgUAMQgJgFAAgHQABgGAIgFQAJgFALAAQAMAAAJAFQAJAFAAAGQAAAHgJAFQgJAFgMAAQgLAAgJgFg");
	this.shape_1.setTransform(2.95,1.725);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1, new cjs.Rectangle(0,0,5.9,3.5), null);


(lib.CompoundPath = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AheA3QgngXgBggQAAgfAngXQAogXA3AAQA3AAAoAXQAoAXAAAfQAAAggnAXQgoAXg3AAQg4AAgngXgAhYgzQgmAWAAAdQABAeAlAVQAlAWA0AAQA0AAAlgVQAlgWAAgeQAAgdgmgVQglgWg0AAIgCAAQgzAAgjAVg");
	this.shape.setTransform(13.5003,7.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath, new cjs.Rectangle(0,0,27,15.6), null);


(lib.Group_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#726A70").s().p("AoYBnIMJmjIEnDKIrwGvg");
	this.shape.setTransform(53.65,31.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_3, new cjs.Rectangle(0,0,107.3,63.5), null);


(lib.Group_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#726A70").s().p("AkZA3IFzjkIDABwIl6Drg");
	this.shape.setTransform(28.225,17.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_2, new cjs.Rectangle(0,0,56.5,34.8), null);


(lib.Path_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E9ECF2").s().p("AhxffQpAgwmxkEQibhdhwhwIgCgBQjNiuiYk9QiZlAg7l/QhAmVA5mHQA+mrDGlaQCvkyCPi7QCKi2B5hYQiqFYgtGcQgqF6BFGDQBAFvCVEuQCVEuDFCnIACABQBxBwCaBdQHtEoIdBKQJ9BXHekQQEsiqAMlFQAsDHglDMQgmDQh1C4QkDGWoZChQm9CGm+AAQh9AAh8gLg");
	this.shape_2.setTransform(199.4702,202.5522);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_2, new cjs.Rectangle(0,0,399,405.1), null);


(lib.Path_1_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E9ECF2").s().p("AhPK8QpAgwmxkEQibhdhwhwIgCgBQijiKiEjqQiEjphPkiQBpDSBpCVQCcDgDKCnQIZHBNuBJQKtA5IVkAQC1hXCgh6QA4grCBhyQh5DEjFCRQjRCbkVBTQm9CFm9AAQh9AAh8gKg");
	this.shape_3.setTransform(186.4,71.0272);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_3, new cjs.Rectangle(0,0,372.8,142.1), null);


(lib.Path_11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E9ECF2").s().p("AIZEJQpGlAlMB1QjcBOj6g+Qh+gfhRgvQCqAQCzgXQFoguA1jCQA1jCBvhnQA4g0AtgMQgzAhglBBQhLCFBDCpQAjBaB3BIQAxAdDjBnQDSBgCRBfQDXCLCyDBQjii4kkigg");
	this.shape_7.setTransform(105.475,60.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_11, new cjs.Rectangle(0,0,211,121.8), null);


(lib.Path_8_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F1DBA2").s().p("A4Wg4MAgugFsIP/HfMgguAFqg");
	this.shape_1.setTransform(155.9,42.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8_1, new cjs.Rectangle(0,0,311.8,84.3), null);


(lib.Path_41 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACNHGIACsgImJBKIAAiRIH1heIAAP/g");
	this.shape.setTransform(25.05,51.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_41, new cjs.Rectangle(0,0,50.1,102.4), null);


(lib.Path_40 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACGEKIACo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_40, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_39 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIACo3Il4BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(23.975,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_39, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_38 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIACo4Il4BIIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_38, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_37 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIABo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_37, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_36 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACGEKIACo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_36, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_35 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIACo3Il4BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(23.975,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_35, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIACo3Il4BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_34, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIABo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_33, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACGEKIACo4Il3BIIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_32, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIACo3Il4BHIAAhGIHfhaIAAMNg");
	this.shape.setTransform(23.975,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_31, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIACo3Il4BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_30, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIABo3Il3BHIAAhGIHfhaIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_29, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_28 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("AjwmTIHhDkIAABKIlPi2IAAJAIiSBvg");
	this.shape.setTransform(24.1,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_28, new cjs.Rectangle(0,0,48.2,80.8), null);


(lib.Path_27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("ApgmTITBI9IAABLIwvoPIAAI/IiSBvg");
	this.shape.setTransform(60.925,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_27, new cjs.Rectangle(0,0,121.9,80.8), null);


(lib.Path_26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("AjwmTIHhDkIAABKIlOi2IAAJAIiTBvg");
	this.shape.setTransform(24.1,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_26, new cjs.Rectangle(0,0,48.2,80.8), null);


(lib.Path_25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("ApgmTITBI9IAABLIwvoPIAAI/IiSBvg");
	this.shape.setTransform(60.925,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_25, new cjs.Rectangle(0,0,121.9,80.8), null);


(lib.Path_24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("AjwmTIHhDkIAABKIlPi2IAAJAIiSBvg");
	this.shape.setTransform(24.1,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_24, new cjs.Rectangle(0,0,48.2,80.8), null);


(lib.Path_23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("ApgmTITBI9IAABKIwvoPIAAJAIiSBvg");
	this.shape.setTransform(60.925,40.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_23, new cjs.Rectangle(0,0,121.9,80.9), null);


(lib.Path_22 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("AjwmTIHhDkIAABKIlOi2IAAJAIiTBvg");
	this.shape.setTransform(24.1,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_22, new cjs.Rectangle(0,0,48.2,80.8), null);


(lib.Path_21_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6C6F83").s().p("ApgmTITBI9IAABKIwvoPIAAJAIiSBvg");
	this.shape_1.setTransform(60.925,40.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_21_1, new cjs.Rectangle(0,0,121.9,80.9), null);


(lib.Path_20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("AjwmTIHhDkIAABKIlPi2IAAJAIiSBvg");
	this.shape.setTransform(24.1,40.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_20, new cjs.Rectangle(0,0,48.2,80.9), null);


(lib.Path_19 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("ApgmTITBI9IAABLIwvoQIAAJAIiSBvg");
	this.shape.setTransform(60.925,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_19, new cjs.Rectangle(0,0,121.9,80.8), null);


(lib.Path_18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI5EKIACo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_18, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_17 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACGEKIACo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_17, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI6EKIABo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_16, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIABo3Il3BHIAAhGIHfhaIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_15, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI5EKIACo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_14, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI5EKIACo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_13, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_12_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AB8169").s().p("AygkLIGRhLIgDkXIeyOVIABEUImqAxg");
	this.shape.setTransform(118.475,62.15);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_12_0, new cjs.Rectangle(0,0,237,124.3), null);


(lib.Path_12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACGEKIACo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_12, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_11_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI6EKIABo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_11_1, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_10_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIABo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_10_1, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_9_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI5DCIACmnIzdDmIAAhEIVFj7IAAJ9g");
	this.shape.setTransform(67.475,31.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9_1, new cjs.Rectangle(0,0,135,63.8), null);


(lib.Path_8_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A1B5A3").s().p("AI5EKIACo4IzdDoIAAhFIVFj7IAAMNg");
	this.shape_2.setTransform(67.475,39.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8_2, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_7_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI5EKIACo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7_1, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_6_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACGEKIACo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_1, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_5_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI6EKIABo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_1, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_4_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIABo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_1, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A1B5A3").s().p("AI5EKIACo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape_1.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_1, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_2_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#6C6F83").s().p("AjwmTIHhDkIAABKIlOi1IAAI/IiTBvg");
	this.shape_3.setTransform(24.1,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_3, new cjs.Rectangle(0,0,48.2,80.8), null);


(lib.Path_1_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#6C6F83").s().p("ApgmTITBI9IAABLIwvoQIAAJAIiSBvg");
	this.shape_4.setTransform(60.925,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_4, new cjs.Rectangle(0,0,121.9,80.8), null);


(lib.Path_0_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A1B5A3").s().p("AI6EKIABo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape_2.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0_2, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_42 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A1B5A3").s().p("ACGEKIACo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape_8.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_42, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Tween51 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAtQgHgFgDgIQgEgHAAgLQAAgLAEgGQAEgJAGgDQAHgFAJAAQAHAAAGAEQAGAEADAGIAAgqIALAAIAABgIgLAAIAAgMQgDAGgGAEQgGADgHAAQgJAAgHgEgAgOgEQgFAFAAANQAAANAFAGQAFAHAJAAQAKAAAFgHQAGgHAAgMQAAgMgGgGQgFgGgKAAQgJAAgFAGg");
	this.shape.setTransform(21.8611,59.3198,0.9099,0.9099);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgSAiIAAhCIALAAIAAAMQAGgMAPgBIAFAAIAAAJIgHABQgKABgEAGQgFAFABAIIAAAlg");
	this.shape_1.setTransform(16.743,60.5709,0.9099,0.9099);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAfQgHgFgEgIQgEgIAAgKQAAgIAEgKQAEgHAHgEQAHgFAJAAQAKAAAGAFQAIADAEAIQAEAKAAAIQAAAKgEAIQgEAJgIAEQgGAEgKAAQgJAAgHgEgAgOgSQgGAGAAAMQAAAMAGAHQAEAGAKAAQAKAAAFgGQAFgHABgMQgBgLgFgHQgFgHgKAAQgJAAgFAHg");
	this.shape_2.setTransform(10.6013,60.6164,0.9099,0.9099);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AATAiIgTgzIgSAzIgLAAIgZhDIAMAAIATA1IAUg1IAIAAIATA1IAUg1IALAAIgZBDg");
	this.shape_3.setTransform(1.8892,60.6391,0.9099,0.9099);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgaAaIAEgIQAFAEAGACQAFACAGAAQAIAAAEgCQAEgDAAgFQAAgEgDgDQgDgCgGgBIgKgCQgJgDgEgDQgFgFAAgHQAAgJAHgFQAIgGAKAAQAGAAAIADQAGACAEAEIgDAIQgLgIgKAAQgGAAgEADQgEACAAAFQAAADADAEQACACAGACIAKACQAJACAFAEQAFAEAAAIQAAAJgIAEQgHAGgMAAQgQAAgKgJg");
	this.shape_4.setTransform(-6.2997,60.6164,0.9099,0.9099);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgaAaIAEgIQAGAEAFACQAFACAHAAQAGAAAFgCQAEgDAAgFQAAgFgDgCQgCgCgGgBIgLgCQgJgDgEgDQgEgFAAgHQAAgJAHgFQAHgGAKAAQAHAAAHADQAHACAEAEIgEAIQgKgIgLAAQgFAAgEADQgEACAAAFQAAAEACADQACACAGACIAKACQAJACAFAEQAFAEAAAIQAAAIgHAFQgIAGgMAAQgQAAgKgJg");
	this.shape_5.setTransform(-12.3504,60.6164,0.9099,0.9099);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgPAhQgFgDgDgFQgEgEAAgGQAAgIAEgEQAEgEAJgBQAIgCAQAAIADAAIAAgFQAAgHgEgFQgDgEgIAAQgLABgLAGIgEgIQAGgDAHgCQAIgDAFAAQANAAAGAGQAHAIAAAMIAAAqIgLAAIAAgLQgDAFgFAEQgFADgHAAQgGAAgGgCgAgDADQgHACgCACQgDACAAAFQAAAEAEAFQADADAHAAQAHAAAFgGQAGgFAAgJIAAgEIgDAAIgRABg");
	this.shape_6.setTransform(-18.7651,60.6164,0.9099,0.9099);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgiAxIAAhhIAlAAQAQAAAIAIQAJAHAAAOQAAAOgJAGQgJAIgPAAIgaAAIAAAogAgXAAIAZAAQAWAAABgTQgBgTgWAAIgZAAg");
	this.shape_7.setTransform(-25.6574,59.2743,0.9099,0.9099);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgUAaQgJgJAAgRQAAgIAEgJQAEgJAHgDQAHgFAJAAQAMAAAJAJQAHAJAAAPIAAADIgwAAQABAMAFAFQAGAHAKAAQAMgBAJgHIAEAIQgDADgIAEQgIACgGAAQgPAAgJgJgAgLgUQgGAHgBAIIAmAAQAAgJgFgGQgEgFgJAAQgIAAgFAFg");
	this.shape_8.setTransform(27.7259,25.222,0.9099,0.9099);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAlAiIAAgoQAAgKgDgEQgCgEgIAAQgKAAgEAFQgFAHAAAJIAAAlIgKAAIAAgoQABgKgEgEQgDgEgHAAQgJAAgFAFQgEAGAAAKIAAAlIgLAAIAAhCIALAAIAAALQADgHAFgCQAGgDAGAAQAPAAAFAMQADgFAFgEQAGgDAJAAQAWAAgBAaIAAApg");
	this.shape_9.setTransform(19.0593,25.1765,0.9099,0.9099);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgPAgQgGgCgDgFQgCgFAAgFQgBgIAEgFQAEgCAJgCQALgDAMAAIAEAAIAAgEQAAgIgEgEQgDgEgIAAQgKAAgMAIIgEgJQAFgEAIgCQAGgCAHAAQANAAAGAHQAHAGAAANIAAAqIgLAAIAAgMQgDAGgFADQgHAEgFAAQgGAAgGgDgAgEADQgFAAgEAEQgCACAAAEQAAAGAEADQAEAEAFAAQAIAAAFgGQAGgFAAgJIAAgEIgDAAQgOAAgEABg");
	this.shape_10.setTransform(10.279,25.222,0.9099,0.9099);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AASAiIAAgoQgBgKgDgEQgDgEgJAAQgJAAgEAFQgGAGAAAKIAAAlIgLAAIAAhCIALAAIAAALQADgGAGgDQAGgDAGAAQAZAAAAAaIAAApg");
	this.shape_11.setTransform(3.5003,25.1765,0.9099,0.9099);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgSAiIAAhCIALAAIAAAMQAFgMAQgBIAEAAIABAJIgHABQgLABgDAFQgFAGAAAIIAAAlg");
	this.shape_12.setTransform(-1.868,25.1765,0.9099,0.9099);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgUAaQgJgJAAgRQAAgKAEgHQAFgJAGgDQAHgFAJAAQANAAAHAJQAIAJAAAPIAAADIgwAAQABAMAFAFQAGAHAJAAQANgBAJgHIAEAIQgEADgIAEQgHACgHAAQgOAAgJgJgAgMgUQgEAGgCAJIAnAAQgCgKgEgFQgFgFgIAAQgIAAgGAFg");
	this.shape_13.setTransform(-7.8277,25.222,0.9099,0.9099);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgaAaIAEgIIALAGIALACQAIAAAEgDQAEgCAAgFQAAgEgDgDQgEgCgFgBIgKgDQgHgBgGgEQgFgFAAgHQAAgJAHgFQAHgGALAAQAIAAAGACQAFACAFAFIgDAIQgKgIgLAAQgGAAgEACQgEAEAAAEQAAAEADADQACACAGABIAKADQAJACAFAEQAFADAAAJQAAAIgIAFQgHAGgMAAQgQAAgKgJg");
	this.shape_14.setTransform(-14.1741,25.222,0.9099,0.9099);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgcAnQgKgJAAgUIAAg6IALAAIAAA7QAAAOAHAHQAHAHANAAQAOAAAGgHQAHgHAAgOIAAg7IAMAAIAAA6QAAASgKALQgKAKgTAAQgSAAgKgKg");
	this.shape_15.setTransform(-21.7261,23.9254,0.9099,0.9099);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgkA7IAAhyIAbAAIAAAVQAJgVAbgCIAJgBIACAZIgSACQgbADAAAaIAAA9g");
	this.shape_16.setTransform(73.7432,-29.6211,0.9099,0.9099);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgkArQgRgPABgcQAAgQAHgOQAHgNAMgIQANgHAPgBQAYABANAPQAOAOABAbIAAAHIhOAAQACAQAIAJQAIAHAPAAQASAAAQgMIAJAUQgJAHgMAEQgNADgKAAQgbABgRgRgAgPgfQgHAIgCAOIA0AAQAAgNgHgJQgGgHgMAAQgKAAgIAHg");
	this.shape_17.setTransform(63.2796,-29.5074,0.9099,0.9099);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgHBAQgMgLAAgWIAAgxIgWAAIAAgWIAWAAIAAgiIAdAAIAAAiIAeAAIAAAWIgeAAIAAAwQAAAYAVAAIALgBIgCAVIgNABQgYAAgKgLg");
	this.shape_18.setTransform(53.6576,-30.9632,0.9099,0.9099);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgkArQgQgQAAgbQAAgRAHgNQAHgNAMgIQANgHAPgBQAYABAOAPQANAOAAAbIAAAHIhNAAQACAQAIAJQAIAHAOAAQAUAAAPgMIAIAUQgHAGgNAFQgNADgLAAQgaABgRgRgAgPgfQgHAIgCAOIA0AAQgBgOgGgIQgGgHgMAAQgLAAgHAHg");
	this.shape_19.setTransform(44.2858,-29.5074,0.9099,0.9099);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ag/BTIAAikIBHAAQAaAAAPANQAPANAAAYQAAAYgPAMQgPAOgaAAIgpAAIAABAgAghgEIAlAAQAfAAABgbQgBgOgHgGQgJgHgPAAIglAAg");
	this.shape_20.setTransform(32.3891,-31.7821,0.9099,0.9099);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgkArQgQgPAAgcQAAgQAHgOQAGgNAOgIQANgHAOgBQAYABAOAPQANAOAAAbIAAAHIhMAAQAAAPAJAKQAJAHAOAAQATAAAPgMIAJAUQgJAHgLAEQgNADgMAAQgbABgQgRgAgPgfQgHAJgBANIAzAAQAAgNgHgJQgGgHgMAAQgKAAgIAHg");
	this.shape_21.setTransform(13.5318,-29.5074,0.9099,0.9099);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AA6A7IAAhFQAAgMgEgHQgFgFgKAAQgLAAgHAHQgGAJAAAOIAAA/IgdAAIAAhFQAAgMgEgHQgEgFgKAAQgMAAgGAHQgHAJAAAOIAAA/IgdAAIAAhyIAcAAIAAAQQAFgJAKgFQAJgEAMgBQAZAAAIAWQAEgJALgHQALgFAMgBQATAAAKAMQAJALAAAYIAABGg");
	this.shape_22.setTransform(-1.3903,-29.5984,0.9099,0.9099);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgeA0QgMgHgIgOQgHgMAAgTQAAgSAHgNQAHgOANgGQAOgIAQAAQARAAAOAIQANAGAHAOQAHAPAAAQQAAARgHAOQgIAOgMAHQgOAHgRAAQgQAAgOgHgAgVgaQgHAIAAASQAAASAHAKQAIAJANAAQAOAAAIgJQAHgKAAgSQAAgSgHgIQgIgKgOAAQgNAAgIAKg");
	this.shape_23.setTransform(-16.8128,-29.5074,0.9099,0.9099);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgXA0QgMgHgIgOQgHgOAAgQQAAgSAIgNQAHgNANgIQAOgHARgBQANABAKADQAMAEAHAHIgJAUQgHgFgHgDQgJgDgHAAQgPgBgIAKQgJAJAAARQAAASAJAJQAIAKAPAAQAHAAAJgEQAIgCAGgHIAJAVQgIAHgLAEQgNADgMAAQgRAAgNgHg");
	this.shape_24.setTransform(-27.8906,-29.5074,0.9099,0.9099);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgOBTIAAikIAdAAIAACkg");
	this.shape_25.setTransform(-36.0113,-31.7821,0.9099,0.9099);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgkArQgQgPAAgcQAAgQAHgOQAGgNAOgIQANgHAOgBQAYABAOAPQANAOAAAbIAAAHIhMAAQAAAPAJAKQAJAHAOAAQATAAAPgMIAJAUQgJAHgLAEQgNADgMAAQgbABgQgRgAgPgfQgHAJgBANIAzAAQAAgNgHgJQgGgHgMAAQgKAAgIAHg");
	this.shape_26.setTransform(-44.3822,-29.5074,0.9099,0.9099);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAqBTIgqh2IgpB2IgYAAIg6ikIAeAAIApB5IArh5IAVAAIApB6IArh6IAcAAIg6Ckg");
	this.shape_27.setTransform(-60.6236,-31.7821,0.9099,0.9099);

	this.instance = new lib.Path_6();
	this.instance.setTransform(2.35,60.05,0.9099,0.9099,0,0,0,81.2,14.6);
	this.instance.alpha = 0.5;

	this.instance_1 = new lib.Path_1_2();
	this.instance_1.setTransform(2.35,23.95,0.9099,0.9099,0,0,0,81.2,14.6);
	this.instance_1.alpha = 0.5;

	this.instance_2 = new lib.ClipGroup_2();
	this.instance_2.setTransform(-1.55,-10.35,0.9091,0.9993,0,0,0,364.8,228.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-333.1,-238.4,663,455.6);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CompoundPath();
	this.instance.setTransform(13.5,7.8,1,1,0,0,0,13.5,7.8);
	this.instance.alpha = 0.3203;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FAFCEE").s().p("AhPAuQgYgOgHgSIgCgHQgDgNAIgOQAIgPATgLQAhgTAvAAQAvABAhATQAkAUgCAcIgFARQgIAPgUAMQgiATgvAAQgugBghgTg");
	this.shape.setTransform(13.5172,13.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ECF0BB").s().p("AhZAAQgHgPgNgrQAHATAYAOQAiATAuAAQAuAAAigTQAUgMAIgPQgLAlgIAPQgdA7g+AAQg+AAgbg7g");
	this.shape_1.setTransform(13.4,21.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D2E1E5").s().p("AhfBNQgJgVgPgzQgPgzAAgPQAAggAngXQAogWA3AAQA3AAAoAXQAoAXAAAfQAAAQgPAyQgOAzgLAVQgfA+hAAAQhCAAgdg+g");
	this.shape_2.setTransform(13.5008,13.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#D2E1E5").s().p("AgPBCQgHgDAAg/QAAg+AHgEQAHgEAIABQAKAAAGAEQAHAEAAA9QAAA/gHADQgGAEgKAAQgIAAgHgEg");
	this.shape_3.setTransform(13.625,33.6222);

	this.instance_1 = new lib.Path_2_1();
	this.instance_1.setTransform(13.65,40,1,1,0,0,0,3,1.7);
	this.instance_1.alpha = 0.3203;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D2E1E5").s().p("Ag8AjQgZgOAAgVQAAgUAZgOQAZgPAjABQAjAAAaAOQAZAPAAATQAAAVgZAOQgZAPgkAAQgjAAgZgPg");
	this.shape_4.setTransform(13.625,42.9992);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.instance_1},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,27,48), null);


(lib.peter2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_28
	this.instance = new lib.notification2();
	this.instance.setTransform(842.4,231.95,1,1,0,0,0,-3.1,36);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).to({y:203.45,alpha:1},14).wait(113));

	// dog
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#4471B7").s().p("AT0TzIh1gSQg5gKg7gNQjrgwjehRQhygqhqgxQhxgzhkg6Qjch/ipibQhchUhNhaQhOhchChoQg+hhg1h2IhXjcQh9lEgthwQgfhOg7iJQgag8gWgtIgZgzIgSgfQg9gDg+gHQhSgKg+gTQgqgNgcgRQgUgNgMgNQgHgIgFgKIgHgTQgFgUACgUQACgTALgSQASgeAigUQgdAagKAfQgLAfAOAeIAIANQAEAGAFAEQAKAJAQAGQAaAMAlAGQA5AKBQABQBMABA/gFIAQgBIAQAQIAKANIA7BbQARAdAoBMQAnBLAOAfIAzBqQBaDFBgDtIBYDWQAuBlA9BhQA7BfBKBYQBIBXBTBOQBVBRBYBDQBbBFBhA9QC3BzDiBjQDOBaDnBGQD8BMDKAkQhogEiCgRg");
	this.shape.setTransform(619.5881,386.1699,0.9057,0.9057);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4471B7").s().p("AB3BWQj8gYjJhkQACgOALgVIAMgTIBFAZQBWAeBTAWQEHBHCIgcQAJAVgCAWQgBAMgDAHQgjADgoAAQg+AAhLgHg");
	this.shape_1.setTransform(731.4563,496.7664,0.9059,0.9059);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#352C2E").s().p("AgEAFQgBgCABgDIAAgGIAJAIQgCAFgDAAQAAAAAAAAQgBAAgBAAQAAgBgBAAQAAgBgBAAg");
	this.shape_2.setTransform(639.1485,647.9171,0.9059,0.9059);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C26F31").s().p("AATBSQhAg7gigaQgHgFgKgKIgPgSIgQgmQgIgXgGgeQASABAPANIAZAZQAUAVAOgDQANgCALgbQALACAFAJIAHATQARA3A2A7QALANAGAEQALAIAOgDQAGAUAFAJQAFAJAPAXIgCAAQg+AAg7gug");
	this.shape_3.setTransform(718.9617,616.3981,0.9059,0.9059);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#D0A66C").s().p("AgIgGQAHgFAPgEIAEAHQgLAVgZADQABgQAJgGg");
	this.shape_4.setTransform(666.9431,631.1407,0.9059,0.9059);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#202326").s().p("AgbBQQgOgJgBgSIACggQAAgXARgdQAUggAGgRQAVgGAHADQALAEAAAYIABA1QAAAegDAWIgRAHQgHAGgPAQQgGAGgIAAQgHAAgHgFg");
	this.shape_5.setTransform(632.2291,619.9652,0.9059,0.9059);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CECFCF").s().p("AhxgRIBCgzQgIANABAKQACAJAPADIBIAYQAuANAhgIQgGAOgJAHQgIAFgNgBQhggChOAxQAWg3gngeg");
	this.shape_6.setTransform(771.388,482.7619,0.9059,0.9059);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#9D692D").s().p("AAsBsQgGgEgMgOQg0g8gTg2IgHgTQgFgIgKgCIAbg7IAKAUQAKAaAJAEQALAGARgbQADgDAFgEIAKgFQAAA0AEAaQAFAqATAgIAGA4IgIAAQgJAAgIgFg");
	this.shape_7.setTransform(722.7889,612.2907,0.9059,0.9059);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#D0A66C").s().p("AhZAoQADgTAKgNQAKgPANgBQAmgEAjgVQAXgPAnggQAOApgKAkQgKAigcAIQgIgIgNAAIgXAAIhCAzQgggNAFgdg");
	this.shape_8.setTransform(766.7237,473.7034,0.9059,0.9059);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#D0A66C").s().p("AAQC1QgcgFghgXQgTgOgkghQgqgogigRQgNgRgGgMQgHgNgFgSIgFg3QANgzAJgFQAKgFAuAVQAGgIgDgdQgCgYAPgIQAqgXAeAZQgGA5AcA9QAIASA0BWQAWAjAgASQAdAQAqABIAbABQAPADAKAIQgjAtg5AJQgOACgSAAQgfAAgqgGg");
	this.shape_9.setTransform(747.8131,623.572,0.9059,0.9059);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#D0A66C").s().p("Aj3GvQgNgGgHgQQgHgOAAgSQB8gLgaiNQgIgtAQgvQAGgUAfg9QAMgYAYggQAdgmAOgUIgnAAQASgpAlglQASgTA0gqIBLg8QApgkAWgkQANgSAEgKQAHgRgLgQIgFgGQAagjA5gTQAPANgEAOQgDAJgOAOQghAlgQAxQgIAYgWAYIgpAnQhkBig+BVQgNASgHAgQgHAlgIAPQgZAsgXA9QgLAbgcBSQgSAxAXAeQAWAfA2AAIAggBQAdAXgRAQIgfAQQgtAXgvAAQgyAAg0gYg");
	this.shape_10.setTransform(651.8159,666.0219,0.9059,0.9059);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#BD7C33").s().p("AjbIhQg2AAgWgfQgXgeASgxQAchSALgbQAXg9AZgsQAIgPAHglQAHghANgSQA/hVBkhhIAognQAWgYAIgYQAQgxAhglQAOgOADgJQAEgOgPgNIAQgWQBagrAih1QAIgYAZg0IAaAbIgPBEQgJApAEAcQABAJgMAJQgOAJgKARQgHALgIAVQh8DSikCHQg8AygdBSQgKAdghA4QgfA3gKAgQgYBGADAmQAEA3A0AlIgcACIgEgBg");
	this.shape_11.setTransform(665.7131,650.8939,0.9059,0.9059);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#49494A").s().p("AA1DMQhAgwgggZQg4grgegqQgPgUgIgiQgFgSgGgrQgDgOANgLQAKgKARgGQA5gSAngSQAxgXAmgfQAhgaA2AVQAQAGAEASQABAIgBAaQABAOgFARIgMAfQgWA2gGASQgLApAGAlQAJA2gSBNQgEATgTAAQgQAAgOgLg");
	this.shape_12.setTransform(746.2271,464.8358,0.9059,0.9059);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#202326").s().p("AjTC9IAGgIQACgEAAgDQgCgLgRAEQgSAFgDgHQgBgEAGgRQBAigAdi/QADgSAMgZQAPgdADgMQADgHAFgDQAHgEAIACQALADAIAHQAHAHABALQADAbARA2QANAxgUAkQgMAXAmADQB2AKBYhLQAOgMAEgCQAKgGAMAFQANAFAJAKQAJAKABAJIAGBvQADBCAGAsIgKAGQgGADgCAEQgRAbgNgGQgIgEgLgaIgKgVIgbA7QgKAbgOACQgOADgTgVIgZgZQgQgNgSgBIgUhUQgEgRgIgDQgIgDgPAHQg3AegaA8IgagbQgZA0gHAYQgjB1haArQANg2Atg+g");
	this.shape_13.setTransform(701.5467,595.2133,0.9059,0.9059);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#49494A").s().p("AgUAFQgRgdALgdQASgDAOAFQAQAFAEAOQAQA2ggAhIgegyg");
	this.shape_14.setTransform(787.808,463.662,0.9059,0.9059);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#352C2E").s().p("ArvUpQAchaAGgWQACgIANh3QAIhMAhgsQAYgaAFgJQAOgVgDgXIgKgJQASgcAFgOQAKgZgSgWQAVgXAHgLQANgTAAgRQgJgIgOAEIgYAKQgcALgIgoIgMANQgIAHgLgDQAAgPAOgcQANgbgBgQQAEgWgBgfIgBg2QAAgYgLgEQgHgDgUAGQgDgCgEgTQgFgUgIgJQgFgFgGgPQgEgKgMgEQgTgGgKgNQgFgHgIgSQgJgVgCgIQgDgOABgTQABgJgEgFQgEgGgJAFQgRAJgFgJIgEgTQgBgFAGggQADgXgSgKQgRgHgHgFQgNgIAGgSQAJgPAAguQAAgoATgTQACgCABgGQAAgGgFgBQgEAAgIADIgSAIIA2hkQADgFABgJIABgQIgbAGQARgdAegfIA2g0QBVhQCYhIICBg6QBNgjAxgbQA+gjApgfQAzgoAkgwQAegoAphAIBChpQAPgXAJg1QAKg3ANgWQANgWAGgXQAIgfgBgwQgMhrBGhtQAagoArgbQAjgWA0gQQDBg9CqBnQAYAPAVAZQAPASASAfQALATAhARQAoAVAKAJQAHAWgIAjQgHAfgPAaQgnAhgWAOQgkAWgmAEQgNABgLAPQgKAOgDATQgEAdAfAMQAnAggVA3IgJAlQgPAKACAMQAIAugBBDIgDBwQAAAUALAaIAUAsIAIAQQABAIgSACQgKABAAALQAAAGADANQABAXAHAuIAFAmQgCAUgYAKQgFADgDANQgDAKAAAMQgDB7gtBIQgeAxgPBPIgYCDQg4AQgKAwQgDAOAFBNQABAOAFAUIAIAhQADAPgCAFQgDAJgPAAQgdgZgrAXQgPAIADAYQADAdgGAIQgugVgKAFQgKAFgNAzQgWgagEguQgCgOABhEQgEgegQhQQgOhFgDgpIABgUQgBgMgKgEQgMgFgKAGQgEACgOAMQhYBLh3gKQgmgDAMgXQATgkgMgxQgRg2gCgbQgBgLgIgHQgHgGgMgDQgHgCgHAEQgGACgCAHQgDAMgPAdQgMAZgDASQgeC/g/ChQgGARABAEQACAHATgFQARgEABALQABADgDAEIgFAIQgtA+gNA2IgQAWQg5ATgaAjQgMADAGAHQAGAHAFgLQALAQgHARQgEAKgNASQgWAkgpAkIhLA8Qg1AqgSATQglAlgSApIAnAAQgOAUgdAmQgYAhgMAYQgfA9gGAUQgQAvAIAtQAaCNh8ALQgNgxAXhYgAJk08QgmAfgyAXQgnASg5ASQgRAGgKAKQgNALADAOQAGArAFASQAIAjAPAUQAeAqA4ArQAgAZBBAwQAOALAQAAQATAAAEgTQAShNgJg2QgGglALgqQAGgSAWg2IAMgfQAFgRgBgOQABgagBgIQgEgSgQgGQgYgKgUAAQgZAAgSAPg");
	this.shape_15.setTransform(695.9491,568.121,0.9059,0.9059);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#B0B1AF").s().p("AhyAyQBOgxBhACQAMABAJgEQAJgHAGgPQgiAJgtgOIhIgYQgPgDgCgJQgCgKAJgNIAXAAQANAAAIAHQAlAfAfANQAmAOAlgKQgEAfgXARQgWAQgcgCQgogCgmAPQgeALgmAbQgEACgHABIgLACg");
	this.shape_16.setTransform(772.9732,484.3924,0.9059,0.9059);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#202326").s().p("Ag1BpQgMguAQgaQAJgPgBgUQAAgTgHgMQgdgugCgMIAAgRQABgKAEgGQAJgGAAgLQgBgNABgGQAUAKgCAWIgCAlQACAFgBANQACAIAQgJQAJgGAGAIQAEAGgBALQgCARAJAUIARAiQAHASACACQAIAHATgDQAUgFAFAWQAEALAEAaQgfAAghAbQgsAjgMAFIgOg4g");
	this.shape_17.setTransform(624.5039,600.5228,0.9059,0.9059);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#CECFCF").s().p("AgYCEQgpgEgfgZQAcgIAKgjQAKgjgOgpQAMgWgBgaQgBgSgIgeQADgJAGgGQAHgGAGAEQAOAIAkAEQAhAEAPAOQgLAcASAeIAeAxQADAbgTAhQgbAtgDAKQglAJgbAAIgLAAg");
	this.shape_18.setTransform(779.8989,467.9024,0.9059,0.9059);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#BD7C33").s().p("ABkELIgbgBQgqgBgdgQQgfgSgWgjQg1hXgIgSQgcg9AGg4QAOAAADgJQACgFgDgPIgIghQgEgUgBgOQgFhNADgOQAJgwA5gQQAEBMgBAtQgBBCgJA2QgIAtANBRQAUA6AQAWQAcAlAzADQAqACAtAiQAGAEgEANQgDANgHACQgKgIgPgDg");
	this.shape_19.setTransform(755.799,610.2381,0.9059,0.9059);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C26F31").s().p("AiQHLQgpgEgSgTQgRgSgCgqQgFhVARgzQASgvAJgbQARgygCghQgDh1A8hQIAYgfQAKgUgNgXQgDgFAJgQQAMgSAEgJIAJgTQgggLALgPQAUgPAEgGQAPgcAGgRQAJgZgBgYQAMgFArgkQAhgaAfgBIALAOQAJAQgMAKQgIARgUAgQgQAegBAYIgBAgQABASANAJQAQAKAOgLQAOgQAIgGIAQgHQABAQgNAbQgOAcAAAPQALADAIgHIAMgNQAIAoAcgLIAYgKQAOgEAJAIQAAARgNATQgHALgVAXQgTAGgVAXQgkAjgYAxQgHAOgiBQIgGANQgTAVgGAOQg7B1gFAkQgJBDBNAnQAOAHAAATQABATgNAOQgmAUgoABIgFABQgVAAg5gGg");
	this.shape_20.setTransform(623.4646,651.0755,0.9059,0.9059);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#EF8FAB").s().p("AA2AtQgPgBgGgSQgEgQgQgLIgOgJIhDgfIA+gCQA8gBADAKQAKAgABAcQABATgOAAIgBAAg");
	this.shape_21.setTransform(780.2682,483.7125,0.9059,0.9059);

	this.instance_1 = new lib.Path_21();
	this.instance_1.setTransform(683.7,664.2,0.9059,0.9059,0,0,0,106.6,55.3);
	this.instance_1.alpha = 0.0898;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape,p:{scaleX:0.9057,scaleY:0.9057,x:619.5881,y:386.1699}}]}).to({state:[{t:this.instance_1},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape,p:{scaleX:0.9058,scaleY:0.9058,x:619.6278,y:386.1953}}]},24).wait(127));

	// head
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#5C4241").s().p("AgBDTQgWAAgQgPQgPgQAAgXIAAk6QAAgWAPgQQAQgPAWgBIACAAQAWABAQAPQAQAQAAAWIAAE6QAAAXgQAQQgQAPgWAAg");
	this.shape_22.setTransform(428.942,152.3227,0.9048,0.9048);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#F69073").s().p("AgoBrQgkgdgPg0QgOgzARgtQARgsAmgLQAlgLAlAdQAlAeAOA0QAOAzgRAsQgRAtgmALQgKADgKAAQgbAAgbgWg");
	this.shape_23.setTransform(419.713,176.535,0.9048,0.9048);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#5C4241").s().p("AjcHCQg0gPgTgEQgogFgXgJQghgMgRgXQgOgSgLgpQg/jhgBhiQgEitB3iHQA8hDBwgnQBpgkB+gEQB9gDBwAdQB1AgBGA8QAcAYALAlQAMAlgLAiQgKAhgiAfQgbAYguAcQg9AmgSANQhmBIhOCMIh4C5QhdBFgsAUQgOAGgUAAQgTAAgXgFg");
	this.shape_24.setTransform(414.1105,151.854,0.9048,0.9048);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#F69073").s().p("AhfFRIi5jlQgXgiC8joQBeh0BhhtIDPAAIgFEJQgKEZgZBSQggBrhzAZQgdAHgcAAQhJAAg9gvg");
	this.shape_25.setTransform(421.477,169.516,0.9048,0.9048);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25,p:{scaleX:0.9048,scaleY:0.9048,x:421.477,y:169.516}},{t:this.shape_24,p:{scaleX:0.9048,scaleY:0.9048,x:414.1105,y:151.854}},{t:this.shape_23,p:{scaleX:0.9048,scaleY:0.9048,x:419.713,y:176.535}},{t:this.shape_22,p:{scaleX:0.9048,scaleY:0.9048,x:428.942,y:152.3227}}]}).to({state:[{t:this.shape_25,p:{scaleX:0.9053,scaleY:0.9053,x:421.7013,y:169.6072}},{t:this.shape_24,p:{scaleX:0.9053,scaleY:0.9053,x:414.3305,y:151.9351}},{t:this.shape_23,p:{scaleX:0.9053,scaleY:0.9053,x:419.9362,y:176.6302}},{t:this.shape_22,p:{scaleX:0.9053,scaleY:0.9053,x:429.1705,y:152.4041}}]},24).wait(127));

	// finger
	this.instance_2 = new lib.Symbol7();
	this.instance_2.setTransform(494.7,260.5,1,1,0,0,0,5.8,36.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:5.7,regY:19.9,x:494.6,y:243.8},0).wait(23).to({regX:5.8,regY:36.6,x:494.7,y:260.5},0).wait(1).to({regX:5.7,regY:19.9,x:494.6,y:243.8},0).wait(24).to({rotation:-2.9998,x:493.7},0).wait(1).to({rotation:-5.9996,x:492.85,y:243.9},0).wait(1).to({rotation:-8.9993,x:491.95,y:243.95},0).wait(1).to({rotation:-11.9991,x:491.15,y:244.1},0).wait(1).to({rotation:-14.9989,x:490.25,y:244.3},0).wait(1).to({rotation:-10.7062,x:491.5,y:244.1},0).wait(1).to({rotation:-6.4135,x:492.65,y:243.9},0).wait(1).to({rotation:-2.1207,x:493.95,y:243.8},0).wait(1).to({rotation:2.172,x:495.2},0).wait(1).to({rotation:6.4647,x:496.45,y:243.85},0).wait(93));

	// Rarm
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#DDE2E8").s().p("AgrJpQgJgEgFgJIgKgTQgYgygQg2IjpsgQgNgtAFguQAFguAWgpQAXgpAkgdQAkgdAtgNQAtgNAuAFQAuAFAqAWQAoAXAdAkQAdAkANAtIDpMeIAGAMQAEAIgCAIQgBAJgHAGIgNAMQiAB+iqBEQgNAHgVAHIgVAHQgFACgEAAQgFAAgFgDg");
	this.shape_26.setTransform(444.6588,289.2271,0.9049,0.9049);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#F69073").s().p("AgHLEQhagIhKg2QhshPg4inQgFgQgCgNIiQtoQgFgfgRgqIgZg9QgVg8A+gKQBMgNA/AuQA/AtANBMIEyNaQALgPALgUQAxhdAOhUQAOhVAmmbQAHhNA8gxQA8gyBNAHQBNAHAxA8QAyA8gHBNQgqHHgUBoQgOBJgWA5QgRAsgqBPQhCB9hgBFQhgBFhrAAIgYgBg");
	this.shape_27.setTransform(473.0133,310.7535,0.9054,0.9054);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#F69073").s().p("AhrCZQg0g6gFhWQgEhVAthAQAtg/BEgEQBDgDAzA6QA0A6AEBWQAFBVgtBAQgsA/hFAEIgIAAQg+AAgwg3g");
	this.shape_28.setTransform(505.3081,262.4595,0.9054,0.9054);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28,p:{scaleX:0.9054,scaleY:0.9054,x:505.3081,y:262.4595}},{t:this.shape_27,p:{scaleX:0.9054,scaleY:0.9054,x:473.0133,y:310.7535}},{t:this.shape_26,p:{scaleX:0.9049,scaleY:0.9049,x:444.6588,y:289.2271}}]}).to({state:[{t:this.shape_28,p:{scaleX:0.9056,scaleY:0.9056,x:505.4041,y:262.5105}},{t:this.shape_27,p:{scaleX:0.9056,scaleY:0.9056,x:473.1028,y:310.8142}},{t:this.shape_26,p:{scaleX:0.9053,scaleY:0.9053,x:444.8404,y:289.3493}}]},24).wait(127));

	// Layer_12
	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AA1B/IiphzQgJgHAEgJIAwhzQADgHAGgBQAHgCAFAEICpB3QAJAGgEAKIgwBvQgDAGgGABIgEABQgEAAgEgCg");
	this.shape_29.setTransform(505.5427,200.7499,0.9059,0.9059);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("ABIBPIiphyQgJgGAEgKIAKgVQADgGAGgCQAHgCAFAEICpBzQAJAGgFALIgJAUQgDAFgGACIgDAAQgFAAgEgCg");
	this.shape_30.setTransform(490.6212,232.7917,0.9059,0.9059);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("ABJBPIiphyQgKgGAFgLIAJgUQADgHAGgBQAHgCAFAEICpByQAJAHgEAKIgKAUQgCAGgHACIgEABQgEAAgDgDg");
	this.shape_31.setTransform(493.6458,226.3148,0.9059,0.9059);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("ABJBPIiqhyQgJgGAEgKIAKgVQADgGAGgCQAHgCAFAEICpBzQAJAHgEAKIgKATQgCAGgHACIgEABQgEAAgDgDg");
	this.shape_32.setTransform(496.6751,219.8052,0.9059,0.9059);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("ABDBeIiphyQgKgGAFgLIAUgyQADgGAGgCQAHgBAFADICpB3QAJAGgEAKIgVAuQgCAGgGABIgEABQgEAAgEgCg");
	this.shape_33.setTransform(500.4044,212.4225,0.9059,0.9059);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#DDE2E8").s().p("AgnFVIi0h7QgMgIgEgOQgEgOAGgNIDYntQAHgRASgFQATgFAPALICyB+QAMAIAEAOQADAOgFANIjXHpQgHARgSAGIgLABQgMAAgKgHg");
	this.shape_34.setTransform(498.3736,216.1172,0.9056,0.9056);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]},58).wait(93));

	// Layer_10
	this.instance_3 = new lib.Tween36("synched",0);
	this.instance_3.setTransform(498.5,216.2);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(24).to({_off:false},0).to({alpha:1},14).wait(113));

	// iphone
	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#484D52").s().p("AgnFVIi0h7QgMgIgEgOQgEgOAGgNIDYntQAHgRASgFQATgFAPALICyB+QAMAIAEAOQADAOgFANIjXHpQgHARgSAGIgLABQgMAAgKgHg");
	this.shape_35.setTransform(498.3342,216.0998,0.9055,0.9055);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#24262B").s().p("AgpF2IjWiXQgOgLAJgUIDpoWQAJgVAWgKQAYgKAOAKIDWCXQAOALgIAUIjqIWQgIAVgXAKQgLAFgKAAQgKAAgHgFg");
	this.shape_36.setTransform(498.2325,216.2515,0.9055,0.9055);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#24262B").s().p("AhXF1IioiYQgOgKAJgVIDhobQAJgUAagIQAbgIAPALIDWCXQAHAFABAIQACAIgEAKIjqIWQgTAfgpAHQgMACgJAAQgVAAgNgJg");
	this.shape_37.setTransform(500.8027,216.243,0.9055,0.9055);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]}).wait(151));

	// body
	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#DDE2E8").s().p("AjaNOQgPiCA2hrIA7hkQAig7AFgvQAGg+g9ktQg7kjAOhGQAHghAeg2QAfg5AIgdQAPg3gThKQgEgSgnhuQgahJAAg8QAAhKAqgsQAhghBDgTQAIgGAOgDQAhgJAwgFQAlAnAUAyQAVAyACA2IBLdKIiiA0QhaAhhmALQhHhtgPh7g");
	this.shape_38.setTransform(435.1507,332.2196,0.9048,0.9048);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#E2E8F2").s().p("AAmS+QiJggh5hKIlijOQgngXgbglQgfgpABgmIA646QAAhyA5hiQA5hjBig5QA8gjBqAAQAsAAAwAGQB3AOB8AtQB4ArBJAyICdBjQAlAXAcAeQAlAnAUAxQAVAyACA3IBLdKIiiA0QhbAghmALQgtAFgtAAQhfAAhdgVg");
	this.shape_39.setTransform(394.5355,318.4043,0.9048,0.9048);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#DDE2E8").s().p("AB7PBQg1gRgZgpIkzn6QhDhtgciAQgpi7AzjAICopzQAQg4A9glQA8gkBFAGQBGAGAnAsQAnAtgPA4IioJzQgqCdArCWQAUBKAnBCIE0H6QAeAxgZA4QgaA3hBAdQgZAKgQAEQgaAGgYAAQgfAAgdgKg");
	this.shape_40.setTransform(356.2431,304.8548,0.9048,0.9048);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38}]}).wait(151));

	// neck
	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F69073").s().p("AglEDQhIgGgwgdQgzgeAFgqIBKmdIFNAAIgTCOQgUCjgJBvQAJBNhMAWQgbAIgtAAQgYAAgegDg");
	this.shape_41.setTransform(397.509,198.5419,0.9049,0.9049);

	this.timeline.addTween(cjs.Tween.get(this.shape_41).wait(151));

	// Larm
	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F69073").s().p("Ah/CdQg1hBAAhcQAAhbA1hBQA1hBBKAAQBLAAA1BBQA1BBAABbQAABcg1BBQg1BBhLAAQhKAAg1hBg");
	this.shape_42.setTransform(481.9363,235.0184,0.9055,0.9055);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F69073").s().p("AhFlSIB3i9QAqhBBMgQQBMgQBBAqQBBAqAQBMQAQBMgqBBIh1C3QisEUhlCAQinDTjICKg");
	this.shape_43.setTransform(455.5896,289.1035,0.9054,0.9054);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_43},{t:this.shape_42}]}).wait(151));

	// legs
	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#4471B7").s().p("AFhasQg0AAgngjQgmgkgFg0QAckLAUkyQAopjgkjAIjTsaIgFACIi8igIBBNgIiTSVQADA7gqApQgqApg7gEIhBgFQgugDgigfQghgggHgtIAI1tQgHgqi0wYIAAl5IQwimIDgIZICQU1IiNWDQAAA3gnAoQgnAng4AAg");
	this.shape_44.setTransform(400.9268,515.6541,0.9049,0.9049);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#E2E8F2").s().p("AgCDFQgtAAgfgfQggghAAgsIAAixQAAgsAgggQAfggAtAAIAFAAQAtAAAgAgQAfAgAAAsIAACxQAAAsgfAhQggAfgtAAg");
	this.shape_45.setTransform(435.0203,667.842,0.9049,0.9049);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#E2E8F2").s().p("AgCDFQguAAgggiQggghABguIACiqQAAgvAhggQAhgfAtAAQAuAAAhAhQAgAigBAtIgCCrQgBAughAgQggAggsAAIgCAAg");
	this.shape_46.setTransform(365.2948,640.5129,0.9049,0.9049);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#4471B7").s().p("ABAC4Qg8gRgegEQgbgEgugBQg2AAgTgBQgogEhWgWQgtgMgQgRQgRgRgHgdQgDgTgBgjQAAgnACgVQAEgiALgZQAMgdAZgTQALgKANgEQAEgFAHgDQAVgLAZABQBBABBMAaQAuAQBWAoIEKB5QAfAOANAIQAXAOAOARQAQAUADAZQADAagPATQgOARglALQhGAUhHAAQg7AAg8gOg");
	this.shape_47.setTransform(453.1417,690.7119,0.9049,0.9049);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#4471B7").s().p("Ak1CZQgLgjACg9QACgtAIgeQgKg+BqgfQA5gRBfgMQAsgKCFg2QB7gpAxAmQAhAagCAxQgDAtgdAkQgxA8h1BAQhAAjh5BBQgiAUgSAKQgeAPgaAGIgRACQhIgVgxg0g");
	this.shape_48.setTransform(380.6022,654.2275,0.9049,0.9049);

	this.instance_4 = new lib.Group_5();
	this.instance_4.setTransform(422.65,675.35,0.9059,0.9059,0,0,0,77.7,44.9);
	this.instance_4.alpha = 0.0898;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44}]}).wait(151));

	// grass
	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#92CF9F").s().p("Eh0NBPKMAAAieTMDobAAAMAAACeTg");
	this.shape_49.setTransform(743.775,498.925);

	this.timeline.addTween(cjs.Tween.get(this.shape_49).wait(151));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-7.6,1487.6,1013.1);


(lib.LMdevicemanagement = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1B1516").s().p("AgFBKQgNgMAAgWIAAhEIgZAAIAAgSIAZAAIAAgoIAWAAIAAAoIAkAAIAAASIgkAAIAABCQgBAfAdAAIAMgBIgBASIgNABQgYAAgLgNg");
	this.shape.setTransform(168.3,155.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1516").s().p("AAjBDIAAhQQAAgSgIgJQgHgIgPAAQgRAAgLALQgLALAAATIAABKIgVAAIAAiCIAVAAIAAAVQAGgMAMgGQALgGAPAAQAuAAAAA0IAABRg");
	this.shape_1.setTransform(156.1,157.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1B1516").s().p("AgpAyQgRgSAAggQAAgTAIgQQAHgPAPgJQAOgIARAAQAaAAAPARQAPARAAAeIAAAHIhfAAQABAXALAMQALALAVAAQAXAAATgPIAHAQQgJAIgNAEQgOAFgOAAQgeAAgSgSgAAogJQgBgUgJgLQgJgKgSAAQgQAAgLAKQgKALgCAUIBMAAIAAAAg");
	this.shape_2.setTransform(141.35,157.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1516").s().p("ABJBDIAAhQQAAgSgGgJQgHgIgNAAQgRAAgJALQgKALAAATIAABKIgVAAIAAhQQAAgTgHgIQgGgIgOAAQgRAAgJALQgKALAAATIAABKIgVAAIAAiCIAVAAIAAAVQAGgMALgGQAKgGAOAAQAeAAAJAZQAGgMALgHQAMgGAPAAQAsAAAAA0IAABRg");
	this.shape_3.setTransform(122.75,157.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1B1516").s().p("AgpAyQgRgSAAggQAAgTAIgQQAHgPAPgJQAOgIARAAQAaAAAPARQAPARAAAeIAAAHIhfAAQABAXALAMQALALAVAAQAWAAATgPIAIAQQgJAIgNAEQgOAFgOAAQgeAAgSgSgAAogJQgBgUgJgLQgKgKgRAAQgQAAgLAKQgKALgBAUIBLAAIAAAAg");
	this.shape_4.setTransform(104.15,157.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1B1516").s().p("Ag2BKIAHgQQANAJAMAEQALAEAOgBQATABAJgLQAKgJAAgUIAAgXQgGAMgLAHQgMAHgPAAQgRAAgOgIQgNgJgHgOQgIgOAAgTQAAgUAIgPQAHgPANgHQAOgIARAAQAPgBALAHQAMAGAGANIAAgWIAWAAIAAB5QAAAdgPAQQgQAPgdgBQgiABgXgTgAgdg9QgLANAAAWQAAAWALAMQALAMASAAQATAAALgMQALgMAAgWQAAgWgLgNQgKgMgUAAQgSAAgLAMg");
	this.shape_5.setTransform(88.725,159.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1B1516").s().p("AgdA/QgMgFgFgJQgHgKAAgLQAAgOAIgJQAHgHASgEQARgDAeAAIAGAAIAAgJQAAgRgHgHQgHgHgPAAQgWAAgWAOIgHgQQAKgIAOgEQAOgEANAAQAaAAAMAMQAMANAAAaIAABSIgVAAIAAgWQgGALgKAHQgKAGgOAAQgMAAgKgFgAgIAGQgMACgFAFQgGAEABAKQgBAKAIAHQAIAHAMAAQAOAAALgLQALgLAAgRIAAgIIgGAAQgXAAgMACg");
	this.shape_6.setTransform(73.85,157.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1B1516").s().p("AAjBDIAAhQQAAgSgIgJQgGgIgQAAQgRAAgLALQgLALAAATIAABKIgWAAIAAiCIAWAAIAAAVQAGgMAMgGQALgGAOAAQAwAAAAA0IAABRg");
	this.shape_7.setTransform(59.3,157.175);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1B1516").s().p("AgdA/QgMgFgFgJQgHgKAAgLQAAgOAHgJQAIgHASgEQARgDAdAAIAHAAIAAgJQgBgRgGgHQgHgHgPAAQgWAAgWAOIgHgQQAKgIAOgEQAOgEANAAQAaAAAMAMQAMANAAAaIAABSIgVAAIAAgWQgGALgKAHQgLAGgNAAQgMAAgKgFgAgIAGQgMACgFAFQgGAEABAKQgBAKAIAHQAIAHAMAAQAOAAALgLQALgLAAgRIAAgIIgGAAQgXAAgMACg");
	this.shape_8.setTransform(44.25,157.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1B1516").s().p("ABGBfIAAiSIg+B0IgPAAIg+hzIAACRIgUAAIAAi9IATAAIBHCJIBHiJIASAAIAAC9g");
	this.shape_9.setTransform(25.95,154.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1B1516").s().p("AgoAyQgSgSAAggQAAgTAIgQQAIgPAOgJQAOgIARAAQAaAAAPARQAPARAAAeIAAAHIhfAAQABAXALAMQALALAVAAQAWAAAUgPIAHAQQgJAIgOAEQgNAFgOAAQgeAAgRgSgAAogJQgBgUgJgLQgKgKgQAAQgRAAgLAKQgKALgCAUIBMAAIAAAAg");
	this.shape_10.setTransform(0.6,157.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#1B1516").s().p("AgZA8QgOgJgIgPQgHgPAAgVQAAgTAIgQQAIgPAOgJQAOgIATAAQANAAANAEQAMAFAIAIIgHAQQgTgPgTAAQgTAAgLANQgMANAAAXQAAAYAMANQALANATAAQATAAATgPIAHAQQgIAIgNAFQgMAEgOAAQgSAAgPgIg");
	this.shape_11.setTransform(-12.675,157.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#1B1516").s().p("AgKBeIAAiCIAVAAIAACCgAgMhFIAAgYIAZAAIAAAYg");
	this.shape_12.setTransform(-22.575,154.475);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#1B1516").s().p("AgKBBIg4iBIAXAAIArBqIAthqIAWAAIg5CBg");
	this.shape_13.setTransform(-32.6,157.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#1B1516").s().p("AgpAyQgRgSAAggQAAgTAIgQQAHgPAPgJQAOgIARAAQAaAAAPARQAPARAAAeIAAAHIhfAAQABAXALAMQALALAVAAQAWAAATgPIAIAQQgJAIgNAEQgOAFgOAAQgeAAgSgSgAAogJQgBgUgJgLQgKgKgRAAQgQAAgLAKQgKALgBAUIBLAAIAAAAg");
	this.shape_14.setTransform(-46.6,157.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#1B1516").s().p("AhPBfIAAi9IBAAAQAtAAAZAZQAZAYAAAtQAAAugZAYQgZAZgtAAgAg5BMIApAAQBJAAAAhMQAAhLhJAAIgpAAg");
	this.shape_15.setTransform(-63.375,154.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#1B1516").s().p("AAjBDIAAhQQAAgSgIgJQgHgIgPAAQgRAAgLALQgLALAAATIAABKIgVAAIAAiCIAVAAIAAAVQAGgMAMgGQALgGAOAAQAvAAAAA0IAABRg");
	this.shape_16.setTransform(-88.25,157.175);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#1B1516").s().p("AgkBDIAAiCIAVAAIAAAXQALgXAfgDIAIAAIACASIgOACQgVACgIAKQgJALAAAQIAABKg");
	this.shape_17.setTransform(-99.675,157.175);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#1B1516").s().p("AgoAyQgSgSAAggQAAgTAIgQQAIgPAOgJQAOgIARAAQAaAAAPARQAPARAAAeIAAAHIhfAAQABAXALAMQAMALATAAQAYAAASgPIAIAQQgJAIgOAEQgNAFgOAAQgeAAgRgSgAAogJQgBgUgJgLQgJgKgRAAQgRAAgKAKQgLALgCAUIBMAAIAAAAg");
	this.shape_18.setTransform(-112.5,157.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#1B1516").s().p("AgiBYQgNgJgHgQQgHgPAAgVQAAgUAHgOQAHgQANgIQAOgIARAAQAOAAAMAGQALAHAGAMIAAhRIAWAAIAAC9IgWAAIAAgYQgGANgLAGQgMAHgOAAQgRAAgOgIgAgdgIQgKAMAAAXQAAAYAKAOQALANASAAQAUAAAKgNQAKgNAAgYQAAgYgKgMQgKgNgUAAQgSAAgLANg");
	this.shape_19.setTransform(-127.875,154.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#1B1516").s().p("AggA8QgOgJgIgPQgHgQAAgUQAAgUAHgPQAIgQAOgIQAOgIASAAQATAAANAIQAPAIAIAQQAHAPABAUQgBAUgHAQQgIAPgPAJQgNAIgTAAQgSAAgOgIgAgdgkQgLANAAAXQAAAYALANQALANASAAQATAAAKgNQALgNAAgYQAAgXgLgNQgKgNgTAAQgSAAgLANg");
	this.shape_20.setTransform(-142.8,157.275);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#1B1516").s().p("ABFBfIABiSIg+B0IgOAAIg+hzIAACRIgVAAIAAi9IASAAIBHCJIBHiJIATAAIAAC9g");
	this.shape_21.setTransform(-161.65,154.375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgDALIgDgDIgBgFIABgDIADgDIADgBIADABIACACIAAgKIADAAIAAAXIgDAAIAAgDIgCACIgDABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAgAgDAAQAAAAAAAAQgBAAAAABQAAAAAAABQAAAAAAABQAAADABACQABABAAAAQAAAAABAAQAAABABAAQAAAAAAAAQAAAAABAAQAAAAABgBQAAAAABAAQAAAAABgBQABgCAAgDQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBABg");
	this.shape_22.setTransform(5.675,-60.375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgEAJIAAgQIADAAIAAADQABgDAEAAIABAAIAAACIgCAAQgBAAAAAAQgBAAAAAAQgBABAAAAQAAAAAAAAIgBAEIAAAJg");
	this.shape_23.setTransform(4.275,-60.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgDAHQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBAAAAgBIgBgEIABgEQAAAAABgBQAAAAAAgBQABAAAAAAQABgBAAAAIADgBIAEABQAAAAABABQAAAAABAAQAAABAAAAQABABAAAAIABAEIgBAEQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBgAgDgEIgBAEIABAFQAAAAABAAQAAABABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAgBQABAAAAAAIABgFIgBgEQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAABQgBAAAAAAg");
	this.shape_24.setTransform(2.6,-60.025);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AAFAIIgFgMIgEAMIgCAAIgGgPIACAAIAFAMIAEgMIACAAIAFAMIAFgMIADAAIgHAPg");
	this.shape_25.setTransform(0.25,-60.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgFAGIABgCQAAABAAAAQAAAAABAAQAAABAAAAQABAAAAAAIACAAIADAAIABgCIAAgCIgDgBIgCAAIgDgBIgBgDQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAIADgCIAEABIACABIAAACIgGgCIgCABIgBACIABACIACABIACAAIAEABIAAADQAAAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgCACgDAAQgDAAgCgDg");
	this.shape_26.setTransform(-2,-60.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgGAGIABgCIADACIACAAIADAAIABgCIgBgCIgCgBIgBAAIgEgBIgBgDQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAIAEABIADABIgBACIgGgCIgBABIgBACIABACIABABIACAAIAEABIABADQAAAAgBABQAAAAAAABQAAAAAAAAQgBABAAAAQgBACgEAAQgDAAgDgDg");
	this.shape_27.setTransform(-3.65,-60.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgDAIIgCgCIgBgCQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAIAFAAIABAAIAAgCIgBgDIgDAAIgEABIgBgCIADgBIACgBQAEAAABACQACABAAAEIAAAJIgDAAIAAgDIgCADIgCABgAAAABIgCABQAAAAgBAAQAAAAAAAAQAAAAAAABQAAAAAAAAIABACIACABQAAAAAAAAQABAAAAAAQABAAAAgBQAAAAABAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAgBIAAgBIgBAAg");
	this.shape_28.setTransform(-5.375,-60.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgIAMIAAgXIAJAAQAEAAACACQACABAAAEQAAAEgCABQgCABgEAAIgGAAIAAAKgAgFAAIAGAAQAFAAAAgEQAAgFgFABIgGAAg");
	this.shape_29.setTransform(-7.275,-60.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgFAGQgCgCABgEQAAAAAAAAQAAgBAAgBQAAAAAAgBQAAAAAAAAIADgEIAEgBQACAAACADQADACAAADIAAABIgMAAIACAEQAAAAABAAQAAABAAAAQABAAAAAAQAAAAABAAQADAAACgCIABACIgDACIgDABQgDAAgDgDgAgCgEIgCAEIAJAAQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAABg");
	this.shape_30.setTransform(6.05,-69.675);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAJAIIAAgJIAAgDIgEgBQAAAAAAAAQgBAAAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAABAAAAQAAABAAAAIAAAIIgBAAIAAgJIgCgDIgCgBQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAAAABIgBADIAAAIIgDAAIAAgPIADAAIAAADIACgCIACgCQAEAAABAEQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAAAAAIADgCQAGAAAAAHIAAAJg");
	this.shape_31.setTransform(3.7,-69.7);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgDAIIgCgCIgBgCIABgDIADgBIAGAAIAAgBIgBgDIgCgBIgFABIgBgCIADgBIADgBQAAAAABAAQABAAAAABQABAAAAAAQABABAAAAQABABAAAAQAAABAAAAQABABAAAAQAAABAAABIAAAJIgDAAIAAgCIgCACIgCABgAgCACIgBABIABADIACAAQAAAAABAAQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAAAgBQABAAAAAAQAAgBAAAAQAAgBAAAAIAAgBIgEAAg");
	this.shape_32.setTransform(1.275,-69.675);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAFAIIAAgJIgBgDIgDgBQgBAAAAAAQAAAAAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABAAAAIAAAIIgDAAIAAgPIADAAIAAADIACgCIACgCQAGAAAAAHIAAAJg");
	this.shape_33.setTransform(-0.575,-69.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgEAIIAAgPIADAAIAAADQABgDAEgBIABAAIAAADIgCAAIgDACIgBADIAAAIg");
	this.shape_34.setTransform(-2.025,-69.7);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgEAGQgCgCgBgEIABgDIAEgEIACgBQAEAAACADQACABAAAEIAAABIgLAAQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAABQAAAAABAAQAAABABAAQAAAAAAAAQAAAAABAAQAEAAACgCIABACIgDACIgEABQgDAAgCgDgAgCgEQAAAAgBABQAAAAAAAAQAAABAAABQAAAAAAABIAIAAIgBgEIgEgBIgCABg");
	this.shape_35.setTransform(-3.65,-69.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgGAHIABgDIADACIACAAIADAAIABgCIgBgCIgCgBIgCAAIgDgBIgBgDQAAAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAIAEABIACACIgBACQgCgCgDAAIgBAAIgBACIAAACIACABIACAAIAEABIABADQAAAAAAABQAAABgBAAQAAABAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAQgBABAAAAQgBAAgBAAQgCAAgEgCg");
	this.shape_36.setTransform(-5.375,-69.675);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgGAKQgDgDAAgFIAAgNIADAAIAAAOQAAADACACQACACACAAQADAAACgCQACgCAAgDIAAgOIADAAIAAANQAAAFgDADQgCACgFAAQgDAAgDgCg");
	this.shape_37.setTransform(-7.425,-70.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgIAOIAAgbIAGAAIAAAGQACgGAGAAIADgBIAAAHIgEAAQgGABAAAGIAAAOg");
	this.shape_38.setTransform(18.575,-84.6);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgIALQgEgEAAgHIABgHIAFgFQAEgCACAAQAGAAAEAEQADAFAAAFIAAACIgSAAQABAEABABQACACADAAQAEAAAFgDIACAFIgFADIgGABQgHAAgDgEgAgDgHIgCAGIAMAAQAAgDgCgDQAAAAgBgBQAAAAgBAAQAAAAgBgBQgBAAAAAAIgEACg");
	this.shape_39.setTransform(15.725,-84.575);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAHASQgFAAgDgCQgDgDAAgFIAAgMIgFAAIAAgFIAFAAIAAgIIAGAAIAAAIIAIAAIAAAFIgIAAIAAAMQABAFAEAAIADAAIAAAFg");
	this.shape_40.setTransform(13.1,-84.95);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgIALQgEgEAAgHIACgHQACgDADgCQAEgCACAAQAGAAADAEQADAEAAAGIAAACIgSAAQAAADACACQACACADAAQAFAAAEgDIACAFIgFADIgGABQgGAAgEgEgAgDgHQgCADAAADIAMAAQAAgEgCgCQAAAAgBgBQAAAAgBAAQAAAAgBgBQgBAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAg");
	this.shape_41.setTransform(10.525,-84.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgPAUIAAgnIARAAQAHAAADADQAEAEAAAFQAAAGgEACQgEAEgGAAIgJAAIAAAPgAgHAAIAIAAQAIAAAAgHQAAgDgCgCQgCgCgEAAIgIAAg");
	this.shape_42.setTransform(7.3,-85.175);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgIALQgEgEAAgHQAAgDACgEQACgDACgCIAHgCQAGAAADAEQADAEAAAGIAAACIgSAAQABAEABABQACACADAAQAFAAAEgDIACAFIgFADIgGABQgGAAgEgEgAgDgHIgCAGIAMAAIgCgGQAAAAgBgBQAAAAgBAAQAAAAgBgBQgBAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAg");
	this.shape_43.setTransform(2.175,-84.575);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AAOAOIAAgPIgBgFQAAAAgBgBQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAgBAAQgBACAAAEIAAAOIgHAAIAAgPIgBgFQAAAAAAgBQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAgBAAQgBACAAAEIAAAOIgIAAIAAgbIAHAAIAAAFIAEgEQACgBADgBQAFABADAFQAAgCADgCIAGgCQAFAAACAEQADADAAAGIAAAPg");
	this.shape_44.setTransform(-1.875,-84.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgHANQgDgDgCgCQgCgEAAgEIACgHQACgDADgCQAEgCADAAQAFAAADACIAFAFIABAHQAAAFgBADIgFAFQgDACgFAAgAgEgGQgCACAAAEQAAAFACACQACACACAAQAEAAABgCQADgCAAgFQAAgEgDgCQgBgCgEAAQgCAAgCACg");
	this.shape_45.setTransform(-6.1,-84.575);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgFANIgFgFQgBgDgBgFQAAgDACgEQACgDAEgCQADgCADAAIAGABQADABACACIgCAFIgEgCIgEgBQgDAAgCACQgCACAAAEQAAAFACACQACACADAAIAEgBIAEgCIACAFQgCACgDABIgGABIgHgCg");
	this.shape_46.setTransform(-9.1,-84.575);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgCAUIAAgnIAFAAIAAAng");
	this.shape_47.setTransform(-11.3,-85.175);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgIALQgEgEAAgHIABgHIAFgFQAEgCADAAQAGAAADAEQADAEAAAGIAAACIgSAAQABAEABABQACACADAAQAFAAAEgDIACAFIgFADIgGABQgHAAgDgEgAgDgHIgCAGIAMAAQAAgDgCgDQAAAAgBgBQAAAAgBAAQAAAAgBgBQgBAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAg");
	this.shape_48.setTransform(-13.575,-84.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAKAUIgKgcIgKAcIgGAAIgOgnIAIAAIAKAdIAKgdIAFAAIAKAdIAKgdIAIAAIgPAng");
	this.shape_49.setTransform(-17.975,-85.175);

	this.instance = new lib.Path_5();
	this.instance.setTransform(-0.85,-60.2,1,1,0,0,0,20.1,3.6);
	this.instance.alpha = 0.5;

	this.instance_1 = new lib.Path_1_1();
	this.instance_1.setTransform(-0.85,-70.05,1,1,0,0,0,20.1,3.6);
	this.instance_1.alpha = 0.5;

	this.instance_2 = new lib.ClipGroup();
	this.instance_2.setTransform(-2.1,-73.8,1,1,0,0,0,90.2,56.4);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FDFDFE").s().p("AgWAXQgKgJAAgOQAAgNAKgJQAJgKANAAQANAAAKAKQAKAJAAANQAAAOgKAJQgJAKgOAAQgNAAgJgKg");
	this.shape_50.setTransform(-1,-12.575);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#211C1A").s().p("AtinFIbEgCIABOOI7EABg");
	this.shape_51.setTransform(-1.575,-71.125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#BFBFC0").s().p("AtinmIbEgCIABPPI7EACg");
	this.shape_52.setTransform(-1.575,-67.875);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#DCDDE2").s().p("AuCJUQgbgaAAgmIgBwlQAAgmAbgaQAagbAmAAIaFgCQAmAAAbAbQAbAaAAAmIABQlQgBAmgaAbQgbAaglAAI6FACQgmAAgbgbg");
	this.shape_53.setTransform(-1.5,-67.875);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#BFBFC0").s().p("AljBcQgCgEADgFIBAiwQACgCADAAIJOAAQADAAACACIAuCvQACAOgKAAIq3AAQgGAAgCgEg");
	this.shape_54.setTransform(-1.1444,41.675);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#BFBFC0").s().p("AvGCBQgBgHAJgNIB0jvQAHgFAKABIZ7gCQAKAAAIAEIBvDvQAVAchNAAI9KACQgHgBAAgHg");
	this.shape_55.setTransform(-1.6013,14.075);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#E2E4E7").s().p("Ay8EoQgLgKAAgPQAAgNAIgJIEaofQAHgKANAAIcjgCQAMAAAHAKIEcIfQAJALgCAPQgCAPgMAJQgJAHgMAAMglIAADQgPAAgKgLg");
	this.shape_56.setTransform(-1.0068,24.925);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#CECDCE").s().p("AySACQgUgIgMgMIgIgJMAl1gAFQgUAlhdARIhZAJI/RACIgDAAQhxAAg+gfg");
	this.shape_57.setTransform(-0.875,57.3004);

	this.instance_3 = new lib.Path2842();
	this.instance_3.setTransform(0.5,45.65,1,1,0,0,0,118.7,20.7);
	this.instance_3.alpha = 0.1211;

	this.instance_4 = new lib.Path284();
	this.instance_4.setTransform(0.5,49.25,1,1,0,0,0,126,21.9);
	this.instance_4.alpha = 0.0781;

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#9E5CA5").s().p("A6oWWQg+AAgsgsQgsgsAAg/MAAAgn9QAAg+AsgtQAsgsA+AAMA1QAAAQA/AAAsAsQAsAtAAA+MAAAAn9QAAA/gsAsQgsAsg/AAg");
	this.shape_58.setTransform(0,-32.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_58},{t:this.instance_4},{t:this.instance_3},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.LMdevicemanagement, new cjs.Rectangle(-185.5,-175.4,371,350.9), null);


(lib.ClipGroup_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A6oWWQg+AAgsgsQgsgsAAg+MAAAgn+QAAg/AsgsQAsgsA+AAMA1QAAAQA/AAAsAsQAsAsAAA/MAAAAn+QAAA+gsAsQgsAsg/AAg");
	mask.setTransform(185.5,143);

	// Layer_3
	this.instance = new lib.Path();
	this.instance.setTransform(162.75,273.25,1,1,0,0,0,122.3,42.2);
	this.instance.alpha = 0.1406;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2_1, new cjs.Rectangle(40.5,231.1,244.60000000000002,54.900000000000006), null);


(lib.ClipGroup_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A6oWWQg+AAgsgsQgsgsAAg+MAAAgn+QAAg/AsgsQAsgsA+AAMA1QAAAQA/AAAsAsQAsAsAAA/MAAAAn+QAAA+gsAsQgsAsg/AAg");
	mask.setTransform(185.5,143);

	// Layer_3
	this.instance = new lib.Path_0();
	this.instance.setTransform(162.8,273.25,1,1,0,0,0,100,34.5);
	this.instance.alpha = 0.1406;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_1, new cjs.Rectangle(62.8,238.8,200,47.19999999999999), null);


(lib.ClipGroup_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	mask_3.graphics.p("A6oWWQg+AAgsgsQgsgsAAg+MAAAgn+QAAg/AsgsQAsgsA+AAMA1QAAAQA/AAAsAsQAsAsAAA/MAAAAn+QAAA+gsAsQgsAsg/AAg");
	mask_3.setTransform(185.5,143);

	// Layer_3
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#DBDCE2").s().p("AkqGUQgNgJACgRIBAnRQACgSAQgKIHvkfQAQgJAOAIQAOAJgCARIhAHRQgDASgQAKInvEeQgIAGgJAAQgGAAgHgEg");
	this.shape_26.setTransform(209.2244,189.8572);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#8D8588").s().p("AkrGXQgUgNgDgLIBAneQADgSAQgKIHukeQAJgGAKABIABAAIAAAAQAHABApAXIgbAOIg/HIQgCASgRAKIncEwQgFADgHAAQgLAAgOgIg");
	this.shape_27.setTransform(207.125,188.8261);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#5B3535").s().p("AkABeQABhbAThKQARhBAugmQAqgiA9gHQAtgGAdAIQAVAFAcAPIAvAaQANAHAmAOQAgAMASAKQAZAPAQAWQARAZgCAaQgCAbgWAUQgVAUgdAHQgZAFgfgCQgUgCgkgHIgygNQgigJgQAFQgWAHgMAiQgQArgGAHQgLAOgPgEQgMgDgMgUQgMgXgJgFQgLgGgMAEQgNADgGALQgHAKAAAMQAAANAGALQAEAIANAJQAOAKAEAFQAGAMgMAbQgIAVgTADIgIABQg1AAACh9g");
	this.shape_28.setTransform(161.4321,37.7902);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FB8E71").s().p("AgzDEQhWgmgVheIgEgfQgCgTgKgIIgTgTQgMgMABgIQACgNAagVQAegYAEgIQARggAegYQAcgXAkgNQBMgVA8ADQBZAEALA8QgLA0gLBzQgRBkg1AwQgwApg1AAQgeAAghgPg");
	this.shape_29.setTransform(160.196,50.8892);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FB8E71").s().p("AgvCMQgWgIgOgPIAAkIICoAAIAAEKQggAdg0AAQgZAAgXgIg");
	this.shape_30.setTransform(149.2,64.575);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#E6E8EA").s().p("AhBFYQgYgPgVggIgBgCIgIn8QAFhWAeggQAYgaA3gBQAvAAAiApQAjAqAAA7IAJIQIgDACQg4AkguAHIgUABIgFABQgfAAgYgPg");
	this.shape_31.setTransform(120.8,120.0528);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FB8E71").s().p("AAOFlQglgCgcgVQgegXgCgjIgboRQgCgpAcgeQAbgdAogDQAngCAeAcQAeAbACAoIAbIRQgBAugeAZQgZAUgmAAIgDAAg");
	this.shape_32.setTransform(120.7182,120.6705);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FB8E71").s().p("AB9FJQgYgKgOgWIk5n7QgRgdAHghQAIghAdgSQAdgRAhAIQAhAHASAdIE4H7QASAdgIAgQgHAhgdASQgNAIgOADQgIACgIAAQgQAAgQgHg");
	this.shape_33.setTransform(136.3106,173.6578);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#839DB7").s().p("AgwBBQgWgIgOgOQgUgUABgXQgBgWAUgUQAegeA2AAIAWABQAjAFAWAUIABAAIAEADQAUAUAAAXQAAAYgUAUQggAeg0gBQgZAAgXgIg");
	this.shape_34.setTransform(149.3,72.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#E6E8EA").s().p("AhFImQg4g0gQkYQgNj0AWiYQANhaARg9QAVhIAggzQAxhRBXg0QAsA7AABbQAABFgZBfQgfB0gGAxQgLBeAfBBIAOAdQAJASADAMQAMAmgNA6IgWBjQgGA4AWBPIAnCFQg4ALgrAAQhOAAgngkg");
	this.shape_35.setTransform(114.5433,131.7273);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#EBEEF3").s().p("AkuJRQgohCgViIQgViCACibQAEliBfihQAwhXB5g/QB1g+B5gHQCDgHBFA/QBMBGgWCOQhGCfAFCfQADBQAmCgQAdB5gTA3QgaBOiFA0QiJBKhwAfQhJAVg6AAQhOAAgxglg");
	this.shape_36.setTransform(137.8666,127.3767);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#E6E8EA").s().p("AAHFVQgmgOgSgnQAAgQgXhdIgui+Qg9kJAigYQAhgzBEAGQBDAGAWA4IBvH9QAIAqgYAhQgVAegmALQgTAFgRAAQgUAAgSgGg");
	this.shape_37.setTransform(170.4649,111.8988);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#5F66AF").s().p("ABVCrQgfgMg1gxIgoglQgYgTgSgLIgpgTQgYgMgQgOQgPgPgLgXQgLgWgDgUIAAgTQADgYASgIIAkggQALgLAQADQAQACAYARIApAbQASALAXAIIApALQA1AMAgAYQAqAfAVBBQAWBCgbAYQgEAGgIAEIgdAZQgOAMgTACIgJABQgLAAgJgEg");
	this.shape_38.setTransform(163.4765,274.6714);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#EBEEF3").s().p("AhPBAIgdgRIgMgKIgBgCQgEgOgGgKIAGgFICEhfQAagTAgAFQAhAFATAaQATAagFAhQgFAfgaATIhfBFQg6gbgagPg");
	this.shape_39.setTransform(161.6771,262.8479);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#5F66AF").s().p("AlfFEQgagMgRgYQgdgnAIgxQAHgwAogdIJWmzQAngdAxAHQAwAIAdAnQAdAogIAwQgHAxgoAdIpWGzQgfAXgmAAQgcAAgZgNg");
	this.shape_40.setTransform(199.7344,236.5479);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FB8E71").s().p("ABbFtQgZAAgVgQQgVgPgIgZIi6o1QgLggAPgfQAPgeAhgLQAggKAeAPQAeAPALAgIC6I2QAOAngaAjQgZAhgmAAIgFAAg");
	this.shape_41.setTransform(185.7387,164.592);

	this.instance_2 = new lib.Group_15();
	this.instance_2.setTransform(171.8,190.3,1,1,0,0,0,15.8,9.7);

	this.instance_3 = new lib.Group_16();
	this.instance_3.setTransform(190.95,202.3,1,1,0,0,0,30,17.7);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#DBDCE2").s().p("AnpAXQgHgEAAgIQAAgIAHgDIHwkcQAWgNAYAOIG8EKIocE0g");
	this.shape_42.setTransform(184,200.9061);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#8D8588").s().p("AniAhQgLgGAAgMQAAgMAHgJQAFgKALgGIHwkQIHUEZIocE0g");
	this.shape_43.setTransform(182.3,203.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#5F66AF").s().p("AG8LvQgfABgYgUQgYgTgHgfIhZoPIr/mMQgkgXgWglQgWgkgDgrIgJjqIHchEICshFIA0BwIAPAxQAOA1gCAVQgaAOgyAVQg3AXgPAHQhGAkAfAqQAyBFDPB1ICSBRQBIAmAQAMQAgAbAKAnIBnJvQAKAugeAkQgdAkgvAAg");
	this.shape_44.setTransform(168.075,240.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#EBEEF3").s().p("AgkB1QgagTgGghIgThxQAugmAdgUIAdgTQAGgEAHgBIADgBQALACAOAAIAdCoQAFAhgTAaQgSAbghAFIgOACQgXAAgVgPg");
	this.shape_45.setTransform(216.4617,310.8617);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#5F66AF").s().p("AAnCkIgogeQgZgTgSgKQg2gYgagNQgugXgTgdQgNgTgFgdQgDgTgBghQgEi4CmBzQA7AqCYCYQAaAaALAUQAQAcgEAZQgFAZgXAQQgVAQgbABIgEAAQgqAAgygig");
	this.shape_46.setTransform(229.3185,332.3165);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#5F66AF").s().p("AEsEaQgbgBgZgNIphk5QgugYgQgxQgQgxAYguQAXgtAygQQAxgQAuAXIJhE6QAuAXAQAxQAPAxgXAuQgRAhggASQgdARggAAIgGAAg");
	this.shape_47.setTransform(200.209,196.4317);

	this.instance_4 = new lib.Path_3();
	this.instance_4.setTransform(174.45,200.8,1,1,0,0,0,58.9,34);
	this.instance_4.compositeOperation = "multiply";

	this.instance_5 = new lib.Path_1();
	this.instance_5.setTransform(146.55,264,1,1,0,0,0,104.2,39.7);
	this.instance_5.compositeOperation = "multiply";

	this.instance_6 = new lib.Path_2();
	this.instance_6.setTransform(148.45,190.5,1,1,0,0,0,111.5,113.2);
	this.instance_6.compositeOperation = "multiply";

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#839DB7").s().p("Ag2QIQlCgbjyiRQhVgzhAg/IgCgBQiNh3hcjqQhejugIkMQA+i0ASgvQA6iXA9hyQCpk/DjhiQA9g1A6COQAQAoAaBTQAZBPAKAXQBdDIBGBxQBpCpB5BnQCNB1EAAqQBHANCTATQCFAUBYAZQC+A7ADCdQABA8gZBbQgPA1gjBtQhEBthuBRQh1BXiaAuQj5BKj5AAQhGAAhEgGg");
	this.shape_48.setTransform(147.5769,199.8536);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#839DB7").s().p("Ag/R/QlCgbjyiRQhVgzhAg/IgCgBQhyhhhViyQhViygijWQgjjiAgjaQAijvBvjCQC8lICGhhQBzhUCDA3QA1AWA2A7QAjAmBLBkQDAEDCwCqQBnBjCRBNQBTAsCfBJQCGBGBSBTQBrBsBCCvQAtB1gKB9QgJB/g/B0QiMEBlIBiQj5BKj5AAQhGAAhEgGg");
	this.shape_49.setTransform(148.4625,187.9759);

	var maskedShapeInstanceList = [this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.instance_2,this.instance_3,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.instance_4,this.instance_5,this.instance_6,this.shape_48,this.shape_49];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_49},{t:this.shape_48},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.instance_3},{t:this.instance_2},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(37,15.9,223,270.1), null);


(lib.ClipGroup_1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("A6nWWQg/AAgsgsQgsgsAAg+MAAAgn+QAAg/AsgsQAsgsA/AAMA1PAAAQA/AAAsAsQAsAsAAA/MAAAAn+QAAA+gsAsQgsAsg/AAg");
	mask_1.setTransform(194.55,143);

	// Layer_3
	this.instance_1 = new lib.Path_4();
	this.instance_1.setTransform(198.1,199.1,1,1,0,0,0,198.1,56.2);
	this.instance_1.alpha = 0.1016;

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_2, new cjs.Rectangle(9.1,142.9,371,112.4), null);


(lib.ClipGroup_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_4 = new cjs.Shape();
	mask_4._off = true;
	mask_4.graphics.p("A6oWWQg+AAgsgsQgsgsAAg+MAAAgn+QAAg/AsgsQAsgsA+AAMA1QAAAQA/AAAsAsQAsAsAAA/MAAAAn+QAAA+gsAsQgsAsg/AAg");
	mask_4.setTransform(185.5,143);

	// Layer_3
	this.instance_7 = new lib.Path_0_1();
	this.instance_7.setTransform(188.05,199.45,1,1,0,0,0,176.5,48.7);
	this.instance_7.alpha = 0.1016;

	var maskedShapeInstanceList = [this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_4;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(11.6,150.8,352.9,97.39999999999998), null);


(lib.ClipGroup_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_5 = new cjs.Shape();
	mask_5._off = true;
	mask_5.graphics.p("Eh0NBNtMAAAibaMDobAAAMAAACbag");
	mask_5.setTransform(1202.625,497.35);

	// Layer_3
	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#CFD5E0").s().p("A9OgTMAt3gGLIMmFTMgsAAHpg");
	this.shape_50.setTransform(380.575,686.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#B5956B").s().p("EgoDAAVMA9jgKtISkKKMg8tAKng");
	this.shape_51.setTransform(542.4,726.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#AA8C65").s().p("A+xkEMA9jgKvIAASlMg9hALCg");
	this.shape_52.setTransform(483.025,754.425);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#A8865A").s().p("AvACqIgEzGIeIOEIABS1g");
	this.shape_53.setTransform(583.55,675.05);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#AA8C65").s().p("Egt2gBqMA9ngKuIeGOGMg9mAKsg");
	this.shape_54.setTransform(386.575,649.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#B5956B").s().p("AIOHBI+JuBIRLCuIasLTg");
	this.shape_55.setTransform(627.45,614.7);

	this.instance_8 = new lib.Path_8();
	this.instance_8.setTransform(393.3,775.6,1,1,0,0,0,335.9,90.8);
	this.instance_8.compositeOperation = "multiply";

	var maskedShapeInstanceList = [this.shape_50,this.shape_51,this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_5;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_5, new cjs.Rectangle(458.9,569.8,339.9,296.6), null);


(lib.ClipGroup_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_6 = new cjs.Shape();
	mask_6._off = true;
	mask_6.graphics.p("EhN+AK+MAAAhfOMCbuBJJMAAOBfYg");
	mask_6.setTransform(1059.4,556.95);

	// Layer_3
	this.instance_9 = new lib.Path_10();
	this.instance_9.setTransform(932.6,192.7,1,1,0,0,0,396.6,187.4);
	this.instance_9.compositeOperation = "multiply";

	this.instance_10 = new lib.Image_3();
	this.instance_10.setTransform(704.55,288.65,1,1,0,0,0,64.3,143.8);
	this.instance_10.compositeOperation = "multiply";

	this.instance_11 = new lib.Image_1();
	this.instance_11.setTransform(802.4,60.35,1.2219,1.2219);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#F1B338").s().p("EgwTgCDMA9pgL6MAi+AQDMg9oAL4g");
	this.shape_56.setTransform(1359.75,889.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#EBC879").s().p("EhBRgCxMBTTgQGMAvQAVsMhTTAQDg");
	this.shape_57.setTransform(1359.775,889.5);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#EBD8A2").s().p("EhXegDtMBvogVlMA/VAdEMhvoAVhg");
	this.shape_58.setTransform(1383.875,889.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#23162A").s().p("EhXdgDtIgDhFMBvsgUgMA/VAdEMhvpAVhg");
	this.shape_59.setTransform(1383.725,896.45);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#F1B338").s().p("At2glIRrjbIKCEmIxrDag");
	this.shape_60.setTransform(1541.175,603);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#EBC879").s().p("AxrgvIWjkXIM0F3I2jEWg");
	this.shape_61.setTransform(1541.15,602.975);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#23162A").s().p("AonjmIgCgtIRTH6IAAAtg");
	this.shape_62.setTransform(1443.85,624.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#7F453B").s().p("AlGAWIJHhoIBGAzIqNBxg");
	this.shape_63.setTransform(1525.775,537.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#7F453B").s().p("AgiK7IAA2nIBFAAIAAXZg");
	this.shape_64.setTransform(1554.95,459.775);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#A66857").s().p("AlGq6IKNhzIAAXoIqNBzg");
	this.shape_65.setTransform(1525.775,464.725);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#7F453B").s().p("AlGAVIJHhmIBGAxIqNBzg");
	this.shape_66.setTransform(1447.625,552.45);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#7F453B").s().p("AgiK7IAA2nIBFAAIAAXZg");
	this.shape_67.setTransform(1476.8,474.325);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#A66857").s().p("AlGq6IKNhzIAAXoIqNBzg");
	this.shape_68.setTransform(1447.625,479.275);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#EBD8A2").s().p("A32hAIebl5IRSH7I+bF4g");
	this.shape_69.setTransform(1541.15,603);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#C38A74").s().p("A0h8RMApDgHPMAAAA/yMgpDAHPg");
	this.shape_70.setTransform(1517.9,360.025);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#957561").s().p("EjQ2gI4MEKhgzfMCXMBFYMkKiAzXg");
	this.shape_71.setTransform(1336.725,912.575);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#CFB18B").s().p("EhXTA5UMAAAhynMCunAAAMAAAByng");
	this.shape_72.setTransform(1102.475,366.775);

	var maskedShapeInstanceList = [this.instance_9,this.instance_10,this.instance_11,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64,this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_6;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(560.4,17.6,998.1,1078.7), null);


(lib.apt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// apt_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBF6DF").s().p("Aj6AgIHFhaIAvATIn0Big");
	this.shape.setTransform(852,985.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7E8D1").s().p("Aj6AjIH0hiIAAAcInzBjg");
	this.shape_1.setTransform(852,987.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C9C1A1").s().p("AhgAIIgBhoIDDBZIAABog");
	this.shape_2.setTransform(836.425,1040.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FBF6DF").s().p("AmBAMIJAhyIDDBpIo/Bkg");
	this.shape_3.setTransform(865.225,1029.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F7E8D1").s().p("AkfgCII/hkIAABnIo/Bmg");
	this.shape_4.setTransform(875.05,1040.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#AD806F").s().p("AhggbIgBghIDDBYIAAAhg");
	this.shape_5.setTransform(836.425,944.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F6DDB7").s().p("AmBAMIJAhyIDDBpIo/Bkg");
	this.shape_6.setTransform(865.225,937.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F4D2A3").s().p("AkfAhII/hjIAAAgIo/Blg");
	this.shape_7.setTransform(875.05,944.45);

	this.instance = new lib.Path_41();
	this.instance.setTransform(852.05,981.65,1,1,0,0,0,25.1,51.2);
	this.instance.alpha = 0.5508;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C9C1A1").s().p("AgTGrIgBt9IApgJIAAO3g");
	this.shape_8.setTransform(874.95,985.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FBF6DF").s().p("AgTGWIgBtTIApgJIAAONg");
	this.shape_9.setTransform(872.025,983.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C3E0C4").s().p("AjWmtIGshQIABOuImtBNg");
	this.shape_10.setTransform(848.475,990.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FBF6DF").s().p("AkelKIAAhQII9hzIAAQRIhJAKg");
	this.shape_11.setTransform(855.625,980.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F3DBC0").s().p("Eg9CAKXMB4jgVdIBiAcMh6FAVxg");
	this.shape_12.setTransform(1309.375,632.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C9A093").s().p("EgsjgUwIBEgRMBYBApDIACBAg");
	this.shape_13.setTransform(291.65,798.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F3DBC0").s().p("A7NEGMA1egJLIA9AyMg2ZAJZg");
	this.shape_14.setTransform(750.8,900.525);

	this.instance_1 = new lib.Path_12_0();
	this.instance_1.setTransform(166.25,285.8,1,1,0,0,0,118.5,62.1);
	this.instance_1.alpha = 0.5508;

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#AD806F").s().p("AvWk+IgDkWIeyOUIABEVg");
	this.shape_15.setTransform(186.125,283.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F6DDB7").s().p("EghbgDnMAkGgHOIexPYMgkEAGTg");
	this.shape_16.setTransform(301.55,246.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F4D2A3").s().p("AyBA+MAkDgGSIAAERMgkBAGYg");
	this.shape_17.setTransform(400.1,310.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F4D2A3").s().p("A7MCWMA2ZgJZIAAEyMg2ZAJVg");
	this.shape_18.setTransform(750.925,918.15);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#AD806F").s().p("EgsjgSaIAAk2MBZHApyIAAEvg");
	this.shape_19.setTransform(291.65,814.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#87B1B5").s().p("A6vDrMA1fgKNIAAD5Mg1fAJMg");
	this.shape_20.setTransform(748,939.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#46676D").s().p("EgsBgR5IAAlcMBYDArzIAAC4g");
	this.shape_21.setTransform(295.05,832.325);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F4D2A3").s().p("A7kB1MA3JgJgIAAF7Mg3JAJcg");
	this.shape_22.setTransform(753.3,509.975);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#AD806F").s().p("EgtDgSFIAAl/MBaHAqSIAAF3g");
	this.shape_23.setTransform(288.425,405.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F6DDB7").s().p("EiE0gBhMDYkgnPMAxEAX3Mih4Ac3MAphATRMg3QAJig");
	this.shape_24.setTransform(850.05,260.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#F4D2A3").s().p("EhQ8ALxMCh5gc4IAAFeMid0Acxg");
	this.shape_25.setTransform(1182,262.175);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#BA9979").s().p("EhLoANzMCXRgcbIAABpMiXRAbog");
	this.shape_26.setTransform(1205.575,276.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#BA9979").s().p("A6vEzMA1fgKMIAABoMg1fAJMg");
	this.shape_27.setTransform(748,528.45);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#A67863").s().p("EgsBgTAIAAjNMBYDAr0IAAAng");
	this.shape_28.setTransform(295.05,420.9);

	this.instance_2 = new lib.Path_40();
	this.instance_2.setTransform(865.25,811.4,1,1,0,0,0,24,39.1);
	this.instance_2.alpha = 0.5508;

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_29.setTransform(887.225,811.375);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#F5DABA").s().p("AjhAMIGbhGIAoAuImbBHg");
	this.shape_30.setTransform(866.7,851.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_31.setTransform(884.425,809.925);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FBF6DF").s().p("AjgANIGahHIAnAuImaBHg");
	this.shape_32.setTransform(863.875,848.25);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#C3E0C4").s().p("AjNktIGahNIABKtImaBIg");
	this.shape_33.setTransform(861.875,811.6);

	this.instance_3 = new lib.Path_39();
	this.instance_3.setTransform(788.1,825.2,1,1,0,0,0,23.9,39.1);
	this.instance_3.alpha = 0.5508;

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_34.setTransform(810.15,825.175);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F5DABA").s().p("AjgANIGahHIAnAvImaBGg");
	this.shape_35.setTransform(789.625,865.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_36.setTransform(807.375,823.725);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FBF6DF").s().p("AjgAMIGahGIAoAuImbBHg");
	this.shape_37.setTransform(786.8,862.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C3E0C4").s().p("AjNkuIGahMIABKuImbBHg");
	this.shape_38.setTransform(784.825,825.4);

	this.instance_4 = new lib.Path_38();
	this.instance_4.setTransform(711.1,839.7,1,1,0,0,0,24,39.1);
	this.instance_4.alpha = 0.5508;

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#A68168").s().p("AgSFYIgBrVIAngJIAAMNg");
	this.shape_39.setTransform(733.1,839.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#F5DABA").s().p("AjgANIGahHIAoAvImbBGg");
	this.shape_40.setTransform(712.55,880);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_41.setTransform(730.3,838.275);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FBF6DF").s().p("AjgAMIGahGIAoAvImbBGg");
	this.shape_42.setTransform(709.75,876.55);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#C3E0C4").s().p("AjOkuIGbhMIABKtImaBIg");
	this.shape_43.setTransform(707.75,839.925);

	this.instance_5 = new lib.Path_37();
	this.instance_5.setTransform(634.05,854.25,1,1,0,0,0,24,39.1);
	this.instance_5.alpha = 0.5508;

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_44.setTransform(656.05,854.225);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F5DABA").s().p("AjgAMIGahGIAoAvImbBGg");
	this.shape_45.setTransform(635.5,894.55);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_46.setTransform(653.225,852.775);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FBF6DF").s().p("AjhAMIGbhGIAoAuImbBHg");
	this.shape_47.setTransform(632.7,891.1);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#C3E0C4").s().p("AjNktIGahNIABKuImaBHg");
	this.shape_48.setTransform(630.675,854.45);

	this.instance_6 = new lib.Path_36();
	this.instance_6.setTransform(865.25,689.95,1,1,0,0,0,24,39.1);
	this.instance_6.alpha = 0.5508;

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_49.setTransform(887.225,689.925);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F5DABA").s().p("AjhANIGbhHIAoAuImbBHg");
	this.shape_50.setTransform(866.7,730.25);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_51.setTransform(884.425,688.475);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FBF6DF").s().p("AjgAMIGahGIAnAvImaBGg");
	this.shape_52.setTransform(863.875,726.8);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#C3E0C4").s().p("AjNkuIGahMIABKtImaBIg");
	this.shape_53.setTransform(861.875,690.15);

	this.instance_7 = new lib.Path_35();
	this.instance_7.setTransform(788.1,703.75,1,1,0,0,0,23.9,39.1);
	this.instance_7.alpha = 0.5508;

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_54.setTransform(810.15,703.725);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#F5DABA").s().p("AjgAMIGahGIAnAuImaBHg");
	this.shape_55.setTransform(789.625,744.05);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngIIAALjg");
	this.shape_56.setTransform(807.375,702.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FBF6DF").s().p("AjgANIGahHIAoAuImbBHg");
	this.shape_57.setTransform(786.8,740.6);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#C3E0C4").s().p("AjNktIGahNIABKtImbBIg");
	this.shape_58.setTransform(784.825,703.95);

	this.instance_8 = new lib.Path_34();
	this.instance_8.setTransform(711.1,718.3,1,1,0,0,0,24,39.1);
	this.instance_8.alpha = 0.5508;

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_59.setTransform(733.1,718.275);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#F5DABA").s().p("AjgAMIGahGIAoAuImbBHg");
	this.shape_60.setTransform(712.55,758.6);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_61.setTransform(730.3,716.825);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FBF6DF").s().p("AjgAMIGahGIAoAvImbBGg");
	this.shape_62.setTransform(709.75,755.15);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#C3E0C4").s().p("AjOkuIGbhMIABKuImaBHg");
	this.shape_63.setTransform(707.75,718.5);

	this.instance_9 = new lib.Path_33();
	this.instance_9.setTransform(634.05,732.8,1,1,0,0,0,24,39.1);
	this.instance_9.alpha = 0.5508;

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_64.setTransform(656.05,732.775);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#F5DABA").s().p("AjgANIGahHIAoAuImbBHg");
	this.shape_65.setTransform(635.5,773.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FBF6DF").s().p("AgSFEIgBquIAngIIAALlg");
	this.shape_66.setTransform(653.225,731.35);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FBF6DF").s().p("AjhANIGbhHIAoAvImbBGg");
	this.shape_67.setTransform(632.7,769.65);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#C3E0C4").s().p("AjNkuIGahMIABKtImaBIg");
	this.shape_68.setTransform(630.675,733);

	this.instance_10 = new lib.Path_32();
	this.instance_10.setTransform(865.25,568.5,1,1,0,0,0,24,39.1);
	this.instance_10.alpha = 0.5508;

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#A68168").s().p("AgSFYIgBrVIAngJIAAMNg");
	this.shape_69.setTransform(887.225,568.5);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#F5DABA").s().p("AjhAMIGbhGIAoAvImbBGg");
	this.shape_70.setTransform(866.7,608.8);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FBF6DF").s().p("AgSFEIgBquIAngIIAALlg");
	this.shape_71.setTransform(884.425,567.075);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FBF6DF").s().p("AjgAMIGahGIAnAvImaBGg");
	this.shape_72.setTransform(863.875,605.35);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#C3E0C4").s().p("AjNktIGahNIABKuImaBHg");
	this.shape_73.setTransform(861.875,568.7);

	this.instance_11 = new lib.Path_31();
	this.instance_11.setTransform(788.1,582.35,1,1,0,0,0,23.9,39.1);
	this.instance_11.alpha = 0.5508;

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_74.setTransform(810.15,582.325);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#F5DABA").s().p("AjgANIGahHIAnAvImaBGg");
	this.shape_75.setTransform(789.625,622.6);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_76.setTransform(807.375,580.875);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FBF6DF").s().p("AjgAMIGahGIAoAvImbBGg");
	this.shape_77.setTransform(786.8,619.175);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#C3E0C4").s().p("AjNkuIGahMIABKuImbBHg");
	this.shape_78.setTransform(784.825,582.525);

	this.instance_12 = new lib.Path_30();
	this.instance_12.setTransform(711.1,596.85,1,1,0,0,0,24,39.1);
	this.instance_12.alpha = 0.5508;

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_79.setTransform(733.1,596.825);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#F5DABA").s().p("AjgAMIGahGIAoAvImbBGg");
	this.shape_80.setTransform(712.55,637.15);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_81.setTransform(730.3,595.375);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FBF6DF").s().p("AjgANIGahHIAoAuImbBHg");
	this.shape_82.setTransform(709.75,633.7);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#C3E0C4").s().p("AjOktIGbhNIABKuImaBHg");
	this.shape_83.setTransform(707.75,597.05);

	this.instance_13 = new lib.Path_29();
	this.instance_13.setTransform(634.05,611.4,1,1,0,0,0,24,39.1);
	this.instance_13.alpha = 0.5508;

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_84.setTransform(656.05,611.375);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#F5DABA").s().p("AjgAMIGahGIAoAvImbBGg");
	this.shape_85.setTransform(635.5,651.65);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_86.setTransform(653.225,609.925);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FBF6DF").s().p("AjhAMIGbhGIAoAvImbBGg");
	this.shape_87.setTransform(632.7,648.225);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#C3E0C4").s().p("AjNkuIGahMIABKuImaBHg");
	this.shape_88.setTransform(630.675,611.575);

	this.instance_14 = new lib.Path_28();
	this.instance_14.setTransform(500.2,815.15,1,1,0,0,0,24.1,40.4);
	this.instance_14.alpha = 0.5313;

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#A57666").s().p("AjwhbIA4gsIGpDIIAABHg");
	this.shape_89.setTransform(500.2,864.75);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#BCADB5").s().p("AjahVIA4gtIF+CzIAABSg");
	this.shape_90.setTransform(502.35,860.875);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#7C8092").s().p("Ai+D7IAAqpIF8CzIACKqg");
	this.shape_91.setTransform(505.15,822.725);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#A57666").s().p("AgbmTIA3AbIAALgIg3Asg");
	this.shape_92.setTransform(478.9,815.15);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#BCADB5").s().p("Agbl4IA3AdIAAKoIg3Asg");
	this.shape_93.setTransform(483.2,814.5);

	this.instance_15 = new lib.Path_27();
	this.instance_15.setTransform(374.25,738.75,1,1,0,0,0,60.9,40.4);
	this.instance_15.alpha = 0.5313;

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#A57666").s().p("ApgkJIA4gsISJIjIAABHg");
	this.shape_94.setTransform(374.275,805.7);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#BCADB5").s().p("ApLkCIA4gtIRfINIAABSg");
	this.shape_95.setTransform(376.425,801.825);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#7C8092").s().p("AovBOIAAqpIRdINIACKqg");
	this.shape_96.setTransform(379.225,763.65);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#A57666").s().p("AgbmTIA3AbIAALgIg3Asg");
	this.shape_97.setTransform(316.15,738.75);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#BCADB5").s().p("Agbl5IA3AdIAAKpIg3Atg");
	this.shape_98.setTransform(320.45,738.125);

	this.instance_16 = new lib.Path_26();
	this.instance_16.setTransform(238.45,691.55,1,1,0,0,0,24.1,40.4);
	this.instance_16.alpha = 0.5313;

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#A57666").s().p("AjwhbIA4gtIGpDKIAABHg");
	this.shape_99.setTransform(238.45,741.15);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#BCADB5").s().p("AjbhVIA5gtIF9CzIAABSg");
	this.shape_100.setTransform(240.6,737.275);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#7C8092").s().p("Ai+D7IAAqpIF8CzIABKqg");
	this.shape_101.setTransform(243.425,699.125);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#A57666").s().p("AgbmTIA3AaIAALgIg3Atg");
	this.shape_102.setTransform(217.175,691.55);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#BCADB5").s().p("Agbl5IA3AdIAAKpIg3Asg");
	this.shape_103.setTransform(221.475,690.9);

	this.instance_17 = new lib.Path_25();
	this.instance_17.setTransform(112.5,615.15,1,1,0,0,0,60.9,40.4);
	this.instance_17.alpha = 0.5313;

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#A57666").s().p("ApgkIIA4gtISJIkIAABHg");
	this.shape_104.setTransform(112.525,682.1);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#BCADB5").s().p("ApLkCIA5gtIReINIAABSg");
	this.shape_105.setTransform(114.675,678.225);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#7C8092").s().p("AouBOIAAqpIRcINIABKqg");
	this.shape_106.setTransform(117.5,640.05);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#A57666").s().p("AgbmTIA3AbIAALgIg3Asg");
	this.shape_107.setTransform(54.425,615.15);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#BCADB5").s().p("Agbl5IA3AdIAAKpIg3Atg");
	this.shape_108.setTransform(58.725,614.525);

	this.instance_18 = new lib.Path_24();
	this.instance_18.setTransform(500.2,698.65,1,1,0,0,0,24.1,40.4);
	this.instance_18.alpha = 0.5313;

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#A57666").s().p("AjwhbIA4gtIGpDKIAABHg");
	this.shape_109.setTransform(500.2,748.25);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#BCADB5").s().p("AjahWIA4gsIF+CzIAABRg");
	this.shape_110.setTransform(502.35,744.4);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#7C8092").s().p("Ai+D7IAAqpIF8CzIACKqg");
	this.shape_111.setTransform(505.15,706.225);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#A57666").s().p("AgbmTIA3AaIAALgIg3Atg");
	this.shape_112.setTransform(478.9,698.65);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#BCADB5").s().p("Agbl5IA3AdIAAKpIg3Atg");
	this.shape_113.setTransform(483.2,698);

	this.instance_19 = new lib.Path_23();
	this.instance_19.setTransform(374.25,622.25,1,1,0,0,0,60.9,40.4);
	this.instance_19.alpha = 0.5313;

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#A57666").s().p("ApgkIIA4gtISJIkIAABHg");
	this.shape_114.setTransform(374.275,689.225);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#BCADB5").s().p("ApLkCIA4gtIRfINIAABSg");
	this.shape_115.setTransform(376.425,685.325);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#7C8092").s().p("AovBOIAAqpIRdINIACKqg");
	this.shape_116.setTransform(379.225,647.15);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#A57666").s().p("AgbmTIA3AbIAALgIg3Asg");
	this.shape_117.setTransform(316.15,622.275);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#BCADB5").s().p("Agbl4IA3AcIAAKpIg3Atg");
	this.shape_118.setTransform(320.45,621.65);

	this.instance_20 = new lib.Path_22();
	this.instance_20.setTransform(238.45,575.05,1,1,0,0,0,24.1,40.4);
	this.instance_20.alpha = 0.5313;

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#A57666").s().p("AjwhbIA4gsIGpDIIAABHg");
	this.shape_119.setTransform(238.45,624.65);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#BCADB5").s().p("AjbhVIA5gtIF9CzIAABSg");
	this.shape_120.setTransform(240.6,620.775);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#7C8092").s().p("Ai+D7IAAqpIF8CzIABKqg");
	this.shape_121.setTransform(243.425,582.625);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#A57666").s().p("AgbmTIA3AaIAALhIg3Asg");
	this.shape_122.setTransform(217.175,575.05);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#BCADB5").s().p("Agbl4IA3AcIAAKpIg3Atg");
	this.shape_123.setTransform(221.475,574.4);

	this.instance_21 = new lib.Path_21_1();
	this.instance_21.setTransform(112.5,498.65,1,1,0,0,0,60.9,40.4);
	this.instance_21.alpha = 0.5313;

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#A57666").s().p("ApgkIIA4gsISJIiIAABHg");
	this.shape_124.setTransform(112.525,565.6);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#BCADB5").s().p("ApLkCIA5gtIReINIAABSg");
	this.shape_125.setTransform(114.675,561.725);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#7C8092").s().p("AouBOIAAqpIRcINIABKqg");
	this.shape_126.setTransform(117.5,523.55);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#A57666").s().p("AgbmTIA3AaIAALhIg3Asg");
	this.shape_127.setTransform(54.425,498.675);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#BCADB5").s().p("Agbl5IA3AdIAAKpIg3Atg");
	this.shape_128.setTransform(58.725,498.025);

	this.instance_22 = new lib.Path_20();
	this.instance_22.setTransform(500.2,582.15,1,1,0,0,0,24.1,40.4);
	this.instance_22.alpha = 0.5313;

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#A57666").s().p("AjwhbIA4gtIGpDKIAABHg");
	this.shape_129.setTransform(500.2,631.8);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#BCADB5").s().p("AjahVIA4gsIF+CyIAABSg");
	this.shape_130.setTransform(502.35,627.9);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#7C8092").s().p("Ai+D7IAAqpIF8CzIACKqg");
	this.shape_131.setTransform(505.15,589.725);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#A57666").s().p("AgbmTIA3AaIAALhIg3Asg");
	this.shape_132.setTransform(478.9,582.175);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#BCADB5").s().p("Agbl5IA3AdIAAKpIg3Atg");
	this.shape_133.setTransform(483.2,581.525);

	this.instance_23 = new lib.Path_19();
	this.instance_23.setTransform(374.25,505.8,1,1,0,0,0,60.9,40.4);
	this.instance_23.alpha = 0.5313;

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#A57666").s().p("ApgkIIA4gtISJIkIAABHg");
	this.shape_134.setTransform(374.275,572.725);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#BCADB5").s().p("ApLkCIA4gtIRfIOIAABRg");
	this.shape_135.setTransform(376.425,568.825);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#7C8092").s().p("AovBOIAAqpIRdINIACKqg");
	this.shape_136.setTransform(379.225,530.7);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#A57666").s().p("AgbmTIA3AbIAALfIg3Atg");
	this.shape_137.setTransform(316.15,505.8);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#BCADB5").s().p("Agbl5IA3AeIAAKoIg3Asg");
	this.shape_138.setTransform(320.45,505.15);

	this.instance_24 = new lib.Path_18();
	this.instance_24.setTransform(1577,499.05,1,1,0,0,0,67.5,39.1);
	this.instance_24.alpha = 0.5508;

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_139.setTransform(1642.425,499.025);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#F5DABA").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_140.setTransform(1578.425,547.35);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_141.setTransform(1639.625,497.575);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FBF6DF").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_142.setTransform(1575.6,543.9);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#C3E0C4").s().p("AqAjdIUAjtIABKuI0ADng");
	this.shape_143.setTransform(1573.6,507.25);

	this.instance_25 = new lib.Path_17();
	this.instance_25.setTransform(1431.35,532.85,1,1,0,0,0,24,39.1);
	this.instance_25.alpha = 0.5508;

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_144.setTransform(1453.325,532.825);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#F5DABA").s().p("AjhAMIGbhGIAnAuImaBHg");
	this.shape_145.setTransform(1432.8,573.15);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_146.setTransform(1450.525,531.375);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FBF6DF").s().p("AjgANIGahHIAnAuImaBHg");
	this.shape_147.setTransform(1429.975,569.7);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#C3E0C4").s().p("AjNktIGahNIABKtImaBIg");
	this.shape_148.setTransform(1427.975,533.05);

	this.instance_26 = new lib.Path_16();
	this.instance_26.setTransform(1302.85,545.95,1,1,0,0,0,67.5,39.1);
	this.instance_26.alpha = 0.5508;

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_149.setTransform(1368.3,545.925);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#F5DABA").s().p("AqTBdIUAjnIAnAvI0ADmg");
	this.shape_150.setTransform(1304.3,594.225);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_151.setTransform(1365.5,544.475);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FBF6DF").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_152.setTransform(1301.475,590.8);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#C3E0C4").s().p("AqAjeIUBjsIAAKtI0ADog");
	this.shape_153.setTransform(1299.45,554.15);

	this.instance_27 = new lib.Path_15();
	this.instance_27.setTransform(1157.2,581.2,1,1,0,0,0,24,39.1);
	this.instance_27.alpha = 0.5508;

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_154.setTransform(1179.2,581.175);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#F5DABA").s().p("AjhAMIGbhGIAnAvImaBGg");
	this.shape_155.setTransform(1158.65,621.475);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FBF6DF").s().p("AgTFEIAAqtIAngJIAALlg");
	this.shape_156.setTransform(1176.4,579.725);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FBF6DF").s().p("AjhAMIGbhGIAnAuImbBHg");
	this.shape_157.setTransform(1155.85,618.05);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#C3E0C4").s().p("AjNkuIGbhMIAAKuImaBHg");
	this.shape_158.setTransform(1153.825,581.375);

	this.instance_28 = new lib.Path_14();
	this.instance_28.setTransform(1028.75,596.4,1,1,0,0,0,67.5,39.1);
	this.instance_28.alpha = 0.5508;

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#A68168").s().p("AgSFYIgBrVIAngJIAAMNg");
	this.shape_159.setTransform(1094.175,596.375);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#F5DABA").s().p("AqTBcIUAjmIAnAuI0ADng");
	this.shape_160.setTransform(1030.175,644.725);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngIIAALjg");
	this.shape_161.setTransform(1091.375,594.95);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FBF6DF").s().p("AqTBdIUAjnIAnAuI0ADng");
	this.shape_162.setTransform(1027.35,641.275);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#C3E0C4").s().p("AqAjdIUAjtIABKtI0ADog");
	this.shape_163.setTransform(1025.35,604.625);

	this.instance_29 = new lib.Path_13();
	this.instance_29.setTransform(1577,382.6,1,1,0,0,0,67.5,39.1);
	this.instance_29.alpha = 0.5508;

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_164.setTransform(1642.425,382.575);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#F5DABA").s().p("AqTBdIUAjnIAnAuI0ADng");
	this.shape_165.setTransform(1578.425,430.9);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_166.setTransform(1639.625,381.125);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FBF6DF").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_167.setTransform(1575.6,427.45);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#C3E0C4").s().p("AqAjeIUAjsIABKtI0ADog");
	this.shape_168.setTransform(1573.6,390.8);

	this.instance_30 = new lib.Path_12();
	this.instance_30.setTransform(1431.35,416.4,1,1,0,0,0,24,39.1);
	this.instance_30.alpha = 0.5508;

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_169.setTransform(1453.325,416.375);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#F5DABA").s().p("AjhAMIGbhGIAnAvImaBGg");
	this.shape_170.setTransform(1432.8,456.7);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_171.setTransform(1450.525,414.925);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FBF6DF").s().p("AjgANIGahHIAnAuImaBHg");
	this.shape_172.setTransform(1429.975,453.25);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#C3E0C4").s().p("AjNktIGahNIABKuImaBHg");
	this.shape_173.setTransform(1427.975,416.6);

	this.instance_31 = new lib.Path_11_1();
	this.instance_31.setTransform(1302.85,429.5,1,1,0,0,0,67.5,39.1);
	this.instance_31.alpha = 0.5508;

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_174.setTransform(1368.3,429.475);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#F5DABA").s().p("AqTBdIUAjnIAnAuI0ADng");
	this.shape_175.setTransform(1304.3,477.8);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_176.setTransform(1365.5,428.025);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FBF6DF").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_177.setTransform(1301.475,474.35);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#C3E0C4").s().p("AqAjeIUBjsIAAKtI0ADog");
	this.shape_178.setTransform(1299.45,437.7);

	this.instance_32 = new lib.Path_10_1();
	this.instance_32.setTransform(1157.2,464.75,1,1,0,0,0,24,39.1);
	this.instance_32.alpha = 0.5508;

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_179.setTransform(1179.2,464.725);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#F5DABA").s().p("AjhAMIGbhGIAnAvImaBGg");
	this.shape_180.setTransform(1158.65,505.05);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FBF6DF").s().p("AgTFEIAAqtIAngJIAALlg");
	this.shape_181.setTransform(1176.4,463.275);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FBF6DF").s().p("AjhAMIGbhGIAnAuImbBHg");
	this.shape_182.setTransform(1155.85,501.6);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#C3E0C4").s().p("AjNkuIGbhMIAAKuImaBHg");
	this.shape_183.setTransform(1153.825,464.95);

	this.instance_33 = new lib.Path_9_1();
	this.instance_33.setTransform(698.2,988.2,1,1,0,0,0,67.5,31.9);
	this.instance_33.alpha = 0.5508;

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#A68168").s().p("AgSEQIgBpGIAngIIAAJ9g");
	this.shape_184.setTransform(763.625,988.175);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#F5DABA").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_185.setTransform(699.625,1029.3);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FBF6DF").s().p("AgSD8IgBodIAngJIAAJVg");
	this.shape_186.setTransform(760.825,986.725);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FBF6DF").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_187.setTransform(696.8,1025.85);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#C3E0C4").s().p("AqAiVIUAjtIABIeI0ADng");
	this.shape_188.setTransform(694.8,996.4);

	this.instance_34 = new lib.Path_8_2();
	this.instance_34.setTransform(1028.75,479.95,1,1,0,0,0,67.5,39.1);
	this.instance_34.alpha = 0.5508;

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#A68168").s().p("AgSFYIgBrVIAngJIAAMNg");
	this.shape_189.setTransform(1094.175,479.95);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#F5DABA").s().p("AqTBdIUAjnIAnAvI0ADmg");
	this.shape_190.setTransform(1030.175,528.275);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FBF6DF").s().p("AgSFEIgBquIAngIIAALlg");
	this.shape_191.setTransform(1091.375,478.525);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FBF6DF").s().p("AqTBdIUAjnIAnAvI0ADmg");
	this.shape_192.setTransform(1027.35,524.825);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#C3E0C4").s().p("AqAjdIUAjtIABKtI0ADog");
	this.shape_193.setTransform(1025.35,488.175);

	this.instance_35 = new lib.Path_7_1();
	this.instance_35.setTransform(1577,266.15,1,1,0,0,0,67.5,39.1);
	this.instance_35.alpha = 0.5508;

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_194.setTransform(1642.425,266.125);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#F5DABA").s().p("AqTBdIUAjnIAnAuI0ADng");
	this.shape_195.setTransform(1578.425,314.45);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_196.setTransform(1639.625,264.675);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FBF6DF").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_197.setTransform(1575.6,311);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#C3E0C4").s().p("AqAjeIUAjsIABKtI0ADog");
	this.shape_198.setTransform(1573.6,274.35);

	this.instance_36 = new lib.Path_6_1();
	this.instance_36.setTransform(1431.35,299.95,1,1,0,0,0,24,39.1);
	this.instance_36.alpha = 0.5508;

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_199.setTransform(1453.325,299.925);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#F5DABA").s().p("AjhAMIGbhGIAnAvImaBGg");
	this.shape_200.setTransform(1432.8,340.25);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALkg");
	this.shape_201.setTransform(1450.525,298.5);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FBF6DF").s().p("AjgAMIGahGIAnAuImaBHg");
	this.shape_202.setTransform(1429.975,336.8);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#C3E0C4").s().p("AjNktIGahNIABKuImaBHg");
	this.shape_203.setTransform(1427.975,300.15);

	this.instance_37 = new lib.Path_5_1();
	this.instance_37.setTransform(1302.85,313.05,1,1,0,0,0,67.5,39.1);
	this.instance_37.alpha = 0.5508;

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_204.setTransform(1368.3,313.025);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#F5DABA").s().p("AqTBdIUAjnIAnAuI0ADng");
	this.shape_205.setTransform(1304.3,361.35);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_206.setTransform(1365.5,311.575);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FBF6DF").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_207.setTransform(1301.475,357.9);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#C3E0C4").s().p("AqAjeIUBjsIAAKtI0ADog");
	this.shape_208.setTransform(1299.45,321.25);

	this.instance_38 = new lib.Path_4_1();
	this.instance_38.setTransform(1157.2,348.3,1,1,0,0,0,24,39.1);
	this.instance_38.alpha = 0.5508;

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_209.setTransform(1179.2,348.275);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#F5DABA").s().p("AjhANIGbhHIAnAvImaBGg");
	this.shape_210.setTransform(1158.65,388.6);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FBF6DF").s().p("AgTFEIAAqtIAngJIAALlg");
	this.shape_211.setTransform(1176.4,346.825);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FBF6DF").s().p("AjhAMIGbhGIAnAvImbBGg");
	this.shape_212.setTransform(1155.85,385.15);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#C3E0C4").s().p("AjNkuIGbhMIAAKuImaBHg");
	this.shape_213.setTransform(1153.825,348.5);

	this.instance_39 = new lib.Path_3_1();
	this.instance_39.setTransform(1028.75,363.55,1,1,0,0,0,67.5,39.1);
	this.instance_39.alpha = 0.5508;

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_214.setTransform(1094.175,363.525);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#F5DABA").s().p("AqTBdIUAjnIAnAuI0ADng");
	this.shape_215.setTransform(1030.175,411.85);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_216.setTransform(1091.375,362.075);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FBF6DF").s().p("AqTBdIUAjnIAnAuI0ADng");
	this.shape_217.setTransform(1027.35,408.4);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#C3E0C4").s().p("AqAjeIUAjsIABKtI0ADog");
	this.shape_218.setTransform(1025.35,371.75);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#94BDC3").s().p("A6vkrMA1fgH8IAAP9Mg1fAJSg");
	this.shape_219.setTransform(748,1003.65);

	this.instance_40 = new lib.Path_2_3();
	this.instance_40.setTransform(238.45,458.55,1,1,0,0,0,24.1,40.4);
	this.instance_40.alpha = 0.5313;

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#A57666").s().p("AjwhbIA4gtIGpDJIAABHg");
	this.shape_220.setTransform(238.45,508.2);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#BCADB5").s().p("AjbhVIA5gtIF9CzIAABRg");
	this.shape_221.setTransform(240.6,504.3);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#7C8092").s().p("Ai+D7IAAqpIF8CzIABKqg");
	this.shape_222.setTransform(243.425,466.125);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#A57666").s().p("AgbmTIA3AbIAALgIg3Asg");
	this.shape_223.setTransform(217.175,458.55);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#BCADB5").s().p("Agbl5IA3AdIAAKpIg3Atg");
	this.shape_224.setTransform(221.475,457.925);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#547881").s().p("EgsBgMBIAAxVMBYDApZIAARUg");
	this.shape_225.setTransform(295.05,896.525);

	this.instance_41 = new lib.Path_1_4();
	this.instance_41.setTransform(112.5,382.2,1,1,0,0,0,60.9,40.4);
	this.instance_41.alpha = 0.5313;

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#A57666").s().p("ApgkIIA4gtISJIkIAABHg");
	this.shape_226.setTransform(112.525,449.125);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#BCADB5").s().p("ApLkCIA5gtIReINIAABSg");
	this.shape_227.setTransform(114.675,445.225);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#7C8092").s().p("AouBOIAAqpIRcINIABKqg");
	this.shape_228.setTransform(117.5,407.075);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#A57666").s().p("AgbmTIA3AaIAALgIg3Atg");
	this.shape_229.setTransform(54.425,382.2);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#BCADB5").s().p("Agbl5IA3AdIAAKpIg3Atg");
	this.shape_230.setTransform(58.725,381.55);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#F6DDB7").s().p("EiC9gBUMDV+gmqMAv9AXTMihGAb8MAokAS0Mg1eAJ6g");
	this.shape_231.setTransform(851.475,261.8);

	this.instance_42 = new lib.Path_0_2();
	this.instance_42.setTransform(754.6,411.15,1,1,0,0,0,67.5,39.1);
	this.instance_42.alpha = 0.5508;

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_232.setTransform(820.05,411.125);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#F5DABA").s().p("AqTBdIUAjnIAnAuI0ADng");
	this.shape_233.setTransform(756.025,459.45);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_234.setTransform(817.225,409.675);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FBF6DF").s().p("AqTBcIUAjmIAnAvI0ADmg");
	this.shape_235.setTransform(753.225,456);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#C3E0C4").s().p("AqAjeIUAjsIABKtI0ADog");
	this.shape_236.setTransform(751.2,419.35);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#BB8B7A").s().p("EgsBAXjMAAAhYeMBX7ApUMAAIBYjg");
	this.shape_237.setTransform(295.05,668.875);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#F4CBA4").s().p("EgaygnSMA1dgJ8MAAJBZLMg1fAJRg");
	this.shape_238.setTransform(747.6,769.4);

	this.instance_43 = new lib.Path_42();
	this.instance_43.setTransform(883.1,395.9,1,1,0,0,0,24,39.1);
	this.instance_43.alpha = 0.5508;

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#A68168").s().p("AgSFYIgBrWIAngIIAAMNg");
	this.shape_239.setTransform(905.075,395.875);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#F5DABA").s().p("AjgANIGahHIAoAvImcBGg");
	this.shape_240.setTransform(884.55,436.2);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FBF6DF").s().p("AgSFEIgBqtIAngJIAALlg");
	this.shape_241.setTransform(902.275,394.425);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FBF6DF").s().p("AjgAMIGahGIAnAuImaBHg");
	this.shape_242.setTransform(881.725,432.75);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#C3E0C4").s().p("AjNktIGahNIABKuImaBHg");
	this.shape_243.setTransform(879.725,396.1);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#F4D2A3").s().p("EhQ8AMVMCh5gc4IAAEWMid0Acxg");
	this.shape_244.setTransform(1182,669.975);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#87B1B5").s().p("EhLoAMrMCXRgcbIAAD5MiXRAbog");
	this.shape_245.setTransform(1206.175,688.2);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#94BDC3").s().p("Eg9MACqMB7egWsIAASBMh8jAWEg");
	this.shape_246.setTransform(1291.925,731.25);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#F2C99D").s().p("EhQmgeSMChFgb9MAAIBYAMignAcfg");
	this.shape_247.setTransform(1174.55,527.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.instance_43},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.instance_42},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.instance_41},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.instance_40},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.instance_39},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.instance_38},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.instance_37},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.instance_36},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.instance_35},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.instance_34},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.instance_33},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.instance_32},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.instance_31},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.instance_30},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.instance_29},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.instance_28},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.instance_27},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.instance_26},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.instance_25},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.instance_24},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.instance_23},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.instance_22},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.instance_21},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.instance_20},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.instance_19},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.instance_18},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.instance_17},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.instance_16},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.instance_15},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.instance_14},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.instance_13},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.instance_12},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.instance_11},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.instance_10},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.instance_9},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.instance_8},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.instance_7},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.instance_6},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.instance_5},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.instance_4},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.instance_3},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.instance_2},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.instance_1},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.apt, new cjs.Rectangle(0,0,1700.1,1084.5), null);


(lib.peter3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_38 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EghvBPzMAAAieXMDobAAAMAAACeXg");
	mask.setTransform(1271.575,510.725);

	// LLarm_copy
	this.instance = new lib.Symbol13();
	this.instance.setTransform(1334,1310.9,1,1,0,0,0,231.4,494.4);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:1263.65,y:771.75},29).to({x:1313.35,y:731},15).wait(11).to({x:1427.45,y:1174.8},15).wait(110));

	// login
	this.instance_1 = new lib.Tween51("synched",0);
	this.instance_1.setTransform(1818.4,403.75);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({startPosition:0},80).to({alpha:1},9).wait(91));

	// Layer_36_copy
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg/jgezMB/HAAAMgQcA9nMhfRgACg");
	this.shape.setTransform(1823.6,426.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EgwJAeyMgPag9lMB/IAAAMgQdA9ng");
	this.shape_1.setTransform(1823.6,426.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg+pgeuMB9TAAAMgPXA9eMhfigACg");
	this.shape_2.setTransform(1823.225,425.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("EgwPAeuMgOag9dMB9TAAAMgPXA9fg");
	this.shape_3.setTransform(1823.225,425.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg9ugeqMB7dAAAMgORA9VMhfzgABg");
	this.shape_4.setTransform(1822.875,424.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("EgwVAeqMgNZg9UMB7dAAAMgORA9Vg");
	this.shape_5.setTransform(1822.875,424.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg8zgemMB5nAAAMgNKA9NMhgFgABg");
	this.shape_6.setTransform(1822.475,423.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("EgwbAemMgMYg9MMB5nAABMgNKA9Mg");
	this.shape_7.setTransform(1822.475,423.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg74geiMB3xAAAMgMEA9FMhgWgACg");
	this.shape_8.setTransform(1822.125,422.375);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("EgwhAehMgLXg9DMB3xAAAMgMEA9Fg");
	this.shape_9.setTransform(1822.125,422.375);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg69geeMB17AAAMgK+A89MhgngACg");
	this.shape_10.setTransform(1821.75,421.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("EgwnAedMgKWg86MB17AAAMgK+A87g");
	this.shape_11.setTransform(1821.75,421.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg6CgeZMB0FAAAMgJ4A8zMhg4gABg");
	this.shape_12.setTransform(1821.375,420.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("EgwtAeZMgJVg8yMB0FAAAMgJ4A8zg");
	this.shape_13.setTransform(1821.375,420.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg5HgeVMByPAAAMgIyA8rMhhJgABg");
	this.shape_14.setTransform(1821.025,419.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("EgwzAeVMgIUg8qMByPAAAMgIyA8rg");
	this.shape_15.setTransform(1821.025,419.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg4MgeRMBwZAABMgHrA8iMhhbgABg");
	this.shape_16.setTransform(1820.625,418.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("Egw5AeRMgHTg8iMBwZAABMgHrA8ig");
	this.shape_17.setTransform(1820.625,418.025);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg3RgeNMBujAABMgGlA8ZMhhsAAAg");
	this.shape_18.setTransform(1820.275,416.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("Egw/AeNMgGSg8aMBujAABMgGlA8Zg");
	this.shape_19.setTransform(1820.275,416.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg2XgeIMBsuAAAMgFfA8RMhh+AAAg");
	this.shape_20.setTransform(1819.9,415.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("EgxGAeIMgFRg8QMBsuAABMgFfA8Qg");
	this.shape_21.setTransform(1819.9,415.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg1cgeEMBq5AABMgEZA8IMhiPgABg");
	this.shape_22.setTransform(1819.525,414.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("EgxLAeEMgERg8IMBq5AABMgEZA8Ig");
	this.shape_23.setTransform(1819.525,414.775);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg0hgd/MBpDAAAMgDTA8AMhihgABg");
	this.shape_24.setTransform(1819.175,413.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("EgxSAd/MgDPg7+MBpDAAAMgDTA8Ag");
	this.shape_25.setTransform(1819.175,413.7);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Egzmgd8MBnNAABMgCMA73MhiygABg");
	this.shape_26.setTransform(1818.775,412.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#333333").s().p("EgxXAd8MgCPg74MBnNAABMgCMA74g");
	this.shape_27.setTransform(1818.775,412.6);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Egyrgd3MBlXAAAMgBGA7vMhjEgABg");
	this.shape_28.setTransform(1818.425,411.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#333333").s().p("EgxeAd3MgBNg7uMBlXAAAMgBGA7vg");
	this.shape_29.setTransform(1818.425,411.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EgxkAdzMBjVAABMAAAg7mMhjhgABg");
	this.shape_30.setTransform(1818.05,410.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("EgxjAdzMgANg7mMBjhAABMAAAA7mg");
	this.shape_31.setTransform(1818.05,410.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},29).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_17},{t:this.shape_16}]},1).to({state:[{t:this.shape_19},{t:this.shape_18}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_23},{t:this.shape_22}]},1).to({state:[{t:this.shape_25},{t:this.shape_24}]},1).to({state:[{t:this.shape_27},{t:this.shape_26}]},1).to({state:[{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_31},{t:this.shape_30}]},1).wait(136));

	// Layer_30_copy
	this.instance_2 = new lib.Symbol12();
	this.instance_2.setTransform(1823.6,660.95,0.8408,0.8408,0,0,0,484.1,0);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:484,regY:116.5,scaleY:0.7587,x:1823.45,y:747.1},0).wait(1).to({scaleY:0.6767,x:1823.35,y:735.3},0).wait(1).to({scaleY:0.5946,x:1823.3,y:723.45},0).wait(1).to({scaleY:0.5126,x:1823.2,y:711.65},0).wait(1).to({scaleY:0.4306,x:1823.15,y:699.85},0).wait(1).to({scaleY:0.3485,x:1823.05,y:688.05},0).wait(1).to({scaleY:0.2665,x:1823,y:676.25},0).wait(1).to({scaleY:0.1844,x:1822.9,y:664.45},0).wait(1).to({scaleY:0.1024,x:1822.85,y:652.65},0).wait(1).to({scaleY:0.0204,x:1822.75,y:640.8},0).wait(1).to({scaleY:0.0698,skewX:180,x:1822.8,y:629.5,alpha:1},0).wait(1).to({scaleY:0.16,x:1822.85,y:618.25},0).wait(1).to({scaleY:0.2502,x:1822.9,y:607},0).wait(1).to({scaleY:0.3403,x:1822.95,y:595.75},0).wait(1).to({scaleY:0.4305,y:584.45},0).wait(1).to({scaleY:0.5207,x:1823,y:573.2},0).wait(1).to({scaleY:0.6109,x:1823.05,y:561.95},0).wait(1).to({scaleY:0.701,x:1823.1,y:550.7},0).wait(1).to({scaleY:0.7912,x:1823.15,y:539.45},0).wait(1).to({scaleY:0.8814,y:528.1},0).wait(1).to({scaleY:0.9715,x:1823.2,y:516.85},0).wait(1).to({scaleY:1.0617,x:1823.25,y:505.6},0).wait(1).to({scaleY:1.1519,x:1823.3,y:494.35},0).wait(1).to({scaleY:1.2421,x:1823.35,y:483.1},0).wait(1).to({scaleY:1.3322,y:471.8},0).wait(1).to({scaleY:1.4224,x:1823.4,y:460.55},0).wait(1).to({scaleY:1.5126,x:1823.45,y:449.3},0).wait(1).to({scaleY:1.6028,x:1823.5,y:438.05},0).wait(1).to({scaleY:1.6929,y:426.8},0).to({_off:true},1).wait(150));

	// Layer_36
	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhLngjJMCXPAAAMgTkBGTMhxWgABg");
	this.shape_32.setTransform(1823.575,417.65);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#CFD5E0").s().p("Eg5SAjJMgSVhGSMCXPAAAMgTkBGTg");
	this.shape_33.setTransform(1823.575,417.65);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhKYgjOMCUxAAAMgSRBGdMhxYgACg");
	this.shape_34.setTransform(1823.25,417.175);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CFD5E0").s().p("Eg5PAjNMgRJhGbMCUxAAAMgSRBGdg");
	this.shape_35.setTransform(1823.25,417.175);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhJJgjTMCSTAAAMgQ+BGnMhxagACg");
	this.shape_36.setTransform(1822.925,416.675);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#CFD5E0").s().p("Eg5OAjSMgP7hGlMCSTAAAMgQ+BGng");
	this.shape_37.setTransform(1822.925,416.675);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhH6gjYMCP1AAAMgPqBGxMhxcgACg");
	this.shape_38.setTransform(1822.6,416.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#CFD5E0").s().p("Eg5LAjXMgOvhGvMCP0AAAMgPqBGxg");
	this.shape_39.setTransform(1822.6,416.2);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhGqgjcMCNVAAAMgOXBG5MhxdgABg");
	this.shape_40.setTransform(1822.25,415.725);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#CFD5E0").s().p("Eg5KAjcMgNghG4MCNVAAAMgOXBG5g");
	this.shape_41.setTransform(1822.25,415.725);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhFbgjhMCK3AAAMgNDBHDMhxggABg");
	this.shape_42.setTransform(1821.925,415.25);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#CFD5E0").s().p("Eg5HAjhMgMUhHCMCK3AAAMgNDBHDg");
	this.shape_43.setTransform(1821.925,415.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhEMgjmMCIZAAAMgLwBHNMhxjgABg");
	this.shape_44.setTransform(1821.6,414.75);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#CFD5E0").s().p("Eg5GAjmMgLFhHMMCIXAAAMgLvBHNg");
	this.shape_45.setTransform(1821.6,414.75);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhC8gjrMCF5AAAMgKcBHXMhxkgABg");
	this.shape_46.setTransform(1821.275,414.275);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#CFD5E0").s().p("Eg5DAjrMgJ5hHWMCF5AAAMgKcBHXg");
	this.shape_47.setTransform(1821.275,414.275);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhBtgjvMCDbAAAMgJJBHgMhxngABg");
	this.shape_48.setTransform(1820.975,413.8);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#CFD5E0").s().p("Eg5CAjwMgIrhHgMCDbAAAMgJJBHhg");
	this.shape_49.setTransform(1820.975,413.8);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("EhAegj0MCA9AAAMgH2BHpMhxpAAAg");
	this.shape_50.setTransform(1820.65,413.325);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#CFD5E0").s().p("Eg4/Aj1MgHfhHpMCA8AAAMgH0BHpg");
	this.shape_51.setTransform(1820.65,413.325);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg/Ogj5MB+dAAAMgGhBHzMhxsAAAg");
	this.shape_52.setTransform(1820.325,412.825);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#CFD5E0").s().p("Eg4+Aj6MgGQhHzMB+dAAAMgGhBHzg");
	this.shape_53.setTransform(1820.325,412.825);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg9/gj+MB7/AAAMgFOBH9MhxuAAAg");
	this.shape_54.setTransform(1820,412.35);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#CFD5E0").s().p("Eg47Aj+MgFEhH8MB7/AAAMgFOBH9g");
	this.shape_55.setTransform(1820,412.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg8wgkDMB5gAAAMgD6BIHMhxwgABg");
	this.shape_56.setTransform(1819.65,411.875);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#CFD5E0").s().p("Eg46AkDMgD1hIGMB5fAAAMgD6BIHg");
	this.shape_57.setTransform(1819.65,411.875);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg7ggkHMB3BAAAMgCnBIQMhxxAAAg");
	this.shape_58.setTransform(1819.325,411.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#CFD5E0").s().p("Eg43AkJMgCphIQMB3BAAAMgCnBIQg");
	this.shape_59.setTransform(1819.325,411.4);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg6RgkMMB0jAAAMgBTBIaMhx0AAAg");
	this.shape_60.setTransform(1819,410.9);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#CFD5E0").s().p("Eg42AkOMgBbhIaMB0jAAAMgBTBIag");
	this.shape_61.setTransform(1819,410.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("Eg4zAkSMBx2AAAMAAAhIjMhyFAAAg");
	this.shape_62.setTransform(1818.675,410.425);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#CFD5E0").s().p("Eg4zAkSMgAPhIjMByFAAAMAAABIjg");
	this.shape_63.setTransform(1818.675,410.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_33},{t:this.shape_32}]},29).to({state:[{t:this.shape_35},{t:this.shape_34}]},1).to({state:[{t:this.shape_37},{t:this.shape_36}]},1).to({state:[{t:this.shape_39},{t:this.shape_38}]},1).to({state:[{t:this.shape_41},{t:this.shape_40}]},1).to({state:[{t:this.shape_43},{t:this.shape_42}]},1).to({state:[{t:this.shape_45},{t:this.shape_44}]},1).to({state:[{t:this.shape_47},{t:this.shape_46}]},1).to({state:[{t:this.shape_49},{t:this.shape_48}]},1).to({state:[{t:this.shape_51},{t:this.shape_50}]},1).to({state:[{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.shape_55},{t:this.shape_54}]},1).to({state:[{t:this.shape_57},{t:this.shape_56}]},1).to({state:[{t:this.shape_59},{t:this.shape_58}]},1).to({state:[{t:this.shape_61},{t:this.shape_60}]},1).to({state:[{t:this.shape_63},{t:this.shape_62}]},1).wait(136));

	// Layer_30
	this.instance_3 = new lib.Symbol11();
	this.instance_3.setTransform(1823.55,642.45,1,1,0,0,0,484,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regY:116.5,scaleY:0.899,y:747.2},0).wait(1).to({scaleY:0.7979,y:735.4},0).wait(1).to({scaleY:0.6969,y:723.65},0).wait(1).to({scaleY:0.5958,y:711.85},0).wait(1).to({scaleY:0.4948,y:700.1},0).wait(1).to({scaleY:0.3937,y:688.3},0).wait(1).to({scaleY:0.2927,y:676.55},0).wait(1).to({scaleY:0.1916,y:664.75},0).wait(1).to({scaleY:0.0906,y:653},0).wait(1).to({scaleY:0.0105,skewX:180,y:641.25},0).wait(1).to({scaleY:0.1115,y:629.45},0).wait(1).to({scaleY:0.2126,y:617.7},0).wait(1).to({scaleY:0.3136,y:605.9},0).wait(1).to({scaleY:0.4147,y:594.15},0).wait(1).to({scaleY:0.5157,y:582.35},0).wait(1).to({scaleY:0.6168,y:570.6},0).wait(1).to({scaleY:0.7178,y:558.85},0).wait(1).to({scaleY:0.8189,y:547.05},0).wait(1).to({scaleY:0.9199,y:535.3},0).wait(1).to({scaleY:1.0209,y:523.5},0).wait(1).to({scaleY:1.122,y:511.75},0).wait(1).to({scaleY:1.223,y:499.95},0).wait(1).to({scaleY:1.3241,y:488.2},0).wait(1).to({scaleY:1.4251,y:476.4},0).wait(1).to({scaleY:1.5262,y:464.65},0).wait(1).to({scaleY:1.6272,y:452.9},0).wait(1).to({scaleY:1.7283,y:441.1},0).wait(1).to({scaleY:1.8293,y:429.35},0).wait(1).to({scaleY:1.9304,y:417.55},0).to({_off:true},1).wait(150));

	// Bcomputer
	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#B2B8C1").s().p("A2bF1QgIgQAKgWIECrIQAKgJALABMAlSgADQAMAAAJAJIC4LHQAGAcgHAMQgHAOgXAAMgr5AADQgYAAgIgQg");
	this.shape_64.setTransform(1818.5799,832.1487,0.9746,1);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#B2B8C1").s().p("Eg8kAIqQgdgEgBgcQgCgfAkgyIHSvJQAhgUAmABMBowgAHQAogBAfAUIHDPIQAlA0guAcQg1AhikAAMg6nAAFMg5IAAEIiGgBg");
	this.shape_65.setTransform(1816.6971,720.7567,0.9746,1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#CFD5E0").s().p("EhMlAStQgqgqAAg8QAAgxAfgoMAR1giWQAPgSAUgKQAUgKAXAAMBzYgAHQAXAAAVAKQAUAKAOARMAR5AiUQAlAvgIA7QgHA8gvAkQgnAfgxAAMiWAAAJIgCAAQg6AAgqgpg");
	this.shape_66.setTransform(1819.0766,764.5253,0.9746,1);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#C2C7CE").s().p("EhJ5AALQhPgngxguIghgnMCY1gATQhQCZl3BEQh1AViEAKIhuAFMh+WAAIIgEAAQnQAAj8h6g");
	this.shape_67.setTransform(1819.6241,895.3501,0.9746,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64}]}).wait(180));

	// legs
	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#4471B7").s().p("Eg2sAqTMA0ghJpQEalGHqi8QHmi6IpAAQIoAAHmC6QHrC8EbFGIATUKMgCXA1fg");
	this.shape_68.setTransform(1463.7,751.125);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#4471B7").s().p("Eg0XAqTMgCCg1fIgT0KQEZlEH2i+QHsi6IrAAQIoAAHnC6QHrC9EYFFMA0iBJpg");
	this.shape_69.setTransform(2162.1,751.125);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#335C9A").s().p("AkPfDMAAAg+FIIfAAMAAAA+Fg");
	this.shape_70.setTransform(1807.925,822.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68}]}).wait(180));

	// box
	this.instance_4 = new lib.ClipGroup_5();
	this.instance_4.setTransform(1596.55,524.55,1,1,0,0,0,1001.9,497.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(180));

	// room
	this.instance_5 = new lib.ClipGroup_1();
	this.instance_5.setTransform(1571.45,500.3,1.0025,1.0208,0,0,0,1571.4,510.9);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#CCAD8D").s().p("Eh0cAh3MAAAhDtMDo5AAAMAAABDtg");
	this.shape_71.setTransform(1798.825,223.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_71},{t:this.instance_5}]}).wait(180));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.9,-21.2,3151,1043.1);


(lib.LMonboarding = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1B1516").s().p("Ag2BKIAHgQQANAJAMAEQALAEAOgBQATABAJgLQAKgJAAgUIAAgXQgGAMgLAHQgMAHgPAAQgRAAgOgIQgNgJgHgOQgIgOAAgTQAAgUAIgPQAHgPANgHQAOgIARAAQAPgBALAHQAMAGAGANIAAgWIAWAAIAAB5QAAAdgPAQQgQAPgdgBQgiABgXgTgAgdg9QgLANAAAWQAAAWALAMQALAMASAAQATAAALgMQALgMAAgWQAAgWgLgNQgKgMgUAAQgSAAgLAMg");
	this.shape.setTransform(63.425,159.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1516").s().p("AAjBDIAAhQQAAgSgIgJQgGgIgQAAQgRAAgLALQgLALAAATIAABKIgVAAIAAiCIAVAAIAAAVQAGgMAMgGQAMgGANAAQAwAAgBA0IAABRg");
	this.shape_1.setTransform(48.3,157.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1B1516").s().p("AgKBeIAAiCIAVAAIAACCgAgMhFIAAgYIAZAAIAAAYg");
	this.shape_2.setTransform(37.475,154.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1516").s().p("AgiBYQgNgJgHgQQgHgPAAgVQAAgUAHgOQAHgQANgIQAOgIARAAQAOAAAMAGQALAHAGAMIAAhRIAWAAIAAC9IgWAAIAAgYQgGANgLAGQgMAHgOAAQgRAAgOgIgAgdgIQgKAMAAAXQAAAYAKAOQALANASAAQAUAAAKgNQAKgNAAgYQAAgYgKgMQgKgNgUAAQgSAAgLANg");
	this.shape_3.setTransform(26.125,154.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1B1516").s().p("AgkBDIAAiCIAVAAIAAAXQALgXAfgDIAIAAIACASIgOACQgVACgIAKQgJALAAAQIAABKg");
	this.shape_4.setTransform(14.925,157.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1B1516").s().p("AgeA/QgKgFgHgJQgGgKAAgLQAAgOAHgJQAIgHARgEQASgDAdAAIAGAAIAAgJQAAgRgGgHQgHgHgPAAQgVAAgXAOIgIgQQALgIAOgEQAOgEANAAQAZAAAMAMQANANAAAaIAABSIgWAAIAAgWQgEALgLAHQgKAGgNAAQgNAAgLgFgAgHAGQgNACgFAFQgFAEgBAKQABAKAHAHQAIAHAMAAQAPAAAKgLQAKgLAAgRIAAgIIgEAAQgYAAgLACg");
	this.shape_5.setTransform(1.8,157.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1B1516").s().p("AggA8QgOgJgIgPQgIgQABgUQgBgUAIgPQAIgQAOgIQAOgIASAAQASAAAOAIQAPAIAIAQQAHAPAAAUQAAAUgHAQQgIAPgPAJQgOAIgSAAQgSAAgOgIgAgdgkQgLANAAAXQAAAYALANQAKANATAAQATAAALgNQAKgNAAgYQAAgXgKgNQgLgNgTAAQgTAAgKANg");
	this.shape_6.setTransform(-12.6,157.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1B1516").s().p("AgWBZQgMgGgGgNIAAAYIgVAAIAAi9IAVAAIAABRQAGgMAMgHQALgGAPAAQARAAANAIQANAIAIAQQAHAOAAAUQAAAVgHAPQgIAQgNAJQgNAIgRAAQgPAAgLgHgAgdgIQgLAMAAAYQAAAYALANQAKANATAAQATAAAKgNQALgOAAgYQAAgXgLgMQgKgNgTAAQgTAAgKANg");
	this.shape_7.setTransform(-27.525,154.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1B1516").s().p("AAjBDIAAhQQAAgSgIgJQgHgIgPAAQgRAAgLALQgLALAAATIAABKIgWAAIAAiCIAWAAIAAAVQAGgMAMgGQAMgGANAAQAwAAAAA0IAABRg");
	this.shape_8.setTransform(-43.4,157.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1B1516").s().p("AgtBVQgUgLgKgWQgLgWAAgeQAAgdALgWQAKgWAUgLQATgMAaAAQAbAAATAMQAUALAKAWQALAWAAAdQAAAegLAWQgKAWgUALQgUAMgaAAQgaAAgTgMgAgug5QgRAUAAAlQAAAmARAUQARAVAdAAQAeAAARgVQARgUAAgmQAAglgRgUQgRgUgeAAQgdAAgRAUg");
	this.shape_9.setTransform(-61.375,154.375);

	this.instance = new lib.ClipGroup_3();
	this.instance.setTransform(0,0.65,1,1,0,0,0,185.5,176.1);

	this.instance_1 = new lib.ClipGroup_1_1();
	this.instance_1.setTransform(0,-21.55,1,1,0,0,0,185.5,153.9);

	this.instance_2 = new lib.ClipGroup_2_1();
	this.instance_2.setTransform(0,-17.65,1,1,0,0,0,185.5,157.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F1AC28").s().p("A6oWWQg+AAgsgsQgsgsAAg/MAAAgn9QAAg+AsgtQAsgsA+AAMA1QAAAQA/AAAsAsQAsAtAAA+MAAAAn9QAAA/gsAsQgsAsg/AAg");
	this.shape_10.setTransform(0,-32.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.LMonboarding, new cjs.Rectangle(-185.5,-175.4,371,352.1), null);


(lib.LMod = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1B1516").s().p("AgGBKQgLgMgBgWIAAhEIgZAAIAAgSIAZAAIAAgoIAWAAIAAAoIAlAAIAAASIglAAIAABCQAAAfAcAAIAMgBIgBASIgOABQgXAAgMgNg");
	this.shape.setTransform(71.7,155.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B1516").s().p("AggA8QgOgJgIgPQgIgQAAgUQAAgUAIgPQAIgQAOgIQAOgIASAAQASAAAPAIQAOAIAHAQQAJAPgBAUQABAUgJAQQgHAPgOAJQgPAIgSAAQgSAAgOgIgAgdgkQgKANAAAXQAAAYAKANQAKANATAAQATAAALgNQAKgNAAgYQAAgXgKgNQgLgNgTAAQgTAAgKANg");
	this.shape_1.setTransform(59.65,157.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1B1516").s().p("Ag9BcIAAizIAVAAIAAAWQAGgNAMgGQALgHAPABQARgBANAJQANAJAIAPQAHAPAAAVQAAAUgHAPQgIAPgNAJQgNAIgRAAQgPAAgLgHQgMgHgGgMIAABJgAgdg8QgLANAAAYQAAAXALANQAKAOATAAQATAAAKgNQALgNAAgXQAAgXgLgOQgKgNgTAAQgTAAgKAMg");
	this.shape_2.setTransform(44.725,159.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B1516").s().p("AgoAyQgSgSAAggQAAgTAIgQQAIgPAOgJQAOgIARAAQAaAAAPARQAPARAAAeIAAAHIhfAAQABAXALAMQALALAUAAQAXAAAUgPIAHAQQgJAIgOAEQgNAFgOAAQgeAAgRgSgAAogJQgBgUgJgLQgKgKgQAAQgRAAgLAKQgKALgCAUIBMAAIAAAAg");
	this.shape_3.setTransform(29.4,157.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1B1516").s().p("AhPBfIAAi9IBAAAQAtAAAZAZQAZAYAAAtQAAAugZAYQgZAZgtAAgAg5BMIApAAQBJAAAAhMQAAhLhJAAIgpAAg");
	this.shape_4.setTransform(12.625,154.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1B1516").s().p("AgoAyQgSgSAAggQAAgTAIgQQAIgPAOgJQAOgIARAAQAaAAAPARQAPARAAAeIAAAHIhfAAQABAXALAMQAMALATAAQAYAAASgPIAIAQQgJAIgOAEQgNAFgOAAQgeAAgRgSgAAogJQgBgUgJgLQgJgKgRAAQgRAAgKAKQgLALgCAUIBMAAIAAAAg");
	this.shape_5.setTransform(-11.7,157.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1B1516").s().p("AgZA8QgOgJgIgPQgHgPAAgVQAAgTAIgQQAIgPAOgJQAOgIATAAQANAAANAEQAMAFAIAIIgHAQQgTgPgTAAQgTAAgLANQgMANAAAXQAAAYAMANQALANATAAQATAAATgPIAHAQQgIAIgNAFQgMAEgOAAQgSAAgPgIg");
	this.shape_6.setTransform(-24.975,157.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1B1516").s().p("AgKBeIAAiCIAVAAIAACCgAgMhFIAAgYIAZAAIAAAYg");
	this.shape_7.setTransform(-34.875,154.475);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1B1516").s().p("AgTBfIAAhxIgaAAIAAgRIAaAAIAAgEQAAgbANgNQAMgNAbgCIALAAIACARIgNAAQgQABgIAJQgHAHAAASIAAAHIAlAAIAAARIglAAIAABxg");
	this.shape_8.setTransform(-42.075,154.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1B1516").s().p("AgTBfIAAhxIgaAAIAAgRIAaAAIAAgEQAAgbANgNQAMgNAbgCIALAAIACARIgNAAQgQABgIAJQgHAHAAASIAAAHIAlAAIAAARIglAAIAABxg");
	this.shape_9.setTransform(-50.925,154.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1B1516").s().p("AgtBVQgUgLgKgWQgLgWAAgeQAAgdALgWQAKgWAUgLQATgMAaAAQAbAAATAMQAUALAKAWQALAWAAAdQAAAegLAWQgKAWgUALQgUAMgaAAQgaAAgTgMgAgug5QgRAUAAAlQAAAmARAUQARAVAdAAQAeAAARgVQARgUAAgmQAAglgRgUQgRgUgeAAQgdAAgRAUg");
	this.shape_10.setTransform(-65.975,154.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FD3A37").ss(0.5).p("AAAASQgKgCgGgIQgFgFAAgFQAAgGAEgEQAHgHAKACQAMACAHAJQAEAGgBAGQgBAHgHADQgGADgIgBg");
	this.shape_11.setTransform(-39.7062,-49.4472);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAAASQgKgCgGgIQgFgFAAgFQAAgGAEgEQAHgHAKACQAMACAHAJQAEAGgBAGQgBAHgHADQgEACgFAAIgFAAg");
	this.shape_12.setTransform(-39.7062,-49.4472);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FD3A37").ss(0.5).p("AglAqIAAgTIADgBQAFAAAKABQADAAAAgCQgBgYABgZQAAgCgDgBIgSgFIAAgTQAaACAeAGIAABKQAAADACAAIAPAFIACACIAAASg");
	this.shape_13.setTransform(-39.8,-41.496);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgkAqIAAgSIABgBIAQABQABAAAAAAQABgBAAAAQABAAAAgBQAAAAAAgBIAAgwQAAgBAAAAQAAgBgBAAQAAAAAAgBQgBAAAAAAIgSgFIAAgUQAZACAeAHIAABJQAAABAAABQAAAAABABQAAAAAAAAQABABAAAAIAPAEIABACIAAATg");
	this.shape_14.setTransform(-39.8,-41.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FD3A37").ss(0.5).p("AAsgrIAAAiIgXgEIgCgJQAAgBgBgCQgOgEgGAIQgHAHABAOQABALAHAGQAFAFAJADQAMAEARgCIACAaIgPAAQgTgBgNgEQgUgHgMgOQgHgJgDgNQgEgWAJgQQAHgMAPgFQARgFAXAGQAHABAOAFg");
	this.shape_15.setTransform(-31.5368,-39.8815);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAeA1QgSgBgNgEQgVgHgMgOQgHgJgCgNQgEgWAJgQQAHgMAOgFQARgFAYAGIAVAGIAAAiIgXgEIgCgJIgCgDQgOgEgGAIQgGAHABAOQABALAGAGQAFAFAKADQAMAEAQgCIADAag");
	this.shape_16.setTransform(-31.5615,-39.8815);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#FD3A37").ss(0.5).p("AASgVIAAA5IAPAFQACAAAAACIAAAQIhFgMIAAgQQAAgCACAAIAPABIAAg6IgJgCIgBACIgCAIIgbgFIAAghIBxAUIAAAhIgbgEIgCgLg");
	this.shape_17.setTransform(-21.925,-26.7748);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgiAvIAAgQQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAIAPABIAAg6IgJgCIgBACIgCAIIgbgFIAAghIBxAUIAAAhIgbgEIgCgLIgKgBIAAA5IAPAFQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAIAAAQg");
	this.shape_18.setTransform(-21.925,-26.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#FD3A37").ss(0.5).p("AApAUIgWgEIgCgCQgBgDgBAAIgIgBQgCAAAAABIAAARQAAACABAAIAMACIABgBQABgEAAAAQABgBAEABIAXAEIAAAcIhfgRIAAgPQAAgCACAAIAPAAIAAg9IgRgEIAAgSIBfAQIAAAcIgDAAIgXgEQgCgBAAgCIgBgCIgCgCIgKgCQgCAAAAACIAAAOQAAACACAAIAIACQACAAAAgCQAAgCADAAIAVAEg");
	this.shape_19.setTransform(-57.95,-32.924);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgvAqIAAgPQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIAPAAIAAg9IgRgEIAAgSIBfAQIAAAcIgDAAIgXgEQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBIgBgCIgCgCIgLgCQAAAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAABIAAAOQAAABAAAAQAAABAAAAQAAAAABAAQAAAAAAAAIAJACQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAIAVAEIAAAbIgXgEIgBgCQAAgBgBAAQAAgBAAAAQAAAAgBgBQAAAAAAAAIgJgBQAAAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAAAIAAARQAAAAAAABQAAAAAAAAQAAABAAAAQABAAAAAAIALACIACgBIACgEIADAAIAYAEIAAAcg");
	this.shape_20.setTransform(-57.95,-32.925);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#FD3A37").ss(0.5).p("Ag1gmIAAgSIACAAIAzAJQAVADAOAIQAOAIAEAMQAEALgDAJQgDAJgIAGQgLAHgRgBQgKgBgFgBIgBAAIAAALIAMAEQADABAAABQABAAAAADIAAAOIhEgMIgBgQQAAgCACAAIAPABIAAg7QAAgDgDAAgAgBACQAJADAGgEQAFgBAAgHQABgGgEgEQgGgHgLgBg");
	this.shape_21.setTransform(-46.6607,-31.2528);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("Ag1AtIgBgQQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAIAPABIAAg7QAAgBAAAAQAAgBgBAAQAAAAgBgBQAAAAgBAAIgNgDIAAgTIACAAIAzAJQAVADAOAIQAOAIAEAMQAEALgDAJQgDAJgIAGQgLAHgRgBIgPgBIgBgBIAAAMIAMADIADACIABAEIAAANgAgBACQAJADAGgEQAFgBAAgHQABgFgEgFQgGgHgLgBg");
	this.shape_22.setTransform(-46.6607,-31.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#FD3A37").ss(0.5).p("AA1APIhFgMQAAAKAHAHQAHAFAKADQARAEAUgDIACAAIADAYIgNABQgWABgSgFQgPgEgMgJQgRgMgEgUQgEgPAFgPQAHgZAagDQAWgDAVAMQAXAMAEAbQACALgCAJgAATgKQABgKgJgGQgFgEgGAAQgGgBgFAEQgEADgBAIg");
	this.shape_23.setTransform(-20.912,-38.1477);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgDAyQgPgEgMgJQgRgMgEgUQgEgPAFgPQAHgZAagDQAWgDAVAMQAXAMAEAbQACALgCAJIhFgMQAAAKAHAHQAHAFAKADQARAEAUgDIACAAIADAYIgNABIgIAAQgSAAgOgEgAgLgbQgEADgBAIIAjAGQABgKgJgGQgFgEgGAAIgBAAQgGAAgEADg");
	this.shape_24.setTransform(-20.912,-38.1477);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#FD3A37").ss(0.5).p("AAMAxIAOAEQAFACABABQABABgBAFIAAANIhLgNIAAgPQAAgEAAAAQABgBAEAAIAPABIAAgyQAAgDgCAAIgUgEIAAgXIAWADIAAgJQABgKACgFQAEgMAPgEQAKgCATADIAOAEIADABIgCAYIgJgDIgMgCQgJAAgBAKIAAAMIAYAEIAAAXIgYgEg");
	this.shape_25.setTransform(-48.0845,-45.0041);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgrA+IAAgOIAAgFQABgBAFABIAOAAIAAgyQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAgBAAIgTgDIAAgYIAVAEIAAgKIADgOQAEgNAPgDQAKgDATAEIAPADIADABIgCAYIgKgDIgMgBQgJAAgBAJIAAAMIAZAFIAAAWIgZgDIAAA1IAPAEIAFACQABACgBAEIAAAOg");
	this.shape_26.setTransform(-48.1,-45.0521);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#FD3A37").ss(0.5).p("AgrAqIASABQACAAAAgCIAAgxQAAgCgCAAIgRgDIgDgBIAAgXIADAAIANACQAFABAAgBQABAAAAgEQAAgLACgEQADgSAUgDQAMgBAXAFIAIADIgCAYIgJgDQgJgCgEAAQgIACgBAHIAAANIAXAEQACAAAAACIAAATQAAACgCAAIgVgDQgCgBAAACIAAAxQAAADACAAIAQAFQADABAAACIAAAPIgBACIhLgNg");
	this.shape_27.setTransform(-57.1839,-46.6274);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgrA+IAAgUIATABQAAAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIAAgyQAAAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgSgDIgCgBIAAgXIACAAIANADIAFAAIABgFQABgKABgFQAEgSATgCQANgCAWAGIAJACIgCAYIgKgDQgJgCgEABQgIABgBAIIAAAMIAXAEQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABIAAATQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAAAAAIgVgDQAAAAgBAAQAAAAAAAAQgBAAAAABQAAAAAAABIAAAxQAAAAAAABQAAAAABABQAAAAAAAAQABAAAAAAIAQAFQABAAABABQAAAAAAAAQABABAAAAQAAABAAAAIAAAPIgBADg");
	this.shape_28.setTransform(-57.2,-46.6661);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#FD3A37").ss(0.5).p("AgCA1QgUgEgMgIQgXgOgFgaQgCgTAIgNQAHgMAOgGQAUgHAWAFQAQADAPAKQAVANAEAZQACAOgEAMQgHARgSAHQgQAHgWgEgAgYgCIAAAGQADAQANAFQAHADAGAAQAQgBADgNQAEgMgFgKQgDgKgJgEIgGgDQgKgEgHAEQgMAEAAATg");
	this.shape_29.setTransform(-34.3101,-28.7652);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgCA1QgUgEgMgIQgXgOgFgaQgCgTAIgNQAHgMAOgGQAUgHAWAFQAQADAPAKQAVANAEAZQACAOgEAMQgHARgSAHQgKAEgNAAIgPgBgAgMgZQgMAEAAATIAAAGQADAQANAFQAHADAGAAQAQgBADgNQAEgMgFgKQgDgKgJgEIgGgDQgFgCgEAAQgFAAgDACg");
	this.shape_30.setTransform(-34.3101,-28.7652);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#FD3A37").ss(0.5).p("Ag/AsIAAgQIACgCIAPABIAAg9IgRgFIAAgSIACAAIBBALQAVAFANAIQAXANADAZQABATgGALQgHAOgPAFQgRAGgVgEIg9gMgAgKgWIAAAxQAAADACAAIALACQAQAAAFgMQADgIgCgMQgDgPgNgFQgLgDgGgBQgCgBAAADg");
	this.shape_31.setTransform(-69.06,-35.345);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgBA4Ig9gMIgBAAIAAgQIACgCIAPABIAAg9IgRgFIAAgSIACAAIBBALQAVAFANAIQAXANADAZQABATgGALQgHAOgPAFQgKAEgMAAQgIAAgIgCgAgKgWIAAAxQAAABAAABQAAAAAAABQAAAAABAAQAAAAABAAIALACQAQAAAFgMQADgIgCgMQgDgPgNgFIgRgEIgBAAQAAAAAAAAQgBAAAAABQAAAAAAAAQAAABAAAAg");
	this.shape_32.setTransform(-69.06,-35.345);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#FD3A37").ss(0.5).p("AAmAGIgCgOQgFgWgTgIQgLgEgIAAQgVABgGAUQgEAMADARQAFAUAQAIQAOAIANgCQAPgDAGgOQADgGABgNgABNAJQAAAXgLAQQgMAQgVAFQgUAFgVgGQgQgDgOgIQgegRgGgkQgDgSAEgPQAIgcAbgJQAVgIAaAGQATAFAMAIQAdARAGAgg");
	this.shape_33.setTransform(-69.851,-48.6944);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgIBEQgQgDgOgIQgegRgGgkQgDgSAEgPQAIgcAbgJQAVgIAaAGQATAFAMAIQAdARAGAgIACAPQAAAXgLAQQgMAQgVAFQgJACgKAAQgLAAgLgDgAgigVQgEAMADARQAFAUAQAIQAOAIANgCQAPgDAGgOQADgGABgNIgCgOQgFgWgTgIQgLgEgIAAQgVABgGAUg");
	this.shape_34.setTransform(-69.851,-48.6944);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#EDF5E1").s().p("AoXCDILMlHIFjBWIrGEzg");
	this.shape_35.setTransform(93.175,-24.7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#D7E5C2").s().p("AlkivILHkzIADKJIrLE8g");
	this.shape_36.setTransform(111.275,12.6);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#E7F1D7").s().p("AiyEhIgBqLIFnBDIgCKRg");
	this.shape_37.setTransform(57.6,24.65);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#ACB58D").ss(0.3).p("AAAiEIAAEJ");
	this.shape_38.setTransform(-29.25,28.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#ACB58D").ss(0.3).p("AAAiCIAAEF");
	this.shape_39.setTransform(-65.95,22.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#ACB58D").ss(0.3).p("AAAiDIAAEH");
	this.shape_40.setTransform(-48.7,25.125);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#D7E5C2").s().p("Aggh2QAZgXAogaIAAEiIhBAtg");
	this.shape_41.setTransform(-96.9,17.975);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#D7E5C2").s().p("AlgBFIAAkFILBB4IAAEKg");
	this.shape_42.setTransform(-46.95,25.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FB595E").s().p("Ay1AjIM0l4IY3EzIszF4g");
	this.shape_43.setTransform(-9.475,-76.85);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#E73430").s().p("AmZAJIMyl4IAAFnIsyF4g");
	this.shape_44.setTransform(70.15,-43.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FD3A37").s().p("AsbAaIAAlmIY3EzIAAFmg");
	this.shape_45.setTransform(-50.425,-40.05);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#D7E5C2").s().p("AmjlQINJloIAAQHItLFqg");
	this.shape_46.setTransform(68.875,-10.6);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C7D1B1").s().p("AnWBjIAAkjQBIgqBXgRQB2gXCHAaQDBAlC7BrQBeA2A3AuIAAELg");
	this.shape_47.setTransform(-46.525,20.5422);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#E7F1D7").s().p("AHhJqIAAhMIutilIAAkkQgHAEgeAXIgdAWIAAEeIjYgmIgBwVIXPEfIgCQQg");
	this.shape_48.setTransform(-47.525,-7.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#EDF5E1").s().p("AoXCDILMlHIFjBXIrGEyg");
	this.shape_49.setTransform(-93.575,-59.075);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#D7E5C2").s().p("AiyEeIgBqEIFnBCIgCKLg");
	this.shape_50.setTransform(-129.175,-10.075);

	this.instance = new lib.ClipGroup_4();
	this.instance.setTransform(0,-32.45,1,1,0,0,0,185.5,143);

	this.instance_1 = new lib.ClipGroup_1_2();
	this.instance_1.setTransform(3.55,-32.45,1,1,0,0,0,198.1,143);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#3098D4").s().p("A6oWWQg+AAgsgsQgsgsAAg/MAAAgn9QAAg+AsgtQAsgsA+AAMA1QAAAQA/AAAsAsQAsAtAAA+MAAAAn9QAAA/gsAsQgsAsg/AAg");
	this.shape_51.setTransform(0,-32.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_51},{t:this.instance_1},{t:this.instance},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.LMod, new cjs.Rectangle(-194.5,-175.4,396.1,350.9), null);


(lib.aptMan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/*
		var _this = this;
		
		_this.LMdevicemanagement.on('click', function(){
			window.open('http://www.adobe.com', '_blank');
		});
		
		_this.LMonboarding.on('click', function(){
			window.open('http://www.adobe.com', '_blank');
		});
		
		_this.LMod.on('click', function(){
			window.open('http://www.adobe.com', '_blank');
		});
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1231));

	// Layer_28
	this.instance = new lib.Tween12("synched",0);
	this.instance.setTransform(1041.15,969.35);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(998).to({_off:false},0).to({startPosition:0},126).to({alpha:0},26).to({_off:true},1).wait(80));

	// Layer_27
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape.setTransform(1451.125,1051.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggTQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_1.setTransform(1422.175,1051.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_2.setTransform(1397.475,1051.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_3.setTransform(1367.225,1051.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5gBgbgbg");
	this.shape_4.setTransform(1339.65,1047.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAguQAAgsATgjQASgiAhgTQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTARgdAKQgdAKgfAAQgsAAghgTg");
	this.shape_5.setTransform(1315.325,1051.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggAQgSQAQgRAngIQAmgIBBAAIAOAAIAAgRQAAgigOgPQgOgPgfAAQgyAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAdAeQAcAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgRAPQgZAEgLALQgLAJAAATQAAAVAQAOQAPAOAYAAQAhAAAUgWQAVgXAAgkIAAgPIgLAAQguAAgZAEg");
	this.shape_6.setTransform(1283.65,1051.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_7.setTransform(1250.925,1051.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgwDUIAAj0Ig5AAIAAgvIA5AAIAAgGQAAg8AegfQAfgfA/gDIAbgCIADAuIgbACQgkACgQAQQgPASAAAhIAAAQIBQAAIAAAvIhQAAIAAD0g");
	this.shape_8.setTransform(1224.45,1045.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_9.setTransform(1196.225,1051.35);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhICMQgYgMgNgUQgOgVAAgaQAAggAQgSQAQgRAngIQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAeIgSgqQAXgQAigKQAhgKAdAAQA7AAAdAeQAcAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgXANgcAAQgdAAgYgMgAgRAPQgZAEgLALQgLAJABATQAAAVAPAOQAPAOAYAAQAgAAAVgWQAWgXgBgkIAAgPIgLAAQguAAgZAEg");
	this.shape_10.setTransform(1162.4,1051.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_11.setTransform(1121.025,1051.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggTQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_12.setTransform(1063.475,1051.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAWAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_13.setTransform(1030.375,1045.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5gBgbgbg");
	this.shape_14.setTransform(1002.45,1047.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_15.setTransform(950.325,1051.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgsASgjQARgjAhgTQAhgSArAAQAqAAAhASQAhATASAjQARAjAAAsQAAAugRAiQgSAjghASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAaQAVAbAoAAQAnAAAWgbQAVgaAAgzQAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_16.setTransform(907.5,1051.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_17.setTransform(881.775,1051.35);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgxDUIAAj0Ig4AAIAAgvIA4AAIAAgGQAAg8AggfQAdgfBAgDIAbgCIADAuIgbACQgkACgQAQQgPASAAAhIAAAQIBQAAIAAAvIhQAAIAAD0g");
	this.shape_18.setTransform(859.15,1045.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5gBgbgbg");
	this.shape_19.setTransform(821.75,1047.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAWAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_20.setTransform(793.975,1045.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhDDEQgigKgagSIASgsQAdASAbAJQAaAHAeAAQBSAAAAhSIAAguQgMAagaAOQgaAPghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgrARgiQARghAegSQAdgSAnAAQAgAAAaAOQAZAOAOAbIAAgwIA8AAIAAEMQAABDgkAjQgkAihFAAQglAAgigKgAg8iCQgWAZAAAuQAAAuAXAYQAWAaAmAAQAnAAAXgaQAWgYAAguQAAgtgWgaQgWgagoAAQgmAAgXAag");
	this.shape_21.setTransform(757.925,1056.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_22.setTransform(733.725,1045.175);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AhICMQgYgMgNgUQgOgVAAgaQAAggARgSQAQgRAmgIQAmgIBCAAIANAAIAAgRQABgigOgPQgPgPggAAQgwAAgyAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgXANgcAAQgdAAgYgMgAgQAPQgZAEgLALQgLAJAAATQAAAVAPAOQAPAOAZAAQAfAAAWgWQAUgXAAgkIAAgPIgKAAQgvAAgYAEg");
	this.shape_23.setTransform(709.95,1051.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_24.setTransform(685.525,1051.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5gBgbgbg");
	this.shape_25.setTransform(661.8,1047.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgQgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgaAAgQAKQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_26.setTransform(636.725,1051.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAixIA9AAIAAGmIg9AAIAAgzQgNAbgZAOQgZANggAAQgmABgdgUgAg7gOQgWAZAAAxQAAAyAWAbQAWAcAnAAQAnAAAVgbQAWgagBgyQABgygWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_27.setTransform(1667.45,973.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_28.setTransform(1634.775,979.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_29.setTransform(1610.075,979.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_30.setTransform(1581.125,979.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgbCSIh+kjIA/AAIBbDfIBcjfIA9AAIiAEjg");
	this.shape_31.setTransform(1549.7,979.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_32.setTransform(1526.825,973.325);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgdDTIAAmlIA7AAIAAGlg");
	this.shape_33.setTransform(1512.275,973.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_34.setTransform(1489.225,979.7);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgiAdgTQAegSAmAAQAgAAAZANQAZAOANAbIAAixIA8AAIAAGmIg7AAIAAgzQgNAbgaAOQgZANggAAQgmABgegUgAg7gOQgWAZAAAxQAAAyAWAbQAWAcAnAAQAnAAAVgbQAVgaABgyQgBgygVgaQgVgbgnAAQgoAAgVAbg");
	this.shape_35.setTransform(1454.75,973.55);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_36.setTransform(1404.875,979.5);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_37.setTransform(1371.725,979.7);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_38.setTransform(1340.025,979.7);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AgsDIQgZgOgNgbIAAAzIg9AAIAAmmIA9AAIAACyQANgbAZgOQAZgOAgAAQAnAAAdASQAeATAQAiQARAhAAAtQAAAugRAiQgQAjgeATQgeAUgmgBQggAAgZgNgAg9gOQgVAaAAAyQAAAyAVAaQAWAbAnAAQAmABAWgcQAWgcAAgyQAAgxgWgZQgVgbgnAAQgnAAgWAbg");
	this.shape_39.setTransform(1307.275,973.55);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_40.setTransform(1258.375,979.7);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggAQgSQARgSAmgHQAmgIBBAAIAPAAIAAgRQAAgigPgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgeAAQgcAAgYgLgAgRAQQgYAEgMAJQgKALgBASQAAAVAQAOQAQAOAXABQAhgBAUgXQAWgWAAgkIAAgPIgMAAQguAAgZAFg");
	this.shape_41.setTransform(1227.5,979.7);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmlIA8AAIAACuQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_42.setTransform(1194.675,973.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_43.setTransform(1145.725,979.7);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AhDDEQgigJgagTIASgsQAdATAbAIQAaAIAeAAQBSAAAAhUIAAguQgMAbgaAPQgaAOghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgsARggQARgiAegSQAdgSAnAAQAgAAAaAPQAZAOAOAaIAAgwIA8AAIAAENQAABCgkAjQgkAihFAAQglAAgigKgAg8iDQgWAaAAAuQAAAtAXAZQAWAaAmAAQAnAAAXgaQAWgZAAgtQAAgtgWgbQgWgZgoAAQgmAAgXAZg");
	this.shape_44.setTransform(1111.125,985.1);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggAQgSQARgSAmgHQAmgIBBAAIAPAAIAAgRQAAgigPgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgeAAQgcAAgYgLgAgRAQQgYAEgMAJQgKALgBASQAAAVAQAOQAQAOAXABQAhgBAUgXQAWgWAAgkIAAgPIgMAAQguAAgZAFg");
	this.shape_45.setTransform(1077.65,979.7);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AA9DTIiKiJIAACJIg8AAIAAmlIA8AAIAAEEICAiBIBLAAIiKCKICWCYg");
	this.shape_46.setTransform(1049.05,973.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_47.setTransform(1017.275,979.7);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgeAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQABAVAPAOQAQAOAYABQAfgBAWgXQAUgWABgkIAAgPIgLAAQgvAAgYAFg");
	this.shape_48.setTransform(985.6,979.7);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AiPDMIAAmPIA9AAIAAAvQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_49.setTransform(953.125,984.9);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_50.setTransform(904.225,979.7);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_51.setTransform(882.625,973.325);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmlIA8AAIAACuQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_52.setTransform(858.125,973.35);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_53.setTransform(814.4,975.65);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggARgSQAQgSAmgHQAmgIBCAAIANAAIAAgRQABgigOgPQgPgPggAAQgwAAgyAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgQAQQgZAEgLAJQgLALAAASQAAAVAPAOQAPAOAZABQAfgBAWgXQAUgWAAgkIAAgPIgKAAQgvAAgYAFg");
	this.shape_54.setTransform(787.35,979.7);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmlIA8AAIAACuQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_55.setTransform(754.525,973.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_56.setTransform(726.6,975.65);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_57.setTransform(683.025,979.5);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgsASgjQARgjAhgTQAhgSAqAAQAsAAAgASQAhATARAjQASAjAAAsQAAAugSAiQgRAjghATQggASgsAAQgqAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAnAAQApAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_58.setTransform(648.8,979.7);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_59.setTransform(624.675,973.325);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_60.setTransform(606.8,975.65);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAigKQAhgKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgdAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALAAASQAAAVAQAOQAPAOAYABQAhgBAUgXQAWgWgBgkIAAgPIgLAAQguAAgZAFg");
	this.shape_61.setTransform(579.75,979.7);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_62.setTransform(550.375,979.7);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_63.setTransform(527.975,973.325);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgxDVIAAj1Ig4AAIAAgvIA4AAIAAgFQAAg+AfgeQAfgeA/gEIAbgBIADAuIgbABQgkACgQAQQgPARAAAjIAAAPIBQAAIAAAvIhQAAIAAD1g");
	this.shape_64.setTransform(511.2,973.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_65.setTransform(492.975,973.325);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_66.setTransform(475.1,975.65);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgsASgjQARgjAhgTQAhgSAqAAQAsAAAgASQAhATARAjQASAjAAAsQAAAugSAiQgRAjghATQggASgsAAQgqAAghgSgAg8hLQgVAagBAxQABA0AVAaQAVAaAnAAQApAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_67.setTransform(447.65,979.7);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_68.setTransform(413.525,979.5);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AhICMQgYgLgOgVQgNgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIAOAAIAAgSQAAghgOgPQgPgPgfAAQgyAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgwQgMAZgWANQgWAOgeAAQgcAAgYgMgAgRAPQgZAFgLAJQgKAKgBATQAAAVAQAOQAPAPAYAAQAhAAAUgYQAWgWAAgjIAAgQIgMAAQguAAgZAEg");
	this.shape_69.setTransform(1585.6,907.85);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgQgLgIQgKgKgagFIgwgLQgngJgTgUQgUgUAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvAAQgaAAgQALQgQAKAAATQAAAQAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_70.setTransform(1539.675,907.85);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggTQAggTAoAAQA7AAAiAmQAiAnAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiABQgigBgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_71.setTransform(1509.475,907.85);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgbCSIh+kjIA/AAIBbDfIBcjfIA9AAIiAEjg");
	this.shape_72.setTransform(1478.05,908.05);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_73.setTransform(1455.175,901.475);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggTQAggTAoAAQA7AAAiAmQAiAnAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiABQgigBgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_74.setTransform(1432.075,907.85);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAgtQAAgtATgjQASgjAhgTQAigTArAAQAfAAAcALQAdAJASASIgTArQgngggrgBQgpABgYAbQgYAbAAAxQAAAxAYAbQAXAbAqgBQArABAnghIATAsQgTARgdALQgdAJgfAAQgsAAghgSg");
	this.shape_75.setTransform(1402.425,907.85);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggTQAggTAoAAQA7AAAiAmQAiAnAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiABQgigBgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_76.setTransform(1371.425,907.85);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AhYCWIAAkjIA7AAIAAAyQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAiIAACig");
	this.shape_77.setTransform(1346.725,907.65);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggTQAggTAoAAQA7AAAiAmQAiAnAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiABQgigBgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_78.setTransform(1301.975,907.85);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#000000").s().p("ABHDUIAAizQAAgkgPgSQgPgRgfAAQgjAAgWAWQgXAXAAAmIAACnIg8AAIAAmmIA8AAIAACuQAPgZAZgNQAagOAfAAQBoABAAB0IAAC3g");
	this.shape_79.setTransform(1268.875,901.5);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#000000").s().p("AgfAzQAZgaAEgZIghAAIAAhIIBHAAIAAAxQAAAbgKAXQgJAXgVAXg");
	this.shape_80.setTransform(1228.625,922.775);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggTQAggTAoAAQA7AAAiAmQAiAnAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiABQgigBgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_81.setTransform(1205.675,907.85);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACLQAABAA7AAIAbgCIgDAvIgfABQg5ABgbgcg");
	this.shape_82.setTransform(1179.2,903.8);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#000000").s().p("AhICMQgYgLgNgVQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgSQAAghgNgPQgPgPgfAAQgyAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgwQgLAZgXANQgXAOgcAAQgdAAgYgMgAgRAPQgZAFgLAJQgLAKAAATQAAAVAQAOQAPAPAYAAQAgAAAVgYQAWgWgBgjIAAgQIgLAAQguAAgZAEg");
	this.shape_83.setTransform(1152.15,907.85);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgjAdgSQAdgTAnAAQAgAAAZAPQAYANAOAaIAAiwIA8AAIAAGmIg8AAIAAgzQgNAagZAPQgZAOgggBQgmAAgegTgAg7gOQgWAZAAAxQAAAyAWAcQAWAcAmAAQAoAAAVgbQAVgcAAgxQAAgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_84.setTransform(1117.95,901.7);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACLQAABAA7AAIAbgCIgDAvIgfABQg5ABgbgcg");
	this.shape_85.setTransform(1074.7,903.8);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#000000").s().p("AhYCWIAAkjIA7AAIAAAyQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAiIAACig");
	this.shape_86.setTransform(1055.325,907.65);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#000000").s().p("AhICMQgYgLgNgVQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgSQAAghgNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAigKQAhgKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgwQgMAZgWANQgWAOgdAAQgdAAgYgMgAgRAPQgZAFgLAJQgLAKABATQAAAVAPAOQAPAPAYAAQAgAAAVgYQAWgWgBgjIAAgQIgLAAQguAAgZAEg");
	this.shape_87.setTransform(1025.7,907.85);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACLQAABAA7AAIAbgCIgDAvIgfABQg5ABgbgcg");
	this.shape_88.setTransform(999.5,903.8);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgQgLgIQgKgKgagFIgwgLQgngJgTgUQgUgUAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvAAQgaAAgQALQgQAKAAATQAAAQAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_89.setTransform(974.425,907.85);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgQgLgIQgKgKgagFIgwgLQgngJgTgUQgUgUAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvAAQgaAAgQALQgQAKAAATQAAAQAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_90.setTransform(929.725,907.85);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_91.setTransform(908.125,901.475);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#000000").s().p("ABHDUIAAizQAAgkgPgSQgPgRgfAAQgjAAgWAWQgXAXAAAmIAACnIg8AAIAAmmIA8AAIAACuQAPgZAZgNQAagOAfAAQBoABAAB0IAAC3g");
	this.shape_92.setTransform(883.625,901.5);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggTQAggTAoAAQA7AAAiAmQAiAnAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiABQgigBgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_93.setTransform(834.675,907.85);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#000000").s().p("AhYCWIAAkjIA7AAIAAAyQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAiIAACig");
	this.shape_94.setTransform(809.975,907.65);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#000000").s().p("AhLCGQghgTgRgiQgSgjAAgtQAAguASgiQARgjAhgSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAuQAAAtgRAjQgTAiggATQghASgqAAQgrAAghgSgAg8hMQgVAbgBAyQABAzAVAZQAVAbAoAAQAoAAAUgbQAWgZAAgzQAAgygWgbQgVgbgnAAQgnAAgWAbg");
	this.shape_95.setTransform(779.95,907.85);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#000000").s().p("AgwDVIAAj2Ig6AAIAAguIA6AAIAAgFQAAg+AegeQAfgeA/gEIAbgCIADAvIgbABQgkACgQARQgPARAAAhIAAAQIBPAAIAAAuIhPAAIAAD2g");
	this.shape_96.setTransform(753.55,901.4);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggTQAggTAoAAQA7AAAiAmQAiAnAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiABQgigBgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_97.setTransform(726.725,907.85);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#000000").s().p("AgsDIQgZgPgNgaIAAAzIg9AAIAAmmIA9AAIAACxQANgaAZgOQAZgPAgAAQAnAAAdATQAeASAQAjQARAhAAAtQAAAugRAiQgQAjgeATQgeATgmAAQggABgZgOgAg9gOQgVAaAAAyQAAAxAVAcQAWAbAnAAQAmAAAWgcQAWgbAAgzQAAgxgWgZQgVgbgnAAQgnAAgWAbg");
	this.shape_98.setTransform(693.975,901.7);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgQgLgIQgKgKgagFIgwgLQgngJgTgUQgUgUAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSArQgrgjgvAAQgaAAgQALQgQAKAAATQAAAQAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_99.setTransform(645.075,907.85);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#000000").s().p("AhRDIIAzh0Ih7kbIA/AAIBbDfIBcjfIA9AAIiuGPg");
	this.shape_100.setTransform(615.15,913.45);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#000000").s().p("AhICMQgYgLgNgVQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBBAAIAPAAIAAgSQAAghgPgPQgOgPgfAAQgyAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgwQgMAZgWANQgWAOgdAAQgdAAgYgMgAgRAPQgZAFgLAJQgKAKgBATQAAAVAQAOQAPAPAYAAQAhAAAUgYQAWgWAAgjIAAgQIgMAAQguAAgZAEg");
	this.shape_101.setTransform(583,907.85);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgjAdgSQAdgTAnAAQAgAAAZAPQAZANANAaIAAiwIA8AAIAAGmIg7AAIAAgzQgNAagaAPQgZAOgggBQgmAAgegTgAg7gOQgWAZAAAxQAAAyAWAcQAWAcAmAAQAoAAAVgbQAVgcABgxQgBgygVgaQgVgbgoAAQgnAAgVAbg");
	this.shape_102.setTransform(548.8,901.7);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#000000").s().p("AhPDKQgngNgZgYIAVguQA5AuBBAAQAoAAAXgSQAVgSAAgkQABgjgXgSQgWgSgtAAIg1AAIAAgxIArAAQArAAAYgSQAWgSAAgkQABgfgUgSQgTgRgjAAQg7AAg5AvIgWguQAZgYAngOQAlgNAoAAQA8AAAjAdQAkAeAAAyQAAAjgSAcQgRAbggAMQAmAJATAbQAUAaAAAnQgBA3gmAgQgnAghDAAQgpAAgmgOg");
	this.shape_103.setTransform(497.55,901.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},839).to({state:[]},159).to({state:[]},50).wait(183));

	// Layer_26
	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_104.setTransform(1557.025,1046.15);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_105.setTransform(1528.125,1046.15);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQArAAAhATQAhASARAjQASAiAAAtQAAAugSAiQgRAjghASQghATgrAAQgqAAghgTgAg8hLQgWAaAAAxQAAAzAWAbQAVAaAnAAQAoAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_106.setTransform(1496.85,1046.15);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#000000").s().p("AgsDHQgZgOgNgaIAAAyIg9AAIAAmmIA9AAIAACyQANgaAZgOQAZgPAgAAQAnAAAdATQAeATAQAiQARAhAAAuQAAAtgRAjQgQAigeAUQgeASgmABQgggBgZgOgAg9gOQgVAaAAAyQAAAxAVAbQAWAbAnAAQAmABAWgcQAWgcAAgxQAAgygWgZQgVgbgnAAQgnAAgWAbg");
	this.shape_107.setTransform(1463.075,1040);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#000000").s().p("ABNCSIhNjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_108.setTransform(1403.3,1046.325);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_109.setTransform(1362.025,1046.15);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_110.setTransform(1328.925,1045.95);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_111.setTransform(1281.275,1046.15);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_112.setTransform(1259.675,1039.775);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_113.setTransform(1235.175,1039.8);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#000000").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_114.setTransform(1176.275,1045.95);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTAqAAQAsAAAgATQAhASARAjQASAiAAAtQAAAugSAiQgRAjghASQggATgsAAQgqAAghgTgAg8hLQgWAaAAAxQAAAzAWAbQAVAaAnAAQApAAAUgaQAWgbAAgzQAAgxgWgaQgVgbgoAAQgmAAgWAbg");
	this.shape_115.setTransform(1133.45,1046.15);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_116.setTransform(1107.725,1045.95);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#000000").s().p("AgwDUIAAj1Ig6AAIAAguIA6AAIAAgGQAAg8AegfQAegfBAgDIAbgCIAEAuIgcACQgkACgQAQQgPASgBAhIAAAQIBQAAIAAAuIhQAAIAAD1g");
	this.shape_117.setTransform(1085.1,1039.7);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_118.setTransform(1042.475,1046.15);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#000000").s().p("AhDDEQgigJgagTIASgsQAdASAbAJQAaAHAeABQBSAAAAhTIAAguQgMAagaAOQgaAPghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgrARgiQARghAegSQAdgSAnAAQAgAAAaAOQAZAOAOAbIAAgwIA8AAIAAEMQAABDgkAjQgkAihFAAQglAAgigKgAg8iCQgWAZAAAuQAAAuAXAYQAWAaAmAAQAnAAAXgaQAWgYAAguQAAgtgWgaQgWgagoAAQgmAAgXAag");
	this.shape_119.setTransform(1007.875,1051.55);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#000000").s().p("AhICMQgYgMgNgUQgOgVAAgaQAAggAQgSQAQgRAngIQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAdAeQAcAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgWANgdAAQgdAAgYgMgAgRAPQgZAEgLALQgLAJABATQAAAVAPAOQAPAOAYAAQAhAAAUgWQAWgXgBgkIAAgPIgLAAQguAAgZAEg");
	this.shape_120.setTransform(974.4,1046.15);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_121.setTransform(944.275,1046.15);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_122.setTransform(915.375,1046.15);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_123.setTransform(885.175,1046.15);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#000000").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_124.setTransform(843.525,1045.95);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_125.setTransform(785.975,1046.15);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#000000").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_126.setTransform(744.325,1045.95);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQArAAAhATQAgASASAjQASAiAAAtQAAAugSAiQgSAjggASQghATgrAAQgqAAghgTgAg8hLQgWAaABAxQgBAzAWAbQAVAaAnAAQAoAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_127.setTransform(701.5,1046.15);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_128.setTransform(670.825,1046.15);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_129.setTransform(648.375,1039.8);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_130.setTransform(625.325,1046.15);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#000000").s().p("ABOCSIhOjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_131.setTransform(584.05,1046.325);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#000000").s().p("AhICMQgYgMgNgUQgOgVAAgaQAAggAQgSQAQgRAngIQAmgIBCAAIAOAAIAAgRQAAgigOgPQgPgPgfAAQgyAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAdAeQAcAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgdAAQgdAAgYgMgAgRAPQgZAEgLALQgKAJgBATQAAAVAQAOQAPAOAYAAQAhAAAUgWQAWgXAAgkIAAgPIgMAAQguAAgZAEg");
	this.shape_132.setTransform(526.3,1046.15);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgQgiAAguQAAgtAQghQARgiAdgTQAegSAmAAQAgAAAZANQAYAOAOAbIAAiyIA9AAIAAGmIg9AAIAAgyQgNAbgZAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAWgagBgyQABgygWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_133.setTransform(1665.85,968.15);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_134.setTransform(1631.775,974.1);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_135.setTransform(1607.225,967.925);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#000000").s().p("AgwDUIAAj0Ig6AAIAAgvIA6AAIAAgFQAAg+AegeQAegeBAgEIAbgBIADAuIgbABQgkACgQAQQgPARgBAjIAAAPIBQAAIAAAvIhQAAIAAD0g");
	this.shape_136.setTransform(1590.45,967.85);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQArAAAgASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQggASgrAAQgrAAghgSgAg8hLQgVAagBAxQABA0AVAaQAVAaAoAAQAoAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_137.setTransform(1546.75,974.3);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_138.setTransform(1519.25,970.25);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#000000").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAiyIA9AAIAAGmIg8AAIAAgyQgNAbgaAOQgZANggAAQgmABgdgUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAnAAQAnAAAVgbQAWgaAAgyQAAgygWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_139.setTransform(1474.3,968.15);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_140.setTransform(1441.625,974.3);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_141.setTransform(1415.15,970.25);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_142.setTransform(1397.375,967.925);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_143.setTransform(1376.325,974.3);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#000000").s().p("ABVCSIhVhrIhUBrIhIAAIB6iVIh0iOIBJAAIBNBiIBOhiIBIAAIhzCOIB7CVg");
	this.shape_144.setTransform(1345.4,974.475);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_145.setTransform(1313.825,974.3);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_146.setTransform(1267.625,974.3);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_147.setTransform(1246.025,967.925);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAiyIA8AAIAAGmIg8AAIAAgyQgMAbgaAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAVgaAAgyQAAgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_148.setTransform(1204.35,968.15);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_149.setTransform(1170.275,974.1);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgwAAgyAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgeAAQgcAAgYgLgAgQAQQgZAEgLAJQgLALAAASQAAAVAPAOQAPAPAZgBQAfABAWgYQAUgWABgjIAAgQIgLAAQgvAAgYAFg");
	this.shape_150.setTransform(1136.45,974.3);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#000000").s().p("AgfAzQAZgaAEgZIghAAIAAhIIBHAAIAAAxQAAAbgKAXQgJAXgVAXg");
	this.shape_151.setTransform(1097.925,989.225);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_152.setTransform(1076.275,974.3);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#000000").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_153.setTransform(1036.125,974.1);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgwAAgyAfIgSgrQAXgQAhgKQAigKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgeAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQAAAVAQAOQAQAPAYgBQAfABAWgYQAUgWABgjIAAgQIgLAAQgvAAgYAFg");
	this.shape_154.setTransform(993.7,974.3);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_155.setTransform(962.275,974.3);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#000000").s().p("AgeDTIAAlyIiPAAIAAg0IFbAAIAAA0IiPAAIAAFyg");
	this.shape_156.setTransform(928.25,967.95);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#000000").s().p("AhaDLQgpgNgdgaIAWgtQAgAZAgALQAiALAoAAQAwAAAZgSQAagSAAggQAAgcgXgNQgZgOg0gMQgygKgggOQgggNgTgYQgSgXAAglQAAglATgcQAUgdAkgQQAkgPAuAAQAtAAAnANQAnANAZAaIgVAtQgdgXgggMQgegMgjAAQgtAAgaATQgaATAAAhQAAAdAXAPQAWAOAyANQA1AMAgAMQAiAMASAXQAUAXAAAjQAAAlgUAcQgSAcglAOQglAPgxAAQgxAAgpgNg");
	this.shape_157.setTransform(875.5,967.95);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#000000").s().p("ACTDTIAAkxIh+DuIgpAAIh+jrIAAEuIg3AAIAAmmIAxAAICZElICYklIAxAAIAAGmg");
	this.shape_158.setTransform(831.475,967.95);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_159.setTransform(775.925,974.3);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#000000").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgiAdgTQAdgSAnAAQAgAAAZANQAZAOANAbIAAiyIA8AAIAAGmIg7AAIAAgyQgNAbgaAOQgZANggAAQgmABgdgUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAnAAQAnAAAVgbQAVgaABgyQgBgygVgaQgVgbgnAAQgnAAgWAbg");
	this.shape_160.setTransform(742.95,968.15);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQABgigOgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALABASQAAAVAPAOQAPAPAZgBQAfABAWgYQAUgWAAgjIAAgQIgLAAQguAAgZAFg");
	this.shape_161.setTransform(709.6,974.3);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQAqAAAhASQAhATASAjQARAiAAAtQAAAugRAiQgSAjghATQghASgqAAQgrAAghgSgAg8hLQgVAaAAAxQAAA0AVAaQAVAaAoAAQAnAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_162.setTransform(677.1,974.3);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_163.setTransform(652.925,967.95);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_164.setTransform(628.475,974.1);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#000000").s().p("ABNCSIhNjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_165.setTransform(585.75,974.475);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSAqAAQArAAAhASQAhATARAjQASAiAAAtQAAAugSAiQgRAjghATQghASgrAAQgqAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAnAAQApAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgmAAgWAbg");
	this.shape_166.setTransform(543.4,974.3);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#000000").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgiAdgTQAegSAmAAQAgAAAZANQAZAOANAbIAAiyIA9AAIAAGmIg9AAIAAgyQgNAbgZAOQgZANggAAQgmABgdgUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAWgagBgyQABgygWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_167.setTransform(507.9,968.15);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_168.setTransform(459.425,974.3);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#000000").s().p("AB2DTIAAi9IjrAAIAAC9Ig9AAIAAmmIA9AAIAAC3IDrAAIAAi3IA+AAIAAGmg");
	this.shape_169.setTransform(420.7,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104}]},749).to({state:[]},90).to({state:[]},209).wait(183));

	// Layer_25
	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#000000").s().p("AhRDIIAzh0Ih7kbIA/AAIBbDeIBcjeIA9AAIiuGPg");
	this.shape_170.setTransform(1585.8,1051.75);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_171.setTransform(1562.875,1039.8);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_172.setTransform(1539.825,1046.15);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_173.setTransform(1513.35,1042.1);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTAqAAQAsAAAgATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQggATgsAAQgqAAghgTgAg8hLQgVAagBAxQABAzAVAbQAVAaAnAAQApAAAUgaQAWgbAAgzQAAgxgWgaQgVgbgoAAQgmAAgWAbg");
	this.shape_174.setTransform(1485.9,1046.15);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#000000").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_175.setTransform(1443.225,1045.95);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_176.setTransform(1401.475,1046.15);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_177.setTransform(1376.775,1045.95);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#000000").s().p("AhDDEQgigJgagTIASgsQAdASAbAJQAaAHAeABQBSAAAAhTIAAguQgMAagaAOQgaAPghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgrARgiQARghAegSQAdgSAnAAQAgAAAaAOQAZAOAOAbIAAgwIA8AAIAAEMQAABDgkAjQgkAihFAAQglAAgigKgAg8iCQgWAZAAAuQAAAuAXAYQAWAaAmAAQAnAAAXgaQAWgYAAguQAAgtgWgaQgWgagoAAQgmAAgXAag");
	this.shape_178.setTransform(1329.125,1051.55);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_179.setTransform(1294.925,1045.95);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_180.setTransform(1270.375,1039.775);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#000000").s().p("AA9DTIiJiJIAACJIg9AAIAAmmIA9AAIAAEFIB/iBIBLAAIiKCKICWCYg");
	this.shape_181.setTransform(1250.1,1039.8);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_182.setTransform(1223.275,1045.95);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAnAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_183.setTransform(1193.25,1046.15);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#000000").s().p("ABNCSIhNjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_184.setTransform(1150.95,1046.325);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#000000").s().p("AhPDDQgegUgRgiQgQgjAAgtQAAguAQghQARgiAdgTQAdgTAnAAQAgAAAZAPQAZAOANAZIAAixIA9AAIAAGmIg9AAIAAgyQgNAagZAOQgZAOggABQgmgBgdgSgAg7gOQgWAZAAAyQAAAxAWAbQAWAcAnAAQAnAAAVgbQAWgbgBgxQABgygWgaQgVgbgnAAQgoAAgVAbg");
	this.shape_185.setTransform(1091.1,1040);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_186.setTransform(1057.025,1045.95);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#000000").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggAQgSQARgRAmgIQAmgIBBAAIAPAAIAAgRQAAgigPgPQgOgPgfAAQgyAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAdAeQAcAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgRAPQgYAEgMALQgKAJgBATQAAAVAQAOQAQAOAXAAQAhAAAUgWQAWgXAAgkIAAgPIgMAAQguAAgZAEg");
	this.shape_187.setTransform(1023.2,1046.15);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#000000").s().p("AgfAzQAZgaAEgZIghAAIAAhIIBHAAIAAAxQAAAbgKAXQgJAXgVAXg");
	this.shape_188.setTransform(984.675,1061.075);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_189.setTransform(961.725,1046.15);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_190.setTransform(932.075,1046.15);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_191.setTransform(909.675,1039.775);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#000000").s().p("AgxDUIAAj1Ig4AAIAAguIA4AAIAAgGQAAg8AggfQAegfA/gDIAbgCIADAuIgbACQgkACgQAQQgPASAAAhIAAAQIBQAAIAAAuIhQAAIAAD1g");
	this.shape_192.setTransform(892.9,1039.7);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#000000").s().p("AgxDUIAAj1Ig4AAIAAguIA4AAIAAgGQAAg8AggfQAdgfBAgDIAbgCIAEAuIgcACQgkACgQAQQgQASAAAhIAAAQIBQAAIAAAuIhQAAIAAD1g");
	this.shape_193.setTransform(872.4,1039.7);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQAqAAAhATQAhASASAjQARAiAAAtQAAAugRAiQgSAjghASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAnAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_194.setTransform(844.5,1046.15);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_195.setTransform(795.975,1046.15);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#000000").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_196.setTransform(754.325,1045.95);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQAsAAAgATQAgASASAjQASAiAAAtQAAAugSAiQgSAjggASQggATgsAAQgqAAghgTgAg8hLQgWAaABAxQgBAzAWAbQAVAaAnAAQAoAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_197.setTransform(711.5,1046.15);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_198.setTransform(677.375,1039.8);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_199.setTransform(629.725,1046.15);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_200.setTransform(608.125,1039.775);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_201.setTransform(583.625,1039.8);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_202.setTransform(533.625,1051.35);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_203.setTransform(497.925,1046.525);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#000000").s().p("AhDDEQgigJgagTIASgsQAdATAbAIQAaAIAeAAQBSAAAAhUIAAguQgMAbgaAPQgaAOghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgsARggQARgiAegSQAdgSAnAAQAgAAAaAPQAZAOAOAaIAAgwIA8AAIAAENQAABCgkAjQgkAihFAAQglAAgigKgAg8iDQgWAaAAAuQAAAtAXAZQAWAaAmAAQAnAAAXgaQAWgZAAgtQAAgtgWgbQgWgagoABQgmgBgXAag");
	this.shape_204.setTransform(1655.625,979.7);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_205.setTransform(1621.425,974.1);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_206.setTransform(1596.875,967.925);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_207.setTransform(1579,970.25);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_208.setTransform(1557.85,970.25);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_209.setTransform(1531.475,974.3);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_210.setTransform(1501.075,974.3);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_211.setTransform(1453.675,974.1);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQArAAAhASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQghASgrAAQgqAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAnAAQAoAAAVgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_212.setTransform(1419.45,974.3);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_213.setTransform(1372.225,974.3);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_214.setTransform(1340.975,979.5);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_215.setTransform(1315.175,967.925);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_216.setTransform(1297.3,970.25);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_217.setTransform(1256.425,974.3);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_218.setTransform(1227.525,974.3);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_219.setTransform(1197.325,974.3);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_220.setTransform(1167.675,974.3);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_221.setTransform(1138.725,974.3);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALABASQAAAVAPAOQAPAPAYgBQAgABAVgYQAWgWgBgjIAAgQIgLAAQguAAgZAFg");
	this.shape_222.setTransform(1107.05,974.3);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_223.setTransform(1058.425,974.1);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQABgigOgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgRAQQgYAEgLAJQgMALABASQAAAVAPAOQAPAPAZgBQAfABAWgYQAUgWAAgjIAAgQIgLAAQguAAgZAFg");
	this.shape_224.setTransform(1024.6,974.3);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_225.setTransform(995.225,974.3);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_226.setTransform(955.425,974.1);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_227.setTransform(926.475,974.3);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_228.setTransform(900,970.25);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_229.setTransform(873.625,974.3);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#000000").s().p("AidDTIAAmmICuAAQBDAAAlAiQAmAgAAA9QAAA8gmAhQglAhhDAAIhxAAIAACpgAhggGIBqAAQBZgBAAhNQAAhMhZAAIhqAAg");
	this.shape_230.setTransform(839.4,967.95);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#000000").s().p("AgfAzQAZgaAEgZIghAAIAAhIIBHAAIAAAxQAAAbgKAXQgJAXgVAXg");
	this.shape_231.setTransform(795.725,989.225);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#000000").s().p("AhDDEQgigJgagTIASgsQAdATAbAIQAaAIAeAAQBSAAAAhUIAAguQgMAbgaAPQgaAOghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgsARggQARgiAegSQAdgSAnAAQAgAAAaAPQAZAOAOAaIAAgwIA8AAIAAENQAABCgkAjQgkAihFAAQglAAgigKgAg8iDQgWAaAAAuQAAAtAXAZQAWAaAmAAQAnAAAXgaQAWgZAAgtQAAgtgWgbQgWgagoABQgmgBgXAag");
	this.shape_232.setTransform(769.875,979.7);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_233.setTransform(735.675,974.1);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_234.setTransform(711.125,967.925);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_235.setTransform(693.25,970.25);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_236.setTransform(675.475,967.925);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgwAAgyAfIgSgrQAXgQAhgKQAigKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgeAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQAAAVAQAOQAQAPAYgBQAfABAWgYQAUgWABgjIAAgQIgLAAQgvAAgYAFg");
	this.shape_237.setTransform(651.7,974.3);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#000000").s().p("ABOCSIhOjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_238.setTransform(610.7,974.475);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_239.setTransform(553.625,974.3);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_240.setTransform(530.475,967.95);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_241.setTransform(516.025,967.925);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_242.setTransform(491.525,967.95);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#000000").s().p("ABzDTIhzlGIhyFGIgzAAIiUmmIA+AAIByFPIB1lPIAsABIBzFPIBzlQIA8AAIiVGmg");
	this.shape_243.setTransform(441.05,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170}]},659).to({state:[]},90).to({state:[]},299).wait(183));

	// Layer_24
	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_244.setTransform(1552.925,974.3);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_245.setTransform(1522.525,974.3);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_246.setTransform(1491.025,974.675);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQAsAAAgASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQggASgsAAQgqAAghgSgAg8hLQgWAaABAxQgBA0AWAaQAVAaAnAAQAoAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_247.setTransform(1457.15,974.3);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_248.setTransform(1423.025,967.95);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_249.setTransform(1375.375,974.3);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_250.setTransform(1353.775,967.925);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_251.setTransform(1329.275,967.95);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSAqAAQAsAAAgASQAhATARAjQASAiAAAtQAAAugSAiQgRAjghATQggASgsAAQgqAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAnAAQApAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_252.setTransform(1279.25,974.3);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_253.setTransform(1251.75,970.25);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgQgigBguQABgtAQghQARgiAdgTQAegSAmAAQAgAAAZANQAZAOANAbIAAiyIA8AAIAAGmIg7AAIAAgyQgNAbgaAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAVgaABgyQgBgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_254.setTransform(1206.8,968.15);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_255.setTransform(1174.125,974.3);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_256.setTransform(1141.375,979.5);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_257.setTransform(1105.925,979.5);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_258.setTransform(1080.125,967.925);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_259.setTransform(1055.625,967.95);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_260.setTransform(1023.775,974.3);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_261.setTransform(983,970.25);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_262.setTransform(965.225,967.925);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_263.setTransform(926.325,974.3);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#000000").s().p("AgbCSIh+kjIBAAAIBaDfIBcjfIA9AAIh/Ejg");
	this.shape_264.setTransform(894.9,974.5);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgwAAgyAfIgSgrQAXgQAhgKQAigKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgeAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQAAAVAQAOQAQAPAYgBQAfABAWgYQAUgWABgjIAAgQIgLAAQgvAAgYAFg");
	this.shape_265.setTransform(862.75,974.3);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_266.setTransform(829.925,967.95);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQAsAAAgASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQggASgsAAQgqAAghgSgAg8hLQgWAaABAxQgBA0AWAaQAVAaAnAAQAoAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_267.setTransform(779.9,974.3);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_268.setTransform(752.4,970.25);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_269.setTransform(711.525,974.3);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_270.setTransform(686.55,970.25);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_271.setTransform(659.125,979.5);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSArAAQAqAAAhASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQghASgqAAQgrAAghgSgAg8hLQgWAaABAxQgBA0AWAaQAVAaAoAAQAnAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_272.setTransform(623.65,974.3);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_273.setTransform(575.125,974.3);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#000000").s().p("AB3DTIAAi9IjsAAIAAC9Ig9AAIAAmmIA9AAIAAC3IDsAAIAAi3IA8AAIAAGmg");
	this.shape_274.setTransform(536.4,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244}]},569).to({state:[]},90).to({state:[]},389).wait(183));

	// Layer_7
	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_275.setTransform(1623.15,1042.1);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQArAAAgATQAhASARAjQASAiAAAtQAAAugSAiQgRAjghASQggATgrAAQgrAAghgTgAg8hLQgVAagBAxQABAzAVAbQAVAaAoAAQAnAAAVgaQAWgbAAgzQAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_276.setTransform(1595.7,1046.15);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_277.setTransform(1561.925,1051.35);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_278.setTransform(1527.525,1046.15);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#000000").s().p("Ai1DTIAAmmICUAAQBmAAA4A4QA5A3AABkQAABkg5A4Qg4A3hmAAgAh3CgIBTAAQCbAAAAigQAAifibAAIhTAAg");
	this.shape_279.setTransform(1490,1039.8);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_280.setTransform(1435.275,1046.15);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_281.setTransform(1405.625,1046.15);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_282.setTransform(1383.225,1039.775);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#000000").s().p("AgwDUIAAj1Ig6AAIAAguIA6AAIAAgGQAAg8AegfQAegfBAgDIAbgCIADAuIgbACQgkACgQAQQgQASAAAhIAAAQIBQAAIAAAuIhQAAIAAD1g");
	this.shape_283.setTransform(1366.45,1039.7);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#000000").s().p("AgwDUIAAj1Ig5AAIAAguIA5AAIAAgGQAAg8AegfQAfgfA/gDIAbgCIADAuIgbACQgkACgQAQQgPASAAAhIAAAQIBQAAIAAAuIhQAAIAAD1g");
	this.shape_284.setTransform(1345.95,1039.7);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#000000").s().p("AhnC+QgsgbgYgwQgYgxAAhBQAAhCAXgxQAYgxAsgaQAtgaA7AAQA8AAAtAaQAsAaAYAxQAXAxAABBQAABCgXAxQgYAwgsAbQgtAag8AAQg7AAgsgagAhhh6QgjArAABPQAABQAjAqQAjAsA+AAQA/AAAkgsQAjgqAAhQQAAhPgjgrQgjgrhAAAQg+AAgjArg");
	this.shape_285.setTransform(1311.825,1039.8);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_286.setTransform(1265.625,1039.8);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#000000").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggAQgSQARgRAmgIQAmgIBBAAIAPAAIAAgRQAAgigPgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgRAPQgZAEgLALQgKAJgBATQAAAVAQAOQAQAOAXAAQAhAAAUgWQAWgXAAgkIAAgPIgMAAQguAAgZAEg");
	this.shape_287.setTransform(1241.9,1046.15);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_288.setTransform(1212.525,1046.15);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hLQgVAagBAxQABAzAVAbQAVAaAoAAQAoAAAUgaQAWgbAAgzQAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_289.setTransform(1180.45,1046.15);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_290.setTransform(1156.275,1039.8);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_291.setTransform(1118.725,1046.15);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_292.setTransform(1097.125,1039.775);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_293.setTransform(1072.625,1039.8);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#000000").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_294.setTransform(1013.725,1045.95);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQArAAAhATQAhASARAjQASAiAAAtQAAAugSAiQgRAjghASQghATgrAAQgqAAghgTgAg8hLQgWAaAAAxQAAAzAWAbQAVAaAnAAQApAAAUgaQAWgbAAgzQAAgxgWgaQgVgbgoAAQgmAAgWAbg");
	this.shape_295.setTransform(970.9,1046.15);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_296.setTransform(945.175,1045.95);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#000000").s().p("AgwDUIAAj1Ig6AAIAAguIA6AAIAAgGQAAg8AfgfQAdgfBAgDIAbgCIAEAuIgcACQgkACgQAQQgQASAAAhIAAAQIBQAAIAAAuIhQAAIAAD1g");
	this.shape_297.setTransform(922.55,1039.7);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_298.setTransform(886.925,1045.95);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_299.setTransform(857.975,1046.15);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_300.setTransform(824.875,1045.95);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQArAAAgATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQggATgrAAQgrAAghgTgAg8hLQgVAagBAxQABAzAVAbQAVAaAoAAQAnAAAVgaQAWgbAAgzQAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_301.setTransform(790.65,1046.15);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQArAAAhATQAgASASAjQASAiAAAtQAAAugSAiQgSAjggASQghATgrAAQgqAAghgTgAg8hLQgWAaABAxQgBAzAWAbQAVAaAnAAQAoAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_302.setTransform(756.85,1046.15);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_303.setTransform(725.425,1046.15);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_304.setTransform(678.375,1051.35);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_305.setTransform(642.675,1046.525);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_306.setTransform(599.3,1042.1);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_307.setTransform(581.525,1039.775);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#000000").s().p("AA9DTIiKiJIAACJIg8AAIAAmmIA8AAIAAEFICAiBIBLAAIiJCKICVCYg");
	this.shape_308.setTransform(545.45,1039.8);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_309.setTransform(513.675,1046.15);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_310.setTransform(491.275,1039.775);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_311.setTransform(467.125,1051.35);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_312.setTransform(1635.775,974.1);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQArAAAhASQAhATARAjQASAiAAAtQAAAugSAiQgSAjggATQghASgrAAQgqAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAnAAQAoAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_313.setTransform(1605.75,974.3);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#000000").s().p("AgfAzQAZgaAEgZIghAAIAAhIIBHAAIAAAxQAAAbgKAXQgJAXgVAXg");
	this.shape_314.setTransform(1565.925,989.225);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_315.setTransform(1542.975,974.3);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#000000").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_316.setTransform(1501.325,974.1);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQAsAAAgASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQggASgsAAQgqAAghgSgAg8hLQgWAaABAxQgBA0AWAaQAVAaAnAAQAoAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_317.setTransform(1458.5,974.3);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_318.setTransform(1424.375,967.95);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_319.setTransform(1376.725,974.3);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_320.setTransform(1355.125,967.925);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_321.setTransform(1330.625,967.95);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSAqAAQAsAAAgASQAhATARAjQASAiAAAtQAAAugSAiQgRAjghATQggASgsAAQgqAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAnAAQApAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgmAAgWAbg");
	this.shape_322.setTransform(1280.6,974.3);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_323.setTransform(1253.1,970.25);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgiAdgTQAegSAmAAQAgAAAZANQAZAOANAbIAAiyIA8AAIAAGmIg7AAIAAgyQgNAbgaAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAnAAQAnAAAVgbQAVgaABgyQgBgygVgaQgVgbgnAAQgnAAgWAbg");
	this.shape_324.setTransform(1208.15,968.15);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_325.setTransform(1175.475,974.3);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_326.setTransform(1142.725,979.5);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_327.setTransform(1107.275,979.5);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_328.setTransform(1081.475,967.925);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_329.setTransform(1056.975,967.95);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_330.setTransform(1025.125,974.3);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#000000").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_331.setTransform(969.175,974.1);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_332.setTransform(927.425,974.3);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_333.setTransform(894.325,967.95);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_334.setTransform(866.4,970.25);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_335.setTransform(824.225,974.3);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#000000").s().p("AgbCSIh+kjIA/AAIBbDfIBcjfIA9AAIiAEjg");
	this.shape_336.setTransform(792.8,974.5);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgdAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALABASQAAAVAPAOQAPAPAYgBQAhABAUgYQAWgWgBgjIAAgQIgLAAQguAAgZAFg");
	this.shape_337.setTransform(760.65,974.3);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_338.setTransform(727.825,967.95);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_339.setTransform(677.475,974.1);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgdAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALABASQAAAVAPAOQAPAPAYgBQAhABAUgYQAWgWgBgjIAAgQIgLAAQguAAgZAFg");
	this.shape_340.setTransform(643.65,974.3);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_341.setTransform(614.275,974.3);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_342.setTransform(574.475,974.1);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_343.setTransform(545.525,974.3);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_344.setTransform(519.05,970.25);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_345.setTransform(492.675,974.3);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#000000").s().p("AidDTIAAmmICuAAQBDAAAlAiQAlAgAAA9QAAA8glAhQglAhhDAAIhwAAIAACpgAhfgGIBpAAQBZgBAAhNQAAhMhZAAIhpAAg");
	this.shape_346.setTransform(458.45,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275}]},479).to({state:[]},90).to({state:[]},479).wait(183));

	// Layer_6
	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgQgigBguQABgtAQghQARgiAdgTQAegSAmAAQAgAAAZANQAZAOANAbIAAiyIA8AAIAAGmIg7AAIAAgyQgNAbgaAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAVgaABgyQgBgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_347.setTransform(1605.95,968.15);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_348.setTransform(1573.275,974.3);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_349.setTransform(1550.125,967.95);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_350.setTransform(1535.625,967.95);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggAQgSQARgSAmgHQAmgIBBAAIAPAAIAAgRQAAgigPgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgeAAQgcAAgYgLgAgRAQQgZAEgLAJQgKALgBASQAAAVAQAOQAQAPAXgBQAhABAUgYQAWgWAAgjIAAgQIgMAAQguAAgZAFg");
	this.shape_351.setTransform(1511.9,974.3);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_352.setTransform(1485.7,970.25);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_353.setTransform(1460.625,974.3);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_354.setTransform(1429.025,974.1);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_355.setTransform(1404.475,967.925);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#000000").s().p("AhWAYIAAgwICtAAIAAAwg");
	this.shape_356.setTransform(1384.375,973.1);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_357.setTransform(1355.675,974.3);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_358.setTransform(1330.975,974.1);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_359.setTransform(1300.975,979.5);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_360.setTransform(1252.075,974.3);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_361.setTransform(1227.1,970.25);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_362.setTransform(1199.325,974.1);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgXAOgdAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQAAAVAQAOQAQAPAXgBQAhABAUgYQAWgWAAgjIAAgQIgMAAQguAAgYAFg");
	this.shape_363.setTransform(1165.5,974.3);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#000000").s().p("ABOCSIhOjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_364.setTransform(1124.5,974.475);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_365.setTransform(1067.425,974.3);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_366.setTransform(1034.325,967.95);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_367.setTransform(985.375,974.3);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_368.setTransform(960.675,974.1);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQAAgigPgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgXAOgdAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQAAAVAQAOQAQAPAXgBQAhABAUgYQAWgWAAgjIAAgQIgLAAQgvAAgYAFg");
	this.shape_369.setTransform(931.05,974.3);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#000000").s().p("ABOCSIhOjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_370.setTransform(890.05,974.475);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_371.setTransform(854,970.25);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#000000").s().p("AgxDUIAAj0Ig4AAIAAgvIA4AAIAAgFQAAg+AggeQAdgeBAgEIAbgBIADAuIgbABQgkACgQAQQgPARAAAjIAAAPIBQAAIAAAvIhQAAIAAD0g");
	this.shape_372.setTransform(833.95,967.85);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQAqAAAhASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQghASgqAAQgrAAghgSgAg8hLQgVAagBAxQABA0AVAaQAVAaAoAAQAoAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_373.setTransform(806.05,974.3);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_374.setTransform(774.625,974.3);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_375.setTransform(733.85,970.25);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#000000").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_376.setTransform(709.525,974.3);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_377.setTransform(678.525,974.3);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_378.setTransform(655.375,967.95);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_379.setTransform(632.325,974.3);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_380.setTransform(601.925,974.3);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#000000").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAiyIA9AAIAAGmIg8AAIAAgyQgNAbgaAOQgZANggAAQgmABgdgUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAnAAQAnAAAVgbQAWgaAAgyQAAgygWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_381.setTransform(553.15,968.15);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_382.setTransform(519.075,974.1);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#000000").s().p("ACYDTIgthoIjVAAIgtBoIg+AAIC8mmIAzAAIC8GmgABWA6IhVjHIhWDHICrAAg");
	this.shape_383.setTransform(479.775,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347}]},389).to({state:[]},90).to({state:[]},569).wait(183));

	// Layer_5
	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_384.setTransform(1610.125,974.3);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgiAdgTQAegSAmAAQAgAAAZANQAZAOANAbIAAiyIA8AAIAAGmIg7AAIAAgyQgNAbgaAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAnAAQAnAAAVgbQAVgaABgyQgBgygVgaQgVgbgnAAQgnAAgWAbg");
	this.shape_385.setTransform(1577.15,968.15);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_386.setTransform(1544.475,974.3);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_387.setTransform(1512.775,974.3);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_388.setTransform(1479.675,974.1);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_389.setTransform(1430.725,974.3);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_390.setTransform(1397.625,967.95);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_391.setTransform(1353.9,970.25);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_392.setTransform(1326.125,974.1);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_393.setTransform(1292.975,974.3);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#000000").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_394.setTransform(1251.325,974.1);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_395.setTransform(1208.525,979.5);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_396.setTransform(1182.725,967.925);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_397.setTransform(1158.325,974.675);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#000000").s().p("ABTDMIAAidQgOAZgYAOQgZAOggAAQgmAAgegSQgegTgQgiQgQghAAguQAAgtAQgjQARgiAdgUQAegTAmAAQAgAAAZAPQAaAOANAaIAAgwIA7AAIAAGQgAg7h+QgWAcAAAwQAAAyAWAaQAWAaAnAAQAnAAAVgbQAVgaABgyQgBgygVgaQgVgbgnAAQgnAAgWAcg");
	this.shape_398.setTransform(1122.75,979.5);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_399.setTransform(1090.075,974.3);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_400.setTransform(1042.575,974.3);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_401.setTransform(1009.475,967.95);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_402.setTransform(981.55,970.25);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_403.setTransform(946.375,974.1);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_404.setTransform(917.425,974.3);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAiyIA8AAIAAGmIg8AAIAAgyQgNAbgZAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAVgaAAgyQAAgygVgaQgVgbgoAAQgnAAgVAbg");
	this.shape_405.setTransform(882.95,968.15);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_406.setTransform(857.275,974.1);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQArAAAhASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQghASgrAAQgqAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAnAAQAoAAAVgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_407.setTransform(827.25,974.3);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQAsAAAgASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQggASgsAAQgqAAghgSgAg8hLQgWAaABAxQgBA0AWAaQAVAaAnAAQAoAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_408.setTransform(777.65,974.3);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_409.setTransform(750.15,970.25);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_410.setTransform(707.975,974.3);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_411.setTransform(684.825,967.95);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#000000").s().p("AgsDIQgZgOgNgbIAAAyIg9AAIAAmmIA9AAIAACzQANgbAZgOQAZgOAgAAQAnAAAdASQAeATAQAiQARAhAAAtQAAAugRAiQgQAjgeATQgeAUgmgBQggAAgZgNgAg9gOQgVAaAAAyQAAAyAVAaQAWAbAnAAQAmABAWgcQAWgcAAgyQAAgwgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_412.setTransform(660.725,968.15);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgdAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALABASQAAAVAPAOQAPAPAYgBQAhABAUgYQAWgWgBgjIAAgQIgLAAQguAAgZAFg");
	this.shape_413.setTransform(625.65,974.3);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_414.setTransform(579.725,974.3);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_415.setTransform(558.125,967.925);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_416.setTransform(519.225,974.3);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#000000").s().p("AB3DTIAAi9IjsAAIAAC9Ig+AAIAAmmIA+AAIAAC3IDsAAIAAi3IA8AAIAAGmg");
	this.shape_417.setTransform(480.5,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384}]},299).to({state:[]},90).to({state:[]},659).wait(183));

	// Layer_4
	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_418.setTransform(1514.55,1042.1);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_419.setTransform(1486.775,1045.95);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_420.setTransform(1452.325,1046.525);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQAsAAAgATQAgASASAjQASAiAAAtQAAAugSAiQgSAjggASQggATgsAAQgqAAghgTgAg8hLQgWAaABAxQgBAzAWAbQAVAaAnAAQAoAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_421.setTransform(1418.45,1046.15);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_422.setTransform(1387.775,1046.15);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_423.setTransform(1358.825,1046.15);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#000000").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgwAAgyAeIgSgqQAXgQAhgKQAigKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgXANgdAAQgcAAgYgMgAgQAPQgaAEgKALQgMAJAAATQAAAVAQAOQAQAOAXAAQAhAAAUgWQAWgXAAgkIAAgPIgLAAQgvAAgYAEg");
	this.shape_424.setTransform(1327.15,1046.15);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_425.setTransform(1281.225,1046.15);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_426.setTransform(1259.625,1039.775);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_427.setTransform(1235.125,1039.8);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_428.setTransform(1185.125,1051.35);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_429.setTransform(1149.425,1046.525);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_430.setTransform(1106.05,1042.1);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_431.setTransform(1079.675,1046.15);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_432.setTransform(1049.275,1046.15);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#000000").s().p("AhQDDQgdgUgRgiQgRgjAAgtQAAguARghQARgiAdgTQAdgTAnAAQAgAAAZAPQAYAOAOAZIAAixIA8AAIAAGmIg8AAIAAgyQgNAagZAOQgZAOggABQgmgBgegSgAg7gOQgWAZAAAyQAAAxAWAbQAWAcAmAAQAoAAAVgbQAVgbAAgxQAAgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_433.setTransform(1000.5,1040);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_434.setTransform(966.425,1045.95);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#000000").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAOAAIAAgRQAAgigOgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgQAPQgZAEgLALQgLAJAAATQAAAVAPAOQAQAOAYAAQAfAAAWgWQAUgXAAgkIAAgPIgKAAQgvAAgYAEg");
	this.shape_435.setTransform(932.6,1046.15);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_436.setTransform(884.325,1051.35);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_437.setTransform(848.875,1051.35);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#000000").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAOAAIAAgRQAAgigOgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgQAPQgZAEgLALQgLAJAAATQAAAVAPAOQAPAOAZAAQAfAAAWgWQAUgXAAgkIAAgPIgKAAQgvAAgYAEg");
	this.shape_438.setTransform(813.8,1046.15);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_439.setTransform(771.8,1042.1);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_440.setTransform(747.475,1046.15);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_441.setTransform(716.475,1046.15);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_442.setTransform(683.375,1045.95);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_443.setTransform(648.825,1045.95);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#000000").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTAqAAQAsAAAgATQAhASARAjQASAiAAAtQAAAugSAiQgRAjghASQggATgsAAQgqAAghgTgAg8hLQgWAaAAAxQAAAzAWAbQAVAaAnAAQApAAAUgaQAWgbAAgzQAAgxgWgaQgVgbgoAAQgmAAgWAbg");
	this.shape_444.setTransform(614.6,1046.15);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#000000").s().p("AhNC+QgtgbgZgwQgYgxAAhCQAAhBAYgxQAZgxAtgaQAtgaA9AAQArAAAlANQAlANAaAaIgWAuQgdgZgdgLQgdgLgiABQhBAAgkAqQgjAqAABPQAABPAjArQAkAqBBAAQAiAAAdgKQAdgLAdgYIAWAtQgaAZglANQglAOgrAAQg9AAgtgag");
	this.shape_445.setTransform(577.775,1039.8);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#000000").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_446.setTransform(1645.025,974.1);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSArAAQAqAAAhASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQghASgqAAQgrAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAoAAQAoAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_447.setTransform(1602.2,974.3);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#000000").s().p("AhNC+QgtgagZgyQgYgwAAhCQAAhBAYgxQAZgxAtgaQAtgaA9AAQArAAAlANQAlANAaAaIgWAtQgdgYgdgLQgdgLgiAAQhBAAgkArQgjArAABOQAABPAjArQAkArBBAAQAiAAAdgLQAdgLAdgYIAWAtQgaAZglAOQglANgrAAQg9AAgtgag");
	this.shape_448.setTransform(1565.375,967.95);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_449.setTransform(1527.575,974.675);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_450.setTransform(1493.725,979.5);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#000000").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_451.setTransform(1449.375,974.1);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQAqAAAhASQAhATASAjQARAiAAAtQAAAugRAiQgSAjghATQghASgqAAQgrAAghgSgAg8hLQgVAaAAAxQAAA0AVAaQAVAaAoAAQAnAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_452.setTransform(1406.55,974.3);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#000000").s().p("AhNC+QgtgagZgyQgYgwAAhCQAAhBAYgxQAZgxAtgaQAtgaA9AAQArAAAlANQAlANAaAaIgWAtQgdgYgdgLQgdgLgiAAQhBAAgkArQgjArAABOQAABPAjArQAkArBBAAQAiAAAdgLQAdgLAdgYIAWAtQgaAZglAOQglANgrAAQg9AAgtgag");
	this.shape_453.setTransform(1369.725,967.95);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_454.setTransform(1317.425,974.3);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_455.setTransform(1284.325,967.95);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_456.setTransform(1256.4,970.25);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_457.setTransform(1222.775,967.95);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_458.setTransform(1208.275,967.95);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgdAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALAAASQAAAVAQAOQAPAPAYgBQAgABAVgYQAWgWgBgjIAAgQIgLAAQguAAgZAFg");
	this.shape_459.setTransform(1184.55,974.3);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_460.setTransform(1158.35,970.25);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_461.setTransform(1133.275,974.3);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_462.setTransform(1101.675,974.1);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_463.setTransform(1077.125,967.925);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSAqAAQAsAAAgASQAhATARAjQASAiAAAtQAAAugSAiQgRAjghATQggASgsAAQgqAAghgSgAg8hLQgVAagBAxQABA0AVAaQAVAaAnAAQApAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_464.setTransform(1037.15,974.3);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_465.setTransform(1009.65,970.25);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#000000").s().p("AA9DTIiKiJIAACJIg8AAIAAmmIA8AAIAAEFICAiBIBLAAIiKCKICWCYg");
	this.shape_466.setTransform(970.3,967.95);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_467.setTransform(935.075,974.1);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_468.setTransform(910.525,967.925);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_469.setTransform(895.975,967.95);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_470.setTransform(857.125,974.3);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_471.setTransform(824.025,967.95);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_472.setTransform(796.1,970.25);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_473.setTransform(755.225,974.3);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#000000").s().p("ABOCSIhOjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_474.setTransform(715.45,974.475);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSAqAAQAsAAAgASQAhATARAjQASAiAAAtQAAAugSAiQgRAjghATQggASgsAAQgqAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAnAAQApAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgoAAQgmAAgWAbg");
	this.shape_475.setTransform(673.1,974.3);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_476.setTransform(648.925,967.95);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_477.setTransform(634.425,967.95);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQAqAAAhASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQghASgqAAQgrAAghgSgAg8hLQgVAagBAxQABA0AVAaQAVAaAoAAQAoAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_478.setTransform(610.3,974.3);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#000000").s().p("AgwDUIAAj0Ig6AAIAAgvIA6AAIAAgFQAAg+AegeQAegeBAgEIAbgBIADAuIgbABQgkACgQAQQgPARAAAjIAAAPIBPAAIAAAvIhPAAIAAD0g");
	this.shape_479.setTransform(583.9,967.85);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_480.setTransform(548.275,974.1);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_481.setTransform(519.325,974.3);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_482.setTransform(492.85,970.25);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_483.setTransform(466.475,974.3);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#000000").s().p("AidDTIAAmmICuAAQBDAAAlAiQAmAgAAA9QAAA8gmAhQglAhhDAAIhwAAIAACpgAhfgGIBpAAQBZgBAAhNQAAhMhZAAIhpAAg");
	this.shape_484.setTransform(432.25,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418}]},209).to({state:[]},90).to({state:[]},749).wait(183));

	// Layer_3
	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#FFFFFF").s().p("AhPDDQgegUgRgiQgQgjAAgtQAAguAQghQARgiAdgTQAdgTAnAAQAgAAAZAPQAZAOANAZIAAixIA8AAIAAGmIg7AAIAAgyQgNAagaAOQgZAOggABQgmgBgdgSgAg7gOQgWAZAAAyQAAAxAWAbQAWAcAnAAQAnAAAVgbQAVgbABgxQAAgygWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_485.setTransform(1466.1,1040);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_486.setTransform(1433.425,1046.15);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#FFFFFF").s().p("AhQDDQgdgUgRgiQgQgjgBgtQABguAQghQARgiAdgTQAegTAmAAQAgAAAZAPQAZAOANAZIAAixIA8AAIAAGmIg7AAIAAgyQgNAagaAOQgZAOggABQgmgBgegSgAg7gOQgWAZAAAyQAAAxAWAbQAWAcAmAAQAoAAAVgbQAVgbABgxQgBgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_487.setTransform(1398.95,1040);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_488.setTransform(1373.275,1045.95);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#FFFFFF").s().p("AhICMQgYgMgNgUQgOgVAAgaQAAggARgSQAQgRAmgIQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPggAAQgwAAgyAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgXANgcAAQgdAAgYgMgAgQAPQgaAEgLALQgKAJAAATQAAAVAPAOQAPAOAZAAQAfAAAWgWQAUgXAAgkIAAgPIgLAAQguAAgYAEg");
	this.shape_489.setTransform(1343.65,1046.15);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#FFFFFF").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAnAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_490.setTransform(1311.15,1046.15);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#FFFFFF").s().p("AgsDHQgZgOgNgaIAAAyIg9AAIAAmmIA9AAIAACyQANgaAZgOQAZgPAgAAQAnAAAdATQAeATAQAiQARAhAAAuQAAAtgRAjQgQAigeAUQgeASgmABQgggBgZgOgAg9gOQgVAaAAAyQAAAxAVAbQAWAbAnAAQAmABAWgcQAWgcAAgxQAAgygWgZQgVgbgnAAQgnAAgWAbg");
	this.shape_491.setTransform(1277.375,1040);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_492.setTransform(1241.575,1045.95);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#FFFFFF").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQArAAAgATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQggATgrAAQgrAAghgTgAg8hLQgVAagBAxQABAzAVAbQAVAaAoAAQAnAAAVgaQAWgbAAgzQAAgxgWgaQgVgbgnAAQgoAAgVAbg");
	this.shape_493.setTransform(1207.35,1046.15);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_494.setTransform(1148.875,1045.95);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_495.setTransform(1115.725,1039.775);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_496.setTransform(1091.225,1039.8);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_497.setTransform(1047.5,1042.1);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_498.setTransform(1021.125,1046.15);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#FFFFFF").s().p("AhDDEQgigJgagTIASgsQAdASAbAJQAaAHAeABQBSAAAAhTIAAguQgMAagaAOQgaAPghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgrARgiQARghAegSQAdgSAnAAQAgAAAaAOQAZAOAOAbIAAgwIA8AAIAAEMQAABDgkAjQgkAihFAAQglAAgigKgAg8iCQgWAZAAAuQAAAuAXAYQAWAaAmAAQAnAAAXgaQAWgYAAguQAAgtgWgaQgWgagoAAQgmAAgXAag");
	this.shape_499.setTransform(986.525,1051.55);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#FFFFFF").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_500.setTransform(936.875,1051.35);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#FFFFFF").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_501.setTransform(911.025,1039.8);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_502.setTransform(887.975,1046.15);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_503.setTransform(854.875,1039.8);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#FFFFFF").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTAqAAQArAAAhATQAhASARAjQASAiAAAtQAAAugSAiQgRAjghASQghATgrAAQgqAAghgTgAg8hLQgWAaAAAxQAAAzAWAbQAVAaAnAAQApAAAUgaQAWgbAAgzQAAgxgWgaQgVgbgoAAQgmAAgWAbg");
	this.shape_504.setTransform(804.85,1046.15);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_505.setTransform(777.35,1042.1);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_506.setTransform(740.4,1042.1);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#FFFFFF").s().p("ABVCSIhVhrIhUBrIhJAAIB7iVIh0iOIBJAAIBNBiIBOhiIBJAAIh0COIB6CVg");
	this.shape_507.setTransform(714.1,1046.325);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_508.setTransform(682.525,1046.15);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_509.setTransform(656.05,1042.1);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#FFFFFF").s().p("AhICMQgYgMgNgUQgOgVAAgaQAAggARgSQAQgRAmgIQAmgIBCAAIANAAIAAgRQABgigOgPQgPgPggAAQgwAAgyAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgXANgcAAQgdAAgYgMgAgQAPQgZAEgLALQgLAJAAATQAAAVAPAOQAPAOAZAAQAfAAAWgWQAUgXAAgkIAAgPIgKAAQgvAAgYAEg");
	this.shape_510.setTransform(613.2,1046.15);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_511.setTransform(1512.975,974.3);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#FFFFFF").s().p("AhQDCQgdgTgRgjQgRgiABguQgBgtARghQARgiAdgTQAegSAmAAQAgAAAZANQAZAOANAbIAAiyIA9AAIAAGmIg9AAIAAgyQgNAbgZAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAWgagBgyQABgygWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_512.setTransform(1480,968.15);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_513.setTransform(1445.925,974.1);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_514.setTransform(1412.775,974.3);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_515.setTransform(1382.375,974.3);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_516.setTransform(1326.425,974.1);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#FFFFFF").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQAqAAAhASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQghASgqAAQgrAAghgSgAg8hLQgWAaAAAxQAAA0AWAaQAVAaAoAAQAoAAAVgaQAVgaAAg0QAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_517.setTransform(1283.6,974.3);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#FFFFFF").s().p("AhNC+QgtgagZgyQgYgwAAhCQAAhBAYgxQAZgxAtgaQAtgaA9AAQArAAAlANQAlANAaAaIgWAtQgdgYgdgLQgdgLgiAAQhBAAgkArQgjArAABOQAABPAjArQAkArBBAAQAiAAAdgLQAdgLAdgYIAWAtQgaAZglAOQglANgrAAQg9AAgtgag");
	this.shape_518.setTransform(1246.775,967.95);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_519.setTransform(1208.975,974.675);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FFFFFF").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_520.setTransform(1175.125,979.5);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_521.setTransform(1130.775,974.1);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#FFFFFF").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQAqAAAhASQAhATASAjQARAiAAAtQAAAugRAiQgSAjghATQghASgqAAQgrAAghgSgAg8hLQgVAaAAAxQAAA0AVAaQAVAaAoAAQAnAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_522.setTransform(1087.95,974.3);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#FFFFFF").s().p("AhNC+QgtgagZgyQgYgwAAhCQAAhBAYgxQAZgxAtgaQAtgaA9AAQArAAAlANQAlANAaAaIgWAtQgdgYgdgLQgdgLgiAAQhBAAgkArQgjArAABOQAABPAjArQAkArBBAAQAiAAAdgLQAdgLAdgYIAWAtQgaAZglAOQglANgrAAQg9AAgtgag");
	this.shape_523.setTransform(1051.125,967.95);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#FFFFFF").s().p("AgfAzQAZgaAEgZIghAAIAAhIIBHAAIAAAxQAAAbgKAXQgJAXgVAXg");
	this.shape_524.setTransform(1007.525,989.225);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_525.setTransform(974.625,974.1);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_526.setTransform(941.475,967.925);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_527.setTransform(916.975,967.95);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_528.setTransform(868.025,974.3);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_529.setTransform(826.375,974.1);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#FFFFFF").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQAqAAAhASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQghASgqAAQgrAAghgSgAg8hLQgVAagBAxQABA0AVAaQAVAaAoAAQAoAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_530.setTransform(783.55,974.3);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#FFFFFF").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_531.setTransform(752.875,974.3);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#FFFFFF").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_532.setTransform(730.425,967.95);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_533.setTransform(707.375,974.3);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#FFFFFF").s().p("ABNCSIhNjQIhNDQIg2AAIhwkjIA+AAIBQDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_534.setTransform(666.1,974.475);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#FFFFFF").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQArAAAgASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQggASgrAAQgrAAghgSgAg8hLQgVAagBAxQABA0AVAaQAVAaAoAAQAoAAAUgaQAWgaAAg0QAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_535.setTransform(607.95,974.3);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#FFFFFF").s().p("AgeDTIAAlyIiPAAIAAg0IFbAAIAAA0IiPAAIAAFyg");
	this.shape_536.setTransform(572.9,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485}]},119).to({state:[]},90).to({state:[]},839).wait(183));

	// Layer_2
	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_537.setTransform(1645.525,1045.95);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#FFFFFF").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQAqAAAhATQAhASASAjQARAiAAAtQAAAugRAiQgSAjghASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAnAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_538.setTransform(1611.3,1046.15);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_539.setTransform(1579.875,1046.15);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#FFFFFF").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgXANgdAAQgcAAgYgMgAgQAPQgaAEgKALQgMAJAAATQAAAVAQAOQAQAOAYAAQAfAAAVgWQAWgXAAgkIAAgPIgLAAQgvAAgYAEg");
	this.shape_540.setTransform(1549,1046.15);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_541.setTransform(1517.575,1046.15);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_542.setTransform(1487.175,1046.15);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#FFFFFF").s().p("ABVCSIhVhrIhUBrIhIAAIB6iVIh0iOIBJAAIBNBiIBOhiIBIAAIhzCOIB7CVg");
	this.shape_543.setTransform(1441.25,1046.325);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#FFFFFF").s().p("AhICMQgYgMgNgUQgOgVAAgaQAAggAQgSQAQgRAngIQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAeIgSgqQAXgQAigKQAhgKAdAAQA7AAAdAeQAcAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgXANgcAAQgdAAgYgMgAgRAPQgZAEgLALQgLAJABATQAAAVAPAOQAPAOAYAAQAgAAAVgWQAVgXAAgkIAAgPIgLAAQguAAgZAEg");
	this.shape_544.setTransform(1409,1046.15);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_545.setTransform(1382.8,1042.1);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_546.setTransform(1340.625,1046.15);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_547.setTransform(1307.525,1039.8);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_548.setTransform(1279.6,1042.1);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_549.setTransform(1244.425,1045.95);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#FFFFFF").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAnAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_550.setTransform(1214.4,1046.15);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#FFFFFF").s().p("AgxDUIAAj1Ig4AAIAAguIA4AAIAAgGQAAg8AfgfQAfgfA/gDIAbgCIADAuIgbACQgkACgQAQQgPASAAAhIAAAQIBQAAIAAAuIhQAAIAAD1g");
	this.shape_551.setTransform(1188,1039.7);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_552.setTransform(1143.975,1045.95);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#FFFFFF").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQAsAAAgATQAgASASAjQASAiAAAtQAAAugSAiQgSAjggASQggATgsAAQgqAAghgTgAg8hLQgWAaABAxQgBAzAWAbQAVAaAnAAQAoAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_553.setTransform(1109.75,1046.15);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_554.setTransform(1085.625,1039.775);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_555.setTransform(1067.75,1042.1);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_556.setTransform(1049.975,1039.775);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_557.setTransform(1028.175,1046.15);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#FFFFFF").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQAsAAAgATQAhASARAjQASAiAAAtQAAAugSAiQgRAjghASQggATgsAAQgqAAghgTgAg8hLQgWAaAAAxQAAAzAWAbQAVAaAnAAQAoAAAVgaQAWgbAAgzQAAgxgWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_558.setTransform(996.9,1046.15);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#FFFFFF").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_559.setTransform(963.125,1051.35);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_560.setTransform(918.15,1042.1);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_561.setTransform(890.375,1045.95);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#FFFFFF").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAOAAIAAgRQAAgigOgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgQAPQgZAEgLALQgLAJAAATQAAAVAPAOQAPAOAZAAQAfAAAWgWQAUgXAAgkIAAgPIgKAAQgvAAgYAEg");
	this.shape_562.setTransform(856.55,1046.15);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_563.setTransform(830.35,1042.1);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_564.setTransform(802.575,1045.95);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_565.setTransform(768.125,1046.525);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#FFFFFF").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTArAAQAqAAAhATQAhASASAjQARAiAAAtQAAAugRAiQgSAjghASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAnAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_566.setTransform(734.25,1046.15);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#FFFFFF").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_567.setTransform(703.575,1046.15);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#FFFFFF").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_568.setTransform(674.625,1046.15);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#FFFFFF").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggAQgSQARgRAmgIQAmgIBBAAIAPAAIAAgRQAAgigPgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgRAPQgYAEgMALQgKAJgBATQAAAVAQAOQAQAOAXAAQAhAAAUgWQAWgXAAgkIAAgPIgMAAQguAAgZAEg");
	this.shape_569.setTransform(642.95,1046.15);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_570.setTransform(595.725,1046.15);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_571.setTransform(569.25,1042.1);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#FFFFFF").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQArAAAgATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQggATgrAAQgrAAghgTgAg8hLQgVAagBAxQABAzAVAbQAVAaAoAAQAnAAAVgaQAWgbAAgzQAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_572.setTransform(541.8,1046.15);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_573.setTransform(499.125,1045.95);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_574.setTransform(457.375,1046.15);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_575.setTransform(432.675,1045.95);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#FFFFFF").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAOAAIAAgRQAAgigOgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgeAAQgcAAgYgLgAgQAQQgZAEgLAJQgMALAAASQAAAVAQAOQAQAPAYgBQAfABAWgYQAUgWAAgjIAAgQIgKAAQgvAAgYAFg");
	this.shape_576.setTransform(1626.05,974.3);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#FFFFFF").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAiyIA8AAIAAGmIg8AAIAAgyQgNAbgZAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAVgaAAgyQAAgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_577.setTransform(1576.05,968.15);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_578.setTransform(1543.375,974.3);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_579.setTransform(1516.9,970.25);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#FFFFFF").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_580.setTransform(1489.475,979.5);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_581.setTransform(1455.075,974.3);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#FFFFFF").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_582.setTransform(1425.425,974.3);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#FFFFFF").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_583.setTransform(1396.475,974.3);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#FFFFFF").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPggAAQgwAAgyAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgRAQQgYAEgMAJQgLALABASQAAAVAPAOQAPAPAZgBQAfABAWgYQAUgWAAgjIAAgQIgLAAQguAAgZAFg");
	this.shape_584.setTransform(1364.8,974.3);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_585.setTransform(1322.8,970.25);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_586.setTransform(1297.725,974.3);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_587.setTransform(1266.225,974.675);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#FFFFFF").s().p("AhLDeIAdgCQAdgDAOgOQAOgPAAgeIAAklIA8AAIAAEcQAAA5gbAcQgbAbg8AEIgbACgAAHjLIAAg/IBFAAIAAA/g");
	this.shape_588.setTransform(1237.875,973.45);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_589.setTransform(1204.425,974.3);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#FFFFFF").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPggAAQgwAAgyAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgRAQQgYAEgMAJQgLALABASQAAAVAPAOQAPAPAZgBQAfABAWgYQAUgWAAgjIAAgQIgLAAQguAAgZAFg");
	this.shape_590.setTransform(1173.55,974.3);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_591.setTransform(1140.725,967.95);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#FFFFFF").s().p("AgfAzQAZgaAEgZIghAAIAAhIIBHAAIAAAxQAAAbgKAXQgJAXgVAXg");
	this.shape_592.setTransform(1100.475,989.225);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_593.setTransform(1077.525,974.3);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_594.setTransform(1051.05,970.25);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#FFFFFF").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIAOAAIAAgRQAAgigOgPQgPgPgfAAQgyAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgdAAQgdAAgYgLgAgRAQQgZAEgLAJQgKALgBASQAAAVAQAOQAPAPAYgBQAhABAUgYQAWgWAAgjIAAgQIgMAAQguAAgZAFg");
	this.shape_595.setTransform(1024,974.3);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_596.setTransform(991.275,974.675);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#FFFFFF").s().p("AhQDCQgdgTgRgjQgQgigBguQABgtAQghQARgiAdgTQAegSAmAAQAgAAAZANQAZAOANAbIAAiyIA8AAIAAGmIg7AAIAAgyQgNAbgaAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAnAAQAnAAAVgbQAVgaABgyQgBgygVgaQgVgbgnAAQgnAAgWAbg");
	this.shape_597.setTransform(955.7,968.15);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#FFFFFF").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggARgSQAQgSAmgHQAmgIBCAAIANAAIAAgRQABgigOgPQgPgPggAAQgwAAgyAfIgSgrQAXgQAigKQAhgKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgQAQQgZAEgLAJQgLALAAASQAAAVAPAOQAPAPAZgBQAfABAWgYQAUgWAAgjIAAgQIgKAAQgvAAgYAFg");
	this.shape_598.setTransform(922.35,974.3);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_599.setTransform(897.925,974.1);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FFFFFF").s().p("AhDDEQgigJgagTIASgsQAdATAbAIQAaAIAeAAQBSAAAAhUIAAguQgMAbgaAPQgaAOghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgsARggQARgiAegSQAdgSAnAAQAgAAAaAPQAZAOAOAaIAAgwIA8AAIAAENQAABCgkAjQgkAihFAAQglAAgigKgAg8iDQgWAaAAAuQAAAtAXAZQAWAaAmAAQAnAAAXgaQAWgZAAgtQAAgtgWgbQgWgagoABQgmgBgXAag");
	this.shape_600.setTransform(866.075,979.7);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_601.setTransform(822.7,970.25);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_602.setTransform(794.925,974.1);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_603.setTransform(761.775,974.3);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#FFFFFF").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_604.setTransform(732.125,974.3);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_605.setTransform(701.125,974.3);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_606.setTransform(676.425,974.1);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#FFFFFF").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgwAAgyAfIgSgrQAXgQAhgKQAigKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgeAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQAAAVAQAOQAQAPAYgBQAfABAWgYQAUgWABgjIAAgQIgLAAQgvAAgYAFg");
	this.shape_607.setTransform(631,974.3);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#FFFFFF").s().p("AgfAzQAZgaAEgZIghAAIAAhIIBHAAIAAAxQAAAbgKAXQgJAXgVAXg");
	this.shape_608.setTransform(592.475,989.225);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_609.setTransform(576.525,974.1);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_610.setTransform(547.575,974.3);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_611.setTransform(521.1,970.25);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_612.setTransform(494.725,974.3);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#FFFFFF").s().p("AidDTIAAmmICuAAQBDAAAlAiQAmAgAAA9QAAA8gmAhQglAhhDAAIhxAAIAACpgAhggGIBqAAQBZgBAAhNQAAhMhZAAIhqAAg");
	this.shape_613.setTransform(460.5,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537}]},30).to({state:[]},89).to({state:[]},929).wait(183));

	// Layer_70
	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#999999").s().p("AglAvQgRgRAAgeQAAgRAIgPQAHgOANgIQANgIAQAAQAYAAAOAQQANAQAAAbIAAAHIhYAAQABAVALALQAKALATAAQAVAAASgPIAHAPQgJAIgLAEQgNAEgNAAQgcAAgQgQgAAlgIQgBgSgIgKQgJgKgQAAQgPAAgJAKQgKAKgCASIBGAAIAAAAg");
	this.shape_614.setTransform(1721.95,149.125);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#999999").s().p("AgwAwIAHgPQAKAIAKADQAKADANAAQAMAAAIgEQAHgFAAgJQAAgHgFgEQgFgEgKgDIgUgFQgQgDgHgIQgJgIAAgNQAAgQAMgKQAOgKAUAAQAMAAAMAEQAMAEAHAIIgHAPQgQgPgUAAQgMAAgHAFQgHAFAAAJQAAAHAEAFQAFAEAJACIAUAFQARAEAIAHQAIAIAAAOQABAQgNAJQgNAJgWAAQgeAAgTgPg");
	this.shape_615.setTransform(1709.3,149.125);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#999999").s().p("AgdA4QgNgIgIgOQgHgPAAgTQAAgSAHgOQAIgPANgHQANgIAQAAQARAAANAIQAOAHAHAPQAHAOAAASQAAATgHAPQgHAOgOAIQgNAHgRAAQgQAAgNgHgAgbghQgJAMAAAVQAAAXAJAMQAKAMARAAQASAAAKgMQAJgMAAgXQAAgVgJgMQgKgMgSAAQgRAAgKAMg");
	this.shape_616.setTransform(1696.425,149.125);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#999999").s().p("AgJBYIAAivIATAAIAACvg");
	this.shape_617.setTransform(1686.6,146.475);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#999999").s().p("AggBPQgSgLgKgUQgKgUAAgcQAAgbAKgUQAKgUASgMQATgKAYAAQASAAAPAGQAQAFALALIgIAPQgNgKgMgFQgMgEgPgBQgcABgQASQgQATAAAiQAAAjAQASQAQAUAcgBQAPAAAMgEQAMgGANgKIAIAQQgLAKgQAHQgPAFgSAAQgYAAgTgLg");
	this.shape_618.setTransform(1675.425,146.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614}]},1189).wait(42));

	// Layer_4
	this.instance_1 = new lib.Tween34();
	this.instance_1.setTransform(1047.45,342);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1189).to({_off:false},0).to({alpha:1,mode:"synched",startPosition:0},16).wait(26));

	// Layer_2
	this.instance_2 = new lib.LMod();
	this.instance_2.setTransform(1499.25,705.2,1,1,0,0,0,3.5,0);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.LMod = new lib.LMod();
	this.LMod.name = "LMod";
	this.LMod.setTransform(1499.25,705.2,1,1,0,0,0,3.5,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},1189).to({state:[{t:this.LMod}]},16).wait(26));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1189).to({_off:false},0).to({_off:true,alpha:1},16).wait(26));

	// Layer_3
	this.instance_3 = new lib.LMonboarding();
	this.instance_3.setTransform(1047.25,705.8,1,1,0,0,0,0,0.6);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.LMonboarding = new lib.LMonboarding();
	this.LMonboarding.name = "LMonboarding";
	this.LMonboarding.setTransform(1047.25,705.8,1,1,0,0,0,0,0.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_3}]},1189).to({state:[{t:this.LMonboarding}]},16).wait(26));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1189).to({_off:false},0).to({_off:true,alpha:1},16).wait(26));

	// Layer_1
	this.instance_4 = new lib.LMdevicemanagement();
	this.instance_4.setTransform(598.75,705.2);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.LMdevicemanagement = new lib.LMdevicemanagement();
	this.LMdevicemanagement.name = "LMdevicemanagement";
	this.LMdevicemanagement.setTransform(598.75,705.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},1189).to({state:[{t:this.LMdevicemanagement}]},16).wait(26));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1189).to({_off:false},0).to({_off:true,alpha:1},16).wait(26));

	// Layer_35
	this.instance_5 = new lib.Symbol15();
	this.instance_5.setTransform(1080.9,539.5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(749).to({_off:false},0).wait(86).to({alpha:0},6).to({_off:true},4).wait(386));

	// Layer_34
	this.instance_6 = new lib.A63x();
	this.instance_6.setTransform(820,157,0.3586,0.3586);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(659).to({_off:false},0).to({_off:true},90).wait(482));

	// Layer_33
	this.instance_7 = new lib.a5();
	this.instance_7.setTransform(820,157,0.3509,0.3509);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(569).to({_off:false},0).to({_off:true},90).wait(572));

	// Layer_32
	this.instance_8 = new lib.a4();
	this.instance_8.setTransform(820,157,0.3509,0.3509);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(479).to({_off:false},0).to({_off:true},90).wait(662));

	// Layer_31
	this.instance_9 = new lib.A33x();
	this.instance_9.setTransform(820,157,0.3586,0.3586);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(389).to({_off:false},0).to({_off:true},90).wait(752));

	// Layer_30
	this.instance_10 = new lib.a2();
	this.instance_10.setTransform(820,157,0.3509,0.3509);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(299).to({_off:false},0).to({_off:true},90).wait(842));

	// Layer_29
	this.instance_11 = new lib.Symbol14();
	this.instance_11.setTransform(1080.9,539.5);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(208).to({_off:false},0).to({alpha:1},15).to({_off:true},76).wait(932));

	// peter2fade_copy
	this.instance_12 = new lib.Tween55("synched",0);
	this.instance_12.setTransform(1042.8,607.8,1,0.9935);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(840).to({_off:false},0).to({regX:0.1,regY:0.1,scaleY:0.9936,x:1042.9,y:607.9,alpha:0},17).to({_off:true},1).wait(373));

	// peter2
	this.instance_13 = new lib.peter2();
	this.instance_13.setTransform(299.05,108.95);
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(842).to({_off:false},0).wait(153).to({alpha:0},16).wait(220));

	// peter2fade
	this.instance_14 = new lib.Tween55("synched",0);
	this.instance_14.setTransform(1042.8,608.1,1,0.9942);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(834).to({_off:false},0).to({regX:0.1,regY:0.1,scaleY:0.9936,x:1042.9,y:607.9,alpha:1},23).to({_off:true},1).wait(373));

	// peter3fade
	this.instance_15 = new lib.Tween54("synched",0);
	this.instance_15.setTransform(1043.65,610.8);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1148).to({_off:false},0).to({alpha:1},20).wait(63));

	// peter3
	this.instance_16 = new lib.peter3();
	this.instance_16.setTransform(817.5,985.7,1,1,0,0,0,1571.5,893.1);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(998).to({_off:false},0).wait(233));

	// mask_idn (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EhcxBXDMAAAieXMDoaAAAMAAACeXg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:893.7,y:557.0992}).wait(849).to({graphics:null,x:0,y:0}).wait(382));

	// hand
	this.instance_17 = new lib.Tween6("synched",0);
	this.instance_17.setTransform(1046.85,873.7);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(207).to({_off:false},0).to({alpha:1},16).to({_off:true},626).wait(382));

	// whiteframe
	this.instance_18 = new lib.Tween5("synched",0);
	this.instance_18.setTransform(1043.55,604.55,1,1.0171);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(207).to({_off:false},0).to({alpha:1},16).to({startPosition:0},616).wait(392));

	// frame
	this.instance_19 = new lib.Tween7("synched",0);
	this.instance_19.setTransform(1062.65,611.1);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(207).to({_off:false},0).to({alpha:1},13).wait(1011));

	// notification
	this.instance_20 = new lib.notification1();
	this.instance_20.setTransform(1299.8,283);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(119).to({_off:false},0).to({y:264.8,alpha:1},10).to({_off:true},80).wait(1022));

	// window
	this.instance_21 = new lib.Path_9();
	this.instance_21.setTransform(1060.2,581.4,1,1,0,0,0,499.1,539.6);
	this.instance_21.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).to({alpha:0},29).wait(1202));

	// windowframe
	this.instance_22 = new lib.Path_7();
	this.instance_22.setTransform(1014.9,360.4,1,1,0,0,0,542.3,360.4);
	this.instance_22.alpha = 0.5313;

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#AC715C").s().p("EhU5gk9IH2mMMCh9BMaIAAJ5g");
	this.shape_619.setTransform(1015.975,957.425);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#C6B1B5").s().p("EhR5gkIIH2mNMCb9BJUIAALXg");
	this.shape_620.setTransform(1035.125,922.825);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#AC715C").s().p("EgD6g4TIH1DtMAAABmuIn1GMg");
	this.shape_621.setTransform(497.7,360.425);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#C6B1B5").s().p("EgD6g0nIH1DvMAAABfUIn1GMg");
	this.shape_622.setTransform(536,354.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.instance_22}]}).wait(1231));

	// computer
	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#DBDCE2").s().p("AoVLTQgZgPAFggIBytBQACgPAJgNQAJgNANgIIHJkFIGtj8QAegRAYAPQAZAOgFAgIhyNBQgCAPgJANQgJANgNAIIt2IBQgQAJgOAAQgMAAgMgGg");
	this.shape_623.setTransform(1040.7256,640.5946);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#8D8588").s().p("AoXLYQgmgXgEgUIBztYQACgQAJgNQAJgNANgIIHJkFIGtj8QAQgJASABIABAAIABAAQALACBKApIgxAaIhwMxQgCAOgJANQgJAOgNAHItVIhQgKAGgMAAQgTAAgZgPg");
	this.shape_624.setTransform(1036.975,638.7503);

	this.instance_23 = new lib.Group_2();
	this.instance_23.setTransform(973.7,641.4,1,1,0,0,0,28.2,17.4);

	this.instance_24 = new lib.Group_3();
	this.instance_24.setTransform(1008,662.9,1,1,0,0,0,53.6,31.7);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#DBDCE2").s().p("AtsAqQgNgIABgOQAAgOAMgHIN4n7QATgMAWAAQAWABASALIMcHdIvGIng");
	this.shape_625.setTransform(995.624,660.4);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#8D8588").s().p("AtgA7QgSgLAAgWQAAgVAKgRQALgSASgKIN6nmINEH1IvGIog");
	this.shape_626.setTransform(992.575,664.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_626},{t:this.shape_625},{t:this.instance_24},{t:this.instance_23},{t:this.shape_624},{t:this.shape_623}]},299).wait(932));

	// head
	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#5B3535").s().p("AnMCoQADijAiiGQAeh1BThDQBMg9BsgMQBRgKA1ANQAlAKAyAbIBUAvQAXALBEAZQA6AWAfASQAuAbAcAoQAeAsgDAuQgDAwgpAmQglAjg0AMQgrALg5gFQgjgDhBgNIhagYQg+gPgbAIQgoAMgVA9QgcBOgLANQgJAKgNAFQgNAFgNgDQgVgGgUgkQgXgogQgJQgTgLgWAHQgWAGgNATQgLARgBAXQAAAXALATQAHAPAYARQAZARAGAKQAHAMgEAUQgCANgKAYQgHARgNALQgNANgRADIgOABQheAAACjgg");
	this.shape_627.setTransform(955.2094,368.4936);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#FB8E71").s().p("AhdFgQhGgfgzg+Qg0hAgRhQQgDgHgFgwQgDghgTgQIgighQgVgWACgPQADgXAwglQA1grAHgOQAdg5A2gsQAzgqBBgXQCHglBsAFQCgAHAUBrQgMA0gKBgQgMBwgHAoQgeCzheBWQhEA6hRALQgRACgSAAQg4AAg3gYg");
	this.shape_628.setTransform(953.0161,391.7896);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_628},{t:this.shape_627}]}).wait(1231));

	// neck
	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#FB8E71").s().p("AhVD6QgogOgZgaIAAnaIEtAAIAAHcQgaAZgmAOQgoAOguAAQgtAAgpgPg");
	this.shape_629.setTransform(933.375,416.375);

	this.timeline.addTween(cjs.Tween.get(this.shape_629).wait(1231));

	// RUarm
	this.instance_25 = new lib.Symbol2();
	this.instance_25.setTransform(887.25,459.8,1,1,0,0,0,63.6,11.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1).to({regX:36.4,regY:63.5,x:860.05,y:511.8},0).wait(138).to({rotation:-2.3429,x:862.15,y:512.85},0).wait(1).to({rotation:-4.6857,x:864.4,y:513.85},0).wait(1).to({rotation:-7.0286,x:866.6,y:514.7},0).wait(1).to({rotation:-9.3715,x:868.85,y:515.5},0).wait(1).to({rotation:-11.7143,x:871.15,y:516.2},0).wait(1).to({rotation:-14.0572,x:873.45,y:516.8},0).wait(1).to({rotation:-16.4001,x:875.8,y:517.3},0).wait(1).to({rotation:-18.7429,x:878.15,y:517.75},0).wait(1).to({rotation:-21.0858,x:880.55,y:518.05},0).wait(1).to({rotation:-23.4287,x:882.95,y:518.3},0).wait(1).to({rotation:-25.7716,x:885.35,y:518.4},0).wait(1).to({rotation:-28.1144,x:887.7,y:518.45},0).wait(1).to({rotation:-30.4573,x:890.15,y:518.4},0).wait(1).to({rotation:-32.8002,x:892.55,y:518.25},0).wait(1).to({rotation:-35.143,x:894.9,y:517.9},0).wait(1).to({rotation:-37.4859,x:897.3,y:517.55},0).wait(1077));

	// RLarm
	this.instance_26 = new lib.Symbol1();
	this.instance_26.setTransform(843.85,559.9,1,1,0,0,0,15.8,10.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1).to({regX:38.5,regY:82.9,x:866.55,y:632.2},0).wait(138).to({rotation:-6.3508,x:878.4,y:629.6},0).wait(1).to({rotation:-12.7016,x:890.05,y:626.1},0).wait(1).to({rotation:-19.0524,x:901.1,y:621.9},0).wait(1).to({rotation:-25.4032,x:911.65,y:616.9},0).wait(1).to({rotation:-31.7541,x:921.6,y:611.2},0).wait(1).to({rotation:-38.1049,x:930.75,y:604.9},0).wait(1).to({rotation:-44.4557,x:939.2,y:598.05},0).wait(1).to({rotation:-50.8065,x:946.85,y:590.8},0).wait(1).to({rotation:-57.1573,x:953.6,y:583.2},0).wait(1).to({rotation:-63.5081,x:959.4,y:575.4},0).wait(1).to({rotation:-69.8589,x:964.35,y:567.35},0).wait(1).to({rotation:-76.2097,x:968.4,y:559.3},0).wait(1).to({rotation:-82.5606,x:971.45,y:551.3},0).wait(1).to({rotation:-88.9114,x:973.65,y:543.45},0).wait(1).to({rotation:-95.2622,x:974.85,y:535.9},0).wait(1).to({rotation:-101.613,x:975.3,y:528.7},0).wait(1077));

	// body
	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#839DB7").s().p("AhXB0QgngOgZgaQgjgiAAgqQAAgpAjgiQAZgaAngOQAqgPAtAAIAnACQA+AKAqAiIAAAAIAHAHQAlAiAAArQAAAtglAhQgaAZgnAOQgnAOguAAQgtABgqgQg");
	this.shape_630.setTransform(933.5,429.75);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#E6E8EA").s().p("AAnQWQhrgKg5g0Qhlhdgcn1QgLjGAFjLQAFjCAQhyQAXihAghtQAliAA5hdQBZiRCbhcQBPBpAACkQABB5guCsQg3DPgKBYQgUCoA2B1IAaA0QAQAfAGAWQAVBEgYBpIgWBYQgNA1gEAkQgLBjAoCNQAWBPAwCfQhhAUhOAAQgZAAgXgCg");
	this.shape_631.setTransform(871.4219,536.5205);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#EBEEF3").s().p("AoeQlQhHh2gmj0QgljoADkWQAEkaArjvQAwkDBTiOQBWibDZhxQDShvDZgMQDqgNB7BxQCJB+goD/Qh9EcAIEaQAEBsAXB8QAKAvAkCYQAaBuAFA7QAIBUgUA9QgwCMjtBdQj1CGjJA3QiEAlhoAAQiKAAhZhCgAKlqDIAHgRIgLAkIAEgTgAKlqDIAAAAg");
	this.shape_632.setTransform(913.0698,528.7733);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_632},{t:this.shape_631},{t:this.shape_630}]}).wait(1231));

	// glass
	this.instance_27 = new lib.Symbol5();
	this.instance_27.setTransform(1114.6,544.4,1,1,0,0,0,13.5,23.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1).to({regY:24,y:544.5},0).wait(28).to({y:536.25},0).wait(1).to({x:1114.65,y:528},0).wait(1).to({x:1114.7,y:519.75},0).wait(1).to({x:1114.75,y:511.55},0).wait(1).to({x:1114.8,y:503.3},0).wait(1).to({x:1114.85,y:495.05},0).wait(1).to({x:1114.9,y:486.8},0).wait(1).to({x:1114.95,y:478.6},0).wait(1).to({x:1115,y:470.35},0).wait(1).to({x:1115.05,y:462.1},0).wait(1).to({x:1115.1,y:453.9},0).wait(16).to({rotation:7.4995,x:1115.05,y:453.85},0).wait(1).to({rotation:14.9989,x:1115.1,y:453.9},0).wait(1).to({rotation:4.9991,x:1115.05},0).wait(1).to({rotation:-5.0007,x:1115.1,y:453.85},0).wait(1).to({rotation:-15.0005,y:453.9},0).wait(1).to({rotation:-5.0007,y:453.85},0).wait(1).to({rotation:4.9991,x:1115.05,y:453.9},0).wait(1).to({rotation:14.9989,x:1115.1},0).wait(1).to({rotation:4.9991,x:1115.05},0).wait(1).to({rotation:-5.0007,x:1115.1,y:453.85},0).wait(1).to({rotation:-15.0005,y:453.9},0).wait(1).to({rotation:-5.0007,y:453.85},0).wait(1).to({rotation:4.9991,x:1115.05,y:453.9},0).wait(1).to({rotation:14.9989,x:1115.1},0).wait(1).to({rotation:4.9991,x:1115.05},0).wait(1).to({rotation:-5.0007,x:1115.1,y:453.85},0).wait(1).to({rotation:-15.0005,y:453.9},0).wait(1).to({rotation:-5.0007,y:453.85},0).wait(1).to({rotation:4.9991,x:1115.05,y:453.9},0).wait(1).to({rotation:14.9989,x:1115.1},0).wait(1).to({rotation:7.4995,x:1115.05,y:453.85},0).wait(1).to({rotation:0,x:1115.1,y:453.9},0).wait(25).to({x:1115.05,y:460.85},0).wait(1).to({x:1115,y:467.8},0).wait(1).to({x:1114.95,y:474.8},0).wait(1).to({x:1114.9,y:481.75},0).wait(1).to({y:488.7},0).wait(1).to({x:1114.85,y:495.7},0).wait(1).to({x:1114.8,y:502.65},0).wait(1).to({x:1114.75,y:509.65},0).wait(1).to({y:516.6},0).wait(1).to({x:1114.7,y:523.55},0).wait(1).to({x:1114.65,y:530.55},0).wait(1).to({x:1114.6,y:537.5},0).wait(1).to({y:544.5},0).wait(1118));

	// LUarm
	this.instance_28 = new lib.Symbol4();
	this.instance_28.setTransform(965.1,443.35,1,1,0,0,0,19.4,5.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1).to({regX:40.9,regY:57.8,x:986.6,y:495.35},0).wait(28).to({rotation:-1.3635,x:987.8,y:494.85},0).wait(1).to({rotation:-2.7271,x:989,y:494.25},0).wait(1).to({rotation:-4.0906,x:990.2,y:493.65},0).wait(1).to({rotation:-5.4541,x:991.4,y:493.05},0).wait(1).to({rotation:-6.8177,x:992.6,y:492.4},0).wait(1).to({rotation:-8.1812,x:993.8,y:491.75},0).wait(1).to({rotation:-9.5448,x:994.95,y:491},0).wait(1).to({rotation:-10.9083,x:996.05,y:490.3},0).wait(1).to({rotation:-12.2718,x:997.15,y:489.6},0).wait(1).to({rotation:-13.6354,x:998.25,y:488.75},0).wait(1).to({rotation:-14.9989,x:999.3,y:488},0).wait(62).to({rotation:-13.8451,x:998.4,y:488.65},0).wait(1).to({rotation:-12.6914,x:997.5,y:489.35},0).wait(1).to({rotation:-11.5376,x:996.5,y:489.95},0).wait(1).to({rotation:-10.3839,x:995.6,y:490.6},0).wait(1).to({rotation:-9.2301,x:994.6,y:491.2},0).wait(1).to({rotation:-8.0763,x:993.65,y:491.8},0).wait(1).to({rotation:-6.9226,x:992.65,y:492.35},0).wait(1).to({rotation:-5.7688,x:991.7,y:492.9},0).wait(1).to({rotation:-4.615,x:990.7,y:493.4},0).wait(1).to({rotation:-3.4613,x:989.7,y:493.95},0).wait(1).to({rotation:-2.3075,x:988.65,y:494.4},0).wait(1).to({rotation:-1.1538,x:987.6,y:494.9},0).wait(1).to({rotation:0,x:986.6,y:495.35},0).wait(1118));

	// LLarm
	this.instance_29 = new lib.Symbol3();
	this.instance_29.setTransform(1002.1,540.2,1,1,0,0,0,10,21.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1).to({regX:67.7,x:1059.8},0).wait(28).to({rotation:-4.0907,x:1062.25,y:535.45},0).wait(1).to({rotation:-8.1813,x:1064.35,y:530.75},0).wait(1).to({rotation:-12.272,x:1066.25,y:526.05},0).wait(1).to({rotation:-16.3627,x:1067.8,y:521.55},0).wait(1).to({rotation:-20.4534,x:1069.15,y:517},0).wait(1).to({rotation:-24.544,x:1070.2,y:512.6},0).wait(1).to({rotation:-28.6347,x:1070.9,y:508.3},0).wait(1).to({rotation:-32.7254,x:1071.4,y:504.15},0).wait(1).to({rotation:-36.8161,x:1071.7,y:500.15},0).wait(1).to({rotation:-40.9067,y:496.3},0).wait(1).to({rotation:-44.9974,x:1071.5,y:492.75},0).wait(16).to({rotation:-42.2552,x:1073.4,y:494.75},0).wait(1).to({rotation:-39.513,x:1075.25,y:496.85},0).wait(1).to({rotation:-41.6606,x:1073.85,y:495.2},0).wait(1).to({rotation:-43.8081,x:1072.35,y:493.6},0).wait(1).to({rotation:-45.9557,x:1070.8,y:492.1},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-40.7055,x:1074.45,y:495.9},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-45.9557,x:1070.8,y:492.1},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-40.7055,x:1074.45,y:495.9},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-45.9557,x:1070.8,y:492.1},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-40.7055,x:1074.45,y:495.9},0).wait(27).to({rotation:-37.5743,x:1074.25,y:498.85},0).wait(1).to({rotation:-34.4431,x:1073.9,y:501.95},0).wait(1).to({rotation:-31.3119,x:1073.4,y:505.05},0).wait(1).to({rotation:-28.1807,x:1072.7,y:508.35},0).wait(1).to({rotation:-25.0495,x:1072,y:511.65},0).wait(1).to({rotation:-21.9183,x:1071,y:515.05},0).wait(1).to({rotation:-18.7872,x:1069.95,y:518.5},0).wait(1).to({rotation:-15.656,x:1068.65,y:522.05},0).wait(1).to({rotation:-12.5248,x:1067.2,y:525.6},0).wait(1).to({rotation:-9.3936,x:1065.6,y:529.2},0).wait(1).to({rotation:-6.2624,x:1063.8,y:532.8},0).wait(1).to({rotation:-3.1312,x:1061.9,y:536.5},0).wait(1).to({rotation:0,x:1059.8,y:540.2},0).wait(1118));

	// legs
	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#5F66AF").s().p("ACYEzQgigOgqggQgdgWgtgpQg4g0gRgOQgqgkgigSIhJgjQgrgVgcgaQgcgcgTgoQgUgngEglIAAghQAGgrAfgPIBAg6IAAABQAVgUAcAFQAcAFArAdIBJAxQAiAUApAOQATAGA3ANQAtALAeAMQAqARAiAZQBLA5AmBzQAnB3gwAsQgIALgNAGIg1AtQgZAVgiAEIgQABQgTAAgQgGg");
	this.shape_633.setTransform(958.9191,792.348);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#EBEEF3").s().p("AiOBzQgpgYgMgIQgHgEgNgNIgDgDQgGgXgLgUIALgJIDsisQAvgiA6AJQA6AJAiAvQAiAwgJA5QgJA5gvAiIioB7QhrgxgtgZg");
	this.shape_634.setTransform(955.6942,771.1819);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#5F66AF").s().p("Ap1JEQgugXgfgqQgzhHANhWQAOhXBHg0IQusLQBHg0BXAOQBWANA0BHQAzBHgNBXQgOBWhHA0IwuMMQg3AohGAAQgyAAgsgWg");
	this.shape_635.setTransform(1023.775,724.1348);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#5F66AF").s().p("AMbVBQg3AAgrgjQgsgigMg3IifuxI1drFQhBgogohCQgnhBgGhNIgPmiINUh8IE0h5IBeDIIAaBXQAYBfgCAlQgvAbhZAkQhjApgbAOQg9AfgSAdQgWAkAgArQBaB7FxDSIEHCPQCABGAcAWQA6AuASBHIC4RbQARBSg1BBQg1BChUAAg");
	this.shape_636.setTransform(967.0672,730.85);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#EBEEF3").s().p("AhBDRQgwgigKg6IgijMQBYhIAvgfQAWgRAdgRQALgGAOgEIAEgBQAaAEAUAAQACAHABAHIAwEgQAKA5giAwQgiAwg6AJQgNADgMAAQgqAAglgbg");
	this.shape_637.setTransform(1053.7624,857.1037);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#5F66AF").s().p("ABGEmIhJg2QgtgigfgSQhggrgvgXQhTgpgig1QgXgigIgzQgGgigCg8QgIlKEpDPQBhBECCB+QBEBDBTBXQAvAvAUAjQAeAygJAtQgIAsgpAeQgnAcgvACIgHAAQhLAAhag9g");
	this.shape_638.setTransform(1076.732,895.4789);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#5F66AF").s().p("AIZH4QgygCgrgXIxDoxQhSgqgchYQgchYAqhSQAqhSBYgcQBYgcBSAqIRDIxQBSAqAcBYQAdBYgrBSQgeA7g5AhQg0Adg7AAIgJAAg");
	this.shape_639.setTransform(1024.637,652.3741);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633}]}).wait(1231));

	// chair
	this.instance_30 = new lib.Path_11();
	this.instance_30.setTransform(978.6,660.2,1,1,0,0,0,105.5,60.9);
	this.instance_30.compositeOperation = "multiply";

	this.instance_31 = new lib.Path_1_3();
	this.instance_31.setTransform(928.6,773.2,1,1,0,0,0,186.4,71);
	this.instance_31.compositeOperation = "multiply";

	this.instance_32 = new lib.Path_2_2();
	this.instance_32.setTransform(932,641.75,1,1,0,0,0,199.5,202.6);
	this.instance_32.compositeOperation = "multiply";

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#839DB7").s().p("Ahic3QpAgwmxkEQibhchwhwIgCgCQj9jWilmhQipmqgOnhQBxlDAghTQBnkOBsjMQEvo7GXiwQBshdBoD9QAdBIAvCUQAsCOARAoQCoFnB9DKQC8EuDZC5QCTB5DABHQCZA4DaAmQCAAVEHAkQDtAjCeAtQC4A5BVBnQBKBbACCHQACBrgtCjQgaBehADFQh6DDjECRQjRCakTBTQm9CFm9AAQh+AAh8gLg");
	this.shape_640.setTransform(930.4543,658.4756);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#839DB7").s().p("EgBxAgNQpAgwmxkEQibhchwhwIgCgCQjNitiYk+QiZk/g7l/QhAmWA5mGQA+msDGlaQFQpLDwivQBxhSBwgKQBjgIB0AxQBfApBhBoQA/BECHC0QCiDaBnB8QC3DeDSDLQC4CyEECJQCUBOEcCEQDxB7CTCXQC+DCB3E4QBPDQgRDiQgRDjhwDOQh1DYjMCgQjbCrkoBZQm+CFm9AAQh9AAh8gLg");
	this.shape_641.setTransform(931.9946,637.0711);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_641},{t:this.shape_640},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30}]}).wait(1231));

	// box
	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#DBDCE2").s().p("AtkgJIVSi3IF3CdI0bDkg");
	this.shape_642.setTransform(1356.3,803.6);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#B99763").s().p("AylAKIckk9IInEtI8KE6g");
	this.shape_643.setTransform(1431.4,821.85);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#B99763").s().p("AqWhjIGvjmIN+GiImwDxg");
	this.shape_644.setTransform(1246.05,813.95);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#AD8C5C").s().p("AuSh4Ickk/IAAInI8jFIg");
	this.shape_645.setTransform(1403.85,834.975);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#AB854F").s().p("Am9BPIgCo2IN+GhIABIug");
	this.shape_646.setTransform(1267.65,829.75);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#AB854F").s().p("Am9BPIgCo3IN/GiIAAIvg");
	this.shape_647.setTransform(1450.5,798.125);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#AD8C5C").s().p("A1RgxIclk+IN+GiI8lE9g");
	this.shape_648.setTransform(1359.075,786.075);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#B99763").s().p("AD0DRIt+mhIH9BSIMZFPg");
	this.shape_649.setTransform(1470.85,770.125);

	this.instance_33 = new lib.Path_8_1();
	this.instance_33.setTransform(1362.2,844.75,1,1,0,0,0,155.9,42.1);
	this.instance_33.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_33},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644},{t:this.shape_643},{t:this.shape_642}]},300).wait(931));

	// bottle
	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#0D2D1B").s().p("AhZAZQgmgVAAgeIAAgUQABAeAlAUQAlAWA0AAQA1AAAmgWQAkgTABgfIAAAUQAAAeglAVQgmAWg1AAQg0gBglgVg");
	this.shape_650.setTransform(1155.075,550.9875);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#EECC3D").s().p("AhZCUQgmgVAAgeIAAjBQAAgeAlgWQAlgVA1AAQA0AAAmAWQAkAVACAeIAADBQAAAeglAVQgmAWg1AAQg0AAglgWg");
	this.shape_651.setTransform(1155.075,499.65);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#F2EEEC").s().p("AgmBtQglgVAAgfIAAi7QAAAeAlAVQAvAbBDgHIAAC9QgOABgNAAQgxAAgmgWg");
	this.shape_652.setTransform(1149.925,529.1292);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#F0AB39").s().p("AAABlQgYAAgRgKQgSgKAAgOIAAiFQABgOARgLQARgJAYAAQAZAAARAKQARAJABAPIAACFQAAAOgRAKQgRAKgXAAIgDAAg");
	this.shape_653.setTransform(1155.075,465.85);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#EECC3D").s().p("AgkBzQgPgJAAgMIAAi8QgBgMAQgJQAPgIAVAAQAWAAAPAJQAOAIACAMIAAC8QgBAMgPAJQgPAJgWAAQgUAAgQgJg");
	this.shape_654.setTransform(1155.1,473.275);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#207142").s().p("AhZD2QgmgVAAgfIAAmFQAAgdAlgVQAlgWA1AAQA0ABAmAVQAkAVACAdIAAGFQAAAfglAVQgmAWg1AAQg0gBglgVg");
	this.shape_655.setTransform(1155.075,528.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650}]}).wait(1231));

	// table
	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#50B942").s().p("AgjgDIAogHIAfANIgpAIg");
	this.shape_656.setTransform(1220.6,548.875);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#F72C35").s().p("AgjgDIApgHIAeANIgpAIg");
	this.shape_657.setTransform(1213.6,550.225);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#1D181E").s().p("AkHg8ICwgiIFfCcIixAhg");
	this.shape_658.setTransform(1202.825,543.6);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#443D40").s().p("AkHhFIAAgRIIPB7IAAARIixAhg");
	this.shape_659.setTransform(1202.825,546.175);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#F1B338").s().p("Az9g2IZek7IOdGoI5eE6g");
	this.shape_660.setTransform(1154.95,546.55);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#AD7021").s().p("Az9ipIAAhTMAn7ABtIAABTI5eE5g");
	this.shape_661.setTransform(1154.95,566.425);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f().s("#AD7021").ss(6,1).p("AG3pQIttSh");
	this.shape_662.setTransform(1234.15,617.775);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f().s("#AD7021").ss(6,1).p("AnAv5IOBfz");
	this.shape_663.setTransform(1237.875,617.725);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f().s("#AD7021").ss(6,1).p("AHPpwIudTi");
	this.shape_664.setTransform(1073.4,646.05);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f().s("#AD7021").ss(6,1).p("Am7vuIN3fd");
	this.shape_665.setTransform(1076.675,650.325);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#816052").s().p("AzVhVIYOj7IOdHeI6tDDg");
	this.shape_666.setTransform(1164.55,697.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_666},{t:this.shape_665},{t:this.shape_664},{t:this.shape_663},{t:this.shape_662},{t:this.shape_661},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656}]}).wait(1231));

	// room
	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#23162A").s().p("AkiAiIJFhxIAAAtIpFBxg");
	this.shape_667.setTransform(1528.325,668.4);

	this.instance_34 = new lib.ClipGroup_6();
	this.instance_34.setTransform(1336.7,674.15,1,1,0,0,0,1336.7,649.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_34},{t:this.shape_667}]}).wait(1231));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-757.9,-50.1,3431.4,1947.8999999999999);


// stage content:
(lib._11map = function(mode,startPosition,loop) {
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
		//this.coffee1.stop();
		//this.lock.stop();
		this.aptMan.stop();
		
		var target1 = null;
		var played = {};
		var isplaying = false;
		function animateDone(){
			target1.gotoAndStop(0);
			target1 = null;
			animatemove(_this.done, 1, 0, 0);
		}
		
		function animatemove(target, zoom, pX, pY) {
			if (target != _this.done && played[target]){
				return;
			}
			if (target1 != null && target1.currentFrame != target1.totalFrames) {
				return;
			}
			played[target] = true;
			target1 = target;
			createjs.Tween.get(_this).to({x:pX, y:pY, scaleY:zoom, scaleX:zoom},1500).call(completeF);
		}
		
		function completeF(){
			target1.loop = 0;
			target1.play();
		}
		
		_this.aptMan.on('click', function (e) {
			if ( target1 == _this.aptMan ){
				animateDone()
				return;
			}
			animatemove(_this.aptMan, 30, -40700, -23500);
		});
		
		_this.apt.on('click', function (e) {
			if ( target1 == _this.aptMan ){
				animateDone()
				return;
			}
			animatemove(_this.aptMan, 30, -40700, -23500);
		});
		
		
		
		/*
		_this.coffee1.on('click', function (e) {
			if ( target1 == _this.coffee1 ){
				animateDone()
				return;
			}
			animatemove(_this.coffee1, 14, -17800, -9000);
		});
		
		_this.skyscraper.on('click', function (e) {
			if ( target1 == _this.skyscraper ){
				animateDone()
				return;
			}
			animatemove(_this.skyscraper, 14, -6900, -3500);
		});
		
		_this.restaurant.on('click', function (e) {
			if ( target1 == _this.restaurant ){
				animateDone()
				return;
			}
			animatemove(_this.restaurant, 10, -1300, -3500);
		});
		
		
		_this.lock.on('click', function (e) {
			if ( target1 == _this.lock ){
				animateDone()
				return;
			}
			animatemove(_this.lock, 12, -11200, -10950);
		});
		
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// lock
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("AsDBlIAAjJIYHAAIAADJ");
	this.shape.setTransform(346.025,821.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.004)").s().p("AsDBmIAAjLIYHAAIAADLg");
	this.shape_1.setTransform(346.025,821.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// coffee
	this.instance = new lib.coffee();
	this.instance.setTransform(1746.6,896.35,0.1372,0.1372,0,0,0,0.4,0.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// aptMan
	this.aptMan = new lib.aptMan();
	this.aptMan.name = "aptMan";
	this.aptMan.setTransform(1352.8,780.35,0.0443,0.0443,0,0,0,2.2,1.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("AjejeIG9AAIAAG9Im9AAg");
	this.shape_2.setTransform(1049.625,603.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.aptMan}]}).wait(1));

	// apt
	this.apt = new lib.apt();
	this.apt.name = "apt";
	this.apt.setTransform(1250.6,551.7,0.3931,0.3931,0,0,0,0.1,0.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("AolokIRLAAIAARKIxLAAg");
	this.shape_3.setTransform(1137.5,553.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.apt}]}).wait(1));

	// scene
	this.instance_1 = new lib.map01();
	this.instance_1.setTransform(0,0,0.32,0.32);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1280,720,1280,720);
// library properties:
lib.properties = {
	id: 'E22D5EA26317416D8D80A4DEC59F1E11',
	width: 2560,
	height: 1440,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/A33x.png", id:"A33x"},
		{src:"images/a5.png", id:"a5"},
		{src:"images/Image.png", id:"Image"},
		{src:"images/a0.png", id:"a0"},
		{src:"images/map01.png", id:"map01"},
		{src:"images/A73x.png", id:"A73x"},
		{src:"images/Image_0.png", id:"Image_0"},
		{src:"images/Image_1.png", id:"Image_1"},
		{src:"images/A63x.png", id:"A63x"},
		{src:"images/A13x.png", id:"A13x"},
		{src:"images/a2.png", id:"a2"},
		{src:"images/a4.png", id:"a4"},
		{src:"images/Image_2.png", id:"Image_2"}
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