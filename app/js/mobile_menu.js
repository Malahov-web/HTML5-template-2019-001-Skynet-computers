/*
 * 2. Мобильное Меню
 * ----------------------------------------------------------------- 
 */ 
 
jQuery(document).ready(function(){

    jQuery('.js-mobile_menu__title').click(function(){ 
        
        var mobile_menu = jQuery('.js-mobile_menu');
        
        if  ( mobile_menu.is(":visible") ) {
            //console.log('Видимый');
            mobile_menu.slideUp(400)  ;
        }
        else{
            mobile_menu.slideDown(400)  ;
        }

    
    });


});
