window.Geofotr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Geofotr.Routers.Router({
      "$rootEl" : $("div#content")
      });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Geofotr.initialize();
});
