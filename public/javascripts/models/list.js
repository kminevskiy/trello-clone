var List = Backbone.Model.extend({
  initialize: function (attrs) {
    this.url = "/list/" + attrs.id;
  }
});
