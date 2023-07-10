var express = require("express");
var router = express.Router();

var monk = require("monk");
const { get, post } = require(".");
var db = monk("localhost:27017/tutorasium");
var collection = db.get("appointments");

console.log(collection);

router.get("/", function (req, res) {
  collection.find({}, function (err, appointments) {
    if (err) throw err;
    res.json(appointments);
  });
});

router.get("/:tutor/:date", function (req, res) {
  collection.find(
    { tutor: req.params.tutor, date: new Date(req.params.date) },
    function (err, appointments) {
      if (err) throw err;
      res.json(appointments);
    }
  );
});

router.post("/", function (req, res) {
  collection.insert(
    {
      tutor: req.body.tutor,
      username: req.body.username,
      date: new Date(req.body.date),
    },
    function (err, appointent) {
      if (err) throw err;
      res.json(appointent);
    }
  );
});

router.get("/:state", function (req, res) {
  collection.find({ _id: req.params.state }, function (err, tutor) {
    if (err) throw err;
    res.json(tutor);
  });
});

router.delete("/:id", function (req, res) {
  collection.remove({ _id: req.params.id }, function (err, video) {
    if (err) throw err;
    res.json(video);
  });
});

module.exports = router;
