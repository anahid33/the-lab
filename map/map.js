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



(lib.c1 = function() {
	this.initialize(img.c1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.L2 = function() {
	this.initialize(img.L2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.c3 = function() {
	this.initialize(img.c3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.c4 = function() {
	this.initialize(img.c4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.L1 = function() {
	this.initialize(img.L1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.L4 = function() {
	this.initialize(img.L4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.map01 = function() {
	this.initialize(img.map01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,8000,4500);


(lib.Image_0 = function() {
	this.initialize(img.Image_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,468,1046);


(lib.c2 = function() {
	this.initialize(img.c2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1326,1950);


(lib.Image_1 = function() {
	this.initialize(img.Image_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,113,193);// helper functions:

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


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E4E4E4").s().p("EADGA0oMgjFgKuQhvgjg3hmQg2hmAihwMAaWhWIQAhhvBng3QBmg2BvAiMAjGAKvQBvAiA2BmQA3BngiBuMgaWBWJQgiBvhmA2Qg/AihDAAQgpAAgrgNg");
	this.shape.setTransform(36.2629,-366.8773,1.0746,1.0746);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F4F4F4").s().p("EAC5A27Mgj/gLAQiegxhOiSQhOiSAxifMAakhW3QAwifCThOQCShNCeAwMAj/ALAQCeAxBOCSQBOCSgxCfMgakBW4QgwCeiSBOQhbAwhfAAQg7AAg8gTg");
	this.shape_1.setTransform(36.8721,-366.4514,1.0746,1.0746);

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
	this.shape.graphics.f("rgba(255,255,255,0.898)").s().p("EioiBe0MAAAi9nMFRFAAAMAAAC9ng");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1078.7,-606.8,2157.5,1213.6999999999998);


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


(lib.Group_20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#697CB9").s().p("AgsAaQgTgLAAgPQAAgOATgLQASgLAaAAQAbAAASALQATALAAAOQAAAPgTALQgSALgbAAQgaAAgSgLg");
	this.shape.setTransform(6.4,3.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_20, new cjs.Rectangle(0,0,12.8,7.4), null);


(lib.button = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1).p("EhGSgvbMCMlAAAMAAABe3MiMlAAAg");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6699FF").s().p("EhGSAvcMAAAhe3MCMlAAAMAAABe3g");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-450.8,-304.5,901.7,609.1);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#71667C").s().p("EhUug4TMCpbBP/IACIFMibohMyMAAABajIt1Kyg");
	this.shape.setTransform(542.325,360.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,1084.7,720.9), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#847C8E").s().p("EhN+ALAMAAAhfUMCbmBJeMAAXBfKg");
	this.shape_1.setTransform(499.125,539.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,998.3,1079.3), null);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EFDFD4").s().p("EA5BAdQQmbgKnXg0Q3him39oMQ4FoPy4tsQl5kSkrkUQiViKhKhUIgusyMB77A6gQg6ADhUAAQhNAAhigCg");
	this.shape_2.setTransform(396.625,187.3941);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,793.3,374.8), null);


(lib.Image = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Image_0();
	this.instance.setTransform(0,0,0.2749,0.2749);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Image, new cjs.Rectangle(0,0,128.7,287.6), null);


(lib.Path_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgUAMQgJgFAAgHQABgGAIgFQAJgFALAAQAMAAAJAFQAJAFAAAGQAAAHgJAFQgJAFgMAAQgLAAgJgFg");
	this.shape.setTransform(2.95,1.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

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
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E9ECF2").s().p("AhxffQpAgwmxkEQibhdhwhwIgCgBQjNiuiYk9QiZlAg7l/QhAmVA5mHQA+mrDGlaQCvkyCPi7QCKi2B5hYQiqFYgtGcQgqF6BFGDQBAFvCVEuQCVEuDFCnIACABQBxBwCaBdQHtEoIdBKQJ9BXHekQQEsiqAMlFQAsDHglDMQgmDQh1C4QkDGWoZChQm9CGm+AAQh9AAh8gLg");
	this.shape_1.setTransform(199.4702,202.5522);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_2, new cjs.Rectangle(0,0,399,405.1), null);


(lib.Path_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E9ECF2").s().p("AhPK8QpAgwmxkEQibhdhwhwIgCgBQijiKiEjqQiEjphPkiQBpDSBpCVQCcDgDKCnQIZHBNuBJQKtA5IVkAQC1hXCgh6QA4grCBhyQh5DEjFCRQjRCbkVBTQm9CFm9AAQh9AAh8gKg");
	this.shape.setTransform(186.4,71.0272);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(0,0,372.8,142.1), null);


(lib.Path_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E9ECF2").s().p("AIZEJQpGlAlMB1QjcBOj6g+Qh+gfhRgvQCqAQCzgXQFoguA1jCQA1jCBvhnQA4g0AtgMQgzAhglBBQhLCFBDCpQAjBaB3BIQAxAdDjBnQDSBgCRBfQDXCLCyDBQjii4kkigg");
	this.shape_3.setTransform(105.475,60.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,211,121.8), null);


(lib.Path_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F1DBA2").s().p("A4Wg4MAgugFsIP/HfMgguAFqg");
	this.shape.setTransform(155.9,42.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8, new cjs.Rectangle(0,0,311.8,84.3), null);


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


(lib.Path_21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#6C6F83").s().p("ApgmTITBI9IAABKIwvoPIAAJAIiSBvg");
	this.shape.setTransform(60.925,40.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_21, new cjs.Rectangle(0,0,121.9,80.9), null);


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


(lib.Path_11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI6EKIABo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_11, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIABo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_10, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI5DCIACmnIzdDmIAAhEIVFj7IAAJ9g");
	this.shape.setTransform(67.475,31.875);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9, new cjs.Rectangle(0,0,135,63.8), null);


(lib.Path_8_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#A1B5A3").s().p("AI5EKIACo4IzdDoIAAhFIVFj7IAAMNg");
	this.shape_1.setTransform(67.475,39.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8_1, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI5EKIACo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACGEKIACo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI6EKIABo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("ACHEKIABo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4, new cjs.Rectangle(0,0,48,78.2), null);


(lib.Path_3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI5EKIACo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_1, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_2_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#6C6F83").s().p("AjwmTIHhDkIAABKIlOi1IAAI/IiTBvg");
	this.shape_2.setTransform(24.1,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_3, new cjs.Rectangle(0,0,48.2,80.8), null);


(lib.Path_1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#6C6F83").s().p("ApgmTITBI9IAABLIwvoQIAAJAIiSBvg");
	this.shape_1.setTransform(60.925,40.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_2, new cjs.Rectangle(0,0,121.9,80.8), null);


(lib.Path_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A1B5A3").s().p("AI6EKIABo3IzdDnIAAhFIVFj7IAAMNg");
	this.shape.setTransform(67.475,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0, new cjs.Rectangle(0,0,135,78.2), null);


(lib.Path_42 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A1B5A3").s().p("ACGEKIACo3Il3BHIAAhFIHfhbIAAMNg");
	this.shape_4.setTransform(24,39.075);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_42, new cjs.Rectangle(0,0,48,78.2), null);


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
	this.shape_5.setTransform(28.2463,11.5169,0.445,0.445);

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
	this.shape_25.setTransform(23.0377,5.6445,0.3998,0.3998);

	this.timeline.addTween(cjs.Tween.get(this.shape_25).wait(15).to({scaleX:0.3997,scaleY:0.3997,rotation:-14.9954,x:22.9391,y:5.6095},0).wait(14).to({scaleX:0.3998,scaleY:0.3998,rotation:0,x:23.1361,y:5.6428},0).wait(260));

	// man
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#A6D0ED").s().p("AgEAyIgBgCIgDgIIgThBQgDgIAEgHQAEgHAIgCQAIgDAGAEQAGAEADAIIATBBIABABIgBACIgBABQgLAKgOAGIgCABIgBABIgBAAIgCgBg");
	this.shape_26.setTransform(21.0681,7.1014,0.3981,0.3981);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#F38360").s().p("AAAA6QgTgBgIgYIgMhJIgEgLQgCgFAFgBQAHgBAFADQAFAEABAGIAYBFIAAABIACgDQAEgHACgHIAEgoQAAgHAFgEQAFgEAGABQAHABAEAEQAEAFgBAHIgFAtQgBAJgHAMQgLAVgTAAg");
	this.shape_27.setTransform(22.2427,8.0639,0.3997,0.3997);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#92C0E5").s().p("AgNAyQAHgKABgHQAAgFgFgZQgFgXABgFIAHgPQABgFgFgQQgFgOAGgGQACgDAGgCIAIgCQAGAIAAAIIAHCZIgOAEQgFADgKABQgNgVAKgSg");
	this.shape_28.setTransform(20.7048,8.632,0.3979,0.3979);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#A6D0ED").s().p("AgRBbIgdgRQgIgFAAgGIAEiCQAAgUASgLQAFgDAIAAIAIABQAUADAPAJIADACIAKAHIAFAEQAHAHAAAJIAGCYIgNAFQgHACgJABIgIABQgSAAgRgLg");
	this.shape_29.setTransform(19.2475,8.1329,0.3979,0.3979);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#4672B5").s().p("AAdCNQgEgBgDgCQgDgDgBgEQAJhZgFgZIgRhAIAAAAIgPgNIAGBGIgNBgQABAFgEAEQgDAEgFgBIgGgBQgIAAgBgJIAAhxIgPhaIAAgfIBXgNIATAsIALBtIgLB0QAAAEgDAEQgEADgEAAg");
	this.shape_30.setTransform(19.4848,15.2952,0.3981,0.3981);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#E2E8F1").s().p("AgGAQQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAIAAgbQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAIANAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABIAAAbQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAg");
	this.shape_31.setTransform(20.729,20.819,0.3981,0.3981);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E2E8F1").s().p("AgGAQQgBAAAAAAQgBAAAAAAQAAgBAAAAQgBgBAAAAIABgbQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAIANAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAIAAAbQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAg");
	this.shape_32.setTransform(18.2009,19.8237,0.3981,0.3981);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#4A66AC").s().p("AAFAPIgHgCIgMAAQgEAAgGgCIgFgDQgCgCAAgGQAAgGABgDQACgEADgBQABAAAAAAQAAgBABAAQABAAAAAAQABAAABAAQAIAAANAHIAWAJQAFACACACQADAEgCADQgBACgEABQgFABgGAAIgKgBg");
	this.shape_33.setTransform(21.3867,21.6379,0.3981,0.3981);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#4A66AC").s().p("AgPASQgHgBgDgFIgBgHIABgGQgBgFAJgCIANgDIANgFQAKgDAEADQAHAEgHAJQgEAEgJAFIgPAIQgGAEgDAAg");
	this.shape_34.setTransform(18.7633,20.3137,0.3981,0.3981);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#A6D0ED").s().p("AAEBKIgZgqQgFgJgCgKQgEgNAEgRIAOg0QABgFAGgDQAFgDAEABQAGABADADQADAEgBAEIgNA0QgDANADALIAEAMIAaApQACAEgCAFQgCAFgFACIgEABIgFABQgHAAgDgGg");
	this.shape_35.setTransform(17.8599,7.6482,0.3979,0.3979);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#4A66AC").s().p("AgCARQgBAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAIAAggQAAAAAAAAQAAAAABAAQAAAAAAAAQAAgBABAAIAFAAQABAAAAABQAAAAAAAAQABAAAAAAQAAAAAAAAIAAAgQAAAAAAABQAAAAgBAAQAAAAAAAAQAAAAgBAAg");
	this.shape_36.setTransform(20.501,2.3349,0.3979,0.3979);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#283E91").s().p("AgKAEIAVgJIAAACIgVAJg");
	this.shape_37.setTransform(20.9785,2.5836,0.3979,0.3979);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F38360").s().p("AgCAJQgDgCgCgFQgBgDABgEQACgDADgBQACgBAEACQACADABAEQABADgBAEQgBAEgDAAIgCABQgBAAAAgBQAAAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_38.setTransform(20.1528,3.0014,0.3979,0.3979);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#4A66AC").s().p("AgJAJIgCgYIAXAAIAAAfg");
	this.shape_39.setTransform(19.6952,3.0711,0.3979,0.3979);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#4A66AC").s().p("AAAAoIgGgHQgEgFgDAAIgKgCQgHgBgCgDIgCgFQgFgSgBgHQAAgPAKgLQAKgLAWgBQAXAAAMAKQAGAEgDAHQgBADgCACQgEADgHAEQgHADgDADQgDADgCANQgCANABABQAEAEAHABQAGAAADgDQACAJgBADQgDAGgFADIgGABQgIAAgJgHg");
	this.shape_40.setTransform(19.9495,2.4873,0.3979,0.3979);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F38360").s().p("AACAgIgRgZQgBgBAAAAQAAAAgBAAQAAAAgBAAQgBAAAAABQgBABAAAAQgBABAAAAQAAAAgBgBQAAAAAAAAQAAgDgEgBQgDgCAAgCQAAgBACgDIADgGQACgFAFgEQAGgEAHgBIAQgEIABgFIARAAIAAAxIAAACQgCAJgJAEQgFADgEAAIgIgCg");
	this.shape_41.setTransform(19.9439,2.8429,0.3979,0.3979);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#283E91").s().p("AgGAHQgDgDAAgEQAAgDADgDQADgDADAAQAEAAADADQADADAAADQAAAEgDADQgDADgEAAQgDAAgDgDgAgFgFQgCACAAADQAAAJAHAAQADAAADgDQACgDAAgDQAAgDgCgCQgDgDgDAAQgDAAgCADg");
	this.shape_42.setTransform(21.0828,2.5619,0.3974,0.3974);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F38360").s().p("AgCAVQgGAAgEgCQgEgDAAgDIAGgiIAbAAIgEAiQABAJgNAAIgDgBg");
	this.shape_43.setTransform(19.3644,3.8134,0.3981,0.3981);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#283E91").s().p("AgMAJQgFgDAAgGQAAgFAFgDQAFgEAHAAQAIAAAFAEQAFADAAAFQAAAGgFADQgFAEgIAAQgHAAgFgEg");
	this.shape_44.setTransform(19.1663,4.546,0.3981,0.3981);

	this.instance_3 = new lib.Group_20();
	this.instance_3.setTransform(20.55,21.45,0.4008,0.4008,0,0,0,6.5,3.9);
	this.instance_3.alpha = 0.1797;

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F38360").s().p("AgIANQgEgFgBgHQAAgGAEgGQADgFAGAAQAEgBAFAFQAEAFAAAHQABAGgDAGQgFAFgFAAQgFAAgEgEg");
	this.shape_45.setTransform(23.4151,6.3089,0.3997,0.3997);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#92C0E5").s().p("AgCAcIgPgKQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAgBAAAAIARgoIACgCIACABIAPAKQABABAAAAQAAABAAAAQABABgBAAQAAABAAAAIgRAoIgCABIAAABg");
	this.shape_46.setTransform(23.1709,4.633,0.3997,0.3997);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#314682").s().p("AgDAfIgRgNQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAAAAAIAUgrQAAgBAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAIASANQAAAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAIgTArQAAABAAABQgBAAAAABQgBAAAAAAQAAAAAAAAIgDAAg");
	this.shape_47.setTransform(23.1614,4.6353,0.3997,0.3997);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#283E91").s().p("AgHAfIgNgNQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAIASgsQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAIASANQAAAAABAAQAAAAAAABQAAAAAAAAQAAABgBAAIgTArQgBADgCAAIgCAAIgEAAg");
	this.shape_48.setTransform(23.2567,4.633,0.3997,0.3997);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#F38360").s().p("AgJANQgFgFAAgIQAAgHAFgFQAEgFAFAAQAGAAAFAFQAEAFAAAHQAAAIgEAFQgFAFgGAAQgFAAgEgFg");
	this.shape_49.setTransform(22.5672,5.3124,0.3997,0.3997);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F38360").s().p("AgFgbIAJgQQAEgFAGgBQAGgCAGAEQAFADABAGQACAHgEAFIgKAPQgNAVgIAMQgOARgQALg");
	this.shape_50.setTransform(21.6155,7.28,0.3997,0.3997);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AAAAMIgGgFIgBgBIAHgQIAAgBIABABIAGAEIABACIgHAPIgBABg");
	this.shape_51.setTransform(23.2833,4.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50,p:{scaleX:0.3997,scaleY:0.3997,x:21.6155,y:7.28}},{t:this.shape_49,p:{scaleX:0.3997,scaleY:0.3997,x:22.5672,y:5.3124}},{t:this.shape_48,p:{scaleX:0.3997,scaleY:0.3997,x:23.2567,y:4.633}},{t:this.shape_47,p:{scaleX:0.3997,scaleY:0.3997,x:23.1614,y:4.6353}},{t:this.shape_46},{t:this.shape_45,p:{scaleX:0.3997,scaleY:0.3997,x:23.4151,y:6.3089}},{t:this.instance_3},{t:this.shape_44,p:{scaleX:0.3981,scaleY:0.3981,x:19.1663,y:4.546}},{t:this.shape_43,p:{scaleX:0.3981,scaleY:0.3981,x:19.3644,y:3.8134}},{t:this.shape_42,p:{scaleX:0.3974,scaleY:0.3974,x:21.0828,y:2.5619}},{t:this.shape_41,p:{scaleX:0.3979,scaleY:0.3979,x:19.9439,y:2.8429}},{t:this.shape_40,p:{scaleX:0.3979,scaleY:0.3979,x:19.9495,y:2.4873}},{t:this.shape_39,p:{scaleX:0.3979,scaleY:0.3979,x:19.6952,y:3.0711}},{t:this.shape_38,p:{scaleX:0.3979,scaleY:0.3979,x:20.1528,y:3.0014}},{t:this.shape_37,p:{scaleX:0.3979,scaleY:0.3979,x:20.9785,y:2.5836}},{t:this.shape_36,p:{scaleX:0.3979,scaleY:0.3979,x:20.501,y:2.3349}},{t:this.shape_35,p:{scaleX:0.3979,scaleY:0.3979,x:17.8599,y:7.6482}},{t:this.shape_34,p:{scaleX:0.3981,scaleY:0.3981,x:18.7633,y:20.3137}},{t:this.shape_33,p:{scaleX:0.3981,scaleY:0.3981,x:21.3867,y:21.6379}},{t:this.shape_32,p:{scaleX:0.3981,scaleY:0.3981,x:18.2009,y:19.8237}},{t:this.shape_31,p:{scaleX:0.3981,scaleY:0.3981,x:20.729,y:20.819}},{t:this.shape_30,p:{scaleX:0.3981,scaleY:0.3981,x:19.4848,y:15.2952}},{t:this.shape_29,p:{scaleX:0.3979,scaleY:0.3979,x:19.2475,y:8.1329}},{t:this.shape_28,p:{scaleX:0.3979,scaleY:0.3979,x:20.7048,y:8.632}},{t:this.shape_27,p:{scaleX:0.3997,scaleY:0.3997,x:22.2427,y:8.0639}},{t:this.shape_26,p:{scaleX:0.3981,scaleY:0.3981,x:21.0681,y:7.1014}}]}).to({state:[{t:this.shape_50,p:{scaleX:0.4004,scaleY:0.4004,x:21.6888,y:7.3697}},{t:this.shape_49,p:{scaleX:0.4004,scaleY:0.4004,x:22.6407,y:5.3967}},{t:this.shape_48,p:{scaleX:0.4004,scaleY:0.4004,x:23.3314,y:4.716}},{t:this.shape_47,p:{scaleX:0.4004,scaleY:0.4004,x:23.236,y:4.7183}},{t:this.shape_51},{t:this.shape_45,p:{scaleX:0.4004,scaleY:0.4004,x:23.4917,y:6.3968}},{t:this.instance_3},{t:this.shape_44,p:{scaleX:0.3998,scaleY:0.3998,x:19.324,y:4.7402}},{t:this.shape_43,p:{scaleX:0.3998,scaleY:0.3998,x:19.5229,y:4.0045}},{t:this.shape_42,p:{scaleX:0.3996,scaleY:0.3996,x:21.2964,y:2.8012}},{t:this.shape_41,p:{scaleX:0.3997,scaleY:0.3997,x:20.1164,y:3.0432}},{t:this.shape_40,p:{scaleX:0.3997,scaleY:0.3997,x:20.122,y:2.6861}},{t:this.shape_39,p:{scaleX:0.3997,scaleY:0.3997,x:19.8666,y:3.2725}},{t:this.shape_38,p:{scaleX:0.3997,scaleY:0.3997,x:20.3263,y:3.2025}},{t:this.shape_37,p:{scaleX:0.3997,scaleY:0.3997,x:21.1558,y:2.7828}},{t:this.shape_36,p:{scaleX:0.3997,scaleY:0.3997,x:20.6761,y:2.5329}},{t:this.shape_35,p:{scaleX:0.3997,scaleY:0.3997,x:18.0228,y:7.8707}},{t:this.shape_34,p:{scaleX:0.3998,scaleY:0.3998,x:18.9191,y:20.5756}},{t:this.shape_33,p:{scaleX:0.3998,scaleY:0.3998,x:21.5538,y:21.9055}},{t:this.shape_32,p:{scaleX:0.3998,scaleY:0.3998,x:18.3544,y:20.0836}},{t:this.shape_31,p:{scaleX:0.3998,scaleY:0.3998,x:20.8933,y:21.0831}},{t:this.shape_30,p:{scaleX:0.3998,scaleY:0.3998,x:19.6438,y:15.5355}},{t:this.shape_29,p:{scaleX:0.3997,scaleY:0.3997,x:19.4169,y:8.3576}},{t:this.shape_28,p:{scaleX:0.3997,scaleY:0.3997,x:20.8808,y:8.859}},{t:this.shape_27,p:{scaleX:0.4004,scaleY:0.4004,x:22.3171,y:8.1551}},{t:this.shape_26,p:{scaleX:0.3998,scaleY:0.3998,x:21.2339,y:7.3065}}]},29).wait(260));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.1,-15.4,81.89999999999999,54.199999999999996);


(lib.coffee1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_423 = function() {
		var _this = this;
		
		_this.button.on('click', function(evt){
			evt.preventDefault();
			evt.stopImmediatePropagation();
			evt.stopPropagation();
			window.open('http://www.compucom.com', '_blank');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(423).call(this.frame_423).wait(2));

	// coffee_b_ai
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AlpIWIAAwYIB+AAIAACEQAkhIBDgnQBCgoBYAAQBlABBOAyQBMAyAqBaQArBbAAB3QAAB3grBZQgqBYhMAxQhMAwhnAAQhYAAhCgnQhDgngkhIIAAGngAiuleQg8BMgBCLQABCKA8BNQA9BMBwAAQBuAAA9hLQA+hLAAiKQAAiKg+hNQg9hPhuAAQhwAAg9BMg");
	this.shape.setTransform(1372.15,687.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ai/FdQhSgxgshaQguhaAAh4QAAh2AuhaQAshbBSgwQBTgxBsAAQBsAABTAxQBUAwAsBbQAtBaAAB2QAAB4gtBaQgsBahUAxQhTAwhsAAQhsAAhTgwgAisjWQg+BMAACKQAACOA9BLQA8BLBxAAQBxAAA8hKQA8hKAAiQQAAiKg8hMQg+hNhvAAQhvAAg9BNg");
	this.shape_1.setTransform(1280.575,673.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ADLIqIAAnZQgBhqgpgwQgqgyhbAAQhpAAg/BBQg+A/gBBvIAAG2Ih+AAIAAxTIB+AAIAAHRQAnhFBDgkQBDgkBUAAQEUAAAAEuIAAHhg");
	this.shape_2.setTransform(1192.55,657.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AkvErIAqhfQA9AxBAAWQBAAUBPAAQBVAAAtgdQAsgdAAg2QAAgugegaQgdgbhFgQIiAgeQhigWgzg0Qg0g2AAhOQAAhmBPg/QBRg/CEAAQBQAABJAaQBIAaAxAwIgrBdQhphah+AAQhOAAguAfQgsAfAAA3QAAAtAcAcQAaAbA+AOICBAgQBsAZAzAyQA0AzAABSQAABlhRA7QhRA7iLAAQjBAAhxhig");
	this.shape_3.setTransform(1109.875,673.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AjvEkQhnhpAAi5QAAh1AuhaQAthbBTgyQBSgyBoAAQCZAABWBkQBWBjAACuIAAAvIouAAQAGCFBCBFQBCBEB4AAQCGAABwhbIAqBcQgzAwhOAbQhPAbhRAAQizAAhmhpgADog5QgDh0g3g+Qg3g+hjAAQhkAAg8A/Qg9A/gLByIG8AAIAAAAg");
	this.shape_4.setTransform(990.675,673.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AjvEkQhnhpAAi5QAAh1AuhaQAthbBTgyQBSgyBoAAQCZAABWBkQBWBjAACuIAAAvIouAAQAGCFBCBFQBCBEB4AAQCGAABwhbIAqBcQgzAwhOAbQhPAbhRAAQizAAhmhpgADog5QgDh0g3g+Qg3g+hjAAQhkAAg8A/Qg9A/gLByIG8AAIAAAAg");
	this.shape_5.setTransform(907.875,673.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Ah0IsIAAqXIiWAAIAAhlICWAAIAAgZQAAiYBMhPQBMhPCegJIA/gDIAKBjIhJAFQhgAGgsAwQgsAwAABjIAAAqIDZAAIAABlIjZAAIAAKXg");
	this.shape_6.setTransform(842.575,657.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ah0IsIAAqXIiWAAIAAhlICWAAIAAgZQAAiYBMhPQBMhPCegJIA/gDIAKBjIhJAFQhgAGgsAwQgsAwAABjIAAAqIDZAAIAABlIjZAAIAAKXg");
	this.shape_7.setTransform(791.075,657.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("Ai/FdQhSgxgshaQguhaAAh4QAAh2AuhaQAshbBSgwQBTgxBsAAQBsAABTAxQBUAwAsBbQAtBaAAB2QAAB4gtBaQgsBahUAxQhTAwhsAAQhsAAhTgwgAisjWQg+BMAACKQAACOA9BLQA8BLBxAAQBxAAA8hKQA8hKAAiQQAAiKg8hMQg+hNhvAAQhvAAg9BNg");
	this.shape_8.setTransform(719.775,673.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AiVFdQhSgxgthYQgthZAAh4QAAh2AvhaQAuhbBUgyQBUgyBwAAQBNAABKAbQBJAcAuAtIgqBfQhthZhvAAQh1AAhCBOQhCBNAACKQAACLBCBLQBCBLB1AAQBvAABthYIAqBfQgxAuhKAaQhJAahPAAQhwAAhUgwg");
	this.shape_9.setTransform(640.425,673.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8E6F45").s().p("EgnrAfGMgAKhipMBPoAlMMAADBh7g");
	this.shape_10.setTransform(235.2533,653.5039,0.9865,0.9865);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#B4946D").s().p("Eh5KgEbMCizgcUMBPiAlSMiiyAcNg");
	this.shape_11.setTransform(748.7658,254.941,0.9865,0.9865);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#A98B67").s().p("EhRWgiyMCitgcRMAAABhqMiiqAceg");
	this.shape_12.setTransform(1000.1457,681.8652,0.9865,0.9865);

	this.button = new lib.button();
	this.button.name = "button";
	this.button.setTransform(1080.55,772.75,0.3046,0.1448);
	new cjs.ButtonHelper(this.button, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.button}]},423).wait(2));

	// frame
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("rgba(0,0,0,0)").ss(0.1,1,1).p("AkMiWIIZAAIAAEtIoZAAg");
	this.shape_13.setTransform(10.6,5.175);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(233,232,233,0)").s().p("AkMCXIAAktIIYAAIAAEtg");
	this.shape_14.setTransform(10.6,5.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14,p:{scaleX:1,scaleY:1,x:10.6,y:5.175}},{t:this.shape_13,p:{scaleX:1,scaleY:1,x:10.6,y:5.175}}]}).to({state:[{t:this.shape_14,p:{scaleX:26.7867,scaleY:26.7867,x:1055.5467,y:649.1537}},{t:this.shape_13,p:{scaleX:26.7867,scaleY:26.7867,x:1055.5467,y:649.1537}}]},60).to({state:[]},299).wait(66));

	// iphone_4
	this.instance = new lib.c4();
	this.instance.setTransform(812,304,0.3453,0.3453);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(344).to({_off:false},0).to({_off:true},75).wait(6));

	// iphone_3
	this.instance_1 = new lib.c3();
	this.instance_1.setTransform(812,304,0.3454,0.3454);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(269).to({_off:false},0).to({_off:true},150).wait(6));

	// iphone_2
	this.instance_2 = new lib.c2();
	this.instance_2.setTransform(812,304,0.3454,0.3454);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(194).to({_off:false},0).to({_off:true},225).wait(6));

	// iphone_1
	this.instance_3 = new lib.c1();
	this.instance_3.setTransform(812,304,0.3454,0.3454);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(119).to({_off:false},0).to({_off:true},300).wait(6));

	// arm
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F38360").s().p("AiSC+IBEkiQALguAogZQAngZAvALQAuALAZAoQAZAogLAuIg4Dug");
	this.shape_15.setTransform(1053.4724,775.0702,12.8886,12.8886);
	this.shape_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(119).to({_off:false},0).to({_off:true},300).wait(6));

	// whiteframe
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#333333").ss(0.1,1,1).p("AkcikII5AAIAAFJIo5AAg");
	this.shape_16.setTransform(1066.3516,648.0536,25.8885,25.8885);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(255,255,255,0.698)").s().p("AkcClIAAlJII5AAIAAFJg");
	this.shape_17.setTransform(1066.3516,648.0536,25.8885,25.8885);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_17},{t:this.shape_16}]},119).to({state:[]},300).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.2,-10.9,1821.1000000000001,1091);


(lib.ClipGroup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EhN+AK+MAAAhfOMCbuBJJMAAOBfYg");
	mask.setTransform(1059.4,556.95);

	// Layer_3
	this.instance = new lib.Path_2();
	this.instance.setTransform(932.6,192.7,1,1,0,0,0,396.6,187.4);
	this.instance.compositeOperation = "multiply";

	this.instance_1 = new lib.Image();
	this.instance_1.setTransform(704.55,288.65,1,1,0,0,0,64.3,143.8);
	this.instance_1.compositeOperation = "multiply";

	this.instance_2 = new lib.Image_1();
	this.instance_2.setTransform(802.4,60.35,1.2219,1.2219);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F1B338").s().p("EgwTgCDMA9pgL6MAi+AQDMg9oAL4g");
	this.shape.setTransform(1359.75,889.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EBC879").s().p("EhBRgCxMBTTgQGMAvQAVsMhTTAQDg");
	this.shape_1.setTransform(1359.775,889.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EBD8A2").s().p("EhXegDtMBvogVlMA/VAdEMhvoAVhg");
	this.shape_2.setTransform(1383.875,889.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#23162A").s().p("EhXdgDtIgDhFMBvsgUgMA/VAdEMhvpAVhg");
	this.shape_3.setTransform(1383.725,896.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1B338").s().p("At2glIRrjbIKCEmIxrDag");
	this.shape_4.setTransform(1541.175,603);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EBC879").s().p("AxrgvIWjkXIM0F3I2jEWg");
	this.shape_5.setTransform(1541.15,602.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#23162A").s().p("AonjmIgCgtIRTH6IAAAtg");
	this.shape_6.setTransform(1443.85,624.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#7F453B").s().p("AlGAWIJHhoIBGAzIqNBxg");
	this.shape_7.setTransform(1525.775,537.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#7F453B").s().p("AgiK7IAA2nIBFAAIAAXZg");
	this.shape_8.setTransform(1554.95,459.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A66857").s().p("AlGq6IKNhzIAAXoIqNBzg");
	this.shape_9.setTransform(1525.775,464.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#7F453B").s().p("AlGAVIJHhmIBGAxIqNBzg");
	this.shape_10.setTransform(1447.625,552.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#7F453B").s().p("AgiK7IAA2nIBFAAIAAXZg");
	this.shape_11.setTransform(1476.8,474.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#A66857").s().p("AlGq6IKNhzIAAXoIqNBzg");
	this.shape_12.setTransform(1447.625,479.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EBD8A2").s().p("A32hAIebl5IRSH7I+bF4g");
	this.shape_13.setTransform(1541.15,603);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C38A74").s().p("A0h8RMApDgHPMAAAA/yMgpDAHPg");
	this.shape_14.setTransform(1517.9,360.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#957561").s().p("EjQ2gI4MEKhgzfMCXMBFYMkKiAzXg");
	this.shape_15.setTransform(1336.725,912.575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#CFB18B").s().p("EhXTA5UMAAAhynMCunAAAMAAAByng");
	this.shape_16.setTransform(1102.475,366.775);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(560.4,17.6,998.1,1078.7), null);


(lib.aptMan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_15
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#201619").s().p("AgIBoQgRgRAAgfIAAhgIgkAAIAAgZIAkAAIAAg4IAeAAIAAA4IA0AAIAAAZIg0AAIAABeQAAArAoAAIARgBIgCAYIgTABQgiAAgPgRg");
	this.shape.setTransform(1600.675,802.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#201619").s().p("AgtBUQgVgMgKgVQgLgWAAgdQAAgbALgWQALgWAUgMQAUgMAZAAQAaAAAUAMQAUAMAKAWQAMAVAAAcQAAAdgMAWQgJAVgVAMQgUAMgaAAQgZAAgUgMgAgpgzQgPASABAhQgBAjAPARQAPATAaAAQAaAAAPgSQAPgTAAgiQAAgggPgTQgPgSgaAAQgaAAgPASg");
	this.shape_1.setTransform(1583.8,805.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#201619").s().p("AhWCBIAAj8IAeAAIAAAgQAIgRARgKQARgKATAAQAZAAASANQATAMAKAVQAKAWAAAdQAAAdgKAVQgKAUgTAMQgSAMgZAAQgUAAgQgJQgRgKgIgRIAABmgAgphUQgPATAAAiQAAAfAPAUQAPASAaAAQAaAAAPgSQAPgTAAggQAAghgPgTQgPgTgaAAQgaABgPARg");
	this.shape_2.setTransform(1562.825,808.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#201619").s().p("Ag5BHQgZgaAAgsQAAgbALgXQALgVAUgMQATgNAZAAQAmAAAUAYQAVAYAAAqIAAALIiGAAQACAgAPAQQARARAcAAQAgAAAbgWIAKAWQgMALgTAHQgSAHgVAAQgqAAgZgZgAghg4QgOAPgDAcIBqAAQgBgcgNgPQgNgPgYAAQgXAAgPAPg");
	this.shape_3.setTransform(1541.325,805.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#201619").s().p("AhvCFIAAkJIBaAAQA/AAAjAjQAjAiAAA/QAABBgjAhQgiAjhAAAgAhQBrIA5AAQBnAAAAhrQAAhqhnAAIg5AAg");
	this.shape_4.setTransform(1517.825,801.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#201619").s().p("Ag5BHQgZgaAAgsQAAgbALgXQAMgWATgLQATgNAZAAQAmAAAUAYQAVAYAAAqIAAALIiGAAQACAgAPAQQARARAbAAQAiAAAZgWIALAWQgMALgTAHQgSAHgVAAQgqAAgZgZgAghg4QgOAPgDAcIBqAAQgBgcgNgPQgNgPgYAAQgXAAgPAPg");
	this.shape_5.setTransform(1483.675,805.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#201619").s().p("AgjBUQgUgLgLgWQgKgVAAgdQgBgcALgWQALgVAVgMQAUgNAbAAQARAAATAHQARAGAMAMIgKAWQgbgVgbAAQgbAAgQATQgQATAAAgQAAAhAQASQAQATAbAAQAbAAAbgWIAKAXQgOAMgQAFQgSAHgSAAQgbAAgUgMg");
	this.shape_6.setTransform(1465.05,805.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#201619").s().p("AA5CGIAAifIhRAAIAACfIgfAAIAAifIgkAAIAAgZIAkAAIAAgFQAAgkATgVQASgSAmgCIAOgBIACAYIgSABQgWABgKAMQgKAMAAAXIAAAKIBwAAIAAC4gAA2hfIAAgjIAmAAIAAAjg");
	this.shape_7.setTransform(1443.85,801.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#201619").s().p("AgbCGIAAifIgkAAIAAgZIAkAAIAAgFQAAgmASgSQARgSAngDIAPgBIACAYIgRABQgXABgLAMQgLAMAAAXIAAAKIA1AAIAAAZIg1AAIAACfg");
	this.shape_8.setTransform(1428.675,801.15);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#201619").s().p("AhAB4QgbgQgPgfQgPggAAgoQAAgpAPggQAPgfAbgQQAcgRAkAAQAlAAAcARQAbAQAPAfQAOAgAAAoQAAAqgPAfQgOAegbARQgcARglAAQglAAgbgRgAhBhQQgYAcAAA0QAAA0AYAeQAXAcAqAAQAqAAAYgcQAXgeAAg0QAAgzgXgeQgXgcgrAAQgqAAgXAdg");
	this.shape_9.setTransform(1407.55,801.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},690).wait(366));

	// Layer_14
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#201619").s().p("AhMBpIAKgXQAUANAPAFQARAFASAAQAbAAANgOQAOgOAAgcIAAggQgIASgRAJQgRAKgUAAQgYAAgTgMQgTgLgLgVQgKgUAAgbQAAgbAKgVQALgVATgLQATgMAYAAQATAAASAKQAQAJAIASIAAggIAfAAIAACrQAAApgVAVQgVAVgqAAQgwAAgggZgAgphVQgPARAAAfQAAAfAPARQAQARAaAAQAaAAAPgRQAPgRAAgfQAAgfgPgRQgPgSgaAAQgaAAgQASg");
	this.shape_10.setTransform(1139.075,808.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#201619").s().p("AAwBeIAAhwQABgagKgMQgLgMgWAAQgYAAgPAQQgPAQAAAaIAABoIgeAAIAAi3IAdAAIAAAeQAKgQAQgKQARgIATgBQBCAAAABJIAABzg");
	this.shape_11.setTransform(1117.85,805.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#201619").s().p("AgOCEIAAi4IAdAAIAAC4gAgRhhIAAgiIAkAAIAAAig");
	this.shape_12.setTransform(1102.65,801.35);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#201619").s().p("AgvB7QgSgMgLgWQgKgXAAgcQAAgbAKgWQALgWASgLQATgMAXAAQAUAAARAKQAQAKAIARIAAhzIAfAAIAAEKIgfAAIAAghQgIARgQAJQgQAKgVAAQgXAAgTgMgAgogMQgPARAAAhQAAAiAPATQAPATAZAAQAbAAAPgTQAOgSAAgiQAAgigOgRQgOgSgcAAQgZAAgPASg");
	this.shape_13.setTransform(1086.725,801.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#201619").s().p("AgzBeIAAi3IAeAAIAAAgQAQggAsgEIALgBIACAbIgUACQgcADgMAPQgMAOAAAYIAABng");
	this.shape_14.setTransform(1071.325,805.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#201619").s().p("AgqBZQgPgIgJgMQgJgNAAgQQAAgVALgLQALgKAYgGQAXgFAsAAIAIAAIAAgMQAAgXgJgLQgKgKgWAAQgeAAggATIgKgWQAPgKAUgGQAWgHAQAAQAjAAARASQARASABAlIAABzIgeAAIAAgfQgHAQgPAJQgPAJgSAAQgSAAgPgHgAgLAJQgRADgIAGQgHAHAAANQAAAPALAJQALAKAQAAQAWAAAOgQQAPgPAAgYIAAgLIgHAAQghAAgRADg");
	this.shape_15.setTransform(1052.95,805.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#201619").s().p("AgtBUQgVgMgKgVQgLgXAAgcQAAgaALgXQALgWAUgMQAUgMAZAAQAaAAAUAMQAUAMALAWQALAVAAAcQAAAdgLAWQgKAVgVAMQgUAMgaAAQgZAAgUgMgAgpgzQgPASAAAhQAAAiAPASQAPATAaAAQAbAAAPgSQAOgTAAgiQAAghgPgSQgOgSgbAAQgaAAgPASg");
	this.shape_16.setTransform(1032.725,805.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#201619").s().p("AgfB9QgRgJgIgRIAAAhIgeAAIAAkKIAeAAIAABzQAIgRARgKQAQgKAUAAQAZAAASAMQATALAKAWQAKAVAAAcQAAAdgKAWQgKAWgTAMQgSAMgZAAQgVAAgPgKgAgpgMQgPASAAAhQAAAhAPATQAPATAaAAQAaAAAPgTQAPgTAAgiQAAghgPgRQgOgSgbAAQgaAAgPASg");
	this.shape_17.setTransform(1011.775,801.325);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#201619").s().p("AAxBeIAAhwQAAgZgKgNQgKgMgWAAQgYAAgPAQQgQARAAAZIAABoIgeAAIAAi3IAeAAIAAAeQAIgQARgKQARgIAUgBQBBAAAABJIAABzg");
	this.shape_18.setTransform(989.5,805.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#201619").s().p("Ag/B4QgcgRgPgeQgPgfAAgpQAAgqAPgfQAPgfAcgQQAbgRAkAAQAmAAAbARQAcAQAOAfQAOAeAAAqQAAApgOAgQgQAfgbAQQgbARglAAQgjAAgcgRgAhBhQQgYAdAAAzQAAA0AYAeQAYAcApAAQArAAAXgcQAYgdAAg1QAAgzgYgeQgWgcgsAAQgpAAgYAdg");
	this.shape_19.setTransform(964.25,801.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},690).wait(366));

	// Layer_13
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#201619").s().p("AgIBoQgRgRAAgfIAAhgIgkAAIAAgYIAkAAIAAg4IAeAAIAAA4IA0AAIAAAYIg0AAIAABdQAAAsAoAAIARgBIgCAYIgTACQgigBgPgRg");
	this.shape_20.setTransform(705.025,848.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#201619").s().p("AAxBfIAAhyQgBgagJgLQgKgLgXAAQgYAAgPAPQgPAQAAAaIAABpIgeAAIAAi4IAeAAIAAAfQAJgSAQgIQAQgKAUABQBCgBAABKIAABzg");
	this.shape_21.setTransform(687.9,850.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#201619").s().p("Ag5BHQgZgaAAgsQAAgcALgWQAMgWATgLQATgNAZAAQAlAAAVAYQAVAYAAAqIAAALIiGAAQABAfAQARQAQARAcAAQAhAAAagWIALAWQgNAMgSAGQgTAHgUAAQgqAAgZgZgAghg4QgPAQgCAbIBqAAQgBgcgNgPQgOgPgXAAQgXAAgPAPg");
	this.shape_22.setTransform(667.175,850.625);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#201619").s().p("ABnBfIAAhyQAAgZgJgMQgJgLgUAAQgXAAgNAPQgNAPAAAbIAABpIgeAAIAAhyQAAgZgJgMQgJgLgUAAQgXAAgNAPQgNAPAAAbIAABpIgfAAIAAi4IAeAAIAAAeQAJgSAOgHQAPgKATABQArAAANAkQAHgQARgKQARgLAUABQA9gBAABKIAABzg");
	this.shape_23.setTransform(641.075,850.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#201619").s().p("Ag5BHQgYgZgBgtQABgcAKgWQALgVAUgMQAUgNAZAAQAkAAAVAYQAUAZABApIAAALIiGAAQABAgARAQQAPARAdAAQAgAAAagWIAKAWQgMALgSAHQgTAHgUAAQgqAAgZgZgAghg4QgPAPgCAcIBqAAQAAgbgOgQQgNgPgYAAQgYAAgOAPg");
	this.shape_24.setTransform(615,850.625);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#201619").s().p("AhNBpIALgXQATANAPAFQASAFASAAQAbAAANgOQANgOAAgcIAAggQgHARgQAKQgSAKgVAAQgYAAgTgMQgRgLgMgVQgKgUAAgbQAAgbAKgVQAMgVARgLQATgMAYAAQAVAAARAKQARAKAHARIAAggIAfAAIAACrQAAApgVAVQgWAVgpAAQgwAAghgZgAgphVQgPARAAAfQAAAfAPARQAPARAbAAQAaAAAPgRQAPgRAAgfQABgfgPgRQgQgSgaAAQgbAAgPASg");
	this.shape_25.setTransform(593.35,854.025);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#201619").s().p("AgqBZQgQgIgHgMQgKgNABgQQAAgUAKgMQAMgLAXgFQAXgFArAAIAIAAIAAgMQAAgYgJgKQgJgKgVAAQgfAAgfATIgLgWQAPgKAUgGQAWgHAQAAQAjAAASASQARASAAAlIAABzIgfAAIAAgfQgGAQgPAJQgPAJgSAAQgRAAgQgHgAgLAJQgRADgIAGQgHAHAAANQAAAPALAJQALAKAQAAQAWAAAOgQQAOgOAAgZIAAgLIgGAAQghAAgRADg");
	this.shape_26.setTransform(572.5,850.625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#201619").s().p("AAxBfIAAhyQAAgZgKgMQgKgLgWAAQgZAAgPAPQgOAQAAAaIAABpIggAAIAAi4IAfAAIAAAfQAJgSAQgIQARgKATABQBCgBABBKIAABzg");
	this.shape_27.setTransform(552.05,850.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#201619").s().p("AgqBZQgPgIgJgMQgJgNAAgQQABgVAKgLQALgKAYgGQAXgFAsAAIAIAAIAAgMQAAgXgJgLQgKgKgWAAQgeAAggATIgJgWQAOgKAUgGQAWgHAQAAQAjAAARASQARASABAlIAABzIgeAAIAAgfQgHAQgPAJQgPAJgSAAQgRAAgQgHgAgLAJQgRADgIAGQgHAHAAANQAAAPALAJQALAKAQAAQAWAAAOgQQAPgPAAgYIAAgLIgHAAQghAAgRADg");
	this.shape_28.setTransform(530.95,850.625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#201619").s().p("ABhCGIABjOIhWCjIgWAAIhWiiIAADNIgdAAIAAkLIAZAAIBlDBIBkjBIAZAAIAAELg");
	this.shape_29.setTransform(505.3,846.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#201619").s().p("Ag5BHQgZgZAAgtQAAgcALgWQAMgWATgLQATgNAZAAQAlAAAVAYQAVAYAAAqIAAALIiGAAQABAfAQARQAQARAcAAQAhAAAagWIALAWQgNAMgSAGQgTAHgUAAQgpAAgagZgAghg4QgPAQgCAbIBqAAQgBgcgNgPQgOgPgXAAQgXAAgPAPg");
	this.shape_30.setTransform(717.175,805.225);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#201619").s().p("AgjBUQgUgMgLgVQgLgXAAgbQAAgcAMgWQALgVAUgMQAUgNAbAAQASAAASAHQARAGAMAMIgLAWQgagVgbAAQgbAAgQATQgQATAAAgQAAAhAQASQAQATAbAAQAaAAAbgWIALAXQgNALgRAGQgRAHgUAAQgaAAgUgMg");
	this.shape_31.setTransform(698.525,805.225);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#201619").s().p("AgOCEIAAi4IAdAAIAAC4gAgShhIAAgiIAkAAIAAAig");
	this.shape_32.setTransform(684.65,801.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#201619").s().p("AgOBcIhPi3IAhAAIA9CVIA+iVIAfAAIhQC3g");
	this.shape_33.setTransform(670.55,805.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#201619").s().p("Ag5BHQgZgZAAgtQAAgcAMgWQAJgVAVgMQAUgNAYAAQAlAAAVAYQAUAYABAqIAAALIiGAAQABAfARARQAQARAcAAQAgAAAagWIAKAWQgMAMgSAGQgSAHgVAAQgqAAgZgZgAghg4QgPAQgCAbIBqAAQAAgbgOgQQgOgPgXAAQgYAAgOAPg");
	this.shape_34.setTransform(651.1,805.225);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#201619").s().p("AhvCFIAAkJIBaAAQA+AAAkAjQAjAiAAA/QAABBgjAhQgjAjg/AAgAhQBrIA5AAQBnAAAAhrQAAhqhnAAIg5AAg");
	this.shape_35.setTransform(627.625,801.2);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#201619").s().p("AAxBeIAAhwQAAgZgKgNQgKgMgWAAQgZAAgPAQQgPAQAAAaIAABoIgeAAIAAi3IAeAAIAAAeQAJgQAQgKQAQgIAUgBQBCAAAABJIAABzg");
	this.shape_36.setTransform(592.675,805.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#201619").s().p("AgzBeIAAi3IAeAAIAAAgQAQgfAsgFIALgBIACAbIgUACQgcADgMAPQgMAOAAAYIAABng");
	this.shape_37.setTransform(576.575,805.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#201619").s().p("Ag5BHQgYgZAAgtQAAgcALgWQAKgVAUgMQAUgNAYAAQAlAAAVAYQAVAYAAAqIAAALIiGAAQACAfAQARQAQARAcAAQAgAAAagWIALAWQgNAMgTAGQgRAHgVAAQgqAAgZgZgAghg4QgPAQgCAbIBqAAQgBgbgNgQQgNgPgYAAQgXAAgPAPg");
	this.shape_38.setTransform(558.6,805.225);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#201619").s().p("AgvB7QgTgNgKgVQgKgWAAgdQAAgcAKgVQAKgVATgMQATgMAYAAQAUAAAQAKQAQAJAJASIAAhzIAeAAIAAEKIgeAAIAAghQgJASgQAIQgPAKgVAAQgYAAgTgMgAgogMQgPARAAAhQAAAiAPATQAPATAaAAQAaAAAPgTQAPgTAAghQAAghgPgSQgPgSgaAAQgaAAgPASg");
	this.shape_39.setTransform(537.025,801.325);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#201619").s().p("AgtBUQgVgMgKgVQgLgXAAgcQAAgaALgXQALgWAUgMQAUgMAZAAQAaAAAUAMQAUAMALAWQALAVAAAcQAAAdgLAWQgKAVgVAMQgUAMgaAAQgZAAgUgMgAgpgzQgPASAAAhQAAAiAPASQAPATAaAAQAbAAAPgSQAOgTAAgiQAAghgPgSQgOgSgbAAQgaAAgPASg");
	this.shape_40.setTransform(516.075,805.225);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#201619").s().p("ABhCFIABjNIhWCjIgWAAIhWihIAADLIgdAAIAAkJIAaAAIBkDAIBkjAIAZAAIAAEJg");
	this.shape_41.setTransform(489.65,801.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},690).wait(366));

	// learn_more
	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#201619").s().p("AhsCDQgvgvAAhTQAAgzAUgpQAVgpAmgWQAlgWAvgBQBFAAAnAtQAoAtAABPIAAAWIjwAAQAIBsBiABQA7AAAwgnIAVAyQgYAVgiALQgjALgkABQhSgBgvgugAg3hjQgYAagFAvICzAAQgCgwgWgZQgWgZgogBQgnABgZAZg");
	this.shape_42.setTransform(1210.45,305.9);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#201619").s().p("AhnCvIAAlUIBFAAIAAA7QAag7BUgIIAXgBIAFA8IgrAEQgyAFgWAZQgVAbgBAoIAAC8g");
	this.shape_43.setTransform(1182.3,305.65);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#201619").s().p("AhYCcQgmgWgUgoQgVgpAAg1QAAg0AVgoQAUgpAmgVQAngXAxAAQAyAAAmAXQAmAVAWApQAUAoAAA0QAAA1gUApQgWAogmAWQglAWgzAAQgyAAgmgWgAhHhZQgZAhABA4QAAA9AYAeQAZAfAuAAQAvAAAYgfQAZgeABg9QgBg4gZghQgZgeguAAQgtAAgaAeg");
	this.shape_44.setTransform(1147.25,305.9);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#201619").s().p("ACrD3IABlkIiTEVIgwAAIiUkSIABFhIhBAAIAAntIA6AAICyFVICylVIA5AAIAAHtg");
	this.shape_45.setTransform(1098.075,298.475);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#201619").s().p("ABTCvIAAjPQAAgsgSgUQgRgUgkgBQgpAAgbAbQgaAbAAAsIAADCIhGAAIAAlUIBFAAIAAA2QARgfAegPQAegRAlAAQB6AAAACKIAADTg");
	this.shape_46.setTransform(1030.075,305.65);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#201619").s().p("AhnCvIAAlUIBFAAIAAA7QAbg7BTgIIAXgBIAFA8IgrAEQgyAFgVAZQgWAaAAApIAAC8g");
	this.shape_47.setTransform(999.5,305.65);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#201619").s().p("AhUCkQgcgNgQgZQgQgYAAgfQAAglATgVQAUgUAsgKQAvgJBKAAIAQAAIAAgUQAAgngQgSQgRgRglAAQg5AAg6AkIgVgzQAbgSAngLQAngNAjAAQBEAAAiAjQAhAiAABHIAADRIhEAAIAAg4QgNAegbAQQgaAQgiAAQghAAgcgOgAgTASQgdAFgNALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAYgaAAgpIAAgTIgMAAQg0AAgfAFg");
	this.shape_48.setTransform(964.975,305.9);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#201619").s().p("AhsCDQgvgvAAhTQAAg1AUgnQAVgpAmgWQAlgWAugBQBGAAAnAtQAoAtAABPIAAAWIjxAAQAIBsBjABQA7AAAwgnIAVAyQgZAVghALQgjALglABQhRgBgvgugAg3hjQgXAZgGAwICzAAQgCgwgWgZQgWgZgogBQgoABgYAZg");
	this.shape_49.setTransform(928.3,305.9);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#201619").s().p("AibD3IAAntIBIAAIAAGxIDvAAIAAA8g");
	this.shape_50.setTransform(892.925,298.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},690).wait(366));

	// Layer_12
	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgpD3IAAhUIBTAAIAABUgAgUBsIgXliIBXAAIgXFig");
	this.shape_51.setTransform(1677.775,995.475);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("ABHD3IihihIAAChIhGAAIAAntIBGAAIAAExICWiYIBXAAIihCjICvCxg");
	this.shape_52.setTransform(1654.3,995.475);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg8BTgHIAXgBIAFA8IgqADQgzAGgVAaQgWAYAAApIAAC9g");
	this.shape_53.setTransform(1622.95,1002.65);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AhYCcQgngXgTgnQgVgnAAg3QAAg2AVgnQATgoAngWQAmgVAyAAQAyAAAnAVQAmAWAUAoQAVAoAAA1QAAA2gVAoQgUAngmAXQgnAVgyAAQgyAAgmgVgAhGhZQgaAgAAA5QAAA7AZAfQAZAgAuAAQAvAAAZggQAZgfAAg7QAAg5gaggQgYgfgvAAQgtAAgZAfg");
	this.shape_54.setTransform(1587.95,1002.9);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhaD0Ig/AAIiDlVIBJAAIBdEAIBdkAIA2AAIBeEBIBckBIBGAAIiDFVg");
	this.shape_55.setTransform(1539,1003.075);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AhXCcQgmgWgWgoQgUgoAAg2QAAg0AUgpQAWgpAmgVQAlgVAyAAQAzAAAlAVQAmAVAVApQAVApAAA0QAAA2gVAoQgVAogmAWQgmAVgyAAQgxAAgmgVgAhGhZQgZAgAAA5QgBA8AZAeQAaAgAtAAQAuAAAZggQAZgeAAg8QAAg5gZggQgZgfguAAQgtAAgZAfg");
	this.shape_56.setTransform(1471.1,1002.9);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgTDAQghghABg9IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_57.setTransform(1438.95,998.175);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AheDqIA7iHIiPlLIBKAAIBpEEIBskEIBGAAIjKHSg");
	this.shape_58.setTransform(1390,1009.4);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgpAAg0QAAg1ATgoQATgnAigWQAigWAuAAQAlAAAdARQAdAQAQAeIAAjOIBGAAIAAHsIhGAAIAAg7QgQAggdAQQgdAQglAAQgtAAgigWgAhFgRQgaAeAAA6QAAA5AaAhQAaAgAsAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgtAAgZAfg");
	this.shape_59.setTransform(1350.075,995.725);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AhUCkQgcgOgQgZQgQgZAAgdQAAgmATgUQATgVAtgJQAsgJBNAAIARAAIAAgVQAAgmgRgSQgRgRglAAQg4AAg7AjIgVgyQAdgTAlgLQAogLAiAAQBEAAAiAhQAhAjAABGIAADTIhEAAIAAg6QgOAfgZAPQgbAQgiAAQghABgcgOgAgUARQgdAGgNALQgMAMAAAWQAAAYASAQQASARAcAAQAlAAAZgbQAYgbABgoIAAgSIgOAAQg2AAgdAEg");
	this.shape_60.setTransform(1311.15,1002.9);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAVgpQAUgpAmgWQAlgWAvAAQBFAAAoAsQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgmIAVAxQgWAUgkANQgjAMglgBQhQAAgwgugAg3hjQgYAZgFAwICzAAQgCgwgWgZQgWgagoAAQgoAAgYAag");
	this.shape_61.setTransform(1274.475,1002.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg8BTgHIAXgBIAFA8IgrADQgzAGgUAaQgXAZAAAoIAAC9g");
	this.shape_62.setTransform(1246.3,1002.65);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgpAAg0QAAg1ATgoQATgnAigWQAigWAuAAQAlAAAdARQAdAQAQAeIAAjOIBGAAIAAHsIhGAAIAAg7QgQAggdAQQgdAQglAAQgtAAgigWgAhFgRQgaAeAAA6QAAA5AaAhQAaAgAsAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgtAAgZAfg");
	this.shape_63.setTransform(1190.825,995.725);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("ABSCvIAAjPQAAgtgRgTQgRgVgkABQgrAAgZAaQgaAaAAAtIAADCIhGAAIAAlVIBFAAIAAA3QARgfAegQQAegQAlAAQB6AAAACKIAADTg");
	this.shape_64.setTransform(1151.075,1002.65);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AhUCkQgdgPgPgYQgQgYAAgeQAAglATgVQAUgVAsgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgRgRglAAQg5AAg6AjIgVgyQAcgTAmgLQAogLAiAAQBFAAAhAhQAhAjAABGIAADTIhEAAIAAg6QgNAfgaAPQgbAQgiAAQgiABgbgOgAgTARQgdAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAmAAAYgbQAYgaAAgpIAAgSIgMAAQg3AAgcAEg");
	this.shape_65.setTransform(1111.575,1002.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AhdDjQgigXgUgoQgTgpAAg0QAAg1ATgoQATgoAjgVQAhgWAuAAQAlAAAdARQAeAQAPAeIAAjOIBHAAIAAHsIhHAAIAAg7QgQAfgdARQgdAQglAAQgtAAgigWgAhGgRQgZAeAAA6QAAA4AaAiQAbAgArAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgtAAgaAfg");
	this.shape_66.setTransform(1053.2,995.725);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAWgpAlgWQAlgWAuAAQBFAAAoAsQAoAsAABQIAAAWIjwAAQAHBsBkAAQA6AAAwgmIAVAxQgXAUgjANQgjAMgkgBQhRAAgwgugAg3hjQgYAagEAvICyAAQgCgwgWgZQgWgagoAAQgnAAgZAag");
	this.shape_67.setTransform(1015.05,1002.9);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgMAAgVQAAgSgNgKQgLgLgfgHIg4gMQgtgLgXgXQgXgXAAglQAAgtAlgeQAmgcA7AAQAkAAAiALQAhALAXAWIgVAxQgygng3AAQgfAAgSAMQgTAMAAAWQAAATAMAJQALAMAZAFIA5ANQAyALAXAXQAXAXAAAmQAAAvglAaQgmAbg/AAQhYAAg1grg");
	this.shape_68.setTransform(979.525,1002.9);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgMAAgVQAAgSgNgKQgLgLgfgHIg4gMQgtgLgXgXQgXgXAAglQAAgtAlgeQAmgcA7AAQAkAAAiALQAhALAXAWIgVAxQgygng3AAQgfAAgSAMQgTAMAAAWQAAASAMAKQALAMAZAFIA6ANQAxALAXAXQAXAXAAAmQAAAvglAaQglAbhAAAQhYAAg1grg");
	this.shape_69.setTransform(945.775,1002.9);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg0AUgoQAWgpAlgWQAlgWAuAAQBFAAAoAsQAoAsAABQIAAAWIjwAAQAHBsBkAAQA5AAAxgmIAWAxQgYAUgkANQgiAMgkgBQhRAAgwgugAg3hjQgYAZgEAwICyAAQgCgvgWgaQgWgagoAAQgnAAgZAag");
	this.shape_70.setTransform(910.55,1002.9);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg8BTgHIAXgBIAFA8IgqADQgzAGgVAaQgWAZAAAoIAAC9g");
	this.shape_71.setTransform(882.35,1002.65);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgpAAg0QAAg1ATgoQATgnAjgWQAhgWAuAAQAlAAAdARQAdAQAQAeIAAjOIBGAAIAAHsIhGAAIAAg7QgPAfgdARQgeAQglAAQgtAAgigWgAhFgRQgaAeAAA6QAAA5AaAhQAaAgAsAAQAvAAAYgfQAZgfAAg7QAAg7gZgeQgYgfgvAAQgtAAgZAfg");
	this.shape_72.setTransform(845.375,995.725);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AiMCGIAWgzQA1AoBFAAQAhAAAUgLQARgMABgVQgBgSgLgKQgMgLgfgHIg3gMQgugLgXgXQgYgYAAgkQAAgtAmgeQAmgcA7AAQAkAAAhALQAhALAYAWIgWAxQgygng2AAQgfAAgSAMQgTAMAAAWQAAASALAKQAMAMAZAFIA6ANQAxAMAYAWQAWAYAAAlQAAAvglAaQglAbhAAAQhYAAg2grg");
	this.shape_73.setTransform(790.25,1002.9);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBRAAIAABJg");
	this.shape_74.setTransform(765.025,995.425);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AinDuIAAnTIBHAAIAAA4QAQgeAdgSQAdgQAmAAQAsAAAiAXQAjAWATApQAUAoAAA1QAAA0gTAnQgTAogjAWQgjAWgsAAQgmAAgdgQQgdgRgQgfIAAC5gAhHiVQgZAgAAA6QAAA5AZAgQAZAfAuAAQAtAAAZgfQAZgeAAg6QAAg6gZggQgaghgsAAQguAAgZAgg");
	this.shape_75.setTransform(718.375,1008.95);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AhXCcQgmgWgWgoQgUgoAAg2QAAg0AUgpQAWgpAmgVQAlgVAyAAQAzAAAmAVQAlAVAVApQAVApAAA0QAAA2gVAoQgVAoglAWQgnAVgyAAQgxAAgmgVgAhGhZQgaAgAAA5QAAA7AaAfQAZAgAtAAQAvAAAZggQAYgeAAg8QABg7gZgeQgagfguAAQgtAAgZAfg");
	this.shape_76.setTransform(676.95,1002.9);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgTDAQgggggBg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgDA2QgSADgTAAQhCAAggghg");
	this.shape_77.setTransform(644.85,998.175);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AinDuIAAnTIBHAAIAAA4QAQgfAdgRQAegQAkAAQAtAAAiAXQAjAWATApQATApAAA0QAAA2gTAlQgTAogiAWQgjAWgtAAQgkAAgegQQgdgRgQgfIAAC5gAhHiVQgZAgAAA6QAAA5AZAgQAZAfAuAAQAtAAAZgfQAZgeAAg6QABg6gaggQgaghgsAAQguAAgZAgg");
	this.shape_78.setTransform(612.95,1008.95);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AhUCkQgdgOgPgZQgQgYAAgeQAAglATgVQAUgVAsgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgRgRglAAQg5AAg6AjIgVgyQAcgTAmgLQAogLAiAAQBFAAAhAhQAhAjAABGIAADTIhEAAIAAg6QgNAfgaAPQgbAQgiAAQgiABgbgOgAgTARQgdAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAmAAAYgbQAYgaAAgpIAAgSIgMAAQg3AAgcAEg");
	this.shape_79.setTransform(572.025,1002.9);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_80.setTransform(545.325,995.475);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgMAAgVQAAgSgNgKQgLgLgfgHIg4gMQgtgLgXgXQgXgXAAglQAAgtAlgeQAmgcA7AAQAkAAAiALQAhALAXAWIgVAxQgygng3AAQgfAAgSAMQgTAMAAAWQAAASAMAKQALAMAZAFIA6ANQAxALAXAXQAXAXAAAmQAAAvglAaQglAbhAAAQhYAAg1grg");
	this.shape_81.setTransform(501.425,1002.9);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgnitIAAhJIBQAAIAABJg");
	this.shape_82.setTransform(476.2,995.425);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("ACKD3IAAjeIkTAAIAADeIhHAAIAAntIBHAAIAADWIETAAIAAjWIBHAAIAAHtg");
	this.shape_83.setTransform(441.075,995.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51}]},299).wait(757));

	// Layer_11
	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgoAAg1QAAg2ATgnQATgoAigVQAigWAtAAQAmAAAdARQAdAQAPAeIAAjOIBHAAIAAHsIhGAAIAAg7QgQAfgdARQgdAQgmAAQgsAAgigWgAhGgRQgZAeAAA6QAAA4AaAhQAaAhAsAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgsAAgbAfg");
	this.shape_84.setTransform(1472.725,1035.475);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAVgpAmgWQAlgWAvgBQBFAAAnAtQAoAtAABPIAAAWIjxAAQAIBsBkAAQA6AAAwgnIAVAyQgYAVgiALQgjAMgkABQhRgBgwgugAg3hjQgYAagFAvICzAAQgBgwgXgZQgWgagoAAQgoAAgYAag");
	this.shape_85.setTransform(1434.55,1042.65);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgfCqIiUlUIBLAAIBpEEIBrkEIBHAAIiUFUg");
	this.shape_86.setTransform(1398.35,1042.85);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBRAAIAABJg");
	this.shape_87.setTransform(1371.625,1035.175);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBFAAIAAA7QAag9BUgGIAXgBIAFA7IgrAFQgzAFgVAZQgVAagBAoIAAC9g");
	this.shape_88.setTransform(1352.85,1042.4);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBFAAIAAA7QAbg9BTgGIAXgBIAFA7IgqAFQgzAFgVAZQgWAZAAApIAAC9g");
	this.shape_89.setTransform(1327.2,1042.4);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AhUCjQgdgNgPgYQgQgZAAgeQAAgmATgVQAUgUAsgJQAtgJBMAAIAQAAIAAgUQAAgogQgRQgQgRgmAAQg5gBg6AkIgVgyQAcgTAmgLQAmgMAkAAQBEABAiAhQAhAjAABGIAADSIhEAAIAAg4QgNAdgbAQQgaAQgiABQgggBgdgOgAgTARQgdAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAYgbAAgpIAAgSIgMAAQg3AAgcAEg");
	this.shape_90.setTransform(1292.675,1042.65);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1ApBFAAQAiAAASgMQASgMAAgUQAAgTgMgKQgMgLgegHIg4gNQgugKgWgXQgYgYAAgkQAAguAmgdQAlgdA8AAQAmAAAgAMQAgALAYAVIgVAyQgzgog2AAQggAAgRANQgTANAAAVQAAASAMALQALAKAZAGIA5ANQAxALAYAXQAXAXAAAmQAAAvglAbQgmAbg/AAQhYAAg1gsg");
	this.shape_91.setTransform(1239.025,1042.65);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AhVCjQgcgNgPgYQgQgZAAgeQAAglAUgWQASgUAtgJQAtgJBMAAIAQAAIAAgUQAAgogQgRQgQgRgmAAQg4gBg7AkIgVgyQAdgTAmgLQAkgMAlAAQBFABAgAhQAiAjAABGIAADSIhEAAIAAg4QgNAegaAPQgbAQgiABQgggBgegOgAgUARQgcAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAZgbgBgpIAAgSIgMAAQg2AAgeAEg");
	this.shape_92.setTransform(1203,1042.65);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("ABSD3IAAjRQAAgrgRgUQgRgUgkAAQgrAAgZAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQASgdAdgQQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_93.setTransform(1164.725,1035.225);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg0AVgoQAUgpAmgWQAlgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgnIAVAyQgXAVgjALQgjAMglABQhQgBgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_94.setTransform(1107.525,1042.65);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AhODkQgogKgfgWIAWg0QAgAWAhAKQAeAJAkAAQBfAAAAhhIAAg2QgOAfgeAQQgfASgmAAQgtAAgjgVQgkgVgSgnQgUgmAAgyQAAgyAUgnQAUgmAigVQAjgWAtAAQAmAAAeARQAfASAOAeIAAg4IBGAAIAAE5QAABOgqAoQgqAohRABQgqgBgogMgAhGiZQgaAfAAA0QAAA1AaAeQAbAeAsAAQAuAAAageQAagdAAg2QAAg0gagfQgZgegvAAQgsAAgbAeg");
	this.shape_95.setTransform(1067.125,1048.95);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AhUCjQgdgNgPgYQgQgZAAgeQAAglATgWQAUgUAsgJQAtgJBMAAIAQAAIAAgUQAAgogQgRQgQgRgmAAQg5gBg6AkIgVgyQAcgTAmgLQAmgMAkAAQBEABAiAhQAhAjAABGIAADSIhEAAIAAg4QgNAdgbAQQgaAQgiABQgggBgdgOgAgTARQgdAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAYgbAAgpIAAgSIgMAAQg3AAgcAEg");
	this.shape_96.setTransform(1028.075,1042.65);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("ABHD3IihihIAAChIhGAAIAAntIBGAAIAAExICViYIBYAAIihCjICvCxg");
	this.shape_97.setTransform(994.9,1035.225);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AhDCbQgngWgUgmQgVgnABg3QAAg0AUgoQAXgpAmgWQAmgWAzgBQAkAAAiANQAfAKAXAVIgWAzQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAfQAcAfAwAAQAxABAvgmIAWAzQgXAVgiAKQghAMgkABQgzAAgmgXg");
	this.shape_98.setTransform(957.8,1042.65);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AhVCjQgcgNgQgYQgPgZAAgeQAAglATgWQATgUAtgJQAtgJBMAAIAQAAIAAgUQAAgogRgRQgPgRgmAAQg5gBg6AkIgVgyQAcgTAmgLQAmgMAkAAQBFABAgAhQAiAkAABFIAADSIhEAAIAAg4QgNAegaAPQgbAQgiABQghgBgdgOgAgUARQgdAGgMALQgNAMAAAWQAAAYASAQQARARAcAAQAnAAAXgaQAZgbAAgpIAAgSIgMAAQg3AAgdAEg");
	this.shape_99.setTransform(920.85,1042.65);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AinDuIAAnSIBHAAIAAA3QAPgdAegSQAegRAlAAQAsAAAjAWQAjAWASApQAUApAAA1QAAA0gTAnQgTAogjAWQgjAWgsAAQglAAgegRQgegQgPgfIAAC5gAhHiVQgZAfAAA7QAAA6AZAfQAZAfAuAAQAuAAAYgfQAageAAg6QAAg6gaggQgZgggtgBQguABgZAfg");
	this.shape_100.setTransform(882.925,1048.7);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1ApBFAAQAiAAASgMQASgMAAgUQAAgTgMgKQgMgLgegHIg4gNQgugKgWgXQgYgYAAgkQAAguAmgdQAlgdA8AAQAmAAAgAMQAgALAYAVIgVAyQgzgog2AAQgfAAgTANQgSANAAAVQAAASALALQAMAKAZAGIA5ANQAxALAYAXQAXAXAAAmQAAAvglAbQgmAbg/AAQhZAAg0gsg");
	this.shape_101.setTransform(825.825,1042.65);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBRAAIAABJg");
	this.shape_102.setTransform(800.575,1035.175);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgSgVQgRgUgkAAQgqAAgaAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQASgdAdgQQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_103.setTransform(772.025,1035.225);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgTDAQggghgBg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQABBLBFAAQARAAAOgCIgDA2QgSADgSAAQhDAAggghg");
	this.shape_104.setTransform(720.9,1037.925);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AhVCjQgbgNgQgYQgQgZAAgeQAAglAUgWQASgUAtgJQAsgJBNAAIARAAIAAgUQgBgogQgRQgQgRgmAAQg4gBg7AkIgVgyQAdgTAlgLQAlgMAlAAQBEABAiAhQAhAjAABGIAADSIhEAAIAAg4QgNAegaAPQgbAQgiABQgggBgegOgAgUARQgcAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAZgbAAgpIAAgSIgNAAQg3AAgdAEg");
	this.shape_105.setTransform(689.35,1042.65);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("ABSD3IAAjRQAAgrgRgUQgRgUgkAAQgrAAgZAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQASgdAdgQQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_106.setTransform(651.075,1035.225);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgTDAQggghAAg9IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgDA2QgTADgSAAQhDAAgfghg");
	this.shape_107.setTransform(618.45,1037.925);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgqgRgWQgRgTglAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QARgfAegQQAegQAlAAQB6AAAACKIAADTg");
	this.shape_108.setTransform(1466.225,958.4);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AhYCcQgmgXgUgoQgVgnAAg2QAAg1AVgoQAUgoAmgWQAmgWAyAAQAyAAAmAWQAmAVAWApQAUApAAA0QAAA1gUAoQgWApgmAWQgmAWgygBQgxABgngWgAhHhZQgZAgAAA5QAAA7AZAgQAZAeAuAAQAvAAAZgeQAZgfAAg8QAAg6gagfQgZgfguAAQgtAAgaAfg");
	this.shape_109.setTransform(1426.25,958.65);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBQAAIAABJg");
	this.shape_110.setTransform(1398.05,951.175);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgTDAQghghAAg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_111.setTransform(1377.2,953.925);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AhUCkQgdgOgPgYQgQgZAAgeQAAglATgWQAUgUAsgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgQgSgmAAQg5AAg6AkIgVgxQAcgUAmgLQAmgMAkAAQBEAAAiAjQAhAiAABGIAADTIhEAAIAAg5QgNAdgbARQgaAPgiAAQggAAgdgNgAgTASQgdAFgNALQgNAMAAAVQAAAZASARQASAQAcAAQAlAAAZgaQAYgaAAgqIAAgSIgMAAQg3AAgcAFg");
	this.shape_112.setTransform(1345.625,958.65);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AhDCcQgmgWgVgoQgVgoAAg0QAAg1AWgoQAVgpAngWQAngXAzAAQAjAAAhAMQAhALAWAWIgWAyQgugmgyAAQgwAAgcAgQgbAgAAA5QAAA5AbAgQAbAeAxAAQAyAAAuglIAWAzQgXAVghAKQgiAMgkAAQgzABgmgWg");
	this.shape_113.setTransform(1311.325,958.65);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("ABnD4IAAkeIiRAAIAAEeIhHAAIAAkeIhCAAIAAg3IBCAAIAAgGQAAhGAkglQAlgkBJgEIAcgBIAEA1IghACQgoADgRATQgRAUAAAnIAAASIDYAAIAAFVgABhirIAAhLIBTAAIAABLg");
	this.shape_114.setTransform(1271.275,951.125);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgnitIAAhJIBQAAIAABJg");
	this.shape_115.setTransform(1244.35,951.175);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgTDAQghggABg+IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgSADgSAAQhDAAgfghg");
	this.shape_116.setTransform(1223.5,953.925);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AhXCcQgmgWgWgpQgUgoAAg1QAAg0AUgpQAWgpAmgVQAlgWAyAAQAzAAAlAWQAmAVAWApQAUApAAA0QAAA1gUAoQgWApgmAWQgmAWgygBQgxABgmgWgAhGhZQgZAgAAA5QAAA7AZAgQAYAeAuAAQAvAAAZgeQAZgfgBg8QAAg6gZgfQgZgfguAAQgtAAgZAfg");
	this.shape_117.setTransform(1191.55,958.65);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgSgVQgQgTglAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QARgfAegQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_118.setTransform(1151.725,958.4);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AhUCkQgdgOgPgYQgQgZAAgeQAAgmATgVQAUgUAsgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgQgSgmAAQg5AAg6AkIgVgxQAcgUAmgLQAmgMAkAAQBEAAAiAjQAhAiAABGIAADTIhEAAIAAg5QgNAdgbARQgaAPgiAAQggAAgdgNgAgTASQgdAFgNALQgNAMAAAVQAAAaASAQQASAQAcAAQAlAAAZgaQAYgaAAgqIAAgSIgMAAQg3AAgcAFg");
	this.shape_119.setTransform(1093.775,958.65);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQASgMAAgUQAAgTgMgLQgMgKgegHIg4gMQgugLgWgXQgYgXAAglQAAguAmgdQAlgcA8gBQAmAAAgAMQAgALAYAWIgVAxQgzgng2gBQggAAgRANQgTANAAAVQAAASAMAKQALALAZAGIA5AOQAxAKAYAXQAXAXAAAmQAAAuglAbQgmAbg/AAQhYAAg1grg");
	this.shape_120.setTransform(1040.125,958.65);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_121.setTransform(1004.875,958.65);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AggCrIiSlVIBJAAIBqEEIBskEIBHAAIiVFVg");
	this.shape_122.setTransform(968.65,958.85);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_123.setTransform(932.425,958.65);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgnitIAAhJIBQAAIAABJg");
	this.shape_124.setTransform(905.4,951.175);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AhDCcQgmgWgVgoQgVgnAAg1QAAg1AWgoQAUgoAogXQAngXAzAAQAjAAAiAMQAgALAWAWIgWAyQgugmgyAAQgwAAgbAgQgcAgAAA5QAAA5AbAgQAbAeAxAAQAyAAAuglIAWAzQgXAVghAKQgiAMgkAAQgzABgmgWg");
	this.shape_125.setTransform(880.825,958.65);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg1AUgnQAVgpAlgWQAmgXAvAAQBEAAAoAtQAoAtAABPIAAAVIjwAAQAHBtBkAAQA6AAAvgmIAXAxQgZAVgjALQgiAMglAAQhQABgwgwgAg2hjQgZAZgFAwICzAAQgCgvgWgaQgVgagpAAQgnAAgYAag");
	this.shape_126.setTransform(844.65,958.65);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg9BTgFIAXgCIAFA7IgqAFQgzAFgVAZQgWAbAAAnIAAC9g");
	this.shape_127.setTransform(816.45,958.4);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg9BTgFIAXgCIAFA7IgqAFQgzAFgVAZQgWAbAAAnIAAC9g");
	this.shape_128.setTransform(772.35,958.4);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg1AVgnQAUgpAlgWQAmgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjxAAQAIBtBjAAQA7AAAvgmIAWAxQgYAVgiALQgjAMglAAQhQABgwgwgAg2hjQgZAZgFAwICzAAQgCgvgWgaQgVgagpAAQgoAAgXAag");
	this.shape_129.setTransform(738.6,958.65);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgTDAQggghgBg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQASAAANgCIgDA2QgSADgTAAQhCAAggghg");
	this.shape_130.setTransform(707.65,953.925);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAVgpAmgWQAlgXAuAAQBFAAAoAtQAoAtAABPIAAAVIjwAAQAIBtBiAAQA7AAAwgmIAVAxQgYAVgiALQgjAMgkAAQhRABgwgwgAg3hjQgYAagFAvICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_131.setTransform(677.2,958.65);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("Ai4D3IAAntIDMAAQBOAAArAnQAsAmAABHQAABGgsAmQgrAnhOAAIiEAAIAADGgAhwgIIB8AAQBnAAAAhaQAAhahnAAIh8AAg");
	this.shape_132.setTransform(638.425,951.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84}]},299).wait(757));

	// Layer_10
	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AiMCGIAXgzQA0ApBFAAQAhAAATgMQATgMgBgUQABgTgMgKQgOgLgdgHIg4gNQgtgKgYgXQgXgXABglQgBguAmgdQAlgdA9AAQAlAAAfAMQAhALAZAVIgXAyQgxgog2AAQggAAgTANQgSAMAAAWQAAASALALQANAKAYAGIA6ANQAxALAXAXQAXAXAAAmQAAAvglAbQglAbhBAAQhXAAg2gsg");
	this.shape_133.setTransform(1567.7,1042.65);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AiMCGIAXgzQA0ApBFAAQAiAAASgMQATgMgBgUQABgTgMgKQgOgLgdgHIg3gNQgugKgYgXQgXgYABgkQgBguAmgdQAlgdA9AAQAmAAAeAMQAhALAZAVIgXAyQgxgog2AAQggAAgTANQgSANAAAVQAAASALALQANAKAYAGIA6ANQAxALAXAXQAXAYAAAlQAAAvglAbQgmAbg/AAQhYAAg2gsg");
	this.shape_134.setTransform(1533.95,1042.65);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AhYCbQgmgVgVgpQgUgnAAg2QAAg0AUgpQAWgoAlgWQAmgVAygBQAyABAmAVQAmAWAWAoQAUApAAA0QAAA2gUAnQgWApgmAVQgmAXgyAAQgxAAgngXgAhHhZQgYAgAAA5QgBA8AZAeQAZAfAuABQAugBAagfQAZgegBg8QAAg5gZggQgZgfguAAQgtAAgaAfg");
	this.shape_135.setTransform(1497.45,1042.65);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgzDpQgdgRgQgfIAAA7IhHAAIAAnsIBHAAIAADQQAPgfAegRQAdgRAmAAQAtAAAiAWQAiAVATAoQAUAnAAA2QAAA1gUAoQgTAogiAXQgjAWgsAAQgmAAgdgQgAhHgRQgZAfAAA6QAAA6AZAgQAZAfAuAAQAsAAAaggQAaggAAg6QAAg5gZgfQgagfgtAAQguAAgZAfg");
	this.shape_136.setTransform(1458,1035.475);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhZD0IhBAAIiClVIBKAAIBcEAIBdkAIA2AAIBeEBIBckBIBGAAIiDFVg");
	this.shape_137.setTransform(1388.175,1042.825);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAWgpAlgWQAlgWAvgBQBGAAAmAtQAoAtAABPIAAAWIjxAAQAJBsBiAAQA7AAAwgnIAVAyQgWAUgkAMQgjAMgkABQhQgBgxgugAg3hjQgYAagFAvICzAAQgBgwgXgZQgWgagoAAQgoAAgYAag");
	this.shape_138.setTransform(1340.5,1042.65);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("ABTCvIAAjPQAAgsgSgVQgQgTglgBQgqAAgaAbQgaAbAAAsIAADCIhGAAIAAlUIBFAAIAAA2QASggAdgPQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_139.setTransform(1301.875,1042.4);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AiMCGIAXgzQA0ApBFAAQAiAAATgMQARgMABgUQAAgTgNgKQgMgLgegHIg4gNQgtgKgXgXQgYgXAAglQAAguAmgdQAlgdA9AAQAlAAAfAMQAhALAZAVIgXAyQgygog1AAQggAAgSANQgTAMAAAWQAAASALALQALAKAaAGIA6ANQAwALAYAXQAXAXAAAmQAAAvglAbQglAbhAAAQhYAAg2gsg");
	this.shape_140.setTransform(1246.2,1042.65);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgnitIAAhJIBQAAIAABJg");
	this.shape_141.setTransform(1220.95,1035.175);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("ABSD3IAAjRQAAgrgRgUQgRgUgkAAQgrAAgYAbQgaAZAAAtIAADDIhHAAIAAntIBHAAIAADMQARgeAegPQAcgPAlAAQB6AAAACJIAADUg");
	this.shape_142.setTransform(1192.4,1035.225);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AC3CvIAAjRQgBgrgPgUQgOgUgiAAQgnAAgWAbQgWAbgBAtIAADBIhFAAIAAjRQAAgqgPgVQgQgUghAAQgoAAgVAbQgXAbAAAtIAADBIhHAAIAAlUIBGAAIAAAzQAQgcAbgQQAbgQAkAAQBNAAAYBBQAQgeAegRQAdgSAoAAQByAAABCKIAADTg");
	this.shape_143.setTransform(1123.6,1042.4);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AhYCbQgmgVgUgpQgVgnAAg2QAAg0AVgpQAUgoAmgWQAngVAxgBQAyABAnAVQAmAWAUAoQAVApAAA0QAAA2gVAnQgUApgmAVQgnAXgyAAQgxAAgngXgAhHhZQgZAgAAA5QAAA8AZAeQAaAfAtABQAvgBAZgfQAZgeAAg8QAAg6gZgfQgagfguAAQgtAAgaAfg");
	this.shape_144.setTransform(1073.6,1042.65);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBFAAIAAA7QAbg9BTgGIAXgBIAFA7IgrAFQgzAFgUAZQgXAaAAAoIAAC9g");
	this.shape_145.setTransform(1044.25,1042.4);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("Ag5D4IAAkeIhCAAIAAg3IBCAAIAAgGQAAhHAkgkQAkgjBJgFIAggBIAEA1IggACQgqADgTATQgSAUAAAoIAAARIBeAAIAAA3IheAAIAAEeg");
	this.shape_146.setTransform(1017.875,1035.125);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_147.setTransform(978.025,1035.225);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBRAAIAABJg");
	this.shape_148.setTransform(961.125,1035.175);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AhUCjQgdgNgPgYQgQgZAAgeQAAglATgWQATgUAtgJQAtgJBMAAIARAAIAAgUQAAgogRgRQgQgRglAAQg5gBg7AkIgVgyQAdgTAlgLQAlgMAlAAQBEABAiAhQAhAjAABGIAADSIhEAAIAAg4QgOAegaAPQgaAQgiABQgggBgdgOgAgTARQgdAGgOALQgMAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAZgbAAgpIAAgSIgOAAQg2AAgcAEg");
	this.shape_149.setTransform(933.4,1042.65);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AC3CvIAAjRQgBgrgPgUQgOgUgiAAQgnAAgWAbQgWAbgBAtIAADBIhFAAIAAjRQAAgrgPgUQgPgUghAAQgpAAgVAbQgXAbAAAtIAADBIhHAAIAAlUIBGAAIAAAzQAQgdAcgPQAagQAkAAQBNAAAYBBQAQgeAegRQAfgSAmAAQByAAABCKIAADTg");
	this.shape_150.setTransform(885.1,1042.4);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg0AVgoQAUgpAmgWQAlgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgnIAWAyQgZAVgiALQgjAMglABQhQgBgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgnAAgZAag");
	this.shape_151.setTransform(836.375,1042.65);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg0AVgoQAUgpAmgWQAlgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgnIAVAyQgXAVgjALQgjAMglABQhQgBgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_152.setTransform(780.875,1042.65);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AC3CvIAAjRQAAgrgPgUQgPgUgiAAQgnAAgWAbQgWAbAAAtIAADBIhGAAIAAjRQAAgrgPgUQgQgUghAAQgnAAgWAbQgXAbAAAtIAADBIhGAAIAAlUIBFAAIAAAzQAQgdAbgPQAbgQAkAAQBOAAAXBBQARgeAegRQAdgSAnAAQByAAAACKIAADTg");
	this.shape_153.setTransform(732.225,1042.4);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AhXCbQgmgVgWgpQgUgnAAg2QAAg0AUgpQAWgoAmgWQAmgVAxgBQAzABAlAVQAmAWAWAoQAUApAAA0QAAA2gUAnQgWApgmAVQgmAXgyAAQgxAAgmgXgAhGhZQgZAfAAA6QgBA8AZAeQAZAfAuABQAvgBAZgfQAYgeAAg8QAAg5gYggQgagfguAAQgtAAgZAfg");
	this.shape_154.setTransform(682.25,1042.65);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AhDCbQgngWgUgmQgVgnABg3QAAg0AUgoQAXgpAmgWQAngWAygBQAkAAAiANQAfAKAXAVIgWAzQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAfQAcAfAwAAQAxABAvgmIAWAzQgWAUgjALQghAMgkABQgzAAgmgXg");
	this.shape_155.setTransform(646.4,1042.65);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_156.setTransform(620.175,1035.225);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg0AVgoQAUgpAmgWQAlgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgnIAWAyQgZAVgiALQgjAMglABQhQgBgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_157.setTransform(593.275,1042.65);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhZD0IhBAAIiClVIBJAAIBdEAIBdkAIA2AAIBdEBIBdkBIBGAAIiDFVg");
	this.shape_158.setTransform(545.55,1042.825);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AhVCkQgcgOgPgYQgQgaAAgdQAAglAUgWQASgUAtgJQAtgJBMAAIAQAAIAAgVQAAgogQgQQgQgSgmAAQg4AAg7AkIgVgxQAcgUAmgLQAmgMAkAAQBFAAAgAjQAiAiAABGIAADTIhEAAIAAg5QgNAegaAQQgbAPgiAAQghAAgdgNgAgUASQgcAFgNALQgNAMAAAVQAAAZASARQASAQAbAAQAnAAAXgaQAZgaAAgqIAAgSIgMAAQg3AAgdAFg");
	this.shape_159.setTransform(1609.35,958.65);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAhAAAUgLQARgMABgUQAAgTgNgLQgMgKgegHIg4gMQgtgLgXgXQgYgXAAglQAAguAmgdQAmgcA7gBQAmAAAfAMQAhALAYAWIgWAxQgygng2gBQgfAAgSANQgTAMAAAWQAAASAMAKQALALAZAGIA6AOQAwAKAYAXQAXAYAAAlQAAAuglAbQgmAbg/AAQhYAAg1grg");
	this.shape_160.setTransform(1555.7,958.65);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg1AVgnQAUgpAlgWQAmgXAvAAQBEAAApAtQAnAtAABPIAAAVIjxAAQAIBtBjAAQA7AAAwgmIAWAxQgZAVgjALQgiAMglAAQhQABgwgwgAg2hjQgZAZgFAwICzAAQgBgugXgbQgVgagpAAQgoAAgXAag");
	this.shape_161.setTransform(1520.45,958.65);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAVgpAmgWQAlgXAvAAQBFAAAnAtQAoAtAABPIAAAVIjwAAQAHBtBjAAQA6AAAxgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAagFAvICzAAQgCgwgWgZQgWgagoAAQgoAAgYAag");
	this.shape_162.setTransform(1483.425,958.65);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AiMCGIAXgzQA0AoBFAAQAhAAATgLQASgMAAgUQAAgTgMgLQgNgKgdgHIg4gMQgtgLgYgXQgXgXABglQgBguAmgdQAlgcA9gBQAlAAAfAMQAhALAZAWIgXAxQgygng1gBQggAAgSANQgTAMAAAWQAAASALAKQALALAaAGIA6AOQAxAKAXAXQAXAYAAAlQABAugmAbQglAbhAAAQhYAAg2grg");
	this.shape_163.setTransform(1447.9,958.65);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AhdDjQgigWgUgpQgTgpgBg0QABg1ATgoQAUgoAigVQAhgWAtAAQAmAAAdARQAdAQAQAeIAAjOIBHAAIAAHsIhGAAIAAg7QgQAfgdARQgeAQgmAAQgrAAgjgWgAhGgRQgZAeAAA6QAAA5AaAgQAaAhAsAAQAvAAAYgfQAaggAAg6QAAg6gagfQgYgfgvAAQgtAAgaAfg");
	this.shape_164.setTransform(1390.95,951.475);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgRgVQgRgTglAAQgqgBgaAbQgZAaAAAuIAADBIhHAAIAAlVIBFAAIAAA3QARgfAegQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_165.setTransform(1351.175,958.4);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AhUCkQgcgOgQgYQgQgaAAgdQAAglAUgWQATgUAsgJQAtgJBMAAIARAAIAAgVQgBgmgQgSQgQgSgmAAQg4AAg7AkIgVgxQAdgUAlgLQAmgMAkAAQBEAAAiAjQAhAiAABGIAADTIhEAAIAAg5QgNAegaAQQgbAPghAAQghAAgdgNgAgTASQgeAFgMALQgNANAAAUQAAAZASARQASAQAcAAQAlAAAZgaQAZgbAAgpIAAgSIgNAAQg3AAgcAFg");
	this.shape_166.setTransform(1311.7,958.65);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAATgLQASgMAAgUQAAgTgNgLQgNgKgdgHIg4gMQgtgLgXgXQgYgYAAgkQAAguAmgdQAmgcA7gBQAnAAAfAMQAgALAYAWIgVAxQgzgng2gBQgfAAgSANQgTANAAAVQAAASAMAKQAMALAZAGIA4AOQAyAKAXAXQAXAYABAlQgBAuglAbQglAbhAAAQhYAAg1grg");
	this.shape_167.setTransform(1258.05,958.65);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AC2CvIAAjRQABgrgQgUQgPgUghABQgngBgWAbQgXAaABAvIAADAIhGAAIAAjRQAAgrgQgUQgPgUghABQgngBgWAbQgXAaAAAvIAADAIhGAAIAAlVIBFAAIAAA0QAQgdAbgQQAbgPAjAAQBPAAAYBCQAPgfAfgSQAcgRAnAAQB0AAgBCKIAADTg");
	this.shape_168.setTransform(1211.2,958.4);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AhVCkQgcgOgPgYQgQgaAAgdQAAglAUgWQASgUAtgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgQgSglAAQg5AAg7AkIgVgxQAdgUAmgLQAkgMAlAAQBEAAAhAjQAiAiAABGIAADTIhEAAIAAg5QgNAegbAQQgaAPgiAAQggAAgegNgAgTASQgeAFgMALQgNANAAAUQAAAZASARQASAQAcAAQAlAAAZgaQAYgbAAgpIAAgSIgMAAQg2AAgdAFg");
	this.shape_169.setTransform(1161.7,958.65);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_170.setTransform(1125.025,958.65);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgkD3IAAmxIimAAIAAg8IGVAAIAAA8IinAAIAAGxg");
	this.shape_171.setTransform(1090.675,951.225);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AhpDtQgugPgkgfIAag1QAkAeAnAMQAlANAxAAQA4AAAdgUQAegUAAgnQAAgggcgQQgcgQg8gNQg9gNgjgQQgmgPgVgcQgWgbAAgrQAAgsAXggQAXgiApgSQAqgSA3AAQA1AAAsAPQAuAQAdAdIgYA2QghgbgmgPQgkgOgpAAQgzAAgfAWQgeAXAAAnQAAAhAaARQAcASA4AOQA6ANAqAPQAnAPAWAaQAXAbAAApQAAAqgXAhQgXAhgqARQgrARg5AAQg5AAgwgPg");
	this.shape_172.setTransform(1029.1,951.225);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("ACrD3IABlkIiTEVIgwAAIiUkSIABFhIhBAAIAAntIA6AAICyFVICylVIA5AAIAAHtg");
	this.shape_173.setTransform(977.725,951.225);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgNAAgTQAAgTgNgLQgMgKgegHIg4gMQgtgLgXgXQgXgXAAglQAAgvAlgcQAlgcA8gBQAmAAAgAMQAfALAZAWIgVAxQgygng3gBQggAAgRANQgTAMAAAWQAAATAMAJQALALAZAGIA5AOQAxAJAYAYQAXAXAAAmQAAAuglAbQgmAbg/AAQhYAAg1grg");
	this.shape_174.setTransform(912.825,958.65);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgoAAg1QAAg2ATgnQATgoAigVQAigWAtAAQAmAAAdARQAdAQAPAeIAAjOIBHAAIAAHsIhGAAIAAg7QgQAfgdARQgdAQgmAAQgsAAgigWgAhGgRQgZAeAAA6QAAA4AaAhQAaAhAsAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgtAAgaAfg");
	this.shape_175.setTransform(874.375,951.475);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AhVCkQgcgPgQgXQgPgZAAgeQAAglATgWQATgUAtgJQAtgJBMAAIAQAAIAAgVQAAgmgRgSQgPgSgmAAQg5AAg6AkIgVgxQAcgUAmgLQAlgMAlAAQBFAAAgAjQAiAiAABGIAADTIhEAAIAAg5QgNAegbAQQgaAPgiAAQghAAgdgNgAgTASQgeAFgMALQgNAMAAAVQAAAZASARQARAQAdAAQAlAAAZgaQAYgaAAgqIAAgSIgMAAQg3AAgcAFg");
	this.shape_176.setTransform(835.45,958.65);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AhYCcQglgWgVgpQgVgoAAg1QAAg0AVgpQAVgpAlgVQAmgWAyAAQAyAAAmAWQAnAVAVApQAUApAAA0QAAA1gUAoQgVApgnAWQgmAWgygBQgxABgngWgAhHhZQgZAgAAA5QAAA8AZAfQAZAeAuAAQAuAAAZgeQAageAAg9QAAg5gaggQgZgfguAAQgtAAgaAfg");
	this.shape_177.setTransform(797.5,958.65);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgjD3IAAntIBGAAIAAHtg");
	this.shape_178.setTransform(769.25,951.225);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgSgVQgQgTglAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QARgfAegQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_179.setTransform(740.725,958.4);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhZD0IhBAAIiClVIBKAAIBcEAIBdkAIA2AAIBdEBIBdkBIBGAAIiDFVg");
	this.shape_180.setTransform(690.825,958.825);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AhYCcQglgWgVgpQgVgoAAg1QAAg0AVgpQAVgpAlgVQAmgWAyAAQAzAAAlAWQAnAWAUAoQAVAoAAA1QAAA2gVAnQgUAognAXQgmAWgygBQgxABgngWgAhHhZQgZAfABA6QAAA8AYAfQAZAeAuAAQAuAAAZgeQAZggAAg7QAAg5gZggQgZgfguAAQgtAAgaAfg");
	this.shape_181.setTransform(641.9,958.65);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AhdDjQgigWgUgpQgUgpAAg0QAAg1AUgoQAUgoAhgVQAjgWAsAAQAnAAAcARQAdAQAPAeIAAjOIBHAAIAAHsIhFAAIAAg7QgRAfgcARQgeAQgmAAQgsAAgigWgAhFgRQgaAeAAA6QAAA5AaAgQAbAhAsAAQAuAAAZgfQAZggAAg6QAAg6gZgfQgZgfguAAQguAAgZAfg");
	this.shape_182.setTransform(600.45,951.475);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_183.setTransform(543.825,958.65);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("ACKD3IAAjeIkTAAIAADeIhHAAIAAntIBHAAIAADWIETAAIAAjWIBHAAIAAHtg");
	this.shape_184.setTransform(498.6,951.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133}]},299).wait(757));

	// Layer_9
	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AhODkQgogKgfgWIAWg0QAfAVAiALQAeAJAkAAQBgAAAAhhIAAg2QgPAfgeAQQgfASgmAAQgtAAgjgVQgjgVgTgnQgUgmAAgyQAAgyAUgnQAUglAigWQAjgWAtAAQAmAAAeARQAeASAPAeIAAg4IBGAAIAAE5QAABOgqAoQgqAohRABQgqgBgogMgAhGiZQgaAfAAA0QAAA1AaAeQAbAeAtAAQAtAAAageQAagdAAg2QAAg0gagfQgZgeguAAQgtAAgbAeg");
	this.shape_185.setTransform(1718.175,1048.95);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("ABTCvIAAjPQAAgtgRgUQgRgTglgBQgqAAgaAbQgZAbAAAsIAADCIhHAAIAAlUIBFAAIAAA2QARgfAegQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_186.setTransform(1678.275,1042.4);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgiD3IAAlUIBFAAIAAFUgAgoitIAAhJIBQAAIAABJg");
	this.shape_187.setTransform(1649.6,1035.175);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("ABHD3IihihIAAChIhGAAIAAntIBGAAIAAExICWiYIBXAAIihCjICvCxg");
	this.shape_188.setTransform(1625.95,1035.225);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBFAAIAAA7QAbg9BTgGIAXgBIAFA7IgqAFQgzAFgVAZQgWAZAAApIAAC9g");
	this.shape_189.setTransform(1594.6,1042.4);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AhYCbQgmgWgVgoQgUgmAAg3QAAg2AUgnQAVgnAmgXQAmgVAygBQAyABAnAVQAmAXAUAnQAVApAAA0QAAA2gVAnQgUAogmAWQgnAXgyAAQgyAAgmgXgAhHhZQgZAfAAA6QAAA8AZAeQAZAfAuABQAvgBAZgfQAZgeAAg8QAAg6gagfQgZgfguAAQgtAAgaAfg");
	this.shape_190.setTransform(1559.6,1042.65);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhaD0Ig/AAIiDlVIBJAAIBdEAIBdkAIA2AAIBeEBIBckBIBGAAIiDFVg");
	this.shape_191.setTransform(1510.65,1042.825);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgTDAQghghAAg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_192.setTransform(1450.1,1037.925);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBFAAIAAA7QAbg9BTgGIAXgBIAFA7IgqAFQgzAFgVAZQgWAZAAApIAAC9g");
	this.shape_193.setTransform(1424.5,1042.4);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AhUCjQgdgNgPgYQgQgZAAgeQAAgmATgVQAUgUAsgJQAtgJBMAAIAQAAIAAgUQAAgogQgRQgQgRgmAAQg5gBg6AkIgVgyQAcgTAmgLQAmgMAkAAQBEABAiAhQAhAjAABGIAADSIhEAAIAAg4QgNAdgbAQQgaAQgiABQgggBgdgOgAgTARQgdAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAYgbAAgpIAAgSIgMAAQg3AAgcAEg");
	this.shape_194.setTransform(1389.975,1042.65);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgTDAQghggABg+IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgSADgSAAQhDAAgfghg");
	this.shape_195.setTransform(1359.4,1037.925);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1ApBFAAQAiAAASgMQATgMAAgUQAAgTgNgKQgMgLgegHIg4gNQgtgKgXgXQgXgXAAglQAAguAlgdQAmgdA7AAQAmAAAgAMQAhAMAXAUIgVAyQgygog3AAQgfAAgSANQgTAMAAAWQAAASAMALQALAKAZAGIA6ANQAwAKAYAYQAXAXAAAmQAAAvglAbQgmAbg/AAQhYAAg1gsg");
	this.shape_196.setTransform(1330.425,1042.65);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AhXCbQgmgVgWgpQgUgnAAg2QAAg0AUgpQAWgoAmgWQAlgVAygBQAzABAmAVQAlAWAVAoQAVApAAA0QAAA2gVAnQgVApglAVQgnAXgyAAQgxAAgmgXgAhGhZQgaAgAAA5QAAA8AZAeQAaAfAtABQAvgBAZgfQAZgegBg8QAAg5gYggQgagfguAAQgtAAgZAfg");
	this.shape_197.setTransform(1275.45,1042.65);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgTDAQghghABg9IAAikIhDAAIAAg3IBDAAIAAhnIBGAAIAABnIBdAAIAAA3IhdAAIAAChQAABLBEAAQATAAANgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_198.setTransform(1243.3,1037.925);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg1AUgnQAVgpAmgWQAlgWAugBQBFAAAoAtQAoAtAABPIAAAWIjwAAQAHBsBkAAQA6AAAwgnIAWAyQgZAVgjALQgiAMglABQhQgBgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgnAAgZAag");
	this.shape_199.setTransform(1194.05,1042.65);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("ABTCvIAAjPQgBgtgRgUQgRgTgkgBQgrAAgYAbQgaAaAAAtIAADCIhHAAIAAlUIBFAAIAAA2QAQgfAfgQQAdgQAmAAQB7AAAACKIAADTg");
	this.shape_200.setTransform(1155.4,1042.4);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AhYCbQgngWgTgoQgVgmAAg3QAAg2AVgnQATgnAngXQAmgVAygBQAyABAnAVQAmAWAUAoQAVApAAA0QAAA2gVAnQgUApgmAVQgnAXgyAAQgyAAgmgXgAhHhZQgZAfAAA6QAAA8AZAeQAZAfAuABQAvgBAZgfQAZgeAAg8QAAg6gagfQgZgfguAAQgtAAgaAfg");
	this.shape_201.setTransform(1115.45,1042.65);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("ABSD3IAAjRQABgrgSgUQgQgUglAAQgqAAgZAbQgaAZAAAtIAADDIhIAAIAAntIBIAAIAADMQARgeAdgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_202.setTransform(1075.6,1035.225);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AinDuIAAnSIBHAAIAAA3QAPgeAegRQAdgRAmAAQAsAAAiAWQAiAWAUApQAUApAAA1QAAA0gTAnQgTAogjAWQgjAWgsAAQgmAAgdgRQgdgQgQgfIAAC5gAhHiVQgZAgAAA6QAAA5AZAgQAZAfAuAAQAtAAAZgfQAZgeAAg6QAAg6gZggQgagggsgBQguABgZAfg");
	this.shape_203.setTransform(1035.675,1048.7);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AiMCGIAXgzQA0ApBFAAQAhAAATgMQASgMAAgUQABgTgMgKQgNgLgegHIg4gNQgtgKgYgXQgXgXABglQgBguAmgdQAlgdA9AAQAlAAAfAMQAhALAZAVIgXAyQgxgog2AAQggAAgTANQgSAMAAAWQAAASALALQAMAKAZAGIA6ANQAxALAXAXQAXAXAAAmQABAvgmAbQglAbhBAAQhXAAg2gsg");
	this.shape_204.setTransform(978.55,1042.65);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgnitIAAhJIBQAAIAABJg");
	this.shape_205.setTransform(953.3,1035.175);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("ABSD3IAAjRQABgrgSgUQgQgUglAAQgqAAgZAbQgaAZAAAtIAADDIhIAAIAAntIBIAAIAADMQARgeAdgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_206.setTransform(924.75,1035.225);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AimDuIAAnSIBGAAIAAA3QAPgeAegRQAdgRAmAAQAsAAAjAWQAiAWAUApQASApABA1QgBA2gSAlQgTAogjAWQgjAWgsAAQgmAAgdgRQgegQgPgfIAAC5gAhHiVQgZAfAAA7QAAA6AZAfQAZAfAuAAQAtAAAZgfQAagfAAg5QgBg6gZggQgZgggtgBQguABgZAfg");
	this.shape_207.setTransform(866.35,1048.7);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AiWAkIAAjQIBHAAIAADPQAAApARAUQASAUAiAAQAoAAAZgbQAZgbAAgsIAAi+IBHAAIAAFUIhFAAIAAg3QgRAdgbAQQgeAPghAAQh9AAAAiJg");
	this.shape_208.setTransform(824.65,1043.075);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AgTDAQgggggBg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgDA2QgSADgTAAQhCAAggghg");
	this.shape_209.setTransform(774,1037.925);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg0AVgoQAUgpAmgWQAlgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgnIAWAyQgZAVgiALQgjAMglABQhQgBgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_210.setTransform(743.525,1042.65);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AiMCGIAXgzQA0ApBFAAQAiAAASgMQASgMAAgUQABgTgMgKQgNgLgegHIg3gNQgugKgYgXQgXgYAAgkQAAguAmgdQAlgdA9AAQAlAAAfAMQAhALAZAVIgXAyQgygog1AAQggAAgSANQgTANAAAVQAAASALALQAMAKAZAGIA6ANQAwALAZAXQAWAYAAAlQAAAvglAbQgmAbg/AAQhYAAg2gsg");
	this.shape_211.setTransform(708,1042.65);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgoAAg1QAAg2ATgnQATgoAigVQAigWAtAAQAmAAAdARQAdAQAPAeIAAjOIBHAAIAAHsIhGAAIAAg7QgQAfgdARQgdAQgmAAQgsAAgigWgAhGgRQgZAeAAA6QAAA4AaAhQAaAhAsAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgsAAgbAfg");
	this.shape_212.setTransform(651.075,1035.475);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("ABSCvIAAjPQAAgtgQgUQgSgTgkgBQgqAAgZAbQgbAaAAAtIAADCIhHAAIAAlUIBGAAIAAA2QAQgfAfgQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_213.setTransform(611.3,1042.4);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AhUCjQgdgNgPgYQgQgZAAgeQAAgmATgVQAUgUAsgJQAtgJBMAAIAQAAIAAgUQAAgogQgRQgQgRgmAAQg5gBg6AkIgVgyQAcgTAmgLQAmgMAkAAQBEABAiAhQAhAjAABGIAADSIhEAAIAAg4QgNAdgbAQQgaAQgiABQgggBgdgOgAgTARQgdAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAYgbAAgpIAAgSIgMAAQg3AAgcAEg");
	this.shape_214.setTransform(571.825,1042.65);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AhrCDQgwgwAAhSQAAgzAVgpQAUgpAmgWQAlgWAvgBQBGAAAnAtQAnAtAABPIAAAWIjxAAQAJBsBiAAQA6AAAxgnIAVAyQgYAVgiALQgjAMgkABQhRgBgvgugAg3hjQgYAagFAvICzAAQgBgwgXgZQgWgagoAAQgoAAgYAag");
	this.shape_215.setTransform(516.65,1042.65);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AhDCbQgmgVgVgnQgVgoAAg2QAAg0AWgoQAVgpAngWQAngWAygBQAkAAAhANQAhALAWAUIgWAzQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAfQAcAfAwAAQAyABAugmIAWAzQgWAUgiALQgiAMgkABQgzAAgmgXg");
	this.shape_216.setTransform(482.025,1042.65);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("ABnD4IAAkeIiRAAIAAEeIhHAAIAAkeIhCAAIAAg3IBCAAIAAgGQAAhGAlglQAkgkBJgEIAcgBIAFA1IghACQgoADgRATQgSATAAAoIAAASIDYAAIAAFVgABiirIAAhLIBSAAIAABLg");
	this.shape_217.setTransform(441.925,1035.125);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("Ag5D4IAAkeIhCAAIAAg3IBCAAIAAgGQAAhHAkgkQAkgjBKgFIAfgBIAEA1IggACQgrADgRATQgTAUAAAoIAAARIBeAAIAAA3IheAAIAAEeg");
	this.shape_218.setTransform(412.675,1035.125);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AhYCbQgngVgTgpQgVgmAAg3QAAg2AVgnQATgnAngXQAmgVAygBQAyABAnAVQAmAWAUAoQAVApAAA0QAAA2gVAnQgUApgmAVQgnAXgyAAQgxAAgngXgAhHhZQgZAfAAA6QAAA8AZAeQAZAfAuABQAugBAZgfQAageAAg8QgBg6gZgfQgZgfguAAQguAAgZAfg");
	this.shape_219.setTransform(380.25,1042.65);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg1AUgnQAVgpAmgWQAlgXAuAAQBFAAAoAtQAoAtAABPIAAAVIjwAAQAHBtBkAAQA6AAAwgmIAVAxQgYAVgiALQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgnAAgZAag");
	this.shape_220.setTransform(1752.15,958.65);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AC2CvIAAjRQAAgrgPgUQgPgUghABQgngBgWAbQgXAaABAvIAADAIhGAAIAAjRQAAgrgQgUQgOgUgiABQgngBgXAbQgWAaAAAvIAADAIhGAAIAAlVIBFAAIAAA0QAQgdAbgQQAbgPAjAAQBPAAAYBCQAPgfAfgSQAcgRAnAAQB0AAgBCKIAADTg");
	this.shape_221.setTransform(1703.5,958.4);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AhYCcQgmgXgUgoQgVgnAAg2QAAg1AVgoQAUgoAmgWQAmgWAyAAQAyAAAmAWQAmAVAWApQAUApAAA0QAAA1gUAoQgWApgmAWQgmAWgygBQgxABgngWgAhHhZQgZAgAAA5QAAA7AZAgQAZAeAuAAQAvAAAZgeQAZgfAAg8QAAg6gagfQgZgfguAAQgtAAgaAfg");
	this.shape_222.setTransform(1653.5,958.65);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgRgVQgRgUglAAQgqAAgaAbQgaAaAAAsIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_223.setTransform(1613.675,951.225);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhaD0Ig/AAIiDlVIBKAAIBcEAIBdkAIA2AAIBeEBIBckBIBGAAIiDFVg");
	this.shape_224.setTransform(1545.3,958.825);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAWAxQgZAVgiALQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_225.setTransform(1497.625,958.65);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgqgRgWQgRgTglAAQgqgBgaAbQgZAaAAAuIAADBIhHAAIAAlVIBFAAIAAA3QARgfAegQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_226.setTransform(1458.975,958.4);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AhUCkQgdgOgPgYQgQgZAAgeQAAglATgWQAUgUAsgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgQgSgmAAQg5AAg6AkIgVgxQAcgUAmgLQAmgMAkAAQBFAAAhAjQAhAiAABGIAADTIhEAAIAAg5QgNAdgbARQgaAPgiAAQggAAgdgNgAgTASQgdAFgNALQgNAMAAAVQAAAZASARQASAQAcAAQAlAAAZgaQAYgaAAgqIAAgSIgMAAQg3AAgcAFg");
	this.shape_227.setTransform(1401.025,958.65);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgTDAQggghAAg9IAAikIhDAAIAAg3IBDAAIAAhnIBGAAIAABnIBdAAIAAA3IhdAAIAAChQgBBLBFAAQASAAAOgCIgDA2QgSADgTAAQhCAAggghg");
	this.shape_228.setTransform(1351.95,953.925);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("ABnD4IAAkeIiRAAIAAEeIhHAAIAAkeIhCAAIAAg3IBCAAIAAgGQAAhHAlgkQAjgkBKgEIAcgBIAEA1IggACQgoACgSAUQgRAUAAAnIAAASIDYAAIAAFVgABiirIAAhLIBSAAIAABLg");
	this.shape_229.setTransform(1317.275,951.125);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AgTDAQgggggBg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgDA2QgTADgSAAQhCAAggghg");
	this.shape_230.setTransform(1285.9,953.925);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AiVAkIAAjQIBGAAIAADPQAAApARAUQARAUAiAAQApAAAZgbQAZgagBgtIAAi+IBHAAIAAFUIhEAAIAAg3QgQAdgcAQQgeAPghAAQh8AAAAiJg");
	this.shape_231.setTransform(1253.55,959.075);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AhYCcQgmgWgUgpQgVgoAAg1QAAg0AVgpQAUgpAmgVQAngWAxAAQAyAAAnAWQAmAVAUApQAVApAAA0QAAA1gVAoQgUApgmAWQgnAWgygBQgxABgngWgAhGhZQgaAfAAA6QABA8AYAfQAZAeAuAAQAvAAAZgeQAZggAAg7QAAg5gZggQgagfguAAQgtAAgZAfg");
	this.shape_232.setTransform(1214,958.65);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgqgRgWQgRgTglAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QARgfAegQQAegQAlAAQB6AAAACKIAADTg");
	this.shape_233.setTransform(1155.675,958.4);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AhUCkQgcgOgQgYQgQgaAAgdQAAglATgWQATgUAtgJQAtgJBMAAIARAAIAAgVQAAgmgRgSQgQgSglAAQg5AAg7AkIgVgxQAdgUAlgLQAlgMAlAAQBEAAAiAjQAhAiAABGIAADTIhEAAIAAg5QgOAegaAQQgaAPgiAAQggAAgdgNgAgTASQgeAFgNALQgMANAAAUQAAAZASARQASAQAcAAQAlAAAZgaQAYgbABgpIAAgSIgOAAQg2AAgcAFg");
	this.shape_234.setTransform(1116.2,958.65);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AhDCcQgngXgUgnQgVgnABg1QAAg1AUgoQAWgpAngWQAngXAzAAQAkAAAhAMQAfALAXAWIgWAyQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAgQAcAeAwAAQAyAAAuglIAWAzQgWAUgjALQghAMgkAAQgzABgmgWg");
	this.shape_235.setTransform(1081.9,958.65);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg9BTgFIAXgCIAFA7IgrAFQgyAFgWAZQgVAbAAAnIAAC9g");
	this.shape_236.setTransform(1035.4,958.4);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAVgpAmgWQAlgXAvAAQBFAAAnAtQAoAtAABPIAAAVIjxAAQAIBtBjAAQA6AAAxgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAagFAvICzAAQgCgwgWgZQgWgagoAAQgoAAgYAag");
	this.shape_237.setTransform(1001.625,958.65);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AgTDAQghggAAg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgDA2QgSADgTAAQhCAAggghg");
	this.shape_238.setTransform(970.675,953.925);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAWAxQgZAVgiALQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_239.setTransform(940.225,958.65);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("Ai4D3IAAntIDLAAQBQAAArAnQArAmAABHQAABGgrAmQgsAnhPAAIiCAAIAADGgAhvgIIB7AAQBoAAgBhaQABhahoAAIh7AAg");
	this.shape_240.setTransform(901.45,951.225);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AgkA8QAeggAEgcIgnAAIAAhUIBTAAIAAA5QAAAggLAbQgKAZgaAcg");
	this.shape_241.setTransform(850.375,976.025);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAWgpAlgWQAlgXAvAAQBFAAAnAtQAoAtAABPIAAAVIjwAAQAHBtBkAAQA5AAAxgmIAWAxQgZAUgiAMQgjAMglAAQhQABgwgwgAg3hjQgYAagEAvICzAAQgDgwgWgZQgVgagpAAQgnAAgZAag");
	this.shape_242.setTransform(823.6,958.65);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AC3CvIAAjRQAAgrgQgUQgOgUgiABQgngBgWAbQgWAZAAAwIAADAIhGAAIAAjRQAAgrgPgUQgQgUggABQgogBgWAbQgWAagBAvIAADAIhHAAIAAlVIBGAAIAAA0QAQgdAcgQQAagPAkAAQBOAAAXBCQASggAdgRQAdgRAmAAQBzAAABCKIAADTg");
	this.shape_243.setTransform(774.95,958.4);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AgiD3IAAlUIBFAAIAAFUgAgoitIAAhJIBQAAIAABJg");
	this.shape_244.setTransform(736.25,951.175);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AgTDAQgggggBg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgDA2QgTADgSAAQhCAAggghg");
	this.shape_245.setTransform(715.4,953.925);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgSgVQgQgTglAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QARgfAegQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_246.setTransform(682.975,958.4);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AhUCkQgdgOgPgYQgQgaAAgdQAAglATgWQATgUAtgJQAsgJBNAAIARAAIAAgVQgBgmgQgSQgQgSglAAQg5AAg7AkIgVgxQAdgUAlgLQAlgMAlAAQBFAAAgAjQAiAiAABGIAADTIhEAAIAAg5QgOAegaAQQgaAPgiAAQggAAgdgNgAgTASQgdAFgOALQgMANAAAUQAAAZASARQASAQAcAAQAlAAAZgaQAZgbAAgpIAAgSIgOAAQg2AAgcAFg");
	this.shape_247.setTransform(643.5,958.65);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgwgWgZQgWgagoAAQgoAAgYAag");
	this.shape_248.setTransform(606.825,958.65);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AC3CvIAAjRQAAgrgPgUQgPgUgiABQgngBgWAbQgWAaAAAvIAADAIhGAAIAAjRQAAgrgPgUQgQgUghABQgngBgWAbQgXAaAAAvIAADAIhGAAIAAlVIBFAAIAAA0QAQgdAbgQQAbgPAkAAQBOAAAXBCQARgfAegSQAdgRAnAAQByAAAACKIAADTg");
	this.shape_249.setTransform(558.175,958.4);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_250.setTransform(490.975,958.65);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgRgVQgRgUglAAQgqAAgaAbQgaAaAAAsIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_251.setTransform(452.325,951.225);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AgTDAQghghABg9IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgRADgTAAQhCAAggghg");
	this.shape_252.setTransform(419.7,953.925);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgSgVQgRgTgkAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QASgfAdgQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_253.setTransform(368.825,958.4);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgjD3IAAntIBHAAIAAHtg");
	this.shape_254.setTransform(339.25,951.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185}]},299).wait(757));

	// Layer_8
	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AinDuIAAnTIBHAAIAAA4QAPgeAegSQAdgQAmAAQAsAAAiAXQAkAWASApQAUAoAAA1QAAA0gTAnQgTAogjAWQgjAWgsAAQgmAAgdgQQgegRgPgfIAAC5gAhHiVQgZAfAAA7QAAA7AZAeQAZAfAuAAQAuAAAYgfQAageAAg6QAAg6gaggQgaghgsAAQguAAgZAgg");
	this.shape_255.setTransform(1717.075,1008.95);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AinDuIAAnTIBHAAIAAA4QAQgeAdgSQAdgQAmAAQAsAAAiAXQAjAWATApQAUAnAAA2QgBA1gSAmQgUApgiAVQgjAWgsAAQgmAAgdgQQgdgRgQgfIAAC5gAhHiVQgZAgAAA6QAAA5AZAgQAZAfAuAAQAtAAAagfQAYgeAAg6QAAg6gZggQgZghgtAAQguAAgZAgg");
	this.shape_256.setTransform(1675.7,1008.95);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AhVCkQgcgPgQgYQgPgYAAgeQAAglATgVQATgVAtgJQAsgJBNAAIAQAAIAAgVQAAgmgRgSQgQgRglAAQg5AAg6AjIgVgyQAcgTAmgLQAogLAhAAQBGAAAhAhQAhAjAABGIAADTIhEAAIAAg6QgOAfgZAPQgbAQgiAAQgiABgcgOgAgUARQgcAGgNALQgNAMAAAWQAAAYASAQQARARAcAAQAmAAAYgbQAZgaAAgpIAAgSIgMAAQg3AAgdAEg");
	this.shape_257.setTransform(1634.8,1002.9);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAVgpQAUgpAmgWQAlgWAvAAQBFAAAoAsQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgmIAWAxQgXAUgkANQgjAMglgBQhQAAgwgugAg3hjQgYAZgFAwICzAAQgCgwgWgZQgWgagoAAQgnAAgZAag");
	this.shape_258.setTransform(1579.625,1002.9);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgrgRgUQgRgUglAAQgqAAgaAbQgZAZAAAtIAADDIhHAAIAAntIBHAAIAADMQARgeAdgPQAegPAkAAQB6AAAACJIAADUg");
	this.shape_259.setTransform(1540.975,995.475);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AgTDAQggghAAg9IAAikIhDAAIAAg3IBDAAIAAhnIBGAAIAABnIBdAAIAAA3IhdAAIAAChQAABLBEAAQATAAANgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_260.setTransform(1508.35,998.175);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AC3CvIAAjQQAAgsgPgTQgPgVgiABQgnAAgWAaQgWAaAAAvIAADAIhGAAIAAjQQAAgsgPgTQgQgVghABQgnAAgWAaQgXAaAAAvIAADAIhGAAIAAlVIBFAAIAAA0QAQgdAbgPQAbgQAkAAQBOAAAXBBQARgeAegSQAegRAmAAQByAAAACKIAADTg");
	this.shape_261.setTransform(1447.475,1002.65);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AhXCcQgngWgVgoQgUgoAAg2QAAg0AUgpQAVgpAngVQAmgVAxAAQAyAAAnAVQAlAVAVApQAVApAAA0QAAA2gVAoQgVAoglAWQgnAVgyAAQgxAAgmgVgAhGhZQgaAeAAA7QABA8AYAeQAZAgAuAAQAvAAAZggQAZgfAAg7QAAg5gZggQgagfguAAQgtAAgZAfg");
	this.shape_262.setTransform(1397.5,1002.9);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg8BTgHIAXgBIAFA8IgrADQgyAGgVAaQgWAZAAAoIAAC9g");
	this.shape_263.setTransform(1368.125,1002.65);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("Ag5D4IAAkeIhCAAIAAg3IBCAAIAAgGQAAhHAkgkQAkgjBKgFIAfgBIAEA1IggACQgqADgSATQgTAUAAAoIAAARIBeAAIAAA3IheAAIAAEeg");
	this.shape_264.setTransform(1341.725,995.375);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AhODlQgpgMgegWIAWgzQAiAXAfAJQAeAJAjAAQBgAAAAhiIAAg1QgOAfgeARQgfARgmAAQgtAAgjgVQgjgVgTgnQgUglAAgyQAAgyAUgnQATgnAjgVQAigVAuAAQAmAAAeAQQAdARAQAfIAAg4IBGAAIAAE5QAABPgqAoQgqAohRgBQgqAAgogLgAhGiZQgaAfAAA1QAAA0AaAeQAbAeAsAAQAuAAAageQAagcAAg2QAAg0gaggQgageguAAQgtAAgaAeg");
	this.shape_265.setTransform(1288.575,1009.2);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("ABTCvIAAjPQAAgsgSgUQgQgVglABQgqAAgaAaQgaAbAAAsIAADCIhGAAIAAlVIBFAAIAAA3QARgfAegQQAegQAlAAQB6AAAACKIAADTg");
	this.shape_266.setTransform(1248.675,1002.65);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBRAAIAABJg");
	this.shape_267.setTransform(1219.975,995.425);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AimDuIAAnTIBGAAIAAA4QAQgeAdgSQAdgQAmAAQAsAAAjAXQAiAWAUApQASApABA0QAAA1gTAmQgUApgiAVQgjAWgsAAQgmAAgdgQQgdgRgQgfIAAC5gAhHiVQgZAgAAA6QAAA5AZAgQAZAfAuAAQAtAAAZgfQAageAAg6QgBg6gZggQgZghgtAAQguAAgZAgg");
	this.shape_268.setTransform(1191.8,1008.95);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AinDuIAAnTIBHAAIAAA4QAPgeAegSQAegQAlAAQAsAAAjAXQAjAWASApQAUAoAAA1QAAA0gTAnQgTAogjAWQgjAWgsAAQglAAgegQQgegRgPgfIAAC5gAhHiVQgZAfAAA7QAAA7AZAeQAZAfAuAAQAuAAAYgfQAageAAg6QAAg6gaggQgZghgtAAQguAAgZAgg");
	this.shape_269.setTransform(1150.425,1008.95);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AgiD3IAAlUIBFAAIAAFUgAgoitIAAhJIBQAAIAABJg");
	this.shape_270.setTransform(1120.3,995.425);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgrgRgUQgRgUglAAQgqAAgaAbQgZAZAAAtIAADDIhHAAIAAntIBHAAIAADMQARgeAdgPQAegPAkAAQB6AAAACJIAADUg");
	this.shape_271.setTransform(1091.725,995.475);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgMAAgVQAAgSgNgKQgLgLgfgHIg4gMQgtgLgXgXQgXgXAAglQAAgtAlgeQAmgcA7AAQAkAAAiALQAhALAXAWIgVAxQgygng3AAQgfAAgSAMQgTAMAAAWQAAATAMAJQALAMAZAFIA6ANQAxALAXAXQAXAXAAAmQAAAvglAaQglAbhAAAQhYAAg1grg");
	this.shape_272.setTransform(1054.525,1002.9);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAWgpAkgWQAmgWAvAAQBGAAAmAsQAoAsAABQIAAAWIjwAAQAHBsBkAAQA5AAAxgmIAWAxQgYAUgjANQgjAMglgBQhQAAgwgugAg2hjQgZAagEAvICzAAQgDgwgWgZQgVgagpAAQgnAAgYAag");
	this.shape_273.setTransform(1000.8,1002.9);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgSgVQgRgUgkAAQgqAAgaAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_274.setTransform(962.175,995.475);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AgTDAQghghABg9IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgRADgTAAQhCAAggghg");
	this.shape_275.setTransform(929.55,998.175);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("ABHD3IigihIAAChIhHAAIAAntIBHAAIAAExICViYIBXAAIigCjICuCxg");
	this.shape_276.setTransform(883.55,995.475);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AhDCcQgmgWgVgnQgVgpAAg0QAAg1AWgoQAVgpAngWQAngWAyAAQAkAAAhALQAiANAVAUIgWAyQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAfQAcAgAwAAQAyAAAugmIAWAzQgWATgiANQgjALgjAAQgzAAgmgVg");
	this.shape_277.setTransform(846.475,1002.9);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AhVCkQgbgOgQgZQgQgZAAgdQAAgmAUgUQASgVAtgJQAsgJBNAAIAQAAIAAgVQAAgmgQgSQgRgRglAAQg4AAg7AjIgVgyQAdgTAlgLQAngLAjAAQBEAAAiAhQAhAjAABGIAADTIhEAAIAAg6QgNAfgaAPQgbAQgiAAQghABgdgOgAgUARQgcAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgbQAZgbgBgoIAAgSIgMAAQg3AAgdAEg");
	this.shape_278.setTransform(809.5,1002.9);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBEAAIAAA8QAcg8BTgHIAXgBIAFA8IgrADQgyAGgVAaQgXAZAAAoIAAC9g");
	this.shape_279.setTransform(781.2,1002.65);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AgTDAQghghAAg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_280.setTransform(753.5,998.175);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("ABSCvIAAjPQAAgtgRgTQgRgVgkABQgrAAgZAaQgaAaAAAtIAADCIhGAAIAAlVIBFAAIAAA3QARgfAegQQAegQAlAAQB6AAAACKIAADTg");
	this.shape_281.setTransform(702.625,1002.65);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AhUCkQgdgPgPgYQgQgYAAgeQAAglATgVQATgVAtgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgRgRglAAQg5AAg6AjIgVgyQAcgTAmgLQAogLAiAAQBFAAAhAhQAhAjAABGIAADTIhEAAIAAg6QgNAfgaAPQgbAQgiAAQgiABgbgOgAgTARQgdAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAmAAAYgbQAYgaAAgpIAAgSIgMAAQg3AAgcAEg");
	this.shape_282.setTransform(663.125,1002.9);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFFFFF").s().p("AhDCcQgmgWgVgnQgVgoAAg1QAAgzAWgqQAUgoAogXQAngWAzAAQAjAAAiALQAhAMAVAVIgWAyQgugmgyAAQgwAAgbAgQgcAgAAA5QAAA4AbAgQAbAgAxAAQAyAAAugmIAWAzQgWAUgiAMQgjALgjAAQgzAAgmgVg");
	this.shape_283.setTransform(628.825,1002.9);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAVgpAmgWQAlgWAvAAQBFAAAnAsQAoAtAABPIAAAWIjwAAQAHBsBjAAQA6AAAxgmIAVAxQgWAUgkANQgjAMglgBQhQAAgwgugAg3hjQgYAagFAvICzAAQgCgwgWgZQgWgagoAAQgoAAgYAag");
	this.shape_284.setTransform(574.175,1002.9);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgSgVQgQgUglAAQgqAAgaAbQgaAaAAAsIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_285.setTransform(535.525,995.475);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgpAAg0QAAg1ATgoQATgnAigWQAigWAuAAQAlAAAdARQAdAQAQAeIAAjOIBGAAIAAHsIhGAAIAAg7QgQAggdAQQgdAQglAAQgtAAgigWgAhFgRQgaAeAAA6QAAA5AaAhQAaAgAsAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgtAAgZAfg");
	this.shape_286.setTransform(475.125,995.725);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FFFFFF").s().p("ABSCvIAAjPQAAgtgRgTQgRgVgkABQgrAAgZAaQgaAaAAAtIAADCIhGAAIAAlVIBFAAIAAA3QARgfAegQQAegQAlAAQB6AAAACKIAADTg");
	this.shape_287.setTransform(435.375,1002.65);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FFFFFF").s().p("ACxD3Ig0h6Ij5AAIg0B6IhJAAIDcntIA7AAIDcHtgAhjBDIDHAAIhkjog");
	this.shape_288.setTransform(389.45,995.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255}]},299).wait(757));

	// Layer_7
	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FFFFFF").s().p("AgTDAQghggABg+IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgSADgSAAQhDAAgfghg");
	this.shape_289.setTransform(1627.6,1037.925);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FFFFFF").s().p("ABTCvIAAjPQAAgsgSgVQgRgTgkgBQgqAAgaAbQgaAaAAAtIAADCIhGAAIAAlUIBFAAIAAA2QASggAdgPQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_290.setTransform(1595.175,1042.4);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAVgpQAUgpAmgWQAlgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjxAAQAJBsBiAAQA7AAAwgnIAWAyQgZAVgiALQgjAMglABQhPgBgxgugAg2hjQgZAagFAvICzAAQgCgwgWgZQgVgagpAAQgoAAgXAag");
	this.shape_291.setTransform(1556.45,1042.65);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FFFFFF").s().p("AC3CvIAAjRQAAgrgPgUQgPgUgiAAQgnAAgWAbQgWAbAAAtIAADBIhGAAIAAjRQAAgrgPgUQgPgUgiAAQgoAAgVAbQgXAbAAAtIAADBIhHAAIAAlUIBGAAIAAAzQAQgdAcgPQAagQAkAAQBNAAAYBBQARgfAegQQAdgSAnAAQByAAABCKIAADTg");
	this.shape_292.setTransform(1507.8,1042.4);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FFFFFF").s().p("AgTDAQgggggBg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgDA2QgSADgTAAQhCAAggghg");
	this.shape_293.setTransform(1465.2,1037.925);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBFAAIAAA7QAbg9BTgGIAXgBIAFA7IgrAFQgzAFgUAZQgXAaABAoIAAC9g");
	this.shape_294.setTransform(1439.6,1042.4);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FFFFFF").s().p("AhVCjQgcgNgPgYQgQgZAAgeQAAglAUgWQASgUAtgJQAtgJBMAAIAQAAIAAgUQAAgogQgRQgQgRgmAAQg4gBg7AkIgVgyQAdgTAlgLQAlgMAlAAQBFABAgAhQAiAjAABGIAADSIhEAAIAAg4QgNAegaAPQgbAQgiABQgggBgegOgAgUARQgdAGgMALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAZgbgBgpIAAgSIgMAAQg2AAgeAEg");
	this.shape_295.setTransform(1405.05,1042.65);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FFFFFF").s().p("AinDuIAAnSIBHAAIAAA3QAPgeAegRQAegRAkAAQAtAAAiAWQAjAWATApQAUApgBA1QABA2gUAlQgSApgjAVQgjAWgtAAQgkAAgegRQgdgQgQgfIAAC5gAhHiVQgZAgAAA6QAAA5AZAgQAZAfAuAAQAtAAAZgfQAZgfAAg5QABg6gaggQgagggsgBQguABgZAfg");
	this.shape_296.setTransform(1367.15,1048.7);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FFFFFF").s().p("AhUCjQgdgNgPgYQgQgZAAgeQAAglATgWQAUgUAsgJQAtgJBMAAIAQAAIAAgUQAAgogQgRQgQgRgmAAQg5gBg6AkIgVgyQAcgTAmgLQAmgMAkAAQBFABAhAhQAhAjAABGIAADSIhEAAIAAg4QgNAegaAPQgbAQgiABQgggBgdgOgAgTARQgdAGgNALQgNAMAAAWQAAAYASAQQASARAcAAQAmAAAYgaQAYgbAAgpIAAgSIgMAAQg3AAgcAEg");
	this.shape_297.setTransform(1326.225,1042.65);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1ApBFAAQAiAAASgMQATgMAAgUQAAgTgNgKQgMgLgegHIg4gNQgtgKgXgXQgXgXAAglQAAguAlgdQAmgdA7AAQAmAAAgAMQAhAMAXAUIgVAyQgygog3AAQgfAAgSANQgTAMAAAWQAAASAMALQALAKAZAGIA5ANQAxAKAYAYQAXAXAAAmQAAAvglAbQgmAbg/AAQhYAAg1gsg");
	this.shape_298.setTransform(1272.575,1042.65);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#FFFFFF").s().p("AgiD3IAAlUIBFAAIAAFUgAgoitIAAhJIBQAAIAABJg");
	this.shape_299.setTransform(1247.35,1035.175);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgRgVQgRgUglAAQgqAAgaAbQgZAZAAAtIAADDIhHAAIAAntIBHAAIAADMQARgeAdgPQAegPAkAAQB6AAAACJIAADUg");
	this.shape_300.setTransform(1218.775,1035.225);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FFFFFF").s().p("AhYCbQgmgVgVgpQgUgmAAg3QAAg2AUgnQAVgoAmgWQAlgVAzgBQAzABAmAVQAmAWAUAoQAVApAAA0QAAA2gVAnQgUApgmAVQgnAXgyAAQgxAAgngXgAhGhZQgaAfAAA6QAAA8AZAeQAZAfAuABQAvgBAZgfQAZgeAAg8QAAg5gZggQgagfguAAQgtAAgZAfg");
	this.shape_301.setTransform(1160.35,1042.65);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FFFFFF").s().p("AgTDAQghghABg9IAAikIhDAAIAAg3IBDAAIAAhnIBGAAIAABnIBdAAIAAA3IhdAAIAAChQAABLBEAAQATAAANgCIgEA2QgRADgTAAQhCAAggghg");
	this.shape_302.setTransform(1128.2,1037.925);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#FFFFFF").s().p("AimDuIAAnSIBGAAIAAA3QAPgeAegRQAdgRAmAAQAsAAAjAWQAiAWATApQATAoAAA2QAAA1gSAmQgUApgiAVQgjAWgsAAQgmAAgdgRQgdgQgQgfIAAC5gAhHiVQgZAgAAA6QAAA5AZAgQAZAfAuAAQAtAAAZgfQAZgfAAg5QABg6gaggQgagggsgBQguABgZAfg");
	this.shape_303.setTransform(1077.7,1048.7);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBRAAIAABJg");
	this.shape_304.setTransform(1047.575,1035.175);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#FFFFFF").s().p("ABSD3IAAjRQAAgrgRgUQgRgUgkAAQgrAAgZAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQASgdAdgQQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_305.setTransform(1019.025,1035.225);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#FFFFFF").s().p("AiMCGIAXgzQA0ApBFAAQAiAAASgMQATgMgBgUQABgTgMgKQgNgLgegHIg3gNQgugKgYgXQgXgYABgkQAAguAlgdQAlgdA9AAQAmAAAeAMQAhALAZAVIgXAyQgxgog2AAQggAAgTANQgSANAAAVQAAASALALQANAKAYAGIA6ANQAwALAYAXQAYAYAAAlQAAAvgmAbQgmAbg/AAQhYAAg2gsg");
	this.shape_306.setTransform(981.8,1042.65);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBFAAIAAA7QAag9BUgGIAXgBIAFA7IgrAFQgzAFgUAZQgXAaAAAoIAAC9g");
	this.shape_307.setTransform(936.25,1042.4);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#FFFFFF").s().p("AhXCbQgmgVgWgpQgUgnAAg2QAAg0AUgpQAWgoAmgWQAlgVAygBQAyABAmAVQAmAWAWAoQAUApAAA0QAAA2gUAnQgWApgmAVQgmAXgyAAQgxAAgmgXgAhHhZQgYAgAAA5QAAA8AYAeQAZAfAuABQAugBAagfQAZgegBg8QAAg5gZggQgZgfguAAQgtAAgaAfg");
	this.shape_308.setTransform(901.2,1042.65);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#FFFFFF").s().p("AgTDAQghghAAg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgEA2QgRADgTAAQhCAAggghg");
	this.shape_309.setTransform(850.6,1037.925);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#FFFFFF").s().p("AhYCbQgmgVgUgpQgVgnAAg2QAAg0AVgpQAUgoAmgWQAmgVAygBQAzABAmAVQAmAXAVAnQAUAnAAA2QAAA3gUAmQgVAogmAWQgnAXgyAAQgxAAgngXgAhGhZQgaAfAAA6QAAA8AZAeQAZAfAuABQAvgBAZgfQAZgeAAg8QAAg6gagfQgZgfguAAQgtAAgZAfg");
	this.shape_310.setTransform(818.65,1042.65);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#FFFFFF").s().p("AinDuIAAnSIBHAAIAAA3QAPgdAegSQAdgRAmAAQAsAAAjAWQAjAWASApQAUApAAA1QAAA0gTAnQgTAogjAWQgjAWgsAAQgmAAgdgRQgegQgPgfIAAC5gAhHiVQgZAfAAA7QAAA6AZAfQAZAfAuAAQAuAAAYgfQAageAAg6QAAg6gaggQgagggsgBQguABgZAfg");
	this.shape_311.setTransform(779.225,1048.7);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg0AVgoQAUgpAmgWQAlgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgnIAWAyQgZAVgiALQgjAMglABQhQgBgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgnAAgZAag");
	this.shape_312.setTransform(739.075,1042.65);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#FFFFFF").s().p("AjTD3IAAntICtAAQB2AABCBBQBCA/AAB2QAAB2hCBAQhBBBh3AAgAiLC6IBgAAQC2AAgBi6QABi6i2AAIhgAAg");
	this.shape_313.setTransform(695.25,1035.225);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAWgpAkgWQAmgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjwAAQAHBsBkAAQA5AAAxgnIAWAyQgZAVgiALQgjAMglABQhQgBgwgugAg2hjQgZAagEAvICzAAQgCgwgXgZQgVgagpAAQgnAAgYAag");
	this.shape_314.setTransform(631.35,1042.65);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#FFFFFF").s().p("AhDCbQgmgVgVgnQgVgnAAg3QAAg0AVgoQAWgpAngWQAngWAygBQAkAAAhANQAhALAWAUIgWAzQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAfQAcAfAwAAQAyABAugmIAWAzQgWAUgiALQgiAMgkABQgzAAgmgXg");
	this.shape_315.setTransform(596.725,1042.65);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#FFFFFF").s().p("ABnD4IAAkeIiRAAIAAEeIhHAAIAAkeIhCAAIAAg3IBCAAIAAgGQAAhHAlgkQAjgkBKgEIAcgBIAFA1IghACQgoADgRATQgSATAAAoIAAASIDYAAIAAFVgABiirIAAhLIBSAAIAABLg");
	this.shape_316.setTransform(556.625,1035.125);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#FFFFFF").s().p("Ag5D4IAAkeIhCAAIAAg3IBCAAIAAgGQAAhHAkgkQAkgjBKgFIAfgBIAEA1IggACQgqADgTATQgSAUAAAoIAAARIBeAAIAAA3IheAAIAAEeg");
	this.shape_317.setTransform(527.375,1035.125);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#FFFFFF").s().p("Ah5DdQgzgfgcg4Qgcg5AAhNQAAhLAcg7QAcg5AzgeQA0geBFAAQBHAAAzAeQA0AfAcA4QAbA5AABNQAABNgbA5QgcA4g0AfQg0AfhGAAQhFAAg0gfgAhyiPQgpAzAABcQAABcApAzQApAyBJAAQBKAAApgyQAqgzAAhcQAAhcgpgzQgpgyhLAAQhJAAgpAyg");
	this.shape_318.setTransform(487.525,1035.225);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_319.setTransform(1745.375,951.225);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#FFFFFF").s().p("AhVCkQgcgOgPgYQgQgaAAgdQAAglAUgWQASgUAtgJQAsgJBNAAIAQAAIAAgVQAAgmgQgSQgQgSgmAAQg4AAg7AkIgVgxQAdgUAlgLQAlgMAlAAQBFAAAgAjQAiAiAABGIAADTIhEAAIAAg5QgNAegaAQQgbAPgiAAQggAAgegNgAgUASQgcAFgNALQgNANAAAUQAAAZASARQASAQAcAAQAlAAAZgaQAZgbgBgpIAAgSIgMAAQg2AAgeAFg");
	this.shape_320.setTransform(1717.7,958.65);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#FFFFFF").s().p("AhDCcQgngXgUgnQgVgnAAg1QABg1AUgoQAXgpAmgWQAngXAyAAQAkAAAiAMQAfALAXAWIgWAyQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAgQAcAeAwAAQAyAAAuglIAWAzQgWAUgiALQghAMglAAQgzABgmgWg");
	this.shape_321.setTransform(1683.4,958.65);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#FFFFFF").s().p("AhYCcQgmgWgVgpQgUgoAAg1QAAg0AUgpQAWgpAlgVQAmgWAyAAQAyAAAmAWQAmAVAWApQAUApAAA0QAAA1gUAoQgWApgmAWQgmAWgygBQgxABgngWgAhHhZQgYAgAAA5QgBA9AZAeQAZAeAuAAQAuAAAageQAZgfgBg8QAAg5gZggQgZgfguAAQgtAAgaAfg");
	this.shape_322.setTransform(1645.95,958.65);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_323.setTransform(1617.7,951.225);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAVgpAmgWQAlgXAvAAQBFAAAnAtQAoAtAABPIAAAVIjwAAQAHBtBjAAQA6AAAxgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAagFAvICzAAQgCgwgWgZQgWgagoAAQgoAAgYAag");
	this.shape_324.setTransform(1572.325,958.65);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgSgVQgQgUglAAQgqAAgaAbQgaAaAAAsIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_325.setTransform(1533.675,951.225);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#FFFFFF").s().p("AgTDAQghghABg9IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgRADgTAAQhCAAggghg");
	this.shape_326.setTransform(1501.05,953.925);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#FFFFFF").s().p("AgTDAQghghAAg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_327.setTransform(1457.85,953.925);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#FFFFFF").s().p("AhVCkQgcgOgPgYQgQgaAAgdQAAglAUgWQASgUAtgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgQgSglAAQg5AAg7AkIgVgxQAdgUAlgLQAmgMAkAAQBEAAAhAjQAiAiAABGIAADTIhEAAIAAg5QgNAegaAQQgbAPgiAAQghAAgdgNgAgUASQgdAFgMALQgNANAAAUQAAAZASARQASAQAcAAQAlAAAZgaQAYgbAAgpIAAgSIgMAAQg2AAgeAFg");
	this.shape_328.setTransform(1426.3,958.65);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg9BTgFIAXgCIAFA7IgrAFQgzAFgVAZQgVAbAAAnIAAC9g");
	this.shape_329.setTransform(1379.3,958.4);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAVgpAmgWQAlgXAvAAQBFAAAnAtQAoAtAABPIAAAVIjwAAQAHBtBjAAQA6AAAxgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAagFAvICzAAQgCgwgWgZQgWgagoAAQgoAAgYAag");
	this.shape_330.setTransform(1345.525,958.65);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgSgVQgQgTglAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QARgfAegQQAegQAlAAQB6AAAACKIAADTg");
	this.shape_331.setTransform(1306.875,958.4);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#FFFFFF").s().p("AhXCcQgmgWgWgpQgUgoAAg1QAAg0AUgpQAWgpAmgVQAlgWAyAAQAzAAAmAWQAlAVAVApQAVApAAA0QAAA1gVAoQgVApglAWQgnAWgygBQgxABgmgWgAhGhZQgaAgAAA5QAAA7AaAgQAZAeAtAAQAvAAAZgeQAYgfAAg8QAAg6gYgfQgagfguAAQgtAAgZAfg");
	this.shape_332.setTransform(1266.9,958.65);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#FFFFFF").s().p("AhYCcQgngXgUgoQgUgnAAg2QAAg1AUgoQAUgnAngXQAmgWAyAAQAyAAAmAWQAnAWAUAoQAVAoAAA1QAAA2gVAnQgUAognAXQgmAWgygBQgyABgmgWgAhHhZQgZAgAAA5QAAA7AZAgQAZAeAuAAQAuAAAZgeQAZggAAg7QABg5gaggQgZgfguAAQguAAgZAfg");
	this.shape_333.setTransform(1227.45,958.65);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQASgMAAgUQAAgTgMgLQgMgKgegHIg4gMQgugLgWgXQgYgXAAglQAAguAmgdQAlgcA8gBQAmAAAgAMQAgALAYAWIgVAxQgzgng2gBQggAAgRANQgTANAAAVQAAASAMAKQALALAZAGIA5AOQAxAKAYAXQAXAXAAAmQAAAuglAbQgmAbg/AAQhYAAg1grg");
	this.shape_334.setTransform(1190.725,958.65);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgRgVQgRgUglAAQgqAAgaAbQgaAaAAAsIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_335.setTransform(1135.375,951.225);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#FFFFFF").s().p("AhDCcQgngXgUgnQgUgngBg1QAAg1AWgoQAVgpAngWQAngXAyAAQAlAAAgAMQAgALAWAWIgVAyQgugmgyAAQgwAAgbAgQgcAfAAA6QAAA5AbAgQAcAeAwAAQAxAAAvglIAVAzQgVAUgiALQgiAMglAAQgyABgmgWg");
	this.shape_336.setTransform(1099.05,958.65);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAWgpAlgWQAlgXAvAAQBGAAAmAtQAoAtAABPIAAAVIjxAAQAJBtBjAAQA6AAAwgmIAVAxQgWAUgkAMQgjAMgkAAQhQABgxgwgAg3hjQgYAagFAvICzAAQgBgwgXgZQgWgagoAAQgoAAgYAag");
	this.shape_337.setTransform(1062.85,958.65);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#FFFFFF").s().p("AgTDAQggggAAg+IAAikIhDAAIAAg3IBDAAIAAhnIBGAAIAABnIBdAAIAAA3IhdAAIAAChQAABLBEAAQATAAANgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_338.setTransform(1031.9,953.925);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#FFFFFF").s().p("AiMCGIAXgzQA0AoBFAAQAhAAATgLQATgMgBgUQAAgTgLgLQgOgKgdgHIg4gMQgtgLgYgXQgWgYAAgkQAAguAlgdQAlgcA9gBQAlAAAgAMQAgALAZAWIgXAxQgxgng2gBQggAAgTANQgSAMAAAWQAAASALAKQAMALAaAGIA5AOQAxAKAXAXQAYAYAAAlQAAAugmAbQgmAbg/AAQhYAAg2grg");
	this.shape_339.setTransform(984.15,958.65);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBRAAIAABJg");
	this.shape_340.setTransform(958.925,951.175);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#FFFFFF").s().p("ABSD3IAAjRQAAgrgRgUQgRgUgkAAQgrAAgZAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQASgdAdgQQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_341.setTransform(930.375,951.225);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#FFFFFF").s().p("AimDuIAAnTIBGAAIAAA5QAPgfAegSQAdgQAlAAQAtAAAjAWQAiAXAUApQASAoAAA1QAAA2gSAmQgTAngjAWQgjAWgtAAQglAAgdgRQgegQgPgfIAAC5gAhHiVQgZAgAAA5QAAA6AZAfQAZAgAuAAQAtAAAZggQAZgeAAg5QABg6gaggQgaghgsABQgugBgZAgg");
	this.shape_342.setTransform(871.95,964.7);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#FFFFFF").s().p("AiWAkIAAjQIBHAAIAADPQAAApARAUQASAUAiAAQAoAAAZgbQAZgbAAgsIAAi+IBHAAIAAFUIhFAAIAAg3QgRAdgcAQQgdAPghAAQh9AAAAiJg");
	this.shape_343.setTransform(830.25,959.075);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#FFFFFF").s().p("ABHD3IihihIAAChIhGAAIAAntIBGAAIAAExICWiYIBXAAIihCjICvCxg");
	this.shape_344.setTransform(776.8,951.225);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#FFFFFF").s().p("AhDCcQgmgWgVgoQgVgnAAg1QAAg1AWgoQAUgoAogXQAngXAzAAQAjAAAiAMQAgALAWAWIgWAyQgugmgyAAQgwAAgbAgQgcAgAAA5QAAA5AbAgQAbAeAxAAQAyAAAuglIAWAzQgXAVghAKQgiAMgkAAQgzABgmgWg");
	this.shape_345.setTransform(739.675,958.65);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#FFFFFF").s().p("AgiD3IAAlUIBFAAIAAFUgAgoitIAAhJIBQAAIAABJg");
	this.shape_346.setTransform(713.5,951.175);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#FFFFFF").s().p("AinDuIAAnTIBHAAIAAA5QAPgfAegSQAdgQAmAAQAsAAAjAWQAjAXASApQAUAoAAA1QAAA0gTAoQgTAngjAWQgjAWgsAAQgmAAgdgRQgegQgPgfIAAC5gAhHiVQgZAfAAA6QAAA8AZAdQAZAgAuAAQAuAAAYggQAagdAAg6QAAg6gaggQgaghgsABQgugBgZAgg");
	this.shape_347.setTransform(685.325,964.7);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgRgVQgRgTglAAQgqgBgaAbQgZAaAAAuIAADBIhHAAIAAlVIBFAAIAAA3QARgfAegQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_348.setTransform(625.075,958.4);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#FFFFFF").s().p("AhVCkQgcgOgPgYQgQgaAAgdQAAglAUgWQATgUAsgJQAtgJBMAAIAQAAIAAgVQAAgmgQgSQgQgSgmAAQg4AAg7AkIgVgxQAdgUAmgLQAlgMAkAAQBEAAAiAjQAhAiAABGIAADTIhEAAIAAg5QgMAdgbARQgbAPgiAAQggAAgegNgAgTASQgeAFgMALQgNANAAAUQAAAZASARQASAQAcAAQAlAAAZgaQAZgagBgqIAAgSIgMAAQg3AAgcAFg");
	this.shape_349.setTransform(585.6,958.65);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#FFFFFF").s().p("AhDCcQgmgWgVgoQgVgoAAg0QAAg1AWgoQAVgpAngWQAngXAyAAQAkAAAhAMQAhALAWAWIgWAyQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAgQAcAeAwAAQAyAAAuglIAWAzQgWAUgiALQgiAMgkAAQgzABgmgWg");
	this.shape_350.setTransform(551.325,958.65);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBEAAIAAA8QAcg9BTgFIAXgCIAFA7IgqAFQgzAFgVAZQgWAaAAAoIAAC9g");
	this.shape_351.setTransform(504.8,958.4);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAWAxQgZAVgiALQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_352.setTransform(471.025,958.65);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#FFFFFF").s().p("AgTDAQgggggBg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgDA2QgSADgTAAQhCAAggghg");
	this.shape_353.setTransform(440.1,953.925);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg1AVgnQATgpAmgWQAmgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjxAAQAIBtBjAAQA7AAAvgmIAWAxQgYAVgiALQgkAMgkAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgXgagnAAQgnAAgZAag");
	this.shape_354.setTransform(409.65,958.65);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#FFFFFF").s().p("Ai4D3IAAntIDLAAQBPAAArAnQAsAmAABHQAABGgsAmQgrAnhPAAIiDAAIAADGgAhwgIIB8AAQBnAAAAhaQAAhahnAAIh8AAg");
	this.shape_355.setTransform(370.875,951.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289}]},299).wait(757));

	// Layer_6
	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBEAAIAAA7QAbg9BUgGIAXgBIAFA7IgrAFQgyAFgWAZQgWAaABAoIAAC9g");
	this.shape_356.setTransform(1581.15,1042.4);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#FFFFFF").s().p("AhrCDQgwgvAAhTQAAgzAVgpQAUgpAmgWQAlgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjxAAQAJBsBiAAQA7AAAwgnIAWAyQgZAVgiALQgjAMglABQhQgBgvgugAg2hjQgZAagFAvICzAAQgCgwgWgZQgVgagpAAQgoAAgXAag");
	this.shape_357.setTransform(1547.35,1042.65);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#FFFFFF").s().p("AgSDAQgiggAAg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQABBLBFAAQASAAANgCIgDA2QgSADgSAAQhDAAgfghg");
	this.shape_358.setTransform(1516.4,1037.925);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#FFFFFF").s().p("AiWAkIAAjQIBHAAIAADPQAAApARAUQAQAUAkAAQAoAAAZgbQAYgaABgtIAAi+IBHAAIAAFUIhGAAIAAg3QgPAdgdAQQgdAPghAAQh9AAAAiJg");
	this.shape_359.setTransform(1484.1,1043.075);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#FFFFFF").s().p("AinDuIAAnSIBHAAIAAA3QAPgeAegRQAdgRAmAAQAsAAAiAWQAiAWAUApQAUApAAA1QAAA0gTAnQgTAogjAWQgjAWgsAAQgmAAgdgRQgdgQgQgfIAAC5gAhHiVQgZAgAAA6QAAA5AZAgQAZAfAuAAQAtAAAZgfQAZgeAAg6QAAg6gZggQgagggsgBQguABgZAfg");
	this.shape_360.setTransform(1444.575,1048.7);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#FFFFFF").s().p("AC3CvIAAjRQgBgrgPgUQgOgUgiAAQgnAAgWAbQgXAbAAAtIAADBIhFAAIAAjRQAAgrgQgUQgPgUggAAQgpAAgVAbQgXAbAAAtIAADBIhHAAIAAlUIBGAAIAAAzQAQgdAbgPQAbgQAkAAQBOAAAXBBQAQgeAegRQAfgSAlAAQBzAAABCKIAADTg");
	this.shape_361.setTransform(1392.8,1042.4);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#FFFFFF").s().p("AhYCbQgmgVgUgpQgVgnAAg2QAAg0AVgpQAUgoAmgWQAngVAxgBQAzABAmAVQAnAXATAnQAVAnAAA2QAAA3gVAmQgTAognAWQgmAXgzAAQgxAAgngXgAhGhZQgaAfAAA6QAAA8AZAeQAZAfAuABQAvgBAZgfQAZgeAAg8QAAg6gagfQgZgfguAAQgtAAgZAfg");
	this.shape_362.setTransform(1342.8,1042.65);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#FFFFFF").s().p("AhDCbQgmgVgVgnQgVgoAAg2QAAgzAWgpQAUgpAogWQAngWAzgBQAjAAAiANQAgAKAWAVIgWAzQgugmgyAAQgwAAgbAgQgcAgAAA5QAAA6AbAeQAbAfAxAAQAyABAugmIAWAzQgXAVghAKQgiAMgkABQgzAAgmgXg");
	this.shape_363.setTransform(1306.975,1042.65);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhZD0IhBAAIiClVIBKAAIBcEAIBdkAIA2AAIBdEBIBdkBIBGAAIiDFVg");
	this.shape_364.setTransform(1241.125,1042.825);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg1AVgnQAUgpAlgWQAmgWAugBQBGAAAoAtQAnAtAABPIAAAWIjxAAQAIBsBjAAQA7AAAwgnIAVAyQgYAVgiALQgjAMgkABQhRgBgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_365.setTransform(1193.45,1042.65);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#FFFFFF").s().p("ABSCvIAAjPQAAgtgRgUQgRgTgkgBQgrAAgZAbQgaAaAAAtIAADCIhGAAIAAlUIBFAAIAAA2QASggAdgPQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_366.setTransform(1154.825,1042.4);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1ApBFAAQAiAAASgMQATgNAAgTQAAgTgNgKQgMgLgegHIg4gNQgtgKgXgXQgXgXAAglQAAgvAlgcQAlgdA8AAQAmAAAgAMQAfALAZAVIgVAyQgygog3AAQggAAgRANQgTAMAAAWQAAASAMALQALAKAZAGIA5ANQAxAKAYAYQAXAXAAAmQAAAvglAbQgmAbg/AAQhYAAg1gsg");
	this.shape_367.setTransform(1099.125,1042.65);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgnitIAAhJIBQAAIAABJg");
	this.shape_368.setTransform(1073.9,1035.175);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgSgVQgQgUglAAQgqAAgaAbQgaAaAAAsIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_369.setTransform(1045.325,1035.225);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#FFFFFF").s().p("ABTCvIAAjPQAAgsgSgVQgQgTglgBQgqAAgaAbQgaAbAAAsIAADCIhGAAIAAlUIBFAAIAAA2QARggAegPQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_370.setTransform(986.525,1042.4);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#FFFFFF").s().p("AhYCbQgmgVgUgpQgVgnAAg2QAAg0AVgpQAUgoAmgWQAmgVAygBQAyABAmAVQAmAWAWAoQAUApAAA0QAAA2gUAnQgWApgmAVQgmAXgyAAQgxAAgngXgAhHhZQgZAgABA5QgBA8AZAeQAZAfAuABQAvgBAZgfQAZgegBg8QABg6gagfQgZgfguAAQgtAAgaAfg");
	this.shape_371.setTransform(946.55,1042.65);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgpAAg0QAAg1ATgoQATgnAjgWQAigWAtAAQAlAAAdARQAdAQAQAeIAAjOIBGAAIAAHsIhGAAIAAg7QgPAfgdARQgdAQgmAAQgsAAgjgWgAhFgRQgaAeAAA6QAAA5AaAgQAaAhAtAAQAuAAAZgfQAYgfAAg7QAAg7gYgeQgZgfguAAQguAAgZAfg");
	this.shape_372.setTransform(886.625,1035.475);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg1AVgnQATgpAmgWQAmgWAvgBQBFAAAoAtQAnAtAABPIAAAWIjxAAQAIBsBjAAQA7AAAvgnIAXAyQgZAVgjALQgiAMglABQhQgBgwgugAg2hjQgZAZgFAwICzAAQgCgvgWgaQgVgagpAAQgoAAgXAag");
	this.shape_373.setTransform(848.5,1042.65);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_374.setTransform(821.425,1035.225);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#FFFFFF").s().p("AgjD3IAAntIBHAAIAAHtg");
	this.shape_375.setTransform(804.5,1035.225);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#FFFFFF").s().p("AhUCjQgdgNgPgYQgQgZAAgeQAAglATgWQAUgUAsgJQAtgJBNAAIAQAAIAAgUQAAgogRgRQgQgRglAAQg5gBg7AkIgVgyQAdgTAlgLQAmgMAkAAQBEABAiAhQAhAjAABGIAADSIhEAAIAAg4QgNAdgbAQQgaAQghABQghgBgdgOgAgTARQgeAGgMALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgaQAZgbAAgpIAAgSIgNAAQg2AAgdAEg");
	this.shape_376.setTransform(776.8,1042.65);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#FFFFFF").s().p("AgSDAQghgggBg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQABBLBFAAQARAAAOgCIgDA2QgSADgSAAQhDAAgfghg");
	this.shape_377.setTransform(746.2,1037.925);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1ApBFAAQAiAAASgMQATgMAAgUQAAgTgNgKQgMgLgegHIg4gNQgtgKgXgXQgXgXAAglQAAguAlgdQAlgdA8AAQAmAAAgAMQAhAMAXAUIgVAyQgygog3AAQggAAgRANQgTAMAAAWQAAASAMALQALAKAZAGIA5ANQAxAKAYAYQAXAXAAAmQAAAvglAbQgmAbg/AAQhYAAg1gsg");
	this.shape_378.setTransform(717.275,1042.65);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#FFFFFF").s().p("ABTCvIAAjPQAAgsgSgVQgRgTgkgBQgqAAgaAbQgaAbAAAsIAADCIhGAAIAAlUIBFAAIAAA2QASggAdgPQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_379.setTransform(680.425,1042.4);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgoitIAAhJIBRAAIAABJg");
	this.shape_380.setTransform(651.725,1035.175);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#FFFFFF").s().p("AhkAcIAAg3IDJAAIAAA3g");
	this.shape_381.setTransform(628.25,1041.225);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAVgpQAVgpAkgWQAmgWAvgBQBEAAApAtQAnAtAABPIAAAWIjxAAQAJBsBiAAQA7AAAwgnIAWAyQgZAVgiALQgjAMglABQhQgBgwgugAg2hjQgZAagEAvICzAAQgDgwgWgZQgVgagpAAQgnAAgYAag");
	this.shape_382.setTransform(593.9,1042.65);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#FFFFFF").s().p("AhnCvIAAlUIBEAAIAAA7QAcg9BTgGIAXgBIAFA7IgrAFQgyAFgVAZQgXAaAAAoIAAC9g");
	this.shape_383.setTransform(565.75,1042.4);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FFFFFF").s().p("AinDuIAAnSIBHAAIAAA3QAPgdAegSQAegRAlAAQAsAAAjAWQAjAWASApQAUApAAA1QAAA0gTAnQgTAogjAWQgjAWgsAAQglAAgegRQgegQgPgfIAAC5gAhHiVQgZAfAAA7QAAA6AZAfQAZAfAuAAQAuAAAYgfQAageAAg6QAAg6gaggQgZgggtgBQguABgZAfg");
	this.shape_384.setTransform(530.725,1048.7);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgMAAgUQAAgTgNgLQgMgKgegHIg4gMQgtgLgXgXQgXgXAAglQAAguAlgdQAmgcA7gBQAmAAAgAMQAhALAXAWIgVAxQgygng3gBQgfAAgSANQgTAMAAAWQAAASAMAKQALALAZAGIA6AOQAwAJAYAYQAXAXAAAmQAAAuglAbQglAbhAAAQhYAAg1grg");
	this.shape_385.setTransform(1581.125,958.65);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FFFFFF").s().p("AgTDAQghggABg+IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQASAAAOgCIgEA2QgSADgSAAQhDAAgfghg");
	this.shape_386.setTransform(1552,953.925);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgSgVQgRgTgkAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QASgfAdgQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_387.setTransform(1519.575,958.4);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#FFFFFF").s().p("AhVCkQgbgOgQgYQgQgaAAgdQAAglAUgWQASgUAtgJQAsgJBNAAIAQAAIAAgVQAAgmgQgSQgQgSgmAAQg4AAg7AkIgVgxQAcgUAmgLQAmgMAkAAQBFAAAgAjQAiAiAABGIAADTIhEAAIAAg5QgNAegaAQQgbAPgiAAQghAAgdgNgAgUASQgcAFgNALQgNAMAAAVQAAAZASARQASAQAbAAQAnAAAXgaQAZgaAAgqIAAgSIgMAAQg3AAgdAFg");
	this.shape_388.setTransform(1480.1,958.65);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhZD0IhBAAIiClVIBKAAIBcEAIBdkAIA2AAIBdEBIBdkBIBGAAIiDFVg");
	this.shape_389.setTransform(1432.775,958.825);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg1AUgnQAVgpAmgWQAlgXAuAAQBFAAAoAtQAoAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAVAxQgYAVgiALQgkAMgkAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgXgagnAAQgnAAgZAag");
	this.shape_390.setTransform(1366.15,958.65);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgrgRgUQgRgUglAAQgqAAgaAbQgZAZAAAtIAADDIhHAAIAAntIBHAAIAADMQARgeAegPQAdgPAkAAQB6AAAACJIAADUg");
	this.shape_391.setTransform(1327.475,951.225);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAVgpAmgWQAlgXAvAAQBEAAAoAtQAoAtAABPIAAAVIjxAAQAJBtBiAAQA7AAAwgmIAVAxQgYAUgiAMQgjAMgkAAQhRABgwgwgAg3hjQgYAagFAvICzAAQgBgwgXgZQgWgagoAAQgoAAgYAag");
	this.shape_392.setTransform(1270.3,958.65);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAag9BUgFIAXgCIAFA7IgrAFQgzAFgVAZQgVAbgBAnIAAC9g");
	this.shape_393.setTransform(1242.15,958.4);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#FFFFFF").s().p("AhVCkQgcgPgQgXQgPgZAAgeQAAglATgWQATgUAtgJQAtgJBMAAIAQAAIAAgVQAAgmgRgSQgPgSgmAAQg5AAg6AkIgVgxQAcgUAmgLQAlgMAlAAQBFAAAgAjQAiAiAABGIAADTIhEAAIAAg5QgNAegaAQQgbAPgiAAQghAAgdgNgAgTASQgeAFgMALQgNAMAAAVQAAAZASARQARAQAdAAQAlAAAZgaQAYgaAAgqIAAgSIgMAAQg3AAgcAFg");
	this.shape_394.setTransform(1207.6,958.65);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhZD0IhBAAIiClVIBKAAIBcEAIBdkAIA2AAIBdEBIBdkBIBGAAIiDFVg");
	this.shape_395.setTransform(1160.275,958.825);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#FFFFFF").s().p("AgTDAQggghgBg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQABBLBFAAQASAAANgCIgDA2QgRADgUAAQhCAAggghg");
	this.shape_396.setTransform(1117.7,953.925);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#FFFFFF").s().p("Ag5D4IAAkeIhCAAIAAg3IBCAAIAAgGQAAhHAkgkQAkgjBKgFIAfgBIAEA1IggACQgqADgSATQgTAUAAAoIAAARIBeAAIAAA3IheAAIAAEeg");
	this.shape_397.setTransform(1096.025,951.125);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#FFFFFF").s().p("AhYCcQgmgWgVgpQgUgoAAg1QAAg0AUgpQAVgpAmgVQAngWAxAAQAzAAAmAWQAlAVAVApQAVApAAA0QAAA1gVAoQgVApglAWQgnAWgygBQgxABgngWgAhGhZQgaAgAAA5QAAA8AZAfQAaAeAtAAQAvAAAZgeQAZgeAAg9QAAg5gZggQgagfguAAQgtAAgZAfg");
	this.shape_398.setTransform(1063.6,958.65);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgMAAgUQAAgTgNgLQgMgKgegHIg4gMQgtgLgXgXQgXgXAAglQAAguAlgdQAmgcA7gBQAmAAAgAMQAhALAXAWIgVAxQgygng3gBQgfAAgSANQgTAMAAAWQAAATAMAJQALALAZAGIA6AOQAwAJAYAYQAXAXAAAmQAAAuglAbQglAbhAAAQhYAAg1grg");
	this.shape_399.setTransform(1026.875,958.65);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#FFFFFF").s().p("AhrCCQgwgvAAhSQAAgzAVgpQAUgpAlgWQAmgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjxAAQAJBtBiAAQA7AAAwgmIAWAxQgZAUgiAMQgjAMglAAQhRABgugwgAg2hjQgZAagFAvICzAAQgBgwgXgZQgVgagpAAQgoAAgXAag");
	this.shape_400.setTransform(973.15,958.65);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgSgVQgRgUgkAAQgqAAgaAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_401.setTransform(934.525,951.225);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#FFFFFF").s().p("AgTDAQghghAAg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgEA2QgQADgUAAQhCAAggghg");
	this.shape_402.setTransform(901.9,953.925);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgNAAgTQAAgTgNgLQgMgKgegHIg4gMQgtgLgXgXQgXgXAAglQAAguAlgdQAlgcA8gBQAmAAAgAMQAfALAZAWIgVAxQgygng3gBQggAAgRANQgTAMAAAWQAAATAMAJQALALAZAGIA5AOQAxAJAYAYQAXAXAAAmQAAAuglAbQgmAbg/AAQhYAAg1grg");
	this.shape_403.setTransform(854.125,958.65);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#FFFFFF").s().p("AgSDAQghgggBg+IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQABBLBFAAQARAAAOgCIgDA2QgSADgSAAQhDAAgfghg");
	this.shape_404.setTransform(824.95,953.925);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#FFFFFF").s().p("AhDCcQgmgWgVgoQgVgoAAg0QAAg1AWgoQAVgpAngWQAngXAyAAQAkAAAhAMQAhAMAWAVIgWAyQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAgQAcAeAwAAQAyAAAuglIAWAzQgWAUgiALQgiAMgkAAQgzABgmgWg");
	this.shape_405.setTransform(796.425,958.65);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAg0AVgoQAUgpAmgWQAlgXAvAAQBFAAAoAtQAnAtAABPIAAAVIjwAAQAHBtBjAAQA7AAAwgmIAVAxQgXAUgjAMQgjAMglAAQhQABgwgwgAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgoAAgYAag");
	this.shape_406.setTransform(760.225,958.65);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_407.setTransform(733.175,951.225);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#FFFFFF").s().p("AhsCCQgvgvAAhSQAAgzAUgpQAWgpAlgWQAlgXAuAAQBFAAAoAtQAoAtAABPIAAAVIjwAAQAHBtBkAAQA6AAAwgmIAVAxQgYAVgjALQgiAMgkAAQhRABgwgwgAg3hjQgYAagEAvICyAAQgCgvgWgaQgWgagoAAQgnAAgZAag");
	this.shape_408.setTransform(706.25,958.65);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgMAAgUQAAgTgNgLQgMgKgegHIg4gMQgtgLgXgXQgXgXAAglQAAguAlgdQAmgcA7gBQAmAAAgAMQAhALAXAWIgVAxQgygng3gBQgfAAgSANQgTAMAAAWQAAATAMAJQALALAZAGIA5AOQAxAJAYAYQAXAXAAAmQAAAuglAbQgmAbg/AAQhYAAg1grg");
	this.shape_409.setTransform(670.725,958.65);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgpAAg0QAAg1ATgoQATgnAjgWQAhgWAuAAQAlAAAdARQAdAQAQAeIAAjOIBGAAIAAHsIhGAAIAAg7QgPAfgdARQgdAQgmAAQgsAAgjgWgAhFgRQgaAeAAA6QAAA5AaAgQAaAhAtAAQAtAAAagfQAYgfAAg7QAAg7gYgeQgagfgtAAQguAAgZAfg");
	this.shape_410.setTransform(613.775,951.475);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#FFFFFF").s().p("ABTCvIAAjQQAAgrgSgVQgQgTglAAQgqgBgaAbQgaAbAAAtIAADBIhGAAIAAlVIBFAAIAAA3QARgfAegQQAdgQAmAAQB6AAAACKIAADTg");
	this.shape_411.setTransform(574.025,958.4);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#FFFFFF").s().p("ACyD3Ig0h6Ij5AAIg1B6IhJAAIDcntIA7AAIDcHtgAhjBDIDIAAIhkjog");
	this.shape_412.setTransform(528.1,951.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356}]},299).wait(757));

	// Layer_5
	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgpAAg0QAAg1ATgoQATgnAigWQAigWAuAAQAlAAAdARQAdAQAQAeIAAjOIBGAAIAAHsIhGAAIAAg7QgQAggdAQQgdAQglAAQgtAAgigWgAhFgRQgaAeAAA6QAAA5AaAhQAaAgAsAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgtAAgZAfg");
	this.shape_413.setTransform(1700.875,995.725);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAVgpAmgWQAlgWAvAAQBFAAAnAsQAoAtAABPIAAAWIjwAAQAHBsBjAAQA6AAAxgmIAVAxQgWAUgkANQgjAMglgBQhQAAgwgugAg3hjQgYAagFAvICzAAQgCgwgWgZQgWgagoAAQgoAAgYAag");
	this.shape_414.setTransform(1662.725,1002.9);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAg0AUgoQAVgpAmgWQAlgWAuAAQBFAAAoAsQAoAsAABQIAAAWIjwAAQAHBsBkAAQA6AAAwgmIAVAxQgXAUgkANQgiAMglgBQhQAAgwgugAg3hjQgYAZgFAwICzAAQgCgwgWgZQgXgagnAAQgoAAgYAag");
	this.shape_415.setTransform(1625.7,1002.9);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#FFFFFF").s().p("ABSCvIAAjPQAAgtgRgTQgRgVgkABQgrAAgYAaQgaAaAAAtIAADCIhHAAIAAlVIBFAAIAAA3QAQgeAfgRQAegQAlAAQB6AAAACKIAADTg");
	this.shape_416.setTransform(1587.05,1002.65);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_417.setTransform(1539.825,995.475);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#FFFFFF").s().p("AgjD3IAAntIBGAAIAAHtg");
	this.shape_418.setTransform(1522.9,995.475);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#FFFFFF").s().p("AgjD3IAAlUIBGAAIAAFUgAgnitIAAhJIBQAAIAABJg");
	this.shape_419.setTransform(1506,995.425);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#FFFFFF").s().p("ABaCrIhaj0IhaD0IhAAAIiClVIBJAAIBdEAIBdkAIA3AAIBcEBIBdkBIBGAAIiDFVg");
	this.shape_420.setTransform(1467.85,1003.075);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAVgpQAUgpAlgWQAmgWAvAAQBEAAApAsQAnAsAABQIAAAWIjxAAQAJBsBiAAQA7AAAwgmIAWAxQgXAUglANQgiAMglgBQhQAAgwgugAg2hjQgZAagFAvICzAAQgBgwgXgZQgVgagpAAQgoAAgXAag");
	this.shape_421.setTransform(1401.2,1002.9);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#FFFFFF").s().p("ABSD3IAAjRQAAgrgRgUQgRgUgkAAQgrAAgZAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQASgdAdgQQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_422.setTransform(1362.575,995.475);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#FFFFFF").s().p("AhfDqIA8iHIiPlLIBJAAIBqEEIBskEIBHAAIjLHSg");
	this.shape_423.setTransform(1305.7,1009.4);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#FFFFFF").s().p("AhPDlQgogMgegWIAWgzQAiAXAfAJQAeAJAjAAQBgAAAAhiIAAg1QgOAfgeARQggARglAAQgtAAgjgVQgjgVgUgnQgTglAAgyQAAgyAUgnQAUgoAigUQAigVAuAAQAmAAAdAQQAeARAQAfIAAg4IBGAAIAAE5QAABPgqAoQgqAohRgBQgqAAgpgLgAhGiZQgaAfAAA1QAAA2AaAcQAbAeAsAAQAuAAAageQAageAAg0QAAg0gaggQgageguAAQgtAAgaAeg");
	this.shape_424.setTransform(1265.625,1009.2);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#FFFFFF").s().p("AhYCcQgmgWgUgoQgVgoAAg2QAAg1AVgoQAUgoAmgWQAngVAxAAQAzAAAmAVQAlAVAVApQAVAnAAA2QAAA3gVAnQgVAoglAWQgmAVgzAAQgxAAgngVgAhGhZQgZAggBA5QAAA7AaAfQAZAgAtAAQAvAAAZggQAZgfAAg7QAAg5gZggQgZgfgvAAQgtAAgZAfg");
	this.shape_425.setTransform(1226.05,1002.9);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#FFFFFF").s().p("AgiD3IAAntIBFAAIAAHtg");
	this.shape_426.setTransform(1197.825,995.475);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#FFFFFF").s().p("AhYCcQglgWgVgoQgVgoAAg2QAAg0AVgpQAUgpAmgVQAmgVAyAAQAyAAAmAVQAnAVAVApQAUApAAA0QAAA2gUAoQgVAognAWQgmAVgyAAQgxAAgngVgAhHhZQgZAgAAA5QAAA8AZAeQAZAgAuAAQAuAAAZggQAageAAg8QAAg5gaggQgZgfguAAQgtAAgaAfg");
	this.shape_427.setTransform(1169.65,1002.9);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#FFFFFF").s().p("ABTCvIAAjPQAAgsgSgUQgRgVgkABQgrAAgZAaQgaAaAAAtIAADCIhGAAIAAlVIBFAAIAAA3QARgfAegQQAegQAlAAQB6AAAACKIAADTg");
	this.shape_428.setTransform(1129.825,1002.65);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQgBgrgQgUQgRgUglAAQgrAAgZAbQgaAZAAAtIAADDIhGAAIAAntIBGAAIAADMQASgeAegPQAdgPAkAAQB7AAAACJIAADUg");
	this.shape_429.setTransform(1089.5,995.475);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#FFFFFF").s().p("AhDCcQgmgWgVgnQgVgpAAg0QAAg1AWgoQAVgpAngWQAngWAyAAQAkAAAhALQAiAMAVAVIgWAyQgugmgyAAQgwAAgcAgQgbAfAAA6QAAA5AbAfQAbAgAxAAQAyAAAugmIAWAzQgWAUgiAMQgjALgjAAQgzAAgmgVg");
	this.shape_430.setTransform(1053.175,1002.9);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAVgpQAUgpAmgWQAlgWAvAAQBFAAAoAsQAnAtAABPIAAAWIjwAAQAHBsBjAAQA7AAAwgmIAWAxQgXAUgkANQgjAMglgBQhQAAgwgugAg3hjQgYAZgFAwICzAAQgCgwgWgZQgWgagoAAQgnAAgZAag");
	this.shape_431.setTransform(1016.975,1002.9);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#FFFFFF").s().p("AgTDAQghghAAg9IAAikIhCAAIAAg3IBCAAIAAhnIBGAAIAABnIBeAAIAAA3IheAAIAAChQAABLBGAAQARAAAOgCIgDA2QgSADgTAAQhDAAgfghg");
	this.shape_432.setTransform(986.05,998.175);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAWgpAlgWQAlgWAvAAQBFAAAnAsQAoAsAABQIAAAWIjwAAQAHBsBkAAQA6AAAwgmIAVAxQgWAUgkANQgjAMgkgBQhQAAgxgugAg3hjQgYAagFAvICzAAQgCgwgWgZQgWgagoAAQgnAAgZAag");
	this.shape_433.setTransform(936.75,1002.9);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#FFFFFF").s().p("ABTD3IAAjRQAAgqgSgVQgRgUgkAAQgqAAgaAbQgaAaAAAsIAADDIhGAAIAAntIBGAAIAADMQATgeAcgPQAdgPAlAAQB6AAAACJIAADUg");
	this.shape_434.setTransform(898.125,995.475);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#FFFFFF").s().p("AgTDAQggghAAg9IAAikIhDAAIAAg3IBDAAIAAhnIBFAAIAABnIBeAAIAAA3IheAAIAAChQAABLBFAAQATAAANgCIgDA2QgSADgTAAQhCAAggghg");
	this.shape_435.setTransform(865.5,998.175);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQATgMAAgVQAAgSgNgKQgLgLgfgHIg4gMQgtgLgXgXQgXgXAAglQAAgtAlgeQAmgcA7AAQAkAAAiALQAhALAXAWIgVAxQgygng3AAQgfAAgSAMQgTAMAAAWQAAATAMAJQALAMAZAFIA5ANQAyALAXAXQAXAXAAAmQAAAvglAaQgmAbg/AAQhYAAg1grg");
	this.shape_436.setTransform(817.725,1002.9);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBEAAIAAA8QAcg8BTgHIAXgBIAFA8IgrADQgzAGgUAaQgXAZAAAoIAAC9g");
	this.shape_437.setTransform(791,1002.65);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAWgpAlgWQAlgWAvAAQBFAAAnAsQAoAsAABQIAAAWIjwAAQAHBsBkAAQA6AAAwgmIAVAxQgWAUgkANQgjAMgkgBQhQAAgxgugAg3hjQgYAagEAvICzAAQgDgwgWgZQgWgagoAAQgnAAgZAag");
	this.shape_438.setTransform(757.2,1002.9);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#FFFFFF").s().p("AhdDjQgjgXgTgoQgTgpAAg0QAAg1ATgoQATgnAigWQAigWAtAAQAmAAAdARQAdAQAQAeIAAjOIBGAAIAAHsIhGAAIAAg7QgQAfgdARQgdAQgmAAQgsAAgigWgAhFgRQgaAeAAA6QAAA5AaAhQAaAgAsAAQAvAAAYgfQAZggAAg6QAAg6gZgfQgYgfgvAAQgtAAgZAfg");
	this.shape_439.setTransform(716.975,995.725);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#FFFFFF").s().p("AhnCvIAAlVIBFAAIAAA8QAbg8BTgHIAXgBIAFA8IgrADQgzAGgUAaQgWAZAAAoIAAC9g");
	this.shape_440.setTransform(687.675,1002.65);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#FFFFFF").s().p("AhXCcQgmgWgWgoQgUgnAAg3QAAg2AUgnQAWgpAmgVQAkgVAzAAQAzAAAmAVQAmAWAUAoQAVAoAAA1QAAA2gVAoQgUAogmAWQgnAVgyAAQgyAAglgVgAhGhZQgaAeABA7QgBA8AZAeQAZAgAuAAQAvAAAZggQAYgfAAg7QABg5gZggQgagfguAAQgtAAgZAfg");
	this.shape_441.setTransform(652.65,1002.9);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FFFFFF").s().p("AhYCcQgmgXgVgnQgUgnAAg3QAAg2AUgnQAVgoAmgWQAmgVAyAAQAzAAAmAVQAmAWAUAoQAVAoAAA1QAAA2gVAoQgUAngmAXQgnAVgyAAQgxAAgngVgAhGhZQgaAgAAA5QAAA7AZAfQAZAgAuAAQAvAAAZggQAZgfAAg7QAAg5gaggQgZgfguAAQgtAAgZAfg");
	this.shape_442.setTransform(594.7,1002.9);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#FFFFFF").s().p("AiLCGIAVgzQA1AoBFAAQAiAAASgLQASgMAAgVQAAgSgMgKQgMgLgegHIg4gMQgugLgWgXQgYgXAAglQAAgtAmgeQAlgcA8AAQAkAAAiALQAgALAYAWIgVAxQgzgng2AAQgfAAgTAMQgSANAAAVQAAASALAKQAMAMAZAFIA5ANQAyAMAXAWQAXAXAAAmQAAAvglAaQgmAbg/AAQhZAAg0grg");
	this.shape_443.setTransform(557.975,1002.9);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#FFFFFF").s().p("AgjD3IAAntIBHAAIAAHtg");
	this.shape_444.setTransform(532.7,995.475);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#FFFFFF").s().p("AhUCkQgdgOgPgZQgQgZAAgdQAAgmATgUQAUgVAsgJQAtgJBNAAIAQAAIAAgVQAAgmgRgSQgQgRglAAQg5AAg7AjIgVgyQAdgTAlgLQAngLAjAAQBEAAAiAhQAhAjAABGIAADTIhEAAIAAg6QgOAfgaAPQgaAQghAAQgjABgbgOgAgTARQgeAGgMALQgNAMAAAWQAAAYASAQQASARAcAAQAlAAAZgbQAZgbAAgoIAAgSIgNAAQg2AAgdAEg");
	this.shape_445.setTransform(505,1002.9);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#FFFFFF").s().p("AhsCDQgvgwAAhSQAAgzAUgpQAWgpAlgWQAlgWAuAAQBFAAAoAsQAoAsAABQIAAAWIjwAAQAHBsBkAAQA6AAAwgmIAVAxQgXAUgjANQgjAMgkgBQhRAAgwgugAg3hjQgYAZgFAwICzAAQgCgvgWgaQgWgagoAAQgnAAgZAag");
	this.shape_446.setTransform(449.85,1002.9);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#FFFFFF").s().p("ACKD3IAAjeIkTAAIAADeIhHAAIAAntIBHAAIAADWIETAAIAAjWIBHAAIAAHtg");
	this.shape_447.setTransform(404.625,995.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413}]},299).wait(757));

	// Layer_4
	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_448.setTransform(1349.05,1042.1);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_449.setTransform(1321.275,1045.95);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_450.setTransform(1286.825,1046.525);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#000000").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQArAAAhATQAgASASAjQASAiAAAtQAAAugSAiQgSAjggASQghATgrAAQgqAAghgTgAg8hLQgWAaAAAxQAAAzAWAbQAVAaAnAAQAoAAAVgaQAWgbAAgzQAAgxgWgaQgVgbgoAAQgnAAgVAbg");
	this.shape_451.setTransform(1252.95,1046.15);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_452.setTransform(1222.275,1046.15);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#000000").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_453.setTransform(1193.325,1046.15);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#000000").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAOAAIAAgRQABgigPgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAhgKQAigKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgQAPQgZAEgLALQgMAJAAATQAAAVAQAOQAPAOAZAAQAfAAAWgWQAUgXAAgkIAAgPIgKAAQgvAAgYAEg");
	this.shape_454.setTransform(1161.65,1046.15);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_455.setTransform(1115.725,1046.15);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#000000").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_456.setTransform(1094.125,1039.775);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#000000").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_457.setTransform(1069.625,1039.8);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_458.setTransform(1019.625,1051.35);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_459.setTransform(983.925,1046.525);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_460.setTransform(936.625,1046.15);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_461.setTransform(911.65,1042.1);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_462.setTransform(885.275,1046.15);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_463.setTransform(854.875,1046.15);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#000000").s().p("AhQDDQgdgUgRgiQgRgjAAgtQAAguARghQARgiAdgTQAdgTAnAAQAgAAAZAPQAYAOAOAZIAAixIA8AAIAAGmIg8AAIAAgyQgMAagaAOQgZAOggABQgmgBgegSgAg7gOQgWAZAAAyQAAAxAWAbQAWAcAmAAQAoAAAVgbQAVgbAAgxQAAgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_464.setTransform(806.1,1040);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#000000").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_465.setTransform(772.025,1045.95);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#000000").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAOAAIAAgRQAAgigOgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgQAPQgZAEgLALQgLAJAAATQAAAVAPAOQAPAOAZAAQAfAAAWgWQAUgXAAgkIAAgPIgKAAQgvAAgYAEg");
	this.shape_466.setTransform(738.2,1046.15);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_467.setTransform(1534.425,979.5);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_468.setTransform(1498.975,979.5);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#000000").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAigKQAhgKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALABASQAAAVAPAOQAPAPAYgBQAgABAVgYQAWgWgBgjIAAgQIgLAAQguAAgZAFg");
	this.shape_469.setTransform(1463.9,974.3);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#000000").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_470.setTransform(1406.725,974.1);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQArAAAhASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQghASgrAAQgqAAghgSgAg8hLQgWAaABAxQgBA0AWAaQAVAaAnAAQAoAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_471.setTransform(1363.9,974.3);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#000000").s().p("AhNC+QgtgagZgyQgYgwAAhCQAAhBAYgxQAZgxAtgaQAtgaA9AAQArAAAlANQAlANAaAaIgWAtQgdgYgdgLQgdgLgiAAQhBAAgkArQgjArAABOQAABPAjArQAkArBBAAQAiAAAdgLQAdgLAdgYIAWAtQgaAZglAOQglANgrAAQg9AAgtgag");
	this.shape_472.setTransform(1327.075,967.95);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#000000").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_473.setTransform(1289.275,974.675);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#000000").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_474.setTransform(1255.425,979.5);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#000000").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_475.setTransform(1211.075,974.1);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQAsAAAgASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQggASgsAAQgqAAghgSgAg8hLQgWAaABAxQgBA0AWAaQAVAaAnAAQAoAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_476.setTransform(1168.25,974.3);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#000000").s().p("AhNC+QgtgagZgyQgYgwAAhCQAAhBAYgxQAZgxAtgaQAtgaA9AAQArAAAlANQAlANAaAaIgWAtQgdgYgdgLQgdgLgiAAQhBAAgkArQgjArAABOQAABPAjArQAkArBBAAQAiAAAdgLQAdgLAdgYIAWAtQgaAZglAOQglANgrAAQg9AAgtgag");
	this.shape_477.setTransform(1131.425,967.95);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_478.setTransform(1079.125,974.3);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#000000").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_479.setTransform(1046.025,967.95);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_480.setTransform(1018.1,970.25);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#000000").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_481.setTransform(977.225,974.3);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#000000").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAiyIA8AAIAAGmIg8AAIAAgyQgNAbgZAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAVgaAAgyQAAgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_482.setTransform(944.25,968.15);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#000000").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgeAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQABAVAPAOQAQAPAYgBQAfABAWgYQAUgWABgjIAAgQIgLAAQgvAAgYAFg");
	this.shape_483.setTransform(910.9,974.3);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#000000").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQArAAAgASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQggASgrAAQgrAAghgSgAg8hLQgVAagBAxQABA0AVAaQAVAaAoAAQAnAAAVgaQAWgaAAg0QAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_484.setTransform(878.4,974.3);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#000000").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_485.setTransform(854.225,967.95);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#000000").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_486.setTransform(829.775,974.1);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#000000").s().p("ABNCSIhNjQIhMDQIg3AAIhwkjIA+AAIBQDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_487.setTransform(787.05,974.475);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#000000").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSAqAAQArAAAhASQAgATASAjQASAiAAAtQAAAugSAiQgSAjggATQghASgrAAQgqAAghgSgAg8hLQgWAaABAxQgBA0AWAaQAVAaAnAAQAoAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_488.setTransform(744.7,974.3);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#000000").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgiAdgTQAdgSAnAAQAgAAAZANQAZAOANAbIAAiyIA8AAIAAGmIg7AAIAAgyQgNAbgaAOQgZANggAAQgmABgdgUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAnAAQAnAAAVgbQAVgaABgyQgBgygVgaQgVgbgnAAQgnAAgWAbg");
	this.shape_489.setTransform(709.2,968.15);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#000000").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_490.setTransform(667.725,974.1);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_491.setTransform(638.775,974.3);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#000000").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_492.setTransform(612.3,970.25);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#000000").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_493.setTransform(585.925,974.3);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#000000").s().p("AidDTIAAmmICuAAQBDAAAlAiQAlAgAAA9QAAA8glAhQglAhhDAAIhwAAIAACpgAhfgGIBpAAQBZgBAAhNQAAhMhZAAIhpAAg");
	this.shape_494.setTransform(551.7,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448}]},209).to({state:[]},90).wait(757));

	// Layer_3
	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_495.setTransform(1444.95,1042.1);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_496.setTransform(1417.175,1045.95);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_497.setTransform(1382.725,1046.525);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#FFFFFF").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hLQgWAaAAAxQAAAzAWAbQAVAaAoAAQAoAAAVgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_498.setTransform(1348.85,1046.15);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#FFFFFF").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_499.setTransform(1318.175,1046.15);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#FFFFFF").s().p("Ag6CFQgggSgSgiQgSgiAAgtQAAgtATgjQASgjAhgSQAigUArAAQAfAAAcALQAdAJASASIgTArQgngggrAAQgpgBgYAcQgYAbAAAxQAAAxAYAbQAXAaAqABQArgBAnggIATAsQgTASgdAJQgdAKgfAAQgsAAghgTg");
	this.shape_500.setTransform(1289.225,1046.15);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#FFFFFF").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggAQgSQARgRAmgIQAmgIBBAAIAOAAIAAgRQAAgigOgPQgOgPgfAAQgyAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAdAeQAcAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgWANgeAAQgcAAgYgMgAgRAPQgZAEgLALQgLAJAAATQAAAVAQAOQAPAOAYAAQAhAAAUgWQAVgXAAgkIAAgPIgLAAQguAAgZAEg");
	this.shape_501.setTransform(1257.55,1046.15);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_502.setTransform(1211.625,1046.15);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_503.setTransform(1190.025,1039.775);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_504.setTransform(1165.525,1039.8);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#FFFFFF").s().p("AiPDMIAAmQIA9AAIAAAwQANgbAZgOQAZgOAgAAQAmAAAeAUQAeASAQAjQARAjAAAuQAAAsgRAiQgQAigeASQgdATgnAAQggAAgZgOQgZgOgNgbIAACfgAg9h/QgVAbAAAxQAAAyAVAaQAWAbAnAAQAnAAAVgaQAWgbAAgwQAAgzgWgbQgWgcgmABQgnAAgWAbg");
	this.shape_505.setTransform(1115.525,1051.35);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_506.setTransform(1079.825,1046.525);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_507.setTransform(1036.45,1042.1);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_508.setTransform(1010.075,1046.15);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_509.setTransform(979.675,1046.15);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#FFFFFF").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAoAAAVgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_510.setTransform(932.6,1046.15);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_511.setTransform(905.1,1042.1);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_512.setTransform(861.525,1045.95);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#FFFFFF").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAoAAAVgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_513.setTransform(827.3,1046.15);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_514.setTransform(803.175,1039.775);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_515.setTransform(785.3,1042.1);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#FFFFFF").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgxAAgxAeIgSgqQAXgQAhgKQAigKAdAAQA7AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgMAagWAOQgXANgdAAQgcAAgYgMgAgQAPQgaAEgKALQgMAJAAATQAAAVAQAOQAQAOAXAAQAhAAAUgWQAWgXAAgkIAAgPIgLAAQgvAAgYAEg");
	this.shape_516.setTransform(758.25,1046.15);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiNIg5AAIAAguIA5AAIAAhZIA8AAIAABZIBQAAIAAAuIhQAAIAACKQAABBA7AAIAbgCIgDAvIgfACQg5AAgbgcg");
	this.shape_517.setTransform(732.05,1042.1);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_518.setTransform(714.275,1039.775);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#FFFFFF").s().p("AgbCSIh+kjIA/AAIBbDeIBcjeIA9AAIiAEjg");
	this.shape_519.setTransform(691.45,1046.35);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_520.setTransform(658.575,1045.95);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_521.setTransform(634.025,1039.775);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_522.setTransform(1491.575,974.1);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#FFFFFF").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAOAAIAAgRQAAgigOgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgeAAQgcAAgYgLgAgQAQQgZAEgLAJQgLALAAASQAAAVAPAOQAPAPAZgBQAfABAWgYQAUgWAAgjIAAgQIgKAAQgvAAgYAFg");
	this.shape_523.setTransform(1457.75,974.3);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_524.setTransform(1400.575,974.1);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_525.setTransform(1367.425,967.925);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_526.setTransform(1342.925,967.95);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_527.setTransform(1299.2,970.25);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_528.setTransform(1271.425,974.1);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_529.setTransform(1238.275,974.3);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_530.setTransform(1207.875,974.3);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_531.setTransform(1167.1,970.25);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_532.setTransform(1142.025,974.3);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_533.setTransform(1110.525,974.675);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#FFFFFF").s().p("AhLDeIAdgCQAdgDAOgOQAOgPAAgeIAAklIA8AAIAAEcQAAA5gbAcQgbAbg8AEIgbACgAAHjLIAAg/IBFAAIAAA/g");
	this.shape_534.setTransform(1082.175,973.45);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_535.setTransform(1054.425,974.1);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_536.setTransform(1025.475,974.3);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#FFFFFF").s().p("AhRDIIAzhzIh7kcIA/AAIBbDfIBcjfIA9AAIiuGPg");
	this.shape_537.setTransform(994.05,979.9);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#FFFFFF").s().p("AhLCGQghgTgRgjQgSgiAAguQAAgtASgiQARgjAhgTQAhgSArAAQAqAAAhASQAhATASAjQARAiAAAtQAAAugRAiQgSAjghATQghASgqAAQgrAAghgSgAg8hLQgVAaAAAxQAAA0AVAaQAVAaAoAAQAnAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_538.setTransform(961.5,974.3);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#FFFFFF").s().p("AgdDTIAAmmIA7AAIAAGmg");
	this.shape_539.setTransform(937.325,967.95);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#FFFFFF").s().p("AiPDMIAAmQIA9AAIAAAwQANgaAZgOQAZgPAgAAQAmAAAeATQAeAUAQAiQARAjAAAtQAAAugRAhQgQAigeATQgdASgnAAQggAAgZgOQgZgOgNgaIAACegAg9h/QgVAaAAAyQAAAyAVAaQAWAbAnAAQAnABAVgbQAWgaAAgyQAAgygWgbQgWgbgmAAQgnAAgWAbg");
	this.shape_540.setTransform(913.225,979.5);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAgmgMgRQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAgmgNgRQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAtQAOgZAXgNQAYgOAeAAQBDAAAUA4QAOgaAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_541.setTransform(868.875,974.1);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_542.setTransform(827.125,974.3);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#FFFFFF").s().p("ABNCSIhNjQIhNDQIg2AAIhwkjIA+AAIBQDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_543.setTransform(770.05,974.475);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_544.setTransform(728.775,974.3);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_545.setTransform(695.675,974.1);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_546.setTransform(648.025,974.3);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_547.setTransform(626.425,967.925);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#FFFFFF").s().p("AB2DTIAAi9IjrAAIAAC9Ig+AAIAAmmIA+AAIAAC3IDrAAIAAi3IA+AAIAAGmg");
	this.shape_548.setTransform(596.3,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495}]},119).to({state:[]},90).wait(847));

	// Layer_2
	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_549.setTransform(1483.575,1046.15);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_550.setTransform(1441.925,1045.95);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#FFFFFF").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQAsAAAgATQAgASASAjQASAiAAAtQAAAugSAiQgSAjggASQggATgsAAQgqAAghgTgAg8hLQgWAaABAxQgBAzAWAbQAVAaAnAAQAoAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_551.setTransform(1399.1,1046.15);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAglgPgRQgPgRgfgBQgjAAgWAYQgXAWAAAmIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagNAfAAQBoAAAAB1IAAC2g");
	this.shape_552.setTransform(1364.975,1039.8);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#FFFFFF").s().p("ACcCWIAAiyQAAglgMgSQgNgRgdAAQghAAgTAXQgUAXAAAnIAAClIg7AAIAAiyQAAglgNgSQgOgRgcAAQghAAgTAXQgUAXAAAnIAAClIg8AAIAAkkIA7AAIAAAsQAOgYAXgOQAYgNAeAAQBDAAAUA5QAOgbAagPQAZgPAhAAQBiAAAAB2IAAC1g");
	this.shape_553.setTransform(1306.075,1045.95);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#FFFFFF").s().p("AhLCFQghgSgRgjQgSgiAAguQAAgtASgiQARgjAhgSQAhgTArAAQArAAAgATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQggATgrAAQgrAAghgTgAg8hLQgVAagBAxQABAzAVAbQAVAaAoAAQAoAAAUgaQAWgbAAgzQAAgxgWgaQgVgbgnAAQgnAAgWAbg");
	this.shape_554.setTransform(1263.25,1046.15);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_555.setTransform(1237.525,1045.95);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#FFFFFF").s().p("AgwDUIAAj1Ig5AAIAAguIA5AAIAAgGQAAg8AegfQAfgfA/gDIAbgCIADAuIgbACQgkACgQAQQgPASAAAhIAAAQIBQAAIAAAuIhQAAIAAD1g");
	this.shape_556.setTransform(1214.9,1039.7);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#FFFFFF").s().p("AhDDEQgigJgagTIASgsQAdASAbAJQAaAHAeABQBSAAAAhTIAAguQgMAagaAOQgaAPghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgrARgiQARghAegSQAdgSAnAAQAgAAAaAOQAZAOAOAbIAAgwIA8AAIAAEMQAABDgkAjQgkAihFAAQglAAgigKgAg8iCQgWAZAAAuQAAAuAXAYQAWAaAmAAQAnAAAXgaQAWgYAAguQAAgtgWgaQgWgagoAAQgmAAgXAag");
	this.shape_557.setTransform(1169.375,1051.55);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_558.setTransform(1135.175,1045.95);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_559.setTransform(1110.625,1039.775);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#FFFFFF").s().p("AA9DTIiJiJIAACJIg9AAIAAmmIA9AAIAAEFIB/iBIBLAAIiKCKICWCYg");
	this.shape_560.setTransform(1090.35,1039.8);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAAzQAXg0BHgFIAUgBIAEAzIglAEQgrAEgSAWQgTAWAAAjIAAChg");
	this.shape_561.setTransform(1063.525,1045.95);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#FFFFFF").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTArAAQAqAAAhATQAgASATAjQARAiAAAtQAAAugRAiQgTAjggASQghATgqAAQgrAAghgTgAg8hLQgVAaAAAxQAAAzAVAbQAVAaAoAAQAnAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgnAAQgoAAgVAbg");
	this.shape_562.setTransform(1033.5,1046.15);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#FFFFFF").s().p("ABNCSIhNjQIhNDQIg3AAIhvkjIA/AAIBPDbIBQjbIAuAAIBQDcIBPjcIA8AAIhwEjg");
	this.shape_563.setTransform(991.2,1046.325);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_564.setTransform(935.425,1046.15);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_565.setTransform(913.825,1039.775);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#FFFFFF").s().p("AhQDDQgdgUgRgiQgRgjAAgtQAAguARghQARgiAdgTQAdgTAnAAQAgAAAZAPQAYAOAOAZIAAixIA9AAIAAGmIg9AAIAAgyQgNAagZAOQgZAOggABQgmgBgegSgAg7gOQgWAZAAAyQAAAxAWAbQAWAcAmAAQAoAAAVgbQAVgbAAgxQAAgygVgaQgVgbgoAAQgnAAgVAbg");
	this.shape_566.setTransform(872.15,1040);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_567.setTransform(838.075,1045.95);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#FFFFFF").s().p("AhICMQgYgMgOgUQgNgVAAgaQAAggARgSQAPgRAngIQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgwAAgyAeIgSgqQAXgQAhgKQAigKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgWANgeAAQgcAAgYgMgAgQAPQgaAEgKALQgMAJAAATQAAAVAQAOQAQAOAYAAQAfAAAWgWQAUgXABgkIAAgPIgLAAQgvAAgYAEg");
	this.shape_568.setTransform(804.25,1046.15);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#FFFFFF").s().p("ABHCWIAAiyQAAglgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAmIAACmIg8AAIAAkkIA7AAIAAAvQAOgaAagOQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_569.setTransform(755.625,1045.95);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#FFFFFF").s().p("AhLCFQgggSgSgjQgSgiAAguQAAgtASgiQASgjAggSQAhgTAqAAQAsAAAgATQAgASASAjQASAiAAAtQAAAugSAiQgSAjggASQggATgsAAQgqAAghgTgAg8hLQgWAaABAxQgBAzAWAbQAVAaAnAAQAoAAAWgaQAVgbAAgzQAAgxgVgaQgWgbgoAAQgnAAgVAbg");
	this.shape_570.setTransform(721.4,1046.15);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_571.setTransform(689.975,1046.15);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#FFFFFF").s().p("AhICMQgYgMgNgUQgOgVAAgaQAAggARgSQAQgRAmgIQAmgIBCAAIANAAIAAgRQABgigOgPQgPgPggAAQgwAAgyAeIgSgqQAXgQAigKQAhgKAeAAQA6AAAcAeQAdAdAAA8IAAC0Ig6AAIAAgxQgLAagXAOQgXANgcAAQgdAAgYgMgAgQAPQgZAEgLALQgLAJAAATQAAAVAPAOQAPAOAZAAQAfAAAWgWQAUgXAAgkIAAgPIgKAAQgvAAgYAEg");
	this.shape_572.setTransform(659.1,1046.15);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgjAggSQAggUAoAAQA7AAAiAnQAiAmAABEIAAASIjOAAQAHBdBUAAQAzAAApghIASAqQgUASgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_573.setTransform(627.675,1046.15);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgSQAAgPgLgKQgKgIgagGIgwgLQgngJgTgUQgUgUAAgfQAAgoAggZQAggYAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvAAQgagBgQALQgQALAAASQAAAPAKAKQAKAJAVAFIAxALQArAKAUATQATAUAAAhQAAAnggAXQggAXg2AAQhMAAgtglg");
	this.shape_574.setTransform(597.275,1046.15);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#FFFFFF").s().p("ABVCSIhVhrIhUBrIhJAAIB7iVIh0iOIBJAAIBNBiIBOhiIBIAAIhzCOIB6CVg");
	this.shape_575.setTransform(1618.2,974.475);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#FFFFFF").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAigKQAhgKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgdAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALABASQAAAVAPAOQAPAPAYgBQAgABAVgYQAWgWgBgjIAAgQIgLAAQguAAgZAFg");
	this.shape_576.setTransform(1585.95,974.3);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_577.setTransform(1559.75,970.25);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#FFFFFF").s().p("AhDDEQgigJgagTIASgsQAdATAbAIQAaAIAeAAQBSAAAAhUIAAguQgMAbgaAPQgaAOghAAQgnAAgegSQgdgSgRghQgRggAAgrQAAgsARggQARgiAegSQAdgSAnAAQAgAAAaAPQAZAOAOAaIAAgwIA8AAIAAENQAABCgkAjQgkAihFAAQglAAgigKgAg8iDQgWAaAAAuQAAAtAXAZQAWAaAmAAQAnAAAXgaQAWgZAAgtQAAgtgWgbQgWgagoABQgmgBgXAag");
	this.shape_578.setTransform(1514.675,979.7);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_579.setTransform(1480.475,974.1);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_580.setTransform(1455.925,967.925);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_581.setTransform(1439.825,974.1);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_582.setTransform(1409.575,974.675);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#FFFFFF").s().p("AhQDCQgdgTgRgjQgRgiAAguQAAgtARghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAiyIA8AAIAAGmIg8AAIAAgyQgNAbgZAOQgZANggAAQgmABgegUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAmAAQAoAAAVgbQAVgaAAgyQAAgygVgaQgVgbgoAAQgmAAgWAbg");
	this.shape_583.setTransform(1374,968.15);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#FFFFFF").s().p("AhPDCQgegTgRgjQgQgiAAguQAAgtAQghQARgiAdgTQAdgSAnAAQAgAAAZANQAYAOAOAbIAAiyIA9AAIAAGmIg9AAIAAgyQgNAbgZAOQgZANggAAQgmABgdgUgAg7gOQgWAaAAAwQAAAyAWAbQAWAcAnAAQAnAAAVgbQAWgagBgyQABgygWgaQgVgbgnAAQgoAAgVAbg");
	this.shape_584.setTransform(1322.75,968.15);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_585.setTransform(1290.075,974.3);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_586.setTransform(1265.375,974.1);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_587.setTransform(1245.025,967.925);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#FFFFFF").s().p("ABHDTIAAiyQAAgkgPgSQgPgSgfAAQgjAAgWAYQgXAVAAAnIAACmIg8AAIAAmmIA8AAIAACvQAPgZAZgOQAagMAfAAQBoAAAAB1IAAC1g");
	this.shape_588.setTransform(1220.525,967.95);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_589.setTransform(1176.8,970.25);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_590.setTransform(1149.025,974.1);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#FFFFFF").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggARgSQAPgSAngHQAmgIBBAAIAPAAIAAgRQgBgigOgPQgOgPggAAQgxAAgxAfIgSgrQAXgQAhgKQAigKAeAAQA6AAAcAdQAdAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgWAOgeAAQgcAAgYgLgAgQAQQgaAEgKAJQgMALAAASQABAVAPAOQAQAPAYgBQAfABAWgYQAUgWABgjIAAgQIgLAAQgvAAgYAFg");
	this.shape_591.setTransform(1115.2,974.3);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_592.setTransform(1089,970.25);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_593.setTransform(1061.225,974.1);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_594.setTransform(1026.775,974.675);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#FFFFFF").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSArAAQAqAAAhASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQghASgqAAQgrAAghgSgAg8hLQgVAaAAAxQAAA0AVAaQAVAaAoAAQAnAAAWgaQAVgaAAg0QAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_595.setTransform(992.9,974.3);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FFFFFF").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_596.setTransform(962.225,974.3);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#FFFFFF").s().p("Ag6CGQgggTgSgiQgSgiAAguQAAgsATgjQASgiAhgUQAigTArAAQAfAAAcAKQAdALASARIgTArQgnghgrABQgpAAgYAbQgYAbAAAxQAAAxAYAbQAXAbAqAAQArAAAnghIATAsQgTASgdAKQgdAJgfAAQgsAAghgSg");
	this.shape_597.setTransform(933.275,974.3);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#FFFFFF").s().p("AhICNQgYgNgOgUQgNgVAAgaQAAggAQgSQARgSAmgHQAmgIBBAAIAPAAIAAgRQAAgigPgPQgOgPgfAAQgyAAgxAfIgSgrQAXgQAhgKQAigKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgMAagWANQgWAOgeAAQgcAAgYgLgAgRAQQgZAEgLAJQgLALAAASQAAAVAQAOQAPAPAYgBQAhABAUgYQAWgWAAgjIAAgQIgMAAQguAAgZAFg");
	this.shape_598.setTransform(901.6,974.3);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_599.setTransform(861.375,974.1);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FFFFFF").s().p("AhLCGQgggTgSgjQgSgiAAguQAAgtASgiQASgjAggTQAhgSArAAQAqAAAhASQAgATATAjQARAiAAAtQAAAugRAiQgTAjggATQghASgqAAQgrAAghgSgAg8hLQgVAaAAAxQAAA0AVAaQAVAaAoAAQAoAAAVgaQAVgaAAg0QAAgxgVgaQgWgbgnAAQgnAAgWAbg");
	this.shape_600.setTransform(831.35,974.3);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_601.setTransform(807.225,967.925);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#FFFFFF").s().p("ABHCWIAAixQAAgmgPgRQgPgSgfAAQgjAAgWAXQgXAXAAAnIAAClIg8AAIAAkkIA7AAIAAAvQAOgbAagNQAagOAgAAQBoAAAAB2IAAC1g");
	this.shape_602.setTransform(782.725,974.1);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#FFFFFF").s().p("AiAAfIAAiyIA9AAIAACxQAAAkAOAQQAOARAfAAQAiAAAVgWQAVgXAAgmIAAijIA9AAIAAEjIg7AAIAAgvQgOAZgYANQgYANgdAAQhrAAAAh1g");
	this.shape_603.setTransform(748.275,974.675);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#FFFFFF").s().p("AhLDeIAdgCQAdgDAOgOQAOgPAAgeIAAklIA8AAIAAEcQAAA5gbAcQgbAbg8AEIgbACgAAHjLIAAg/IBFAAIAAA/g");
	this.shape_604.setTransform(719.925,973.45);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#FFFFFF").s().p("AhICNQgYgNgNgUQgOgVAAgaQAAggAQgSQAQgSAngHQAmgIBCAAIANAAIAAgRQAAgigNgPQgPgPgfAAQgxAAgyAfIgSgrQAXgQAigKQAhgKAdAAQA7AAAdAdQAcAeAAA8IAAC0Ig6AAIAAgxQgLAagXANQgXAOgcAAQgdAAgYgLgAgRAQQgZAEgLAJQgLALABASQAAAVAPAOQAPAPAYgBQAgABAWgYQAVgWgBgjIAAgQIgLAAQguAAgZAFg");
	this.shape_605.setTransform(684.5,974.3);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#FFFFFF").s().p("Ah3BzIASgsQAtAjA7AAQAeAAAPgKQAQgKAAgRQAAgRgLgIQgKgJgagHIgwgKQgngJgTgTQgUgVAAgfQAAgoAggYQAggZAzAAQAfAAAdAKQAcAKAUASIgSAqQgrghgvgBQgaAAgQALQgQAKAAAUQAAAPAKAIQAKAKAVAFIAxALQArAKAUATQATAUAAAgQAAAoggAXQggAXg2AAQhMAAgtglg");
	this.shape_606.setTransform(638.575,974.3);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#FFFFFF").s().p("AgeDUIAAkkIA8AAIAAEkgAgiiUIAAg/IBFAAIAAA/g");
	this.shape_607.setTransform(616.975,967.925);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#FFFFFF").s().p("AhYCWIAAkkIA7AAIAAA0QAXg1BHgFIAUgBIAEAzIglADQgrAFgSAWQgTAWAAAiIAACig");
	this.shape_608.setTransform(585.075,974.1);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_609.setTransform(556.125,974.3);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#FFFFFF").s().p("AgQClQgcgcAAg1IAAiMIg5AAIAAgvIA5AAIAAhYIA8AAIAABYIBQAAIAAAvIhQAAIAACJQAABBA7AAIAbgCIgDAuIgfACQg5AAgbgbg");
	this.shape_610.setTransform(529.65,970.25);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#FFFFFF").s().p("AhcBwQgpgoAAhHQAAgsASgjQASgiAggUQAggTAoAAQA7AAAiAmQAiAnAABDIAAATIjOAAQAHBdBUAAQAzAAApghIASArQgUARgeAKQgeAKgfAAQhGAAgogogABSgWQgCgpgTgWQgTgWgiAAQgiAAgUAWQgVAWgEApICZAAIAAAAg");
	this.shape_611.setTransform(503.275,974.3);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#FFFFFF").s().p("AidDTIAAmmICuAAQBDAAAlAiQAmAgAAA9QAAA8gmAhQglAhhDAAIhxAAIAACpgAhggGIBqAAQBZgBAAhNQAAhMhZAAIhqAAg");
	this.shape_612.setTransform(469.05,967.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549}]},30).to({state:[]},89).wait(937));

	// hand
	this.instance = new lib.Tween6("synched",0);
	this.instance.setTransform(1046.85,873.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(194).to({_off:false},0).to({alpha:1},15).to({startPosition:0},24).wait(823));

	// whiteframe
	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(1043.55,596.1);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(194).to({_off:false},0).to({alpha:1},15).wait(847));

	// window
	this.instance_2 = new lib.Path_1();
	this.instance_2.setTransform(1060.2,581.4,1,1,0,0,0,499.1,539.6);
	this.instance_2.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({alpha:0},29).to({_off:true},1022).wait(5));

	// windowframe
	this.instance_3 = new lib.Path();
	this.instance_3.setTransform(1014.9,360.4,1,1,0,0,0,542.3,360.4);
	this.instance_3.alpha = 0.5313;

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#AC715C").s().p("EhU5gk9IH2mMMCh9BMaIAAJ5g");
	this.shape_613.setTransform(1015.975,957.425);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#C6B1B5").s().p("EhR5gkIIH2mNMCb9BJUIAALXg");
	this.shape_614.setTransform(1035.125,922.825);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#AC715C").s().p("EgD6g4TIH1DtMAAABmuIn1GMg");
	this.shape_615.setTransform(497.7,360.425);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#C6B1B5").s().p("EgD6g0nIH1DvMAAABfUIn1GMg");
	this.shape_616.setTransform(536,354.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.instance_3}]}).to({state:[]},1051).wait(5));

	// computer
	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#DBDCE2").s().p("AoVLTQgZgPAFggIBytBQACgPAJgNQAJgNANgIIHJkFIGtj8QAegRAYAPQAZAOgFAgIhyNBQgCAPgJANQgJANgNAIIt2IBQgQAJgOAAQgMAAgMgGg");
	this.shape_617.setTransform(1040.7256,640.5946);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#8D8588").s().p("AoXLYQgmgXgEgUIBztYQACgQAJgNQAJgNANgIIHJkFIGtj8QAQgJASABIABAAIABAAQALACBKApIgxAaIhwMxQgCAOgJANQgJAOgNAHItVIhQgKAGgMAAQgTAAgZgPg");
	this.shape_618.setTransform(1036.975,638.7503);

	this.instance_4 = new lib.Group_2();
	this.instance_4.setTransform(973.7,641.4,1,1,0,0,0,28.2,17.4);

	this.instance_5 = new lib.Group_3();
	this.instance_5.setTransform(1008,662.9,1,1,0,0,0,53.6,31.7);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#DBDCE2").s().p("AtsAqQgNgIABgOQAAgOAMgHIN4n7QATgMAWAAQAWABASALIMcHdIvGIng");
	this.shape_619.setTransform(995.624,660.4);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#8D8588").s().p("AtgA7QgSgLAAgWQAAgVAKgRQALgSASgKIN6nmINEH1IvGIog");
	this.shape_620.setTransform(992.575,664.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_620},{t:this.shape_619},{t:this.instance_5},{t:this.instance_4},{t:this.shape_618},{t:this.shape_617}]},299).to({state:[]},752).wait(5));

	// head
	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#5B3535").s().p("AnMCoQADijAiiGQAeh1BThDQBMg9BsgMQBRgKA1ANQAlAKAyAbIBUAvQAXALBEAZQA6AWAfASQAuAbAcAoQAeAsgDAuQgDAwgpAmQglAjg0AMQgrALg5gFQgjgDhBgNIhagYQg+gPgbAIQgoAMgVA9QgcBOgLANQgJAKgNAFQgNAFgNgDQgVgGgUgkQgXgogQgJQgTgLgWAHQgWAGgNATQgLARgBAXQAAAXALATQAHAPAYARQAZARAGAKQAHAMgEAUQgCANgKAYQgHARgNALQgNANgRADIgOABQheAAACjgg");
	this.shape_621.setTransform(955.2094,368.4936);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#FB8E71").s().p("AhdFgQhGgfgzg+Qg0hAgRhQQgDgHgFgwQgDghgTgQIgighQgVgWACgPQADgXAwglQA1grAHgOQAdg5A2gsQAzgqBBgXQCHglBsAFQCgAHAUBrQgMA0gKBgQgMBwgHAoQgeCzheBWQhEA6hRALQgRACgSAAQg4AAg3gYg");
	this.shape_622.setTransform(953.0161,391.7896);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_622},{t:this.shape_621}]}).to({state:[]},1051).wait(5));

	// neck
	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#FB8E71").s().p("AhVD6QgogOgZgaIAAnaIEtAAIAAHcQgaAZgmAOQgoAOguAAQgtAAgpgPg");
	this.shape_623.setTransform(933.375,416.375);

	this.timeline.addTween(cjs.Tween.get(this.shape_623).to({_off:true},1051).wait(5));

	// RUarm
	this.instance_6 = new lib.Symbol2();
	this.instance_6.setTransform(887.25,459.8,1,1,0,0,0,63.6,11.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1).to({regX:36.4,regY:63.5,x:860.05,y:511.8},0).wait(119).to({rotation:-2.3429,x:862.15,y:512.85},0).wait(1).to({rotation:-4.6857,x:864.4,y:513.85},0).wait(1).to({rotation:-7.0286,x:866.6,y:514.7},0).wait(1).to({rotation:-9.3715,x:868.85,y:515.5},0).wait(1).to({rotation:-11.7143,x:871.15,y:516.2},0).wait(1).to({rotation:-14.0572,x:873.45,y:516.8},0).wait(1).to({rotation:-16.4001,x:875.8,y:517.3},0).wait(1).to({rotation:-18.7429,x:878.15,y:517.75},0).wait(1).to({rotation:-21.0858,x:880.55,y:518.05},0).wait(1).to({rotation:-23.4287,x:882.95,y:518.3},0).wait(1).to({rotation:-25.7716,x:885.35,y:518.4},0).wait(1).to({rotation:-28.1144,x:887.7,y:518.45},0).wait(1).to({rotation:-30.4573,x:890.15,y:518.4},0).wait(1).to({rotation:-32.8002,x:892.55,y:518.25},0).wait(1).to({rotation:-35.143,x:894.9,y:517.9},0).wait(1).to({rotation:-37.4859,x:897.3,y:517.55},0).wait(915).to({_off:true},1).wait(5));

	// RLarm
	this.instance_7 = new lib.Symbol1();
	this.instance_7.setTransform(843.85,559.9,1,1,0,0,0,15.8,10.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1).to({regX:38.5,regY:82.9,x:866.55,y:632.2},0).wait(119).to({rotation:-6.3508,x:878.4,y:629.6},0).wait(1).to({rotation:-12.7016,x:890.05,y:626.1},0).wait(1).to({rotation:-19.0524,x:901.1,y:621.9},0).wait(1).to({rotation:-25.4032,x:911.65,y:616.9},0).wait(1).to({rotation:-31.7541,x:921.6,y:611.2},0).wait(1).to({rotation:-38.1049,x:930.75,y:604.9},0).wait(1).to({rotation:-44.4557,x:939.2,y:598.05},0).wait(1).to({rotation:-50.8065,x:946.85,y:590.8},0).wait(1).to({rotation:-57.1573,x:953.6,y:583.2},0).wait(1).to({rotation:-63.5081,x:959.4,y:575.4},0).wait(1).to({rotation:-69.8589,x:964.35,y:567.35},0).wait(1).to({rotation:-76.2097,x:968.4,y:559.3},0).wait(1).to({rotation:-82.5606,x:971.45,y:551.3},0).wait(1).to({rotation:-88.9114,x:973.65,y:543.45},0).wait(1).to({rotation:-95.2622,x:974.85,y:535.9},0).wait(1).to({rotation:-101.613,x:975.3,y:528.7},0).wait(917).to({_off:true},1).wait(3));

	// body
	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#839DB7").s().p("AhXB0QgngOgZgaQgjgiAAgqQAAgpAjgiQAZgaAngOQAqgPAtAAIAnACQA+AKAqAiIAAAAIAHAHQAlAiAAArQAAAtglAhQgaAZgnAOQgnAOguAAQgtABgqgQg");
	this.shape_624.setTransform(933.5,429.75);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#E6E8EA").s().p("AAnQWQhrgKg5g0Qhlhdgcn1QgLjGAFjLQAFjCAQhyQAXihAghtQAliAA5hdQBZiRCbhcQBPBpAACkQABB5guCsQg3DPgKBYQgUCoA2B1IAaA0QAQAfAGAWQAVBEgYBpIgWBYQgNA1gEAkQgLBjAoCNQAWBPAwCfQhhAUhOAAQgZAAgXgCg");
	this.shape_625.setTransform(871.4219,536.5205);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#EBEEF3").s().p("AoeQlQhHh2gmj0QgljoADkWQAEkaArjvQAwkDBTiOQBWibDZhxQDShvDZgMQDqgNB7BxQCJB+goD/Qh9EcAIEaQAEBsAXB8QAKAvAkCYQAaBuAFA7QAIBUgUA9QgwCMjtBdQj1CGjJA3QiEAlhoAAQiKAAhZhCgAKlqDIAHgRIgLAkIAEgTgAKlqDIAAAAg");
	this.shape_626.setTransform(913.0698,528.7733);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_626},{t:this.shape_625},{t:this.shape_624}]}).to({state:[]},1051).wait(5));

	// glass
	this.instance_8 = new lib.Symbol5();
	this.instance_8.setTransform(1114.6,544.4,1,1,0,0,0,13.5,23.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1).to({regY:24,y:544.5},0).wait(28).to({y:536.25},0).wait(1).to({x:1114.65,y:528},0).wait(1).to({x:1114.7,y:519.75},0).wait(1).to({x:1114.75,y:511.55},0).wait(1).to({x:1114.8,y:503.3},0).wait(1).to({x:1114.85,y:495.05},0).wait(1).to({x:1114.9,y:486.8},0).wait(1).to({x:1114.95,y:478.6},0).wait(1).to({x:1115,y:470.35},0).wait(1).to({x:1115.05,y:462.1},0).wait(1).to({x:1115.1,y:453.9},0).wait(16).to({rotation:7.4995,x:1115.05,y:453.85},0).wait(1).to({rotation:14.9989,x:1115.1,y:453.9},0).wait(1).to({rotation:4.9991,x:1115.05},0).wait(1).to({rotation:-5.0007,x:1115.1,y:453.85},0).wait(1).to({rotation:-15.0005,y:453.9},0).wait(1).to({rotation:-5.0007,y:453.85},0).wait(1).to({rotation:4.9991,x:1115.05,y:453.9},0).wait(1).to({rotation:14.9989,x:1115.1},0).wait(1).to({rotation:4.9991,x:1115.05},0).wait(1).to({rotation:-5.0007,x:1115.1,y:453.85},0).wait(1).to({rotation:-15.0005,y:453.9},0).wait(1).to({rotation:-5.0007,y:453.85},0).wait(1).to({rotation:4.9991,x:1115.05,y:453.9},0).wait(1).to({rotation:14.9989,x:1115.1},0).wait(1).to({rotation:4.9991,x:1115.05},0).wait(1).to({rotation:-5.0007,x:1115.1,y:453.85},0).wait(1).to({rotation:-15.0005,y:453.9},0).wait(1).to({rotation:-5.0007,y:453.85},0).wait(1).to({rotation:4.9991,x:1115.05,y:453.9},0).wait(1).to({rotation:14.9989,x:1115.1},0).wait(1).to({rotation:7.4995,x:1115.05,y:453.85},0).wait(1).to({rotation:0,x:1115.1,y:453.9},0).wait(25).to({x:1115.05,y:460.85},0).wait(1).to({x:1115,y:467.8},0).wait(1).to({x:1114.95,y:474.8},0).wait(1).to({x:1114.9,y:481.75},0).wait(1).to({y:488.7},0).wait(1).to({x:1114.85,y:495.7},0).wait(1).to({x:1114.8,y:502.65},0).wait(1).to({x:1114.75,y:509.65},0).wait(1).to({y:516.6},0).wait(1).to({x:1114.7,y:523.55},0).wait(1).to({x:1114.65,y:530.55},0).wait(1).to({x:1114.6,y:537.5},0).wait(1).to({y:544.5},0).wait(943));

	// LUarm
	this.instance_9 = new lib.Symbol4();
	this.instance_9.setTransform(965.1,443.35,1,1,0,0,0,19.4,5.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1).to({regX:40.9,regY:57.8,x:986.6,y:495.35},0).wait(28).to({rotation:-1.3635,x:987.8,y:494.85},0).wait(1).to({rotation:-2.7271,x:989,y:494.25},0).wait(1).to({rotation:-4.0906,x:990.2,y:493.65},0).wait(1).to({rotation:-5.4541,x:991.4,y:493.05},0).wait(1).to({rotation:-6.8177,x:992.6,y:492.4},0).wait(1).to({rotation:-8.1812,x:993.8,y:491.75},0).wait(1).to({rotation:-9.5448,x:994.95,y:491},0).wait(1).to({rotation:-10.9083,x:996.05,y:490.3},0).wait(1).to({rotation:-12.2718,x:997.15,y:489.6},0).wait(1).to({rotation:-13.6354,x:998.25,y:488.75},0).wait(1).to({rotation:-14.9989,x:999.3,y:488},0).wait(62).to({rotation:-13.8451,x:998.4,y:488.65},0).wait(1).to({rotation:-12.6914,x:997.5,y:489.35},0).wait(1).to({rotation:-11.5376,x:996.5,y:489.95},0).wait(1).to({rotation:-10.3839,x:995.6,y:490.6},0).wait(1).to({rotation:-9.2301,x:994.6,y:491.2},0).wait(1).to({rotation:-8.0763,x:993.65,y:491.8},0).wait(1).to({rotation:-6.9226,x:992.65,y:492.35},0).wait(1).to({rotation:-5.7688,x:991.7,y:492.9},0).wait(1).to({rotation:-4.615,x:990.7,y:493.4},0).wait(1).to({rotation:-3.4613,x:989.7,y:493.95},0).wait(1).to({rotation:-2.3075,x:988.65,y:494.4},0).wait(1).to({rotation:-1.1538,x:987.6,y:494.9},0).wait(1).to({rotation:0,x:986.6,y:495.35},0).wait(937).to({_off:true},1).wait(5));

	// LLarm
	this.instance_10 = new lib.Symbol3();
	this.instance_10.setTransform(1002.1,540.2,1,1,0,0,0,10,21.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({regX:67.7,x:1059.8},0).wait(28).to({rotation:-4.0907,x:1062.25,y:535.45},0).wait(1).to({rotation:-8.1813,x:1064.35,y:530.75},0).wait(1).to({rotation:-12.272,x:1066.25,y:526.05},0).wait(1).to({rotation:-16.3627,x:1067.8,y:521.55},0).wait(1).to({rotation:-20.4534,x:1069.15,y:517},0).wait(1).to({rotation:-24.544,x:1070.2,y:512.6},0).wait(1).to({rotation:-28.6347,x:1070.9,y:508.3},0).wait(1).to({rotation:-32.7254,x:1071.4,y:504.15},0).wait(1).to({rotation:-36.8161,x:1071.7,y:500.15},0).wait(1).to({rotation:-40.9067,y:496.3},0).wait(1).to({rotation:-44.9974,x:1071.5,y:492.75},0).wait(16).to({rotation:-42.2552,x:1073.4,y:494.75},0).wait(1).to({rotation:-39.513,x:1075.25,y:496.85},0).wait(1).to({rotation:-41.6606,x:1073.85,y:495.2},0).wait(1).to({rotation:-43.8081,x:1072.35,y:493.6},0).wait(1).to({rotation:-45.9557,x:1070.8,y:492.1},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-40.7055,x:1074.45,y:495.9},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-45.9557,x:1070.8,y:492.1},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-40.7055,x:1074.45,y:495.9},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-45.9557,x:1070.8,y:492.1},0).wait(1).to({rotation:-44.2056,x:1072.1,y:493.3},0).wait(1).to({rotation:-42.4556,x:1073.25,y:494.6},0).wait(1).to({rotation:-40.7055,x:1074.45,y:495.9},0).wait(27).to({rotation:-37.5743,x:1074.25,y:498.85},0).wait(1).to({rotation:-34.4431,x:1073.9,y:501.95},0).wait(1).to({rotation:-31.3119,x:1073.4,y:505.05},0).wait(1).to({rotation:-28.1807,x:1072.7,y:508.35},0).wait(1).to({rotation:-25.0495,x:1072,y:511.65},0).wait(1).to({rotation:-21.9183,x:1071,y:515.05},0).wait(1).to({rotation:-18.7872,x:1069.95,y:518.5},0).wait(1).to({rotation:-15.656,x:1068.65,y:522.05},0).wait(1).to({rotation:-12.5248,x:1067.2,y:525.6},0).wait(1).to({rotation:-9.3936,x:1065.6,y:529.2},0).wait(1).to({rotation:-6.2624,x:1063.8,y:532.8},0).wait(1).to({rotation:-3.1312,x:1061.9,y:536.5},0).wait(1).to({rotation:0,x:1059.8,y:540.2},0).wait(943));

	// legs
	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#5F66AF").s().p("ACYEzQgigOgqggQgdgWgtgpQg4g0gRgOQgqgkgigSIhJgjQgrgVgcgaQgcgcgTgoQgUgngEglIAAghQAGgrAfgPIBAg6IAAABQAVgUAcAFQAcAFArAdIBJAxQAiAUApAOQATAGA3ANQAtALAeAMQAqARAiAZQBLA5AmBzQAnB3gwAsQgIALgNAGIg1AtQgZAVgiAEIgQABQgTAAgQgGg");
	this.shape_627.setTransform(958.9191,792.348);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#EBEEF3").s().p("AiOBzQgpgYgMgIQgHgEgNgNIgDgDQgGgXgLgUIALgJIDsisQAvgiA6AJQA6AJAiAvQAiAwgJA5QgJA5gvAiIioB7QhrgxgtgZg");
	this.shape_628.setTransform(955.6942,771.1819);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#5F66AF").s().p("Ap1JEQgugXgfgqQgzhHANhWQAOhXBHg0IQusLQBHg0BXAOQBWANA0BHQAzBHgNBXQgOBWhHA0IwuMMQg3AohGAAQgyAAgsgWg");
	this.shape_629.setTransform(1023.775,724.1348);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#5F66AF").s().p("AMbVBQg3AAgrgjQgsgigMg3IifuxI1drFQhBgogohCQgnhBgGhNIgPmiINUh8IE0h5IBeDIIAaBXQAYBfgCAlQgvAbhZAkQhjApgbAOQg9AfgSAdQgWAkAgArQBaB7FxDSIEHCPQCABGAcAWQA6AuASBHIC4RbQARBSg1BBQg1BChUAAg");
	this.shape_630.setTransform(967.0672,730.85);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#EBEEF3").s().p("AhBDRQgwgigKg6IgijMQBYhIAvgfQAWgRAdgRQALgGAOgEIAEgBQAaAEAUAAQACAHABAHIAwEgQAKA5giAwQgiAwg6AJQgNADgMAAQgqAAglgbg");
	this.shape_631.setTransform(1053.7624,857.1037);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#5F66AF").s().p("ABGEmIhJg2QgtgigfgSQhggrgvgXQhTgpgig1QgXgigIgzQgGgigCg8QgIlKEpDPQBhBECCB+QBEBDBTBXQAvAvAUAjQAeAygJAtQgIAsgpAeQgnAcgvACIgHAAQhLAAhag9g");
	this.shape_632.setTransform(1076.732,895.4789);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#5F66AF").s().p("AIZH4QgygCgrgXIxDoxQhSgqgchYQgchYAqhSQAqhSBYgcQBYgcBSAqIRDIxQBSAqAcBYQAdBYgrBSQgeA7g5AhQg0Adg7AAIgJAAg");
	this.shape_633.setTransform(1024.637,652.3741);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627}]}).to({state:[]},1051).wait(5));

	// chair
	this.instance_11 = new lib.Path_3();
	this.instance_11.setTransform(978.6,660.2,1,1,0,0,0,105.5,60.9);
	this.instance_11.compositeOperation = "multiply";

	this.instance_12 = new lib.Path_1_1();
	this.instance_12.setTransform(928.6,773.2,1,1,0,0,0,186.4,71);
	this.instance_12.compositeOperation = "multiply";

	this.instance_13 = new lib.Path_2_2();
	this.instance_13.setTransform(932,641.75,1,1,0,0,0,199.5,202.6);
	this.instance_13.compositeOperation = "multiply";

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#839DB7").s().p("Ahic3QpAgwmxkEQibhchwhwIgCgCQj9jWilmhQipmqgOnhQBxlDAghTQBnkOBsjMQEvo7GXiwQBshdBoD9QAdBIAvCUQAsCOARAoQCoFnB9DKQC8EuDZC5QCTB5DABHQCZA4DaAmQCAAVEHAkQDtAjCeAtQC4A5BVBnQBKBbACCHQACBrgtCjQgaBehADFQh6DDjECRQjRCakTBTQm9CFm9AAQh+AAh8gLg");
	this.shape_634.setTransform(930.4543,658.4756);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#839DB7").s().p("EgBxAgNQpAgwmxkEQibhchwhwIgCgCQjNitiYk+QiZk/g7l/QhAmWA5mGQA+msDGlaQFQpLDwivQBxhSBwgKQBjgIB0AxQBfApBhBoQA/BECHC0QCiDaBnB8QC3DeDSDLQC4CyEECJQCUBOEcCEQDxB7CTCXQC+DCB3E4QBPDQgRDiQgRDjhwDOQh1DYjMCgQjbCrkoBZQm+CFm9AAQh9AAh8gLg");
	this.shape_635.setTransform(931.9946,637.0711);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_635},{t:this.shape_634},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11}]}).to({state:[]},1051).wait(5));

	// box
	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#DBDCE2").s().p("AtkgJIVSi3IF3CdI0bDkg");
	this.shape_636.setTransform(1356.3,803.6);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#B99763").s().p("AylAKIckk9IInEtI8KE6g");
	this.shape_637.setTransform(1431.4,821.85);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#B99763").s().p("AqWhjIGvjmIN+GiImwDxg");
	this.shape_638.setTransform(1246.05,813.95);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#AD8C5C").s().p("AuSh4Ickk/IAAInI8jFIg");
	this.shape_639.setTransform(1403.85,834.975);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#AB854F").s().p("Am9BPIgCo2IN+GhIABIug");
	this.shape_640.setTransform(1267.65,829.75);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#AB854F").s().p("Am9BPIgCo3IN/GiIAAIvg");
	this.shape_641.setTransform(1450.5,798.125);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#AD8C5C").s().p("A1RgxIclk+IN+GiI8lE9g");
	this.shape_642.setTransform(1359.075,786.075);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#B99763").s().p("AD0DRIt+mhIH9BSIMZFPg");
	this.shape_643.setTransform(1470.85,770.125);

	this.instance_14 = new lib.Path_8();
	this.instance_14.setTransform(1362.2,844.75,1,1,0,0,0,155.9,42.1);
	this.instance_14.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_14},{t:this.shape_643},{t:this.shape_642},{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636}]},300).to({state:[]},751).wait(5));

	// bottle
	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#0D2D1B").s().p("AhZAZQgmgVAAgeIAAgUQABAeAlAUQAlAWA0AAQA1AAAmgWQAkgTABgfIAAAUQAAAeglAVQgmAWg1AAQg0gBglgVg");
	this.shape_644.setTransform(1155.075,550.9875);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#EECC3D").s().p("AhZCUQgmgVAAgeIAAjBQAAgeAlgWQAlgVA1AAQA0AAAmAWQAkAVACAeIAADBQAAAeglAVQgmAWg1AAQg0AAglgWg");
	this.shape_645.setTransform(1155.075,499.65);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#F2EEEC").s().p("AgmBtQglgVAAgfIAAi7QAAAeAlAVQAvAbBDgHIAAC9QgOABgNAAQgxAAgmgWg");
	this.shape_646.setTransform(1149.925,529.1292);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#F0AB39").s().p("AAABlQgYAAgRgKQgSgKAAgOIAAiFQABgOARgLQARgJAYAAQAZAAARAKQARAJABAPIAACFQAAAOgRAKQgRAKgXAAIgDAAg");
	this.shape_647.setTransform(1155.075,465.85);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#EECC3D").s().p("AgkBzQgPgJAAgMIAAi8QgBgMAQgJQAPgIAVAAQAWAAAPAJQAOAIACAMIAAC8QgBAMgPAJQgPAJgWAAQgUAAgQgJg");
	this.shape_648.setTransform(1155.1,473.275);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#207142").s().p("AhZD2QgmgVAAgfIAAmFQAAgdAlgVQAlgWA1AAQA0ABAmAVQAkAVACAdIAAGFQAAAfglAVQgmAWg1AAQg0gBglgVg");
	this.shape_649.setTransform(1155.075,528.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644}]}).wait(1056));

	// table
	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#50B942").s().p("AgjgDIAogHIAfANIgpAIg");
	this.shape_650.setTransform(1220.6,548.875);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#F72C35").s().p("AgjgDIApgHIAeANIgpAIg");
	this.shape_651.setTransform(1213.6,550.225);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#1D181E").s().p("AkHg8ICwgiIFfCcIixAhg");
	this.shape_652.setTransform(1202.825,543.6);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#443D40").s().p("AkHhFIAAgRIIPB7IAAARIixAhg");
	this.shape_653.setTransform(1202.825,546.175);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#F1B338").s().p("Az9g2IZek7IOdGoI5eE6g");
	this.shape_654.setTransform(1154.95,546.55);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#AD7021").s().p("Az9ipIAAhTMAn7ABtIAABTI5eE5g");
	this.shape_655.setTransform(1154.95,566.425);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f().s("#AD7021").ss(6,1).p("AG3pQIttSh");
	this.shape_656.setTransform(1234.15,617.775);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f().s("#AD7021").ss(6,1).p("AnAv5IOBfz");
	this.shape_657.setTransform(1237.875,617.725);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f().s("#AD7021").ss(6,1).p("AHPpwIudTi");
	this.shape_658.setTransform(1073.4,646.05);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f().s("#AD7021").ss(6,1).p("Am7vuIN3fd");
	this.shape_659.setTransform(1076.675,650.325);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#816052").s().p("AzVhVIYOj7IOdHeI6tDDg");
	this.shape_660.setTransform(1164.55,697.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650}]}).to({state:[]},1051).wait(5));

	// room
	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#23162A").s().p("AkiAiIJFhxIAAAtIpFBxg");
	this.shape_661.setTransform(1528.325,668.4);

	this.instance_15 = new lib.ClipGroup();
	this.instance_15.setTransform(1336.7,674.15,1,1,0,0,0,1336.7,649.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.shape_661}]}).to({state:[]},1051).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-125.3,-187.4,2798.8,2121.3);


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

	this.instance_21 = new lib.Path_21();
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

	this.instance_31 = new lib.Path_11();
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

	this.instance_32 = new lib.Path_10();
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

	this.instance_33 = new lib.Path_9();
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

	this.instance_34 = new lib.Path_8_1();
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

	this.instance_35 = new lib.Path_7();
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

	this.instance_36 = new lib.Path_6();
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

	this.instance_37 = new lib.Path_5();
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

	this.instance_38 = new lib.Path_4();
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

	this.instance_41 = new lib.Path_1_2();
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

	this.instance_42 = new lib.Path_0();
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
		this.aptMan.stop();
		
		var target1 = null;
		var played = {};
		var isplaying = false;
		function animateDone(){
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
		
		/*
		_this.apt.on('click', function (e) {
			if ( target1 == _this.apt ){
				animateDone()
				return;
			}
			animatemove(_this.apt, 16, -17800, -11000);
		});
		*/
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
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// lock
	this.lock = new lib.lock();
	this.lock.name = "lock";
	this.lock.setTransform(1217.6,1260.15,2.572,2.572);

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
	this.coffee1.setTransform(1645.3,819.15,0.1366,0.1366,0,0,0,0.8,0);

	this.timeline.addTween(cjs.Tween.get(this.coffee1).wait(1));

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
	this.instance = new lib.map01();
	this.instance.setTransform(0,0,0.32,0.32);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

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
		{src:"images/c1.png", id:"c1"},
		{src:"images/L2.png", id:"L2"},
		{src:"images/c3.png", id:"c3"},
		{src:"images/c4.png", id:"c4"},
		{src:"images/L1.png", id:"L1"},
		{src:"images/L4.png", id:"L4"},
		{src:"images/map01.png", id:"map01"},
		{src:"images/Image_0.png", id:"Image_0"},
		{src:"images/c2.png", id:"c2"},
		{src:"images/Image_1.png", id:"Image_1"}
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