/*class flash.media.Sound*/
/*
import flash.events.*;
import flash.net.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._audio = null;
	
	d.get_bytesLoaded = function ()/*uint*/
	{
		return 0;
	};
	
	d.get_bytesTotal = function ()/*int*/
	{
		return 0;
	};
	
	d.get_id3 = function ()/*ID3Info*/
	{
		return null;
	};
	
	d.get_isBuffering = function ()/*Boolean*/
	{
		return false;
	};
	
	d.get_length = function ()/*Number*/
	{
		if (this._audio)
		{
			return this._audio.duration;
		}

		return 0;
	};
	
	d.get_url = function ()/*String*/
	{
		return null;
	};
	
	
	d.Sound = function (stream/*URLRequest*/, context/*SoundLoaderContext*/)
	{
		this.EventDispatcher_constructor();
		
		if (stream == undefined) stream = null;
		if (context == undefined) context = null;
		
		this.load(stream, context);
		
		flash.linkage(this, flash.media.Sound);
	};
	
	d.close = function ()/*void*/
	{
		
	};
	
	d.load = function (stream/*URLRequest*/, context/*SoundLoaderContext*/)/*void*/
	{
		if (context == undefined) context = null;
		if (stream == undefined) stream = null;
    //8/28/2020 DAW: add audio support
		if(stream == null) return;

		this._audio = new Audio();
		//this._audio.onload = flash.bindFunction(this, this._addSoundObject);
		this._audio.onerror = flash.bindFunction(this, this._loadError);
		this._audio.onloadstart = flash.bindFunction(this, this._loadStart);
		//this._audio.onloadend = flash.bindFunction(this, this._addSoundObject);
		this._audio.onloadeddata = flash.bindFunction(this, this._addSoundObject);
		this._audio.onloadedmetadata = flash.bindFunction(this, this._loadMetadata);
		//this._audio.canplaythrough = flash.bindFunction(this, this._addSoundObject);
		this._audio.onended = flash.bindFunction(this, this._ended);
		this._audio.src = stream.url;
	};
      //8/28/2020 DAW: add audio support
	d._loadStart = function(evt) {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.OPEN));
	};
	d._loadProgress = function(evt) {
		this.dispatchEvent(new flash.events.ProgressEvent(flash.events.ProgressEvent.PROGRESS));
	};
	d._loadMetadata = function(evt) {
		this._metaData = "";
	};
	d._addSoundObject = function(evt) {	
		this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE));
	};
	d._loadError = function(evt) {
		this.dispatchEvent(new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR));
	};
    d._ended = function(evt) {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.SOUND_COMPLETE));
	}
	//8/28/2020 DAW: End add audio support
	
	d.play = function (startTime/*Number*/, loops/*int*/, sndTransform/*SoundTransform*/)/*SoundChannel*/
	{
		if (this._audio)
		{
			this._audio.play();
		}

		var soundChannel/*SoundChannel*/ = new flash.media.SoundChannel(this);
		
		return soundChannel;
	};

	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	flash.addDescription("flash.media.Sound", d, "flash.events.EventDispatcher", s, null);
	
}
());
