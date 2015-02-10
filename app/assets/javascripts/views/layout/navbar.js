Geofotr.Views.NavShow = Backbone.CompositeView.extend({

  template: JST['layout/navbar'],

  events: {
    'click .sign-out' : 'signout',
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
        Backbone.history.navigate('', { trigger: true })
      },
    });
  },

  initialize: function () {
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
