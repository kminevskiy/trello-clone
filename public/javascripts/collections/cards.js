var Cards = Backbone.Collection.extend({
  model: Card,

  initialize: function (attrs) {
    if (attrs) {
      if (attrs.length) {
        this.url = "/cards/" + attrs[0].list_id;
      }
    }
  }
});
