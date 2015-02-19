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

  render: function () {
    console.log('signin render')
    this.$el.html(this.template({
      user: this.model,
      pageTitle: this.pageTitle
    }));

    this.attachSubviews();
    return this;
  },

  validateAndSubmit: function (event) {
    event.preventDefault();

    var params = this.$('form').serializeJSON();
    var password = params.user.password;
    var passwordConfirmation = params.user.password_confirmation;
    var submit = true;
    var errors = [];
    var $errors = this.$('.errors');
    $errors.empty();
    if (!this.validatePassword(password)) {
      submit = false;
      var $error = $('<span>');
      $error.addClass("col-xs-12");
      $error.text("Please enter a password having at least 6 characters.");
      errors.push($error);
    };

    if (!this.validatePasswordConfirmation(password, passwordConfirmation)) {
      submit = false;
      var $error = $('<span>');
      $error.addClass("col-xs-12");
      $error.text("Please make sure your passwords match.");
      errors.push($error);
    }

    if (submit) {
      this.submit(params)
    } else {
      errors.forEach(function(error){
        this.$('.errors').append(error);
      });

      $errors.removeClass('hidden');

      setTimeout(function () {
        $errors.removeClass('transparent');
      }, 0);
    }

  },

  validatePassword: function (password) {
    if (password.length < 6) {
      return false;
    };
    return true;
  },

  validatePasswordConfirmation: function(password, passwordConfirmation) {
    if (this.pageTitle === 'Sign in') { return true }

    if (password !== passwordConfirmation) { return false }
    return true;
  },

  submit: function (params) {
    $submitButton = this.$('input[type=submit]');
    $submitButton.attr('disabled', 'disabled');
    $submitButton.val('Signing in..');

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
  }
});
