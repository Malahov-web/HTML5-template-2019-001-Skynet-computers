/*
 * 2. Мобильное Меню
 * ----------------------------------------------------------------- 
 */ 
 
// jQuery(document).ready(function(){

//     jQuery('.js-mobile_menu__title').click(function(){ 
        
//         // var mobile_menu = jQuery('.js-mobile_menu');
//         var mobile_menu = jQuery(this).closest('div').find('.js-mobile_menu');
//         alert(mobile_menu.attr('class'));
        
//         if  ( mobile_menu.is(":visible") ) {
//             //console.log('Видимый');
//             mobile_menu.slideUp(400)  ;
//         }
//         else{
//             mobile_menu.slideDown(400)  ;
//         }

    
//     });


// });


jQuery(document).ready(function(){

    // $( "li" ).each(function() {
    //     $( this ).addClass( "foo" );
    // });
 

    jQuery('.js-mobile_menu__title').each(function() {
    // jQuery('.js-mobile_menu__title').click(function(){

        jQuery(this).click(function(){
        // jQuery(this).each(function() {

// alert(this);
           
            // var mobile_menu = jQuery('.js-mobile_menu');
            var mobile_menu = jQuery(this).closest('.js-mobile_menu-outer').find('.js-mobile_menu');
            // alert(jQuery(this).parent('div'));

            if  ( mobile_menu.is(":visible") ) {
                //console.log('Видимый');
                mobile_menu.slideUp(400)  ;
            }
            else{
                mobile_menu.slideDown(400)  ;
            }         

        });

    });

});


// jQuery(document).ready(function(){


//     function MenuMobile(argument) {
//         // body...
//     }


//     var menuTop = new MenuMobile({
//         element: ''
//     });  
// });

