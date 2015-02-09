Geofotr.Views.DropDownView = Backbone.View.extend({

  tagName: 'ul',

  template: JST['layout/dropdown_form'],

  attributes: {
    role: 'menu',
    class: 'dropdown-menu add-menu',
    id: 'dropdown-menu'
  },


  events: {
    'click .new-photo': 'showForm',
    'change #photo': 'handleFile',
    'submit .create-photo' : 'createPhoto',
    'keypress #location' : 'locationRequest',
  },

  initialize: function () {
  },

  locationRequest: function (event) {
    $(event.currentTarget).geocomplete({
      map: this.mapEl,
      details: 'form.create-photo',
      detailsAttribute: 'data-geo',
      markerOptions: { draggable: true },
      mapOptions: {
        mapTypeId: 'satellite',
        zoom: 3
      }
    });
  },

  render: function() {
    console.log('dropdown render')
    var renderedContent = this.template({
      photo: this.model
    });
    this.$el.html(renderedContent);

    this.mapEl = this.$('#dropdown-map-canvas')[0];
    this.initializeMap();

    return this;
  },

  initializeMap: function () {
    var mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    this._map = new google.maps.Map(this.mapEl, mapOptions);

    var that = this;
    var dropButton = document.getElementById('add-dropdown')
    google.maps.event.addDomListener(dropButton, 'click', function() {
        setTimeout(function () {
          google.maps.event.trigger(that._map, 'resize');
          that._map.setCenter({ lat: 0, lng: 0 });
        }, 0);
      }
    );

    $location = this.$('#location');
    $location.on('click', function (event) {
      event.stopPropagation();
    });

    autocomplete = new google.maps.places.Autocomplete($location[0]);
    google.maps.event.addListener(autocomplete, 'place_changed', function (event) {
      event.stopPropagation();
      //event triggered by pressing enter in autocomplete
    });

    //auto update of lat/long fields on drag of marker
    this.$el.geocomplete().bind("geocode:dragged", function(event, result){
      that.setFormLocation(result);
    });

    //allow clicking on map to place a marker unless one exists
    google.maps.event.addListener(this._map, 'click', function(event) {
      if (that.marker) { return };

      that.marker = true;
      that.placeMarker(event.latLng);
    });
  },

  placeMarker: function (location, reset) {
    var that = this;
    var marker = new google.maps.Marker({
      position: location,
      map: that._map,
      draggable: true
    });

    if (reset) {
      this._map.setCenter(location);
      this._map.setZoom(3);
    };

    //set up drag listen!
    this.marker = marker;
    google.maps.event.addListener(that.marker, 'dragend', function () {
      var lat = that.marker.position.k;
      var lng = that.marker.position.D;
      that.setFormLocation({ lat: lat, lng: lng });
    });

    this.setFormLocation({ lat: location.k, lng: location.D });
  },

  setFormLocation: function (location) {
    $('#latitude').val(location.lat);
    $('#longitude').val(location.lng);
    $('#altitude').val(location.alt);
  },
  createPhoto: function(event) {
    event.preventDefault();
    if (this.model.get('photo') !== undefined) {
      params = this.$('form').serializeJSON();
      $submitButton = this.$('input[type=submit]')
      $submitButton.attr('disabled', 'disabled')
      $submitButton.val('Geofotring! (please wait...)')
      var that = this;


      var $otherErrorMsg = $('span');
      $otherErrorMsg.html('There was an error. Please try again!');
      $otherErrorMsg.addClass('alert alert-danger alert-error');

      var success = function (model) {
        that.$('div.photo-errors').empty();
        that.collection.add(model, { merge: true });
        that.$('form.create-photo').replaceWith(that.$newButton);
        that.reset();
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
    }, true);
  },

  reset: function() {
    console.log('reset')
    this.render();
    this.$el.parent().removeClass('open');
  },

  showForm: function() {
    console.log("showForm")
    this.$el.html(this.formTemplate({
      photo: this.model
    }));

    return false;
  },

});
