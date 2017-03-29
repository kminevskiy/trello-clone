var newList = Handlebars.templates.new_list_form;

var NewListView = Backbone.View.extend({
  template: newList,

  id: "add-new-list",

  render: function () {
    this.$el.html(this.template());
    app.content.append(this.el);
  },

  initialize: function () {
    this.render();
  },

  events: {
    "click .placeholder-new-list": "openListForm",
    "click a": "closeListForm",
    "blur [type='text']": "closeListForm",
    "submit": "createNewList"
  },

  openListForm: function (e) {
    $(e.currentTarget).hide(0);
    this.$("form").fadeIn(150);
    this.$("[type='text']").focus();
  },

  closeListForm: function (e) {
    e.preventDefault();
    this.$("form").slideUp(150, function () {
      $(".placeholder-new-list").fadeIn(150);
    });
  },

  listNameNotEmpty: function () {
    var inputVal = this.$("[type='text']").val();
    return inputVal.trim() !== "";
  },

  createNewList: function (e) {
    e.preventDefault();
    var $form = this.$("form");
    var self = this;
    var newModel, listView;

    if (this.listNameNotEmpty()) {
      $.ajax({
        url: $form.attr("action"),
        method: $form.attr("method"),
        data: $form.serialize(),
        success: function (data) {
          newModel = new List(data);
          newModel.set("cards", new Cards());
          app.lists.add(newModel);
          listView = new ListView({ model: newModel });
          app.listsContainer.append(listView.render().el);
        }
      });
    } else { return; }
    this.$("form")[0].reset();
  }
});
