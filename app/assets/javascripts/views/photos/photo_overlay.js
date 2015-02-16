Geofotr.Views.PhotoOverlay = Backbone.CompositeView.extend({

  template: JST['photos/photo_overlay'],

  className: 'photo-overlay-view',
  initialize: function () {
      this.createLikeButton();
      this.createFollowButton();
      this.addSubview('.like-button', this.likeButtonView);

    this.listenTo(this.model, 'change:likeCount', this.updateLikeCount);
    this.listenTo(this.collection, 'sync', this.render);
  },

  events: {
    'submit .update-photo' : 'submitForm',
    'click .username' : 'navigateToShow',
    'click .view-user' : 'navigateToShow'
  },

  navigateToShow: function () {
    console.log("test")
    Backbone.history.navigate(
      "#users/" + this.model.get('user_id'),
      {trigger: true}
    );
  },

  render: function () {
    console.log('overlay render');
    this.$el.html(this.template({ photo: this.model }));

    this.attachSubviews();

    return this;
  },

  createLikeButton: function () {
    console.log('create like button');
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
