Geofotr.isEnterKeypress = function (event) {
  event.preventDefault();
  return event.keycode === 13;
}

Geofotr.scrollTo = function($element){
  debugger
  $("#content").animate({
      scrollTop: $element.position().top + $element.outerHeight(true)
    }, 350);
}

Geofotr.scrollFrom = function($element) {
  $("#content").animate({
      scrollTop: $element.position().top
    }, 350);
}
