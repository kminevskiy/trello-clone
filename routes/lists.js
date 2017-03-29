var path = require("path");
var sqlite = require(path.resolve(path.dirname(__dirname), "local_modules/sqlite"));

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render("index");
  });

  router.get("/all_lists", function (req, res) {
    sqlite.getLists(function (lists) {
      res.status(200).json(lists);
    });
  });

  router.put("/list/:listID", function (req, res) {
    var list = req.body;
    sqlite.updateList(list, function () {
      res.status(200).end();
    });
  });

  router.get("/list/:id", function (req, res) {
    var listID = req.params.id;
    sqlite.getList(listID, function (list) {
      res.status(200).json(list);
    });
  });

  router.delete("/list/:id", function (req, res) {
    var listID = req.params.id;
    sqlite.deleteList(listID, function () {
      res.status(200).end();
    });
  });

  router.post("/lists", function (req, res) {
    var newList = req.body;
    sqlite.addList(newList, function (returnedList) {
      res.status(201).json(returnedList);
    });
  });

  router.post("/cards", function (req, res) {
    var newCard = req.body;
    sqlite.addCard(newCard, function (returnedCard) {
      res.status(201).json(returnedCard);
    });
  });

  /*
  router.get("/cards/:listID", function (req, res) {
    var listID = req.params.listID;
    sqlite.getCardsForList(listID, function (cards) {
      res.status(200).json(cards);
    });
  });

  router.get("/card/:cardID", function (req, res) {
    var cardID = req.params.cardID;
    sqlite.getCardFromList(cardID, function (card) {
      res.status(200).json(card);
    });
  });
  */

  router.put("/card/:cardID", function (req, res) {
    var card = req.body;
    sqlite.updateCard(card, function (returnedCard) {
      res.status(200).json(returnedCard);
    });
  });

  router.delete("/card/:cardID", function (req, res) {
    sqlite.deleteCard(req.params.cardID, function () {
      res.status(200).end();
    });
  });

  router.post("/move_card", function (req, res) {
    var card = req.body;
    sqlite.moveCard(card, function (cardToMove) {
      res.status(201).json(cardToMove);
    });
  });

  router.post("/copy_card", function (req, res) {
    var card = req.body;
    console.log(card);
    sqlite.copyCard(card, function (cardToCopy) {
      res.status(201).json(cardToCopy);
    });
  });

  router.post("/change_date", function (req, res) {
    var card = req.body;
    res.status(200).end();
  });

  router.post("/comments", function (req, res) {
    var card = req.body;
    sqlite.addComment(card, function (newComment) {
      res.status(200).json(newComment);
    });
  });

  router.get("/comments/:cardID", function (req, res) {
    sqlite.getComments(req.params.cardID, function (comments) {
      res.status(200).json(comments);
    });
  });

  router.get("/comment/:commentID", function (req, res) {
    sqlite.getComment(req.params.commentID, function (comment) {
      res.status(200).json(comment);
    });
  });

  router.put("/comment/:commentID", function (req, res) {
    var comment = req.body;
    sqlite.updateComment(comment, function (updatedComment) {
      res.status(200).end();
    });
  });

  router.delete("/comment/:commentID", function (req, res) {
    sqlite.deleteComment(req.params.commentID, function () {
      res.status(200).end();
    });
  });
}
