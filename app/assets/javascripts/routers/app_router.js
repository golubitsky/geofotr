Geofotr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    Geofotr.photos = new Geofotr.Collections.Photos();
  },

  routes: {
    '' : 'photoIndex',
    'users' : 'userIndex',
    'users/:id' : 'userShow',
    'photos/:id' : 'photoShow',
    'photos/:id/edit' : 'photoEdit',
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

  _swapView: function (view) {
    this.currentView && this.currentView.remove();

    this.$rootEl.html(view.render().$el);
    this.currentView = view;
  }
});
