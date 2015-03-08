Geofotr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    Geofotr.photos = new Geofotr.Collections.Photos();
    Geofotr.photoToEdit = new Geofotr.Models.Photo;

    this.addNavBarView();
    this.addDropdownView();

    this.$rootEl = options.$rootEl;
    this.$content = $('#content');
  },

  routes: {
    '' : 'splashRoute',
    'photos' : 'photoIndex',
    'users/signin' : 'signIn',
    'users/signup' : 'signUp',
    'users' : 'userIndex',
    'users/:id' : 'userShow',
    'photos/:id' : 'photoShow',
    'photos/:id/edit' : 'photoEdit',
    'map' : 'mapIndex'
  },

  addNavBarView: function () {
    Geofotr.navBar = new Geofotr.Views.NavShow({
      el: $('#navbar')
    });

    Geofotr.navBar.render();
  },

  addDropdownView: function () {
    Geofotr.dropdownView = new Geofotr.Views.DropdownView({
      collection: Geofotr.photos,
      model: new Geofotr.Models.Photo()
    })
    if (Geofotr.CURRENT_USER) {
      Geofotr.attachNewPhotoDropdown();
    }
  },

  splashRoute: function () {
    if (Geofotr.CURRENT_USER) {
      this.$content.removeClass('no-scroll');
      this.photoIndex();
    } else {
      this.$content.addClass('no-scroll');
      this.splash();
    }
  },

  splash: function () {
    var splashView = new Geofotr.Views.Splash();

    this._swapView(splashView);
  },

  signIn: function () {
    this.$content.addClass('no-scroll');
    var signInView = new Geofotr.Views.Authenticate({
      url: 'api/session',
      pageTitle: 'Sign in'
    });

    this._swapView(signInView);
  },

  signUp: function () {
    this.$content.addClass('no-scroll');
    var signUpView = new Geofotr.Views.Authenticate({
      url: 'api/users',
      pageTitle: 'Sign up'
    });

    this._swapView(signUpView);
  },

  mapIndex: function () {
    //fetch all photos for map view
    var userId = Geofotr.CURRENT_USER_ID ? Geofotr.CURRENT_USER_ID : undefined;
    Geofotr.photos.fetch({
      data: {
        user_id: userId,
        map: true
      }
    });

    var mapIndex = new Geofotr.Views.MapsIndex({
      collection: Geofotr.photos,
    });

    this._swapView(mapIndex);
  },

  photoEdit: function (id) {
    var photo = Geofotr.photos.getOrFetch(id);
    var editView = new Geofotr.Views.PhotoEdit({
      collection: Geofotr.photos,
      model: photo
    });

    this._swapView(editView);
  },

  userShow: function(id) {
    this.$content.removeClass('no-scroll');

    this.userShowView = new Geofotr.Views.PhotosIndex({
      model: new Geofotr.Models.User({id: id}),
      userPhotos: true
    });

    //TO DO fetch subsequent pages of API users collection; not photos collection

    this._swapView(this.userShowView);
  },

  userIndex: function () {
    this.$content.removeClass('no-scroll');
    var users = new Geofotr.Collections.Users();
    users.fetch();

    var usersIndex = new Geofotr.Views.UsersIndex({
      collection: users
    });

    this._swapView(usersIndex);
  },

  photoIndex: function () {
    this.$content.removeClass('no-scroll');
    //re-initialize photos for when navigating from user page
    Geofotr.photos = new Geofotr.Collections.Photos();
    Geofotr.photos.fetch({
      data: { page: 1 }
    });

    var indexView = new Geofotr.Views.PhotosIndex({
      collection: Geofotr.photos,
      model: new Geofotr.Models.User()
    });

    this._swapView(indexView);
  },

  photoShow: function (id) {
    this.$content.removeClass('no-scroll');
    var photo = Geofotr.photos.getOrFetch(id);
    var photoShowView = new Geofotr.Views.PhotoShow({
      model: photo
    });

    this._swapView(photoShowView);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();

    this.$rootEl.html(view.render().$el);

    this.currentView = view;
  }
});
