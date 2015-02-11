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

  addEditForm: function () {
    this.editFormView = new Geofotr.Views.PhotoEdit({
      model: this.model,
      collection: this.collection
    });

    $photoContainer = this.$('div.photo-edit-container')
    $photoContainer.html(this.editFormView.render().$el);

    // this.scroll($photoContainer[0], $photoContainer.parent()[0])
  },

  removeEditForm: function () {
    $container = this.$el
    $parent = $container.parent();
    Geofotr.scroll($container[0], $parent[0], this.editFormView.remove.bind(this))
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
