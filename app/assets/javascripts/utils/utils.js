Geofotr.isEnterKeypress = function (event) {
  event.preventDefault();
  return event.keycode === 13;
}

//figure out why the arguments have to be reversed?
Geofotr.scroll = function (parent, element, callback) {
 $(parent).animate({ scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top }, {
    duration: 'slow',
    easing: 'swing',
    complete: function() {
        console.log('hey')
        debugger
        callback && callback();
      }
  });
 $('html,body').animate({ scrollTop: $(parent).offset().top }, {
    duration: 550,
    easing: 'swing'
  });


}
