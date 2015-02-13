Geofotr.Views.Subscription = Backbone.CompositeView.extend({

    template: JST['subscriptions/subscription'],

    events: {
      'click span.follow' : 'followUser',
      'click span.unfollow' : 'unfollowUser'
    },

    initialize: function () {
      // this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      console.log('subscription render');
      this.$el.html(this.template({ user: this.model }));
      return this;
    },

    followUser: function (event) {
      event.preventDefault();

      var $button = $(event.target)
      $button.text('following..');
      $button.attr('disabled', 'disabled');

      var subscription = new Geofotr.Models.Subscription({
        follower_id: Geofotr.CURRENT_USER_ID,
        followee_id: this.model.id
      });

      var that = this;

      subscription.save({}, {
        success: function (response) {
          that.model.set('subscriptionId', response.get('subscriptionId'));
          response.photos().each(function (photo) {
            that.collection.add(photo, { merge: true });
          });
        }
      });
    },

  unfollowUser: function (event) {
    event.preventDefault();

    var $button = $(event.target)
    $button.text('unfollowing..');
    $button.attr('disabled', 'disabled');

    var subscription = new Geofotr.Models.Subscription({ id: this.model.get('subscriptionId') })

    var that = this;

    subscription.destroy({
      success: function () {
        that.model.unset('subscriptionId');
        that.model.fetch();
      }
    });
  },
});
