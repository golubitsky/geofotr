Geofotr.Models.Subscription = Backbone.Model.extend({
  urlRoot: "api/subscriptions",

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
      this.photos().set(payload.photos, { parse: true });
      delete payload.photos;
    }
    return payload;
  }
});
