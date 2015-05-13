/*!
 * overlay.js
 * This file contains application namespace and initializing the other modules
 *
 * @project   cartier mobile
 * @date      2014-01-21
 * @author    SapientNitro
 * @licensor  cartier mobile
 * @site      cartier mobile
 *
 * USAGE :
 *
 * Initialize overlay Plugin with pluginName "openOverlay" to The div that has class "js-zoom"
 *       initializeOverlay = function() {
 *          $(".js-zoom").openOverlay({
 *         callback: initializingImageInOverLay
 *    });
 * 
 *  When click on 'js-zoom' button. One overlay open with zoomed image and If user want to exit from the 
 *  overlay view then, user will click on cross button to exit from it.
 *
 */


;
(function($, window, document, undefined) {
    'use strict';

    //check if jquery is defined, else return
    if ($ === undefined) {
        //console.log("jQuery not found");
        return false;
    }

    var pluginName = "openOverlay",
        defaults = {

            ovelayInitializeClass: 'js-zoom',
            hiddenOvelayClass: 'js-overlay',
            callback: function() {}

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

            this.setOverLay(this.options.ovelayInitializeClass, this.options.hiddenOvelayClass, this.options.callback);



        },

        /*
         *@private method : Function to initialize the Overlay
         *@param : ovelayInitializeClass :- class name on which click event binded to open overlay
         *          hiddenOvelayClass :- calss name of  hidden ovelay  element in dom
         *          callback : -add functionatilty in overlay
         */
        setOverLay: function(ovelayInitializeClass, hiddenOvelayClass, callback) {
            var
            docHeight = screen.availHeight + 300;


            $("." + ovelayInitializeClass).on('click', function() {

                $("." + hiddenOvelayClass).show().height(docHeight);

                callback();

   
                $('.main-container').css({
                    "max-height" : screen.availHeight + 200,
                    "overflow" : "hidden"
                });

                $(".js-close-button").on('click', function(e) {

                    $('.main-container').css({
                        "max-height" : "initial",
                        "overflow" : "initial"
                    });

                    $('.' + hiddenOvelayClass).hide();
                    if ($(this).attr('href') === '#') e.preventDefault();

                });

                $(".toggleMenu").on('click', function(e) {
                    $(".js-overlay").addClass("body-push").css('position', 'fixed');

                });

            });

            $(".main-container,footer").click(function() {

                if ($(".js-overlay").hasClass("body-push")) {
                    $(".js-overlay").removeClass("body-push");
                }
            })
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