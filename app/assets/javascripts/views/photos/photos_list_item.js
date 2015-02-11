Geofotr.Views.PhotosListItem = Backbone.CompositeView.extend({
  template: JST['photos/photos_list_item'],
  form_template: JST['photos/photo_edit_form'],
  tagName: 'li',
  className: 'list-group-item',

  initialize: function () {
    this.addCommentsIndex();
    this.createLikeButton();
    this.addPhotoOverlay();
    //  this.listenTo(this.model, 'change', this.render)
  },

  events: {
    'click span.view-photo' : 'viewPhoto',
    'click span.edit-photo' : 'toggleEditForm',
    'click .cancel' : 'toggleEditForm',
    'submit .update-photo' : 'submitForm',
    'click span.destroy-photo' : 'destroyPhoto',
  },

  render: function () {
    console.log('photo item render')
    this.$el.html(this.template({
      photo: this.model
    }));
    // this.addLikeButton();
    this.attachLikeButton();

    this.attachSubviews();
    return this;
  },

  attachLikeButton: function(){
    this.$('.photo-buttons').append(this.likeButtonView.$el);
    this.likeButtonView.delegateEvents();
  },

  createLikeButton: function () {
    this.likeButtonView = new Geofotr.Views.Like({
      model: this.model.currentUserLike,
      photo: this.model
    });
    this.likeButtonView.render();
    // this.$('.photo-buttons').append(likeButtonView.render().$el);
    // this.addSubview('div.like-button', likeButtonView);
  },

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

    this.$commentsContainer = this.$('div.comments-container');
    this.$commentsParent = this.$editContainer.parent();

    $commentsContainer.html(this.commentsIndex.render().$el);
    Geofotr.scroll(this.$commentsContainer[0], this.$commentsParent[0]);
  },


  removeCommentView: function () {
    $commentContainer = this.$('.photo-edit-container')
    $commentContainer.on('transitionend', this.commentsIndex.remove.bind(this.commentsIndex));
    $commentContainer.toggleClass('transparent');

    Geofotr.scroll(this.$editParent[0], this.$editContainer[0],
      function () {
      }.bind(this)
    );
  },

  addCommentsIndex: function () {
    var commentsIndex = new Geofotr.Views.CommentsIndex({
      collection: this.model.comments(),
      model: this.model,
      photos: this.collection
    });
    this.addSubview('div.comments-container', commentsIndex);
  },


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

    this.$editContainer = this.$('.photo-edit-container');
    this.$editParent = this.$editContainer.parent();

    this.$editContainer.html(this.editFormView.render().$el);
    Geofotr.scroll(this.$editContainer[0], this.$editParent[0]);
  },

  addPhotoOverlay: function () {
    var photoOverlay = new Geofotr.Views.PhotoOverlay({
      model: this.model,
      collection: this.collection
    });

    this.addSubview('div.photo-overlay', photoOverlay);
  },

  removeEditForm: function () {
    // var editForm = this.editFormView;

    // $photoEditContainer = this.$('.photo-edit-container')
    // $photoEditContainer.on('transitionend', editForm.remove.bind(editForm));
    // $photoEditContainer.toggleClass('transparent');

    // Geofotr.scroll(this.$editParent[0], this.$editContainer[0],
    //   function () {
    //   }.bind(this)
    // );
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
  }
});
