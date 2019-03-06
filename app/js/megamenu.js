/*
 * 3. Megamenu
 * ----------------------------------------------------------------- 
 */ 

/*
Алгоритм

рендер изображений категорий

hover
    показать с анимацией и блокировкой
    скрыть

*/

jQuery(document).ready(function(){

    var megamenu = $('.megamenu');
    var imageTemplate = '<span class="submenu__item-image"><img src="images/product-cap.jpg"></span>';
    var itemsWithImages = megamenu.find('[data-image-url]');
    // console.log(itemsWithImages);

    itemsWithImages.each( function() {

        currentItemImageSrc = $(this).attr('data-image-url');
        $(this).append(imageTemplate);
        $(this).find('img').attr('src', currentItemImageSrc);

    });

 });