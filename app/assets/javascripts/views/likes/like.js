Geofotr.Views.Like = Backbone.CompositeView.extend({

  template: JST['likes/like'],

  events: {
    'click button.like-photo' : 'likePhoto',
    'click button.unlike-photo' : 'unlikePhoto'
  },

  initialize: function (options) {
    this.photo = options.photo;
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    this.$el.html(this.template({ like: this.model }));
    return this;
  },

  likePhoto: function (event) {
    event.preventDefault();

    var $button = $(event.target);
    $button.text('liking..');
    $button.attr('disabled', 'disabled');

    var that = this;

    this.model.save({}, {
      success: function () {
        var likeCount = that.photo.get('likeCount');
        var newLikeCount = likeCount + 1;
        that.photo.set('likeCount', newLikeCount);
        that.render();
      }
    });
  },

  unlikePhoto: function (event) {
    event.preventDefault();

    var $button = $(event.target);
    $button.text('unliking..');
    $button.attr('disabled', 'disabled');

    var that = this;

    this.model.destroy({
      success: function () {
        var likeCount = that.photo.get('likeCount');
        var newLikeCount = likeCount - 1
        that.photo.set('likeCount', newLikeCount);
        that.model.unset('id');
        that.render();
      }
    });
  }

});
