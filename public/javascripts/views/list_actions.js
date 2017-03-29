var listActions = Handlebars.templates.list_actions;

var ListActionsModal = Backbone.View.extend({
  template: listActions,

  className: "actions-modal-container",

  render: function () {
    this.$el.html(this.template());
    app.listActions.html(this.el);
  },

  events: {
    "click .close": "closeListActions",
    "click .archive-list": "archiveList",
    "click .add-card": "addCard",
    "click .archive-all": "archiveAll"
  },

  archiveAll: function (e) {
    e.preventDefault();
    var cards = this.model.get("cards");

  },

  addCard: function (e) {
    e.preventDefault();
    this.model.trigger("addCardFromList");
    this.closeListActions();
  },

  archiveList: function (e) {
    e.preventDefault();
    this.closeListActions();
    this.model.destroy();
  },

  closeListActions: function (e) {
    if (e) e.preventDefault();
    var self = this;
    app.listActions.fadeOut(150, function () {
      self.$el.remove();
    });
  },

  initialize: function () {
    this.render();
  }
});
