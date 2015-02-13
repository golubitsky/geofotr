Geofotr.Views.Like = Backbone.CompositeView.extend({

  tagName: 'span',
  // className: 'inner-like-span',

  events: {
    'click' : 'toggleLike',
    // 'click .unlike-photo' : 'toggleLike'
  },

  attributes: function () {
    return { class: this.likeClass() };
  },

  likeClass: function(){
    var likeClass = "";

    if (Geofotr.CURRENT_USER){
      if (this.likeable()){
        likeClass = "like-photo glyphicon glyphicon-heart-empty";
        } else {
        likeClass = "unlike-photo glyphicon glyphicon-heart";
      }
    } else {
      likeClass = "hidden";
    }
    return likeClass;
  },

  likeable: function(){
    return this.model.isNew();
  },

  initialize: function (options) {
    this.photo = options.photo;
    this.listenTo(this.model, 'change', this.render);
    this.likeObject = options.model;
  },

  render: function () {
    console.log('like render');

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

        that.$el.removeClass();
        that.$el.addClass(that.likeClass());

        console.log(that.model.attributes);
        console.log(that.likeable());
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
        that.$el.removeClass();
        that.$el.addClass(that.likeClass());
      }
    });
  }

});
