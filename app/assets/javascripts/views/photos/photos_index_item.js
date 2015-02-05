Geofotr.Views.PhotosListItem = Backbone.CompositeView.extend({
  template: JST['photos/photos_index_item'],

  initialize: function () {
    this.tagName = 'li';
  },

  events: {
    "click a.destroy" : "destroy"
  },

  render: function () {
    console.log("photo item render")
    this.$el.html(this.template({
      photo: this.model
    }));
    return this;
  },

  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  }

});
