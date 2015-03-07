Geofotr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    Geofotr.photos = new Geofotr.Collections.Photos();
    Geofotr.photoToEdit = new Geofotr.Models.Photo;

    this.addNavBarView();

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

  splashRoute: function () {
    if (Geofotr.CURRENT_USER) {
      this.photoIndex();
    } else {
      this.splash();
    }
  },

  splash: function () {
    var splashView = new Geofotr.Views.Splash();

    this._swapView(splashView);
  },

  signIn: function () {
    var signInView = new Geofotr.Views.Authenticate({
      url: 'api/session',
      pageTitle: 'Sign in'
    });

    this._swapView(signInView);
  },

  signUp: function () {
    var signUpView = new Geofotr.Views.Authenticate({
      url: 'api/users',
      pageTitle: 'Sign up'
    });

    this._swapView(signUpView);
  },

  mapIndex: function () {
    Geofotr.photos.fetch();

    var mapIndex = new Geofotr.Views.MapsIndex({
      collection: Geofotr.photos,
    });

    this._swapView(mapIndex, true);
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
    var user = new Geofotr.Models.User({id: id});
    user.fetch({
      data: { page: 1 },
      success: function (user) {
        Geofotr.noPhotosMessage(user)
      }
    });

    Geofotr.photos = user.photos();

    var userShowView = new Geofotr.Views.PhotosIndex({
      collection: Geofotr.photos,
      model: user
    });

    this._swapView(userShowView);
  },

  userIndex: function () {
    var users = new Geofotr.Collections.Users();
    users.fetch();

    var usersIndex = new Geofotr.Views.UsersIndex({
      collection: users
    });

    this._swapView(usersIndex);
  },

  photoIndex: function () {
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
    var photo = Geofotr.photos.getOrFetch(id);
    var photoShowView = new Geofotr.Views.PhotoShow({
      model: photo
    });

    this._swapView(photoShowView);
  },

  _swapView: function (view, googleMap) {
    this.currentView && this.currentView.remove();

    this.$rootEl.html(view.render().$el);

    this.currentView = view;
  }
});
