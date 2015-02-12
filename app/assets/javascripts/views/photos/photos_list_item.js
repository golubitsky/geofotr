Geofotr.Views.PhotosListItem = Backbone.CompositeView.extend({
  template: JST['photos/photos_list_item'],
  form_template: JST['photos/photo_edit_form'],
  tagName: 'li',
  className: 'photo-list-item',

  initialize: function () {
    // this.addCommentsIndex();
    this.addPhotoOverlay();
    //if ever change=>render is necessary need to make sure not to listen on change:likeCount;
    // this.listenTo(this.model, 'change', this.render)
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

    Geofotr.scrollTo($('div.photo-overlay'));
    this.$commentsContainer = this.$('div.comments-container');

    this.$commentsContainer.toggleClass('transparent');
    this.$commentsContainer.html(this.commentsIndex.render().$el);
  },


  removeCommentView: function () {
    Geofotr.scrollFrom($('div.photo-overlay'));

    this.$commentsContainer.on('transitionend', this.commentsIndex.remove.bind(this.commentsIndex));
    this.$commentsContainer.toggleClass('transparent');
  },

//edit form
  toggleEditForm: function (event) {
    if (this.editOpen) {
      this.removeEditForm(event);
      this.editOpen = false
    } else {
      this.addEditForm(event);
      this.editOpen = true
    }
  },

  addEditForm: function (event) {
    this.editFormView = new Geofotr.Views.PhotoEdit({
      model: this.model,
      collection: this.collection
    });

    Geofotr.scrollTo($('div.photo-overlay'));

    this.$editContainer = this.$('.photo-edit-container');
    this.$editContainer.html(this.editFormView.render().$el);
  },

  removeEditForm: function () {
    var editForm = this.editFormView;

    Geofotr.scrollFrom($('div.photo-overlay'));

    $photoEditContainer = this.$('.photo-edit-container')
    $photoEditContainer.on('transitionend', editForm.remove.bind(editForm));
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
    console.log('test')
    if (this.removeOpen) {
      this.removeRemoveConfirm(event);
      this.removeOpen = false
    } else {
      this.addRemoveConfirm(event);
      this.removeOpen = true
    }
  },

  addRemoveConfirm: function (event) {
    this.photoRemoveConfirm = new Geofotr.Views.PhotoRemoveConfirm({
    });

    this.$removeContainer = this.$('.remove-confirm');
    this.$removeContainer.html(this.photoRemoveConfirm.render().$el);
    this.$removeContainer.toggleClass('transparent');
    this.$removeContainer.toggleClass('hidden');
  },

  removeRemoveConfirm: function () {
    var removeView = this.photoRemoveConfirm;

    this.$removeContainer.on('transitionend', removeView.remove.bind(removeView));
    this.$removeContainer.toggleClass('transparent');
    this.$removeContainer.toggleClass('hidden');
  },
});
