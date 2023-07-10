var express = require("express");
var router = express.Router();

var monk = require("monk");
// const { get, post } = require(".");
var db = monk("localhost:27017/tutorasium");
var ratings_collection = db.get("ratings");

router.post("/rating", function (req, res) {
  ratings_collection.insert(
    {
      username: "emily",
      tutorId: req.body.tutorId,
      ratings: req.body.ratings,
      feedback: req.body.feedback,
    },
    function (err, tutor) {
      if (err) throw err;
      res.json(tutor);
    }
  );
});

module.exports = router;
