Geofotr.Views.PhotoShow = Backbone.CompositeView.extend({

  template: JST['photos/photo_show'],
  className: "photoShow",
  events: {
    'click .back' : 'navigateBack'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
    this.model.fetch();
    this.id = 'photo-show';
  },

  render: function () {
    console.log('render')
    this.$el.html(this.template({ photo: this.model }));
    this.attachSubviews();

    this.adjustWidthOfBackButton();

    return this;
  },

  navigateBack: function () {
    Backbone.history.history.back()
  },

  adjustWidthOfBackButton: function () {
    var $showOverlay = $('.show-controls');
    var $image = $('figure > img');
    $image.load(function () {
      $showOverlay.width($image.outerWidth() - 10);
      $showOverlay.css('display', 'block');
    });
  }
});
