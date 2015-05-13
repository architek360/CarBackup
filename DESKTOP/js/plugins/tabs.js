/*!
 * Tabs.js
 * This file contains application namespace and initializing the other modules
 *
 * @project   Cartier Desktop
 * @date      2014-02-04
 * @author    SapientNitro
 * @licensor  Cartier Desktop
 * @site      Cartier Desktop


 * USAGE : 
 * 
 * Initialize tabs Plugin with pluginName "tabs" to The div that has class "js-tabs"
 * You need to follow/use the below HTML format for tabs to work
     
    * * * * *  
        <div class="tabs js-tabs">
            <div class="tab-header">
                <ul class="tabs__nav">
                    
                    <li class="tabs__title tab-active js-tab-active"><span class="tab__title-wrapper">First Tabs Heading</span></li>
                    
                    
                    <li class="tabs__title"><span class="tab__title-wrapper">Second Heading</span></li>
                    
                    
                </ul>
            </div>
            
            <div class="tabs__content content-active js-content-active">First Tabs Content</div>
            <div class="tabs__content">Second Tabs Content</div>
        </div>
     * * * * *  
    This Tabs snippet works for 2 and 3 Headings tabs 


 */


;
(function($, window, document, undefined) {

    'use strict';

    //check if jquery is defined, else retun
    if ($ === undefined) {
        //console.log("jQuery not found");
        return false;
    }

    var pluginName = "tabs",
        defaults = {
            somevariable: true

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
            elem.find('.js-tab-list').on('click', 'li', function() {
                if(!$(this).hasClass('js-tab-active')){
                    var tabindex = $(this).index('.js-tab-list li'); // This will index the tab number clicked into tab_index  
                    $('.js-tab-list li')
                        .removeClass('tab-active js-tab-active');
                    $(this)
                        .addClass('tab-active js-tab-active'); // This will Highlight the Active tab  

                    $('.js-tabs .tabs__content')
                        .removeClass('content-active js-content-active')
                        .animate({
                            opacity: 0
                        }, 600);


                    $('.tabs__content').css('opacity', 0);
                    $('.content-active').css('opacity', 1);
                    $('.js-tabs .tabs__content:nth-child(' + (tabindex + 2) + ')') // This will Display the content parallel to the tab clicked 
                    .addClass('content-active js-content-active').animate({
                        opacity: 1
                    }, 600);
                }
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