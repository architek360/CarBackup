/*!
 * accordion.js
 * This file contains plugins for Accordion
 *
 * @project   cartier mobile
 * @date      2014-01-21
 * @author    SapientNitro
 * @licensor  cartier mobile
 * @site      cartier mobile
 *
 * Initialize accordion Plugin with pluginName 'makeAccordion' to the div that has class 'js-accordion'
 *
 *           makeAccordion({
 * 				showBehaviour: true
 *			});
 * This file contains a plugin to handle accordion. It is to be called on the root node.
 *
 * 1- If user pass showBehaviour: true; it will generate a simple accordion with expand and collapse effect.
    One expand and another one collapse 

 * 2- If user pass showBehaviour: false; it will generate a slides the slideshow stops so that the user can easily read the content or move back and forth.

 */
;
(function($, window, document, undefined) { //this will cause the browser to check for errors more aggressively
	'use strict';

	//check if jquery is defined, else retun
	if ($ === undefined) {
		cartier.log('jQuery not found');
		return false;
	}

	var pluginName = 'makeAccordion',
		defaults = {
			showBehaviour: true
		},
		_strClassNames;

	function Plugin(element, options) {
		this.element = element;
		this.$elem = $(this.element);
		this.options = $.extend({}, defaults, options);
		this.init();
	}
	var _setCSSClassName = function() {

		_strClassNames = {
			acnode: '.js-accordion__node',
			actitle: '.js-accordion_node__title',
			acdecs: '.js-accordion_node__desc',
			active: 'active',
			inactive: 'inactive'
		};
	};
	Plugin.prototype = {
		/*@Static  method   :   init function
          @param            :   None
        */
		init: function() {
			_setCSSClassName();
			var elem = this.$elem;
			elem.find(_strClassNames.actitle).on('click', {
				showBehaviour: this.options.showBehaviour
			}, this._clickHandler);
			elem.find(_strClassNames.acdecs).hide();
		},

		/*@Static  method   :   handles the click event on the accordion title node
          @param            :   None
        */
		_clickHandler: function(event) {

			var listOfNodes = $(this)
				.closest(_strClassNames.acnode)
				.siblings()
				.andSelf();
			var open_flag = null;

			//If Multiple tabs of an accordion is allowed to open
			if (event.data.showBehaviour === true) {

				if (!($(this).next().is(':hidden'))) {
					open_flag = 1;
				}
				listOfNodes
					.find(_strClassNames.acdecs)
					.slideUp(0)
					.end()
					.find(_strClassNames.actitle)
					.addClass(_strClassNames.inactive)
					.removeClass(_strClassNames.active)
					.find('span')
					.addClass('off')
					.removeClass('on');

			}
			//If only one tab can be opended at a time
			else {
				if ($(this).next().is(':hidden') !== true) {
					open_flag = 1;
					$(this)
						.next()
						.slideUp(0);

					$(this)
						.addClass(_strClassNames.inactive)
						.removeClass(_strClassNames.active)
						.find('span')
						.addClass('off')
						.removeClass('on');
				}
			}
			if ($(this).next().is(':hidden') === true && open_flag === null) {
				$(this)
					.next()
					.slideDown(400);

				$(this).removeClass(_strClassNames.inactive).addClass(_strClassNames.active).removeClass('off').find('span')
					.removeClass('off')
					.addClass('on')
					.ScrollTo({
						duration: 800,
						offsetTop: 140
					});
			}
		},

		/*@Public  method   :   Closes the accordion description in which the param is placed
          @param            :   the object whose description is to be closed
        */
		_closeHandler: function($this) {

			$this.closest('.js-accordion__node')
				.find(_strClassNames.acdecs)
				.slideUp(0)
				.delay(400)
				.end()
				.find(_strClassNames.actitle).ScrollTo({
					duration: 800,
					offsetTop: 140
				})
				.addClass(_strClassNames.inactive)
				.removeClass(_strClassNames.active)
				.find('span')
				.addClass('off')
				.removeClass('on');
		}


	};
	$.fn[pluginName] = function(options) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName,
					new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);