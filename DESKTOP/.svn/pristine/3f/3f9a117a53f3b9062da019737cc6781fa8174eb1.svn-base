/*!
 * product-zoom.js
 * This file contains application namespace and initializing the other modules
 *
 * @project   Cartier Desktop
 * @date      2014-01-21
 * @author    SapientNitro
 * @licensor  Cartier Desktop
 * @site      Cartier Desktop
 *
 * USAGE : updateOnResize(), updateOnMove(), Close, etc methods for Product Detail page Zoom Feature
 *
 */
(function ($) {
    'use strict';
    var zoom = {
        // Init variables.
        $trigger: $('.zoom-trigger'),
        isEyewears: !!($('.cartier-master-product-eyewears').length > 0),

        // Init events and append the wrapper in #cBoxOverlay.
        init: function () {
            if ($(".js-nested-exceptional-creation").length && $('.zoom-image').length < 1) 
            {
              $("body").prepend('<div class="zoom-image"/>');
              $("body").prepend('<div id="cboxOverlay"><img src="../etc/designs/richemont-car/clientlibs/publish/Clientlibs_desktop/images/icons/close.png" class="close-popin"></div>');
            }

          $('.zoom-image').ready(function() {

            zoom.$image = $('.zoom-image');
            zoom.$overlay = $('#cboxOverlay');

            zoom.$image.hide();
            zoom.$overlay.hide();

            zoom.$trigger.click(function(e) {

              e.preventDefault();
              zoom.build(this);			  
            });

            $(window).resize(function() {
              zoom.updateOnResize();
            });

            $('.zoom-image').mousemove(function(e) {
              zoom.updateOnMove(e);
            });
          });

        },

        // Built method to create a image and place in the correct position.
        build: function (that) {

          var wHeight = $(window).height(),
              wWidth = $(window).width(),
              originLeft = (wWidth/2) - 500;

          // Image creation.
          $("<img />").attr({
            "src": $(that).attr("href"),
            "class": "larger-zoom"
          }).prependTo(".zoom-image");


          // Tool append.
		 
          
		   if ($('body').hasClass('light') || $('body').hasClass('bridal')) {
              $('#cboxOverlay').append('<img src="../etc/designs/richemont-car/clientlibs/publish/Clientlibs_desktop/images/loader64_noir.gif" class="center-loader" height="16" width="16">');
              $('#cboxOverlay').append('<img src="../etc/designs/richemont-car/clientlibs/publish/Clientlibs_desktop/images/icons/close.png" class="close-popin">');
            } else {
              $('#cboxOverlay').append('<img src="../etc/designs/richemont-car/clientlibs/publish/Clientlibs_desktop/images/icons/loader64_noir.gif" class="center-loader" height="16" width="16">');
              $('#cboxOverlay').append('<img src="../etc/designs/richemont-car/clientlibs/publish/Clientlibs_desktop/images/icons/close.png" class="close-popin">');
            }		  
		    $('#cboxOverlay').fadeIn();
		

          // Fade In the container.
          $(".zoom-image").fadeIn(function() {
            $(this).addClass('is-showed').css({
              'height': wHeight,
              'width': 1000,
              'top': 0,
              'left': originLeft
            });

          // Fade In the image in the container.
            $('img', $(this)).fadeIn(function () {
              if (zoom.isEyewears) {
                zoom.$image.addClass('is-eyewears');
              }
              /*$(this).imagesLoaded(function () {
                $('.center-loader').remove();
              });*/
            });

            $('#cboxOverlay').click(function(e){

              e.preventDefault();
              if ($('.zoom-image').hasClass('is-showed')) {
                zoom.close(e);
              }

            });

            $('.zoom-image img').click(function(e){

              e.preventDefault();
              if ($('.zoom-image').hasClass('is-showed')) {
                zoom.close();
              }

            });

            $(document).keyup(function(e) {

              e.preventDefault();
              if ($('.zoom-image').hasClass('is-showed') && e.keyCode === 27) {
                zoom.close();
              }

            });

          });

        },

        // Keep the image in the center.
        updateOnResize: function () {

           var wHeight = $(window).height(),
               wWidth = $(window).width(),
               originTop = (wHeight/2) - 500,
               originLeft = (wWidth/2) - 500;

           $('.zoom-image.is-showed').css({
             'top': 0,
             'left': originLeft,
             'height': wHeight
           });
           $('.zoom-image.is-showed img').css({
             'top': originTop
           });

        },

        // Move the image to see more, when the window is too small.
        updateOnMove: function (e) {
          var wHeight = $(window).height(),
            mouseY = e.pageY - $(window).scrollTop(),
            posY = (Math.round((mouseY/wHeight)*100)/100) * (1000-wHeight);

          $('.zoom-image img').css({
            'top': '-' + posY + 'px'
          });
        },


        // Close function.
        close: function () {			
          $('#cboxOverlay').fadeOut();
          $(".zoom-image").removeClass('is-showed').hide();
          $(".zoom-image img").remove();

        }

      };

      zoom.init();

  
})(jQuery);
