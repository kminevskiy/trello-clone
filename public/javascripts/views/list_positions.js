var ListPositions = Backbone.View.extend({
  el: ".copy-to-position",

  render: function (cardsNum) {
    this.$el.empty();

    var option;
    for (var i = 0; i <= cardsNum; i++) {
      if (i === cardsNum) {
        option = "<option value=" + (i + 1) + " selected>" + (i + 1) + "</option>";
      } else {
        option = "<option value=" + (i + 1) + ">" + (i + 1) + "</option>";
      }

      this.$el.append(option);
    }
  },

  initialize: function () {
  }
});
