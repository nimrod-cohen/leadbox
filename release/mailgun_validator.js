//
// Mailgun Address Validation Plugin
//
// Attaching to a form:
//
//    $('jquery_selector').mailgun_validator({
//        api_key: 'api-key',
//        in_progress: in_progress_callback, // called when request is made to validator
//        success: success_callback,         // called when validator has returned
//        error: validation_error,           // called when an error reaching the validator has occured
//    });
//
//
// Sample JSON in success callback:
//
//  {
//      "is_valid": true,
//      "parts": {
//          "local_part": "john.smith@example.com",
//          "domain": "example.com",
//          "display_name": ""
//      },
//      "address": "john.smith@example.com",
//      "did_you_mean": null
//  }
//
// More API details: https://api.mailgun.net/v2/address
//

function run_validator(address_text, options) {
    // don't run validator without input
    if (!address_text) {
        return;
    }

    // length check
    if (address_text.length > 512) {
        error_message = 'Stream exceeds maxiumum allowable length of 512.';
        if (options && options.error) {
            options.error(error_message);
        }
        else {
            console.log(error_message);
        }
        return;
    }

    // validator is in progress
    if (options && options.in_progress) {
        options.in_progress();
    }

    // require api key
    if (options && options.api_key == undefined) {
        console.log('Please pass in api_key to mailgun_validator.')
    }

    var responded = false;

    // make ajax call to get validation results
    jQuery.ajax({
        type: "GET",
        url: 'https://api.mailgun.net/v2/address/validate?callback=?',
        data: { address: address_text, api_key: options.api_key },
        dataType: "jsonp",
        crossDomain: true,
        success: function(data, status_text) {
            if(responded)
                return;
            responded = true;

            if (options && options.success) {
                options.success(data);
            }
        },
        error: function(request, status_text, error) {
            if(responded)
                return;
            responded = true;

            error_message = 'Error occurred, unable to validate address.';

            if (options && options.error) {
                options.error(error_message);
            }
            else {
                console.log(error_message);
            }
        }
    });

    // timeout incase of some kind of internal server error
    setTimeout(function() {
        if(responded)
            return;
        responded = true;

        error_message = 'Error occurred, unable to validate address.';
        if (options && options.error) {
            options.error(error_message);
        }
        else {
            console.log(error_message);
        }
    }, 3000);

}
