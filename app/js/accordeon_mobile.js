/*
 *  1. Аккордеон мобильный mw_accordeon_mobile
 * ----------------------------------------------------------------- 
*/
 
// jQuery(document).ready(function(){ 



	function accordeonMobile(argument) {

		var temp = 400;
        var animationTempDefault = 400;		
		
		// Скрываем контент аккордеонов
		$('.js-accordeon__content').hide();

		// Обрабатываем 
	    $('.js-accordeon__title').click(function (e) {
		
			accordeon__content = $(this).closest('.js-accordeon').find('.js-accordeon__content');
            animationTemp = parseInt(accordeon__content.attr('data-animation-temp'));
            animationTemp = animationTemp || animationTempDefault;			
			
			// Открываем если скрыт
			if  ( !accordeon__content.is(':visible') ) {
				accordeon__content.slideDown(animationTemp);		
				$(this).addClass('opened')
			}
			else{
				if  ( (accordeon__content.is(':visible')) ) {
					accordeon__content.slideUp(animationTemp);
					$(this).removeClass('opened')				
				}
			}			

	    });  
	}



// });