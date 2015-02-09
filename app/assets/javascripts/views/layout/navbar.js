Geofotr.Views.NavShow = Backbone.CompositeView.extend({

  template: JST['layout/navbar'],

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
