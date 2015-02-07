Geofotr.Views.CommentsIndex = Backbone.CompositeView.extend({

  template: JST['comments/comments_index'],
  form_template: JST['comments/comment_form'],
  tagClass: 'comments-container',

  events: {
    'click button.new-comment' : 'openNewForm',
    'submit .create-comment' : 'submitForm'
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

  openNewForm: function (event) {
    var form = this.form_template({
      photo_id: this.model.id,
      comment: this.newComment,
      buttonText: "Add comment",
      className: "create-comment"
    });

    this.$newButton = $(event.target);
    $(event.target).replaceWith(form);
  },

  submitForm: function (event) {
    if (event.type === "submit" || isEnterKeypress(event)) {
      event.preventDefault();
      params = this.$('form').serializeJSON();
      var that = this;

      var success = function (model) {
        that.collection.add(model, { merge: true });
        that.$('form.create-comment').replaceWith(that.$newButton);
      };

      var error = function (model) {
        console.log('error')
      }

      this.newComment.save(params, {
        success: success,
        error: error
      });
    }
  },

  addCommentSubview: function (comment) {
    var commentListItem = new Geofotr.Views.CommentsListItem({
      model: comment,
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

  render: function () {
    console.log('comment index render');
    this.$el.html(this.template({
      comments: this.collection
    }));
    this.attachSubviews();
    return this;
  }
});

