$(document).ready(function () {

    // toastr.options.timeOut = 2000;
    // toastr.options.closeButton = true;
    // toastr.options.positionClass = "toast-top-center";

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#razorpay_btn').click(function (e) {

        e.preventDefault();
        if(validate_address()== 0)
        {
            toastr.options = {
                "positionClass": "toast-top-right",
                "closeButton": true
            };
            toastr.error('Please Fill All detail Correctly');
            return;
        }
        if(validate_address()== 1)
        {
            var is_shipping_same_as_billing = 1;
            if ($('#ship').is(':checked')){
                is_shipping_same_as_billing = 0;
            }
            var mode=$('input[name="payment_mode"]:checked').val();;            
            var order_note =  $('#order_message').val();
            if(is_shipping_same_as_billing){

                var billing_first_name = $('#billing_first_name').val();
                var billing_last_name = $('#billing_last_name').val();
                var billing_email = $('#billing_email').val();
                var billing_mobile = $('#billing_mobile').val();
                var billing_address1 = $('#billing_address1').val();
                var billing_address2= $('#billing_address2').val();
                var billing_country  = $('#billing_country').val();
                var billing_city = $('#billing_city').val();
                var billing_state = $('#billing_state').val();
                var billing_zip_code =$('#billing_zip_code').val();
                var shipping_first_name =   billing_first_name;
                var shipping_last_name =  billing_last_name;
                var shipping_email  =  billing_email;
                var shipping_mobile  = billing_mobile;
                var shipping_address1 =  billing_address1;
                var shipping_address2 =  billing_address2;
                var shipping_country=  billing_country;
                var shipping_city =  billing_city;
                var shipping_state =  billing_state;
                var shipping_zip_code =  billing_zip_code;
            }else{
                //shipping detail
                var shipping_first_name = $('#shipping_first_name').val();
                var shipping_last_name = $('#shipping_last_name').val();
                var shipping_email = $('#shipping_email').val();
                var shipping_mobile = $('#shipping_mobile').val();
                var shipping_address1 = $('#shipping_address1').val();
                var shipping_address2 = $('#shipping_address2').val();
                var shipping_country  = $('#shipping_country').val();
                var shipping_city = $('#shipping_city').val();
                var shipping_state = $('#shipping_state').val();
                var shipping_zip_code =$('#shipping_zip_code').val();
                //Billing detail
                var billing_first_name = $('#billing_first_name').val();
                var billing_last_name = $('#billing_last_name').val();
                var billing_email = $('#billing_email').val();
                var billing_mobile = $('#billing_mobile').val();
                var billing_address1 = $('#billing_address1').val();
                var billing_address2 = $('#billing_address2').val();
                var billing_country  = $('#billing_country').val();
                var billing_city = $('#billing_city').val();
                var billing_state = $('#billing_state').val();
                var billing_zip_code =$('#billing_zip_code').val();

            }


            $('.processing').removeClass('d-none');
            $('.preprocessing').addClass('d-none')
            $('#razorpay_btn').attr("disabled", true);


            var data = {
            "_token": $('#token').val(),
            "shipping_first_name" : shipping_first_name,
            "shipping_last_name" : shipping_last_name,
            "shipping_email" : shipping_email,
            "shipping_mobile" : shipping_mobile,
            "shipping_address1" : shipping_address1,
            "shipping_address2" : shipping_address2,
            "shipping_country" : shipping_country,
            "shipping_city" : shipping_city,
            "shipping_state" : shipping_state,
            "shipping_zip_code" : shipping_zip_code,
            //Billing detail
            "billing_first_name" : billing_first_name,
            "billing_last_name" : billing_last_name,
            "billing_email" : billing_email,
            "billing_mobile" : billing_mobile,
            "billing_address1" : billing_address1,
            "billing_address2" : billing_address2,
            "billing_country" : billing_country,
            "billing_city" : billing_city,
            "billing_state" : billing_state,
            "billing_zip_code" : billing_zip_code,
            "is_shipping_same_as_billing" : is_shipping_same_as_billing,
            "mode" : mode,
            "order_note" : order_note,
            "currency" : currancy,

            };//end data
            if(mode=='prepaid'){

                $.ajax({
                    type: "POST",
                    url: checkAmountUrl,
                    data: data,
                    dataType: "JSON",
                    success: function (response) {
                        if(response.status==0){

                            toastr.error('Seems Something went wrong!');

                        }else{

                            var rp_order_id = response.rp_order_id;
                            var amount = response.amount;
                            var key = response.key;
                            var receipt_id = response.receipt_no;
                            var options = {
                                "key": key,
                                "amount": amount,
                                "name" : response.brand_name,
                                "description" : "Paid for Purchase on "+response.brand_name,
                                "image" : logourl,
                                "order_id" : response.rp_order_id,
                                "handler": function (rp_response){

                                    var order_data ={

                                        "_token": $('#token').val(),
                                        'razorpay_payment_id' : rp_response.razorpay_payment_id,
                                        'razorpay_order_id' : rp_response.razorpay_order_id,
                                        'razorpay_signature' : rp_response.razorpay_signature,
                                        "rp_order_id" : rp_order_id,
                                        'receipt' : receipt_id,//database Order Id
                                        'currency' : rp_response.currency,
                                        'amount' : amount,

                                    };
                                    //ajax to Confirm
                                    $.ajax({
                                        type: "GET",
                                        url: varifyPaymentStatus,
                                        data: order_data,
                                        success: function (ps_response) {
                                            if(ps_response.status=='1'){

                                                toastr.success('Your payment has been successful!');
                                                //window.location='/thank-you/'+ps_response.order_id;
                                                window.location = orderSuccessUrl;

                                            }else{

                                                toastr.error('Seems Something went wrong! Please Retry');
                                            }

                                        }
                                    });
                                },//end handler
                                "prefill": {
                                    "name": billing_first_name+' '+billing_last_name,
                                    "email": billing_email,
                                    "contact": billing_mobile,
                                },
                                "theme": {
                                    "color": "#3399cc"
                                }
                            };//end option
                            var rzp1 = new Razorpay(options);
                            rzp1.open();
                            e.preventDefault();
                        }//end else
                    }//end sucess
                });//end ajax check amount
            }//end prepaid if
            else{

            $.ajax({
                type: "post",
                url: storePostpaidUrl,
                data: data,
                dataType: "JSON",
                success: function (response) {
                    if(response.status == 1){

                        toastr.success('Your Order has been successfully placed!');
                        window.location = orderSuccessUrl;

                    }else{

                        toastr.error('Seems Something went wrong! Please Retry');
                    }
                }
            });

            }//end prepaid else
        }

    });//end rp button click

    function validate_address(){

        var  validated=0;


        if ($('#ship').is(':checked')){
            if($('#billing_first_name').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing First Name Is Required');
            }else{
                validated=1;
            }
            if($('#billing_last_name').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Last Name Is Required');
            }else{
                validated=1;
            }
            if($('#billing_mobile').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Mobile No. Is Required');
            }else{
                validated=1;
            }
            if($('#billing_email').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Email Is Required');
            }else{
                validated=1;
            }
            if($('#billing_address1').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Address Is Required');
            }else{
                validated=1;
            }
            if($('#billing_city').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing City Is Required');
            }else{
                validated=1;
            }
            if($('#billing_state').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing State Is Required');
            }else{
                validated=1;
            }
            if($('#billing_country').val() == ""){
                validated=0;
            }else{
                validated=1;
            }
            if($('#billing_zip_code').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Zipcode/Postal Code Is Required');
            }else{
                validated=1;
            }
            if($('#shipping_first_name').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping First Name Is Required');
            }else{
                validated=1;
            }
            if($('#shipping_last_name').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping Last Name Is Required');
            }else{

                validated=1;

            }
            if($('#shipping_email').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping Email Is Required');
            }else{

                validated=1;

            }
            if($('#shipping_mobile').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping Phone No. Is Required');
            }else{

                validated=1;

            }
            if($('#shipping_address1').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping Address Is Required');
            }else{

                validated=1;

            }
            if($('#shipping_country').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping Country Is Required');
            }else{

                validated=1;

            }
            if($('#shipping_city').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping City Is Required');
            }else{

                validated=1;

            }
            if($('#shipping_state').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping State Is Required');
            }else{

                validated=1;

            }
            if($('#shipping_zip_code').val() == "")
            {
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Shipping Zipcode / Postal Is Required');
            }else{

                validated=1;

            }
        }else{

            if($('#billing_first_name').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing First Name Is Required');
            }else{
                validated=1;
            }
            if($('#billing_last_name').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Last Name Is Required');
            }else{
                validated=1;
            }
            if($('#billing_mobile').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Mobile No. Is Required');
            }else{
                validated=1;
            }
            if($('#billing_email').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Email Is Required');
            }else{
                validated=1;
            }
            if($('#billing_address1').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Address Is Required');
            }else{
                validated=1;
            }
            if($('#billing_city').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing City Is Required');
            }else{
                validated=1;
            }
            if($('#billing_state').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing State Is Required');
            }else{
                validated=1;
            }
            if($('#billing_country').val() == ""){
                validated=0;
            }else{
                validated=1;
            }
            if($('#billing_zip_code').val() == ""){
                validated=0;
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "closeButton": true
                }
                toastr.error('Billing Zipcode/Postal Code Is Required');
            }else{
                validated=1;
            }
            
        }
        return  validated;
    }


});//end jqdocReady
