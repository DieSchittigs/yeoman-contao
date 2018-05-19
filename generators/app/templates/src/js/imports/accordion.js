import $ from 'jquery';

$('.toggler').each(function(i){
    const $toggler = $(this);
    const $accordion = $toggler.next('.accordion');
    $accordion.hide();
    $toggler.on('click', ()=>{
        $accordion.slideToggle();
    });
});