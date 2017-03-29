var changeDate = Handlebars.templates.change_date;

var ChangeDueDate = Backbone.View.extend({
  template: changeDate,

  className: "date-modal-container",

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    app.modal.append(this.el);
    this.initializeDatePicker();

    return this;
  },

  isSubscribed: function () {
    return this.model.get("subscribed");
  },

  createEventData: function () {
    var newDueDate = this.model.get("due_date");
    var newDueTime = this.model.get("due_time");
    var cardName = this.model.get("card_name");
    return {eventType: "dueDateChange",
      card: cardName,
      dueDate: moment(newDueDate, ["YYYY-M-D"]).format("MMM Do"),
      dueTime: newDueTime
    };
  },

  initializeDatePicker: function () {
    var dueDate = this.model.get("due_date");
    var dueTime = this.model.get("due_time");
    var date, time;

    if (dueDate !== "Not set") {
      date = moment(dueDate, ["YYYY-M-D"]).format("YYYY/MM/DD");
    } else {
      date = "+1970/01/02";
    }

    if (dueTime !== "Not set") { time = dueTime; }
    else { time = "01:00 PM"; }

    $("#datetimepicker").datetimepicker({
      defaultTime: time,
      defaultDate: date,
      formatTime: "h:i A",
      inline: true
    });
  },

  events: {
    "submit": "submitDateChange",
    "click .close": "closeModal",
    "click #third-overlay": "closeModal",
    "click [type='button']": "resetDueDate"
  },

  resetDueDate: function () {
    this.model.set("due_date", "Not set");
    this.model.set("due_time", "Not set");
    this.model.save();
    this.model.trigger("dueChanged");
    this.closeModal();
  },

  submitDateChange: function (e) {
    e.preventDefault();
    var date = $("#datetimepicker").datetimepicker("getValue");
    var dateString = moment(date).format("YYYY-M-D");
    var timeString = moment(date).format("hh:mm A");
    this.model.set("due_date", dateString);
    this.model.set("due_time", timeString);
    this.model.save();
    this.model.trigger("dueChanged");
    if (this.isSubscribed()) {
      new SubscribedCardEvent({ model: this.createEventData() });
    }
    this.closeModal();
  },

  initialize: function () {
    this.render();
  },

  closeModal: function () {
    var self = this;
    this.$el.hide(50, function () {
      self.$el.detach();
    });
  }
});
