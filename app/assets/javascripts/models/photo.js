Geofotr.Models.Photo = Backbone.Model.extend({
  urlRoot: "api/photos",

  comments: function () {
    if (!this._comments) {
      this._comments = new Geofotr.Collections.Comments();
    }
    return this._comments;
  },
  //parse function
  //take incoming comments and create comments collection
  parse: function (payload) {
    if (payload.comments) {
      this.comments().set(payload.comments);
      delete payload.comments;
    }
    return payload;
  }
});
