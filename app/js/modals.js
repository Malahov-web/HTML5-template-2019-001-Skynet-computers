
/*
 * . Modal показать/скрыть 
 * ----------------------------------------------------------------- 
 */	

 // jQuery(document).ready(function() {


 	function modals(argument) {

 		var temp_overlay = 400;
 		var temp_modal = 600;


		$('.js-modal-open').click(function( event ) {
			event.preventDefault();
		});

		// var overlay = jQuery('.overlay');
		var overlay = $('#overlay');

		$('.js-modal-open').on( 'click', function(){ 
	  
			var target_id = $(this).attr('data-target'); 
			
			overlay.fadeIn(temp_overlay);
			
			// $('#'+target_id+'').slideDown(temp_modal);
			$('#'+target_id+'').fadeIn(temp_modal);
			
		});
		
		
		jQuery('.js-modal-close').on( 'click', function(){ 
	  
			target_id = jQuery(this).attr('data-target'); 
			overlay.fadeOut(temp_overlay);
			// jQuery(this).closest('.js-modal').slideUp(temp_modal);
			jQuery(this).closest('.js-modal').fadeOut(temp_modal);
			
		});	
		
		
		// Скрываем
		// jQuery(document).mouseup(function (e){ // событие клика по веб-документу

		overlay.on( 'click', function(e){ 
		
			var modal = overlay.find('.js-modal'); // тут указываем ID элемента
			if (!modal.is(e.target) && modal.has(e.target).length === 0) { // если клик был не по нашему блоку // и не по его дочерним элементам
			
				//div.hide(); // скрываем его 			
				
				overlay.fadeOut(temp_overlay);	
				// modal.slideUp(temp_modal);
				modal.fadeOut(temp_modal);
				//jQuery('.js-modal:visible').slideUp(1600);
				//modal=""; 
				
			}
			
		}); 
		



 	}
  
// });