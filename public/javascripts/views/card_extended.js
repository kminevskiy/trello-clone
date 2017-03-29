var extendedModal = Handlebars.templates.card_extended_modal;

var CardExtendedModal = Backbone.View.extend({
  template: extendedModal,

  className: "card-extended-modal",

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    app.modal.html(this.$el.show());
    this.toggleSubscribeSpan();

    this.descriptionForm.render(this.$("#card-description-view"));
    this.renderComments();

    return this;
  },

  events: {
    "click #close-parent": "closeModal",
    "click #second-overlay": "closeModal",
    "keypress .editable-name": "submitCardName",
    "click #card-copy": "copyCard",
    "click #card-move": "moveCard",
    "click #card-archive": "archiveCard",
    "click #card-subscribe": "subscribeToCard",
    "click #card-due": "changeDue",
    "click #card-labels": "changeLabels",
    "keyup [name='newComment']": "checkCommentInput",
    "click #new-comment": "addNewComment"
  },

  subscribeToCard: function (e) {
    var cardID = $(e.currentTarget).data("id");
    var subscribed = this.model.get("subscribed");

    subscribed ? this.model.set("subscribed", 0) : this.model.set("subscribed", 1);
    this.toggleSubscribeSpan();
    this.model.save();
  },

  toggleSubscribeSpan: function () {
    var subscribed = this.model.get("subscribed");
    var $subscribeStatus = $("#card-subscribe-status");

    if (subscribed) { $subscribeStatus.show(); }
    else { $subscribeStatus.hide(); }
  },

  checkCommentInput: function (e) {
    var comment = $(e.currentTarget).val();
    var $submit = $("#new-comment");
    if (comment) {
      $submit.attr("disabled", false);
      $submit.removeClass("disabled-submit");
    }
    else {
      $submit.attr("disabled", true);
      $submit.addClass("disabled-submit");
    }
  },

  addNewComment: function (e) {
    e.preventDefault();
    var $form = this.$("#new-comment-form");
    var self = this;
    var comment;
    $.ajax({
      url: $form.attr("action"),
      method: $form.attr("method"),
      data: $form.serialize(),
      success: function (commentData) {
        comment = new Comment(commentData);
        self.comments.add(comment);
        new CommentView({ model: comment, card: self.model });

        $form[0].reset();
        self.$("#new-comment").addClass("disabled-submit");
        self.model.trigger("commentChanged");
      }
    });
  },

  changeDue: function () {
    new ChangeDueDate({ model: this.model });
  },

  changeLabels: function () {
    this.editLabelsModal.render();
  },

  copyCard: function () {
    new CopyCardModal({ model: this.model });
  },

  moveCard: function () {
    new MoveCardModal({ model: this.model });
  },

  archiveCard: function () {
    this.model.destroy();
    this.remove();
  },

  isSubscribed: function () {
    return this.model.get("subscribed");
  },

  createEventData: function (oldCardName, newCardName) {
    return {eventType: "cardNameChange",
      oldCard: oldCardName,
      card: newCardName
    };
  },

  submitCardName: function (e) {
    var oldCardName = this.model.get("card_name");
    var newCardName = $(e.currentTarget).val();

    if (e.which === 13) {
      if (this.isSubscribed()) {
        new SubscribedCardEvent({ model: this.createEventData(oldCardName, newCardName) })
      }

      this.model.set("card_name", newCardName);
      this.model.save();
      this.$(".editable-name").blur();
    }
  },

  renderComments: function () {
    var comments = this.model.get("comments");
    comments.forEach(function (comment) {
      new CommentView({ model: comment });
    });
  },

  initialize: function () {
    this.comments = this.model.get("comments");
    this.descriptionForm = new ModalDescriptionForm({ model: this.model });
    this.editLabelsModal = new EditLabelsModal({ model: this.model });
    this.listenTo(this.descriptionForm, "descriptionUpdate", this.rerenderForm);
    this.listenTo(this.comments, "remove", this.emitCommentChange);
  },

  emitCommentChange: function () {
    this.model.trigger("commentChanged");
  },

  rerenderForm: function () {
    this.descriptionForm.render(this.$("#card-description-view"));
  },

  closeModal: function (e) {
    e.preventDefault();
    var self = this;
    this.$el.fadeOut(100, function () {
      self.$el.detach();
    });
  }
});
