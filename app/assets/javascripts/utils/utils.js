Geofotr.isEnterKeypress = function (event) {
  event.preventDefault();
  return event.keycode === 13;
}

Geofotr.scrollToEdit = function($element){
  $("html, body").animate({
      scrollTop: $element.offset().top + $element.outerHeight(true)
    }, 350);
}

Geofotr.scrollFromEdit = function($element){
  $("html, body").animate({
      scrollTop: $element.offset().top
    }, 350);
}
