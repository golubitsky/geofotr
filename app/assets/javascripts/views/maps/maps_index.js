Geofotr.Views.MapsIndex = Backbone.CompositeView.extend({

  template: JST['maps/maps_photo'],

  attributes: {
    id: "map-canvas"
  },
  className: "transparent",

  events: {
    'click figure' : 'viewPhoto'
  },

  viewPhoto: function (event) {
    id = event.currentTarget.id

    Backbone.history.navigate(
      '#photos/' + id,
      { trigger: true }
      )
  },

  initialize: function () {
    this.initializeMap();

    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  positionAndShowMap: function () {
    setTimeout(function(){ this.$el.removeClass('transparent')}.bind(this), 0);
    this._map.setCenter({ lat: 0, lng: 0 });
    this._map.setZoom(3);
  },

  render: function () {
    this.$el.empty();
    this.initializeMap();
    return this;
  },

  initializeMap: function(){
    this._markers = {};
     var mapOptions = {
      center: { lat: 0, lng: 0},
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    console.log('map is on the page');
    this.collection.each(function (photo) {
      this.addMarker(photo);
    }, this);

    var that = this;
    google.maps.event.addListenerOnce(this._map, 'idle', function() {
      google.maps.event.trigger(that._map, 'resize');
      that.positionAndShowMap();
    });
  },

  addMarker: function (photo) {
    console.log("add marker");

    if (this._markers[photo.id]) { return };
    var that = this;

    var latLng = new google.maps.LatLng(
      photo.get('latitude'),
      photo.get('longitude')
    );

    var marker = new google.maps.Marker({
      position: latLng,
      map: this._map,
      title: photo.get('caption'),
      photo: photo
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      that.showMarkerInfo(event, marker);
    });

    this._markers[photo.id] = marker;
  },

  removeMarker: function (photo) {
    var marker = this._markers[photo.id];
    marker.setMap(null);
    delete this._markers[photo.id];
  },

  showMarkerInfo: function (event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: this.template({ photo: marker.photo })
    });

    infoWindow.open(this._map, marker);
  }
});
