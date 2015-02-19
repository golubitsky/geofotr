Geofotr.Views.PhotoShow = Backbone.CompositeView.extend({

  template: JST['photos/photo_show'],
  className: "photoShow",
  events: {
    'click .navigate-back' : 'navigateBack'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
    this.model.fetch();
  },

  render: function () {
    this.$el.html(this.template({ photo: this.model }));
    this.attachSubviews();
    return this;
  },

  navigateBack: function () {
    Backbone.history.history.back()
  }

});
