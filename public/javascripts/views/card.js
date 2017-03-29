var card = Handlebars.templates.card;

var CardView = Backbone.View.extend({
  template: card,

  attributes: function () {
    return {
      class: "card",
      id: this.model.get("card_id")
    };
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    this.updateLabels();
    this.updateCommentsCount();
    this.updateDueTitle();

    return this;
  },

  initializeComments: function () {
    var commentsExist = this.model.get("comments");
    if (commentsExist) {
      return commentsExist;
    } else {
      this.model.set("comments", new Comments());
      return this.model.get("comments");
    }
  },

  initialize: function () {
    this.comments = this.initializeComments();
    this.cardNameEditModal = new CardNameEditModal({ model: this.model });
    this.cardExtendedModal = new CardExtendedModal({ model: this.model });
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.removeAndNotify);
    this.listenTo(this.model, "labelChanged", this.updateLabels);
    this.listenTo(this.model, "commentChanged", this.updateCommentsCount);
    this.listenTo(this.model, "dueChanged", this.updateDueTitle);
    this.listenTo(this.comments, "update", this.updateComments);
  },

  isSubscribed: function () {
    return this.model.get("subscribed");
  },

  createEventData: function () {
    var cardName = this.model.get("card_name");
    return {eventType: "cardDeleted",
      card: cardName
    };
  },

  removeAndNotify: function () {
    if (this.isSubscribed) {
      new SubscribedCardEvent({ model: this.createEventData() })
    }
    this.remove();
  },

  updateLabels: function () {
    this.$(".front-card-labels").empty();
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
      this.$(".front-card-labels").append($colorSpan);
    }, this);
  },

  updateCommentsCount: function () {
    var commentsCount = this.model.get("comments").length;
    var $commentsSpan = this.$(".card-comments-count");

    if (commentsCount) {
      $commentsSpan.text(commentsCount);
      $commentsSpan.show();
    } else {
      $commentsSpan.hide();
    }
  },

  updateDueTitle: function () {
    var dueString = this.model.get("due_date");
    var $dueSpan = this.$(".card-due-date");

    if (dueString !== "Not set") {
      dueString = moment(dueString, ["YYYY-M-D"]).format("MMM Do");
      $dueSpan.text(dueString);
      $dueSpan.show();
    } else {
      $dueSpan.hide();
    }
  },

  events: {
    "click .card-title": "openCardModal",
    "click .card-edit": "openCardNameEditModal"
  },

  openCardNameEditModal: function (e) {
    e.preventDefault();
    this.cardNameEditModal.render();
  },

  openCardModal: function (e) {
    e.preventDefault();
    this.cardExtendedModal.render();
  }
});
