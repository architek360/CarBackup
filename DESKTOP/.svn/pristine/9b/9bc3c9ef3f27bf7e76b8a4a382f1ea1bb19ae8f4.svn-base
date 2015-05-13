/*!
 * ajax.wrapper.js
 * This file contians ajax wrapper method that handles all ajax calls 
 *
 * @project   Richemont
 * @date      2014-05-26
 * @author    YOUR NAME, SapientNitro <YOUREMAIL@sapient.com>
 * @site      Richemont 
   @dependency none
 * @ NOTE:
    This file has the following sequence of the actions
    1) Declare all the private variables
    2) ajax wrapper method
 
 */

;(function(window, $, AjaxWrapper, undefined) {


	//this will cause the browser to check for errors more aggressively
	'use strict';

	//check if jquery is defined, else retun
	if ($ === undefined) {
		platform.log("jQuery not found");
		return false;
	}

	/*
		private variables
		*/
	var
	_objPropertiesMsg;


	/*
			@public method : get and call the ajax method 
			@customOptions : custom option to override the default options	
	*/
	AjaxWrapper.getXhrObj = function(customOptions) {

		var
		_defaultOptions = {
			type: 'POST',
			async: true,
			cache: false,
			url: '',
			data: {},
			contentType: "application/json; charset=utf-8",
			dataType: "json"
		},
			_objConfig = $.extend({}, _defaultOptions, customOptions),

			_objAjaxParam = {
				type: _objConfig.type, //mandatory field
				url: _objConfig.url, //mandatory
				headers: (_objConfig.headers !== undefined) ? _objConfig.headers : {},
				async: (_objConfig.async !== undefined) ? _objConfig.async : true,
				data: (_objConfig.data !== undefined) ? _objConfig.data : {},
				dataType: (_objConfig.dataType !== undefined) ? _objConfig.dataType : 'json',
				cache: (_objConfig.cache !== undefined) ? _objConfig.cache : true,
				contentType: (_objConfig.contentType !== undefined) ? _objConfig.contentType : 'application/x-www-form-urlencoded',
				// Global beforeSend wrapper with user defined function
				beforeSend: function(jqXHR) {
					// Execute user defined method
					if (typeof _objConfig.beforeSend === 'function') {
						_objConfig.beforeSend(jqXHR);
					}
				}

			},

			/*
					This ajax wrapper function returns the return value from $.ajax, 
					which is a promise object. A promise acts as a proxy for a result of an asynchronous function.
					When $.ajax() is invoked a request is sent to the server, 
					but the function returns immediately without waiting for the response.
					The promise object represents that unknown response.
	     		 */
			_objJqXHR = $.ajax(_objAjaxParam);


		/* handling ajax failure*/
		_objJqXHR.fail(function(jqXHR, textStatus) {
				if (_objConfig.ajaxCallback && typeof(_objConfig.ajaxCallback) === "function") {  
			        	_objConfig.ajaxCallback(jqXHR.status);
			    	} 
			});

		/* handling ajax success*/
		_objJqXHR.done(function(data) {
            
            	if (_objConfig.ajaxCallback && typeof(_objConfig.ajaxCallback) === "function") {  
                   _objConfig.ajaxCallback(data);
			    } 
            	
		 });


		// return deferred ajax request object
		//return _objJqXHR;
	};



}(window, jQuery, RICHEMONT.AjaxWrapper));