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
    debugger
    if (payload.comments) {
      this.comments().set(payload.comments);
      delete payload.comments;
    }

    this.currentUserLike = new Geofotr.Models.Like({
      photo_id: payload.id,
      user_id: Geofotr.CURRENT_USER_ID
    });

    if (payload.likeId) {
      this.currentUserLike.set({ id: payload.likeId });
    }

    return payload;
  }
});
