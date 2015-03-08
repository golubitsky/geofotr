Geofotr.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  photos: function () {
    if (!this._photos) {
      this._photos = new Geofotr.Collections.Photos();
    }
    return this._photos;
  },
  //parse function
  //take incoming photos and create photos collection
  parse: function (payload, options) {
    if (payload.photos) {
      this.photos().add(payload.photos, { parse: true });
      this.photos().page_number = parseInt(payload.page_number);
      this.photos().total_pages = parseInt(payload.total_pages);
      delete payload.photos;
    }

    return payload;
  }
});
