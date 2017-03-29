var copyCardModal = Handlebars.templates.copy_card_modal;

var CopyCardModal = Backbone.View.extend({
  template: copyCardModal,

  className: "copy-modal-container",

  render: function () {
    this.$el.html(this.template({ card: this.model.toJSON(), lists: this.lists }));
    app.modal.append(this.el);

    this.listPositionsView = new ListPositions();
    this.listPositionsView.render(this.list.cardsNum);

    return this;
  },

  initialize: function () {
    this.lists = this.getListNames();
    this.list = this.getListID(this.model.get("list_id"));
    this.render();
  },

  isSubscribed: function () {
    return this.model.get("subscribed");
  },

  createEventData: function (oldCardName, newCardName) {
    return {eventType: "cardCopy",
      oldCard: oldCardName,
      card: newCardName
    };
  },

  getListID: function (listID) {
    var lists = this.getListNames();
    return lists.find(function (list) {
      return +list["listID"] === +listID;
    });
  },

  getListNames: function () {
    var lists = [];
    app.lists.toJSON().forEach(function (list) {
      lists.push({ listName: list["list_name"],
        listID: list["id"],
        cardsNum: list.cards.toJSON().length,
        thisListName: this.model.get("list_name"),
      });
    }, this);

    return lists;
  },

  events: {
    "click #third-overlay": "closeModal",
    "submit": "submitCardCopy",
    "change .copy-to-list": "updateListPositions"
  },

  updateListPositions: function (e) {
    var selectedList = $(e.currentTarget).val();
    var thisList = this.getListID(selectedList);
    this.listPositionsView.render(thisList.cardsNum);
  },

  recalculateToList: function (newCard) {
    var toList = app.lists.find({ id: newCard.get("list_id") });
    var toListCards = toList.get("cards");

    if (toListCards.length) {
      toListCards.each(function (card) {
        if (card.get("position") >= newCard.get("position") && card.get("id") !== newCard.get("id")) {
          card.save("position", card.get("position") + 1);
        }
      });
    }

    return toList;
  },

  submitCardCopy: function (e) {
    e.preventDefault();
    var self = this;
    var oldCardName = this.model.get("card_name");
    var $form = this.$("form");
    var list, card;

    $.ajax({
      url: $form.attr("action"),
      method: $form.attr("method"),
      data: $form.serialize(),
      success: function (cardData) {
        card = new Card(cardData);
        list = self.recalculateToList(card);
        list.get("cards").add(card);
        if (self.isSubscribed()) {
          new SubscribedCardEvent({ model: self.createEventData(oldCardName, card.get("card_name")) })
        }
        self.addNewCardToView(card);
        self.closeModal();
      }
    });
  },

  addNewCardToView: function (card) {
    var cardView = new CardView({ model: card });
    var cardPosition = card.get("position");
    var cardListID = card.get("list_id");
    var $listToAppendTo = $(".list-body[data-id=" + cardListID + "]");
    var insertPosition = Math.abs(cardPosition - 1);
    var $prevCard = $listToAppendTo.find(".card").eq(insertPosition);
    if ($prevCard.length) {
      $prevCard.before(cardView.render().el);
    } else {
      $listToAppendTo.append(cardView.render().el);
    }
  },

  closeModal: function () {
    var self = this;
    this.$el.hide(50, function () {
      self.remove();
    });
  }
});

Handlebars.registerHelper("sameNames", function (listName, currentListName) {
  if (listName === currentListName) return true;
});

