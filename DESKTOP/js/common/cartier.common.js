/*
 * cartier.common.js
 * This file contains common methods
 *
 * @project   cartier mobile
 * @date      2014-01-03
 * @author    YOUR NAME, SapientNitro <YOUREMAIL@sapient.com>
 * @site      cartier mobile
   @dependency none
 * @ NOTE:
    This file has the following sequence of the actions
    1) Declare all the private variables

 */


;
(function(window, $, common, undefined) {
	//this will cause the browser to check for errors more aggressively
	'use strict';

	//check if jquery is defined, else retun
	if ($ === undefined) {
		//console.log('jQuery not found');
		return false;
	}

	window.ytplayer = [];

	/*
    private variables
    */
	var
	_objPropertiesMsg,
		indexcount,
		_itemPerPage,
		itemListInDom,
		itemListNotInDom = undefined,
		totalItemToShow,
		_objPropertiesPth,
		_cache = {},
		_bMouseEnterEvent = true,
		_objPropertiesPath;



	//--------------------------------------------------------------------------------------------------------
	//         Caching jQuery object
	//--------------------------------------------------------------------------------------------------------

	/*
      @private method : caching jquery objects
      @param : none
    */
	var _cacheObjects = function() {

		_cache = {
			$bodyObject: $('body'),
			$htmlAndBodyObject: $('html, body'),
			$mainContainer: $('.main-container'),
			$headerObject: $('header'),
			$shareDescClass: $('.js-share-desc'),
			$shareSubDescClass: $('.product-description'),
			$shareTitleClass: $('.js-share-title'),
			$shareImgclassWithCarousel: $('.js-product-carousel img'),
			$shareImgclassWithoutCarousel: $('.js-share-img img'),
			$socialShareFb: $('.js-social-share__facebook'),
			$socialShareTwitter: $('.js-social-share__twitter'),
			$socialSharePinit: $('.js-social-share__pin-it'),
			$errorZone: $('.error-zone'),
			$wishlistPagepath: $('.js-wishlist_pagepath'),
			$pagePath: $('.js-pagepath'),
			$cartUpdate: $('.js-cart-update'),
			$shareCaptionclass: $('.js-share-caption'),

			/********Desktop related cache objects**********/

			$pushwrapper: $('.js-pushes-wrapper_push'),
			$quickLinkPushes: $('.js-quick-link-push'),
			$collectionPushes: $('.js-collection-push'),
			$servicePushes: $('.js-pushes-wrapper-service-push'),
			$costEstimatePopup: $('.cta-step2-popup'),
			$toolTip: $('.js-tool-tip'),
			$toolTipDetail: $('.js-tool-tip-detail'),
			$secondarynav: $('.js-sec-nav'),
			$megaMenu: $('.mega-menu'),
			$shoppingBag: $('.js-shopping-bag'),
			$popUpContentWrapper: $('.js-pop-up-content-wrapper'),
			$addToShoppingButton: $('.js-addtoshopping'),
			$sendmailPagePath: $('.js-social-share__email').attr('href'),

			$vaNav: $('.va-nav'),

			$requestInfoPagePath: $('.js-request-popup').attr('href'),
			$requestPricePagePath: $('.js-request-price').attr('href'),
			$requestpopup: $('.js-request-popup'),
			$requestprice: $('.js-request-price'),
			$requestButton: $('.js-request-popup'),
			$askAppointmentPagePath: $('.js-appointment-popup').attr('href'),
			$contactAmbPopup: $('.js-contam-popup'),
			$contactAmbPagePath: $('.js-contam-popup').attr('href'),
			$requestInfoRadio: $("input[name='requestInformation_contactPreference']"),
			$appointmentPopup: $('.js-appointment-popup'),

			/*contact us page*/
			$contactAmbButton: $('.js-contact-cont-amb-but'),
			$contactAmbPagePathCotactUsPage: $('.js-contact-cont-amb-but').attr('href'),
			$askAppointmentContactButton: $('#navigationBlock_4'),
			$askAppointmentContactButtonPath: $('#navigationBlock_4').attr('href'),

			/*Boutique*/
			$sendEmailButton: $('.js-send-email-but'),
			$sendEmailButtonPath: $('.js-send-email-but').attr('href'),
			$askAppointmentButton: $('.js-ask-appointment-button'),
			$askAppointmentButtonPath: $('.js-ask-appointment-button').attr('href'),
			$formBuilderToolTip: $('.field-tooltip')

		};
	}, indexcounts = [];

	//--------------------------------------------------------------------------------------------------------
	//          EVENT HANDLERS
	//--------------------------------------------------------------------------------------------------------


	//--------------------------------------------------------------------------------------------------------
	//          Public functions
	//--------------------------------------------------------------------------------------------------------
	/*
            @public  method : add function to jquery
            @param : none
        */
	var _extendJQuery = function() {
		$.fn.extend({
			addLoader: function(showtext) {
				if (typeof showtext !== "undefined") {
					this.append("<span class='loaderImage'></span><span class='show-text'>" + showtext + "</span>");
				} else {
					this.append("<span class='loaderImage'></span>");
				}

				return this;
			},
			//This preloader is added for Storelocator | Do not remove this
			addLoaderPrepend: function(showtext) {
				if (typeof showtext !== "undefined") {
					this.prepend("<span class='loaderImage'></span><span class='show-text'>" + showtext + "</span>");
				} else {
					this.prepend("<span class='loaderImage'></span>");
				}

				return this;
			},
			removeLoader: function() {
				this.find('.loaderImage').remove();
				this.find('.show-text').remove();
				return this;
			},
			addAjaxLoader: function() {
				this.html("<div class='loading'></div>");
			},

			addCrossButton: function() {
				this.append("<span class='cross-button js-close'></span>");
			},


		});
	},

		/*
          @private  method : max length check
          @param : customOptions :- override default option
    */
		_inputMaxLengthDeviceCheck = function() {

			var elInput = $('#jstest'),
				maxLength = elInput.attr('maxlength'),

				// remove extra charater from input filed
				checkChars = function(charactersLength) {

					if (charactersLength >= maxLength) {

						// Cut down the string
						$(elInput).val($(elInput).val().substr(0, maxLength));


					}

				};
			$(elInput).bind('keyup', function(e) {
				var charactersLength = $(elInput).val().length;
				checkChars(charactersLength);
			});
		};

	/*
          @public  method : check predefine format of json file
          @param : customOptions :- override default option
    */
	common.cartierJSONparser = function(customOptions) {

		//Sets the custom option against the default options
		var _defaultOptions = {
			json: {
				'success': false,
				'serverMessage': _objPropertiesMsg.noJSONprovided,
				'content': ''
			},
			JSONerrorDiv: $("<div class='error-zone'></div>"),
		},
			_objConfig = $.extend({}, _defaultOptions, customOptions);


		//check if the json is in correct format!
		if (_objConfig.json.success === undefined || _objConfig.json.serverMessage === undefined || _objConfig.json.content === undefined) {
			_objConfig.json = _defaultOptions.json;
			_objConfig.json.serverMessage = _objPropertiesMsg.badJSONProvided;
		}

		//Check if the json is in success state
		if (_objConfig.json.success) {
			return _objConfig.json.content;
		}

		//Handle the failure state of Json
		else {
			//for Custom Div
			_objConfig
				.JSONerrorDiv
				.html(_objConfig.json.serverMessage)
				.removeClass('display-none');

			//for default div only
			if (customOptions.JSONerrorDiv === undefined) {
				_cache.$errorZone.remove();
				_cache.$mainContainer.prepend(_objConfig.JSONerrorDiv);
				_cache.$htmlAndBodyObject.animate({
					scrollTop: 0
				}, 'slow');
			}
			return false;
		}


	};

	/*
          @public  method : test object udefiend or not not if object undefined then repalce with null string
                            other wise return object
          @param : data :  testing object
    */
	common.jsonData = function(data) {
		return data === undefined ? '' : data;
	};


	/*
          @public method : view more event binding
          @param :  productPerPage -no of product to show
                    viewMoreButton - dom elemnt on which view more click event binded
                    listOfproducts - list of product
                    newProductList - list of product that  not aaded in dom
    */
	common.viewMoreSelection = function(itemPerPage, viewMoreButton, listOfItemInDom, newItemList) {

		_itemPerPage = itemPerPage;
		itemListInDom = listOfItemInDom;
		indexcount = itemPerPage;
		itemListNotInDom = newItemList;
		totalItemToShow = listOfItemInDom.length + $(newItemList).length;
		if (itemPerPage >= listOfItemInDom.length) {
			viewMoreButton.css('display', 'none');
		}
		viewMoreButton.data({
			_itemPerPageNew: _itemPerPage,
			itemListInDomNew: itemListInDom,
			indexcountNew: indexcount,
			itemListNotInDomNew: itemListNotInDom,
			totalItemToShowNew: totalItemToShow
		});

		viewMoreButton.unbind('click.viewmore').bind('click.viewmore', _viewSelectionHandler);

	};

	common.viewmoreSearchResult = function(listArray) {
		$.each(listArray, function(k, v) {
			var $oneList = $(v),
				_itemPerPage = $oneList.find('.js-view-wrapper').data('maxlimit'),
				_totalItemsToShow = $oneList.find('.js-view-wrapper li').length;
			indexcounts[k] = _itemPerPage;
			$oneList.find('.js-view-button').on('click', {
				listObj: $oneList,
				itemPerPage: _itemPerPage,
				key: k,
				totalItems: _totalItemsToShow
			}, function(e) {
				window.scrollBy(0, -1);
				window.scrollBy(0, 1);
				var i = 0,
					maxCount,
					totalProduct = e.data.totalItems,
					removingClassName = 'js-hide-content';

				maxCount = indexcounts[e.data.key] + e.data.itemPerPage < totalProduct ? indexcounts[e.data.key] + e.data.itemPerPage : totalProduct;
				e.data.listObj.find("li").slice(indexcount, maxCount).removeClass(removingClassName).lazyLoader();
				indexcounts[e.data.key] = indexcounts[e.data.key] + e.data.itemPerPage;

				if (indexcounts[e.data.key] >= totalProduct) {
					$(this).css('display', 'none');
				}

			});

		});
	};

	/*
          @private method : add product in DOM for view more if product not exist in dom
          @param : none
    */
	var _addNewProductInDom = function(_itemPerPage, itemListInDom, indexcount, itemListNotInDom, totalItemToShow) {


		var itemListToShow,
			startingProduct = itemListInDom.length,
			itemListToShow = itemListNotInDom.splice(0, _itemPerPage);
		$(itemListInDom).closest('ul').append(itemListToShow);

		// update product list beacuse dom is updated
		itemListInDom = $(itemListInDom).closest('ul').find('li');

		return {
			itemListInDomNew: itemListInDom
		}
	};

	/*
        @public method : socialShareHandler to respective Hrefs to the Social share buttons
        @param : none
    */
	var _viewSelectionHandler = function(event) {
		window.scrollBy(0, -1);
		window.scrollBy(0, 1);
		/// productList = $(_listOfproductsContainer).find('li');

		_itemPerPage = $(this).data('_itemPerPageNew');
		itemListInDom = $(this).data('itemListInDomNew');
		indexcount = $(this).data('indexcountNew');
		itemListNotInDom = $(this).data('itemListNotInDomNew');
		totalItemToShow = $(this).data('totalItemToShowNew');

		var i = 0,
			maxCount,
			totalProduct = itemListInDom.length,
			removingClassName = 'js-hide-content';

		// check product is exist or not in dom
		if (typeof itemListNotInDom !== 'undefined') {

			if (itemListInDom.length < itemListNotInDom.length) {
				var afterAdditionOb = _addNewProductInDom(_itemPerPage, itemListInDom, indexcount, itemListNotInDom, totalItemToShow);
				itemListInDom = afterAdditionOb.itemListInDomNew;

			}
			totalProduct = itemListInDom.length;
		}

		maxCount = indexcount + _itemPerPage < totalProduct ? indexcount + _itemPerPage : totalProduct;
		itemListInDom.slice(indexcount, maxCount).removeClass(removingClassName).lazyLoader();
		indexcount = indexcount + _itemPerPage;

		if (indexcount >= totalItemToShow) {
			$(this).css('display', 'none');
		}


		$(this).data('indexcountNew', indexcount);
		$(this).data('_itemPerPageNew', _itemPerPage);
		$(this).data('itemListInDomNew', itemListInDom);
		$(this).data('itemListNotInDomNew', itemListNotInDom);
		$(this).data('totalItemToShowNew', totalItemToShow);
	},



		_bindEvents = function() {

			//contact us page
			//bind events for lazy loading
			$("img.image").lazyload({
				threshold: 200,
				failure_limit: 20
			});
			$('.js-contact-cont-amb-but').on('click', function(e) {
				e.preventDefault();
				common._dataLoad(_cache.$contactAmbPagePathCotactUsPage + ".html", _postAjaxEvents);
				$('#modalOverlay').show();
			});
			//bind event for Send Email button
			_cache.$sendEmailButton.on('click', function(e) {
				e.preventDefault();
				$("#modalWindow").empty();
				$(this).modalWindow();
				common._dataLoad(_cache.$sendEmailButtonPath, _postAjaxEvents);
				$('#modalOverlay').show();
			});
			//bind event for Ask for appointment button
			_cache.$askAppointmentButton.on('click', function(e) {
				e.preventDefault();
				$("#modalWindow").empty();
				$(this).modalWindow();
				common._dataLoad(_cache.$askAppointmentButtonPath, _postAjaxEvents);
				$('#modalOverlay').show();
			});



			//bind event for Request Info button
			_cache.$requestpopup.on('click', function(e) {
				e.preventDefault();
				$("#modalWindow").empty();
				$(this).modalWindow();
				common._dataLoad(_cache.$requestInfoPagePath, _postAjaxEvents);

			});

			//bind event for Request price button
			_cache.$requestprice.on('click', function(e) {
				e.preventDefault();
				$("#modalWindow").empty();
				$(this).modalWindow();
				// empty model window

				common._dataLoad(_cache.$requestPricePagePath, _postAjaxEvents);
			});
			//bind event for contact ambassador button
			_cache.$contactAmbPopup.on('click', function(e) {
				e.preventDefault();
				$("#modalWindow").empty();
				$(this).modalWindow();
				common._dataLoad(_cache.$contactAmbPagePath, _postAjaxEvents);
			});

			//bind event for Ask for Appointment button
			_cache.$appointmentPopup.on('click', function(e) {
				e.preventDefault();
				$("#modalWindow").empty();
				$(this).modalWindow();
				common._dataLoad(_cache.$askAppointmentPagePath, _postAjaxEvents);
			});

			$('input:radio[name=del_address]').change(function() {
				if (this.value == 'standard-button') {
					$('.standard-delivery').css('border', '1px solid #724d54');
					$('.express-delivery').css('border', 'none');
				} else if (this.value == 'express-button') {
					$('.express-delivery').css('border', '1px solid #724d54');
					$('.standard-delivery').css('border', 'none');
				}
			});

			$('input[type=text]').on('click', _removePlaceHolder);
			$('textarea').on('click', _removePlaceHolder);
			$('input[type=text]').on('blur', _regenratePlaceHolder);
			$('textarea').on('blur', _regenratePlaceHolder);

		},

		_countrySelectorAutofill = function() {
			if ($('#js-contact-ambassador-form').length) {

				var autoVal = $('.js-country').val();

				//console.log(autoVal);

				$('#js-contact-ambassador-form #fn_country option').each(function(index, el) {
					if ($(el).attr('value') === autoVal) {
						$('#js-contact-ambassador-form #fn_country').val(autoVal);
						$.uniform.update();
					}
				});
			}

		},
		_requestInfoRadioValidation = function(ph, em, radioChecked, radioClick) {

			var $ph = ph,
				$em = em,
				$radioChecked = radioChecked,
				$radioClick = radioClick;

			$radioChecked.find('#email').attr('checked', true);
			$.uniform.update();
			$em.find('input').rules('remove', 'required');
			//clone variables to save the email and phone html
			$('.requestInformation_phoneNumber').find('label .form-mandatory').addClass('display-none');

			$radioClick.on('click', function() {

				if ($(this).val() === "email") {
					$('.requestInformation_phoneNumber').find('label .form-mandatory').addClass('display-none');
					$('.requestInformation_emailAddress').find('label .form-mandatory').removeClass('display-none');
					$em.find('.errormessage').addClass('display-none');
					$ph.find('.errormessage').removeClass('display-none');
					$em.find('input').siblings('.errormessage').find('label').hide();
					$em.find("input").removeClass('error');
					$em.find('input').rules('remove', 'required');

					$ph.find("input").rules("add", {
						required: true,
						messages: {
							required: _objPropertiesMsg.mandatory
						}
					});


				} else {
					$('.requestInformation_emailAddress').find('label .form-mandatory').addClass('display-none');
					$('.requestInformation_phoneNumber').find('label .form-mandatory').removeClass('display-none');
					$ph.find('.errormessage').addClass('display-none');
					$em.find('.errormessage').removeClass('display-none');
					$ph.find('input').siblings('.errormessage').find('label').hide();
					$ph.find("input").removeClass('error');
					$ph.find('input').rules('remove', 'required');

					$em.find("input").rules("add", {
						required: true,
						messages: {
							required: _objPropertiesMsg.mandatory
						}
					});
				}

			});
		},
		/*
         @private  method    :tasks to be done after result come from first Ajax call on page
         @param   result data loaded from Ajax
         */
		_postAjaxEvents = function(result) {
			$("#modalWindow").empty();
			$("#modalWindow").html(result);
			$("#modalWindow").addCrossButton();
			setTimeout(function() {
				$(this).modalWindow();
			}, 20);

			if (typeof $('.body-wrapper').data('plugin_analytics') !== 'undefined') {
				$('.body-wrapper').data('plugin_analytics').contactFormPopup();
				$('.body-wrapper').data('plugin_analytics').boutiqueDetailGA();
				$('.body-wrapper').data('plugin_analytics').myWishlistRequestInfo();
			}

			$("input:checkbox, input:radio, select").not('.no-uniform').uniform();
			$("input:checkbox, input:radio").not('.no-uniform').uniform();
			$('input[name=pdp_pagepath]').val($('#pagePath').val());
			$('input[name=pdp_pagepath]').val($('#configPath').val());
			_getPriceRules();
			$(".close").on("click", function() {
				$("#modalWindow").empty();
				$("#modalWindow").addAjaxLoader();
				$("#modalOverlay").hide();
			});

			if ($("input[name='requestInformation_contactPreference']").length) {
				_requestInfoRadioValidation($(".requestInformation_emailAddress"), $(".requestInformation_phoneNumber"), $('.requestInformation_contactPreference'), $("input[name=requestInformation_contactPreference]"));
			}

			if ($("input[name='requestPrice_contactPreference']").length) {
				_requestInfoRadioValidation($(".requestPrice_emailAddress"), $(".requestPrice_phoneNumber"), $('.requestPrice_contactPreference'), $("input[name=requestPrice_contactPreference]"));
			}



			if ($('#js-request-price-form, #js-request-info-form').length && $('.js-sizeselector').is(':visible')) {
				$('#js-request-price-form, #js-request-info-form').append($('<input>').attr({
					type: 'hidden',
					id: 'pdp_variantId',
					name: 'pdp_variantId',
					value: $('.js-sizeselector').val(),
				}));
			}

			if ($('.js-ask-appointment-form').length) {
				_appointmentRadio();
				_getBoutiqueListOnLoad(_objPropertiesPath.askaappointment);
				_addCustomValidation();
			}

			if ($('#js-contact-ambassador-form').length || $('#js-request-price-form').length) {
				if ($('#fn_country').length) {
					$('#fn_country').rules("add", {
						required: true,
						messages: {
							required: _objPropertiesMsg.mandatory
						}
					});

				}
			}
			_countrySelectorAutofill();
			/*END*/

		},

		_addCustomValidation = function() {

			$('.appointment_boutique_country .selector ').on('change', function() {
				setTimeout(function() {
					$('.appointment_boutique_location .selector ').trigger('click').trigger('blur').trigger('change');
				}, 100);

			});

			$.validator.addMethod("appointmentLocation", function(value, element) {
				if ($('.appointment_boutique_location select').val() === null || $('.appointment_boutique_location select').val() === "default") {
					setTimeout(function() {
						$('.appointment_boutique_country .selector ').addClass('formerror');
						$('.appointment_boutique_location .selector ').addClass('formerror');
						$('#appointment_appointment_reason').trigger('click').trigger('click');
						$('#appointment_time').trigger('click').trigger('click');
						$('.js-date-picker select').trigger('click').trigger('click');
					}, 1);
					return false;
				} else {
					setTimeout(function() {
						$('.appointment_boutique_country .selector ').removeClass('formerror');
						$('.appointment_boutique_location .selector ').removeClass('formerror');
						$('#appointment_appointment_reason').trigger('click').trigger('click');
						$('#appointment_time').trigger('click').trigger('click');
						$('.js-date-picker select').trigger('click').trigger('click');
					}, 1);
					return true;
				}
			}, "");


			$.validator.addMethod("appointmentDateValidation", function(value, element) {
				var dateIsValid = false;
				var month = $("select[name='appointment_month']").val();
				var date = $("select[name='appointment_date']").val();
				var year = $("select[name='appointment_year']").val();
				var selectedDate = new Date();

				if (month !== -1 && date !== -1 && year !== -1 && month !== '-1' && date !== '-1' && year !== '-1') {
					selectedDate.setFullYear(year);
					selectedDate.setMonth(month);
					selectedDate.setDate(date);
					var currentDate = new Date();
					if (currentDate < selectedDate) {
						dateIsValid = true;
					}
				}

				if (dateIsValid) {
					setTimeout(function() {
						$("select[name='appointment_month']").closest('.selector').removeClass('formerror');
						$("select[name='appointment_date']").closest('.selector').removeClass('formerror');
						$("select[name='appointment_year']").closest('.selector').removeClass('formerror');
					}, 10);
				} else {
					setTimeout(function() {

						$("select[name='appointment_month']").closest('.selector').addClass('formerror');
						$("select[name='appointment_date']").closest('.selector').addClass('formerror');
						$("select[name='appointment_year']").closest('.selector').addClass('formerror');

					}, 10);
				}
				return dateIsValid
			}, "");



			$("select[name='appointment_boutique']").rules("add", {
				appointmentLocation: true,
				messages: {
					appointmentLocation: _objPropertiesMsg.mandatory,
				}
			});

			$("select[name='appointment_country']").rules("add", {
				required: true,
				messages: {
					required: _objPropertiesMsg.mandatory,
				}
			});

			$("select[name='appointment_month']").rules("add", {
				appointmentDateValidation: true,
				messages: {
					appointmentDateValidation: _objPropertiesMsg.dateValidation
				}
			});

			$('select[name="appointment_date"]').on("change click blur", function() {
				$("select[name='appointment_month']").trigger('click');
			});

			$('select[name="appointment_year"]').on("change click blur", function() {
				$("select[name='appointment_month']").trigger('click');
			});
		},

		_getBoutiqueListOnLoad = function(url) {

			var objXHR = cartier.ajaxWrapper.getXhrObj({
				type: 'GET',
				url: url,
				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded'
			});


			if (objXHR) {
				objXHR.done(function(data) {
					// handle failure
					if (typeof data.success !== 'undefined' && !data.success) {
						// handle redirectURL exist if the session expires
						// data.redirectURL ?  window.location.href = data.redirectURL : $form.find('.server_message').html(data.errorMessage);
					} else {


						var parsedData = cartier.common.cartierJSONparser({
							json: data
						});

						if (parsedData !== false) {
							_fillCountryDropDown(parsedData);
						}
					}
				});
			}

		},

		_fillCountryDropDown = function(data) {

			$('.appointment_boutique_country select').on('change', function() {
				var $boutiqueListdropDownEL = $('.appointment_boutique_location select'),
					selectedCountry = $(this).find(':selected').val(),
					boutiqueListHtmlMarkup = {},
					boutiqueListHtmlMarkup = ["<option value='default'>-Select-</option>"],
					boutiqueListJson = {};

				if (typeof data[selectedCountry] !== 'undefined') {

					boutiqueListJson = data[selectedCountry]['Boutique'];

					$.each(boutiqueListJson, function(key, value) {
						if (value.name !== undefined) {
							boutiqueListHtmlMarkup[key] = "<option value='" + value.id + "'>" + value.name + "</option>";
						}
					});

					$boutiqueListdropDownEL.empty();
					$boutiqueListdropDownEL.append(boutiqueListHtmlMarkup);
					$.uniform.update();
				}
				$('.appointment_boutique_location select').trigger('change');
			});

			$('.appointment_boutique_location select').on('change', function() {
				var bValue = $(this).find(':selected').val();

				var selectedCountry = $('.appointment_boutique_country select').find(':selected').val();
				if (typeof data[selectedCountry] !== "undefined") {

					var newOptionsMarkup = "";

					$.each(data[selectedCountry].Boutique, function(index, val) {
						if (bValue === val.id) {

							$.each(val.timeSlots, function(index, valInner) {
								newOptionsMarkup += "<option value='" + valInner.value + "'>" + valInner.displayValue + "</option>";
							});
						}
					});

					$('#appointment_time').empty().append(newOptionsMarkup);
					$.uniform.update();
				}
			});
		},

		/*
          @public method : remove  place after on click 
          @param : none
        */
		_removePlaceHolder = function() {

			if (typeof $(this).attr('placeholder') !== "undefined" && $(this).attr('placeholder') !== "") {

				$(this).data('placeholder-backup', $(this).attr('placeholder'));

				$(this).attr('placeholder', "");
			}

		},


		_regenratePlaceHolder = function() {

			if (typeof $(this).val() !== "undefined" && $(this).val() === "" && $(this).data('placeholder-backup') !== "undefined") {

				$(this).attr('placeholder', $(this).data('placeholder-backup'));
			}

		},


		_addPushesEffects = function() {
			var $highlight;
			_cache.$pushwrapper.on('mouseenter', function() {
				if ($(this).find('.highlight').length) {
					$highlight = $(this).find('.highlight');
					$background = $(this).find('.push-col');

					$highlight.css("display", "block")
						.css("opacity", 0).stop()
						.animate({
							'opacity': 0.7
						}, 500);

					$background.stop().animate({
						'opacity': 0.2
					}, 500);



				} else {

					$(this).find('.push-over').css("display", "block");
				}
			})
				.on('mouseleave', function() {
					if ($(this).find('.highlight').length) {
						$highlight = $(this).find('.highlight');
						$background = $(this).find('.push-col');


						$highlight.stop().animate({
							'opacity': 0.1
						}, 500, function() {
							$(this).hide();
						});

						$background.stop().animate({
							'opacity': 1
						}, 500);

					} else {
						$(this).find('.push-over').css("display", "none");
					}
				});
		},



		_redThemeBg = function() {
			if ($(".main-container").hasClass("js-checkout") || $("body").hasClass("js-checkout")) {
				$(".body-wrapper").addClass("shoppingBagBg");
			} else {
				$(".body-wrapper").removeClass("shoppingBagBg");
			}
		},

		_whiteThemeBg = function() {
			if ($("body").hasClass("js-living-heritage")) {
				$(".body-wrapper").addClass("living-heritage-bg");
			}
		},
		_iframeHeightVideo = function() {
			$(window).bind("load", function() {
				var heights = $(".bx-viewport").height();
				var iframeheight = $(".carousel").find(".js-video").contents("iframe").css("height", heights + "px");
				$(".carousel").find(".js-video").contents("iframe").css("height", heights + "px");
				$('iframe').each(function() {
					var url = $(this).attr("src");
					var reqChar = "?";
					if (url.indexOf("?") != -1) {
						var reqChar = "&";
					}

					$(this).attr("src", url + reqChar + "wmode=transparent");
				});

			});

		},

		_quickLinkpushes = function() {
			_cache.$quickLinkPushes.on('mouseenter', function() {
				$(this).find(".image").animate({
					'opacity': 0.1
				}, 100, function() {
					$(this).hide();
					$(this).siblings('.text').animate({
						'opacity': 1
					}, 100).show();
				});

			})
				.on('mouseleave', function() {
					$(this).find(".text").animate({
						'opacity': 0.1
					}, 100, function() {
						$(this).hide();
						$(this).siblings('.image').animate({
							'opacity': 1
						}, 100).show();
					});
				});
		},

		_collectionPushes = function() {
			_cache.$collectionPushes.on('mouseenter', function() {
				$(this).find('.model-count').stop().animate({
					'opacity': 1
				}, 200).show();
				$('.js-collection-push').not($(this)).find('.collection-overlay').stop().animate({
					opacity: 0.3
				}, 200)

			})
				.on('mouseleave', function() {
					$(this).find('.model-count').stop().animate({
						'opacity': 0
					}, 200);
					$('.js-collection-push').find('.collection-overlay').stop().animate({
						'opacity': 0
					}, 600);
				});
		},

		_servicePushes = function() {
			_cache.$servicePushes.on('mouseenter', function() {
				$(this).find('.push-hover').stop();
				var h1 = $(this).find('.push-hover').get(0).offsetHeight,
					h2, h_open, h3;
				if ($(this).find('.more').length) {
					h3 = $(this).find('.more').get(0).offsetHeight;
				} else {
					h3 = 0;
				}

				if ($(this).find('.description').length) {
					h2 = $(this).find('.description').get(0).offsetHeight + 10;
				} else {
					h2 = 0;
				}
				h_open = h1 + h2 + h3;
				h_open = h_open + 5;
				h_open = h_open + 'px';

				$(this).find('.push-hover').animate({
					'height': h_open
				}, 200);
			})
				.on('mouseleave', function() {
					$(this).find('.push-hover').stop();

					if ($('.push-highlight').length > 0) {
						$(this).find('.push-hover').animate({
							'height': '35px'
						}, 200);
					} else {
						$(this).find('.push-hover').animate({
							'height': '45px'
						}, 200);
					}
				});

		},
		// Function to bind the mouse events for showing and hiding of megamenu

		// Function is for desktop site.
		_initializeMegamenu = function() {
			$(".nav-show").on("mouseenter", ".secondary-nav", function() {

				$(this).find('.mega-menu').stop().fadeIn();
			}).on("mouseleave", ".secondary-nav", function() {

				$(this).find('.mega-menu').stop().fadeOut(100);
			});
			$(".js-sec-nav").on("mouseenter", function() {
				$(".js-sec-nav.active").addClass("nonhovered");
				$(this).addClass("activesec");
			})
				.on("mouseleave", function() {
					$(".js-sec-nav").removeClass("nonhovered").removeClass("activesec");
				});

		},

		_toolTip = function() {

			_cache.$toolTip.on('mouseenter', function() {
				$(this).find('.js-tool-tip-detail').fadeIn(200);
			})
				.on('mouseleave', function() {
					$(this).find('.js-tool-tip-detail').fadeOut(200);
				});


		},


		_formBuilderToolTip = function() {
			_cache.$formBuilderToolTip.css('display', 'block');
			//tooltip bind event for mouseover and mouseleave
			_cache.$formBuilderToolTip.on('mouseenter', function() {
				$(this).find('.tooltip-details').fadeIn(200);
			})
				.on('mouseleave', function() {
					$(this).find('.tooltip-details').fadeOut(200);
				});
		},

		_tooltipPosition = function() {

			$('.field-tooltip').parent().each(function() {
				var labelWidth = $(this).find('label').width();
				$(this).find('.field-tooltip').css('left', labelWidth);

			});
		},


		_scrollToInternalLink = function() {
			$('.js-internal-link').on('click', function(e) {
				e.preventDefault();

				var target = this.hash,
					$target = $(target);

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 900, 'swing', function() {
					window.location.hash = target;
				});
			});
		},

		_adaptImage = function(arg, scaleW) {
			var res = "high";
			var ext = arg.split('.').pop();
			var scale = ".scale." + scaleW + "." + res + ".";
			return arg + scale + ext;
		},

		_disablePasteOnFields = function() {
			$("input[name='fn_emailcon'],input[name='fn_passcon']").on('paste', function(e) {
				e.preventDefault();
			});
		};

	common.socialShareHandler = function() {


		//This selector has been specially added here because of caching issue with this selector. please don't remove it
		var imgLoc = $('.js-product-carousel .js-pdp-slider li:visible img');
		//If the Required image comes from a carousel then imgLoc will be true, Else Use shareImgClassWithoutCarousel ('js-share-img')
		if (imgLoc.attr('data-original')) {
			imageSrc = imgLoc.attr('data-original');
		} else {
			if (_cache.$shareImgclassWithoutCarousel) {
				if (_cache.$shareImgclassWithoutCarousel.attr('data-original'))
					imageSrc = _cache.$shareImgclassWithoutCarousel.attr('data-original');
				else
					imageSrc = _cache.$shareImgclassWithoutCarousel.attr('src');

			} else
			// Default Cartier Logo image should go here. Please put the URL for Cartier Logo here
				imageSrc = 'http://www.cartier.us/sites/all/themes/cartierfotheme/images/Cartier_jeweller-watchmaker-leather-goods.png';
		}
		var winLoc = window.location,
			imageSrc,
			facebookLink, tweetLink, pinLink,
			currentUrl = winLoc.protocol + '//' + winLoc.host + '' + winLoc.pathname,
			imageUrl = winLoc.protocol + '//' + winLoc.host + '' + imageSrc,

			productDesc = $.trim(_cache.$shareDescClass.html()),
			tweeterStaticText = encodeURIComponent(_objPropertiesMsg.tweeterStaticText),
			title = window.productName,
			caption = encodeURIComponent(_cache.$shareCaptionclass.text());

		if (typeof title !== "undefined")
			title = title.replace(/@/gi, "");


		if (typeof productDesc !== "undefined") {
			productDesc = productDesc.replace(/<span class='lovefont'>A <\/span>/gi, "Love").replace(/<span class="lovefont">A <\/span>/gi, "Love");
		}

		productDesc = encodeURIComponent(productDesc);

		title = encodeURIComponent(title);

		if ($('.js-boutique').length) {

			//currentUrl = 'https://tinyurl.com/nho99us', // For boutique pages, Tiny url of the store page need to come as URL in twitter link. Not implimented as for now
			title = _objPropertiesMsg.boutiqueCartierText + " - " + encodeURIComponent($.trim(_cache.$shareTitleClass.text())); // This text needs to come from i18n
			productDesc = title + _objPropertiesMsg.boutiqueDescText; // This text needs to come from i18n

			if ($('.js-social-share__email').length) {
				var pagePath = $('input[name=currentPagePath]').val();
				$('input[name=pagePath]').val(pagePath);
				$('input[name=fn_title]').attr('value', title);
				$('input[name=fn_titleimgsrc]').attr('value', imageUrl);
				$('textarea[name=fn_titledesc]').text(productDesc);
				$('input[name=fn_titleurl]').attr('value', currentUrl);

			}
		}


		if ($('.js-social-share__email').length && $('.js-product').length) {
			$('input[name=fn_title]').attr('value', title);
			$('input[name=fn_titleimgsrc]').attr('value', imageUrl);
			$('textarea[name=fn_titledesc]').text(productDesc);
			$('input[name=fn_titleurl]').attr('value', currentUrl);

		}

		if ($('.js-social-share__email').length && $('.js-wishlist').length) {
			var currentPagePath = $('input[name=wishlist_pagepath]').val(),

				wishListName = $('.js-wishlist-select .js-form-select').val();
			$('.overlay-form input[name=currentPagePath]').attr('value', currentPagePath);
			$('.overlay-form input[name=wishlist_name]').attr('value', wishListName);
			$('.overlay-form input[name=pageName]').attr('value', "my-wishlist");

		}
		//for event article page

		if ($('.js-article').length) {
			var
			introText = $('.js-article-introtext').text().trim(),
				title = $('.js-service-article h2').text().trim(),
				imagePath = $('.js-article img').attr('src'),
				pageName = $('input[name=pageName]').val(),
				pagePath = $('input[name=currentPagePath]').val();


			if ($('.js-social-share__email').length) {
				$('input[name=pagePath]').val(pagePath);
				$('input[name=title]').attr('value', title);
				$('input[name=imagePath]').attr('value', imagePath);
				$('input[name=introText]').attr('value', introText);
				$('input[name=pageName]').attr('value', pageName);
			}
		}



		var isProductOrBoutique = $('.js-product').length + $('.js-boutique').length; // A variable to check if this is a boutique page or pdp. Else we will share the current URL on FB

		var currentUrlToShare = encodeURIComponent(window.location.href);
		facebookLink = "https://www.facebook.com/sharer/sharer.php?app_id=1402782546638078&u=" + currentUrlToShare + "&display=popup&ref=plugin&sdk=joey";


		if (isProductOrBoutique) {
			/*facebookLink =
				'http://www.facebook.com/dialog/feed?app_id=1402782546638078' +
				'&link=' + currentUrl +
				'&name=' + title +
				'&picture=' + imageUrl +
				'&caption=' + caption +
				'&description=' + productDesc +
				'&redirect_uri=http://facebook.com/';*/

			var pinTitle = title;
			var pinImageUrl = imageUrl;

		} else { //Share the Current URL else


			var pinTitle = $('title').text();
			var pinImageUrl = $('.main-container img:eq(0)').attr('data-original');

			if (typeof pinImageUrl === "undefined")
				pinImageUrl = $('.main-container img:eq(0)').attr('src');

			if (typeof pinImageUrl === "undefined")
				pinImageUrl = $('.site-logo img:eq(0)').attr('src');


			pinImageUrl = winLoc.protocol + '//' + winLoc.host + '' + pinImageUrl;

		}


		pinLink =
			'http://www.pinterest.com/pin/create/button/?u=' + currentUrl +
			'&media=' + pinImageUrl +
			'&description=' + pinTitle;

		if (facebookLink) {
			_cache.$socialShareFb.attr('href', facebookLink);

			_cache.$socialShareFb.on('click', function(e) {
				e.preventDefault();

				var h = 400;
				var w = 700;
				var left = (screen.width / 2) - (w / 2);
				var top = (screen.height / 2) - (h / 2);
				window.open($(this).attr('href'), "mywindow", "location=1,status=1,scrollbars=1, top=" + top + ", left=" + left + ", width=" + w + ",height=" + h);
			});
		}

		if (pinLink) {
			_cache.$socialSharePinit.attr('href', pinLink);
		}
		if ($('.js-social-share__twitter').length > 0) {

			$('.js-social-share__twitter').on('click', function(e) {
				e.preventDefault();
				cartier.common.twitterLinkSetter(currentUrl, function(tinyUrl) {



					if (typeof title === "undefined" || title === "undefined" || title === "")
						title = $('title').text();

					tweetLink =
						'https://twitter.com/intent/tweet?original_referer=' + currentUrl +
						'&text=' + title + ' ' + tweeterStaticText +
						'&url=' + tinyUrl;
					if (tweetLink) {
						_cache.$socialShareTwitter.attr('href', tweetLink);
					}
					window.open($('.js-social-share__twitter').attr('href'), '_blank');
				});
			});
		}

	};

	common.emailDisplayHandler = function() {

		$('.js-social-share__email').on('click', function(e) {
			e.preventDefault();
			$('#modalWindow').empty();
			$(this).modalWindow();
			common._dataLoad(_cache.$sendmailPagePath, common.postAjaxEvents);
		});


	};

	/*
        @private method :event binding on the submit 
        @param : form name and from path
    */
	common._socialEmailSubmit = function() {
		$('#send_email').find('input[type="submit"]').on('click', common._socialEmailAjaxCallBack);
	};

	/*
        @private  method    :tasks to be done after result come from first Ajax call on page
        @param   result data loaded from Ajax
    */
	common.postAjaxEvents = function(result) {
		$("#modalWindow").empty();
		$("#modalWindow").html(result);
		$("#modalWindow").addCrossButton();
		setTimeout(function() {
			$(this).modalWindow();
		}, 20);
		$("input:checkbox, input:radio, select").not('.no-uniform').uniform();
		common.socialShareHandler();
		$(".close").on("click", function() {
			$("#modalWindow").empty();
			$("#modalWindow").addAjaxLoader();
			$("#modalOverlay").hide();
		});

		// setting page path and page name for PDP and boutique page
		$('#modalWindow input[name=pagepathcurrent]').val($('input[name=pagepathcurrent]').val());
		$('#modalWindow input[name=pageName]').val($('input[name=pageName]').val());

		if (typeof $('.body-wrapper').data('plugin_analytics') !== 'undefined') {
			$('.body-wrapper').data('plugin_analytics').myWishlistSendEmail();
		}


	};

	/*
      @public method : To display Popup Box 
      @param : redirectUrl will be the Url on which the site will be redirected when OK button is clicked on confirm Popup 
    */

	common._socialEmailAjaxCallBack = function() {

		$("#modalWindow").empty();
		$("#modalOverlay").hide();

		$('.js-social-share__email').confirmBox();
		$('.js-social-share__email').data('plugin_confirmBox').popupInitialize({
				'title': _objPropertiesMsg.messageSentSuccess1,
				'buttons': {
					'ok': {
						'buttonName': _objPropertiesMsg.okButton,
						'href': '#',
						'class': 'cta-button cta-button__inner cta--red'

					},


				}
			},
			$('.js-social-share__email').data('plugin_confirmBox').confirmHide

		);
	};

	common._dataLoad = function(url, action) {

		var objXHR = cartier.ajaxWrapper.getXhrObj({
			type: 'GET',
			url: url,
			dataType: 'html',
			contentType: "application/x-www-form-urlencoded",
		});
		if (objXHR) {
			objXHR.done(function(data) {
				var parsed = $($.parseHTML(data, document, true)).find('.overlay-form').addBack('.overlay-form');
				action(parsed);
			});
		}
	};

	common.twitterLinkSetter = function(currentUrl, callback) {
		var objXHR = cartier.ajaxWrapper.getXhrObj({
			type: 'POST',
			url: _objPropertiesPth.tinyUrlAjaxCall,
			dataType: 'json',
			data: "currentUrl=" + currentUrl + "&pagePath=" + $('.twitterPagePath').val(),
			contentType: "application/x-www-form-urlencoded"
		});



		if (objXHR) {
			objXHR.done(function(data) {
				// handle failure
				if (typeof data.success !== "undefined" && !data.success) {
					// handle redirectURL exist if the session expires
					// data.redirectURL ?  window.location.href = data.redirectURL : $form.find('.server_message').html(data.errorMessage);
				} else {
					if (data !== false) {
						callback(data.tinyurl);
					}
				}
			});
		}
	};
	/*
        @public method : checkForImgChange will check image changes for
                         Product detail page/Shopping bag changes and apply appropriate href's for social share
        @param : none
    */
	common.checkForImgChange = function() {
		//This selector has been specially added here because of caching issue with this selector. please don't remove it
		var imgLoc = $('.js-product-carousel .js-pdp-slider li:visible img'),
			winLoc = window.location,
			imageSrc;

		if (imgLoc.attr('data-original')) {
			imageSrc = imgLoc.attr('data-original');
		} else
			imageSrc = _cache.$shareImgclassWithoutCarousel.attr('data-original');

		var imageUrl = winLoc.protocol + '//' + winLoc.host + '' + imageSrc,
			fbText = _cache.$socialShareFb.attr('href'),
			pinText = _cache.$socialSharePinit.attr('href');


		if (fbText) {
			fbText = fbText.replace(/(picture=).*?(&)/, '$1' + imageUrl + '$2');
			_cache.$socialShareFb.attr('href', fbText);

		}
		if (pinText) {
			pinText = pinText.replace(/(media=).*?(&)/, '$1' + imageUrl + '$2');
			_cache.$socialSharePinit.attr('href', pinText);
		}

	};
	/*
        @public method : To check the validity
        @param : none
    */
	common.getCardType = function(cc_no) {
		var card, card_type, card_types, accept, get_card_type,
			__indexOf = [].indexOf || function(item) {
				for (var i = 0, l = this.length; i < l; i++) {
					if (i in this && this[i] === item) return i;
				}
				return -1;
			};
		card_types = [{
			name: 'amex',
			pattern: /^3[47]/,
			valid_length: [15],
			cvv_length: 4
		}, {
			name: 'diners_club_international',
			pattern: /^(30[0-5]|3095|36|38|39)/,
			valid_length: [14],
			cvv_length: 3
		}, {
			name: 'jcb',
			pattern: /^35(2[89]|[3-8][0-9])/,
			valid_length: [16],
			cvv_length: 3
		}, {
			name: 'visa',
			pattern: /^4/,
			valid_length: [16],
			cvv_length: 3
		}, {
			name: 'mastercard',
			pattern: /^5[1-5]/,
			valid_length: [16],
			cvv_length: 3
		}, {
			name: 'discover',
			pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
			valid_length: [16],
			cvv_length: 3
		}];
		accept = (function() {
			var _i, _len, _results;
			_results = [];
			for (_i = 0, _len = card_types.length; _i < _len; _i++) {
				card = card_types[_i];
				_results.push(card.name);
			}
			return _results;
		})();

		get_card_type = function(number) {
			var _j, _len1, _ref2;
			_ref2 = (function() {
				var _k, _len1, _ref2, _results;
				_results = [];
				for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
					card = card_types[_k];
					if (_ref2 = card.name, __indexOf.call(accept, _ref2) >= 0) {
						_results.push(card);
					}
				}
				return _results;
			})();
			for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
				card_type = _ref2[_j];
				if (number.match(card_type.pattern)) {
					return card_type;
				}
			}
			return null;
		};

		return get_card_type(cc_no);

	};
	/*
        @public method : addApiScript For Adding some scripts on runtime
        @param : none
    */
	common.addApiScript = function(scriptSrc) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = scriptSrc;
		script.async = false;
		_cache.$headerObject.append(script);
	};


	/*
        @public method : addApiScript For Adding some scripts on runtime
        @param : none
    */
	common.addErrorDiv = function(targetDiv, msgTitle, msgDesc) {

		var _errorDiv;
		if (msgTitle) {
			_errorDiv = "<div class='error-div'><span class='bolder'>" + msgTitle + '</span>' + msgDesc + '</div>';
		} else {
			_errorDiv = "<div class='error-div'>" + msgDesc + "</div>";
		}

		targetDiv.after(_errorDiv);

	};

	/*
        @public method : _guestAccountAjaxCallHandler For Handling Ajax calls for NON_LOGGEDIN Users
        @param : none
    */
	common._guestAccountAjaxCallHandler = function(action, clickedEl) {

		/*var teaserId = $('.teaserId').val();
		var refId = $('.refId').show().text();
		$('.refId').hide();
		var pdp_pagepath = $('.pdp_pagepath').show().text();
		$('.pdp_pagepath').hide();

		if (teaserId === undefined || teaserId === "undefined" || teaserId === "")
			teaserId = "";
		var pathWishlist = $('#wishlist_varient_refrence').val();
		if (pathWishlist === undefined)
			pathWishlist = '';
		var ProductAvailablity = $('.arrayStatus').show().text();
		$('.arrayStatus').hide();*/

		if (typeof clickedEl !== "undefined" && clickedEl.closest("li.js-product-inbag")) {
			var clickedEl = clickedEl;
			var pathWishlist = clickedEl.closest("li.js-product-inbag").find("#wishlist_varient_refrence").val();
			var currentPage = window.location.pathname + window.location.search;
			var teaserId = clickedEl.closest("li.js-product-inbag").find(".teaserId").val();
			var refId = clickedEl.closest("li.js-product-inbag").data('refid');
			var pdp_pagepath = clickedEl.closest("li.js-product-inbag").data('pdppagepath');
			var isProductUnavailable = clickedEl.closest("li.js-product-inbag").data('avaliablity');

		} else {

			var pathWishlist = $('#wishlist_varient_refrence').val();
			var isProductUnavailable = false;
			var pdp_pagepath = $('#pagePath').val();
			if (pathWishlist === undefined)
				pathWishlist = '';
			var teaserId = "";
			var refId = "";
			var pdp_pagepath = "";
			var currentPage = "";
		}



		if (teaserId === undefined || teaserId === "undefined" || teaserId === "")
			teaserId = "";
		if (pathWishlist === undefined)
			pathWishlist = '';
		if (refId === undefined)
			refId = '';
		if (pdp_pagepath === undefined)
			pdp_pagepath = '';



		$('.js-add-selection').parent().addLoader();
		var objXHR = cartier.ajaxWrapper.getXhrObj({
			type: 'POST',
			data: {
				'action': action,
				'wishlist_pagepath': _cache.$wishlistPagepath.val(),
				'pagepath': _cache.$pagePath.val(),
				'fn_teaserid': teaserId,
				'wishlist_varient_refrence': pathWishlist,
				'isProductUnavailable': isProductUnavailable,
				'pdp_pagepath': pdp_pagepath,
				'refId': refId,
				'currentPage': currentPage
			},
			url: _objPropertiesPth.saveWishlist,

			dataType: 'json',
			contentType: 'application/x-www-form-urlencoded',

		});


		if (objXHR) {
			objXHR.done(function(productData) {
				// handle failure
				if (typeof productData.success !== 'undefined' && !productData.success) {
					// handle redirectURL exist if the session expires
					// data.redirectURL ?  window.location.href = data.redirectURL : $form.find('.server_message').html(data.errorMessage);
				} else {

					var parsedData = cartier.common.cartierJSONparser({
						json: productData,
					});

					if (parsedData !== false) {

						$('body').confirmBox();
						$('body').data('plugin_confirmBox').popupInitialize({
								'title': _objPropertiesMsg.wishlistcopytoWishlist,
								'anchormessage': _objPropertiesMsg.wishlistParagraph,
								'src': $('.js-wishlist_link_nonSecure').val() + ".html",
								'buttons': {
									'ok': {
										'buttonName': _objPropertiesMsg.okButton,
										'class': 'cta-button cta-button__inner cta--red',
										'action': function() {
											//location.reload();
										}

									},

								}
							},
							$('body').data('plugin_confirmBox').confirmHide
						);

						$('.popup-close-button').on('click', function() {
							$('body').data('plugin_confirmBox').confirmHide();
						});


					};

				}
			});
		}

		$('.js-add-selection').parent().removeLoader();
	};

	/*
        @public method : wish list
        @param : none
    */
	common.addSelectionToWishlist = function(validation, action, callback, title, message, clickedEl) {
		if (typeof clickedEl !== "undefined" && clickedEl.closest("li.js-product-inbag")) {
			var clickedEl = clickedEl;
			var pathWishlist = clickedEl.closest("li.js-product-inbag").find("#wishlist_varient_refrence").val();
			var currentPage = window.location.pathname + window.location.search;
			var teaserId = clickedEl.closest("li.js-product-inbag").find(".teaserId").val();
			var refId = clickedEl.closest("li.js-product-inbag").data('refid');
			var pdp_pagepath = clickedEl.closest("li.js-product-inbag").data('pdppagepath');
			var isProductUnavailable = clickedEl.closest("li.js-product-inbag").data('avaliablity');

		} else {

			var pathWishlist = $('#wishlist_varient_refrence').val();
			var isProductUnavailable = false;
			var pdp_pagepath = $('#pagePath').val();
			if (pathWishlist === undefined)
				pathWishlist = '';
			var teaserId = "";
			var refId = "";
			var pdp_pagepath = "";
			var currentPage = "";
		}



		if (teaserId === undefined || teaserId === "undefined" || teaserId === "")
			teaserId = "";
		if (pathWishlist === undefined)
			pathWishlist = '';
		if (refId === undefined)
			refId = '';
		if (pdp_pagepath === undefined)
			pdp_pagepath = '';

		var _validationFunction = function(jqXHR) {
			if (action === "createPDPwishlist" && $('.createwishlistform') !== undefined && !$('.createwishlistform').valid()) {
				jqXHR.abort();
			}
		};

		var objXHR = cartier.ajaxWrapper.getXhrObj({
			type: 'POST',
			data: {
				'action': action,
				'wishlist_pagepath': $('.js-wishlist_pagepath').val(),
				'pagepath': $('.js-pagepath').val(),
				'productId': $('.js-pagepath').val(),
				'wishlistnumber': $('.js-select-addtomywishlist option:selected').data('wishlistno'),
				'wishlist-field': $('.js-select-addtomywishlist option:selected').val(),
				'fn_newwishlistname': $('.js-newwishlistname').val(),
				'fn_teaserid': teaserId,
				'wishlist_varient_refrence': pathWishlist,
				'is': true,
				'isProductUnavailable': isProductUnavailable,
				'pdp_pagepath': pdp_pagepath,
				'refId': refId,
				'currentPage': currentPage


			},
			url: _objPropertiesPth.saveWishlist,
			beforeSend: validation,
			dataType: 'json',
			contentType: 'application/x-www-form-urlencoded',
		});


		if (objXHR) {
			objXHR.done(function(productData) {
				// handle failure
				if (typeof productData.success !== 'undefined' && !productData.success) {
					// handle redirectURL exist if the session expires
					// data.redirectURL ?  window.location.href = data.redirectURL : $form.find('.server_message').html(data.errorMessage);
				} else {

					var parsedData = cartier.common.cartierJSONparser({
						json: productData,
					});

					if (parsedData !== false) {
						callback(parsedData, title, message, clickedEl);
					}
				}
			});
		}
	};

	common.checkCookie = function() {

		var qtyString = $.jStorage.get('swsecartlc');

		if (typeof qtyString === "undefined" || qtyString === "" || qtyString === null || typeof $.cookie('swse_cart') === "undefined") {
			qtyString = "{}";
			var cartCookie = 0;
		} else {

			var cartCookie = JSON.parse(qtyString).noOfProducts;
		}

		if (cartCookie === undefined || cartCookie === '' || cartCookie === '0' || cartCookie === 0) {
			$('.js-cart-update').addClass('display-none');
		} else {
			$('.js-cart-update').removeClass('display-none');
			_cache.$cartUpdate.find('span').html(cartCookie);
		}



	};

	/*
            @pubic method : show hide mini shopping bag on mouse enter or leave 
             param : none
        */
	common.bindMiniShoppingBagShowHide = function() {
		_cache.$shoppingBag.on("mouseenter", function() {
			_cache.$popUpContentWrapper.stop(true, true).fadeIn();
		}).on("mouseleave", function() {
			_cache.$popUpContentWrapper.stop().delay(3000).fadeOut();
		});
	},

	common.unbindMiniShoppingBagShowHide = function() {
		_cache.$shoppingBag.unbind('mouseenter');
		_cache.$shoppingBag.unbind('mouseleave');
	},

	/*
        @public method : returns Get Parameter as an key => value object
        @param : none
        cartier.common.getParameter();
    */
	common.getParameter = function() {
		var get = {};
		document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
			function decode(s) {
				return decodeURIComponent(s.split("+").join(" "));
			}

			get[decode(arguments[1])] = decode(arguments[2]);
		});
		return get;
	};


	/*
          @public method : remove duplicate element in array
          @param : none
    */
	Array.prototype.removeDuplicates = function() {
		var temp = new Array();
		this.sort();
		for (var i = 0; i < this.length; i++) {
			if (this[i] === this[i + 1]) {
				continue;
			}
			temp[temp.length] = this[i];
		}

		return temp;
	};

	if (!String.prototype.trim) {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	};


	/*
        @public method : To initialize common.js
        @param : none
    */

	common.isLoggedIn = function() {
		var loggedIn = $.cookie('RCHMFrontEndCookie');
		if (typeof loggedIn === 'undefined') {
			return false;
		} else {
			return true;
		}
	};

	common.detectCookie = function() {
		var guestCookie = $.cookie('guest_wishlist');
		var loggedIn = $.cookie('RCHMFrontEndCookie');

		if (typeof loggedIn === 'undefined') {
			if (typeof guestCookie === 'undefined' || guestCookie === '' || guestCookie === '0') {
				$('.js-my-wishlist').addClass('display-none');
				$('.js-my-wishlist').find('.connection .nav-link').addClass('display-none');
			} else {
				$('.js-my-wishlist').removeClass('display-none');
				$('.js-my-wishlist').find('.connection .nav-link').removeClass('display-none');
			}
		}
	};


	/*
        @public method : Redirection wrapper
        @param : none
    */
	common.redirection = function() {

		// check the cookie exists and mode is publish
		if ($('.redirection').length > 0 && $.cookie('redirection-status') !== undefined && mode === "publish") {

			$('.redirection').css('display', 'block');
			var redirectionWrapper = $('.redirection').height(),
				carouselHeight = $('.home-carousel').find('.carousel').css('min-height');
			$('.home-carousel').find('.carousel').css({
				top: redirectionWrapper,
				'min-height': redirectionWrapper + parseInt(carouselHeight)
			});

			setTimeout(function() {
				$.removeCookie("redirection-status");
				$('.home-carousel').find('.carousel').animate({
					duration: 1000,
					top: 0,
					'min-height': carouselHeight

				});

				$('.redirection').slideUp();
			}, 20000);

		}

		$('.redirection').find('.js-redirection-close').on('click', function() {

			$.removeCookie("redirection-status");

			$('.home-carousel').find('.carousel').animate({
				duration: 1000,
				top: 0,
				'min-height': carouselHeight

			});
			$('.redirection').slideUp();


		});

	};

	/*
        @public method : mini shopping get shopping bag json data 
        @param : none
       
    */
	/*	var _alaxCallForMiniShppingBag = function() {
		var cartCookie = $.cookie('swse_cart');

		if (!(cartCookie === undefined || cartCookie === '' || cartCookie === '0')) {


			var objXHR = cartier.ajaxWrapper.getXhrObj({
				type: 'POST',
				url: _objPropertiesPth.getCart + '?micro-bag=true',
				dataType: 'json'
			});


			if (objXHR) {
				objXHR.done(function(data) {
					// handle failure
					if (typeof data.success !== "undefined" && !data.success) {
						// handle redirectURL exist if the session expires
						// data.redirectURL ?  window.location.href = data.redirectURL : $form.find('.server_message').html(data.errorMessage);
					} else {
						var parsedData = cartier.common.cartierJSONparser({
							json: data,
						});

						if (parsedData !== false) {
							common.minShoppingBag(parsedData);
						}
					}
				});
			}

		}
	};*/


	var _alaxCallForMiniShppingBag = function(argument) {
		var jsonString = $.jStorage.get('swsecartlc');
		if (typeof jsonString === "undefined" || jsonString === "" || jsonString === null || typeof $.cookie('swse_cart') === "undefined") {
			jsonString = "{}";
			common.unbindMiniShoppingBagShowHide();
			common.checkCookie();

		} else {
			var parsedData = JSON.parse(jsonString);
			common.minShoppingBag(parsedData);
			common.checkCookie();
		}


	};


	/*
        @public method : mini shopping bag
        @param : cartJson :  mini shopping bag kart json
       
    */

	common.minShoppingBag = function(cartJson) {

		var teasureContainer = _cache.$popUpContentWrapper.find(".js-teaseure-container").clone(true, true),
			cartContent = cartJson,
			teasure = _cache.$popUpContentWrapper.find("li:nth-child(1)").clone(true, true),
			topPostion = 0,
			totalQuantity = 0,
			totalTeasureHeight = 0;

		_cache.$popUpContentWrapper.find('.js-total').html(cartContent.total);

		_cache.$popUpContentWrapper.find('.js-total-info').html(CQ.I18n.getMessage(cartContent.totalInfo));

		if (typeof cartContent.teaserArray === "undefined")
			cartContent.teaserArray = [];

		if (cartContent.teaserArray.length > 0) {
			$(teasureContainer).empty();
		}
		/*  “ DATE 30-09-2014 |  DEFECT- CARE-5266 | BRANCH Develop”  
             End
         */
		$.each(cartContent.teaserArray, function(key, teasureInfo) {
			var newTeasure = teasure.clone(true, true);
			if (key) {
				topPostion += newTeasure.height();
			}
			totalTeasureHeight += newTeasure.height();
			totalQuantity += teasureInfo.selectedQuantity;
			newTeasure.css('top', topPostion);
			newTeasure.find('.js-img').attr('src', _adaptImage(teasureInfo.imageURL, "100"));
			newTeasure.find('.js-total-product').html(teasureInfo.selectedQuantity + "x");
			newTeasure.find('.js-product-name').html(teasureInfo.productTitle);
			newTeasure.find('.js-product-description').html(teasureInfo.productDesc);
			newTeasure.find('.js-refer-no a').html(teasureInfo.variantID).attr('href', teasureInfo.productPagePath + '.html');



			newTeasure.find('.js-amount').html(teasureInfo.totalDisplayPrice);
			$(teasureContainer).append(newTeasure);

		});
		_cache.$popUpContentWrapper.find('.js-bag-item').html(totalQuantity + ' ' + 'ITEMS IN YOUR SHOPPING BAG');
		_cache.$popUpContentWrapper.find(".js-teaseure-container").replaceWith(teasureContainer);
		_cache.$popUpContentWrapper.find('.wrapper-items').css('height', totalTeasureHeight);


		if ($('.js-teaseure-container').find('li').length > 1) {

			$('.va-accordion-bag').vaccordion({
				visibleSlices: 2,
				expandedHeight: 230,
				animOpacity: 0.1,
				contentAnimSpeed: 300,
				accordionH: 265
			});

		}

		if (cartContent.teaserArray.length > 0) {
			common.bindMiniShoppingBagShowHide();
		} else {
			common.unbindMiniShoppingBagShowHide();
		}


		if (($('.js-pop-up-content-wrapper .js-teaseure-container li').length) > 2) {
			$('.js-pop-up-content-wrapper .va-nav').removeClass('display-none');
		} else {
			$('.js-pop-up-content-wrapper .va-nav').addClass('display-none');
		}

	};



	common.playVideoAndPauseOthers = function(frame) {
		$('iframe[src*="http://www.youtube.com/embed/"]').each(function(i) {
			var func = this === frame ? 'playVideo' : 'pauseVideo';
			this.contentWindow.postMessage('{"event":"command","func":"' + func + '","args":""}', '*');
		});
	};

	common.sendemailCallback = function(data) {


		if (typeof data === "object") {

			var loggedIn = cartier.common.isLoggedIn();
			$("#modalWindow").empty();
			$("#modalOverlay").hide();


			if (typeof(data.content.isSubmitSuccess) !== 'undefined' && data.content.isSubmitSuccess) {

				if (typeof $('.body-wrapper').data('plugin_analytics') !== 'undefined') {
					$('.body-wrapper').data('plugin_analytics').myWishlistSendEmailConfirm();
				}

				if (loggedIn) {
					$('body').confirmBox();
					$('body').data('plugin_confirmBox').popupInitialize({
							'title': _objPropertiesMsg.sendAFriendHeading,
							'message': _objPropertiesMsg.sendAFriendHeadingText,
							'buttons': {
								'ok': {
									'buttonName': _objPropertiesMsg.okButton,
									'href': '#',
									'class': 'cta-button cta-button__inner cta--red'

								},

							}
						},
						$('body').data('plugin_confirmBox').confirmHide

					);
				} else {
					$('body').confirmBox();
					$('body').data('plugin_confirmBox').popupInitialize({
							'title': _objPropertiesMsg.sendAFriendHeading,
							//'message': _objPropertiesMsg.contactAmbassadorPopupText,
							'buttons': {
								'ok': {
									'buttonName': _objPropertiesMsg.okButton,
									'href': '#',
									'class': 'cta-button cta-button__inner cta--red'

								},
								'cancel': {
									'buttonName': _objPropertiesMsg.contactAmbassadorCancelOptionText,
									'href': '#',
									'class': 'cta-button more-button-overlay'
								},

							}
						},
						$('body').data('plugin_confirmBox').confirmHide

					);

				}

				$('.popup-close-button').on('click', function() {
					$('body').data('plugin_confirmBox').confirmHide();
				});



				$($('#confirmButtons button')[0]).on('click', function() {
					location.href = '' + $(this).attr('href') + '';
				});

			} else {
				$('.serverMessage').remove();
				var newServerMsgEl = $("<div class='serverMessage' style='display:block;'></div>").text("There was some server error while making this request");

				$('.main-container').prepend(newServerMsgEl);
			}

		}



	};

	common.myaddressTab = function() {

		$('.js-first-radio').find('#homeaddress').attr('checked', true);
		$('.js-first-radio').find('span').addClass('checked');
		$('.addressform_address12').find('input#addressform_address12').prop('disabled', true);
		$("input[name='addressform_address2']").removeClass('error').rules('add', 'required');
		$("input[name='addressform_address5']").removeClass('error').rules('add', 'required');
		//$("input[name='addressform_address6']").removeClass('error').rules('add','required');

		$('.js-form-address-selector').find('.js-first-radio').on('click', function() {
			$("input[name='addressform_address12']").removeClass('error').rules('remove', 'required');
			$("input[name='addressform_address2']").removeClass('error').rules('add', 'required');
			$("input[name='addressform_address5']").removeClass('error').rules('add', 'required');
			//$("input[name='addressform_address6']").removeClass('error').rules('add','required');
			$("input[name='addressform_address12']").siblings('.errormessage').find('label').hide();
			$.uniform.update();
			$('.addressform_address12').find('input#addressform_address12').prop('disabled', true);

		});

		$('.js-form-address-selector').find('.js-second-radio').on('click', function() {
			$('.addressform_address12').find('input#addressform_address12').prop('disabled', false).addClass('error');
			$("input[name='addressform_address12']").removeClass('error').rules('add', 'required');
			$('.addressform_address2').find('input#addressform_address2').prop('disabled', true);
			$('.addressform_address5').find('input#addressform_address5').prop('disabled', true);
			$('.addressform_address6').find('input#addressform_address6').prop('disabled', true);
			$("input[name='addressform_address2']").removeClass('error').rules('remove', 'required');
			$("input[name='addressform_address5']").removeClass('error').rules('remove', 'required');
			//$("input[name='addressform_address6']").removeClass('error').rules('remove','required');
			$("input[name='addressform_address2']").siblings('.errormessage').find('label').hide();
			$("input[name='addressform_address5']").siblings('.errormessage').find('label').hide();
			// $("input[name='addressform_address6']").siblings('.errormessage').find('label').hide();
			$.uniform.update();

		});

	};
	common.regstep3Tab = function() {
		$('.js-first-radio').find('#homeaddress').attr('checked', true);
		$('.js-first-radio').find('span').addClass('checked');
		$('.fn_pobox').find('input#fn_pobox').prop('disabled', true);


		$('.js-form-address-selector').find('.js-first-radio').on('click', function() {

			$('.fn_pobox').find('input#fn_pobox').prop('disabled', true);
			$('.fn_strnum').find('input#fn_strnum').prop('disabled', false);
			$('.fn_strname').find('input#fn_strname').prop('disabled', false);
			$('.fn_addrinfo').find('input#fn_addrinfo').prop('disabled', false);
			$.uniform.update();
		});

		$('.js-form-address-selector').find('.js-second-radio').on('click', function() {
			$('.fn_pobox').find('input#fn_pobox').prop('disabled', false);
			$('.fn_strnum').find('input#fn_strnum').prop('disabled', true);
			$('.fn_strname').find('input#fn_strname').prop('disabled', true);
			$('.fn_addrinfo').find('input#fn_addrinfo').prop('disabled', true);

			$.uniform.update();
		});

	};

	common.loggedinNavlink = function() {
		var loggedIn = cartier.common.isLoggedIn();

		if (loggedIn) {

			$('.right-nav__list').find('.mycartier').removeClass('display-none');
			$('.right-nav__list').find('.connection').addClass('display-none');
		} else {
			$('.right-nav__list').find('.mycartier').addClass('display-none');
			$('.right-nav__list').find('.connection').removeClass('display-none');
		}
	};

	common.toTitleCase = function(input) {
		if (typeof input !== 'undefined') {
			return (input || '').toLowerCase().replace(/(\b|-)\w/g, function(m) {
				return m.toUpperCase().replace(/-/, '');
			});
		}
		return null;
	};
	common._CQI18nCreator = function() {

		if (typeof CQ.I18n === 'undefined') {
			CQ.I18n = {
				getMessage: function(key) {
					if (window.I18nJson[key] !== undefined && window.I18nJson[key] !== "")
						key = window.I18nJson[key];
					else {
						if (typeof window.i18ENnxhr === "undefined") {
							$.ajax({
								type: 'GET',
								url: "/libs/cq/i18n/dict." + "en" + ".json",
								dataType: 'json',
								contentType: 'application/x-www-form-urlencoded',
								cache: true,
								async: false
							}).success(function(data) {
								window.i18ENnxhr = data;
								console.log(window.i18ENnxhr);
							});
						}

						if (window.i18ENnxhr[key] !== undefined && window.i18ENnxhr[key] !== "")
							key = window.i18ENnxhr[key];

					}
					return key;
				}
			};
		}
	};
	/* callback fucntion */
	var RequestInfoCallback = function(data) {

		if (typeof data === "object") {

			var inputPath = $('input[name=registrationPath]'),
				regPagePath = inputPath.length > 0 ? inputPath.val() : "#";

			var loggedIn = cartier.common.isLoggedIn();
			$("#modalWindow").empty();
			$("#modalOverlay").hide();


			if (data.content.isSubmitSuccess) {

				if (typeof $('.body-wrapper').data('plugin_analytics') !== 'undefined') {
					$('.body-wrapper').data('plugin_analytics').myWishlistRequestInfoConfirm();
				}

				var body = $('body');
				if (loggedIn) {
					body.confirmBox();
					body.data('plugin_confirmBox').popupInitialize({
							'title': _objPropertiesMsg.contactAmbassadorPopupHeading,
							'message': _objPropertiesMsg.contactAmbassadorPopupText,
							'buttons': {
								'ok': {
									'buttonName': _objPropertiesMsg.okButton,
									'href': '#',
									'class': 'cta-button cta-button__inner cta--red'

								},

							}
						},
						body.data('plugin_confirmBox').confirmHide

					);
				} else {
					body.confirmBox();
					body.data('plugin_confirmBox').popupInitialize({
							'title': _objPropertiesMsg.contactAmbassadorPopupHeading,
							'message': _objPropertiesMsg.contactAmbassadorPopupText,
							'buttons': {
								'ok': {
									'buttonName': _objPropertiesMsg.okButton,
									'href': '#',
									'class': 'cta-button cta-button__inner cta--red'

								},
								'cancel': {
									'buttonName': _objPropertiesMsg.contactAmbassadorCancelOptionText,
									'href': regPagePath + '.html',
									'class': 'cta-button more-button-overlay'
								},

							}
						},
						body.data('plugin_confirmBox').confirmHide

					);

				}

				$('.popup-close-button').on('click', function() {
					body.data('plugin_confirmBox').confirmHide();
				});



				$($('#confirmButtons button')[0]).on('click', function() {
					location.href = '' + $(this).attr('href').trim() + '';
				});

				$($('#confirmButtons button')[1]).on('click', function() {
					location.href = '' + $(this).attr('href').trim() + '';
				});

			}



		}

	},

		askAppointmentCallback = function(data) {

			if (typeof data === "object") {

				var loggedIn = cartier.common.isLoggedIn();
				$("#modalWindow").empty();
				$("#modalOverlay").hide();


				if (typeof(data.content.isSubmitSuccess) !== 'undefined') {

					var body = $('body');
					if (loggedIn) {
						body.confirmBox();
						body.data('plugin_confirmBox').popupInitialize({
								'title': _objPropertiesMsg.contactAmbassadorPopupHeading,
								'message': _objPropertiesMsg.contactAmbassadorPopupText,
								'buttons': {
									'ok': {
										'buttonName': _objPropertiesMsg.okButton,
										'href': '#',
										'class': 'cta-button cta-button__inner cta--red'

									},

								}
							},
							_cache.$requestButton.data('plugin_confirmBox').confirmHide

						);
					} else {
						body.confirmBox();
						body.data('plugin_confirmBox').popupInitialize({
								'title': _objPropertiesMsg.contactAmbassadorPopupHeading,
								'message': _objPropertiesMsg.contactAmbassadorPopupText,
								'buttons': {
									'ok': {
										'buttonName': _objPropertiesMsg.okButton,
										'href': '#',
										'class': 'cta-button cta-button__inner cta--red'

									},
									'cancel': {
										'buttonName': _objPropertiesMsg.contactAmbassadorCancelOptionText,
										'href': '#',
										'class': 'cta-button more-button-overlay'
									},

								}
							},
							body.data('plugin_confirmBox').confirmHide

						);

					}

					$('.popup-close-button').on('click', function() {
						body.data('plugin_confirmBox').confirmHide();
					});



					$($('#confirmButtons button')[0]).on('click', function() {
						location.href = '' + $(this).attr('href') + '';
					});

				} else {
					var newServerMsgEl = $("<div class='serverMessage' style='display:block;'></div>").text("There was some server error while making this request.");

					$('.main-container').prepend(newServerMsgEl);
				}
			}

		},
		contactAmbCallback = function(data) {
			if (typeof data === "object") {
				var loggedIn = cartier.common.isLoggedIn();

				var inputPath = $('input[name=registrationPath]'),
					regPagePath = inputPath.length > 0 ? inputPath.val() : "#";

				$("#modalWindow").empty();
				$("#modalOverlay").hide();


				if (typeof(data.content.isSubmitSuccess) !== 'undefined' && data.content.isSubmitSuccess) {
					var body = $('body');
					if (loggedIn) {
						body.confirmBox();
						body.data('plugin_confirmBox').popupInitialize({
								'title': _objPropertiesMsg.contactAmbassadorPopupHeading,
								'message': _objPropertiesMsg.contactAmbassadorPopupText,
								'buttons': {
									'ok': {
										'buttonName': _objPropertiesMsg.okButton,
										'href': '#',
										'class': 'cta-button cta-button__inner cta--red'

									},

								}
							},
							body.data('plugin_confirmBox').confirmHide

						);
					} else {
						body.confirmBox();
						body.data('plugin_confirmBox').popupInitialize({
								'title': _objPropertiesMsg.contactAmbassadorPopupHeading,
								'message': _objPropertiesMsg.contactAmbassadorPopupText,
								'buttons': {
									'ok': {
										'buttonName': _objPropertiesMsg.okButton,
										'href': '#',
										'class': 'cta-button cta-button__inner cta--red'

									},
									'cancel': {
										'buttonName': _objPropertiesMsg.contactAmbassadorCancelOptionText,
										'href': regPagePath,
										'class': 'cta-button more-button-overlay',
										'action': function() {
											var url = $(this).attr('href');
											window.location = url + '.html?origin=Contact';
										}
									},

								}
							},
							body.data('plugin_confirmBox').confirmHide

						);

					}

					if (typeof $('.body-wrapper').data('plugin_analytics') !== 'undefined') {
						$('.body-wrapper').data('plugin_analytics').contactConfirmationFormPopup();
					}

					$('.popup-close-button').on('click', function() {
						body.data('plugin_confirmBox').confirmHide();
					});



					$($('#confirmButtons button')[0]).on('click', function() {
						location.href = '' + $(this).attr('href') + '';
					});

				} else {
					$('.serverMessage').remove();

					var newServerMsgEl = $("<div class='serverMessage' style='display:block;'></div>").text(data.content.errorMessage);
					$('.main-container').prepend(newServerMsgEl);
					setTimeout(function() {
						$('.serverMessage').fadeOut('400', function() {
							$('.serverMessage').remove();
						});
					}, 7000);
				}

			}
		},
		_getPriceRules = function() {
			var $addMessage = $('.requestPrice_checkbox_askForPrice');
			$addMessage.on('click', function() {

				if ($('.requestPrice_checkbox_askForPrice .checker').find('span').hasClass('checked')) {
					$('.requestPrice_message').css('display', 'block');
				} else {
					$('.requestPrice_message').css('display', 'none');
				}
			});
		},
		getDomainName = function(hostName) {
			return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
		},
		_removeTimeoutCookie = function() {


			var cookiesToRemove = ["swse_cart",
				"carqty",
				"carorder"
			];

			$(document.cookie.split(/; */)).each(function(index, el) {
				var cookie = el.split('=');
				var name = cookie[0];
				var value = cookie[1];

				if (name.match(/^CR.*$/) !== null) {
					cookiesToRemove.push(name);
				}
			});

			if (cartier.common.isLoggedIn()) {
				$.removeCookie('RCHMFrontEndCookie', {
					path: '/',
					domain: getDomainName(location.host)
				});
			}

			$(cookiesToRemove).each(function(index, el) {
				$.removeCookie(el, {
					path: '/',
					domain: getDomainName(location.host)
				});
			});

			$.jStorage.deleteKey('swsecartlc');
		},


		_faq_para_width = function() {
			if ($('.faq-view__para').length > 0)
				$('.faq-view__para').closest('.three-quarters').css('width', '100%');
		},

		_ie_breadcrumb_last_arrow = function() {
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE ");

			if (msie > 0) {
				$('.breadcrumb').find('li:last-child span').css('display', 'none');
			};
		},

		_appointmentRadio = function() {
			var radioName = $("input[name=appointment_contacttype]"),
				em = $('.appointment_email'),
				ph = $('.appointment_phone');

			$('.appointment_contacttype').find('#email').attr('checked', true);
			$.uniform.update();
			$('.appointment_phone').hide();
			$('.appointment_phone').find('input').rules('remove', 'required');
			em.find('.errormessage').removeClass('display-none');
			radioName.on('click', function() {

				if ($(this).val() === "email") {
					ph.hide();
					em.show();
					em.find('input').rules('remove', 'required');
					em.find("input").removeClass('error');
					ph.find('.errormessage').addClass('display-none');
					em.find('.errormessage').removeClass('display-none');
					em.find("input").rules("add", {
						required: true,
						messages: {
							required: _objPropertiesMsg.mandatory
						}
					});
				} else {
					ph.show();
					em.hide();
					ph.find('input').rules('remove', 'required');
					ph.find("input").removeClass('error');
					em.find('.errormessage').addClass('display-none');
					ph.find('.errormessage').removeClass('display-none');
					ph.find("input").rules("add", {
						required: true,
						messages: {
							required: _objPropertiesMsg.mandatory
						}
					});
				}
			});
		},

		_errorFieldHighlighter = function() {
			if ($('.js-light-account-form #captchaFailedFlag').val() === "true") {
				$('.captcha__input').addClass('error');
			} else {
				$('.captcha__input').removeClass('error');
			}
		},

		getParameterByName = function(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		},

		_urlCheckerAndAjax = function() {
			if ((getParameterByName('sw') !== "" && $('.js-shoppingbag').length === 0) || (window.location.protocol === "http:" && typeof $.cookie('rvcheck') !== "undefined")) {

				var objXHR = cartier.ajaxWrapper.getXhrObj({
					type: 'POST',
					url: _objPropertiesPth.getCart,
					data: {
						sw: getParameterByName('sw'),
						currentPage: $('#configPath').val()
					},
					dataType: 'json',
					contentType: "application/x-www-form-urlencoded",
					async: true
				});
				if (objXHR) {
					objXHR.done(function(data) {
						if (typeof data === "undefined") {} else {
							var parsedData = cartier.common.cartierJSONparser({
								json: data,
							});
							if (parsedData !== false) {
								parsedData = cartier.common.JsonLCUpgrader(parsedData);
								_alaxCallForMiniShppingBag();
								if (window.location.protocol === "http:" && typeof $.cookie('rvcheck') !== "undefined") {
									$.removeCookie('rvcheck', {
										path: '/',
										domain: getDomainName(location.host)
									});
								}
							}
						}
					});
				}
				return false;
			} else {
				_alaxCallForMiniShppingBag();
			}
		},
		_addLightAccountValidation = function() {
			if ($('.js-light-account-form').length && $('#fn_country').length) {

				$('#fn_country').rules("add", {
					required: true,
					messages: {
						required: _objPropertiesMsg.mandatory,
					}
				});
			}

		};


	common.removeItemOnLogout = function() {
		localStorage.removeItem('formGender');
		localStorage.removeItem('formCountry');
		localStorage.removeItem('formCity');
		localStorage.removeItem('formYear');
	};

	common.JsonLCUpgrader = function(xhrData) {

		//CRUD
		var dataobj = xhrData;

		if ($.jStorage.get("swsecartlc")) {

			var getdata = JSON.parse($.jStorage.get('swsecartlc'));

			for (var index = 0; index < dataobj.teaserArray.length; index++) {

				var operation = dataobj.teaserArray[index].operation;

				if (operation === 'ModifyCart') {
					//getdatateaseArray[index]=dataobj.teaseArray[index];
				} else if (operation === 'AddCart') {
					//getdata.teaseArray.push(dataobj.teaseArray[index]);
				} else if (operation === "DeleteCart") {
					dataobj.teaserArray.splice(index, 1);
				} else if (operation === "ReadCart") {

					var currentTeaserId = dataobj.teaserArray[index].teaserID;

					for (var i = 0; i < getdata.teaserArray.length; i++) {
						if (currentTeaserId === getdata.teaserArray[i].teaserID) {

							if (typeof getdata.teaserArray[i].engravingInformation !== "undefined")
								dataobj.teaserArray[index].engravingInformation = getdata.teaserArray[i].engravingInformation;

							if (typeof getdata.teaserArray[i].braceletInfo !== "undefined")
								dataobj.teaserArray[index].braceletInfo = getdata.teaserArray[i].braceletInfo;

							if (typeof getdata.teaserArray[i].giftCardInfo !== "undefined")
								dataobj.teaserArray[index].giftCardInfo = getdata.teaserArray[i].giftCardInfo;

						}
					}

				}
			}
		}

		var xhrstring = JSON.stringify(dataobj);

		$.jStorage.set('swsecartlc', xhrstring);

		return dataobj;
	};
	/*end  callback fucntion */
	common.init = function() {

		_objPropertiesPth = cartier.properties.paths;
		_objPropertiesMsg = cartier.properties.messages;

		if (window.isSessionTimeout) {
			_removeTimeoutCookie();
		}

		RICHEMONT.AjaxCaller.listOfCallbackFun.CartierEmailToFriendAction = common.sendemailCallback;
		RICHEMONT.AjaxCaller.listOfCallbackFun.RequestInformationAction = RequestInfoCallback;
		RICHEMONT.AjaxCaller.listOfCallbackFun.RequestPriceAction = RequestInfoCallback;
		RICHEMONT.AjaxCaller.listOfCallbackFun.AskForAppointmentAction = askAppointmentCallback;
		RICHEMONT.AjaxCaller.listOfCallbackFun.ContactAmbassadorAction = contactAmbCallback;


		// caching the jquery objects
		_cacheObjects();
		_objPropertiesPath = cartier.properties.paths;
		//implentation going here
		_extendJQuery();
		_urlCheckerAndAjax();


		common.isLoggedIn();
		common.detectCookie();
		common.redirection();
		common.loggedinNavlink();
		_disablePasteOnFields();
		/****DESKTOP related functions****/
		_faq_para_width();
		_addPushesEffects();
		_quickLinkpushes();
		_collectionPushes();
		_servicePushes();
		_toolTip();
		_initializeMegamenu();
		_bindEvents();
		_scrollToInternalLink();
		_redThemeBg();
		_whiteThemeBg();
		Modernizr.load({
			complete: function() {
				if (navigator.userAgent.match('SE 2.X MetaSr 1.0')) {
					$('html').addClass('sogou-css');
				}
			}
		});


		$(".wrapper-sub-menu").on("mouseleave", function() {
			$(this).hide();
		});

		$('.va-accordion').vaccordion({});
		_iframeHeightVideo();
		_ie_breadcrumb_last_arrow();

		if ($('.contact.js-boutique').length > 0) {
			var parameter = common.getParameter();

			if (parameter.autoPopup) {
				autoPopupStatus = parameter.autoPopup.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
				if (autoPopupStatus) {
					common._dataLoad(_cache.$askAppointmentContactButtonPath + ".html", _postAjaxEvents);
					$('#modalOverlay').show();
				}

			}
		}

		if (($('.js-address-form').length || $('.js-address-form-jp').length) && cartier.countryHandler.isUS) {
			common.myaddressTab();
		}

		if ($('.js-social-share__email').length > 0) {
			common.emailDisplayHandler();
		}

		if ($('#js-login-form').length) {
			$('.cq-colctrl-lt0').addClass('cq-colctrl-lt0-forlogin');
		}

		if (($('.js-reg-step-3').length || $('.js-jp-reg-step-3').length) && cartier.countryHandler.isUS) {
			common.regstep3Tab();
		}

		_formBuilderToolTip();

		if ($('.field-tooltip').parent().find('label').length) {
			_tooltipPosition();
		}

		if ($('.js-browser-back').length) {
			$('.js-browser-back').on('click', function(e) {
				e.preventDefault();
				window.history.back();
			});
		}

		if (window.isSessionTimeout) {
			_removeTimeoutCookie();
		}
		$('a.disabled').removeClass('disabled');
		_errorFieldHighlighter();
		_addLightAccountValidation();

		if ($('.js-static-scrollable').length) {
			$('.js-static-scrollable').jScrollPane({
				showArrows: true
			});
		}


		if ($('.js-lsdata-getter').length && $.jStorage.get('swsecartlc') !== null) {
			$('.js-lsdata-getter').val($.jStorage.get('swsecartlc'));
		}

		if ($('.js-payment-interm-form').length) {
			$('.js-payment-interm-form').submit();
		}
	};



}(window, jQuery, cartier.common));