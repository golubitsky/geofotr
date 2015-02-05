Geofotr.Views.UserShowItem = Backbone.CompositeView.extend({
  template: JST['users/user_show_item'],

  initialize: function () {
    this.tagName = 'li';
  },

  render: function () {
    this.$el.html(this.template({
      photo: this.model
    }));
    return this;
  }
});
