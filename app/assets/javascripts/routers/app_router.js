Geofotr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    Geofotr.photos = new Geofotr.Collections.Photos();
    this.navBar = new Geofotr.Views.NavShow({
      el: $('#nav-bar')
    });
    this.addDropDownView();

    this.$rootEl = options.$rootEl;
  },

  routes: {
    '' : 'photoIndex',
    'users' : 'userIndex',
    'users/:id' : 'userShow',
    'photos/:id' : 'photoShow',
    'photos/:id/edit' : 'photoEdit',
    'map' : 'mapIndex'
  },

  addDropDownView: function () {
    var dropDownView = new Geofotr.Views.DropDownView({
      collection: Geofotr.photos,
      model: new Geofotr.Models.Photo()
    })

    $('#add-dropdown').append(dropDownView.render().$el);

    // $('#dropdown-menu').on('click', function (event) {
    //   event.stopPropagation();
    // });
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

    if (googleMap) {
      this.$rootEl.html(view.$el);
    } else {
      this.$rootEl.html(view.render().$el);
    }

    this.currentView = view;
  }
});
