$(document).ready(function () {

    var vRowCount = $('.variantproductsection .card').length; ;
    //init controls
    $('.shippingcostrow').hide();
    $('#color').attr('disabled', 'disabled');
    $('.attribute_value_sec').hide();
    $('.variantproductsection').hide();

    //bind state on region change 
    $('#pdt_region').change(function (e) { 
        e.preventDefault();
       
        const selected_region = $('#pdt_region').val();
        if( selected_region === "" )
        {
            return;

        }else{  

            $.ajax({
                type: "post",
                url: urlStatebyregion,
                data: {'_token' : token, 'region' : selected_region },
                dataType: "json",
                success: function (response) {
                    $('#pdt_state').html("");
                    var textjson =  JSON.stringify(response.data);
                    var collection =  JSON.parse(textjson);
                    $.each(collection, function (i, item) { 
                        $('#pdt_state').append(new Option(item.name, item.id));
                         
                    });
                }
            });
        }
        
    });

    //show hide shipping charge
    $('input[name="shipping_type"]').change(function (e) { 
        e.preventDefault();
        var shipping_type = $('input[name="shipping_type"]:checked').val();  
        switch(shipping_type) {
            case 'free' : 
                $('.shippingcostrow').hide();
            break;
            case 'flat' :
                $('.shippingcostrow').show();
            break;
            
        } 
        
    });

    //enable disable color selection
    
    $('input[name="is_color_enabled"]').change(function (e) { 

        var is_color_enabled = $('input[name="is_color_enabled"]').is(":checked");      
        if(is_color_enabled)
        {
            $('#color').removeAttr('disabled');

        }else{
            
            $('#color').attr('disabled', 'disabled');
        }      

    })

    //attribute change

    $('#pdt_attribute').change(function (e) { 
        e.preventDefault();       
        if($('#pdt_attribute').val().length>0){

            $('.attribute_value_sec').show(); 
            var attributes = $('#pdt_attribute').select2("val");
            console.log('1111 ', attributes);
            // bind_product_Attribute(attributes)
           
        }else{

            $('.attribute_value_sec').hide(); 
        }
        
    });

    //bind product attribute value to dom

    function bind_product_Attribute(selected_attributes)
    {
        $('.attribute_value_sec').empty();
        $.each( selected_attributes, function( index, value ) {
            var selected_text = $('#pdt_attribute').select2("data");
            var attribute_id = value;
            var attribute_name = selected_text[index].text;          
            // bind_attribute_values(attribute_id,attribute_name);
        });
    }

    function bind_attribute_values(attribute_id,attribute_name)
    {
      var template = `<div class="mb-3 row">                                                                                                                                            
            <div class="col-md-3 bg-gray">
                <label class="col-form-label" for="">`+attribute_name+`</label>
            </div>
            <div class="col-md-8"> 
                <select class="select2 form-control select2-multiple" 
                multiple="multiple" data-placeholder="Choose `+attribute_name+`" 
                id="attribute_`+attribute_id+`"  name="attribute_`+attribute_id+`[]">
                    
                </select>
            </div>                                           
        </div>`;
        $('.attribute_value_sec').show();
        $('.attribute_value_sec').append(template);
        $('#attribute_'+attribute_id).select2();       
        $.ajax({
            type: "post",
            url: urlgetattributes,
            data: {'_token' : token , attribute_id : attribute_id },
            dataType: "json",
            success: function (response) {

                var jsontext =  JSON.stringify(response.data);
                var collection =  JSON.parse(jsontext);               
                $.each(collection, function (indexInArray, valueOfElement) {
                    var select_value =  valueOfElement.id;
                    var select_text = valueOfElement.attribute_value;
                    $('#attribute_'+attribute_id).append(new Option(select_text, select_value));
                });
                
            }
        });
    }

    $('#btAddvariant').click(function (e) {
        e.preventDefault();
        if($('#pdt_attribute').val().length<=0){
            alert('Please select at least one attribute first');
            return;
        }
        $('.variantproductsection').show();
        console.log('Before increment ', vRowCount);
        ++vRowCount;
        console.log('After increment ', vRowCount);
        var variantGrid=`
        <div class="card border shadow-none variant_grid_card_`+vRowCount+`">
            <div class="card-body">

                <div class="d-flex align-items-start border-bottom pb-3"> 
                    <div class="flex-grow-1 align-self-start overflow-hidden">
                        <div>
                            <h5 class="text-truncate font-size-16"><a href="javscript:void(0);" class="text-dark">Product Variant(`+vRowCount+`)</h5>
                    
                        </div>
                    </div>               
                    <div class="ms-2">
                        <ul class="list-inline mb-0 font-size-16">
                            <li class="list-inline-item">
                                <a href="javascript:void(0);" onClick="Delete_variant(`+vRowCount+`)" class="text-muted px-2">
                                    <i class="uil uil-trash-alt text-danger"></i>
                                </a>
                            </li>                       
                        </ul>
                    </div>
                </div>
                <div class="mt-3">
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <label class="col-form-label" for="">Color</label>
                            <input type="hidden" name="pdt_vid[]" value="">
                        </div>
                        <div class="col-md-8">
                            <select id="pdt_v_color_`+vRowCount+`" name="pdt_v_color[]" class="select2 form-control">
                            <option value="" selected >Nothing Selected</option>
                            </select>
                        </div>
                    </div>
                    <div class=" item-row`+vRowCount+`">    
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <label class="col-form-label" for="">SKU</label>
                        </div>
                        <div class="col-md-8">
                            <input type="text" class="form-control" name="pdt_v_sku[]" placeholder="SKU">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <label class="col-form-label" for="">Unit Price</label>
                        </div>                           
                        <div class="col-md-8" >
                            <input type="text" class="form-control" name="pdt_v_price[]" placeholder="MRP / Unit Price">
                        </div> 
                    </div>                    
                    <div class="row mb-3">                      
                        <div class="col-md-3 bg-gray">
                            <label class="col-form-label" for="">Stock</label>
                        </div>
                        <div class="col-md-8"> 
                            <input type="text" class="form-control" name="pdt_v_stock[]" placeholder="Stock">
                        </div>                        
                       
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-3 bg-gray">
                            <label class="col-form-label" for="">Product Image</label>
                        </div>
                        <div class="col-md-8"> 
                            <input type="file" name="pdt_v_image[]"  class="form-control" >
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        $('.variantproductsection').append(variantGrid);  
        var attributes = $('#pdt_attribute').select2("val");
        $.each( attributes, function( index, value ) {
            var selected_text = $('#pdt_attribute').select2("data"); 
            var attribute_id = value;
            var attribute_name = selected_text[index].text; 
            
            var template = ` <div class="mb-3 row">                                                                                                                                            
                <div class="col-md-3 bg-gray">
                    <label class="col-form-label" for="">`+attribute_name+`</label>
                </div>
                <div class="col-md-8"> 
                    <select class="form-control select2" 
                    data-placeholder="Choose `+attribute_name+`" 
                    id="attribute_`+attribute_id+`"  name="attribute_`+attribute_id+`[]">
                       
                    </select>
                </div>                                           
            </div>`;
            // $('.attribute_value_sec').show();
            $('.item-row'+vRowCount).append(template);
            $('.item-row'+vRowCount+' #attribute_'+attribute_id).select2();  
            //bind attribute value     
            // $.ajax({
            //     type: "post",
            //     url: urlgetattributes,
            //     data: {'_token' : token , attribute_id : attribute_id },
            //     dataType: "json",
            //     success: function (response) {

            //         var jsontext =  JSON.stringify(response.data);
            //         var collection =  JSON.parse(jsontext); 
                            
            //         $.each(collection, function (indexInArray, valueOfElement) {
            //             var select_value =  valueOfElement.id;
            //             var select_text = valueOfElement.attribute_value;
            //             $('.item-row'+vRowCount+' #attribute_'+attribute_id).append(new Option(select_text, select_value));
            //         });
                    
            //     }
            // });
        });
         //bind color for variant
         $('#pdt_v_color_'+vRowCount).select2(); 
         $.ajax({
            type: "post",
            url: urlgetColorlist,
            data: {'_token' : token },
            dataType: "json",
            success: function (response) {
                var jsontext =  JSON.stringify(response.data);
                var collection =  JSON.parse(jsontext); 
                $.each(collection, function (indexInArray, valueOfElement) {
                    var select_value =  valueOfElement.id;
                    var select_text = valueOfElement.name;
                    $('#pdt_v_color_'+vRowCount).append(new Option(select_text, select_value));
                });

            }
         });
        
    });

    

});

function Delete_variant(rowid)
{
    if(confirm("Are you sure you want to delete this?")){
        $('.variant_grid_card_'+rowid).remove();
    }else{
        return;
    }
}

function getvariantCombination(){

    var colors = $('#color').select2("val");
    var selected_color =  $('#color').select2("data");
    
    var variants = [];       
    if(colors.length>0)
    {
        $.each(selected_color, function (i, item) { 
            variants[i] = selected_color[i].text+'-';
        });

    }


    

    var variant2 =new Array();
    var size_attributevalue = $('#attribute_1').select2("data");
    if(size_attributevalue.length>0)
    {
        $.each(size_attributevalue, function (i, itemsize) { 
           
            $.each(selected_color, function (j, itemcolor) { 
                var item = {}; 
                item.variant = itemcolor.text+'-'+itemsize.text;
                variant2.push(item);
            });
        });
    }

    var atrribute_combination = new Array();
    var attributes = $('#pdt_attribute').select2("val");
    if(attributes.length>0)
    {
        $.each(attributes, function (i, item_att) { 
            var att_value =  $('#attribute_'+item_att).select2("data");
            if(att_value.length>0)
            {
                $.each(att_value, function (j1, itemj1) { 
                    var item1 = {}; 
                    item1.atrrib = itemj1.text +'-';
                    atrribute_combination.push(item1); 
                });
            }
             
        });
    }
        

}


