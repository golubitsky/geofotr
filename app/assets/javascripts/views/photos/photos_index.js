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
    this.listenTo(this.collection, 'add', this.removeMessage);

    this.collection.each(function (photo) {
      this.addPhotoSubview(photo);
    }, this);

    // this.addSubscriptionButton();

    _.extend(this, Backbone.Events);
    this.listenTo(this.collection, 'photo:createSuccess', this.unshiftPhotoSubview);
  },

  removeMessage: function () {
    if (this.messageRemoved) { return; }

    if (this.collection.length) {
      this.messageRemoved = true;
      this.$('.no-photos-message').remove();
    }
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
    if (this.model.isNew() === false) {
      this.$el.html(this.user_template({
        user: this.model,
        photos: this.collection
      }));
    } else {
      this.$el.html(this.template());
    }
    this.attachSubviews();
    this.delegateEvents();
    this.listenForScroll();
    return this;
  },

  listenForScroll: function () {
    var throttledCallback = _.throttle(this.nextPage.bind(this), 200);

    $('#content').scroll(function() {
      if($('#content').scrollTop() + $('#content').height() > $('.photo-list').height()) {
        throttledCallback()
      }
    });
  },

  nextPage: function () {
    var that = this;
    if ($(window).scrollTop() > $(document).height() - $(window).height() - 50) {
      if (that.collection.page_number < that.collection.total_pages) {
        that.collection.fetch({
          data: { page: that.collection.page_number + 1 },
          remove: false
        });
      }
    }
  },

  navigateBack: function () {
    Backbone.history.history.back()
  }

});
