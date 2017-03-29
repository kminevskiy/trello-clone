var editLabelsModal = Handlebars.templates.edit_labels_modal;

var EditLabelsModal = Backbone.View.extend({
  template: editLabelsModal,

  className: "edit-labels-container",

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    app.modal.append(this.$el.fadeIn(50));
    this.$("[type=search]")[0].focus();

    return this;
  },

  events: {
    "click #third-overlay": "closeModal",
    "click a.close": "closeModal",
    "keyup [type=search]": "filterLabels",
    "click .label-color": "toggleLabel"
  },

  toggleLabel: function (e) {
    var $label = $(e.currentTarget);
    var $span = $label.children().first();
    var labelColor = $label.data("color");
    var cardLabelStatus = this.model.get(labelColor);
    cardLabelStatus === "used" ? this.model.set(labelColor, "unused") : this.model.set(labelColor, "used");
    if ($span.hasClass("label-used")) {
      $span.removeClass("label-used");
    } else {
      $span.addClass("label-used");
    }
    this.model.trigger("labelChanged");
    this.model.save();
  },

  filterLabels: function (e) {
    var input = $(e.currentTarget).val();
    var inputLength = input.length;
    var color;

    this.$(".label-color").each(function (_, label) {
      color = $(label).data("color");
      if (color.includes(input)) { $(label).show(); }
      else { $(label).hide(); }
    });
  },

  closeModal: function () {
    var self = this;
    this.$el.hide(50, function () {
      self.$el.detach();
    });
  }
});

Handlebars.registerHelper("labelUsed", function (colorProperty) {
  return colorProperty === "used" ? "label-used" : "";
});
