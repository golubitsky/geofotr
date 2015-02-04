Geofotr.Views.PhotosIndex = Backbone.CompositeView.extend({

  template: JST['photos/photos_index'],
  form_template: JST['photos/photo_form'],

  events: {
    "click button.create" : "openForm",
    "click button.submit" : "submitForm",
    'change #photo': 'handleFile'
  },
  initialize: function () {
    this.listenTo(this.collection, 'add', this.addPhotoSubview);
    this.listenTo(this.collection, 'remove', this.removePhotoSubview);

    this.collection.each(function (photo) {
      this.addPhotoSubview(photo);
    }, this);

    this.model = new Geofotr.Models.Photo();
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

  openForm: function (event) {
    var form = this.form_template({ buttonText: "Upload new photo!", photo: this.model });
    $(event.target).replaceWith(form);
  },

  submitForm: function () {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    var that = this;

    var success = function (model) {
      that.collection.add(model, { merge: true });
      Backbone.history.navigate('', { trigger: true })
    };

    var error = function (model) {
      console.log('error')
    }

    this.model.save(params, {
      success: success,
      error: error
    });
  },

  addPhotoSubview: function (photo) {
    var photoListItem = new Geofotr.Views.PhotosListItem({
      model: photo
    });
    this.addSubview('ul', photoListItem);
  },

  removePhotoSubview: function (photo) {
    this.subviews('ul').forEach(function(subview) {
      if (subview.model === photo) {
        this.removeSubview('ul', subview);
      }
    }.bind(this));
  },

  render: function () {
    // console.log('index render');
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }

});
