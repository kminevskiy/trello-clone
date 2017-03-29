var Commander = Backbone.View.extend({
  el: "main",

  initDragulaCards: function () {
    setTimeout(function () {
      var $lists = $(".list-body");
      var dragulaCards = [];
      if ($lists.length) {
        for (var i = 0; i < $lists.length; i++) {
          dragulaCards.push($lists[i]);
        }
        var drake = dragula(dragulaCards, {
          mirrorContainer: document.getElementsByClassName("card")[0]
        });
      }
    }, 500)
  },

  initialize: function () {
    this.initDragulaCards();
    this.listenTo(this.collection, "update", this.initDragula);
  }
});
