Geofotr.Views.MapsIndex = Backbone.CompositeView.extend({
  // Initialization
  template: JST['maps/maps_index'],

  attributes: {
    id: "map-canvas"
  },

  render: function () {
    // ONLY CALL THIS ONCE!
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167},
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);
  }
});
