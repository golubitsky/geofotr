Geofotr.Views.DropDownView = Backbone.View.extend({
  attributes: {
    role: 'menu',
    class: 'dropdown-menu add-menu'
  },

  createPhoto: function(event) {
    event.preventDefault();
    if (this.model.get('photo') !== undefined) {
      params = this.$('form').serializeJSON();
      $submitButton = this.$('input[type=submit]')
      $submitButton.attr('disabled', 'disabled')
      $submitButton.val('Geofotring! (please wait...)')
      var that = this;

      var success = function (model) {
        that.$('div.photo-errors').empty();
        that.collection.add(model, { merge: true });
        that.$('form.create-photo').replaceWith(that.$newButton);
        that.reset();
      };

      var error = function (model) {
        that.$('div.alert-error').html('There was an error. Please try again!');
      }
      this.model.save(params, {
        success: success,
        error: error
      });

    } else {
      this.$('div.alert-error').html('Please select a file to Geofotr!');
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

  template: JST['layout/dropdown_form'],

  render: function() {
    var renderedContent = this.template({
      photo: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  reset: function() {
    this.render();
    this.$el.parent().removeClass('open');
  },

  showForm: function() {
    this.$el.html(this.formTemplate({
      photo: this.model
    }));
    return false;
  },

  tagName: 'ul'
});
