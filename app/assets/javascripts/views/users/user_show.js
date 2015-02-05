Geofotr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST['users/user_show'],

  events: {

  },
  initialize: function () {
    this.listenTo(this.collection, 'add', this.addPhotoSubview);
    this.listenTo(this.collection, 'remove', this.removePhotoSubview);

    this.collection.each(function (photo) {
      this.addPhotoSubview(photo);
    }, this);
  },

  addPhotoSubview: function (photo) {
    var userShowItem = new Geofotr.Views.UserShowItem({
      model: photo
    });

    this.addSubview('ul', userShowItem);
  },

  removePhotoSubview: function (photo) {
    this.subviews('ul').forEach(function(subview) {
      if (subview.model === photo) {
        this.removeSubview('ul', subview);
      }
    }.bind(this));
  },

  render: function () {
    // console.log('index render');
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  }
});
