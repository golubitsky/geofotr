Geofotr.Views.Authenticate = Backbone.CompositeView.extend({

  template: JST['layout/authenticate'],

  events: {
    'submit .sign-in' : 'validateAndSubmit',
    'submit .sign-up' : 'validateAndSubmit'
  },

  className: "splash-page",

  initialize: function (options) {
    this.model = new Geofotr.Models.User();
    this.url = options.url;
    this.pageTitle = options.pageTitle;
  },

  validateAndSubmit: function (event) {
    event.preventDefault();
    var params = this.$('form').serializeJSON();
    var pass = params.user.password;
    if (this.validatePassword(pass)) {
      this.submit(params)
    } else {
      console.log("password too short")
    }
  },

  validatePassword: function (password) {
    if (password.length < 6) {
      return false;
    };
    return true;
  },

  submit: function (params) {
    $submitButton = this.$('input[type=submit]')
    $submitButton.attr('disabled', 'disabled')
    $submitButton.val('Signing in..')

    var that = this;
    $.ajax({
      url: that.url,
      type: 'POST',
      data: params,

      success: function (resp) {
        Geofotr.CURRENT_USER = resp.username
        Geofotr.CURRENT_USER_ID = resp.id
        Geofotr.navBar.render();
        Backbone.history.navigate('', { trigger: true })
      },
      error: function (resp) {
        debugger
        //TO DO error message
        that.render();
      }
    });
  },

  render: function () {
    console.log('signin render')
    this.$el.html(this.template({
      user: this.model,
      pageTitle: this.pageTitle
    }));

    this.attachSubviews();
    return this;
  }
});
