Geofotr.Collections.Photos = Backbone.Collection.extend({
  url: "/api/photos",
  model: Geofotr.Models.Photo,

  comparator: function(photo) {
    return photo.get('updated_at');
  },

  getOrFetch: function (id) {
    var photo = Geofotr.photos.get(id);
    if (!photo) {
      photo = new this.model({id: id});
      photo.fetch();
    }
    return photo;
  }

});
