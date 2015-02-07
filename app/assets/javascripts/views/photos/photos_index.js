Geofotr.Views.PhotosIndex = Backbone.CompositeView.extend({

  template: JST['photos/photos_index'],
  form_template: JST['photos/photo_form'],
  user_template: JST['users/user_show'],
  className: 'photo-feed',

  events: {
    'click button.new-photo' : 'openNewForm',
    'submit .create-photo' : 'submitForm',
    'change #photo': 'handleFile',
  },

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addPhotoSubview);
    this.listenTo(this.collection, 'remove', this.removePhotoSubview);
    this.listenTo(this.model, 'sync', this.render);

    this.collection.each(function (photo) {
      this.addPhotoSubview(photo);
    }, this);
    this.newPhoto = new Geofotr.Models.Photo();
    this.addSubscriptionButton();
  },

  addSubscriptionButton: function () {
    if (this.model.isNew()) { return };
    var subscriptionButton = new Geofotr.Views.Subscription({
      model: this.model,
      collection: this.collection
    });
    this.addSubview('div.subscription-container', subscriptionButton);
  },

  handleFile: function (event) {
    var file = event.currentTarget.files[0];
    var that = this;
    var reader = new FileReader();
    reader.onload = function(e) {
      // note that this isn't saving
      that.newPhoto.set('photo', this.result);
    }
    reader.readAsDataURL(file);
  },

  openNewForm: function (event) {
    var form = this.form_template({
      photo: this.model
    });

    this.$newButton = $(event.target);
    $(event.target).replaceWith(form);
  },

  submitForm: function (event) {
    event.preventDefault();
    if (this.newPhoto.get('photo') !== undefined) {
      params = this.$('form').serializeJSON();
      $submitButton = this.$('input[type=submit]')
      $submitButton.attr('disabled', 'disabled')
      $submitButton.val('Geofotring! (please wait...)')
      var that = this;

      var success = function (model) {
        that.$('div.photo-errors').empty();
        that.collection.add(model, { merge: true });
        that.$('form.create-photo').replaceWith(that.$newButton);
      };

      var error = function (model) {
        that.$('div.photo-error').html('There was an error. Please try again!');
      }

      this.newPhoto.save(params, {
        success: success,
        error: error
      });
    } else {
      this.$('div.photo-error').html('Please select a file to Geofotr!');
    };
  },

  addPhotoSubview: function (photo) {
    var photoListItem = new Geofotr.Views.PhotosListItem({
      model: photo,
      collection: this.collection
    });
    this.addSubview('ul.photo-list', photoListItem);
  },

  removePhotoSubview: function (photo) {
    this.subviews('ul.photo-list').forEach(function(subview) {
      if (subview.model === photo) {
        this.removeSubview('ul.photo-list', subview);
      }
    }.bind(this));
  },

  render: function () {
    console.log('index render');
    if (this.model.isNew() === false) {
      this.$el.html(this.user_template({
        user: this.model
      }));
    } else {
      this.$el.html(this.template());
    }
    this.attachSubviews();
    return this;
  }

});
