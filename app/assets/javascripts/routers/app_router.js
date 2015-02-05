Geofotr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    Geofotr.photos = new Geofotr.Collections.Photos();
    Geofotr.photos.fetch();
  },

  routes: {
    '' : 'photoIndex',
    'users/:id' : 'photoIndex',
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

  photoIndex: function (id) {
    if (id) {
      Geofotr.photos.fetch( {
        data: { user_id: id }
      });
    } else {
      Geofotr.photos.fetch();
    }
    var indexView = new Geofotr.Views.PhotosIndex({
      collection: Geofotr.photos
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

  userShowToggle: function (id) {
    this.user = new Geofotr.Models.User({ id: id });
    this.user.fetch();

    id === Geofotr.CURRENT_USER_ID ? this.profile(id) : this.userShow(id);
  },

  userShow: function (id) {
    var userShowView = new Geofotr.Views.UserShow({
      model: this.user,
      collection: this.user.photos()
    });

    this._swapView(userShowView);
  },

  profile: function (id) {
    var userProfile = new Geofotr.Views.UserProfile({
      model: this.user,
      collection: this.user.photos()
    });

    this._swapView(userProfile);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();

    this.$rootEl.html(view.render().$el);
    this.currentView = view;
  }
});
