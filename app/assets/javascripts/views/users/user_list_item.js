Geofotr.Views.UsersListItem = Backbone.CompositeView.extend({

  template: JST['users/users_list_item'],

  events: {
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }

});
