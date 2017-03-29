var cardNameEdit = Handlebars.templates.card_name_modal;

var CardNameEditModal = Backbone.View.extend({
  template: cardNameEdit,

  className: "edit-modal-container",

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    app.modal.html(this.$el.show());
    this.updateLabels();
    this.$("#edit-modal").fadeIn(150);

    return this;
  },

  events: {
    "submit": "submitCardNameChanges",
    "click #overlay": "closeModal",
    "click .copy-card": "copyCard",
    "click .change-members": "changeMembers",
    "click .move-card": "moveCard",
    "click .archive-card": "archiveCard",
    "click .change-due-date": "changeDue",
    "click .edit-labels": "editLabels"
  },

  initialize: function () {
    this.editLabelsModal = new EditLabelsModal({ model: this.model });
    this.listenTo(this.model, "labelChanged", this.updateLabels);
  },

  updateLabels: function () {
    this.$(".card-labels").empty();
    var labels = this.model.toJSON();
    var colors = [];
    var colorSpan, color;
    for (color in labels) {
      if (labels[color] === "used") {
        colors.push(color);
      }
    }
    colors.forEach(function (c) {
      $colorSpan = $("<span class='mini-label'></span>");
      $colorSpan.addClass("color-" + c);
      this.$(".card-labels").append($colorSpan);
    });
  },

  editLabels: function (e) {
    e.preventDefault();
    this.editLabelsModal.render();
  },

  archiveCard: function (e) {
    e.preventDefault();
    this.model.destroy();
    this.remove();
  },

  copyCard: function (e) {
    e.preventDefault();
    new CopyCardModal({ model: this.model });
  },

  moveCard: function (e) {
    e.preventDefault();
    new MoveCardModal({ model: this.model });
  },

  changeDue: function (e) {
    e.preventDefault();
    new ChangeDueDate({ model: this.model });
  },

  changeMembers: function (e) {
    e.preventDefault();
  },

  closeModal: function () {
    var self = this;
    this.$el.hide(50, function () {
      self.$el.detach();
    });
  },

  isSubscribed: function () {
    return this.model.get("subscribed");
  },

  createEventData: function (oldCardName, newCardName) {
    return {eventType: "cardNameChange",
      oldCard: oldCardName,
      card: newCardName
    };
  },

  submitCardNameChanges: function (e) {
    e.preventDefault();
    var oldCardName = this.model.get("card_name");
    var newCardName = this.$("textarea").val();

    if (this.isSubscribed()) {
      new SubscribedCardEvent({ model: this.createEventData(oldCardName, newCardName) });
    }

    this.model.set("card_name", newCardName);
    this.model.save();
    this.closeModal();
  }
});
