var app = {
  header: $("header"),
  content: $("#content"),
  modal: $("#modal"),
  listsContainer: $("#lists-container"),
  listActions: $("#list-actions"),

  bindEvents: function () {
    _.extend(this, Backbone.Events);
  },

  init: function () {
    _.bindAll(this, "index");
    this.menu = new TopNavMenuView();
    this.newListView = new NewListView();
    this.lists = new Lists();
  },

  index: function () {
    var self = this;
    this.lists.fetch({
      success: function (lists) {
        new IndexView({ collection: lists });
        self.commanded = new Commander({ collection: lists });
      }
    });
  }
};
