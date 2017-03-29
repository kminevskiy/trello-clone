var cardNotification = Handlebars.templates.card_notification;

var SubscribedCardEvent = Backbone.View.extend({
  template: cardNotification,

  className: "card-notification",

  render: function () {
    this.$el.html(this.template({ eventData: this.model }));

    this.pruneNotifications();
    this.buttonFlash();
    $("#notifications a").after(this.el);
  },

  events: {
    "click .remove-notification": "removeNotification"
  },

  removeNotification: function (e) {
    e.preventDefault();
    this.remove();
  },

  initialize: function () {
    this.render();
  },

  buttonFlash: function () {
    var $button = $("#board-notifications");
    $button.fadeOut(400).fadeIn(400);
  },

  pruneNotifications: function () {
    var $notifications = $("#notifications");
    var notificationsCount = $notifications.children().length;
    if (notificationsCount >= 5) {
      $notifications.html($notifications.children().slice(0, 4));
    }
  }
});

Handlebars.registerHelper("createActivityString", function (e) {
  if (e.eventType === "dueDateChange") {
    return `The due date for ${e.card} has changed to ${e.dueDate}, ${e.dueTime}`;
  } else if (e.eventType === "cardNameChange") {
    return `The name for card ${e.oldCard} has changed to ${e.card}`;
  } else if (e.eventType === "cardCopy") {
    return `The card ${e.oldCard} has been copied as ${e.card}`;
  } else if (e.eventType === "cardMove") {
    return `The card ${e.card} has been moved to list ${e.listName}`;
  } else if (e.eventType === "cardDeleted") {
    return `The card ${e.card} has been deleted.`
  }
});
