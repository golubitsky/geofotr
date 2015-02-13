Geofotr.Views.CommentsIndex = Backbone.CompositeView.extend({

  template: JST['comments/comments_index'],
  form_template: JST['comments/comment_form'],
  className: 'comments-container',

  events: {
    // 'click button.new-comment' : 'openNewForm',
    'click span.create-comment' : 'submitForm'
  },

  initialize: function (options) {
    this.photos = options.photos;
    this.listenTo(this.collection, 'add', this.addCommentSubview);
    this.listenTo(this.collection, 'remove', this.removeCommentSubview);

    this.collection.each(function (comment) {
      this.addCommentSubview(comment);
    }, this);

    this.newComment = new Geofotr.Models.Comment();
  },

  submitForm: function (event) {
      event.preventDefault();
      params = this.$('form').serializeJSON();
      var that = this;

      var success = function (model) {
        that.collection.add(model, { merge: true });
        that.$('form.create-comment').replaceWith(that.$newButton);
        that.newComment = new Geofotr.Models.Comment();
      };

      var error = function (model) {
        console.log('error')
      }

      this.newComment.save(params, {
        success: success,
        error: error
      });
  },

  addCommentSubview: function (comment) {
    var commentListItem = new Geofotr.Views.CommentsListItem({
      model: comment,
      photo: this.model,
      collection: this.collection
    });
    this.addSubview('ul.photo-comments', commentListItem);
  },

  removeCommentSubview: function (comment) {
    this.subviews('ul.photo-comments').forEach(function(subview) {
      if (subview.model === comment) {
        this.removeSubview('ul.photo-comments', subview);
      }
    }.bind(this));
  },

  addNewCommentForm: function (event) {
    var form = this.form_template({
      photo_id: this.model.id,
      comment: this.newComment,
      buttonText: "Add comment",
      className: "create-comment",
      placeholder: "Compose a new comment!"
    });

    this.$('.new-comment').html(form);
  },

  render: function () {
    console.log('comment index render');
    this.$el.html(this.template({
      comments: this.collection
    }));

    this.addNewCommentForm();
    this.attachSubviews();
    return this;
  }
});

