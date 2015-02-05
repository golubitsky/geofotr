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
  parse: function (payload) {
    if (payload.photos) {
      this.photos().set(payload.photos);
      delete payload.photos;
    }
    return payload;
  }
});
