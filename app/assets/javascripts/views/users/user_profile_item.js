Geofotr.Views.UserProfileItem = Backbone.CompositeView.extend({
  template: JST['users/user_profile_item'],

  initialize: function () {
    this.tagName = 'li';
  },

  render: function () {
    console.log('profile');
    this.$el.html(this.template({
      photo: this.model
    }));
    return this;
  }
});
