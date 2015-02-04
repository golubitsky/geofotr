Geofotr.Views.PhotoShow = Backbone.CompositeView.extend({

  template: JST['photos/photo_show'],

  events: {
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model }));
    this.attachSubviews();
    return this;
  }

});
