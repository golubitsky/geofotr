Geofotr.Views.UsersListItem = Backbone.CompositeView.extend({

  template: JST['users/users_list_item'],
  tagName: 'li',
  className: 'user-list-item',

  events: {
    'click span.username' : 'navigateToUser',
    'click span.view-photos' : 'navigateToUser'
  },

  navigateToUser: function () {
    Backbone.history.navigate(
      "#users/" + this.model.id,
      { trigger: true }
    );
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.collection = new Geofotr.Collections.Photos();
    this.addSubscriptionButton();
  },

  render: function () {
    this.$el.html(this.template({
      user: this.model
    }));
    this.attachSubviews();
    return this;
  },

  addSubscriptionButton: function () {
    if (this.model.isNew()) { return };
    var subscriptionButton = new Geofotr.Views.Subscription({
      model: this.model,
      collection: this.collection
    });
    this.addSubview('div.subscription-container', subscriptionButton);
  },

});
