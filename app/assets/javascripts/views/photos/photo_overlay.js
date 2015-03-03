Geofotr.Views.PhotoOverlay = Backbone.CompositeView.extend({

  template: JST['photos/photo_overlay'],

  className: 'photo-overlay-view',
  initialize: function () {
      this.createLikeButton();
      // this.createFollowButton();
      this.addSubview('.like-button', this.likeButtonView);

    this.listenTo(this.model, 'change:likeCount', this.updateLikeCount);
    this.listenTo(this.collection, 'sync', this.updateLikeButton);
  },

  events: {
    'submit .update-photo' : 'submitForm',
    'click .username' : 'navigateToShow',
    'click .view-user' : 'navigateToShow',
    'click .follow-user' : 'followUser',
    'click .unfollow-user' : 'unfollowUser'
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

  followUser: function () {
    debugger
    var $button = this.$('.follow-user');
    $button.attr('disabled', 'disabled');
    $button.text('Following..');

    this.model.currentUserSubscription.set({
      follower_id: Geofotr.CURRENT_USER_ID,
      followee_id: this.model.get('user_id')
    });

    this.model.currentUserSubscription.save({}, {
      success: function () {
        debugger
        $button.removeClass();
        $button.text('Unfollow user');
        $button.addClass('unfollow-user');
        $button.removeAttr('disabled');
      }
    });


  },

  unfollowUser: function () {
    var that = this;
    var $button = this.$('.unfollow-user')
    $button.attr('disabled', 'disabled');
    $button.text('Unfollowing..');

    this.model.currentUserSubscription.destroy({
      success: function () {
        debugger
        that.model.currentUserSubscription.unset('id');
        $button.removeClass();
        $button.text('Follow user');
        $button.addClass('follow-user')
        $button.removeAttr('disabled');
      }
    });
  },

  render: function () {
    this.$el.html(this.template({
      photo: this.model,
      numberOfComments: this.model.comments().length
    }));

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

  // createFollowButton: function () {
  //   this.subscriptionButtonView = new Geofotr.Views.Subscription({
  //     model: this.model,
  //     collection: this.collection
  //   });
  //   this.subscriptionButtonView.render();
  // },

  updateLikeCount: function () {
    this.$('.like-count .count').text(this.model.get('likeCount'));
  }
});
