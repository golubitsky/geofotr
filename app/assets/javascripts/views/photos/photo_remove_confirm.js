Geofotr.Views.PhotoRemoveConfirm = Backbone.CompositeView.extend({

  template: JST['photos/photo_remove_confirm'],
  className: "remove-confirm-view",
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
