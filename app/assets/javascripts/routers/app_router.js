Geofotr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    Geofotr.photos = new Geofotr.Collections.Photos();

    this.addNavBarView();
    // this.addDropDownView();

    this.$rootEl = options.$rootEl;
  },

  routes: {
    '' : 'photoIndex',
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

  // addDropDownView: function () {
  //   var dropDownView = new Geofotr.Views.DropDownView({
  //     collection: Geofotr.photos,
  //     model: new Geofotr.Models.Photo()
  //   })

  //   $('#create-photo-dropdown').append(dropDownView.render().$el);
  // },

  signIn: function () {
    var signInView = new Geofotr.Views.SignIn();

    this._swapView(signInView);
  },

  signUp: function () {
    var signUpView = new Geofotr.Views.SignUp();

    this._swapView(signUpView);
  },

  mapIndex: function () {
    Geofotr.photos.fetch();

    var mapIndex = new Geofotr.Views.MapsIndex({
      collection: Geofotr.photos,
    });

    this._swapView(mapIndex, true);
    // setTimeout(function () {
    //   mapIndex.positionMap()
    //   // google.maps.event.trigger(mapIndex, 'resize')
    //   // console.log('positionMap')
    // },  500);
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
    user.fetch();

    var userShowView = new Geofotr.Views.PhotosIndex({
      collection: user.photos(),
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
    Geofotr.photos.fetch();

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
