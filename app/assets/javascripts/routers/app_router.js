Geofotr.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    Geofotr.photos = new Geofotr.Collections.Photos();
    Geofotr.photos.fetch();
  },

  routes: {
    '' : 'index',
    'photos/new' : 'new',
    'photos/:id' : 'show',
    'photos/:id/edit' : 'edit'
  },

  edit: function (id) {
    var photo = Geofotr.photos.getOrFetch(id);
    var editView = new Geofotr.Views.PhotoEdit({
      collection: Geofotr.photos,
      model: photo
    });

    this.$rootEl.html(editView.render().$el);
  },

  index: function () {
    Geofotr.photos.fetch();
    var indexView = new Geofotr.Views.PhotosIndex({
      collection: Geofotr.photos
    });

    this.$rootEl.html(indexView.render().$el);
  },

  show: function (id) {
    var photo = Geofotr.photos.getOrFetch(id);
    var showView = new Geofotr.Views.PhotoShow({
      model: photo
    });

    this.$rootEl.html(showView.render().$el);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();

    this.$rootEl.html(view.render().$el);
    this.currentView = view;
  }
});
