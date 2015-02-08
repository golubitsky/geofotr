Geofotr.Views.DropDownView = Backbone.View.extend({

  tagName: 'ul',

  template: JST['layout/dropdown_form'],

  attributes: {
    role: 'menu',
    class: 'dropdown-menu add-menu',
    id: 'dropdown-menu'
  },

  initialize: function () {
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
      center: { lat: 0, lng: 0},
      zoom: 2
    };

    this._map = new google.maps.Map(this.mapEl, mapOptions);

    var that = this;
    var dropButton = document.getElementById('add-dropdown')
    google.maps.event.addDomListener(dropButton, 'click', function() {
        setTimeout(function () {
          google.maps.event.trigger(that._map, 'resize');
        }, 0);
      }
    );
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
    reader.onload = function(e) {
      // note that this isn't saving
      that.model.set('photo', this.result);
    }
    reader.readAsDataURL(file);
  },

  events: {
    'click .new-photo': 'showForm',
    'change #photo': 'handleFile',
    'submit .create-photo' : 'createPhoto',
  },

  reset: function() {
    this.render();
    this.$el.parent().removeClass('open');
  },

  showForm: function() {
    console.log("test")
    this.$el.html(this.formTemplate({
      photo: this.model
    }));

    return false;
  },

});
