/*
 * cartier.boutique.js
 * This file contains functionalities handling the Storelocator and Boutique Pages
 *
 * @project   Cartier Mobile
 * @date      2014-01-03
 * @author    Sapient 
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
(function(win, $, boutique, undefined) {
	//this will cause the browser to check for errors more aggressively
	'use strict';

	//check if Jquery is defined, else return
	if (typeof $ === 'undefined') {
		//console.log('jQuery not found');
		return false;
	}

	/*
   	 private variables
    */

	var
	_cache = {},
		_productPerPage,
		_objPropertiesMsg,
		_objPropertiesPth,
		backDataText = '',



		//--------------------------------------------------------------------------------------------------------
		//         Caching jQuery object
		//--------------------------------------------------------------------------------------------------------

		/*
          @private method : caching jquery objects 
          @param : none 
        */
		_cacheObjects = function() {

			_cache = {
				$boutique: $('.js-boutique'),
				$accordionObject: $('.js-accordion-refine'),
				$storeObject: $('.store-locator-wrapper'),
				$storeSearchWrapper: $('.store-search-wrapper'),
				$storeList: $('.js-store-list'),
				$filterButton: $('.js-filter-button'),
				$boutiqueUl: $('.js-boutique-list'),
				$retailerUl: $('.js-retailer-list'),
				$countrySelect: $('.js-country'),
				$countryDetail: $('.js-country-detail'),
				$countryDetailBridal: $('.js-country-detail-bridal'),
				$viewMoreLink: $('.js-view-button'),
				$listOfproducts: $('.js-retailer-list li'),
				$filterUl: $('.js-filter-list'),
				$filterCheckbox: $('.js-filter-checkbox'),
				$storeDetail: $('.js-store-detail'),
				$findStoreDetail: $('.js-store-list').find('.js-store-detail'),
				$GeolocateButton: $('.js-geolocateButton'),
				$searchButton: $('.change-loc__search .js-search-but-1'),
				$searchButton1: $('.js-search-but-1'),
				$searchButton2: $('.js-search-but-2'),
				$searchBox: $('.store-locater__search input'),
				$searchBox1: $('#js-search-box-1'),
				$searchBox2: $('#js-search-box-2'),
				$errorMsgClass1: $('.js-store-locator_error-msg-1'),
				$errorMsgClass2: $('.js-store-locator_error-msg-2'),
				$errorMsgClass3: $('.js-store-locator_error-msg-3'),
				$suggestionErrorClass: $('.js-store-locater__error-suggest'),
				$suggestionErrorClassAnchor: $('.js-store-locater__error-suggest li a'),
				$textForNear: $('.js-store-list').data('near'),
				$textForIn: $('.js-store-list').data('in'),
				$geolocateError: $('.js-geolocate-error'),
				$retailerListVisibleLi: $('.js-retailer-list li:visible'),
				$boutiqueListVisibleLi: $('.js-boutique-list li:visible'),
				$backButton: $('.back-button a'),
				$boutiqueDetailPage: $('.boutique'),
				$socialEmailForm: $('.js-social-share__email-form'),
				$backButtonBoutique: $('.js-boutique-back-button'),
				$backButtonBoutiqueAnchor: $('.js-boutique-back-button a'),
				$backButtonBoutiqueAnchorText: $('.js-boutique-back-button a span:nth-child(2)'),


				/* Strings */
				errorMsgClass1: 'js-store-locator_error-msg-1',
				errorMsgClass2: 'js-store-locator_error-msg-2',
				errorMsgClass3: 'js-store-locator_error-msg-3',
				suggestionErrorClass: 'js-store-locater__error-suggest'

			};

		},

		//--------------------------------------------------------------------------------------------------------
		//          EVENT Bindings
		//--------------------------------------------------------------------------------------------------------

		/*
          @private method : bind events
          @param : none
        */
		_bindEvents = function() {

			_cache.$viewMoreLink.on('click', _viewMore);

			_cache.$countrySelect.on('change', _countryajaxCallHandler);

			_cache.$filterButton.on('click', _refineFilterHandler);

			_cache.$storeList.find('a').on('click', _ChangeLocButtonHandler);

			_cache.$GeolocateButton.on('click', _geolocationHandler);

			_cache.$searchButton.on('click', function(e) {
				_searchButtonHandler(e);
			});

			_cache.$searchButton2.on('click', function(e) {
				_searchButtonHandler(e);
			});

			//For Enter Key binding for Search boxes
			_cache.$searchBox.on('enterKey', function(e) {
				_searchButtonHandler(e);
			});

			_cache.$searchBox.keyup(function(e) {
				if (e.keyCode == 13) {
					$(this).trigger('enterKey');
				}
			});



			_cache.$suggestionErrorClassAnchor.on('click', _suggestionAjaxCaller);

			_cache.$backButtonBoutique.on('click', function() {
				$.cookie('isBackLink', 'backlinkon', {
					path: '/'
				});
			});

			if($('.js-pre-registration').length > 0) // Only for ECS
			{
				$('input[name="fn_category"]').click(function(event) {
					/* Act on the event */
					if($(this).is(':checked')){
						$(this).closest('li').find('.form-check__icon ').addClass('refine-checked');
					} else {
						$(this).closest('li').find('.form-check__icon ').removeClass('refine-checked');
					}
				});
			}

		},


		//--------------------------------------------------------------------------------------------------------
		//          EVENT HANDLERS
		//--------------------------------------------------------------------------------------------------------

		/*
          @private method : View More selection function
          @param : none 
        */
		_viewMoreSelection = function() {

			if(typeof $('.js-store-list') !== "undefined" && typeof $('.js-store-list').data('showMoreCount') !== "undefined" ){
				_productPerPage = $('.js-store-list').data('showMoreCount');
			} else {
				_productPerPage = 2;
			}
			cartier.common.viewMoreSelection(_productPerPage, _cache.$viewMoreLink, $('.js-store-list .js-store-detail'));
		},

		/*
          @private method : View More Callback function
          @param : none 
        */

		_viewMoreCallback = function() {

			// Classes like js-retailer-list & js-boutique-list are appended dynamically Hence, Shouldn't be Cached.

			if ($('.js-retailer-list li:visible').length <= 0 && $('.js-boutique-list li:last-child:visible').length <= 0) {
				_cache.$retailerUl.find('.js-heading3').hide();
			} else
				_cache.$retailerUl.find('.js-heading3').show();

		},

		/*
          @private method : View More Main function
          @param : none 
        */
		_viewMore = function() {
			$.when(_viewMoreSelection()).done(_viewMoreCallback);
		},


		/*
          @private method : Click handler for click on the Filter button of the Expandable Store Filter
          @param : filterButtonObj is an object of the Clicked Filter Button
        */
		_storeFilterSubmitHandler = function(filterButtonObj) {
			$(this)
				.closest('fieldset')
				.find('.js-inputfield')
				.val('')
				.trigger('change');

			if($('.js-pre-registration').length <= 0) {
				_cache.$accordionObject.data('plugin_makeAccordion')._closeHandler(filterButtonObj);
			} else {
				$('.js-accordion-refine .js-accordion_node__title').trigger('click');
			}
		},

		/*
          @private method :Change Location Button Handler
          @param : none
        */

		_ChangeLocButtonHandler = function() {
			_cache.$storeList.find('.js-change-loc').hide();
			_cache.$storeList.find('.js-change-loc_search').show();
		},

		/*
          @private method : send ajax call, appends the data to the description
          @param : none 
        */
		_countryajaxCallHandler = function() {
			var countrySelect = $('.js-country option:selected').attr('value');
			//console.log(countrySelect);
			_cache.$countryDetail.find('.contact__service-cont__timimgs').addLoaderPrepend();
			var objXHR = cartier.ajaxWrapper.getXhrObj({
				type: 'GET',
				url: '/bin/richemont/private/contact.' + countrySelect + '.' + lang + '.json', // lang is a global variable defined on the jsp
				//url: '../json/success_true.json',
				contentType: 'application/x-www-form-urlencoded',
				dataType: 'json',
				cache: true

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

							_cache.$countryDetail.find('.contact__service-cont__number').attr('href', 'tel:' + parsedData.addressDetails.phone);
							_cache.$countryDetail.find('.js-phone').html(parsedData.addressDetails.phone);
							_cache.$countryDetail.find('.js-weekdays').html(parsedData.addressDetails.openingTime);
							_cache.$countryDetail.find('.js-address').html(parsedData.addressDetails.address);
							_cache.$countryDetailBridal.find('.contact__service-cont__number').attr('href', 'tel:' + data.content.phoneBridal);
							_cache.$countryDetailBridal.find('.js-phone').html(data.content.phoneBridal);
							_cache.$countryDetailBridal.find('.js-weekdays').html(data.content.scheduleBridal);
							_cache.$countryDetailBridal.find('.js-address').html(data.content.countryName);

							if (parsedData.addressDetails.phone === '') {
								_cache.$countryDetail.find('.contact__service-cont__number').addClass('display-none');
							} else
								_cache.$countryDetail.find('.contact__service-cont__number').removeClass('display-none');

							if (data.content.phoneBridal === '') {
								_cache.$countryDetailBridal.find('.contact__service-cont__number').addClass('display-none');
							} else
								_cache.$countryDetailBridal.find('.contact__service-cont__number').removeClass('display-none');

							if (data.content.phoneBridal === '' && data.content.scheduleBridal === '' && data.content.addressBridal === '') {
								_cache.$countryDetailBridal.addClass('display-none');
							} else {
								_cache.$countryDetailBridal.removeClass('display-none');

							}
						}
					}
				});
			}

			_cache.$countryDetail.find('.contact__service-cont__timimgs').removeLoader();
		},
		/*
          @private method : Geolocation Button Handler to Geocoder service with User's current address as input
          @param : none 
        */
		_geolocationHandler = function() {
			$.jStorage.set('backButtonCase', 'geo');
			$.cookie('backButtonCase', 'geo', {
				path: '/'
			});
			var geocoder = new google.maps.Geocoder(),
				lat, lng, latlng, Geolat, Geolng;

			var _geocodeCallback = function(setCity, setState) {
				var geoSenderFunc = _cache.$storeObject.data('plugin_storelocator')._geocodeSender();
				_setGeoUrl(geoSenderFunc, backDataText, setCity, setState);
			},
				_geoCityCallback = function(geoCity) {
					_cache.$storeList.find('.js-GeoCity').html(geoCity);
				};

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					Geolat = position.coords.latitude;
					Geolng = position.coords.longitude;
					lat = parseFloat(Geolat);
					lng = parseFloat(Geolng);
					latlng = new google.maps.LatLng(lat, lng);
					geocoder.geocode({
						'latLng': latlng
					}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
							if (results[1]) {
								_cache.$storeObject.data('plugin_storelocator')
									._geocodeMe(null, results[1].formatted_address, _geocodeCallback, _geoCityCallback, false);
								backDataText = results[1].formatted_address;
							}
						} else {
							//console.log('Geocoder for GeoLocateMe failed due to: ' + status);
						}
					});
				}, function() {

					_cache.$geolocateError.css('display', 'block');
				});

			} // End of If ( navigator.geolocation ) clause

		},


		/*
          @private method : Search Button Handler to call Geocoder service and Ajax call
          @param : none 
        */

		_searchButtonHandler = function(eventTriggered) {
			$.jStorage.set('backButtonCase', 'ser');
			$.cookie('backButtonCase', 'ser', {
				path: '/'
			});
			var _geocodeCallback = function(setCity, setState, geoCity) {
				var backDataText = geoCity;
				var geoSenderFunc = _cache.$storeObject.data('plugin_storelocator')._geocodeSender();
				_setGeoUrl(geoSenderFunc, backDataText, setCity, setState);
			},
				_geoCityCallback = function(geoCity) {
					_cache.$storeList.find('.js-GeoCity').html(geoCity);
				};

			if (eventTriggered.target.className === 'cta cta--red js-search-but-1' || eventTriggered.target.className === 'form-input js-search-box-1' || eventTriggered.currentTarget.classList[0] === 'js-search-but-1') {
				_cacheObjects();
				if ($('#js-search-box-1').val() !== '') {
					$('.js-store-locator_error-msg-1').hide();
					_cache.$storeObject.data('plugin_storelocator')
						._geocodeMe(_cache.$searchBox1.val(), null, _geocodeCallback, _geoCityCallback, false);
					_cache.$searchBox2.val(_cache.$searchBox1.val());

				} else {
					_cache.$errorMsgClass1.show();
					_cache.$errorMsgClass2.hide();
					_cache.$errorMsgClass3.hide();
					_cache.$suggestionErrorClass.hide();

				}

			}
			if (eventTriggered.target.className === 'cta cta--red js-search-but-2' || eventTriggered.target.className === 'form-input js-search-box-2' || eventTriggered.currentTarget.classList[0] === 'js-search-but-2') {
				if ($('#js-search-box-2').val() !== '') {
					$('.js-store-locator_error-msg-1').hide();
					_cache.$storeObject.data('plugin_storelocator')
						._geocodeMe(_cache.$searchBox2.val(), null, _geocodeCallback, _geoCityCallback, false);
					_cache.$searchBox2.val(_cache.$searchBox2.val());

				} else {
					_cache.$errorMsgClass1.show();
					_cache.$errorMsgClass2.hide();
					_cache.$errorMsgClass3.hide();
					_cache.$suggestionErrorClass.hide();
				}
			}
		},


		/*
          @private method : send ajax call, appends the data to the All the Stores on the basis on Search Query or Geolocation
          @param : GUrl is the url that needs to be send in the ajax call
        */

		_storelocatorAjaxCallHandler = function(GUrl, backdataText, setCity, setState) {


			$('.body-wrapper').data('plugin_analytics').searchGArules(backdataText);



			if (_cache.$boutiqueUl.find('.loaderImage').length === 0) {
				_cache.$boutiqueUl.addLoaderPrepend();
			}
			/*  “ DATE 28-10-2014 |  DEFECT- CARE-5615 | BRANCH 2.0.0  
             START
             condition added 
         	*/
			setCity = setCity ? setCity.replace(/'/g, "") : "";
			setState = setState ? setState.replace(/'/g, "") : "";

			/*  “ DATE 28-10-2014 |  DEFECT- CARE-5615 | BRANCH 2.0.0  
             End
         	*/
			
			/* REAL Ajax caller : This needs to be uncommented in for CQ  */
			if ($('.ecs-entrust-boutique').length) {
				var baseUrl = '/bin/richemont/storelocator/search/result.getStore.json';
				var objXHR = cartier.ajaxWrapper.getXhrObj({
					type: 'GET',
					url: baseUrl + GUrl + '?storelocator=' + $('#configPath').val(),
					dataType: 'json',
				});
			} else {
				var baseUrl = storelocator.pagePath + '/jcr:content.getStore.json';
				var objXHR = cartier.ajaxWrapper.getXhrObj({
					type: 'GET',
					url: baseUrl + setCity + setState + GUrl,
					dataType: 'json',
					cache: true

				});
			}


			/* DUMMY Ajax caller : This is temp code need to be REMOVED  */
			/*	
            var objXHR = cartier.ajaxWrapper.getXhrObj({
                type: 'GET',
                //url: _objPropertiesPth.storeListJson + setCity + setState + GUrl,
                url: _objPropertiesPth.storeListJson,
                dataType: 'json',
            });
*/


			if (objXHR) {
				objXHR.done(function(data) {
					// handle failure
					if (typeof data.success !== 'undefined' && !data.success) {
						// handle redirectURL exist if the session expires
						//data.redirectURL ?  window.location.href = data.redirectURL : $form.find('.server_message').html(data.errorMessage);
					} else {

						var parsedData = cartier.common.cartierJSONparser({
							json: data
						});

						if (parsedData !== false) {

							var winLoc = win.location.href;

							$.cookie('backButtonText', backdataText + '&' + winLoc, {
								path: '/'
							});

							// Each time We Search a Preloader is added before The Boutique List <UL>
							//_cache.$boutiqueUl.addLoaderPrepend();
							// Each time We Search The filter Button is unbinded temporarily
							_cache.$filterButton.unbind('click');
							// Each time We Search The Change location button is unbinded temporarily
							_cache.$storeList.unbind('click');

							// Each time We Search a new location,
							// we will Remove All the Store Blocks ( <li class='store-detail'>) from previous Search
							_cache.$storeObject.find('.js-store-detail').remove();
							// With Each New Search, To Hide the No result block
							_cache.$storeObject.find('.js-no-result-msg').hide();

							// If the JSON Object for searched stores is empty, then jump out of the function
							if (Object.keys(data.content).length === 0) {
								// To Show the NO RESULTS MSG
								_cache.$storeList.find('.js-view-button').hide();
								_cache.$storeObject.find('.js-no-result-msg').show();

								_cache.$boutiqueUl.removeLoader();

								//_cache.$storeObject.find('.js-change-loc').hide();
								_cache.$storeObject.find('.js-accordion.boutique_filter_detail').hide();
								// To Hide the 'Authorizied Retailer' heading
								_cache.$retailerUl.find('.heading3').hide();
								return (null); // Jump out of the function

							}

							_cache.$storeObject.find('.js-change-loc').show();
							_cache.$storeObject.find('.js-accordion.boutique_filter_detail').show();
							var boutiqueLi = '', // To store boutique entries to append later in Li
								retailerLi = '', // To store Retailer entries to append later in Li
								tCount = 0; // To store total count of stores

							// Show more count is the count that author sets for the number of stores 
							// that will be shown with SHOW-MORE/LOAD MORE IS CLICKED
							var showMoreCount = _cache.$storeList.data('show-more-count');

							// To find how many stores are to be displayed, this comes from the JSON object (data.content)
							tCount = Object.keys(data.content).length;

							// To supply FMT Based text for read more and Show Map
							var readmore = _cache.$boutiqueUl.data('readmore');
							var showmap = _cache.$boutiqueUl.data('showmap');

							// To supply a default store image is The Store result JSON does not have store image
							var defaultStoreImage = _cache.$boutiqueUl.data('default-store-image');

							// To Disable all Filter checkboxes at the first ajax run
							_cache.$filterUl.find('.js-filter-checkbox').attr('disabled', true);


							// For loop to iterate thru the Total Store count, tCount
							for (var i = 0; i < tCount; i++) {
								// To supply FMT Based text for read more and Show Map to each store entry
								data.content[i].readmore = readmore;
								data.content[i].showmap = showmap;
								// here we add Default Store img to data content if  that store' imgsrc is missing
								if (!data.content[i].imgsrc)
									data.content[i].imgsrc = defaultStoreImage;

								// If the Type of store is boutique then append Each of these types of stores into the Boutique Li unit
								if (data.content[i].typeofstore === 'Boutique') {

									if (i < showMoreCount) {
										boutiqueLi +=
											cartier.template.BoutiqueTemplateFiller(cartier.template.type.BoutiqueTemplate, data.content[i]);
									} else {
										boutiqueLi +=
											cartier.template.BoutiqueTemplateFiller(cartier.template.type.BoutiqueTemplateHidden, data.content[i]);
									}

								}
								// Else the Type of store is Retailer, then append Each of these types of stores into the Retailer Li
								else {
									if (i < showMoreCount) {
										retailerLi +=
											cartier.template.RetailerTemplateFiller(cartier.template.type.RetailerTemplate, data.content[i]);
									} else {
										retailerLi +=
											cartier.template.RetailerTemplateFiller(cartier.template.type.RetailerTemplateHidden, data.content[i]);
									}
								}

								var jsonTagArray = data.content[i].tags.split(' ');
								$.each(jsonTagArray, function(i) {
									_cache.$filterUl.find('.js-filter-checkbox[value=' + jsonTagArray[i] + ']').removeAttr('disabled');
								});

							} // END For Loop

							_cache.$boutiqueUl.append(boutiqueLi);
							_cache.$retailerUl.append(retailerLi);

							// call show more function 
							_viewMore();
							// Now if all the Retainers entries are empty, then Hide heading 'Authorized Retailers'
							if ($('.js-retailer-list li:visible').length <= 0) {
								_cache.$retailerUl.find('.js-heading3').hide();
							} else
								_cache.$retailerUl.find('.js-heading3').show();

							// Now if Total Store count is less than Show more count then HIDE SHOW MORE BUTTON
							if (tCount > showMoreCount) {
								_cache.$storeList.find('.js-view-button').show();
							} else
								_cache.$storeList.find('.js-view-button').hide();


							// To change <a href> for Show Map link Based on device (android/iOs)
							_mapLinkFix();


							// Rebind events on Filter Button
							_cache.$filterButton.on('click', _refineFilterHandler);
							// Rebind Change button Link
							_cache.$storeList.find('a').on('click', _ChangeLocButtonHandler);
							// Remove PreLoader

						}
						_cache.$boutiqueUl.removeLoader();

						// Add storelocatorGAEvents to Store Locator Page after Store List is added
						$('.body-wrapper')
							.data('plugin_analytics')
							.storelocatorGAEvents();
					}
				});
			}


		}, //_storelocatorAjaxCallHandler ENDS Here



		/*
          @private method : show - hide Store containers <li class='js-store-detail'> on the basis on selected Filter
          @param : none
        */

		_refineFilterHandler = function() {

			var rCount;
			if (_cache.$boutiqueUl.find('.loaderImage').length === 0) {
				_cache.$boutiqueUl.addLoaderPrepend();
			}


			_storeFilterSubmitHandler(_cache.$filterButton);
			// Show more count is the count that author sets for the number of stores 
			// that will be shown with SHOW-MORE/LOAD MORE IS CLICKED
			var showMoreCount = _cache.$storeList.data('show-more-count');

			_cache.$filterUl.find('.js-filter-checkbox').removeAttr('disabled');
			_cache.$storeObject.find('.js-no-result-msg').hide();
			_cache.$storeObject.find('.js-view-button').show();

			// ChecedTags will become a string with all the selected filters like, 
			// If checked filters are A, B,C, and D , then ChecedTags = 'A.B.C.D'
			var checkedTags =
				_cache.$storeObject.find('input:checkbox:checked.js-filter-checkbox')
				.map(function() {
					return this.value;
				})
				.get().join('.');

			var tagsToDisplay;

			_cache.$viewMoreLink.unbind('click');
			// If the No checkbox are selected, then jump out of the function
			if (!checkedTags.length) {
				_cache.$storeObject.find('.js-store-detail').removeClass('js-no-display');
				cartier.common.viewMoreSelection(_productPerPage, _cache.$viewMoreLink, $('.js-store-list .js-store-detail'));
				_showHideFix(null);
				tagsToDisplay = _cache.$storeList.find('.js-store-detail');
				rCount = tagsToDisplay.length;
				// Now if Total Store count is less than Show more count then HIDE SHOW MORE BUTTON
				if (rCount > showMoreCount) {
					_cache.$storeList.find('.js-view-button').show();
				} else
					_cache.$storeList.find('.js-view-button').hide();

				_cache.$boutiqueUl.removeLoader();
				return (null);
			}


			// Each time the Filter button is press, hide all stores 
			_cache.$storeObject.find('.js-store-detail').addClass('js-no-display');

			// Find all the stores if the checked Filters ==  store's Tags 
			tagsToDisplay = _cache.$storeList.find('.' + checkedTags + '');

			// UNHIDE all the stores if the checked Filters ==  store's Tags 

			if (tagsToDisplay && tagsToDisplay[0] !== null) {
				//add js-hide content class for first child
				cartier.common.viewMoreSelection(_productPerPage, _cache.$viewMoreLink, tagsToDisplay);
				tagsToDisplay.removeClass('js-no-display');
				// caching the objects
				_cacheObjects();
			} else {
				// In else, that means there is no store with required filters 
				// Hence. Show no results message and go out of the function
				_cache.$storeObject.find('.js-no-result-msg').show();
				_cache.$storeObject.find('.js-view-button').hide();
				_cache.$boutiqueUl.removeLoader();
				return (null);
			}

			//To UnDisable all check-boxes | Test
			_cache.$filterUl.find('.js-filter-checkbox').removeAttr('disabled');


			// Now if all the Retailers entries are empty, then Hide heading 'Authorized Retailers'
			if ($('.js-retailer-list li:visible').length <= 0) {
				_cache.$retailerUl.find('.js-heading3').hide();
			} else
				_cache.$retailerUl.find('.js-heading3').show();


			// Now if all the stores are hidden, then show msg 'No Result Found'
			if (!_cache.$boutiqueListVisibleLi.length && !_cache.$retailerListVisibleLi.length) {
				_cache.$storeObject.find('.js-no-result-msg').show();
				_cache.$storeObject.find('.js-view-button').hide();
			} else {
				_cache.$storeObject.find('.js-no-result-msg').hide();
				_cache.$storeObject.find('.js-view-button').show();
			}

			// Apply ShowHideFix to balance out The number of count of stores that are being displayed at any point of time.
			_showHideFix(tagsToDisplay);
			_cache.$boutiqueUl.removeLoader();


			rCount = tagsToDisplay.length;
			// Now if Total Store count is less than Show more count then HIDE SHOW MORE BUTTON
			if (rCount > showMoreCount) {
				_cache.$storeList.find('.js-view-button').show();
			} else
				_cache.$storeList.find('.js-view-button').hide();
		},


		/*
          @private method : To display Popup Box for Website Redirect on selecting country of residence
          @param : redirectUrl will be the Url on which the site will be redirected when OK button is clicked on confirm Popup 
        */

		_socialEmailAjaxCallBack = function() {
			_cache.$socialEmailForm.confirmBox();
			_cache.$socialEmailForm.data('plugin_confirmBox').popupInitialize({
					'title': _objPropertiesMsg.messageSentSuccess1,
					// 'message': _objPropertiesMsg.messageSentSuccess1,
					'buttons': {
						'ok': {
							'buttonName': _objPropertiesMsg.okButton,
							'href': '#',
							'class': 'cta-button cta-button__inner cta--red'

						}
					}
				},
				_cache.$socialEmailForm.data('plugin_confirmBox').confirmHide

			);
		},



		/*
          @private method : Event binding on the submit 
          @param : form name and from path
        */
		_socialEmailSubmit = function(formName, formPath) {

			formName.find('button[type="submit"]').on('click', {
				fname: formName,
				fpath: formPath
			}, _socialEmailSubmitHandler);
		},



		/*
          @private method : Click handler for click on the submit button of the form
          @param : none
        */

		_socialEmailSubmitHandler = function(e) {

			var formName = _cache.$socialEmailForm,
				formPath = _objPropertiesPth.socialEmailForm;

			e.preventDefault();

			$(this).before('<div class="loaderDiv">' + '' + '</div>');
			$('.loaderDiv').addLoader();

			_sendPostRequest('json', $(this).closest('form'), formPath, function(data) {

				var parsedData = cartier.common.cartierJSONparser({
					json: data
				});

				if (data.success === true) {
					_socialEmailAjaxCallBack();
					$('.js-social-share').toggleClass('email-deployed');
					$('.js-social-share__email').parent('li').toggleClass('selected');
					$('.js-social-share__email').toggleClass('social-share__email-deployed');
					$('.js-social-share__email-form').toggle();
				}

			});

			$('.loaderDiv').removeLoader();

		},


		//--------------------------------------------------------------------------------------------------------
		//          Initialize Plugins
		//--------------------------------------------------------------------------------------------------------
		/*
          @private method : initialize Accordion of Store Locator page
          @param : none 
        */

		_initializeAccordion = function() {
			_cache.$accordionObject.makeAccordion({
				showBehaviour: true
			});
		},


		/*
          @private method : initialize store locator of Store Locator page
          @param : none 
        */

		_initializeStoreLocator = function() {
			_cache.$storeObject.storelocator({
				errorMsgClass2: _cache.errorMsgClass2,
				errorMsgClass3: _cache.errorMsgClass3,
				suggestionErrorClass: _cache.suggestionErrorClass,
				textForNear: _cache.$textForNear,
				textForIn: _cache.$textForIn
			});
		},


		/*
          @private method : initialize Auto-complete instances of Search Box inputs for  Store Locator page
          @param : none 
        */

		_initializeAutocomplete = function() {
			/* Autocomplete Stuff */
			var autocomplete1, autocomplete2,
				_geocodeCallback = function(setCity, setState, geoCity) {
					backDataText = geoCity;
					var geoSenderFunc = _cache.$storeObject.data('plugin_storelocator')._geocodeSender();
					_setGeoUrl(geoSenderFunc, backDataText, setCity, setState);
				},
				_geoCityCallback = function(geoCity) {
					_cache.$storeList.find('.js-GeoCity').html(geoCity);
				};

			// Fallback for bounds if not able to find bounds
			var defaultBounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(-33.8902, 151.1759),
				new google.maps.LatLng(-33.8474, 151.2631));

			//First Search box
			var firstSearchInput = document.getElementById('js-search-box-1');
			//Second Search box inside Boutique list
			var secondSearchInput = document.getElementById('js-search-box-2');


			var options = {
				bounds: defaultBounds,
				types: ['geocode']
			};

			//Adding Autocomplete on the input box with option fields

			//Autocomplete for the First input box
			autocomplete1 = new google.maps.places.Autocomplete(firstSearchInput, options);
			//Autocomplete for the Second (inside boutique list)input box changes
			autocomplete2 = new google.maps.places.Autocomplete(secondSearchInput, options);

			//Listener to call geocodeIt whenever the First input box changes
			google.maps.event.addListener(autocomplete1, 'place_changed', function() {
				_cache.$storeObject.data('plugin_storelocator')
					._geocodeMe(autocomplete1, null, _geocodeCallback, _geoCityCallback, false);
				_cache.$searchBox2.val('' + _cache.$searchBox1.val() + '');
				$.cookie('backButtonCase', 'ser', {
					path: '/'
				});
			});
			//Listener to call geocodeIt whenever the Second (inside boutique list)input box changes
			google.maps.event.addListener(autocomplete2, 'place_changed', function() {
				_cache.$storeObject.data('plugin_storelocator')
					._geocodeMe(autocomplete2, null, _geocodeCallback, _geoCityCallback, false);
				_cache.$searchBox2.val('' + _cache.$searchBox2.val() + '');
				$.cookie('backButtonCase', 'ser', {
					path: '/'
				});
			});
		},



		//--------------------------------------------------------------------------------------------------------
		//         Other Business Logic Functions
		//--------------------------------------------------------------------------------------------------------



		/*
          @private method : Map link fix on 'Show On Map button' to open The store location on Native map app in iOS/Android
          @param : none 
        */
		_mapLinkFix = function() {

			switch ($.browser.device) {

				case 'safari' || 'iphone':
					$('.show-map,.js-showmaplink').each(function() {
						var text = $(this).attr('href').replace(/\(.*?\)/g, '');
						text = text.replace('http://maps.google.com/?q=', 'http://maps.apple.com/?q=');
						text = encodeURI(text);

						$(this).attr('href', text);

					});
					break;

				default:
					$('.show-map').each(function() {
						var text = $(this).attr('href');
						text = text.replace('http://maps.google.com/?q=', 'geo:0,0?q=');
						text = encodeURI(text);

						$(this).attr('href', text);
					});

			}

		},


		/*
          @private method : _showHideFix : Show Hide Fix for Adjusting Hidden stores while changing filters and show more
          @param : none
        */


		_showHideFix = function(tagsToDisplay) {

			var showMoreCount = _cache.$storeList.data('show-more-count'),
				k = 0;

			if (tagsToDisplay) {
				for (k = 0; k < tagsToDisplay.length; k++) {
					if (k < showMoreCount) {
						$(tagsToDisplay[k]).removeClass('js-hide-content');
					} else {
						$(tagsToDisplay[k]).addClass('js-hide-content');
					}
				}
			}

			if (_cache.$findStoreDetail.hasClass('js-no-display') === false) {
				_cache.$findStoreDetail.addClass('js-hide-content');
				for (k = 0; k < showMoreCount; k++) {
					var liObject = $(_cache.$findStoreDetail[k]);
					liObject.removeClass('js-hide-content');
				}
			}
		},

		/*
          @private method: _setGeoUrl function for setting the Geocoded Url in storelocator.js and then call _storelocatorAjaxCallHandler.it is called in storelocator.js
          @param : GUrl is the url that needs to be send in the ajax call
        */
		_setGeoUrl = function(GUrl, backDataText, setCity, setState) {

			var separators = ['&'];
			var justSearchAddr = backDataText.split(new RegExp(separators.join('|'), 'g'));

			justSearchAddr = justSearchAddr[0];

			//To call the _storelocatorAjaxCallhandler is the Geocoding is success and the returned GeoUrl isn't empty
			GUrl !== '' && _storelocatorAjaxCallHandler(GUrl, justSearchAddr, setCity, setState);
			//To hide the First Page Search Box
			_cache.$storeSearchWrapper.hide();
			//To show the Store List after The ajax call is successful
			_cache.$storeList.show();
		},

		/*
          @private method: _suggestionAjaxCaller function for geocode is called in storelocator.js
          @param : GUrl is the URL that needs to be send in the Ajax call
        */
		_suggestionAjaxCaller = function(suggestAddr) {
			_cacheObjects();
			var suggestAddr = $(this).text();

			var _geocodeCallback = function(setCity, setState, geoCity) {
				var geoSenderFunc = _cache.$storeObject.data('plugin_storelocator')._geocodeSender();
				_setGeoUrl(geoSenderFunc, suggestAddr, setCity, setState);
			},
				_geoCityCallback = function(geoCity) {
					_cache.$storeList.find('.js-GeoCity').html(geoCity);
				};

			_cache.$storeObject.data('plugin_storelocator')
				._geocodeMe(suggestAddr, null, _geocodeCallback, _geoCityCallback, true);
			_cache.$searchBox2.val(suggestAddr);
		},
		/*
          @private method: _checkBackData function for the Search Term as a cookie.
          @param : none
        */
		_checkBackData = function() {

			$.removeCookie('isBackLink', {
				path: '/'
			});
			var _geocodeCallback = function(setCity, setState, geoCity) {
				var geoSenderFunc = _cache.$storeObject.data('plugin_storelocator')._geocodeSender();
				_setGeoUrl(geoSenderFunc, backDataText, setCity, setState);
			},
				_geoCityCallback = function(geoCity) {
					_cache.$storeList.find('.js-GeoCity').html(geoCity);
				};

			var backData = $.cookie('backButtonText'),
				separators = ['&'],
				justSearchAddr = backData.split(new RegExp(separators.join('|'), 'g'));
			justSearchAddr = justSearchAddr[0];

			backDataText = justSearchAddr;
			_cache.$storeObject.data('plugin_storelocator')
				._geocodeMe(justSearchAddr, null, _geocodeCallback, _geoCityCallback, false);

		},

		/*
          @private method: _changebackButtonText function to Extract Previous Search Term as a cookie.
          					And Add it to the back button text
          @param : none
        */
		_changebackButtonText = function() {

			var backDataText = $.cookie('backButtonText'),
				storelocatorUrl;
			if (typeof backDataText === "undefined") {
				backDataText = '';
			}
			var separators = ['&'];
			var tokens = backDataText.split(new RegExp(separators.join('|'), 'g'));
			backDataText = tokens[0];
			storelocatorUrl = tokens[1];

			_cache.$backButtonBoutiqueAnchor.attr('href', storelocatorUrl);
			_cache.$backButtonBoutiqueAnchorText.html(backDataText);
		},



		/*
        	@private method : send Ajax call, appends the data to the description
        	@param : none 
    	*/

		_sendPostRequest = function(datatype, $form, link, callback) {

			var objXHR = cartier.ajaxWrapper.getXhrObj({
				type: 'POST',
				url: link,
				data: $form.serialize(),
				dataType: datatype,
				contentType: 'application/x-www-form-urlencoded',
				//errorDiv : $("#errorZone"),
				beforeSend: function(jqXHR) {
					if (!$form.valid()) {
						jqXHR.abort();
					}
					// return false to cancel submit 
				}
			});
			if (objXHR) {
				objXHR.done(function(data) {
					// handle failure
					if (typeof data.success !== 'undefined' && !data.success) {

					} else { // handle success
						callback(data);
					}
				});
			}
			return false;
		};



	//--------------------------------------------------------------------------------------------------------
	//          Public functions
	//--------------------------------------------------------------------------------------------------------



	/*
    @pubic method : initialize the module
    */
	boutique.init = function() {


		_objPropertiesPth = cartier.properties.paths;
		_objPropertiesMsg = cartier.properties.messages;

		if (_cache.$filterCheckbox) {
			_cache.$filterCheckbox.removeAttr('disabled');
		}

		// caching the jquery objects
		_cacheObjects();

		_bindEvents();

		if($('.js-pre-registration').length <= 0)
		_initializeAccordion();

		if (_cache.$GeolocateButton.length) {
			_initializeStoreLocator();
			_initializeAutocomplete();
		}

		if (_cache.$storeObject.length && $.cookie('backButtonText') && $.cookie('isBackLink')) {

			if ($.jStorage.get('backButtonCase') === 'ser' || $.cookie('backButtonCase') === 'ser') {
				_checkBackData();
			} else if ($.jStorage.get('backButtonCase') === 'geo' || $.cookie('backButtonCase') === 'geo') {
				setTimeout(function() {
					$('.js-geolocateButton').trigger('click');
				}, 100);
				$.removeCookie('isBackLink', {
					path: '/'
				});
			} else {

			}
		}

		if (_cache.$boutiqueDetailPage.length > 0) {
			_changebackButtonText();

		}

		if ($('.js-social-share__email-form').length) {
			cartier.formValidationWrapper.init();
			_socialEmailSubmit(_cache.$socialEmailForm, _objPropertiesPth.addressSubmit);
		}

		// For Fixing Shop On Max URL on the Basis of the Device Store locator in opened.
		if ($('.js-showmaplink').length) {
			_mapLinkFix();
		}


	};

}(window, jQuery, cartier.boutique));