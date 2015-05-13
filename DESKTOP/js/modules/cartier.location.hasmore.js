/*
 * cartier.location.hasmore.js
 * This file contains functionalities handling the Storelocator and Boutique Pages
 *
 * @project   Cartier Desktop
 * @date      2014-01-03
 * @author    Sapient 
 * @licensor  cartier Desktop
 * @site      cartier Desktop
   @dependency cartier.core.js, cartier.location.js
 * @ NOTE:
    This file has the following sequence of the actions
    1) Declare all the private variables
    2) caching jquery wrapper objects and messages
    $last) call to init() method
 */
;
(function(win, $, ns, undefined) {
	//this will cause the browser to check for errors more aggressively
	//'use strict';
	//check if Jquery is defined, else return
	if (typeof $ === 'undefined') {
		//console.log('jQuery not found');
		return false;
	}
	cartier.location.hasmore = function(element, options, ns, win, $, undefined) {
		'use strict';
		var that = this,
			$el,

			//--------------------------------------------------------------------------------------------------------
			//          EVENT Bindings
			//--------------------------------------------------------------------------------------------------------
			/*
          @private method : bind events
          @param : none
        */
			_bindEvents = function() {
				ns.subscribe('dataChanged', function() {
					$el.hide();
				});
				ns.subscribe('hasmore', function() {
					$el.show();
				});
				$el.on('click', function() {
					that.publish('loadMore', {});
				});
			},
			/*
        @private Method : initailize the module
        */
			_initailize = function() {
				$el = $(element);
				// subscribe to filter event
				_bindEvents();
			};
		_initailize();
	};

}(window, jQuery, cartier.location));