/*!
 * cartier.multiplevideo.js
 * This file contains functionalities handling the multi video  module
 *
 * @project   cartier desktop
 * @date      2014-01-03
 * @author    Sapient
 * @licensor  cartier desktop
 * @site      cartier desktop
   @dependency bxslider.min.js
   @dependency cartier.core.js
 * @ NOTE:
    This file has the following sequence of the actions
    1) Declare all the private variables
    2) caching jquery wrapper objects and messages
 	$last) call to init() method
*/

;
(function(win, $, multiple_video, undefined) {
    'use strict'; //this will cause the browser to check for errors more aggressively

    if (typeof $ === "undefined" ) {
        cartier.log("jQuery not found");
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
            $slider: $('.js-preview-slider'),
            $productSlider: $('.js-product-img-slider'),
            $videoSlider: $('.js-multiple-video .js-slider')
        };
        }, _videoSlider,
        _showCaseSlider,
        _liveslide = 0,
        _onetimeshow = 4,
        /*
            @private method : bind event on page load
            @param : none 
        */
        _bindEvents = function() {
            $('.js-preview-slider li').on('click', function() {

                _videoSlider.goToSlide(($(this).index()) % (_videoSlider.getSlideCount()));
                _liveslide = ($(this).index()) % (_videoSlider.getSlideCount());
                _highlightSelected();
                _updateNavNumber();
                $(this).unbind('click');

            });
            $("iframe video").css({top:0});
            
        },

         /*
          @private method : initialize showcase slider
          @param : none 
        */

        _initializeShowcase = function() {

            _showCaseSlider = _cache.$slider.bxSlider({
                mode: 'horizontal',
                speed: 1000,
                auto: false,
                pager: false,
                autoHover: true,
                infiniteLoop: false,
                //preloadImages:'visible',
                minSlides: 2,
                maxSlides: _onetimeshow,
                slideWidth: 180,
                slideMargin: 20
            });
        },
        /*
          @private method : initialize nested slider  usign bxslider
          @param : none 
        */
        _initializeNestedSlider = function() {

            _videoSlider = _cache.$videoSlider.bxSlider({
                mode: 'fade',
                speed: 1200,
                autoHover: true,
                auto: false,
                pager: false,
                infiniteLoop: false,
                controls:false,
                video:true,
                onSlideAfter: function(){
                    _bindEvents();
                }
            });
        },
        /*
          @private method : bind mouse leave ,mouse enter event  
          @param : none 
        */
        _bindEventsSecond= function(){
            $(".multiple_video_wrapper").on("mouseleave", function(){
                $(".multiple_video_wrapper").animate({height:0},500).fadeOut(0);
            });
            $('.js-toggle').on('click', function(){
                if($(".multiple_video_wrapper").css('display')=="none"){
                $(".multiple_video_wrapper").show().animate({height:170},500);
                }
            });
        },
        /*
          @private method : get screen
          @param : url :   video url
                   size :  screen size 
        */
        _getScreen= function( url, size ){
            if(url === null){ return ""; }

            size = (size === null) ? "big" : size;
            var vid;
            var results;
            results = _getvideoId(url);

            vid = results;

            if(size === "small"){
                return "http://img.youtube.com/vi/"+vid+"/2.jpg";
            }else{
                return "http://img.youtube.com/vi/"+vid+"/0.jpg";
                }
        },
        /*
          @private method : get video id using video url
          @param : url :   video url
                   
        */
        _getvideoId=function(url){
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = url.match(regExp);
            
            if (match&&match[7].length==11){
                return match[7];
            }
            
        },
        /*
          @private method : highlight selected slide
          @param : none
                   
        */
        _highlightSelected = function() {
            $('.js-preview-slider li').removeClass('active');
            $($('.js-preview-slider li')[_liveslide]).addClass('active');
        },
        /*
          @private method : update nav number in slider 
          @param : none 
        */
        _updateNavNumber = function() {
            $('.js-slide-next-num').html(_liveslide + 2 + "/" + _videoSlider.getSlideCount());
            if (_liveslide + 1 <= 1) {
                $('.js-slide-prev-num').html("-/" + _videoSlider.getSlideCount());
            } else {
                $('.js-slide-prev-num').html(_liveslide + "/" + _videoSlider.getSlideCount());
            }
        },
        /*
          @private method : initialize product slider 
          @param : none 
        */
        _initializeProductSlider = function() {
            _cache.$productSlider.bxSlider({
                mode: 'fade',
                speed: 1000,
                pager: true,
                controls: false,
                video: true,
                useCSS: false
            });
        },
        /*
          @private method : fill iamge in slider 
          @param : none 
        */
        _imageFiller= function(){
           $.each(_cache.$videoSlider.find('li'),function(key,value){
                var vidurl=$(this).find('iframe').attr('src'),
                imgurl=_getScreen(vidurl);
                _cache.$slider.find("li").eq(key).find("img").attr("src",imgurl);
           }) 
        };

    //--------------------------------------------------------------------------------------------------------
    //          Public functions
    //--------------------------------------------------------------------------------------------------------

    /*  @pubic method : initailize the module */

    cartier.multiple_video.init = function() {
        cartier.log('JS-LOG: multiple_video Init Called');
        _cacheObjects();
        _initializeNestedSlider();
        _initializeShowcase();
        _bindEvents();
        _bindEventsSecond();
        _imageFiller();



    };
}(window, jQuery, cartier.multiple_video));