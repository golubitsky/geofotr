Geofotr.Views.MapsIndex = Backbone.CompositeView.extend({

  template: JST['maps/maps_photo'],

  attributes: {
    id: "map-canvas"
  },

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

    this._markers = {};

    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);

    this.collection.each(function (photo) {
      this.addMarker(photo);
    }, this);
  },

  initializeMap: function () {
    var mapOptions = {
      center: { lat: 0, lng: 0},
      zoom: 3
    };

    this._map = new google.maps.Map(this.el, mapOptions);
  },

  addMarker: function (photo) {
    console.log("add marker");
    console.log(photo.get('latitude'));
    console.log(photo.get('longitude'));
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
    this.template({ photo: marker.photo });
    var infoWindow = new google.maps.InfoWindow({
      content: this.template({ photo: marker.photo })
    });

    infoWindow.open(this._map, marker);
  }
});
