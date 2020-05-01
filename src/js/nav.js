document.addEventListener('DOMContentLoaded', function(){
    menu = $(".menu-container");
    body = $("body")
    openButton = $(".iconify.toggle");
    closeButton = $(".iconify.close");
});

function showMenu(){
   menu.addClass("show");
   body.addClass("show-menu");
}


function closeMenu(){
    menu.removeClass("show");
    body.removeClass("show-menu");
}

window.addEventListener("click", function(event) {
    if (event.target == menu[0]) {
        menu.removeClass("show");
        body.removeClass("show-menu");
      }
});