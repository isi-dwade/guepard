/*class flash.system.ApplicationDomain*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._defines = null;
	d._images = null;
	d._linkage = null;
	d._fonts = null;
	d._embedFonts = [];
	
	d.get_parentDomain = function ()/*ApplicationDomain*/
	{
		return null;
		
	};
	
	
	d.ApplicationDomain = function (parentDomain/*ApplicationDomain*/)
	{
		if (parentDomain == undefined) parentDomain = null;
		
		this._defines = {};
		this._images = {};
		this._fonts = {};
		this._linkage = [];
	};
	
	d.getDefinition = function (name/*String*/)/*Object*/
	{
		return flash.utils.getDefinitionByName(name);
	};
	
	d.hasDefinition = function (name/*String*/, type/* */)/*Boolean*/
	{
		//9/3/2020 DAW: if movieclip, return false
		if(type === undefined)
			type = br.com.stimuli.loading.BulkLoader.TYPE_MOVIECLIP;

		if(type == br.com.stimuli.loading.BulkLoader.TYPE_MOVIECLIP)
			return false;
    //8/28/2020 DAW: check if definition exists
		return flash.utils.getDefinitionByName(name) != null;		
	};
	
	d._getImages = function ()
	{
		var array = [];
		
		for (var path in this._images)
		{
			array.push(path);
		}
		
		return array;
	};
	
	d._getFonts = function ()
	{
		var array = [];
		
		for (var path in this._fonts)
		{
			array.push(path);
		}
		
		return array;
	};
	
	
	d._setDefine = function (tag)
	{
		this._defines[ tag.id ] = tag;
	};
	
	d._getDefine = function (id)
	{
		return this._defines[ id ];
	};
	
	d._setImage = function (path, image)
	{
		if (path == undefined || path == "undefined")
		{
			console.log();
		}
		
		this._images[ path ] = image;
		
	};
	
	d._getImage = function (path)
	{
		return this._images[ path ];
	};
	
	d._getImageForLoad = function ()
	{
		for (var path in this._images)
		{
			if (!this._images[ path ]) return path;
		}
		
		return null;
	};
	
	d._getloadImagesProgress = function ()
	{
		var total = 0;
		var loaded = 0;
		
		for (var path in this._images)
		{
			total++;
			
			if (this._images[ path ])
			{
				loaded++;
			}
		}
		
		if (total == 0) return 1;
		
		return loaded / total;
	};
	
	
	d._setFont = function (font)
	{
		console.log("_setFont" + ", " + font._path + ", " + font._fontName);
		
		if (font._path)
		{
			this._fonts[ font._path ] = font;
		}
		else
		{
			this._fonts[ font._fontName ] = font;
		}
	};
	
	d._getFont = function (path)
	{
		return this._fonts[ path ];
	};
	
	d._getFontForLoad = function ()
	{
		for (var path in this._fonts)
		{
			var font = this._fonts[ path ];
			
			if (!font._loaded) return font;
		}
		
		return null;
	};
	
	
	d._addLinkage = function (symbolClass)
	{
		symbolClass.setIdToClasses();
		
		this._linkage.push(symbolClass);
	};
	
	d._getLinkage = function (id)
	{
		
		for (var i = 0; i < this._linkage.length; i++)
		{
			var symbolClass = this._linkage[ i ];
			
			var className = symbolClass.getClassName(id);
			
			if (className)
			{
				return symbolClass;
			}
		}
		
		return null;
	};
	
	
	d._getLinkageId = function (name, weak)
	{
		for (var i = 0; i < this._linkage.length; i++)
		{
			var symbolClass = this._linkage[ i ];
			
			var defineId = symbolClass.getDefineId(name, weak);
			
			if (defineId)
			{
				return defineId;
			}
		}
		
		return null;
	};
	
	d._initAudio = function (folder)
	{
		for (var i in this._defines)
		{
			var define = this._defines[ i ];
			
			if (define instanceof flash.swf.DefineSound)
			{
				define.init(folder);
			}
			;
		}
		;
	};
	
	var s = {};
	
	
	s.get_currentDomain = function ()/*ApplicationDomain*/
	{
		return this._currentDomain;
	};
	
	s.__init__ = function ()
	{
		this._currentDomain = new flash.system.ApplicationDomain();
	};
	
	
	flash.addDescription("flash.system.ApplicationDomain", d, null, s, null);
	
}
());
