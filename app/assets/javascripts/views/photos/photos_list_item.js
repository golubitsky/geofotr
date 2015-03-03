Geofotr.Views.PhotosListItem = Backbone.CompositeView.extend({
  template: JST['photos/photos_list_item'],
  form_template: JST['photos/photo_edit_form'],
  tagName: 'li',
  className: 'photo-list-item',

  initialize: function () {
    // this.addCommentsIndex();
    this.addPhotoOverlay();

    //if ever necessary to change render method, need to make sure not to listen on change:likeCount;
    this.listenTo(this.model, 'change:caption location latitude longitude', this.render)
  },

  events: {
    'click span.view-photo' : 'viewPhoto',
    'click span.edit-photo' : 'toggleEditForm',
    'click span.comment-photo' : 'toggleCommentView',
    'click .cancel' : 'toggleEditForm',
    'click span.remove-photo' : 'toggleConfirmRemovePhoto',
    'click span.confirm-remove-photo' : 'destroyPhoto',
    'click span.cancel-remove-photo' : 'toggleConfirmRemovePhoto'
  },

  render: function () {
    console.log('photo item render')
    this.$el.html(this.template({
      photo: this.model
    }));

    this.attachSubviews();
    return this;
  },

//comments
  toggleCommentView: function (event) {
    if (this.commentOpen) {
      this.removeCommentView(event);
      this.commentOpen = false
    } else {
      this.addCommentView(event);
      this.commentOpen = true
    }
  },

  addCommentView: function (event) {
    this.commentsIndex = new Geofotr.Views.CommentsIndex({
      collection: this.model.comments(),
      model: this.model,
      photos: this.collection
    });

    Geofotr.scrollTo(this.$('.photo'));
    this.$commentsContainer = this.$('div.comments-container');

    this.$commentsContainer.toggleClass('transparent');
    this.$commentsContainer.html(this.commentsIndex.render().$el);
  },


  removeCommentView: function () {
    Geofotr.scrollFrom(this.$('.photo'));

    this.$commentsContainer.on('transitionend', this.commentsIndex.remove.bind(this.commentsIndex));
    this.$commentsContainer.toggleClass('transparent');
  },

//edit form
  toggleEditForm: function (event, flashSuccess) {
    if (this.editOpen) {
      this.removeEditForm(flashSuccess);
      this.editOpen = false
    } else {
      this.addEditForm();
      this.editOpen = true
    }
  },

  flashSuccess: function () {
    this.$el.addClass('flash-success');
    this.$el.one('transitionend',
      function () {
        this.$el.removeClass('flash-success')
      }.bind(this)
    );
  },

  addEditForm: function () {
    this.editFormView = new Geofotr.Views.PhotoEdit({
      model: this.model,
      collection: this.collection,
      photoView: this
    });

    Geofotr.scrollTo(this.$('.photo'));

    this.$editContainer = this.$('.photo-edit-container');
    this.$editContainer.html(this.editFormView.render().$el);
  },

  removeEditForm: function (flashSuccess) {
    var editForm = this.editFormView;

    Geofotr.scrollFrom(this.$('.photo'));

    $photoEditContainer = this.$('.photo-edit-container')
    $photoEditContainer.one('transitionend',
      function () {
        editForm.remove();
        if (flashSuccess) {
          setTimeout(this.flashSuccess.bind(this), 0);
        }
      }.bind(this));
    $photoEditContainer.toggleClass('transparent');
  },
//photo overlay
  addPhotoOverlay: function () {
    var photoOverlay = new Geofotr.Views.PhotoOverlay({
      model: this.model,
      collection: this.collection
    });

    this.addSubview('div.photo-overlay', photoOverlay);
  },

  viewPhoto: function () {
    Backbone.history.navigate(
      '#photos/' + this.model.id,
      { trigger: true }
      )
  },

  destroyPhoto: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  toggleConfirmRemovePhoto: function (event) {
    if (this.removeOpen) {
      this.removeRemoveConfirm(event);
      this.removeOpen = false
    } else {
      this.addRemoveConfirm(event);
      this.removeOpen = true
    }
  },

  addRemoveConfirm: function (event) {
    this.photoRemoveConfirm = new Geofotr.Views.PhotoRemoveConfirm();

    this.$removeContainer = this.$('.remove-confirm');
    this.$removeContainer.removeClass('hidden');
    setTimeout(function () {
    this.$removeContainer.html(this.photoRemoveConfirm.render().$el);
      this.$removeContainer.removeClass('transparent');
    }.bind(this), 0);
  },

  removeRemoveConfirm: function () {
    var removeView = this.photoRemoveConfirm;


    this.$removeContainer.addClass('transparent');
    this.$removeContainer.one('transitionend', function () {
      this.$removeContainer.addClass('hidden');
      removeView.remove.bind(removeView);
    }.bind(this));
  },
});
