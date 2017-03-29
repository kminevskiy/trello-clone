var path = require("path");
var express = require("express");
var router = express.Router();

var routes = ["lists"];

routes.forEach(function (r) {
  require(path.resolve(path.dirname(__dirname), "routes/" + r))(router);
});

module.exports = router;
