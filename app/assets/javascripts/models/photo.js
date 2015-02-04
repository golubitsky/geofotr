Geofotr.Models.Photo = Backbone.Model.extend({
  url: "api/photos",

  comparator: function(photo) {
    return photo.get('created_at');
  },

  getOrFetch: function (id) {
    var photo = Geofotr.photos.get(id);
    if (!photo) {
      photo = new this.photo({id: id});
      photo.fetch();
    }
    return photo;
  }
});
