var newCardForm = Handlebars.templates.new_card_form;

var NewCardForm = Backbone.View.extend({
  template: newCardForm,

  className: "new-card-form",

  render: function () {
    this.$el.empty();
    var position = this.getLastCardPosition(this.list);
    this.$el.append(this.template({ list: this.list, position: position }));

    return this;
  },

  initialize: function (list) {
    this.list = list;
  },

  getLastCardPosition: function (list) {
    if (list.cards) {
      return list.cards.toJSON().length + 1;
    } else { return 0 }
  },

  events: {
    "submit": "submitCard",
    "click a": "closeCardForm",
    "focusout form": "closeCardFormOnBlur"
  },

  submitCard: function (e) {
    e.preventDefault();
    var self = this;
    var $form = this.$("form");

    $.ajax({
      url: $form.attr("action"),
      method: $form.attr("method"),
      data: $form.serialize(),
      success: function (data) {
        self.trigger("newCardAdded", data);
        self.closeCardForm();
      }
    });
  },

  closeCardFormOnBlur: function (e) {
    var self = this;
    // Blur event is emitted when the element is ABOUT to lose focus, but haven't lost it yet.
    setTimeout(function () {
      if (!e.delegateTarget.contains(document.activeElement)) {
        self.$el.detach();
        self.trigger("hideCardForm");
      }
    });
  },

  closeCardForm: function () {
    this.$("form")[0].reset();
    this.$el.detach();
    this.trigger("hideCardForm");
  }
});
