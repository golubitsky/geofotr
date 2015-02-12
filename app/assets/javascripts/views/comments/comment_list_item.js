Geofotr.Views.CommentsListItem = Backbone.CompositeView.extend({
  template: JST['comments/comments_list_item'],
  form_template: JST['comments/comment_form'],
  tagName: 'li',
  className: 'comment-list-item',

  events: {
    'click span.edit-comment' : 'openEditForm',
    'submit .update-comment' : 'submitForm',
    'click span.destroy-comment' : 'destroyComment',
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

  openEditForm: function (event) {
    console.log('open edit form')
    var form = this.form_template({
      comment: this.model,
      buttonText: "Update comment",
      className: "update-comment",
      photo_id: this.photo.id,
      user_id: Geofotr.CURRENT_USER_ID
    });

    this.$commentText = this.$('.comment-text');
    this.$commentText.replaceWith(form);
  },

  submitForm: function (event) {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    var that = this;

    var success = function (model) {
      that.collection.add(model, { merge: true });
      that.$('form.update-comment').replaceWith(that.$commentText);
    };

    var error = function (model) {
      console.log('error');
    };

    this.model.save(params, {
      success: success,
      error: error
    });
  },

  destroyComment: function (event) {
    event.preventDefault();
    this.model.destroy();
  }
});
