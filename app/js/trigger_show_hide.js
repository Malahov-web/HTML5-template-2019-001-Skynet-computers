/*
 * 5. Trigger Show-Hide
 * ----------------------------------------------------------------- 
 */ 


    function triggerShowHide() {

        $('.js-trigger').on('click', function () {

            target = $(this).attr('data-target'); 

            $('#'+target+'').toggle(400);
            $(this).toggleClass('active');
        });
        

    }
