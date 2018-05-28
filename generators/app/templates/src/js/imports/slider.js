import $ from 'jquery';
import slick from 'slick-carousel';

const opts = {
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 300,
    dots: true,
    slidesToShow: 1
};

$(".content-slider").each(function(i){
    const $el = $(this);
    const config = $el.data('config').split(',');
    config.forEach((val, index) => {
        val = parseInt(val);
        switch(index){
            case 0:
                opts.autoplaySpeed = val;
                opts.autoplay = val > 0;
            break;
            case 1:
                opts.speed = val;
            break;
            case 2:
                opts.slidesToShow = val;
            break;
            case 3:
                opts.infinite = val > 0;
            break;
        }
    });
    $el.children('.slider-wrapper').slick(opts);
});
