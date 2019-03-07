
/*
 * 4. Menu Responsive
 * ----------------------------------------------------------------- 
 */ 

jQuery(document).ready(function(){

container_width = jQuery(".container").innerWidth(); //console.log(container_width);   
mobile_width = 768;

if (!( container_width <= mobile_width )){  

// if ( isMobileResolution() )  {

    var menu = jQuery('[data-js="menu-responsive"]');
    var menuWidth = menu.width(); // innerWidth

    console.log(menu);
    console.log(menuWidth);

    var itemsInMenu;
    var itemsInDD;
    var itemsInMenuWidth = 0;


    // 1.
    var dD = createDD();
    var dDWidth = dD.innerWidth();
    var dDList = dD.children('ul');
    var dDListWidth = dDList.innerWidth();
    console.log('dD= ' + dD); // dD.show();
    console.log('dDList= ' + dDList); // dD.show();
    console.log('dDListWidth= ' + dDListWidth); // dD.show();

    // 2.
    // setTimeout(  )

    checkWidth();

    $( window ).on('resize', function() {
        // checkWidth();
        setTimeout(checkWidth, 100 );
    });    



    function checkWidth(argument) {

        checkMenuWidth();

        itemsInMenuWidth = 0;

        //
        // itemsInMenuWidth

        // menu.children().hide();

        // Считаем суммарную ширину
        menu.children('li').each(function() {
            // console.log(this);
            itemsInMenuWidth = itemsInMenuWidth + $(this).innerWidth();
            console.log('itemsInMenuWidth: ' + itemsInMenuWidth);
            console.log('menuWidth: ' + menuWidth);
            console.log('dDListWidth: ' + dDListWidth);
            console.log('dD: ' + dD);

        });

        // while ( itemsInMenuWidth + dDWidth > menuWidth ) {
        if ( itemsInMenuWidth + dDWidth > menuWidth ) {
// console.log(itemsInMenuWidth); // Все работает, перемещается только последний пункт)
            moveItemToDD();
            showDD();

            checkWidth();
        }  
        // }
 
    } 

    function checkMenuWidth(argument) {
        menuWidth = menu.width();
        dDListWidth = dDList.innerWidth();
        console.log('dDListWidth: ' + dDListWidth );
        // return menuWidth;
    }

    

    function moveItemToDD (argument) {
        
        // menu.find('.dropdown').append(menu.children('li:last'));
        // dDList.append(menu.children('li:last'));
        dDList.prepend(menu.children('li:last'));
    }

    function createDD (argument) {

        var hasDD =  menu.find('.dropdown');
        console.log(hasDD);
        
        // if ( !menu.find('.dropdown') ) {

        menu.append('<div class="dropdown" style=\"\"><ul class="dropdown__list js-dropdown_list"></ul></div>');   //append( $( "h2" ) ) .append( "<p>Test</p>" );  
        return  menu.find('.dropdown');
        // }
    }

    function showDD (argument) {
        dD.addClass('visible');
    }



    // function menuResponsive {

    //     constructor () {

    //     }
    // }

    // function menuResponsive(name) {
    //     this.name = name;
    //     // this.__proto__ = animal;
    // }    


// } // if isMobileResolution() 

} // if end


});

