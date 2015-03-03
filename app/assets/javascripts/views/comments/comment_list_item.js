Geofotr.Views.CommentsListItem = Backbone.CompositeView.extend({
  template: JST['comments/comments_list_item'],
  form_template: JST['comments/comment_form'],
  tagName: 'li',
  className: 'comment-list-item',

  events: {
    'click span.edit-comment' : 'toggleEditForm',
    'click span.update-comment' : 'submitForm',
    'click span.cancel-update-comment' : 'closeEditForm',

    'click span.remove-comment' : 'toggleConfirmRemoveComment',
    'click span.confirm-remove-comment' : 'destroyComment',
    'click span.cancel-remove-comment' : 'toggleConfirmRemoveComment'
  },

  initialize: function (options) {
    this.photo = options.photo
    this.listenTo(this.model, 'change', this.render);
    this.tagName = 'li';
  },

  render: function () {
    this.$el.html(this.template({
      comment: this.model,
      photo: this.photo
    }));
    return this;
  },

  toggleEditForm: function () {
    if (this.editOpen) {
      this.closeEditForm();
      this.editOpen = false
    } else {
      this.openEditForm();
      this.editOpen = true
    }
  },

  openEditForm: function () {
    var form = this.form_template({
      comment: this.model,
      buttonText: "Update comment",
      className: "update-comment",
      photo_id: this.photo.id,
      user_id: Geofotr.CURRENT_USER_ID,
      placeholder: "Update your comment!"
    });
    this.$commentText = this.$('p');
    this.$commentText.replaceWith(form);
    this.$('textarea').height(this.$('textarea')[0].scrollHeight);
    this.$('span.edit-comment').attr('disabled', 'disabled');
  },

  closeEditForm: function () {
    this.$('form').replaceWith(this.$commentText);
  },

  submitForm: function (event) {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    var that = this;

    var success = function (model) {
      that.collection.add(model, { merge: true});
      that.$('form.update-comment').replaceWith(that.$commentText);
    };

    var error = function (model) {
      //TO DO error handling
    };

    this.model.save(params, {
      success: success,
      error: error
    });
  },

  destroyComment: function (event) {
    event.preventDefault();
    this.model.destroy();
  },


  toggleConfirmRemoveComment: function (event) {
    if (this.removeOpen) {
      this.removeRemoveConfirm(event);
      this.removeOpen = false
    } else {
      this.addRemoveConfirm(event);
      this.removeOpen = true
    }
  },

  addRemoveConfirm: function (event) {
    this.commentRemoveConfirm = new Geofotr.Views.CommentRemoveConfirm();

    this.$removeContainer = this.$('.comment-remove-confirm');
    this.$removeContainer.removeClass('hidden');
    setTimeout(function () {
    this.$removeContainer.html(this.commentRemoveConfirm.render().$el);
      this.$removeContainer.removeClass('transparent');
    }.bind(this), 0);
  },

  removeRemoveConfirm: function () {
    var removeView = this.commentRemoveConfirm;

    this.$removeContainer.addClass('transparent');
    this.$removeContainer.one('transitionend', function () {
      this.$removeContainer.addClass('hidden');
      removeView.remove.bind(removeView);
    }.bind(this));
  },
});
