/*
* cartier.ecsPayment.js
* This file contains functionalities handling the ECS Payment module
*
* @project   cartier Desktop
* @date      2014-09-20
* @author    Sapient 
 * @licensor  cartier Desktop
* @site      cartier Desktop
   @dependency cartier.core.js
* @ NOTE:
    This file has the following sequence of the actions
    1) Declare all the private variables
    2) caching jquery wrapper objects and messages
    $last) call to init() method
*/
(function(window, $, ecsPayment, undefined) {

    var currentpageData,
        currentpageUrl,
        _cache = {},

    /*
        @private method : caching jquery objects 
        @param : none 
    */
    _cacheObjects = function() {
        _cache = {
            $paynowButton: $('#paynow')
        };
    },
    
    /*
        @private method : bind events
        @param : none
    */
    _bindEvent = function() {
        /*
            Onclick bind event for pay now event
        */
         _cache.$paynowButton.on('click', _payNow);
    },
    _addValidation = function() {
        var paymentCardType = $("input[name='payment_card_number']");
        if (paymentCardType.length) {
                paymentCardType.rules("add", {
                required: true,
                creditcard: true,
                cardTypeMatch: true,
                cardNumberLength: true
            });         
        }
    },

    _payNow = function(){
        currentpageData="frontStatus=012&savNumber=11047642&swseCustomerNumber=1236228&billingRequestNumber=21588838";
        currentpageUrl="/content/car/langmaster/global/en/services/my-cartier/repair-service-config/ROStatusPage1/jcr:content.payment.html";
        _dataLoadPost(currentpageUrl, _payNowSuccess, currentpageData);
    },

    _payNowSuccess = function(result){
        result = $.parseJSON(result);
        window.location.href = window.location.origin + result.content.url;
    },

    _dataLoadPost = function(url, action, formdata) {
        var objXHR = cartier.ajaxWrapper.getXhrObj({
                type: 'POST',
                url: url,
                data:formdata,
                dataType: 'html',
                contentType: "application/x-www-form-urlencoded",
            });

        if (objXHR) {
            objXHR.done(function(data) {
                action(data);
            });
        }
    };

     /*
        @pubic method : initailize the module
     */
     ecsPayment.init = function() {
         _addValidation();
         /* code for payment page CARE-6082 */
            $('#payment_card_number').val('');
            $('#payment_card_cvv').val('');
        /* code for payment page CARE-6082 */

    };

}(window, jQuery, cartier.ecsPayment));
