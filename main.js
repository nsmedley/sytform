$(function () {

    detailsProgressiveDisclosure();
    //timeZoneDetect();
    timeZoneManual();
    welcomeCallCalendar();
    formValidation();
});


function detailsProgressiveDisclosure() {

    $('.detailsForm__btn--manual').click(function () {
        $('.detailsFormField--hidden').slideDown(500);
        $('.detailsForm__seperator--hidden').slideDown(500);
        $('.detailsForm__title--hidden').slideDown(500);
        $('.setupForm__nextBtn').removeClass('setupForm__nextBtn--inactive');
    });

};

function timeZoneDetect() {

    control.listen("populate", function (address, variations) {

        console.log('State change');
        state = $(this).val();
        console.log('State = ' + state);
        if (state.match("^AL|^AR|^IL|^IA|^KS|^KY|^LA|^MN|^MS|^MO|^NE|^ND|^OK|^TN|^TX|^WI")) {
            // CST
            $('#timezone2').prop('checked', true);
            $('.detailsFormField--radioSelected').removeClass('detailsFormField--radioSelected');
            $('#timezone2').parent().addClass('detailsFormField--radioSelected');
        } else if (state.match("^AK")) {
            // AK
            $('#timezone1').prop('checked', true);
        } else if (state.match("^AZ|^CO|^ID|^MT|^NM|^UT|^WY")) {
            // MST
            $('#timezone5').prop('checked', true);
        } else if (state.match("^CA|^NV|^OR|^WA")) {
            // PST
            $('#timezone6').prop('checked', true);
        } else if (state.match("^CT|^DE|^FL|^GA|^IN|^ME|^MD|^MA|^MI|^NH|^NJ|^NY|^NC|^OH|^PA|^RI|^SC|^VT|^VA|^WV")) {
            // EST
            $('#timezone3').prop('checked', true);
        } else if (state.match("^HI")) {
            // HST
            $('#timezone4').prop('checked', true);
        }
        console.log('Value selected');


    });


};

function timeZoneManual() {
    $('.detailsFormField--radio').click(function () {
        $('.detailsFormField--radioSelected').removeClass('detailsFormField--radioSelected');
        $(this).addClass('detailsFormField--radioSelected');
    });
}

function stepper() {
    if ($(this).data('step') === "details") {
        $('.setupForm__details').slideUp(500, function () {
            $('.setupForm__call').slideDown(300);
            $('.headerStep--step1 .headerStep__circle').removeClass('headerStep__circle--active').addClass('headerStep__circle--complete');
            $('.headerStep--step2 .headerStep__circle').addClass('headerStep__circle--active');
            $('.header__lineMarker').addClass('header__lineMarker--step2').removeClass('header__lineMarker--step1');
            $('.header__title').html('Now let’s arrange a Welcome Call between you and your Moneypenny Receptionist. We’ll hand-pick your receptionist based on what you’ve told us about your business. It’s the perfect time to get to know them and explain how you like to work and the way you’d like calls to be answered:');
        });
    } else if ($(this).data('step') === "calls") {
        $('.setupForm__call').slideUp(500, function () {
            $('.setupForm__confirmation').slideDown(300);
            $('.headerStep--step2 .headerStep__circle').removeClass('headerStep__circle--active').addClass('headerStep__circle--complete');
            $('.headerStep--step3 .headerStep__circle').addClass('headerStep__circle--active');
            $('.header__lineMarker').addClass('header__lineMarker--step3').removeClass('header__lineMarker--step2');
            $('.header__title').html('Thank you');
        });
    }
}

function welcomeCallCalendar() {
    $(".calendar").datepicker({
        firstDay: 1,
        beforeShowDay: $.datepicker.noWeekends,
        dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    });
}

function formValidation() {
    $(".setupForm__nextBtn").click(function () {
        var form = $(".setupForm");

        form.validate({
            debug: true,
            errorElement: 'span',
            errorClass: 'detailsFormField__errorMsg',
            highlight: function (element, errorClass, validClass) {
                $(element).removeClass('detailsFormField__input--valid').addClass('detailsFormField__input--invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('detailsFormField__input--invalid').addClass('detailsFormField__input--valid');
            },
            rules: {
                name: "required",
                email: "required",
                telephone: "required",
                company: "required",
                website: "required",
                addressLine1: "required",
                addressCity: "required",
                addressState: "required",
                addressZipCode: "required"
            },
            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                telephone: "Please enter your business telephone number",
                company: "Please enter your company name",
                website: "Please eneter your website"
            }
        });

        if (form.valid() === true) {
            stepper();
        }
    });
}

function floatingLabels() {

}