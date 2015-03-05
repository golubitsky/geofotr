Geofotr.Views.PhotoShow = Backbone.CompositeView.extend({

  template: JST['photos/photo_show'],
  className: "photoShow",
  events: {
    'click .back' : 'navigateBack'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
    this.model.fetch();
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
    var $backButton = $('.back');
    var $image = $('figure > img');

    // if ($image.length) {
    //   debugger
      $backButton.width($image.outerWidth() - 10)
      $backButton.css('display', 'block');
    // }
    // else {
    //   debugger
    //   $image.load(function () {
    //     debugger
    //     $backButton.width($image.outerWidth() - 10);
    //     $backButton.css('display', 'block');
    //     this.resized = true;
    //   });
    // }

  }
});
