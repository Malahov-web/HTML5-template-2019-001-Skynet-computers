/*
 *  1. Аккордеон мобильный mw_accordeon_mobile
 * ----------------------------------------------------------------- 
*/
 
jQuery(document).ready(function(){
 
container_width = jQuery(".container").innerWidth(); //console.log(container_width);	
mobile_width = 768;

if ( container_width <= mobile_width ){ 

	var temp = 400;
	
	// Скрываем контент аккордеонов
	jQuery('.js-accordeon__content').hide();

	// Обрабатываем 
    jQuery('.js-accordeon__title').click(function (e) {
	
		accordeon__content = jQuery(this).closest('.js-accordeon').find('.js-accordeon__content');
		
		// Открываем если скрыт
		if  ( !accordeon__content.is(':visible') ) {
			accordeon__content.slideDown(temp);		
			jQuery(this).addClass('opened')
		}
		else{
			if  ( (accordeon__content.is(':visible')) ) {
				accordeon__content.slideUp(temp);
				jQuery(this).removeClass('opened')				
			}		
		}			

    });  

}// end if

});