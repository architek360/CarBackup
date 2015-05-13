/*!
 * storelocator.js
 * This file contains application namespace and initializing the other modules
 *
 * @project   cartier mobile
 * @date      2014-01-21
 * @author    SapientNitro
 * @licensor  cartier mobile
 * @site      cartier mobile
 *
 * USAGE : 
 *  T
 * Initialize tabs Plugin with pluginName "storelocator" to top container after Main-container"
 * While passing values for 
    errorMsgClass2,
    suggestionErrorClass,
    textForNear,
    textForIn

        initializeStoreLocator = function() {
            _cache.$storeObject.storelocator({
                errorMsgClass2: _cache.errorMsgClass2,
                suggestionErrorClass: _cache.suggestionErrorClass,
                textForNear: _cache.textForNear,
                textForIn: _cache.textForIn
            });
        },
     

     * * * * *  

    Then use the _geocodeMe function to send a Autocomplete Object or an Address String 
    and get a string with N-E-S-W Bounds of the Address String.

    NOTE: KEEP _geocodeCallback and  _geoCityCallback as 3rd and 4th arguments for _geocodeMe respectively.
          DO NOT REMOVE OR CHANGE THERE POSITIONS

    E.g..

    _cache.$storeObject.data('plugin_storelocator')._geocodeMe(autocomplete1, null, _geocodeCallback, _geoCityCallback);




 */

;
(function($, window, document, undefined) {
    'use strict';
    //check if jquery is defined, else retun
    if ($ === undefined) {
        //console.log('jQuery not found');
        return false;
    }

    var pluginName = 'storelocator',
        defaults = {
            errormsg2Class: 'js-store-locator_error-msg-2',
            errormsg3Class: 'js-store-locator_error-msg-3',
            suggestionerrorClass: 'js-store-locater__error-suggest',
            textForNear: 'near',
            textForIn: 'in'
        },
        GeoUrl = '';

    function Plugin(element, options) {


        this.element = element;
        this.$elem = $(this.element);
        this.options = $.extend({}, defaults, options);
        this.init();
        this._geocodeMe();

    }

    Plugin.prototype = {
        /*@Static  method   :   init function
          @param            :   None
        */

        init: function() {

        },
        /* END of init*/
        _geocodeSender: function() {
            return GeoUrl;
        },

        _geocodeMe: function(AutocompleteObj, GeoAddr, _geocodeCallback, _geoCityCallback, fromSuggestion) {
            var errormsg2Class = this.options.errormsg2Class,
                errormsg3Class = this.options.errormsg3Class,
                suggestionerrorClass = this.options.suggestionerrorClass,
                textForNear = this.options.textForNear,
                textForIn = this.options.textForIn,
                geoCity = '',
                isGeolocated = false,
                geocoder = new google.maps.Geocoder(),
                // Function to Geocode Searched Addr into Bounds. Returns GeoUrl using ' cartier.boutique.setGeoUrl(GeoUrl) '
                keyword,
                place,
                data,
                geoResponse,
                sw, ne,
                parameters,
                autocompleteTrue = false,
                firstSuggestionTrue = false,
                i = 0;
            if (AutocompleteObj && AutocompleteObj !== '') {
                // Get the place details from the autocomplete object.
                if (AutocompleteObj.types && AutocompleteObj.types[0] == 'geocode') {
                    place = AutocompleteObj.getPlace();
                    keyword = place.formatted_address;
                    autocompleteTrue = true;

                } else {
                    keyword = AutocompleteObj;
                }
            }

            if (GeoAddr !== null) {
                data = {
                    'address': GeoAddr
                };
                isGeolocated = true;
            } else {
                data = {
                    'address': keyword
                };
            }

            geocoder.geocode(data, function(response, status) {
                if (status == google.maps.GeocoderStatus.OK && response[0]) {
                    $('.' + errormsg2Class + '').hide();
                    $('.' + errormsg3Class + '').hide();
                    $('.' + suggestionerrorClass + '').hide();

                    if (response[1] && !autocompleteTrue && !fromSuggestion) {

                        if (response[0].formatted_address === AutocompleteObj) {
                            firstSuggestionTrue = true;

                        }
                    }

                    if (response[1] && !autocompleteTrue && !fromSuggestion && !firstSuggestionTrue && !isGeolocated) {
                        $('.' + errormsg3Class + '').hide();
                        $('.' + errormsg2Class + '').show();
                        $('.' + suggestionerrorClass + '').show();
                        $('.' + suggestionerrorClass + ' li:nth-child(1) a').text(response[0].formatted_address);
                        $('.' + suggestionerrorClass + ' li:nth-child(2) a').text(response[1].formatted_address);


                        return (null);
                    }
                    geoResponse = response[0];
                    if (geoResponse.geometry.bounds !== undefined) {
                        sw = geoResponse.geometry.bounds.getSouthWest();
                        ne = geoResponse.geometry.bounds.getNorthEast();
                    } else {
                        sw = geoResponse.geometry.viewport.getSouthWest();
                        ne = geoResponse.geometry.viewport.getNorthEast();
                    }


                    parameters = {
                        s: sw.lat(),
                        w: sw.lng(),
                        n: ne.lat(),
                        e: ne.lng()
                    };

                    var lngDiff = Math.abs(parameters.w - parameters.e);

                    if(lngDiff > 180){
                        lngDiff = 360 - lngDiff;
                    }

                    var latDiff = Math.abs(parameters.s - parameters.n);

                    if(latDiff > 90) {
                        latDiff = 180 - latDiff;
                    }

                    var center = geoResponse.geometry.location;
                    var distance = Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2)) / 2;

                    if(distance < 0.05)
                        distance = 0.05;

                    parameters.x = center.lat();
                    parameters.y = center.lng();
                    parameters.r = distance;


                    var addrCounter = 0,
                        geoResponseCity = '',
                        geoResponseState = '',
                        setCity = '',
                        setState = '';


                    $.each(geoResponse.address_components, function(index, val) {
                        if (geoResponse.address_components[index].types[0] === 'administrative_area_level_1') {
                            geoResponseState = geoResponse.address_components[index].long_name;
                        }
                        if (geoResponse.address_components[index].types[0] === 'administrative_area_level_2') {
                            geoResponseCity = geoResponse.address_components[index].long_name;
                        }
                    });

                    if ((geoResponseState || geoResponseCity) && !isGeolocated) {
                        //parameters = roundUp(parameters);
                    }


                    if (true)
                        setCity = '';
                    else
                        setCity = '/city-' + geoResponseCity;


                    if (true)
                        setState = '';
                    else
                        setState = '/state-' + geoResponseState;


                    // round up the rectangle, and later filter results


                    if (isGeolocated === true) {
                        parameters.s = Math.floor(parameters.s);
                        parameters.n = Math.ceil(parameters.n);
                        parameters.w = Math.floor(parameters.w);
                        parameters.e = Math.ceil(parameters.e);
                        setCity = '';
                        setState = '';
                    }



                    GeoUrl = '';
                    GeoUrl += '/s' + parameters.s;
                    GeoUrl += '/w' + parameters.w;
                    GeoUrl += '/n' + parameters.n;
                    GeoUrl += '/e' + parameters.e;
                    GeoUrl += '/x' + parameters.x;
                    GeoUrl += '/y' + parameters.y;
                    GeoUrl += '/r' + parameters.r;
                    GeoUrl += '.json';




                    geoCity = geoResponse.formatted_address;

                    _geocodeCallback(setCity, setState, geoCity);



                    if (isGeolocated === true) {
                        _geoCityCallback(' ' + textForNear + ' ' + geoCity);
                    } else {
                        _geoCityCallback(' ' + textForIn + ' ' + geoCity);
                    }




                    return (null);




                } else {
                    if (!AutocompleteObj && !GeoAddr) {
                        status = 'EMPTY';
                    }
                    //If The location isn't recognized by google services
                    if (status == 'ZERO_RESULTS') {
                        $('.' + errormsg2Class + '').hide();
                        $('.' + errormsg3Class + '').show();
                        $('.' + suggestionerrorClass + '').hide();


                    }
                }
            });

            /** Round up the rectangle: make a bigger rectangle with round limits,
            /* so that requests repeat more often. */
            function roundUp(p) {
                // Must detect which face of the earth we are on.
                // We are on the date line when east < west.
                // Example: s=-52.78874169508182 w=97.54270394775392 n=42.82852863934756 e=-44.48854605224608
                // rectangle covers date line, the other side of the world
                var onDateLine = p.e < p.w;
                p.s = down(-90, p.s);
                p.n = up(+90, p.n);
                if (onDateLine) {
                    p.e = down(-180, p.e);
                    p.w = up(+180, p.w);
                } else {
                    p.w = down(-180, p.w);
                    p.e = up(+180, p.e);
                }
                return p;
            };

            /** Increases x to a round number, at most limit.
             * Rounds to full 10s. */
            function up(limit, x) {
                x = x / 10;
                x = Math.ceil(x);
                x = x * 10;
                if (limit < x)
                    x = x - 10;
                return x;
            };

            /** Decreases x to a round number, at least limit.
             * Rounds to full 10s. */
            function down(limit, x) {
                x = x / 10;
                x = Math.floor(x);
                x = x * 10;
                if (x < limit)
                    x = x + 10;
                return x;
            };


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