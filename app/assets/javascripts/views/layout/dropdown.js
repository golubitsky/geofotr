Geofotr.Views.DropDownView = Backbone.View.extend({
  template: JST['layout/dropdown_form'],

  events: {
    'change #photo': 'handleFile',
    // 'change #location': 'stopPropagation',
    'submit .create-photo' : 'createPhoto',
  },

  stopPropagation: function (event) {
    event.preventDefault();
    event.stopPropagation();
  },

  initialize: function () {
    this.markers = [];
  },

  render: function() {
    console.log('dropdown render')
    var renderedContent = this.template({
      photo: this.model
    });
    this.$el.html(renderedContent);

    this.mapEl = this.$('#dropdown-map-canvas')[0];

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
    var dropButton = document.getElementById('add-dropdown')
    google.maps.event.addDomListener(dropButton, 'click', function() {
        setTimeout(function () {
          google.maps.event.trigger(that._map, 'resize');
          that._map.setCenter({ lat: 0, lng: 0 });
        }, 0);
      }
    );

    //prevent disappearing bootstrap dropdown
    $location = this.$('#location');
    // $location.on('click', function (event) {
    //   event.stopPropagation();
    // });
  },

  bindMapEvents: function () {
    var that = this;
    //autocomplete map/marker logic
    autocomplete = new google.maps.places.Autocomplete($location[0]);
    google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
      //problems when pressing enter in form (as opposed to clicking on result)
      var location = autocomplete.getPlace().geometry.location

      that.placeMarker(location);
      var lat = location.k;
      var lng = location.D;
      that.setFormLocation({ lat: lat, lng: lng });
    });

    //allow clicking on map to place a marker unless one exists
    google.maps.event.addListener(this._map, 'click', function(event) {
      that.placeMarker(event.latLng);
      var lat = event.latLng.k;
      var lng = event.latLng.D;
      that.setFormLocation({ lat: lat, lng: lng });
    });
  },

  placeMarker: function (location, reset) {
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
    var that = this;
    google.maps.event.addListener(that.marker, 'dragend', function () {
      var lat = that.marker.position.k;
      var lng = that.marker.position.D;
      that.setFormLocation({ lat: lat, lng: lng });
    });
  },

  setFormLocation: function (location) {
    $('#latitude').val(location.lat);
    $('#longitude').val(location.lng);
    $('#altitude').val(location.alt);
  },

  handleFile: function (event) {
    var file = event.currentTarget.files[0];
    var that = this;
    var reader = new FileReader();

    $(event.target).fileExif(this.handleExif.bind(this));

    reader.onload = function(e) {
      // note that this isn't saving
      that.model.set('photo', this.result);
    }

    reader.readAsDataURL(file);
  },

  handleExif: function (exif) {
    var lat = exif.GPSLatitude[0] + (exif.GPSLatitude[1]/60) + (exif.GPSLatitude[2]/3600)
    var lng = exif.GPSLongitude[0] + (exif.GPSLongitude[1]/60) + (exif.GPSLongitude[2]/3600)
    if (exif.GPSLatitudeRef === "S") { lat *= -1 };
    if (exif.GPSLongitudeRef === "W") { lng *= -1 };

    this.setFormLocation({
      lat: lat,
      lng: lng,
      alt: exif.GPSAltitude
    });

    this.placeMarker({
      lat: lat,
      lng: lng
    });
  },

  reset: function() {
    console.log('reset')
    this.render();
    this.$el.parent().removeClass('open');
  },

  // showForm: function() {
  //   console.log("showForm")
  //   this.$el.html(this.formTemplate({
  //     photo: this.model
  //   }));

  //   return false;
  // },

  createPhoto: function(event) {
    console.log("form submit");
    event.preventDefault();
    if (this.model.get('photo') !== undefined) {
      params = this.$('form').serializeJSON();
      $submitButton = this.$('input[type=submit]')
      $submitButton.attr('disabled', 'disabled')
      $submitButton.val('Geofotring! (please wait...)')
      var that = this;

      var $otherErrorMsg = $('<span>');
      $otherErrorMsg.html('There was an error. Please try again!');
      $otherErrorMsg.addClass('alert alert-danger alert-error');

      var success = function (model) {

        that.$('div.photo-errors').empty();
        that.collection.add(model, { merge: true });
        that.reset();
        Backbone.history.navigate(
          '#photos/' + model.id,
          { trigger: true }
          )
      };

      var error = function (model) {
        that.$('div.error-container').html($otherErrorMsg);
      }
      this.model.save(params, {
        success: success,
        error: error
      });

    } else {
      var $fileErrorMsg = $('<span>');
      $fileErrorMsg.text('Please select a file to Geofotr!');
      $fileErrorMsg.addClass('alert alert-danger alert-error');
      this.$('div.error-container').html($fileErrorMsg);
    };
  },
});
