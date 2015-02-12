Geofotr.Views.PhotoOverlay = Backbone.CompositeView.extend({

  template: JST['photos/photo_overlay'],

  initialize: function () {
    if (Geofotr.CURRENT_USER) {
      this.createLikeButton();
      this.addSubview('.like-button', this.likeButtonView);
    }

    this.listenTo(this.model, 'change:likeCount', this.updateLikeCount);
  },

  events: {
    'submit .update-photo' : 'submitForm',
  },

  render: function () {
    console.log('overlay render');
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

  updateLikeCount: function () {
    this.$('.count').html(this.model.get('likeCount'));
  }
});
