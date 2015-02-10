Geofotr.Views.PhotoEditOld = Backbone.CompositeView.extend({

  template: JST['photos/photo_edit_form'],

  events: {
    'click button.submit' : 'submitForm'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    this.$el.html(this.template({
      photo: this.model,
      buttonText: "Update Photo"
    }));
    this.attachSubviews();
    return this;
  },

  submitForm: function () {
    event.preventDefault();
    params = this.$('form').serializeJSON();
    var that = this;

    var success = function (model) {
      that.collection.add(model, { merge: true });
      Backbone.history.navigate('', { trigger: true })
    };

    var error = function (model) {
      console.log('error')
    }

    this.model.save(params, {
      success: success,
      error: error
    });
  },

});
