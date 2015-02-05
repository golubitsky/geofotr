Geofotr.Views.PhotosListItem = Backbone.CompositeView.extend({
  template: JST['photos/photos_index_item'],
  form_template: JST['photos/photo_edit_form'],

  initialize: function () {
    this.tagName = 'li';
    this.listenTo(this.model, "change", this.render)
  },

  events: {
    "click button.view" : "viewPhoto",
    "click button.edit" : "openEditForm",
    "submit .update-photo" : "submitForm",
    "click button.destroy" : "destroyPhoto"
  },

  render: function () {
    console.log("photo item render")
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
    console.log("open edit form")
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

  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  }

});
