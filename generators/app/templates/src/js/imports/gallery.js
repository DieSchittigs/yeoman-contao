import $ from 'jquery';
import 'magnific-popup';

const options = {
    delegate: 'li > figure > a',
    type: 'image',
    image: {
        verticalFit: true
    }
};

if($('.ce_gallery').length){
    $('.ce_gallery > ul').magnificPopup(options);
}