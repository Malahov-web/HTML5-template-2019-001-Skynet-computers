/*
 * 2. Мобильное Меню
 * ----------------------------------------------------------------- 
 */ 




// jQuery(document).ready(function(){


    // mobileMenu();

    function mobileMenu(argument) {

        var animationTempDefault = 400;

        $('.js-mobile_menu__title').each(function() {

            $(this).click(function(){

                var mobile_menu = $(this).closest('.js-mobile_menu-outer').find('.js-mobile_menu');
                animationTemp = parseInt(mobile_menu.attr('data-animation-temp'));
                animationTemp = animationTemp || animationTempDefault;

                if  ( mobile_menu.is(":visible") ) {
                    mobile_menu.slideUp(animationTemp)  ;
                }
                else{
                    mobile_menu.slideDown(animationTemp)  ;
                }         

            });

        });        
        
    }



// });
