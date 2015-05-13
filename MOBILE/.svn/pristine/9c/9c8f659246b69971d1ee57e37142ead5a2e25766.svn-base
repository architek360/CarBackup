/*!
 *
 * jquery.browser.sniffer.js
 * This file contains plugins to  scroll  particular Element to specific position
 *
 * @project   cartier mobile
 * @date      2014-01-21
 * @author    SapientNitro
 * @licensor  cartier mobile
 * @site      cartier mobile

 * jQuery Browser Plugin v0.0.5
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */
/*!
 * jquery.browser.sniffer.js
 * This file helps in browser / Device / OS Detection
 *
 * @project   cartier mobile
 * @date      2014-03-21
 */




(function(jQuery, window, undefined) {
	"use strict";

	var matched, browser;

	jQuery.uaMatch = function(ua) {
		ua = ua.toLowerCase();

		var match = /(opr)[\/]([\w.]+)/.exec(ua) ||
			/(chrome)[ \/]([\w.]+)/.exec(ua) ||
			/(ucbrowser)[ \/]([\w.]+)/.exec(ua) ||
			/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
			/(webkit)[ \/]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
			/(msie) ([\w.]+)/.exec(ua) ||
			ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
			ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
			[];

		var platform_match = /(ipad)/.exec(ua) ||
			/(iphone)/.exec(ua) ||
			/(android)/.exec(ua) ||
			/(windows phone)/.exec(ua) ||
			/(win)/.exec(ua) ||
			/(mac)/.exec(ua) ||
			/(linux)/.exec(ua) ||
			[];

		var device_match =
			/(gt-i9500)/.exec(ua) ||
			/(gt-i9300)/.exec(ua) ||
			/safari/.exec(ua) ||
			/iphone/.exec(ua) ||
			[];


		return {
			browser: match[3] || match[1] || "",
			version: match[2] || "0",
			platform: platform_match[0] || "",
			device: device_match[0] || "unrecognized"
		};
	};

	matched = jQuery.uaMatch(window.navigator.userAgent);
	browser = {};

	if (matched.browser) {
		browser[matched.browser] = true;
		browser.version = matched.version;
		browser.versionNumber = parseInt(matched.version);
	}

	if (matched.platform) {
		browser[matched.platform] = true;
	}

	// Chrome, Opera 15+ and Safari are webkit based browsers
	if (browser.chrome || browser.opr || browser.safari) {
		browser.webkit = true;
	}

	// IE11 has a new token so we will assign it msie to avoid breaking changes
	if (browser.rv) {
		var ie = 'msie';

		matched.browser = ie;
		browser[ie] = true;
	}

	// Opera 15+ are identified as opr
	if (browser.opr) {
		var opera = 'opera';

		matched.browser = opera;
		browser[opera] = true;
	}

	// Stock Android browsers are marked as safari on Android.
	if (browser.safari && browser.android) {
		var android = 'stock';

		matched.browser = android;
		browser[android] = true;
	}

	// Assign the name and platform variable
	browser.name = matched.browser;
	browser.platform = matched.platform;
	browser.device = matched.device;

	jQuery.browser = browser;

})(jQuery, window);