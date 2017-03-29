var Comment = Backbone.Model.extend({
  initialize: function (attrs) {
    this.url = "/comment/" + attrs.id;
  }
});
