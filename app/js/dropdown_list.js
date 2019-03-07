/*
 *  2. Левое Меню
 * ----------------------------------------------------------------- 
 */
 
 jQuery(document).ready(function(){
 	
	jQuery('.js-dropdown_list LI UL').hide();


/*	
	// Текущий пункт делаем открытым  ( если находимся на соответствующей странице раздела ), и открываем его подпункты
	jQuery('.catalog_menu__list UL LI.current-cat').parents('ul').show();
	jQuery('.catalog_menu__list LI.current-cat').children('ul').show();
	jQuery('.catalog_menu__list UL LI.current-cat').addClass('open_item');
	jQuery('.catalog_menu__list UL LI.current-cat').parents('li').addClass('open_item');
	// Текущий пункт делаем открытым  ( если находимся на соответствующей странице товара )
	product_term_id = jQuery('.catalog_menu__list').attr('data-term');
	//jQuery('.catalog_menu__list').find('[class="cat-item-' + product_term_id + '"]').parents('ul').show();
	//jQuery('.catalog_menu__list').find('[class="cat-item-' + product_term_id + '"]').attr('product_term_id', product_term_id);
	product_term_id = "cat-item-" + product_term_id;
	product_current_cat = jQuery('.catalog_menu__list').find('li.'+product_term_id+'');
	    // Делаем открытым только на большом экране
	container_width = product_current_cat.closest('.content').width(); //alert(container_width);
	if ( container_width >= 940 ){
	product_current_cat.parents('ul').show();
	}
	product_current_cat.addClass('open_item');
	product_current_cat.parents('li').addClass('open_item');
	//alert(test_html);
*/	
	
	
	// Добавляем класс "menu-item-has-children" и удаляем ссылку
	jQuery('.js-dropdown_list LI').has('UL').addClass("menu-item-has-children");
	jQuery(".menu-item-has-children>a")
		.click(function( event ) {
			event.preventDefault();
		})	
	;
	
// $( "a" ).click(function( event ) {
  // event.preventDefault();	
  
    jQuery('.js-dropdown_list LI').click(function (e) {
	
		// Закрываем все другие, кроме нажатого
		jQuery(this).siblings('LI').children('UL:visible').slideUp(400); 
		//jQuery(this).siblings('LI').removeClass('open_item');
		
		child_menu =  jQuery(this).children('ul');
		if ( !child_menu.is(e.target)  &&  child_menu.has(e.target).length === 0 )
		{
		
		current_item = jQuery(this);
	    // Если есть вложенные меню

		if ( current_item.children('ul') )
		{
		  // Если они закрыты		
		  if ( !(current_item.children('ul').is(':visible'))  )
		  {
            current_item.children('ul').slideDown(400);
			current_item.addClass('open_item');
		  }
		  // Если они открыты
		  else
		  { 
		    if  ( current_item.children('ul').is(':visible') )  
			{ current_item.children('ul').slideUp(400); 
			  current_item.removeClass('open_item');
			}
		  }		  
		}
		}
    }
	  
    );  
	
// + 1. Еще нужно открыть текущую категорию ( класс "current-cat")	
// + 2. Выделить текущую  категорию на стр-це товара

});