(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"map_atlas_1", frames: [[400,1550,11,7],[552,1613,53,37],[559,1606,1,2],[634,1538,18,39],[374,1468,80,80],[0,1468,185,185],[589,1538,43,73],[432,1559,3,5],[650,1516,3,5],[456,1538,131,36],[456,1468,88,68],[408,1559,10,6],[580,1588,6,11],[413,1550,10,6],[453,1568,1,6],[452,1550,2,4],[400,1559,6,11],[396,1573,2,1],[442,1550,8,5],[379,1569,1,1],[396,1569,2,2],[647,1535,1,1],[650,1535,1,1],[445,1573,1,1],[448,1573,1,1],[559,1610,1,1],[384,1569,2,3],[562,1606,1,2],[434,1550,6,7],[565,1606,1,2],[388,1569,2,3],[425,1550,7,6],[450,1557,2,9],[428,1566,7,6],[400,1572,2,2],[556,1606,1,3],[636,1523,10,9],[437,1568,6,5],[642,1534,3,2],[580,1576,7,10],[392,1569,2,3],[404,1572,2,2],[437,1559,6,7],[562,1610,1,1],[0,984,653,482],[374,1569,3,4],[379,1572,3,2],[638,1579,1,13],[552,1576,26,15],[552,1593,26,11],[634,1589,1,13],[565,1610,1,1],[636,1534,4,2],[408,1567,10,6],[420,1558,10,6],[568,1606,1,1],[580,1601,6,8],[420,1566,6,8],[552,1610,2,1],[552,1606,2,2],[634,1579,2,8],[445,1568,6,3],[374,1576,131,36],[636,1504,12,17],[546,1468,88,68],[374,1550,11,17],[387,1550,11,17],[636,1468,16,16],[655,984,440,644],[507,1576,43,73],[0,0,857,982],[636,1486,15,16],[859,0,440,644],[648,1523,3,10],[445,1557,3,9],[650,1504,3,10],[187,1468,185,185]]}
];


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



(lib.CachedBmp_90 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(64);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(65);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(66);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(67);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap13 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(68);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(69);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap11 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(70);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(71);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap12 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(72);
}).prototype = p = new cjs.Sprite();



(lib.map01 = function() {
	this.initialize(img.map01);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,8000,4500);


(lib.CachedBmp_9 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(73);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(74);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(75);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["map_atlas_1"]);
	this.gotoAndStop(76);
}).prototype = p = new cjs.Sprite();
// helper functions:

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
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-163.15,-120.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.1,-120.4,326.5,241);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-163.15,-120.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.1,-120.4,326.5,241);


(lib.purplemove = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-46.25,-46.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.purplemove, new cjs.Rectangle(-46.2,-46.2,92.5,92.5), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,26.5,18.5), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_92();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,9,19.5), null);


(lib.Group_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_2, new cjs.Rectangle(0,0,0.5,1), null);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_1 = new lib.CachedBmp_90();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,5.5,3.5), null);


(lib.boxmove = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// box
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(-46.25,-46.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.boxmove, new cjs.Rectangle(-46.2,-46.2,92.5,92.5), null);


(lib.purple = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// whitedot
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(-20.1,-20.1,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(150).to({_off:false},0).wait(30));

	// phone2
	this.instance_1 = new lib.Bitmap13();
	this.instance_1.setTransform(-26,-56,0.1895,0.1895);

	this.instance_2 = new lib.Tween7("synched",0);
	this.instance_2.setTransform(15.7,5);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween8("synched",0);
	this.instance_3.setTransform(15.7,5);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},89).to({state:[{t:this.instance_2}]},40).to({state:[{t:this.instance_3}]},20).to({state:[]},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(129).to({_off:false},0).to({_off:true,alpha:0},20).wait(31));

	// phone1
	this.instance_4 = new lib.Tween5();
	this.instance_4.setTransform(15.7,5);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween6("synched",0);
	this.instance_5.setTransform(15.7,5);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(35).to({_off:false},0).to({_off:true,alpha:1,mode:"synched",startPosition:0},14).wait(131));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(35).to({_off:false},14).to({startPosition:0},80).to({alpha:0},20).to({_off:true},1).wait(30));

	// hand
	this.instance_6 = new lib.Tween3();
	this.instance_6.setTransform(-7.1,46.95);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.instance_7 = new lib.Tween4("synched",0);
	this.instance_7.setTransform(-7.1,46.95);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(35).to({_off:false},0).to({_off:true,alpha:1,mode:"synched",startPosition:0},14).wait(131));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(35).to({_off:false},14).to({startPosition:0},80).to({alpha:0},20).to({_off:true},1).wait(30));

	// background
	this.instance_8 = new lib.Tween1();
	this.instance_8.setTransform(14.05,25.7);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.instance_9 = new lib.Tween2("synched",0);
	this.instance_9.setTransform(14.05,25.7);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(35).to({_off:false},0).to({_off:true,alpha:1,mode:"synched",startPosition:0},14).wait(131));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(35).to({_off:false},14).to({startPosition:0},80).to({alpha:0},20).to({_off:true},1).wait(30));

	// purplemove
	this.purple = new lib.purplemove();
	this.purple.name = "purple";

	this.timeline.addTween(cjs.Tween.get(this.purple).wait(1).to({rotation:6.2069},0).wait(1).to({rotation:12.4138},0).wait(1).to({rotation:18.6207},0).wait(1).to({rotation:24.8276},0).wait(1).to({rotation:31.0345},0).wait(1).to({rotation:37.2414},0).wait(1).to({rotation:43.4483},0).wait(1).to({rotation:49.6552},0).wait(1).to({rotation:55.8621},0).wait(1).to({rotation:62.069},0).wait(1).to({rotation:68.2759},0).wait(1).to({rotation:74.4828},0).wait(1).to({rotation:80.6897},0).wait(1).to({rotation:86.8966},0).wait(1).to({rotation:93.1034},0).wait(1).to({rotation:99.3103},0).wait(1).to({rotation:105.5172},0).wait(1).to({rotation:111.7241},0).wait(1).to({rotation:117.931},0).wait(1).to({rotation:124.1379},0).wait(1).to({rotation:130.3448},0).wait(1).to({rotation:136.5517},0).wait(1).to({rotation:142.7586},0).wait(1).to({rotation:148.9655},0).wait(1).to({rotation:155.1724},0).wait(1).to({rotation:161.3793},0).wait(1).to({rotation:167.5862},0).wait(1).to({rotation:173.7931},0).wait(1).to({rotation:180},0).wait(151));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.1,-94.7,326.5,241);


(lib.coffee1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// window
	this.instance = new lib.Path();
	this.instance.setTransform(11.2,2.65,1,1,0,0,0,13.2,9.2);
	this.instance.alpha = 0.5;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// door
	this.instance_1 = new lib.CachedBmp_7();
	this.instance_1.setTransform(-28.85,5.3,0.5,0.5);

	this.instance_2 = new lib.Path_1();
	this.instance_2.setTransform(-25.05,8.85,1,1,0,0,0,4.4,9.8);
	this.instance_2.alpha = 0.8789;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).wait(1));

	// coffeesign
	this.instance_3 = new lib.CachedBmp_15();
	this.instance_3.setTransform(20.95,-22.9,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_15();
	this.instance_4.setTransform(15.7,-21.9,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_13();
	this.instance_5.setTransform(10.6,-20.95,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_12();
	this.instance_6.setTransform(5.5,-19.95,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_11();
	this.instance_7.setTransform(-2.45,-18.5,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_10();
	this.instance_8.setTransform(-9.45,-17.25,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_9();
	this.instance_9.setTransform(22.8,-16.2,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_8();
	this.instance_10.setTransform(-5.8,-11.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(1));

	// shop_outsite
	this.instance_11 = new lib.CachedBmp_18();
	this.instance_11.setTransform(-11.2,-11.25,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_17();
	this.instance_12.setTransform(-32.75,-13.7,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_16();
	this.instance_13.setTransform(-32.75,-21.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_13},{t:this.instance_12},{t:this.instance_11}]}).wait(1));

	// Layer_11
	this.instance_14 = new lib.CachedBmp_19();
	this.instance_14.setTransform(16.1,1.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	// Layer_12
	this.instance_15 = new lib.CachedBmp_20();
	this.instance_15.setTransform(13.95,4.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	// Layer_13
	this.instance_16 = new lib.CachedBmp_23();
	this.instance_16.setTransform(12.8,1.15,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_22();
	this.instance_17.setTransform(12.7,1.1,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_21();
	this.instance_18.setTransform(12.7,1.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_18},{t:this.instance_17},{t:this.instance_16}]}).wait(1));

	// Layer_14
	this.instance_19 = new lib.CachedBmp_29();
	this.instance_19.setTransform(11.9,5.3,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_28();
	this.instance_20.setTransform(10.7,3.45,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_27();
	this.instance_21.setTransform(10.7,3.35,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_26();
	this.instance_22.setTransform(12.55,5.05,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_25();
	this.instance_23.setTransform(11.05,4.45,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_24();
	this.instance_24.setTransform(11.25,4.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19}]}).wait(1));

	// Layer_15
	this.instance_25 = new lib.CachedBmp_31();
	this.instance_25.setTransform(5.4,4.2,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_30();
	this.instance_26.setTransform(5.4,1.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_26},{t:this.instance_25}]}).wait(1));

	// Layer_16
	this.instance_27 = new lib.CachedBmp_35();
	this.instance_27.setTransform(17.05,6.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1));

	// Layer_17
	this.instance_28 = new lib.CachedBmp_33();
	this.instance_28.setTransform(13.8,8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1));

	// Layer_18
	this.instance_29 = new lib.CachedBmp_35();
	this.instance_29.setTransform(9.2,2.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1));

	// Layer_19
	this.instance_30 = new lib.CachedBmp_35();
	this.instance_30.setTransform(5.95,4.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1));

	// Layer_20
	this.instance_31 = new lib.CachedBmp_36();
	this.instance_31.setTransform(14,-0.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1));

	// Layer_21
	this.instance_32 = new lib.CachedBmp_37();
	this.instance_32.setTransform(14.25,-0.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1));

	// _Group__2
	this.instance_33 = new lib.Group_2();
	this.instance_33.setTransform(15.4,0.95,1,1,0,0,0,0.3,0.5);
	this.instance_33.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1));

	// Layer_23
	this.instance_34 = new lib.CachedBmp_38();
	this.instance_34.setTransform(15.7,-0.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1));

	// Layer_25
	this.instance_35 = new lib.CachedBmp_39();
	this.instance_35.setTransform(15.05,0.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1));

	// Layer_27
	this.instance_36 = new lib.CachedBmp_40();
	this.instance_36.setTransform(14.15,-1.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1));

	// Layer_29
	this.instance_37 = new lib.CachedBmp_41();
	this.instance_37.setTransform(12.5,1.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1));

	// Layer_30
	this.instance_38 = new lib.CachedBmp_42();
	this.instance_38.setTransform(14.8,1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(1));

	// Layer_32
	this.instance_39 = new lib.CachedBmp_44();
	this.instance_39.setTransform(13.95,0.9,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_43();
	this.instance_40.setTransform(13.95,0.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_40},{t:this.instance_39}]}).wait(1));

	// Layer_33
	this.instance_41 = new lib.CachedBmp_45();
	this.instance_41.setTransform(11.35,3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(1));

	// Layer_34
	this.instance_42 = new lib.CachedBmp_46();
	this.instance_42.setTransform(13.9,5.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(1));

	// Layer_35
	this.instance_43 = new lib.CachedBmp_47();
	this.instance_43.setTransform(12.2,11.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(1));

	// Layer_36
	this.instance_44 = new lib.CachedBmp_48();
	this.instance_44.setTransform(11.95,11.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(1));

	// Layer_37
	this.instance_45 = new lib.CachedBmp_49();
	this.instance_45.setTransform(12.15,7.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(1));

	// Layer_38
	this.instance_46 = new lib.CachedBmp_50();
	this.instance_46.setTransform(12.55,4.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(1));

	// Layer_39
	this.instance_47 = new lib.CachedBmp_51();
	this.instance_47.setTransform(11.25,4.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(1));

	// Layer_40
	this.instance_48 = new lib.CachedBmp_52();
	this.instance_48.setTransform(11,6.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(1));

	// Layer_41
	this.instance_49 = new lib.CachedBmp_53();
	this.instance_49.setTransform(13.45,9.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(1));

	// Layer_42
	this.instance_50 = new lib.CachedBmp_54();
	this.instance_50.setTransform(13.3,9.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(1));

	// Layer_43
	this.instance_51 = new lib.CachedBmp_84();
	this.instance_51.setTransform(12,5.6,0.5,0.5);

	this.instance_52 = new lib.CachedBmp_83();
	this.instance_52.setTransform(12,6.1,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_82();
	this.instance_53.setTransform(14.9,0.3,0.5,0.5);

	this.instance_54 = new lib.CachedBmp_81();
	this.instance_54.setTransform(15.35,0.1,0.5,0.5);

	this.instance_55 = new lib.CachedBmp_80();
	this.instance_55.setTransform(15.6,4.85,0.5,0.5);

	this.instance_56 = new lib.CachedBmp_79();
	this.instance_56.setTransform(14.55,7.2,0.5,0.5);

	this.instance_57 = new lib.CachedBmp_78();
	this.instance_57.setTransform(14.35,9.9,0.5,0.5);

	this.instance_58 = new lib.CachedBmp_77();
	this.instance_58.setTransform(14.2,9.9,0.5,0.5);

	this.instance_59 = new lib.CachedBmp_76();
	this.instance_59.setTransform(12.8,9.35,0.5,0.5);

	this.instance_60 = new lib.CachedBmp_76();
	this.instance_60.setTransform(12.8,9.35,0.5,0.5);

	this.instance_61 = new lib.CachedBmp_74();
	this.instance_61.setTransform(15.9,9.7,0.5,0.5);

	this.instance_62 = new lib.CachedBmp_74();
	this.instance_62.setTransform(15.9,9.7,0.5,0.5);

	this.instance_63 = new lib.CachedBmp_72();
	this.instance_63.setTransform(16,9.65,0.5,0.5);

	this.instance_64 = new lib.CachedBmp_71();
	this.instance_64.setTransform(16.15,9.65,0.5,0.5);

	this.instance_65 = new lib.CachedBmp_71();
	this.instance_65.setTransform(16.15,9.65,0.5,0.5);

	this.instance_66 = new lib.CachedBmp_69();
	this.instance_66.setTransform(13,11.45,0.5,0.5);

	this.instance_67 = new lib.CachedBmp_69();
	this.instance_67.setTransform(13,11.45,0.5,0.5);

	this.instance_68 = new lib.CachedBmp_67();
	this.instance_68.setTransform(13.05,11.4,0.5,0.5);

	this.instance_69 = new lib.CachedBmp_71();
	this.instance_69.setTransform(13.2,11.35,0.5,0.5);

	this.instance_70 = new lib.CachedBmp_71();
	this.instance_70.setTransform(13.2,11.35,0.5,0.5);

	this.instance_71 = new lib.CachedBmp_64();
	this.instance_71.setTransform(12.85,9.7,0.5,0.5);

	this.instance_72 = new lib.CachedBmp_64();
	this.instance_72.setTransform(12.85,9.7,0.5,0.5);

	this.instance_73 = new lib.CachedBmp_72();
	this.instance_73.setTransform(12.9,9.6,0.5,0.5);

	this.instance_74 = new lib.CachedBmp_61();
	this.instance_74.setTransform(13.05,9.55,0.5,0.5);

	this.instance_75 = new lib.CachedBmp_61();
	this.instance_75.setTransform(13.05,9.55,0.5,0.5);

	this.instance_76 = new lib.CachedBmp_69();
	this.instance_76.setTransform(15.85,11.35,0.5,0.5);

	this.instance_77 = new lib.CachedBmp_69();
	this.instance_77.setTransform(15.85,11.35,0.5,0.5);

	this.instance_78 = new lib.CachedBmp_72();
	this.instance_78.setTransform(15.95,11.3,0.5,0.5);

	this.instance_79 = new lib.CachedBmp_61();
	this.instance_79.setTransform(16.1,11.25,0.5,0.5);

	this.instance_80 = new lib.CachedBmp_61();
	this.instance_80.setTransform(16.1,11.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51}]}).wait(1));

	// _Path_
	this.instance_81 = new lib.Path_2();
	this.instance_81.setTransform(14.9,11.2,1,1,0,0,0,2.8,1.7);
	this.instance_81.alpha = 0.2109;

	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(1));

	// Layer_45
	this.instance_82 = new lib.CachedBmp_85();
	this.instance_82.setTransform(13.6,1.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(1));

	// Layer_46
	this.instance_83 = new lib.CachedBmp_86();
	this.instance_83.setTransform(12.45,1.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(1));

	// Layer_47
	this.instance_84 = new lib.CachedBmp_87();
	this.instance_84.setTransform(11.1,-21.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(1));

	// Layer_48
	this.instance_85 = new lib.CachedBmp_88();
	this.instance_85.setTransform(-32.75,5.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(1));

	// Layer_49
	this.instance_86 = new lib.CachedBmp_89();
	this.instance_86.setTransform(-32.75,-21.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.coffee1, new cjs.Rectangle(-32.7,-22.9,65.5,46.099999999999994), null);


(lib.box = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// boxmove
	this.boxmove = new lib.boxmove();
	this.boxmove.name = "boxmove";

	this.timeline.addTween(cjs.Tween.get(this.boxmove).wait(1).to({rotation:6.2069},0).wait(1).to({rotation:12.4138},0).wait(1).to({rotation:18.6207},0).wait(1).to({rotation:24.8276},0).wait(1).to({rotation:31.0345},0).wait(1).to({rotation:37.2414},0).wait(1).to({rotation:43.4483},0).wait(1).to({rotation:49.6552},0).wait(1).to({rotation:55.8621},0).wait(1).to({rotation:62.069},0).wait(1).to({rotation:68.2759},0).wait(1).to({rotation:74.4828},0).wait(1).to({rotation:80.6897},0).wait(1).to({rotation:86.8966},0).wait(1).to({rotation:93.1034},0).wait(1).to({rotation:99.3103},0).wait(1).to({rotation:105.5172},0).wait(1).to({rotation:111.7241},0).wait(1).to({rotation:117.931},0).wait(1).to({rotation:124.1379},0).wait(1).to({rotation:130.3448},0).wait(1).to({rotation:136.5517},0).wait(1).to({rotation:142.7586},0).wait(1).to({rotation:148.9655},0).wait(1).to({rotation:155.1724},0).wait(1).to({rotation:161.3793},0).wait(1).to({rotation:167.5862},0).wait(1).to({rotation:173.7931},0).wait(1).to({rotation:180},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.4,-65.4,130.8,130.8);


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
			animatemove(_this.coffee1, 2, -600, -300);
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
		{src:"images/map01.png", id:"map01"},
		{src:"images/map_atlas_1.png", id:"map_atlas_1"}
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