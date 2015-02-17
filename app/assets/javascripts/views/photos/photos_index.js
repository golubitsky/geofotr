Geofotr.Views.PhotosIndex = Backbone.CompositeView.extend({

  template: JST['photos/photos_index'],
  user_template: JST['users/user_show'],
  className: 'photo-feed',

  events: {
    'click .navigate-back' : 'navigateBack'
  },

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addPhotoSubview);
    this.listenTo(this.collection, 'remove', this.removePhotoSubview);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.test);

    this.collection.each(function (photo) {
      this.addPhotoSubview(photo);
    }, this);

    this.addSubscriptionButton();

    _.extend(this, Backbone.Events);
    this.listenTo(this.collection, 'photo:createSuccess', this.unshiftPhotoSubview);
  },

  test: function () {
    debugger
  },

  addSubscriptionButton: function () {
    if (this.model.isNew()) { return };
    var subscriptionButton = new Geofotr.Views.Subscription({
      model: this.model,
      collection: this.collection
    });
    this.addSubview('div.subscription-container', subscriptionButton);
  },

  addPhotoSubview: function (photo) {
    var photoListItem = new Geofotr.Views.PhotosListItem({
      model: photo,
      collection: this.collection
    });
    this.addSubview('ul.photo-list', photoListItem);
  },

  unshiftPhotoSubview: function (photo) {
    console.log('unshift');
    var photoListItem = new Geofotr.Views.PhotosListItem({
      model: photo,
      collection: this.collection
    });

    this.unshiftSubview('ul.photo-list', photoListItem);
  },

  removePhotoSubview: function (photo) {
    this.subviews('ul.photo-list').forEach(function(subview) {
      if (subview.model === photo) {
        this.removeSubview('ul.photo-list', subview);
      }
    }.bind(this));
  },

  render: function () {
    console.log('index render');
    debugger
    if (this.model.isNew() === false) {
      this.$el.html(this.user_template({
        user: this.model
      }));
    } else {
      this.$el.html(this.template());
    }
    this.attachSubviews();
    this.listenForScroll();
    return this;
  },

  listenForScroll: function () {
    $(window).off("scroll"); // remove previous listeners
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
    $(window).on("scroll", throttledCallback);
  },

  nextPage: function () {
    var view = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (view.collection.page_number < view.collection.total_pages) {
        view.collection.fetch({
          data: { page: view.collection.page_number + 1 },
          remove: false
        });
      }
    }
  },

  navigateBack: function () {
    Backbone.history.history.back()
  }

});
