/*!
 * cartier.home.js
 * This file contains functionality handling the my home module
 *
 * @project   cartier mobile
 * @date      2014-01-03
 * @author    SapientNitro
 * @licensor  cartier mobile
 * @site      cartier mobile
   @dependency cartier.core.js
 * @ NOTE:
    This file has the following sequence of the actions
    1) Declare all the private variables
    2) caching jquery objects
    3) define all private methods
 	$last) call to module init() method
 */
;
(function(win, $, home, undefined) {
    'use strict'; //this will cause the browser to check for errors more aggressively

    if (typeof $ === "undefined") {
        //console.log("jQuery not found");
        return false;
    }

    var
    _cache = {};

    //--------------------------------------------------------------------------------------------------------
    //         Caching jQuery object
    //--------------------------------------------------------------------------------------------------------

    /*
      @private method : caching jquery objects 
      @param : none 
    */
    var _cacheObjects = function() {

        _cache = {
            $carouselSlider: $(".js-slider"),
            $accordionObject: $(".js-accordion"),
            $datePicker: $(".js-date-picker"),
            $tabsObject: $(".js-tabs")
        };
    },


    //--------------------------------------------------------------------------------------------------------
    //          Initialize Plugins
    //--------------------------------------------------------------------------------------------------------

        /*
        @private method : initialize the carousel
        @param : none
        */
        _initializeCarousel= function(){
            _cache.$carouselSlider.bxSlider({
                mode: 'fade',
                speed: 100,
                auto: true,
                autoHover: true
            });
        },

        /*
        @private method : initialize Accordion for Home page
        @param : none
        */
        _initializeAccordion = function() {
            _cache.$accordionObject.makeAccordion({
                showBehaviour: false
            });
        },

        /*
        @private method : initialize Tab for Home page
        @param : none
        */
        _initializeTabs = function() {
            _cache.$tabsObject.tabs();
        },


        /*
        @private method : initialize Date picker for Home page
        @param : none
        */
        _initializeDatePicker = function() {
            _cache.$datePicker.date_picker();
        };


    //--------------------------------------------------------------------------------------------------------
    //          Public functions
    //--------------------------------------------------------------------------------------------------------
    /*
    @pubic method : initialize the module
    @param : none
    */
    home.init = function() {
        // caching the jquery objects
        _cacheObjects();

        if (_cache.$carouselSlider.length) {
            // Initializing the carousel
            _initializeCarousel();
        }
        if (_cache.$accordionObject.length) {
            // Initializing the accordion
            _initializeAccordion();
        }
        if (_cache.$datePicker.length) {
            // Initializing the year
            _initializeDatePicker();
        }

        if (_cache.$tabsObject.length) {
            // Initializing the year
            _initializeTabs();
        }

    };

}(window, jQuery, cartier.home));