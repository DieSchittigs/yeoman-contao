<% if(npmOptions.indexOf('jquery') >= 0){ %>import './imports/mobilemenu.js';
<% if(npmOptions.indexOf('slick-carousel') >= 0){ %>import './imports/slider.js';<% } %>
<% if(npmOptions.indexOf('magnific-popup') >= 0){ %>import './imports/gallery.js';<% } %>
<% if(npmOptions.indexOf('smooth-scroll') >= 0){ %>import './imports/anchor.js';<% } %>
<% if(npmOptions.indexOf('stickyfilljs') >= 0){ %>import './imports/sticky.js';<% } %>
import './imports/accordion.js';<% } %>
