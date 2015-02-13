Geofotr.Views.CommentRemoveConfirm = Backbone.CompositeView.extend({

  template: JST['comments/comment_remove_confirm'],
  className: "comment-remove-view",
  events: {
  },

  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }

});
