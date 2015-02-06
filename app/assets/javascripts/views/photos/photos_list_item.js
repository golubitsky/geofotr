Geofotr.Views.PhotosListItem = Backbone.CompositeView.extend({
  template: JST['photos/photos_list_item'],
  form_template: JST['photos/photo_edit_form'],
  tagName: 'li',
  className: 'list-group-item',

  initialize: function () {
    this.addCommentsIndex();
    this.listenTo(this.model, 'change', this.render)
  },

  events: {
    'click button.view-photo' : 'viewPhoto',
    'click button.edit-photo' : 'openEditForm',
    'submit .update-photo' : 'submitForm',
    'click button.destroy-photo' : 'destroyPhoto',
    'click button.like-photo' : 'likePhoto',
    'click button.unlike-photo' : 'unlikePhoto'
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
      model: this.model
    });
    this.addSubview('div.comments-container', commentsIndex);
  },

  viewPhoto: function () {
    Backbone.history.navigate(
      '#photos/' + this.model.id,
      { trigger: true }
      )
  },

  openEditForm: function (event) {
    console.log('open edit form')
    var form = this.form_template({
      photo: this.model
    });

    this.$buttons = this.$('.photo-buttons');
    this.$buttons.replaceWith(form);
  },

  submitForm: function (event) {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    var that = this;

    var success = function (model) {
      that.collection.add(model, { merge: true });
      that.$('form.update-photo').replaceWith(that.$buttons);
    };

    var error = function (model) {
      console.log('error')
    }

    this.model.save(params, {
      success: success,
      error: error
    });
  },

  destroyPhoto: function (event) {
    event.preventDefault();ul
    this.model.destroy();
  },

  likePhoto: function (event) {
    event.preventDefault();

    var $button = $(event.target)
    var $likeCount = this.$('.count')
    var newCount = parseInt($likeCount.text()) + 1

    $button.text('liking..');
    $button.attr('disabled', 'disabled');

    var like = new Geofotr.Models.Like({
      user_id: Geofotr.CURRENT_USER_ID,
      photo_id: this.model.id
    });

    $likeCount.text(newCount)

    var that = this;

    like.save({}, {
      success: function (response) {
        that.model.set('likeId', response.id, { silent: true });

        $likeCount.text(newCount)
        $button.removeAttr('disabled');
        $button.removeClass('like');
        $button.addClass('unlike');
        $button.text('Unlike');
      }
    });
  },

  unlikePhoto: function (event) {
    event.preventDefault();

    var $button = $(event.target)
    var $likeCount = this.$('.count')
    var newCount = parseInt($likeCount.text()) - 1

    $button.text('unliking..');
    $button.attr('disabled', 'disabled');

    var subscription = new Geofotr.Models.Like({ id: this.model.get('likeId') })

    var that = this;

    subscription.destroy({
      success: function () {$likeCount.text(newCount)
        that.model.unset('likeId', { silent: true })

        $likeCount.text(newCount)
        $button.removeAttr('disabled');
        $button.removeClass('unlike');
        $button.addClass('like');
        $button.text('Like');
      }
    });
  }
});
