// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require camaleon_cms/bootstrap.min.js


window.addEventListener("scroll", function() {
    var t, e, n, i, r;
    n=window.pageYOffset||document.documentElement.scrollTop, r=150, e=$("#router"), n>r?e.hasClass("smaller")||e.addClass("smaller"): e.hasClass("smaller")&&e.removeClass("smaller"), i=50, t=$("#mobile-trigger"), n>i?t.hasClass("top")||t.addClass("top"):t.hasClass("top")&&t.removeClass("top");
});
