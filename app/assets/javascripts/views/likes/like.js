Geofotr.Views.Like = Backbone.CompositeView.extend({

  tagName: 'span',

  events: {
    'click' : 'toggleLike',
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
      likeClass = "glyphicon glyphicon-heart";
    }
    return likeClass;
  },

  likeable: function(){
    return this.model.isNew();
  },

  initialize: function (options) {
    this.photo = options.photo;
    this.listenTo(this.model, 'change', this.updateClassName);
    this.updateLikeObject();
  },

  updateLikeObject: function () {
    this.model = this.photo.currentUserLike
    this.updateClassName();
  },

  updateClassName: function () {
    this.$el.removeClass()
    this.$el.attr('class', this.likeClass());
    return this;
  },

  render: function () {
    return this;
  },

  toggleLike: function(event){
    event.preventDefault();
    if (!Geofotr.CURRENT_USER) { return }
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
    this.model.set('user_id', Geofotr.CURRENT_USER_ID);
    this.model.save({}, {
      success: function () {
        var likeCount = that.photo.get('likeCount');
        var newLikeCount = likeCount + 1;
        that.photo.set('likeCount', newLikeCount);
        that.$el.removeClass();
        that.$el.addClass(that.likeClass());
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
