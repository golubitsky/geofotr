Geofotr.Views.PhotoEdit = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model, 'change', this.render)
    this.photoView = options.photoView
  },

  template: JST['layout/photo_update_form'],
  thumbTemplate: JST['maps/maps_photo'],

  events: {
    'change #photo': 'handleFile',
    'submit .update-photo' : 'updatePhoto',
  },

  render: function() {
    var renderedContent = this.template({
      photo: this.model,
    });
    this.$el.html(renderedContent);

    this.mapEl = this.$('.dropdown-map-canvas')[0];
    this.initializeMap();
    this.bindMapEvents();

    return this;
  },

  initializeMap: function () {

    var mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    this._map = new google.maps.Map(this.mapEl, mapOptions);


    //size/center map on dropdown
    var that = this;


    $location = this.$('#location-update-form');

    this.placeExistingMarker();

    var that = this;
      google.maps.event.addListenerOnce(this._map, 'idle', function() {
        google.maps.event.trigger(that._map, 'resize');
        that.positionAndShowMap();
      });
  },

  placeExistingMarker: function () {
    var latLng = new google.maps.LatLng(
      this.model.get('latitude'),
      this.model.get('longitude')
    );

    this.marker = new google.maps.Marker({
      position: latLng,
      map: this._map,
      draggable: true,
      title: this.model.get('caption')
    });
  },

  positionAndShowMap: function () {
    this._map.setCenter({ lat: 0, lng: 0 });
    this._map.setZoom(1);
    this.$el.parent().toggleClass('transparent')
  },

  scrollToForm: function () {
    $container = $('.photo-edit-container');
    $parent = $container.parent();
    Geofotr.scroll($container[0], $parent[0])
  },

  bindMapEvents: function () {
    var that = this;
    //autocomplete map/marker logic
    autocomplete = new google.maps.places.Autocomplete($location[0]);
    google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
      //problems when pressing enter in form (as opposed to clicking on result)
      var location = autocomplete.getPlace().geometry.location

      that.placeMarker(location);
      var lat = location.lat();
      var lng = location.lng();
      that.setFormLocation({ lat: lat, lng: lng });
    });

    //allow clicking on map to place a marker unless one exists
    google.maps.event.addListener(this._map, 'click', function(event) {
      that.placeMarker(event.latLng);
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();
      that.setFormLocation({ lat: lat, lng: lng });
    });

    this.bindMarkerDragListener();
  },

  bindMarkerDragListener: function () {
    var that = this;
    google.maps.event.addListener(that.marker, 'dragend', function () {
      var lat = that.marker.position.lat();
      var lng = that.marker.position.lng();
      that.setFormLocation({ lat: lat, lng: lng });
    });
  },

  placeMarker: function (location) {
    if (this.marker) { this.marker.setMap(null) };

    this.marker = new google.maps.Marker({
      position: location,
      map: this._map,
      draggable: true
    });

    //pan/zoom map to marker
    this._map.setCenter(location);
    this._map.setZoom(3);

    //set up drag listen!
    this.bindMarkerDragListener();
  },

  setFormLocation: function (location) {
    $('#latitude-update-form').val(location.lat);
    $('#longitude-update-form').val(location.lng);
    $('#altitude-update-form').val(location.alt);
  },

  reset: function() {
    console.log('reset')
    this.render();
    this.$el.parent().removeClass('open');
  },

  updatePhoto: function(event) {
    console.log("form submit");
    event.preventDefault();

    params = this.$('form').serializeJSON();
    $submitButton = this.$('input[type=submit]')
    $submitButton.attr('disabled', 'disabled')
    $submitButton.val('Updating photo (please wait...)')
    var that = this;

    var $otherErrorMsg = $('<span>');
    $otherErrorMsg.html('There was an error. Please try again!');
    $otherErrorMsg.addClass('alert alert-danger alert-error');

    var success = function (model) {

      that.$('div.photo-errors').empty();
      that.collection.add(model, { merge: true });
      that.reset();
      that.photoView.toggleEditForm('',true);
    };

    var error = function (model) {
      that.$('div.error-container').html($otherErrorMsg);
    }
    this.model.save(params, {
      success: success,
      error: error
    });
  }
});
