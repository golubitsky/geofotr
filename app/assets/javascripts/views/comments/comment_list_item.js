Geofotr.Views.CommentsListItem = Backbone.CompositeView.extend({
  template: JST['comments/comments_list_item'],
  form_template: JST['comments/comment_form'],
  tagName: 'li',

  events: {
    'click button.edit-comment' : 'openEditForm',
    'submit .update-comment' : 'submitForm',
    'click button.destroy-comment' : 'destroyComment',
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.tagName = 'li';
  },

  render: function () {
    this.$el.html(this.template({
      comment: this.model
    }));
    return this;
  },

  openEditForm: function (event) {
    console.log('open edit form')
    var form = this.form_template({
      comment: this.model,
      buttonText: "Update comment",
      className: "update-comment"
    });

    this.$buttons = this.$('.comment-buttons');
    this.$buttons.replaceWith(form);
  },

  submitForm: function (event) {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    var that = this;

    var success = function (model) {
      that.collection.add(model, { merge: true });
      that.$('form.update-comment').replaceWith(that.$buttons);
    };

    var error = function (model) {
      console.log('error')
    }

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
