/*!
 * cartier.others.js
 * This file contains functionalities handling the others module
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
    2) caching jquery wrapper objects and messages
    $last) call to init() method
 */

;
(function(win, $, others, undefined) {
	//this will cause the browser to check for errors more aggressively
	'use strict';

	//check if jquery is defined, else retun
	if (typeof $ === "undefined") {
		//console.log("jQuery not found");
		return false;
	}

	/*
     private variables
     */

	var _cache = {},
		_objPropertiesMsg,
		_objPropertiesPth,
		_dummyProductClone,

		/*
	 @private method : caching jquery objects 
	 @param : none 
	 */
		_cacheObjects = function() {

			_cache = {
				$others: $(".js-others"),
				$accordionObject: $(".js-accordion"),
				$tabsObject: $(".js-tabs"),
				$videoObject: $(".js-video"),
				$radioTab: $(".js-radio-tabs"),
				$videoUrl: $('.js-video-url'),
				$accesoriesCheckBox: $('.js-acessories'),
				$accesoriesList: $('.js-accessories-list'),
				$searchViewMoreLink: $('.js-view-button-search')

			};

		},

		/*
	 @private method : bind events
	 @param : none
	 */

		_bindEvent = function() {

			// onclick event bind on accessories check box
			_cache.$accesoriesCheckBox.on('click', _dispalyAccessoriesList);
		},

		/*
	 @private  method : show hide accesories list 
	 @param :  none
	 */
		_dispalyAccessoriesList = function() {
			var checkBoxStatus = $(this).prop('checked');
			cartier.common.showHideList(checkBoxStatus, _cache.$accesoriesList);
		},

		/*
	 @private method : show load time  Accessories list if check is checked
	 @param : none 
	 */
		_showAccessoriesList = function() {
			if (_cache.$accesoriesCheckBox.prop('checked')) {
				cartier.common.showHideList(_cache.$accesoriesCheckBox, _cache.$accesoriesList);
			}
		},

		/*
	 @private method : initialize Accordion
	 @param : none 
	 */
		initializeAccordion = function() {
			_cache.$accordionObject.makeAccordion({
				showBehaviour: true
			});
		},

		/*
	 @private method : initialize Tabs functionality 
	 @param : none 
	 */
		initializeTabs = function() {
			_cache.$tabsObject.tabs();
		},
		_parseAndAddProduct = function($that, parsedData) {
			$that.data('isactive', false);
			$that.removeLoader();
			var placeToAdd = $that.closest(".search-product").find('.product-list__listing');
			var numberOfProducts = parsedData[0].productArray.length;
			for (var i = 0; i < numberOfProducts; i++) {
				var productToAdd = _searchProductFiller(_dummyProductClone.clone(true, true), parsedData[0].productArray[i]);
				placeToAdd.append(productToAdd);
			}
			if (parsedData[0].noProduct)
				$that.addClass('display-none');
			var newOffset = placeToAdd.data('offset');
			newOffset++;
			placeToAdd.data('offset', newOffset);
			placeToAdd.attr('data-count', parsedData[0].newcount);
			placeToAdd.data('count', parsedData[0].newcount);
			//console.log(placeToAdd.data()); 
		},

		_searchProductFiller = function(productClone, data) {
			productClone
				.find('.js-search-push-link').attr('href', data.productLink).end()
				.find('.js-search-push-link').attr('title', data.productTitle).end()
				.find('.js-search-product-image').attr('src', data.productImageLink).end()
				.find('.js-search-product-image').attr('alt', data.productAlttext).end()
				.find('.js-search-product-image').removeClass('just-preloader').end()
				.find('.js-search-product-title').html(data.productTitle).end()
				.find('.js-search-product-desc').html(data.productDesc).end()
				.find('.js-search-product-price').html(data.productPrice).end()
				.find('.js-search-product-priceinfo').html(data.productPriceInfo).end();
			productClone.find('.js-search-product-image').closest('div').find('div').attr('data-src', data.productImageLink).data('src', data.productImageLink);
			return productClone;
		},

		_searchViewMoreFunction = function(e) {
			e.preventDefault();
			if ($(this).data('isactive') === false) {
				$(this).data('isactive', true);
				$(this).addLoader();
				var dataToSend = $(this).closest('.search-product').find('.product-list__listing').data();
				dataToSend = $.param(dataToSend) + '&' + $('.js-search-form').serialize();

				var $that = $(this);
				_ajaxSubmitHandler($that, _objPropertiesPth.searchViewMoreAjax, dataToSend, function(parsedData) {
					_parseAndAddProduct($that, parsedData);
				});
			}
		},

		_ajaxSubmitHandler = function(that, pathToSend, dataToSend, callback) {
			var objXHR = cartier.ajaxWrapper.getXhrObj({
				type: 'POST',
				url: pathToSend,
				data: dataToSend,
				dataType: 'json',
				contentType: "application/x-www-form-urlencoded",
				beforeSend: function(objXHR) {

				}
			});
			if (objXHR) {
				objXHR.done(function(data) {
					if (typeof data === "undefined") {} else {
						var parsedData = cartier.common.cartierJSONparser({
							json: data,
						});
						if (data !== false) {
							callback(parsedData);
						}
					}
				});
			}
			return false;
		},
		/*
	 @private method : initialize Radio Tabs functionality 
	 @param : none 
	 */
		_initializeRadioTabs = function() {
			_cache.$radioTab.radio_tabs();
		};

	/*
	 @public method : intialize video
	 @param : none 
	 */
	others.initializeVideo = function() {
		_cacheObjects();

		_cache.$videoUrl.each(function() {

			var youtubeTheme = '',
				videoUrl = $(this).data('url'),
				loadPolicy = parseInt($(this).data('load-policy')),
				langPref = $(this).data('lang-pref'),
				autoplayPref = $(this).data('autoplay');


			if ($(this).data('source') === 'youtube' && $('body').css('background-color') === "rgb(255, 255, 255)") {
				youtubeTheme = '&theme=light';
			}

			if ($('.js-video')) {

				var element = "<iframe id='ytplayer' type='text/html' width='100%' height='100%' src='" + videoUrl + youtubeTheme + "&cc_lang_pref=" + langPref + "&cc_load_policy=" + loadPolicy + "' frameborder='0' />";

				$(this).parent().append(element);
				$(this).parent().find('.js-video').remove();
				$(this).parent().find('.js-video-url').remove();
			}

		});

	};


	/*
     @public method : To initialize others.js
	 @param : none
     */

	others.init = function() {
		_objPropertiesPth = cartier.properties.paths;

		// caching the jquery objects
		_cacheObjects();
		_bindEvent();
		if (_cache.$accordionObject.length) {

			// Initializing the accordion
			initializeAccordion();
		}
		if (_cache.$tabsObject.length) {
			// Initializing the year
			initializeTabs();
		}
		if (_cache.$accesoriesCheckBox.length) {
			_showAccessoriesList();
		}
		if (_cache.$searchViewMoreLink.length) {

			$('.product-list__listing').data('offset', 1);
			_dummyProductClone = $('.js-not-in-result:eq(0)').removeClass('js-hide-content').clone(true, true);
			$('.product-list__listing').data('sampleurl', _dummyProductClone.find('.js-search-product-image').attr('data-original'));

			_cache.$searchViewMoreLink.on('click', _searchViewMoreFunction).data('isactive',false);

		}
		_initializeRadioTabs();

	};


}(window, jQuery, cartier.others));