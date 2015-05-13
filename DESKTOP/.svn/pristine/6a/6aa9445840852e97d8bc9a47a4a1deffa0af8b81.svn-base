/*!
 * Radio Tabs.js
 * This file contains application namespace and initializing the other modules
 *
 * @project   Cartier Desktop
 * @date      2014-02-04
 * @author    SapientNitro
 * @licensor  Cartier Desktop
 * @site      Cartier Desktop
 * USAGE :
 *
 * Initialize radio tabs Plugin with pluginName "radio_tabs" to The div that has class ".radio-tabs"
 
 * This Tabs snippet works for 2 and 3 Headings tabs
 
 
 */

;
(function($, window, document, undefined) {

	'use strict';

	//check if jquery is defined, else retun
	if ($ === undefined) {
		console.log("jQuery not found");
		return false;
	}

	var pluginName = "radio_tabs",
		defaults = {
			somevariable: true,
		};

	function Plugin(element, options) {
		this.element = element;
		this.$elem = $(this.element);
		this.options = $.extend({}, defaults, options);
		this.init();
	}

	Plugin.prototype = {
		/*@Static  method   :   init function
          @param            :   None
        */

		init: function() {

			var elem = this.$elem;
			$('.js-radio-tabs').find(".radio-btn-li").removeClass("active");

			//Default Action                 
			elem.find(".tab_content").hide(); //Hide all content
			$('.js-radio-tabs').find(".radio-btn-li:first")
				.addClass("active") //Activate first tab         
			.show()
				.find("input:radio")
				.prop("checked", true);

			var activeID = $('.js-radio-tabs').find(".radio-btn-li:first").find('input').val();
			$.uniform.update();
			if ($('#' + activeID).length)
				$('#' + activeID).show(); //Show first tab content 
			else
				$(".tab_content:first").show(); //Show first tab content

			$('.js-radio-tabs').find(".radio-btn-li").on('click', function() {
				$('.js-radio-tabs').find(".radio-btn-li").removeClass("active").find('span').removeClass('checked');
				$('.js-radio-tabs').find(".radio-btn-li").find("input:radio")
					.prop("checked", false);

				$(this).addClass("active").find('span').addClass('checked').end()
					.find("input:radio")
					.prop("checked", true);

				$(".tab_content").hide(); //Hide all tab content 

				var activeTab = $(this).find("input:radio").val();

				$('#' + activeTab).show();
			});
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