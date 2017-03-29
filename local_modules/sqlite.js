var fs = require("fs");
var path = require("path");
var sqlite3 = require("sqlite3").verbose();

var dbFile = path.resolve(path.dirname(__dirname), "db/lists.db");
var db = new sqlite3.Database(dbFile);

var sqlite = {
  init: function () {
    db.serialize(function () {
      if (!fs.existsSync(dbFile)) {
        db.run("CREATE TABLE lists (id INTEGER PRIMARY KEY, list_name TEXT, subscribed INTEGER, date_created TEXT)");
        db.run("CREATE TABLE cards (id INTEGER PRIMARY KEY, list_id INTEGER, card_name TEXT, description TEXT, position INTEGER, subscribed INTEGER, date_created TEXT, due_date TEXT, due_time TEXT, FOREIGN KEY (list_id) REFERENCES lists(id))");
        db.run("CREATE TABLE labels (id INTEGER PRIMARY KEY, card_id INTEGER, red TEXT, blue TEXT, green TEXT, black TEXT, purple TEXT, yellow TEXT, orange TEXT, FOREIGN KEY (card_id) REFERENCES cards(id))");
        db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY, card_id INTEGER, comment_body TEXT, comment_author TEXT, date_created TEXT, FOREIGN KEY (card_id) REFERENCES cards(id))");
      }
    });
  },

  addList: function (list, callback) {
    db.run('INSERT INTO lists VALUES (null, $list_name, 0, date("now"))', {
      $list_name: list.listName.trim(),
    }, function () {
      db.get("SELECT * FROM lists WHERE id = $id", {
        $id: this.lastID
      }, function (err, row) {
        callback(row);
      });
    });
  },

  deleteList: function (listID, callback) {
    db.serialize(function () {
      db.run("DELETE FROM lists WHERE id = $id", {
        $id: listID
      });

      db.each("SELECT id FROM cards WHERE list_id = $id", {
        $id: listID
      }, function (err, card) {
        db.run("DELETE FROM labels WHERE card_id = $id", {
          $id: card.id
        });

        db.run("DELETE FROM comments WHERE card_id = $id", {
          $id: card.id
        });
      });

      db.run("DELETE FROM cards WHERE list_id = $id", {
        $id: listID
      }, function () {
        callback();
      });
    });
  },

  updateList: function (list, callback) {
    db.get("UPDATE lists SET list_name = $list_name, subscribed = $subscribed WHERE id = $id", {
      $id: list.id,
      $list_name: list.list_name,
      $subscribed: list.subscribed
    }, function () {
      callback();
    });
  },

  getLists: function (callback) {
    var lists = [];
    db.serialize(function () {
      db.each("SELECT * FROM lists", function (err, list) {
        list.cards = [];
        lists.push(list);
      });

    db.all("SELECT cards.id AS id, cards.list_id, cards.card_name, cards.description, cards.position, cards.subscribed, cards.due_date, cards.due_time, cards.date_created, lists.list_name, labels.id AS label_id, labels.red, labels.blue, labels.green, labels.black, labels.purple, labels.yellow, labels.orange FROM cards JOIN lists ON cards.list_id = lists.id JOIN labels ON cards.id = labels.card_id ORDER BY cards.position ASC", function (err, cards) {
        for (var i = 0; i < lists.length; i++) {
          listsCards = lists[i].cards;
          cards.forEach(function (card) {
            if (card.list_id === lists[i].id) {
              listsCards.push(card);
            }
          });
        }
    });

    db.all("SELECT * FROM comments", function (err, comments) {
      var cards, cardComments;
      lists.forEach(function (list) {
        cards = list.cards;
        cards.forEach(function (card) {
          card.comments = [];
          comments.forEach(function (comment) {
            if (card.id === comment.card_id) {
              card.comments.push(comment);
            }
          });
        });
      });
    callback(lists);
    });
    });
  },

  getList: function (listID, callback) {
    var list;
    db.get("SELECT * FROM lists WHERE id = $id", {
      $id: listID
    }, function (err, row) {
      list = row;
      list.cards = [];

      db.each("SELECT cards.id, cards.list_id, cards.card_name, cards.description, cards.subscribed, cards.due_date, cards.due_time, cards.date_created, lists.list_name, labels.id AS label_id, labels.red, labels.blue, labels.green, labels.black, labels.purple, labels.yellow, labels.orange FROM cards JOIN lists ON cards.list_id = lists.id JOIN labels ON cards.id = labels.card_id WHERE lists.id = $id", {
        $id: listID
      }, function (err, row) {
        list.cards.push(row);
      }, function () {
        callback(list);
      });
    });
  },

  addCard: function (card, callback) {
    var last_id;
    db.serialize(function () {
      db.run('INSERT INTO cards VALUES (null, $listID, $name, $description, $position, 0, date("now"), $due_date, $due_time)', {
        $listID: card.listID,
        $name: card.cardName,
        $description: "Not set",
        $position: card.position,
        $due_date: "Not set",
        $due_time: "Not set"
      }, function () {
        lastID = this.lastID;

        db.serialize(function () {
          db.run('INSERT INTO labels VALUES (null, $cardID, $red, $blue, $green, $black, $purple, $yellow, $orange)', {
            $cardID: lastID,
            $red: "unused", $blue: "unused", $green: "unused", $black: "unused", $purple: "unused", $yellow: "unused", $orange: "unused"
          });

          db.get("SELECT cards.id, cards.list_id, cards.card_name, cards.description, cards.position, cards.subscribed, cards.due_date, cards.due_time, cards.date_created, lists.list_name, labels.id AS label_id, labels.red, labels.blue, labels.green, labels.black, labels.purple, labels.yellow, labels.orange FROM cards JOIN lists ON cards.list_id = lists.id JOIN labels ON cards.id = labels.card_id WHERE cards.id = $id", {
            $id: lastID
          }, function (err, row) {
            callback(row);
          });
        });
      });
    });
  },
  /*
  getCardsForList: function (listID, callback) {
    var cards = [];
    db.each("SELECT cards.id, cards.card_name, cards.description, cards.due_date, cards.due_time, cards.date_created, lists.list_name, labels.id AS label_id, labels.red, labels.blue, labels.green, labels.black, labels.purple, labels.yellow, labels.orange FROM cards JOIN lists ON cards.list_id = lists.id JOIN labels ON cards.id = labels.card_id WHERE lists.id = $id", {
      $id: listID
    }, function (err, row) {
      cards.push(row);
    }, function () {
      callback(cards);
    });
  },

  getCardFromList: function (cardID, callback) {
    db.get("SELECT cards.id, cards.card_name, cards.description, cards.due_date, cards.due_time, cards.date_created, lists.list_name, labels.id AS label_id, labels.red, labels.blue, labels.green, labels.black, labels.purple, labels.yellow, labels.orange FROM cards JOIN lists ON cards.list_id = lists.id JOIN labels ON cards.id = labels.card_id WHERE cards.id = $id", {
      $id: cardID
    }, function (err, row) {
      callback(row);
    })
  },
  */

  updateCard: function (card, callback) {
    db.serialize(function () {
      db.run("UPDATE cards SET card_name = $card_name, description = $description, subscribed = $subscribed, due_date = $due_date, due_time = $due_time, position = $position WHERE id = $id", {
        $id: card.id,
        $card_name: card.card_name,
        $description: card.description,
        $position: card.position,
        $due_date: card.due_date,
        $due_time: card.due_time,
        $subscribed: card.subscribed
      });

      db.run("UPDATE labels SET card_id = $cardID, red = $red, blue = $blue, green = $green, black = $black, orange = $orange, purple = $purple, yellow = $yellow WHERE id = $id", {
        $cardID: card.id,
        $id: card.label_id,
        $red: card.red, $blue: card.blue, $green: card.green, $black: card.black, $orange: card.orange, $purple: card.purple,
        $yellow: card.yellow
      });

      db.get("SELECT cards.id, cards.list_id, lists.list_name, cards.card_name, cards.description, cards.position, cards.subscribed, cards.date_created, cards.due_date, cards.due_time, labels.id AS label_id, labels.red, labels.blue, labels.green, labels.black, labels.orange, labels.purple, labels.yellow FROM cards JOIN lists ON cards.list_id = lists.id JOIN labels ON cards.id = labels.card_id WHERE cards.id = $id", {
        $id: card.id
      }, function (err, updatedCard) {
        callback(updatedCard);
      });
    });
  },

  deleteCard: function (cardID, callback) {
    db.serialize(function () {
      db.run("DELETE FROM cards WHERE id = $id", {
        $id: cardID
      });

      db.run("DELETE FROM labels WHERE card_id = $id", {
        $id: cardID
      });

      callback();
    });
  },

  moveCard: function (card, callback) {
    var lastID;
    db.serialize(function () {
      db.run("UPDATE cards SET list_id = $list_id, position = $position WHERE id = $id", {
        $list_id: card.toList,
        $position: card.toPosition,
        $id: card.cardID
      });

      db.run("UPDATE labels SET card_id = $card_id WHERE id = $label_id", {
        $card_id: card.cardID,
        $label_id: card.label_id
      });

      db.get("SELECT cards.id, cards.list_id, lists.list_name, cards.card_name, cards.description, cards.position, cards.subscribed, cards.date_created, cards.due_date, cards.due_time, labels.id AS label_id, labels.red, labels.blue, labels.green, labels.black, labels.purple, labels.yellow, labels.orange FROM cards JOIN lists ON cards.list_id = lists.id JOIN labels ON cards.id = labels.card_id WHERE cards.id = $id", {
        $id: card.cardID
      }, function (err, card) {
        callback(card);
      });
    });
  },

  copyCard: function (card, callback) {
    var lastID;
    db.run('INSERT INTO cards VALUES (null, $listID, $name, $description, $position, 0, date("now"), $due_date, $due_time)', {
      $listID: card.toList,
      $name: card.cardName,
      $description: card.description,
      $position: card.toPosition,
      $due_date: card.dueDate,
      $due_time: card.dueTime
    }, function () {
      lastID = this.lastID;

      db.serialize(function () {
        db.get("SELECT * FROM labels WHERE card_id = $id", {
          $id: card.cardID
        }, function (err, label) {

          db.run("INSERT INTO labels VALUES (null, $cardID, $red, $blue, $green, $black, $purple, $yellow, $orange)", {
            $cardID: lastID,
            $red: label.red, $blue: label.blue, $green: label.green, $black: label.black,
            $purple: label.purple, $yellow: label.yellow, $orange: label.orange
          });

          db.each("SELECT * FROM comments WHERE id = $id", {
            $id: card.cardID
          }, function (err, comment) {
              db.run('INSERT INTO comments VALUES (null, $cardID, $commentBody, "K", $dateCreated)', {
                $cardID: lastID,
                $commentBody: comment.comment_body,
                $dateCreated: comment.date_created
              });
          });

          db.get("SELECT cards.id, cards.card_name, cards.description, cards.subscribed, cards.due_date, cards.due_time, cards.date_created, cards.position, cards.list_id, labels.id AS label_id, labels.red, labels.blue, labels.green, labels.black, labels.purple, labels.yellow, labels.orange FROM cards JOIN labels ON cards.id = labels.card_id WHERE cards.id = $id", {
            $id: lastID
          }, function (err, card) {
            callback(card);
          });
        });
      });
    });
  },

  addComment: function (card, callback) {
    var lastID;
    db.serialize(function () {
      db.run('INSERT INTO comments VALUES (null, $cardID, $commentBody, "K", date("now"))', {
        $cardID: card.cardID,
        $commentBody: card.newComment
      }, function () {
        lastID = this.lastID;
        db.get("SELECT * FROM comments WHERE id = $id", {
          $id: lastID
        }, function (err, comment) {
          callback(comment);
        });
      });
    });
  },

  getComments: function (cardID, callback) {
    db.all("SELECT * FROM comments WHERE card_id = $cardID", {
      $cardID: cardID
    }, function (err, comments) {
      callback(comments);
    });
  },

  updateComment: function (comment, callback) {
    db.serialize(function () {
      db.run("UPDATE comments SET comment_body = $commentBody WHERE id = $id", {
        $id: comment.id,
        $commentBody: comment.comment_body
      });

      db.get("SELECT comment_body FROM comments WHERE id = $id", {
        $id: comment.id
      }, function (err, comment) {
        callback(comment);
      });
    });
  },

  deleteComment: function (commentID, callback) {
    db.run("DELETE FROM comments WHERE id = $id", {
      $id: commentID
    }, function () {
      callback();
    });
  }
}

module.exports = sqlite;
