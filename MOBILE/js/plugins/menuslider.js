/*!
 * menuslider.js
 * This file contains plugins for menu slider
 *
 * @project   cartier mobile
 * @date      2014-01-21
 * @author    SapientNitro
 * @licensor  cartier mobile
 * @site      cartier mobile
 * USAGE :
 *
 * Initialize offcanvas menu with pluginName "menuslider" to The div that has class "left-push-menu"
 *      $menuSliderWrapper = $(".left-push-menu");
 *        $menuSliderWrapper.menuslider();
 *      };
 * 
 *  This will create an off canvas layout with the default settings providing you supply the following 
 	html structure
 * <ul class="nav">
        <li>
          <a href="#" class="nav-arrow">Nav</a>
          <ul>
                <li><a href="#">Sub Nav 1</a></li>
                <li><a href="#">Sub Nav 2</a></li>
                <li><a href="#">Sub Nav 3</a></li>
                
           </ul>
        </li>
    </ul>
 *

 * The scrollableArea divs are there to make the content scrollable as the overflow 
    of the page is hidden to allow the off canvas effect to work.
 */

;
(function($, window, document, undefined) {
	'use strict';

	//check if jquery is defined, else retun
	if ($ === undefined) {
		//console.log("jQuery not found");
		return false;
	}

	var pluginName = "menuslider",
		defaults = {
			resizeWidth: '768',
			collapserTitle: 'Main Menu',
			animSpeed: 'medium',
			easingEffect: null,
			indentChildren: false,
			childrenIndenter: '&nbsp;&nbsp;'
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
			togglemenu : ".toggleMenu",
			active : "active",
			pushmenu : ".left-push-menu",
			pushheader : "body-push_h",
			vport : "viewportWrapper",
			bodypush : "body-push",
			navarrowdown : "nav-arrow-down"
		};
	};

	Plugin.prototype = {

		init: function() {
			_setCSSClassName();
			$(".nav li a").each(function() {
				if ($(this).next().length > 0) {
					$(this).addClass("nav-arrow");
				};
			})

			$(_strClassNames.togglemenu).click(function(e) {
				e.preventDefault();
				$(this).toggleClass(_strClassNames.active);
				$(_strClassNames.pushmenu).toggle();
				Plugin.prototype.adjustMenu();
			});

			$(".left-push-menu").hammer().on("swipeleft", function(e){
				e.preventDefault();
				$(_strClassNames.togglemenu).toggleClass(_strClassNames.active);
				$(_strClassNames.pushmenu).toggle();
				Plugin.prototype.adjustMenu();

			});


			$(".main-container,footer").click(function() {
				if ($(_strClassNames.togglemenu).hasClass(_strClassNames.active)) {
					$(_strClassNames.togglemenu).removeClass(_strClassNames.active);
					$(_strClassNames.pushmenu).toggle();
					Plugin.prototype.adjustMenu();
				}
			});

			$(".main-container,footer").hammer({
				drag_lock_to_axis: true,
				swipe_max_touches: 0
			})
				.on('swipe drag', function(event) {
					if ($(_strClassNames.togglemenu).hasClass(_strClassNames.active)) {
						event.gesture.preventDefault();

					}
				});



			Plugin.prototype.adjustMenu();

			$(window).bind('resize orientationchange', function() {
				var ww = document.body.clientWidth;
				Plugin.prototype.adjustMenu();
			});

		},

		adjustMenu: function(argument) {
			$(_strClassNames.togglemenu).css("display", "inline-block");
			if (!$(_strClassNames.togglemenu).hasClass(_strClassNames.active)) {
				$('body').removeClass(_strClassNames.bodypush);
				$('html').removeClass(_strClassNames.vport);
				$('header').removeClass(_strClassNames.pushheader);
				$(_strClassNames.pushmenu).css('left', '-450px').hide();
				$('header').css('left', '0x');
			} else {
				$('body').addClass(_strClassNames.bodypush);
				$('html').addClass(_strClassNames.vport);
				$('header').addClass(_strClassNames.pushheader);
				$(_strClassNames.pushmenu).css({
					'left': '0px',
					'overflow-y': 'scroll',
					'-webkit-overflow-scrolling': 'touch'
				}).show();
			}
			$(".nav li").unbind('mouseenter mouseleave');
			$(".nav li a.nav-arrow").unbind('click').bind('click', function(e) {
				// must be attached to anchor element to prevent bubbling
				e.preventDefault();
				$(this).parent("li").toggleClass("hover");
				$(this).toggleClass(_strClassNames.navarrowdown);

			});
		},
		resizeMenu: function(event) {

		},

		indent: function(num, options) {

		}
	};

	$.fn[pluginName] = function(options) {
		return this.each(function() {

			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName,
					new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);