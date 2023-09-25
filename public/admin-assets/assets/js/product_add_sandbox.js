function add_new_product_key_ingridents(){
    var component= ` 
                <div class="row mb-5 datarowproductkeyingridents"> 
                    <p>Product Key Ingredient</p>
                    <div class="col-lg-4">
                        <div class="mb-3">
                            <label class="form-label" for="">Field Name</label>
                            <input  name="pdt_key_ingredients_fieldname[]"  type="text" class="form-control" placeholder="Field Name">
                        </div>
                        <div class="mb-3">
                            <input type="file" class="form-control" name="pdt_key_ingredients_img[]">
                        </div>
                    </div>
                    <div class="col-lg-7">                       
                        <textarea class="texttynimyce2" name="pdt_key_ingredients_description[]"></textarea>
                    </div>
                    <div class="col-lg-1">   
                    <a href="javascript:void(0);" class="px-2 text-danger deleteproductkeyIngredients"><i class="uil uil-trash-alt font-size-18"></i></a>
                    </div>
                </div>
            `;
            $('.key_ingrediants').append(component);  
            tinimyceintit();

            
}
$(document).on('click','.deleteproductkeyIngredients',function(){
    $(this).parents('.datarowproductkeyingridents').remove();

});

function add_new_why_orgaglo(){
    var component= ` 
        <div class="row mb-5 datarowwhyorgaglo">
            <p>Why Orgaglo</p>
            <div class="col-lg-4">
                <div class="mb-3">
                    <label class="form-label" for="">Field Name</label>
                    <input  name="pdt_why_orgaglo_fieldname[]"  type="text" class="form-control" placeholder="Field Name">
                </div>
                <div class="mb-3">
                    <input type="file" class="form-control" name="pdt_why_orgaglo_img[]">
                </div>
            </div>
            <div class="col-lg-7">                       
                <textarea class="texttynimyce2" name="pdt_why_orgaglo_description[]"></textarea>
            </div>
            <div class="col-lg-1">   
            <a href="javascript:void(0);" class="px-2 text-danger deletewhy_orgaglo"><i class="uil uil-trash-alt font-size-18"></i></a>
            </div>
        </div>
    `;
    $('.why_orgaglo').append(component);
    tinimyceintit();

            
}
$(document).on('click','.deletewhy_orgaglo',function(){
    $(this).parents('.datarowwhyorgaglo').remove();

});



function add_new_what_do_i_do(){
    var component= ` 
        <div class="row mb-5 datarowadd_new_what_do_i_do">
            <p>What Do I Do ?</p>
            <div class="col-lg-4">
                <div class="mb-3">
                    <label class="form-label" for="">Field Name</label>
                    <input  name="pdt_what_do_i_do_fieldname[]" type="text" class="form-control" placeholder="Field Name">
                </div>
                <div class="mb-3">
                    <input type="file" class="form-control" name="pdt_what_do_i_do_img[]">
                </div>
            </div>
            <div class="col-lg-7">                       
                <textarea class="texttynimyce2" name="pdt_what_do_i_do_description[]"></textarea>
            </div>
            <div class="col-lg-1">   
                <a href="javascript:void(0);" class="px-2 text-danger deletewhat_do_i_do"><i class="uil uil-trash-alt font-size-18"></i></a>
            </div>
        </div>
   `;
    $('.what_do_i_do_sec').append(component);
    tinimyceintit();

            
}
$(document).on('click','.deletewhat_do_i_do',function(){
    $(this).parents('.datarowadd_new_what_do_i_do').remove();

});


function add_faqs(){
    var component= ` 
        <div class="row mb-5 datarowadd_faqs">
            <p>FAQs</p>
            <div class="col-lg-4">
                <div class="mb-3">
                    <label class="form-label" for="">Question</label>
                    <input  name="pdt_faqs_fieldname[]"  type="text" class="form-control" placeholder="Question">
                </div>               
            </div>
            <div class="col-lg-7">                       
                <textarea class="texttynimyce2" name="pdt_faqs_description[]"></textarea>
            </div>
            <div class="col-lg-1">   
            <a href="javascript:void(0);" class="px-2 text-danger deletefaqs"><i class="uil uil-trash-alt font-size-18"></i></a>
            </div>
        </div>
   `;
    $('.faqs_sec').append(component);
    tinimyceintit();

            
}
$(document).on('click','.deletefaqs',function(){
    $(this).parents('.datarowadd_faqs').remove();

});


function tinimyceintit(){
    tinymce.init({
        selector: ".texttynimyce2",
        paste_data_images: true,
        height: 300,
        menubar: false,
        plugins: [
            " autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern"
        ],
        toolbar1: "fontselect| fontsizeselect | forecolor backcolor | styleselect | bold italic underline| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ",
     
        image_advtab: true,
        file_picker_callback: function(callback, value, meta) {
        if (meta.filetype == 'image') {
            $('#upload').trigger('click');
            $('#upload').on('change', function() {
            var file = this.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                callback(e.target.result, {
                alt: ''
                });
            };
            reader.readAsDataURL(file);
            });
        }
        },
        templates: [{
            title: 'Test template 1',
            content: 'Test 1'
        }, {
            title: 'Test template 2',
            content: 'Test 2'
        }]
  });
}