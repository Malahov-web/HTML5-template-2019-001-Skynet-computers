
/*
 *  1. Owl Carousel - слайдеры
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
    $('.section-products-new .owl-carousel').owlCarousel({
        loop:true, //Зацикливаем слайдер
        margin:0, //Отступ от картино если выводите больше 1
        // // nav:false, //Отключил навигацию
        nav:true, //Включили навигацию
        // navText: "next", //Включили навигацию
        // navText: ["Текст"],
        // navText: ["<img src='myprevimage.png' alt='left'>","<img src='mynextimage.png'>"] // Ошибка UglifyJS
        dots:true, //Включили навигацию
        // autoplay:true, //Автозапуск слайдера
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

    // Products viewed
    $('.section-products-viewed .owl-carousel').owlCarousel({
        loop:true, //Зацикливаем слайдер
        margin:0, //Отступ от картино если выводите больше 1
        nav:true, //Включили навигацию
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

    // Productfull image    
    $('.productfull__image.owl-carousel').owlCarousel({
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

    // Productfull gallery
    $('.productfull-gallery .owl-carousel').owlCarousel({
        loop:true, //Зацикливаем слайдер
        margin:0, //Отступ от картино если выводите больше 1
        nav:true, //Включили навигацию
        dots:false, //Включили навигацию
        autoplay:false, //Автозапуск слайдера
        smartSpeed:1000, //Время движения слайда
        // autoplayTimeout:3000, //Время смены слайда
        mouseDrag: false,
        responsive:{ //Адаптация в зависимости от разрешения экрана
            0:{
                items:3
            },
            480:{
                items:3
            },            
            768:{
                items:3
            },
            1024:{
                items:3
            }
        }
    }); 

});



jQuery(document).ready(function($) {

    var mobile_breakpoint = 768;   

    $('[name="select-brand"]').selectric();
    $('[name="select-sort"]').selectric();
    $('[name="select-pages"]').selectric();

    tabs();

    owlCurrentSlideEffect();

    modals();


    if ( isMobileResolution(mobile_breakpoint) ) {

        mobileMenu(); 

        searchMobile();        

        accordeonMobile();

        dropdownList();

        triggerShowHide();
        
    } else {

        megaMenu();

        menuResponsive();
    }

});


function isMobileResolution(mobile_breakpoint) {

    var container_width = jQuery(".container").innerWidth();
    var mobile_width = mobile_breakpoint;

    // console.log('isMobileResolution(): Hi, container_width: ' + container_width);
    return ( container_width < mobile_width );
}


function owlCurrentSlideEffect(argument) {
    
    $('.gallery .owl-carousel').find('.owl-item').on('click', function () {

        $(this).closest('.owl-carousel').find('.owl-item').removeClass('current');
        $(this).addClass('current');
    })
}
