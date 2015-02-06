Geofotr.Views.PhotosListItem = Backbone.CompositeView.extend({
  template: JST['photos/photos_index_item'],
  form_template: JST['photos/photo_edit_form'],

  initialize: function () {
    this.tagName = 'li';
    this.listenTo(this.model, 'change', this.render)
  },

  events: {
    'click button.view' : 'viewPhoto',
    'click button.edit' : 'openEditForm',
    'submit .update-photo' : 'submitForm',
    'click button.destroy' : 'destroyPhoto',
    'click button.like' : 'likePhoto',
    'click button.unlike' : 'unlikePhoto'

  },

  render: function () {
    console.log('photo item render')
    this.$el.html(this.template({
      photo: this.model
    }));
    return this;
  },

  viewPhoto: function () {
    Backbone.history.navigate(
      '#photos/' + this.model.id,
      { trigger: true }
      )
  },

  openEditForm: function (event) {
    console.log('open edit form')
    this.$buttons = this.$('.buttons');
    var form = this.form_template({
      photo: this.model
    });
    this.$('.buttons').replaceWith(form);
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
    event.preventDefault();
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
        that.model.set('likeId', response.id);

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
