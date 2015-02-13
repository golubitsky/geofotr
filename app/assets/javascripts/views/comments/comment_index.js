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

    _.extend(this, Backbone.Events);
    this.listenTo(this.collection, 'comment:success', this.unshiftCommentSubview);
  },

  submitForm: function (event) {
      event.preventDefault();
      params = this.$('form').serializeJSON();
      var that = this;

      var success = function (model) {
        that.collection.add(model, { merge: true, silent: true });
        that.collection.trigger('comment:success', model);
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

    this.addBorder();
    this.addSubview('ul.photo-comments', commentListItem);
  },

  unshiftCommentSubview: function (comment) {
    console.log('unshift');
    var commentListItem = new Geofotr.Views.CommentsListItem({
      model: comment,
      photo: this.model,
      collection: this.collection
    });

    this.addBorder();
    this.unshiftSubview('ul.photo-comments', commentListItem);
  },

  removeCommentSubview: function (comment) {
    this.subviews('ul.photo-comments').forEach(function(subview) {
      if (subview.model === comment) {
        this.removeSubview('ul.photo-comments', subview);
      }

    this.addBorder();
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

    this.addBorder();
    this.addNewCommentForm();
    this.attachSubviews();
    return this;
  },

  addBorder: function () {
    if (this.collection.length) {
      this.$('.photo-comments').addClass('border')
    } else {
      this.$('.photo-comments').removeClass('border')
    }
  }
});

