/*!
 * jquery.confirm.js
 * This file contains application namespace and initializing the other modules
 *
 * @project   Cartier Desktop
 * @date      2014-01-21
 * @author    SapientNitro
 * @licensor  Cartier Desktop
 * @site      Cartier Desktop
 *
 * USAGE :
 *
 * This is a plugin for calling a popup after confirmation of a particuar event. we can use this function :

 * $.confirm({

                'message': _objPropertiesMsg.wishListSavePopup, 
                'buttons': {
                    'ok': {
                        'buttonName': _objPropertiesMsg.okButton,
                        'class': 'cta-button cta-button__inner cta--red'

                    },

                }
            });
 *
 */

;
(function($, window, document, undefined) {
    'use strict';

    //check if jquery is defined, else retun
    if ($ === undefined) {
       // console.log("jQuery not found");
        return false;
    }
    /*
            setting default parameter
        */
    var pluginName = "confirmBox",
        defaults = {
            // storing class name in variable

        },
        styleClass = {};


    function Plugin(element, options) {

        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);

        this.init();
    }

    Plugin.prototype = {

        //Settings the initial system
        init: function() {


            //this.popupInitialize(this.options, this.confirmHide);
        },


        /* public mathod : hide pop-up box
            param : none
        */
        confirmHide: function() {
            $('#confirmOverlay').fadeOut(function() {
                $(this).remove();
            });
        },


        /* public mathod : show pop box
            param : params -  pop box box message and button text
                    confirmHide - confirmHide function
        */
        popupInitialize: function(params, confirmHide) {
            if ($('#confirmOverlay').length) {
                // A confirm is already shown on the page:
                return false;
            }

            var buttonHTML = '';
            $.each(params.buttons, function(name, obj) {

                // Generating the markup for the buttons:


                buttonHTML += '<button href=" ' + obj['href'] + '" class=" ' + obj['class'] + '"> <span class="input-arrow"></span><span class="cta-button__input">' + obj.buttonName + '</span></button>';

                if (!obj.action) {
                    obj.action = function() {};
                }
            });

            var markup = [
                '<div id="confirmOverlay" class="positionChange">',
                '<div id="confirmBox">',
                '<a class="popup-close-button">close</a>',
                '<h1>', params.title, '</h1>',
                '<p>', params.message, '</p>',
                '<p>', params.paragraph, '</p>',
                '<p><a href=' + params.src + '>', params.anchormessage, '</a></p>',
                '<div id="confirmButtons">',
                buttonHTML,
                '</div></div></div>'
            ].join('');

            // onclick event bind on cancle button

            // append to body
            $(markup).hide().appendTo('body').fadeIn(0, false);





            var buttons = $('#confirmBox .cta-button'),
                i = 0;

            $.each(params.buttons, function(name, obj) {
                buttons.eq(i++).click(function() {

                    // Calling the action attribute when a
                    // click occurs, and hiding the confirm.

                    obj.action();
                    confirmHide();
                    return false;
                });
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