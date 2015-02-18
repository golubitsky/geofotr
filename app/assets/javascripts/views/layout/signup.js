Geofotr.Views.SignUp = Backbone.CompositeView.extend({

  template: JST['layout/signup'],

  events: {
    'submit .sign-up' : 'signUp'
  },

  className: "splash-page",

  initialize: function () {
    this.model = new Geofotr.Models.User();
  },

  signUp: function (event) {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    $submitButton = this.$('input[type=submit]')
    $submitButton.attr('disabled', 'disabled')
    $submitButton.val('Signing up..')

    var that = this;
    $.ajax({
      url: 'api/users',
      type: 'POST',
      data: params,
      success: function (resp) {
        Geofotr.CURRENT_USER = resp.username
        Geofotr.CURRENT_USER_ID = resp.id
        Geofotr.navBar.render();
        Backbone.history.navigate('', { trigger: true })
      },
      error: function (resp) {
        //TO DO error message
        that.render();
      }
    });
  },


  render: function () {
    console.log('signup render')
    this.$el.html(this.template({
      user: this.model
    }));

    this.attachSubviews();
    return this;
  }
});
