Geofotr.Views.Splash = Backbone.CompositeView.extend({

  template: JST['layout/splash'],

   events: {
    'click span.signin' : 'navigateToSignin',
    'click span.signup' : 'navigateToSignup',
    'click span.explore-photos' : 'explorePhotos',
    'click span.explore-map' : 'exploreMap',
    'click span.signin-guest' : 'signinGuest',
  },
  className: "splash-page background row",

  navigateToSignin: function (event) {
    Backbone.history.navigate('#/users/signin', { trigger: true })
  },

  navigateToSignup: function (event) {
    Backbone.history.navigate('#/users/signup', { trigger: true })
  },

  explorePhotos: function (event) {
    Backbone.history.navigate('#/photos', { trigger: true })
  },

  exploreMap: function (event) {
    Backbone.history.navigate('#/map', { trigger: true })
  },

  signinGuest: function (event) {
    var params = {};
    params['user'] = {};
    params['user']['username'] = 'michelangelo';
    params['user']['password'] = 'password';

    $.ajax({
      url: 'api/session',
      type: 'POST',
      data: params,
      success: function (resp) {
        Geofotr.CURRENT_USER = resp.username
        Geofotr.CURRENT_USER_ID = resp.id
        Geofotr.navBar.render();
        Backbone.history.navigate('#/photos', { trigger: true })
      }
    });
  },

  render: function () {
    this.$el.html(this.template());

    this.attachSubviews();
    return this;
  }
});
