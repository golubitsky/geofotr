Geofotr.Views.NavShow = Backbone.CompositeView.extend({

  template: JST['layout/navbar'],

  events: {
    'click .sign-out' : 'signout',
    'click .navbar-map' : 'highlightSelected',
    'click .navbar-feed' : 'highlightSelected',
    'click .navbar-current-user' : 'highlightSelected',
    'click .navbar-users' : 'highlightSelected',
    'click .navbar-signup' : 'highlightSelected',
    'click .navbar-signin' : 'highlightSelected'
  },

  highlightSelected: function (event) {
    this.$highlighted.removeClass('navbar-highlight');
    this.$highlighted = this.$(event.currentTarget);
    this.$highlighted.addClass('navbar-highlight');
  },

  signout: function () {
    var that = this;
    $.ajax({
      url: 'api/session',
      type: 'DELETE',
      success: function () {
        Geofotr.CURRENT_USER = ""
        Geofotr.CURRENT_USER_ID = ""
        Geofotr.navBar.render();
        Geofotr.photos.fetch();
        Backbone.history.navigate('#', { trigger: true })
      },
    });
  },

  initialize: function () {
    this.$highlighted = this.$('div');
    this.dropdownView = new Geofotr.Views.DropDownView({
      collection: Geofotr.photos,
      model: new Geofotr.Models.Photo()
    })

    this.addSubview('#photo-dropdown-container', this.dropdownView);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});
