var topMenu = Handlebars.templates.top_menu;

var TopNavMenuView = Backbone.View.extend({
  template: topMenu,

  render: function () {
    this.$el.html(this.template());
    app.header.html(this.el);
  },

  initialize: function () {
    this.render();
  },

  events: {
    "click #card-search": "showResultsModal",
    "blur #card-search": "hideResultsModal",
    "keyup #card-search": "searchCard",
    "click #board-notifications": "showNotificationsModal",
    "click #notifications-close": "hideNotificationsModal",
    "focusout #notifications": "hideNotificationsModal"
  },

  showNotificationsModal: function (e) {
    e.preventDefault();
    $("#notifications").fadeIn(300).attr("tabindex", -1).focus();
  },

  hideNotificationsModal: function (e) {
    e.preventDefault();
    $("#notifications").fadeOut(300);
  },

  hideResultsModal: function (e) {
    var self = this;
    this.$("#card-search").val("");
    this.$("#search-results").fadeOut(100, function () {
      self.$("#search-results").empty();
    });
  },

  showResultsModal: function (e) {
    this.$("#search-results").fadeIn(100);
  },

  searchCard: function (e) {
    var lists = app.lists;
    var search = this.$("#card-search");
    var searchVal = search.val().trim().toLowerCase();
    var foundCards, listCards, cardName;
    this.$("#search-results").empty();

    lists.forEach(function (list) {
      listCards = list.get("cards");
      foundCards = listCards.filter(function (card) {
        cardName = card.get("card_name").toLowerCase();
        return cardName.includes(searchVal);
      }, this);

      if (foundCards.length) {
        foundCards.forEach(function (card) {
          this.renderFoundCard(card);
        }, this)
      }
    }, this);

    if (!searchVal) {
      this.$("#search-results").empty();
    }
  },

  renderFoundCard: function (card) {
    var foundCardView = new FoundCardView({ model: card });
    this.$("#search-results").append(foundCardView.render().el);
  }
});
