/*!
 * cartier.core.js
 * This file contains application namespace and initializing the other modules
 *
 * @project   cartier mobile
 * @date      2014-01-03
 * @author    Sapient
 * @licensor  cartier
 * @site      cartier mobile
   @dependency none
 * @ NOTE:
    This file has the following sequence of the actions
    1) Declare all the private variables
 
 */
var cartier = cartier || {}; // core namespace

var CQ = CQ || {};

(function(window, $, cartier, undefined) {
    //this will cause the browser to check for errors more aggressively
    'use strict';

    //check if jquery is defined, else retun
    if ($ === undefined) {
        //console.log("jQuery not found");
        return false;
    }

    cartier.debug = true;
    /*module objects*/
    cartier.home = {};
    cartier.login = {};
    cartier.billing = {};
    cartier.myaccount = {};
    cartier.product = {};
    cartier.wishlist = {};
    cartier.productlist = {};
    cartier.boutique = {};
    cartier.others = {};
    cartier.shoppingbag = {};
    cartier.ecsRegistration = {};
    /*common objects*/
    cartier.properties = {};
    cartier.common = {};
    cartier.countryHandler = {};
    /*wrapper objects*/
    cartier.formValidationWrapper = {};
    cartier.ajaxWrapper = {};
    cartier.template = {};



    /*
    @private method : initailize the module
    */
    var initializeModule = function() {
        cartier.properties.init(); ////////////////////////////////////TO BE CHANGED IN CQ



        ///////  MAKING DUMMY Cookie || Not required on CQ
        $.cookie('carqty','{"count":5,"total":"$26,784","totalInfo":"checkout.label.tax.inclTaxesText","teaserArray":[{"productTitle":"anaar","productDesc":"quartz, yellow gold","imageURL":"/content/dam/rcq/car/58/19/28/581928.png/jcr:content/renditions/cq5dam.thumbnail.319.319.png","selectedQuantity":3,"variantID":"W1529856","totalDisplayPrice":"$1,280"},{"productTitle":"anaar","productDesc":"quartz, yellow gold","imageURL":"/content/dam/rcq/car/58/19/28/581928.png/jcr:content/renditions/cq5dam.thumbnail.319.319.png","selectedQuantity":3,"variantID":"W1529856","totalDisplayPrice":"$1,280"}]}');

        //Initialize Global things 
        if ($('.body-wrapper').length) {
            cartier.common.init();
            //$('.body-wrapper').analytics();
        }
        //Initialize Module level things 

        if ($('.js-login').length || $('#js-login-form').length || $('.js-forgotpassword').length) {
            cartier.login.init();
        }

        if ($('.js-product').length) {
            cartier.product.init();
        }

        if ($('.js-productlist').length) {
            cartier.productlist.init();
        }
        if ($('.js-home').length) {
            cartier.home.init();
        }

        if ($('.js-myaccount').length || $('.js-personal-info-form').length || $('.js-reg-step-2').length || $('.js-jp-reg-step-3').length || $('.js-subscription-and-interest-form').length || $('#address-container').length) {
            cartier.myaccount.init();
        }
        

        if ($('.js-billing').length) {
            cartier.billing.init();
        }

        if ($('.js-boutique').length) {
            cartier.boutique.init();
        }


        if ($('.js-others').length) {
            cartier.others.init();
        }
        if ($('.js-wishlist').length) {
            cartier.wishlist.init();
        }
        if ($('.js-shoppingbag').length) {
            cartier.shoppingbag.init();
        }

        if ($('.js-form-validator').length || $('.form-layout').length || $('.js-boutique').length > 0) {
            cartier.formValidationWrapper.init();
        }
        if ($('.js-video').length) {
            var youtubeApi = 'https://www.youtube.com/iframe_api';
            cartier.common.addApiScript(youtubeApi);
            cartier.others.initializeVideo();
        }

        if ($('.js-social-share').length) {

            cartier.common.socialShareHandler();
            cartier.common.emailDisplayHandler();

        }

         if ($('.js-pre-registration').length) {
            cartier.ecsRegistration.init();
        }


        cartier.ajaxWrapper.init();
        cartier.template.init();

        var $menuSliderWrapper = $('.left-push-menu');
        $menuSliderWrapper.menuslider();
        $('.body-wrapper').analytics();

    };
    /*
      @pubic method : initailize the module
      */
    cartier.init = function() {
        //console.log('JS-LOG:Core Init Called');
        cartier.common._CQI18nCreator();
        if ($('.js-req-price').length || $('.js-pre-registration').length ||  $('.js-contact-ambassador-form').length || $('.js-light-account-form').length || $('.js-reg-step-2').length || $('.js-reg-step-1').length || $('.js-reg-step-3').length || $('.js-login-form').length || $('.js-personal-info-form').length || $('.js-address-form-jp').length || $('.js-address-form').length || $('.send_email').length || $('.js-subscription-and-interest-form').length) {
            $('.js-req-price, .js-pre-registration, .js-contact-ambassador-form,.js-light-account-form,.js-reg-step-2,.js-reg-step-1,.js-reg-step-3,.js-login-form,.js-personal-info-form,.js-address-form-jp, .js-address-form,.send_email,.js-subscription-and-interest-form').find("input:checkbox, input:radio, select").not('.no-uniform').uniform();
        }
        initializeModule();
    };



    /**
     * Logging function, for debugging mode
     */
    cartier.log = function() {
        if (cartier.debug) {
            var index = 0;
            try {
                if (arguments.length === 1) {
                    console.debug(arguments[index]);
                } else {
                    console.log(Array.prototype.slice.call(arguments));
                }
            } catch (e) {}
        }
    };

}(window, jQuery, cartier));