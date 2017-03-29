var commentTemplate = Handlebars.templates.comment;
var commentEditTemplate = Handlebars.templates.comment_edit;

var CommentView = Backbone.View.extend({
  template: commentTemplate,

  render: function (tmpl) {
    this.$el.html(this.template(this.model.toJSON()));
    $(".card-comments h3").after(this.el);

    return this;
  },

  initialize: function () {
    this.render();
  },

  events: {
    "click #edit-comment": "editComment",
    "click #delete-comment": "deleteComment",
    "click #edit-comment-submit": "submitCommentChange"
  },

  submitCommentChange: function (e) {
    e.preventDefault();
    var newCommentBody = this.$("[name='editComment']").val();
    this.model.set("comment_body", newCommentBody);
    this.model.save();
    this.$(".comment-edit-form").hide();
    this.$(".comment-body").text(newCommentBody);
    this.$(".card-comment").show();
  },

  deleteComment: function (e) {
    e.preventDefault();
    this.model.destroy();
    this.remove();
  },

  editComment: function (e) {
    e.preventDefault();
    this.$(".card-comment").hide();
    this.$(".comment-edit-form").show();
  }
});
