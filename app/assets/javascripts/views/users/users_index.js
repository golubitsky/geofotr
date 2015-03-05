Geofotr.Views.UsersIndex = Backbone.CompositeView.extend({

  template: JST['users/users_index'],

  className: 'user-list-container',

  events: {
  },

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addUserSubview);
    this.listenTo(this.collection, 'remove', this.removeUserSubview);

    this.collection.each(function (user) {
      this.addUserSubview(user);
    }, this);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addUserSubview: function (user) {
    var userListItem = new Geofotr.Views.UsersListItem({
      model: user,
    });
    this.addSubview('ul.user-list', userListItem);
  },

  removeUserSubview: function (user) {
    this.subviews('ul.user-list').forEach(function(subview) {
      if (subview.model === user) {
        this.removeSubview('ul.user-list', subview);
      }
    }.bind(this));
  },

});
