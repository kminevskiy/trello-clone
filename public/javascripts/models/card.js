var Card = Backbone.Model.extend({
  initialize: function (attrs) {
    this.url = "/card/" + attrs.id;
  }
});
