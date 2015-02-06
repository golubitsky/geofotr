Geofotr.Views.PhotosIndex = Backbone.CompositeView.extend({

  template: JST['photos/photos_index'],
  form_template: JST['photos/photo_form'],
  user_template: JST['users/user_show'],

  events: {
    'click button.create' : 'openNewForm',
    'submit .new-photo' : 'submitForm',
    'change #photo': 'handleFile',
    'click button.follow' : 'followUser',
    'click button.unfollow' : 'unfollowUser'
  },
  initialize: function () {
    this.listenTo(this.collection, 'add', this.addPhotoSubview);
    this.listenTo(this.collection, 'remove', this.removePhotoSubview);
    this.listenTo(this.model, 'sync', this.render);

    this.collection.each(function (photo) {
      this.addPhotoSubview(photo);
    }, this);
    this.newPhoto = new Geofotr.Models.Photo();
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

  openNewForm: function (event) {
    var form = this.form_template({
      photo: this.model
    });

    this.$newButton = $(event.target);
    $(event.target).replaceWith(form);
  },

  submitForm: function () {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    var that = this;

    var success = function (model) {
      that.collection.add(model, { merge: true });
      //this is for later, when this function wont navigate to root anymore
      $('form').replaceWith('<button class="create">Upload new photo!</button>');
      that.$('form.new-photo').replaceWith(that.$newButton);
    };

    var error = function (model) {
      console.log('error')
    }

    this.newPhoto.save(params, {
      success: success,
      error: error
    });
  },

  followUser: function (event) {
    event.preventDefault();

    var $button = $(event.target)
    $button.text('following..');
    $button.attr('disabled', 'disabled');

    var subscription = new Geofotr.Models.Subscription({
      follower_id: Geofotr.CURRENT_USER_ID,
      followee_id: this.model.id
    });

    var that = this;

    subscription.save({}, {
      success: function (response) {
        that.model.set('subscriptionId', response.get('subscriptionId'));
        response.photos().each(function (photo) {
          that.collection.add(photo, { merge: true });
        });
        $button.removeAttr('disabled');
        $button.removeClass('follow');
        $button.addClass('unfollow');
        $button.text('Unfollow user');
      }
    });
  },

  unfollowUser: function (event) {
    event.preventDefault();

    var $button = $(event.target)
    $button.text('unfollowing..');
    $button.attr('disabled', 'disabled');

    var subscription = new Geofotr.Models.Subscription({ id: this.model.get('subscriptionId') })

    subscription.destroy({
      success: function () {
        $button.removeAttr('disabled');
        $button.removeClass('unfollow');
        $button.addClass('follow');
        $button.text('Follow user');
      }
    });
  },

  addPhotoSubview: function (photo) {
    var photoListItem = new Geofotr.Views.PhotosListItem({
      model: photo,
      collection: this.collection
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

    console.log('index render');
    if (this.model.isNew()===false) {
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
