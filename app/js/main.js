/*
 *  1. menuResponsive
 * ----------------------------------------------------------------- 
*/



/*
 *  2. Owl Carousel - слайдеры
 * ----------------------------------------------------------------- 
*/

// jQuery v 3.3.1
$(document).ready(function() {

// Main    
    $('.section-slider  .owl-carousel').owlCarousel({
        loop:true, //Зацикливаем слайдер
        margin:0, //Отступ от картино если выводите больше 1
        nav:false, //Отключил навигацию
        autoplay:true, //Автозапуск слайдера
        autoplay:false, //Автозапуск слайдера
        smartSpeed:1000, //Время движения слайда
        autoplayTimeout:3000, //Время смены слайда
        responsive:{ //Адаптация в зависимости от разрешения экрана
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

// Products
    $('.section-products  .owl-carousel').owlCarousel({
        loop:true, //Зацикливаем слайдер
        margin:0, //Отступ от картино если выводите больше 1
        nav:false, //Отключил навигацию
        autoplay:false, //Автозапуск слайдера
        autoplay:false, //Автозапуск слайдера
        smartSpeed:1000, //Время движения слайда
        // autoplayTimeout:3000, //Время смены слайда
        responsive:{ //Адаптация в зависимости от разрешения экрана
            0:{
                items:1
            },
            480:{
                items:2
            },            
            768:{
                items:3
            },
            1024:{
                items:4
            }
        }
    });

});


