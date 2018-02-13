import $ from 'jquery';

const $burger = $('<div class="burger"><div class="burger-inner"><span></span><span></span><span></span></div></div>');
$burger.on('click', e => {
    $('body').toggleClass('mobilemenu-active');
});

$('body')
    .append($burger)
    .addClass('mobilemenu')