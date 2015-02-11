Geofotr.Views.Like = Backbone.CompositeView.extend({

  tagName: 'span',

  events: {
    'click' : 'toggleLike'
  },

  attributes: function () {
    var attrs = {};
    if (Geofotr.CURRENT_USER){
      if (this.likeable()){
        attrs.class = "like-photo";
        } else {
        attrs.class = "unlike-photo";
      }
    } else {
      attrs.class = "hidden";
    }
    return attrs;
  },

  likeable: function(){
    return this.model.isNew();
  },

  initialize: function (options) {
    this.photo = options.photo;
  },

  render: function () {
    console.log('like render');
    this.$el.empty();
    var text = '';
    if(Geofotr.CURRENT_USER){
      if(this.likeable()){
        text = "Like";
      } else {
        text = "Unlike";
      }
    }
    this.$el.html(text);
    return this;
  },

  toggleLike: function(event){
    event.preventDefault();
    if(this.likeable()){
      this.likePhoto();
    } else {
      this.unlikePhoto();
    }
  },

  likePhoto: function () {
    event.preventDefault();
    this.$el.attr('disabled', 'disabled');

    var that = this;

    this.model.save({}, {
      success: function () {
        var likeCount = that.photo.get('likeCount');
        var newLikeCount = likeCount + 1;
        that.photo.set('likeCount', newLikeCount);
        that.render();
      }
    });
  },

  unlikePhoto: function () {
    event.preventDefault();
    this.$el.attr('disabled', 'disabled');

    var that = this;

    this.model.destroy({
      success: function () {
        var likeCount = that.photo.get('likeCount');
        var newLikeCount = likeCount - 1
        that.photo.set('likeCount', newLikeCount);
        that.model.unset('id');
        that.render();
      }
    });
  }

});
