var list = Handlebars.templates.list_view;

var ListView = Backbone.View.extend({
  template: list,

  className: "list-container",

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    var cards = this.model.get("cards");
    if (cards) {
      cards.forEach(function (card) {
        var newCard = new CardView({ model: card });
        this.$(".list-body").append(newCard.render().el);
      }, this);
    }

    return this;
  },

  initialize: function () {
    this.cards = this.model.get("cards");
    this.newCardForm = new NewCardForm(this.model.toJSON());
    this.listenTo(this.model, "destroy", this.remove);
    this.listenTo(this.newCardForm, "hideCardForm", this.renderAddButton);
    this.listenTo(this.newCardForm, "newCardAdded", this.createNewCard);
    this.listenTo(this.model, "addCardFromList", this.addCard);
    this.$el.attr("id", this.model.get("id"));
  },

  events: {
    "click .add-card": "addCard",
    "click .list-actions": "openListActions",
    "blur [type='text']": "updateListName"
  },

  updateListName: function () {
    var input = this.$("[type='text']").val();
    this.model.set("list_name", input);
    this.updateListCards(input);
    this.model.save();
  },

  updateListCards: function (newListName) {
    this.model.get("cards").forEach(function (card) {
      card.set("list_name", newListName);
    });
  },

  openListActions: function (e) {
    e.preventDefault();
    new ListActionsModal({ model: this.model });
    app.listActions.fadeIn(100);
  },

  createNewCard: function (card) {
    var newCard;
    if (this.cards) {
      newCard = this.cards.add(card);
    } else {
      newCard = new Card(card);
    }

    var newCardView = new CardView({ model: newCard });
    this.$(".list-body").append(newCardView.render().el);
  },

  addCard: function (e) {
    if (e) e.preventDefault();
    this.$(".add-card").hide();
    this.$(".list-body").append(this.newCardForm.render().el);
    this.newCardForm.$el.find("textarea").focus();
  },

  renderAddButton: function () {
    this.$(".add-card").show()
  }
});
