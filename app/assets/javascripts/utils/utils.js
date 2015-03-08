Geofotr.scrollTo = function($element){
  $("#content").animate({
      scrollTop: $element.position().top
    }, 350);
}

Geofotr.scrollFrom = function($element) {
  $("#content").animate({
      scrollTop: $element.position().top
    }, 350);
}

Geofotr.noPhotosMessage = function(user) {
  $noPhotos = $('.no-photos-message');
  if (!user.photos().length && user.id == Geofotr.CURRENT_USER_ID) {
    $noPhotos.html('Hey ' + Geofotr.CURRENT_USER + ', Geofotr a photo or two!');
  } else if (!Geofotr.CURRENT_USER) {
    $noPhotos.html('This user hasn&#39;t shared any photos publicly. <br>Sign up for an account &#40;it&#39;s quick!&#41; to follow this user.');
  } else if (!user.photos().length) {
    $noPhotos.html('There&#39;s nothing here. Check out another user or your photo feed!');
  }
}

Geofotr.attachNewPhotoDropdown = function () {
  $('#photo-dropdown-container').html(Geofotr.dropdownView.render().$el);
  //events not working on guest login without delegation
  Geofotr.dropdownView.delegateEvents();
}
