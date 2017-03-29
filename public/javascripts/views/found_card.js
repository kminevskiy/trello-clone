var foundCard = Handlebars.templates.found_card;

var FoundCardView = Backbone.View.extend({
  template: foundCard,

  className: "found-card",

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },

  initialize: function () {
  },

  events: {
    "click .found-card-info": "openExtendedModal"
  },

  openExtendedModal: function () {
    var cardExtendedModal = new CardExtendedModal({ model: this.model });
    cardExtendedModal.render();
  }
});
