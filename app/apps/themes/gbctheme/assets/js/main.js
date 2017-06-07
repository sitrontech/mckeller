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



// disable copy
function killCopy(e){ return false}
function reEnable(){ return true}
document.onselectstart=new Function ("return false")
if (window.sidebar){
    document.onmousedown=killCopy;
    document.onclick=reEnable;
}
// disable right click
// function blockContextMenu (evt) { evt.preventDefault();};
// window.addEventListener('contextmenu', blockContextMenu);

// small header
window.addEventListener("scroll", function() {
    var t, e, n, i, r;
    n=window.pageYOffset||document.documentElement.scrollTop, r=150, e=$("#router"), n>r?e.hasClass("smaller")||e.addClass("smaller"): e.hasClass("smaller")&&e.removeClass("smaller"), i=50, t=$("#mobile-trigger"), n>i?t.hasClass("top")||t.addClass("top"):t.hasClass("top")&&t.removeClass("top");
});

// mobile menu
var closesmallmenu = function(){
    $("#router nav").removeClass("show");
    $("#mobile-trigger.active").removeClass("active").click(smallmenu);
}
var smallmenu = function(){
            $("#router nav").addClass("show");
            $("#mobile-trigger").addClass("active").click(closesmallmenu);
        };

document.addEventListener("turbolinks:load", function() {    
    $("#mobile-trigger").click(smallmenu);  
    $("#mobile-trigger.active").click(closesmallmenu);   
    $(".menu-item").click(closesmallmenu); 

           
});  



