Geofotr.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST['users/user_profile'],

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
    var userProfileItem = new Geofotr.Views.UserProfileItem({
      model: photo
    });

    this.addSubview('ul', userProfileItem);
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
