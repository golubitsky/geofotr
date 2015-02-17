Geofotr.Collections.Photos = Backbone.Collection.extend({
  url: "/api/photos",
  model: Geofotr.Models.Photo,

  parse: function(response) {
    debugger
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.photos;
  },

  comparator: function(photo) {
    return -photo.get('updated_at');
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
