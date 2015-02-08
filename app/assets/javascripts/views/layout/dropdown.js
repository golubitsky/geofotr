Geofotr.Views.DropDownView = Backbone.View.extend({
  attributes: {
    role: 'menu',
    class: 'dropdown-menu add-menu'
  },

  createPhoto: function(event) {
    var view = this;
    var $form = $(event.target);
    var photoTitle = $form.find('input').val() ||
          'Untitled Photo';
    TrelloClone.Collections.photos.create({ title: photoTitle }, {
      success: function(photo) {
        var id = photo.id;
        Backbone.history.navigate('/photos/' + id, { trigger: true });
        view.reset();
      }
    });
    return false;
  },

  events: {
    'click .new-photo': 'showForm',
    'click .cancel': 'hideForm',
    'submit form': 'createPhoto'
  },

  formTemplate: JST['layout/_form'],

  hideForm: function(event) {
    this.$el.html(this.template());
    return false;
  },

  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    return this;
  },

  reset: function() {
    this.render();
    this.$el.parent().removeClass('open');
  },

  showForm: function() {
    this.$el.html(this.formTemplate({
      photo: this.model
    }));
    return false;
  },

  tagName: 'ul',

  template: JST['layout/dropdown'],
});
