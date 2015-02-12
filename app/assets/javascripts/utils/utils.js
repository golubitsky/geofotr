Geofotr.isEnterKeypress = function (event) {
  event.preventDefault();
  return event.keycode === 13;
}

Geofotr.scrollTo = function($element){
  $("html, body").animate({
      scrollTop: $element.offset().top + $element.outerHeight(true)
    }, 350);
}

Geofotr.scrollFrom = function($element){
  $("html, body").animate({
      scrollTop: $element.offset().top
    }, 350);
}
