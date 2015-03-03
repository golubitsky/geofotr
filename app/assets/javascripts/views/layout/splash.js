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

  initialize: function (options) {
    $('#content').removeAttr('overflow');
  },

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
    debugger
  },

  render: function () {
    console.log('splash render')
    this.$el.html(this.template());

    this.attachSubviews();
    return this;
  }
});
