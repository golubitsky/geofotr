Geofotr.Views.PhotosListItem = Backbone.CompositeView.extend({
  template: JST['photos/photos_list_item'],
  form_template: JST['photos/photo_edit_form'],
  tagName: 'li',
  className: 'list-group-item',

  initialize: function () {
    this.addCommentsIndex();
    this.addLikeButton();
    this.listenTo(this.model, 'change', this.render)
    this.listenTo(this.model, 'change:likeCount', this.render)
  },

  events: {
    'click button.view-photo' : 'viewPhoto',
    'click button.edit-photo' : 'openEditForm',
    'submit .update-photo' : 'submitForm',
    'click button.destroy-photo' : 'destroyPhoto',
  },

  render: function () {
    console.log('photo item render')
    this.$el.html(this.template({
      photo: this.model
    }));

    this.attachSubviews();
    return this;
  },

  addCommentsIndex: function () {
    var commentsIndex = new Geofotr.Views.CommentsIndex({
      collection: this.model.comments(),
      model: this.model,
      photos: this.collection
    });
    this.addSubview('div.comments-container', commentsIndex);
  },

  addLikeButton: function () {
    var likeButtonView = new Geofotr.Views.Like({
      model: this.model.currentUserLike,
      photo: this.model
    });
    this.addSubview('div.like-button', likeButtonView);
  },

  viewPhoto: function () {
    Backbone.history.navigate(
      '#photos/' + this.model.id,
      { trigger: true }
      )
  },

  // OLD VERSION
  // openEditForm: function (event) {
  //   console.log('open edit form')
  //   var form = this.form_template({
  //     photo: this.model
  //   });

  //   this.$buttons = this.$('.photo-buttons');
  //   this.$buttons.replaceWith(form);
  // },

  openEditForm: function (event) {
    console.log('new open edit form');

    $photoForm = $('#photo-edit')
    $photoForm.removeClass('hidden');

    setTimeout(function () {
        $photoForm.removeClass('transparent')
      }, 50);

    Geofotr.photoToEdit.set(this.model.attributes);
    // this.$buttons = this.$('.photo-buttons');
    // this.$buttons.replaceWith(form);
  },

  submitForm: function (event) {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    var that = this;

    var success = function (model) {
      that.collection.add(model, { merge: true });
      that.$('form.update-photo').replaceWith(that.$buttons);
    };

    var error = function (model) {
      console.log('error')
    }

    this.model.save(params, {
      success: success,
      error: error
    });
  },

  destroyPhoto: function (event) {
    event.preventDefault();
    this.model.destroy();
  }
});
