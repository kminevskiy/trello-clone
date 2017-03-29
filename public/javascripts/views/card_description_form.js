var cardDescriptionExists = Handlebars.templates.card_with_description;
var cardDescriptionNotExists = Handlebars.templates.card_without_description;

var ModalDescriptionForm = Backbone.View.extend({
  templateWithDesc: cardDescriptionExists,

  templateWithoutDesc: cardDescriptionNotExists,

  className: "card-description",

  render: function (parentEl) {
    if (this.model.get("description") === "Not set") {
      this.$el.html(this.templateWithoutDesc(this.model.toJSON()));
    } else {
      this.$el.html(this.templateWithDesc(this.model.toJSON()));
    }

    this.delegateEvents();
    parentEl.html(this.el);

    return this;
  },

  events: {
    "click .toggle-description-edit": "showEditForm",
    "click .toggle-description-update": "showUpdateForm",
    "click .editable-description": "showUpdateForm",
    "click #nodescription-save": "submitNewDescription",
    "click #description-save": "submitUpdatedDescription",
    "click #nodescription-close": "closeSubmitForm",
    "click #description-close": "closeUpdateForm",
  },

  closeSubmitForm: function (e) {
    e.preventDefault();
    this.$("#card-nodescription-form").hide();
    $(".toggle-description-edit").show();
  },

  closeUpdateForm: function (e) {
    e.preventDefault();
    this.$("#card-description-form").hide();
    this.$("#description-update-container").show();
  },

  showUpdateForm: function (e) {
    e.preventDefault();
    var $textarea = this.$(".card-description-ta");
    this.$("#description-update-container").hide();
    this.$("#card-description-form").show();
    $textarea[0].focus();
  },

  showEditForm: function (e) {
    e.preventDefault();
    var $textarea = this.$(".card-description-ta");
    $(e.currentTarget).hide();
    this.$("#card-nodescription-form").show();
    $textarea[0].focus();
  },

  submitUpdatedDescription: function (e) {
    var $textarea = this.$(".card-description-ta");
    var description = $textarea.val();
    var self = this;

    if (description) {
      this.model.set("description", description);
    } else {
      this.model.set("description", "Not set");
    }

    this.model.save({ description: this.model.get("description") }, {
      success: function () {
        self.$el.detach();
        self.trigger("descriptionUpdate");
      }
    });
  },

  submitNewDescription: function (e) {
    var $textarea = this.$(".card-description-ta");
    var description = $textarea.val();
    var self = this;

    if (description) {
      this.model.set("description", description);
    } else {
      this.model.set("description", "Not set");
    }

    this.model.save({ description: this.model.get("description") }, {
      success: function () {
        self.$el.detach();
        self.trigger("descriptionUpdate");
      }
    });

    //this.$("#card-nodescription-form").hide();
    //$(".toggle-description-edit").show();
  }
});
