/*!
 * date.picker.js
 * This file contains plugins for date month year selector
 *
 * @project   cartier mobile
 * @date      2014-01-21
 * @author    SapientNitro
 * @licensor  cartier mobile
 * @site      cartier mobile
 * USAGE :
 * 
 * Initialize date picker Plugin with pluginName "date_picker".
    date_picker();

 * This contains three variables for Date , Month and Year
 */
;
(function($, window, document, undefined) {
	'use strict';

	//check if jquery is defined, else retun
	if ($ === undefined) {
		//console.log("jQuery not found");
		return false;
	}
	/*
        setting default parameter
    */
	var pluginName = "date_picker",
		defaults = {
			startYear: 1991,
			endYear: 2016,
			validationRequired : false,


			// storing class name in variable
			styleClass: {
				dateSelector: ".js-date select",
				monthSelector: ".js-month select",
				yearSelector: ".js-year select"

			}


		},
		pageLoading = true,
		validationRequired;

	function Plugin(element, options) {

		this.element = element;
		this.$elem = $(this.element);
		this.options = $.extend({}, defaults, options);
		validationRequired = this.options.validationRequired;

		this.init();
	}

	Plugin.prototype = {

		//Settings the initial system
		init: function() {
			this.getingDomElement();
		},

		/*
          @public  method   : binding change event to year month dropdown
          @param :dateElement- point date object in dom,
                  monthElement-point month object in dom,
                  yearElement -point year  object in dom
        */
		bindEvent: function(dateElement, monthElement, yearElement) {
			monthElement.on("change", {
				date: dateElement,
				month: monthElement,
				year: yearElement,
				prototypeRef: this.__proto__
			}, this._changeHandler);
			yearElement.on("change", {
				date: dateElement,
				month: monthElement,
				year: yearElement,
				prototypeRef: this.__proto__
			}, this._changeHandler);
		},

		/*
          @public  method   : getting element from DOM
          @param :none
        */
		getingDomElement: function() {
			var datePicker = this.$elem;
			var $children = datePicker.children();


			this.date = $children.children(this.options.styleClass.dateSelector);
			this.month = $children.children(this.options.styleClass.monthSelector);
			this.year = $children.children(this.options.styleClass.yearSelector);

			this.bindEvent(this.date, this.month, this.year)
			this.addYear(this.date, this.month, this.year);
		},
		/*
          @public  method   : seting the no of day in date object acording month and year
          @param :dateElement- point date object in dom,
                  monthElement-point month object in dom,
                  yearElement -point year  object in dom
        */
		setDate: function(dateElement, monthElement, yearElement) {


			var year = yearElement.val(),
				month = monthElement.val(),
				selecteDate = parseInt(dateElement.data('selecteddate')) ? parseInt(dateElement.data('selecteddate')) : 0,
				existingSelectedDate = selecteDate;

			// cache selected date if page loading is false
			if (dateElement.find('option').length > 0) {
				existingSelectedDate = parseInt(dateElement.val()) ? parseInt(dateElement.val()) : selecteDate;
			}
			if (existingSelectedDate < 10 && existingSelectedDate > 0)
				existingSelectedDate = '0' + existingSelectedDate;


			var monthStatrt = 1,
				monhthEnd;
			if (month === 'feb' || month === '1' || month === '01') {
				if (year % 4 === 0) {

					monhthEnd = 29;
				} else {
					monhthEnd = 28;

				}

			} else {
				if (month === "jan" || month === "mar" || month === "may" || month === "july" || month === "aug" || month === "oct" || month === "dec") {
					monhthEnd = 31;

				} else if (month === "0" || month === "2" || month === "4" || month === "6" || month === "7" || month === "9" || month === "11") {
					monhthEnd = 31;

				} else if (month === "00" || month === "02" || month === "04" || month === "06" || month === "07" || month === "09" || month === "11") {
					monhthEnd = 31;

				} else {
					monhthEnd = 30;
				}
			}
			dateElement.empty();
			dateElement.append('<option value="-1" selected="selected"> Day</option>');
			for (var i = monthStatrt; i <= monhthEnd; i++) {
				if (i < 10) {
					if (pageLoading === true && selecteDate === i) {
						pageLoading = false;
						dateElement.append('<option value="' + "0" + i + '" selected="selected">' + "0" + i + '</option>');
					} else {
						dateElement.append('<option value="' + "0" + i + '" >' + "0" + i + '</option>');
					}
				} else {
					if (pageLoading === true && selecteDate === i) {
						pageLoading = false;
						dateElement.append('<option value="' + i + '" selected="selected">' + i + '</option>');
					} else {
						dateElement.append('<option value="' + i + '">' + i + ' </option>');
					}
				}


			}
			// check select date exist in calender
			if (existingSelectedDate > monhthEnd) {
				existingSelectedDate = monhthEnd;
			}
			if (existingSelectedDate !== 0) {
				dateElement.val(existingSelectedDate);
			}

			if(validationRequired && monthElement.lenght > 0){
				monthElement.closest('form').validate();
                monthElement.valid();

            }

		},
		/*
          @public  method   : setting the year according the "data-startYear" and "data-endYear" variables
          @param :dateElement- point date object in dom,
                  monthElement-point month object in dom,
                  yearElement -point year  object in dom
        */
		addYear: function(dateElement, monthElement, yearElement) {


			var prototype = this.__proto__,
				startYear = parseInt(yearElement.data("startyear")),
				endYear = parseInt(yearElement.data("endyear")),
				yearFromDataAtirbute = true,
				strOptionTag = "";

			if (isNaN(startYear)) {
				yearFromDataAtirbute = false;

			}
			if (isNaN(endYear)) {
				yearFromDataAtirbute = false;
			}


			if (yearFromDataAtirbute == true) {
				yearElement.empty();
				strOptionTag += '<option value="-1"> Year </option>';
				for (var i = startYear; i <= endYear; i++) {
					strOptionTag += '<option value="' + i + '">' + i + '</option>';

				}
				yearElement.append(strOptionTag);
			}



			this.setDate(dateElement, monthElement, yearElement);

		},

		_changeHandler: function(event) {
			event.data.prototypeRef.setDate(event.data.date, event.data.month, event.data.year);
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