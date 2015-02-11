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
    'click button.edit-photo' : 'addEditForm',
    'click .cancel' : 'removeEditForm',
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

  addEditForm: function (event) {
    this.$editButton = $(event.target);
    this.$editButton.attr('disabled', 'disabled');

    this.editFormView = new Geofotr.Views.PhotoEdit({
      model: this.model,
      collection: this.collection
    });

    var $photoContainer = this.$('div.photo-edit-container');
    $photoContainer.html(this.editFormView.render().$el);

    this.$editContainer = this.$('.photo-edit-container');
    this.$editParent = this.$editContainer.parent();
    Geofotr.scroll(this.$editContainer[0], this.$editParent[0]);

    // this.scroll($photoContainer[0], $photoContainer.parent()[0])
  },

  removeEditForm: function () {
    // $container = this.$el;
    // $parent = $container.parent();
    var editForm = this.editFormView;

    $photoEditContainer = this.$('.photo-edit-container')
    $photoEditContainer.on('transitionend', editForm.remove.bind(editForm));
    $photoEditContainer.toggleClass('transparent');

    Geofotr.scroll(this.$editParent[0], this.$editContainer[0],
      function () {
      }.bind(this)
    );
    this.$editButton.removeAttr('disabled');
    // Geofotr.scroll($container[0], $parent[0], editForm.remove.bind(editForm));
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
