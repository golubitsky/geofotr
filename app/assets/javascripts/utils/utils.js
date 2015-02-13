Geofotr.isEnterKeypress = function (event) {
  event.preventDefault();
  return event.keycode === 13;
}
//removed this from line 11
//+ $element.outerHeight(true)

Geofotr.scrollTo = function($element){
  debugger
  $("#content").animate({
      scrollTop: $element.position().top
    }, 350);
}

Geofotr.scrollFrom = function($element) {
  $("#content").animate({
      scrollTop: $element.position().top
    }, 350);
}
