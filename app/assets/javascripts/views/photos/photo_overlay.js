Geofotr.Views.PhotoOverlay = Backbone.CompositeView.extend({

  template: JST['photos/photo_overlay'],

  className: 'photo-overlay-view',
  initialize: function () {
      this.createLikeButton();
      this.createFollowButton();
      this.addSubview('.like-button', this.likeButtonView);

    this.listenTo(this.model, 'change:likeCount', this.updateLikeCount);
    this.listenTo(this.collection, 'sync', this.updateLikeButton);
  },

  events: {
    'submit .update-photo' : 'submitForm',
    'click .username' : 'navigateToShow',
    'click .view-user' : 'navigateToShow'
  },

  navigateToShow: function () {
    Backbone.history.navigate(
      "#users/" + this.model.get('user_id'),
      { trigger: true }
    );
  },

  updateLikeButton: function () {
    this.removeSubview('.like-button', this.likeButtonView);
    this.createLikeButton();
    this.addSubview('.like-button', this.likeButtonView);
    this.render();
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model }));

    this.attachSubviews();

    return this;
  },

  createLikeButton: function () {
    this.likeButtonView = new Geofotr.Views.Like({
      model: this.model.currentUserLike,
      photo: this.model
    });
    this.likeButtonView.render();
  },

  createFollowButton: function () {
    this.subscriptionButtonView = new Geofotr.Views.Subscription({
      model: this.model,
      collection: this.collection
    });
    this.subscriptionButtonView.render();
  },

  updateLikeCount: function () {
    this.$('.like-count .count').text(this.model.get('likeCount'));
  }
});
