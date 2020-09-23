/*class flash.media.SoundChannel*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._leftPeak = 0;
	d._rightPeak = 0;
	d._position = 0;
	d._transform = null;
	d._sound = null;
	
	d.get_leftPeak = function ()/*Number*/
	{
		//9/1/2020 DAW: Fake it
		//return this._leftPeak;
		if(this._sound && this._sound._audio && !this._sound._audio.paused) {
			var v = com.IndividualSoftware.TypingGames.GameApp.inst().RndInRange(0, 15000) / 10000;
			return v > 0.5 ? v-0.5 : 0;
		} 
		else
			return 0;
	};
	
	d.get_position = function ()/*Number*/
	{
		if(this._sound && this._sound._audio)
		{
			return this._sound._audio.currentTime;
		}
		return this._position;
	};
	
	d.get_rightPeak = function ()/*Number*/
	{
		return this.leftPeak();
	};
	
	d.get_soundTransform = function ()/*SoundTransform*/
	{
		return this._transform;
	};
	
	d.set_soundTransform = function (value/*SoundTransform*/)/*void*/
	{
		this._transform = value;

		if(this._sound && this._sound._audio)
		{
			this._sound._audio.volume = this._transform.get_volume();
		}
		
		return value;
	};
	
	
	d.SoundChannel = function (sound/*Sound*/)
	{
		this.EventDispatcher_constructor();

		this._sound = sound;
		if(this._sound._audio)
			this._sound._audio.onended = flash.bindFunction(this, this._ended);
	};
	
	d.stop = function ()/*void*/
	{
		if(this._sound && this._sound._audio)
		{
			this._sound._audio.pause();
		}
	};

	//8/28/2020 DAW: add End audio support
	d._ended = function(evt) {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.SOUND_COMPLETE));
	}

	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	flash.addDescription("flash.media.SoundChannel", d, "flash.events.EventDispatcher", s, null);
	
}
());
