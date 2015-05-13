/*
 * ajax.caller.js
 * This file contains functionalities handling the Storelocator and Boutique Pages
 *
 * @project   Richemont
 * @date      2014-05-29
 * @author    Sapient 
   @dependency none
 * @ NOTE:
    This file has the following sequence of the actions
    1) This file has public functions that will be called Declare all the private variables
    2) caching jquery wrapper objects and messages
    $last) call to init() method
 */

var RICHEMONT = RICHEMONT || {};
RICHEMONT.AjaxCaller = RICHEMONT.AjaxCaller = {};
RICHEMONT.AjaxWrapper = RICHEMONT.AjaxWrapper = {};

;(function(window, $, AjaxCaller, undefined) { 

      //this will cause the browser to check for errors more aggressively
    'use strict';

    //check if jquery is defined, else retun
    if ($ === undefined) {
        //console.log('jQuery not found');
        return false;
    }

   
    /*
      @public method : setting up the ajax setting options 
      @param : objCustomOption 
    */
    AjaxCaller.setAjaxOptions = function(objCustomOption){ 

        // local varaible for each call
        var objDefaultOption = {

        'callType': 'formType',
        'actionName': '',
        'currentPagePath': '',
        'eventName': '',
        'elementId': '',
        'ajaxData':'',
        'dataType': 'json',
        'actionType':'POST',
        'parameters':''

        };
        // TODO :  if this binding can be moved to document.ready function
      _bindEvents($.extend({}, objDefaultOption, objCustomOption));


    };

    /*
      @private method : setting up the ajax setting options 
      @param : ajaxOptions 
    */
    var _bindEvents = function(ajaxOptions) {
   $("#" +ajaxOptions.elementId).on(ajaxOptions.eventName,{ajaxOptions : ajaxOptions}, _ajaxCallerHandler);

  };
    /*
      @private method : handle events on the form or field or composite fields 
      @param : ajaxOptions 
    */
    var _ajaxCallerHandler = function(e){ 
      e.preventDefault();

      var $this = $(this);
    var ajaxOptions = e.data.ajaxOptions;

       switch (ajaxOptions.callType) { 
        // form type
        case "formType": 
            // call validate function on form on second time (first time, it is called at end form jsp)
                    // it has to be called beacuse first time call of validate function will not apply on form
                    // Need to check if this second call can be removed
                       if ((typeof rulesObjects !== 'undefined') && ( typeof messagesObjects !== 'undefined')){
                            $(this).validate({rules: rulesObjects, messages: messagesObjects});
                       }
                  // serialize the form data
                         ajaxOptions.ajaxData = $("#" + ajaxOptions.elementId).serialize().replace("formstart","");
                         // bind the submit event
                        break;
        // single field type
        case "fieldType":  
                        // bind the field with given event

                      ajaxOptions.ajaxData = ajaxOptions.elementId+"="+$("#" + ajaxOptions.elementId).val();
                        break;
        // composite fields type
        case "compositeType":  
                        // TODO: Implementation to create the dynamic string
                          var parameters_array = ajaxOptions.parameters.split(',');
                            var queryString="";
                            for(var i = 0; i < parameters_array.length; i++) {
                if(document.getElementById(parameters_array[i]) !== null && document.getElementById(parameters_array[i]).value !== ""){
                  queryString = queryString + parameters_array[i]+"="+document.getElementById(parameters_array[i]).value +"&";
                }
                            }
                            queryString = queryString.substring(0,queryString.length - 1);
                    ajaxOptions.ajaxData = "formid="+ajaxOptions.elementId+"&"+queryString;

                        break;

                }
    
    // call the ajax method
        var objXHR = RICHEMONT.AjaxWrapper.getXhrObj({
                type: ajaxOptions.actionType,
                url: "/cms-base/richemont/form/actionController?actionName="+ajaxOptions.actionName+"&currentPagePath="+ajaxOptions.currentPagePath,
                data: ajaxOptions.ajaxData,
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded',
                ajaxCallback : _getCallbackFun(ajaxOptions.actionName), // pass the maison specific callback function
                beforeSend: function(jqXHR) {
                    if (ajaxOptions.callType==="formType" && !$("#" + ajaxOptions.elementId).valid()) {
                       jqXHR.abort();
                    }
                    // return false to cancel submit 
                },
            });



    };
    /*
      @private method : handle events on the form or field or composite fields 
      @param : ajaxOptions 
    */
    var _getCallbackFun = function(actionName){
        return AjaxCaller.listOfCallbackFun[actionName];

    }

    //var global varaible to set callback functions and this object will be used in the maison specific modules
    AjaxCaller.listOfCallbackFun = {};

    /*
      @public method : add the callback functions to the global object
      @param : ajaxOptions 
    */
    AjaxCaller.init = function(){

         for( var i = 0,len = RICHEMONT.listOfCallbackFun.actions.length ; i < len ; i++){
            // console.log(RICHEMONT.listOfCallbackFun.actions[i].actionName);

                AjaxCaller.listOfCallbackFun[RICHEMONT.listOfCallbackFun.actions[i].actionName] = function(){};


            }

    }



}(window, jQuery, RICHEMONT.AjaxCaller));







