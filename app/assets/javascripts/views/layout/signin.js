Geofotr.Views.SignIn = Backbone.CompositeView.extend({

  template: JST['layout/signin'],

  events: {
    'submit .sign-in' : 'signIn'
  },

  initialize: function () {
    this.model = new Geofotr.Models.User();
  },

  signIn: function (event) {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    $submitButton = this.$('input[type=submit]')
    $submitButton.attr('disabled', 'disabled')
    $submitButton.val('Signing in..')
    var that = this;
    $.ajax({
      url: 'api/session',
      type: 'POST',
      data: params,
      success: function (resp) {
        Geofotr.CURRENT_USER = resp.username
        Geofotr.CURRENT_USER_ID = resp.id
        Geofotr.navBar.render();
        Backbone.history.navigate('', { trigger: true })
      },
      error: function (resp) {
        that.render();
      }
    });
  },

  render: function () {
    console.log('signin render')
    this.$el.html(this.template({
      user: this.model
    }));

    this.attachSubviews();
    return this;
  }
});
