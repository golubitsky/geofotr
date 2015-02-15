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
    console.log('set like class');
    var likeClass = "";
    if (Geofotr.CURRENT_USER){
      if (this.likeable()){
        likeClass = "like-photo glyphicon glyphicon-heart-empty";
        console.log('able to like!');
        } else {
        likeClass = "unlike-photo glyphicon glyphicon-heart";
        console.log('unable to like!');
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
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'sync', this.updateLikeObject);
    this.likeObject = options.model;
  },

  updateLikeObject: function () {
    console.log("updateLikeObject");
  },

  render: function () {
    console.log('like render');

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
