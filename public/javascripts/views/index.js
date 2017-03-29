var IndexView = Backbone.View.extend({
  el: app.listsContainer,

  render: function () {
    var listItem;
    this.collection.forEach(function (model) {
      listItem = new ListView({ model: model });
      this.$el.append(listItem.render().el);
    }, this);
  },

  setCardsToLists: function () {
    this.collection.forEach(function (listModel) {
      var cards = new Cards(listModel.get("cards"));
      listModel.set("cards", cards);
    });
  },

  setCommentsToCards: function () {
    this.collection.forEach(function (listModel) {
      var cards = listModel.get("cards");
      cards.forEach(function (cardModel) {
        if (cardModel.get("comments")) {
          var comments = new Comments(cardModel.get("comments"));
          cardModel.set("comments", comments);
        } else {
          cardModel.set("comments", new Comments());
        }
      });
    });
  },

  initialize: function () {
    this.setCardsToLists();
    this.setCommentsToCards();
    this.render();
  }
});
