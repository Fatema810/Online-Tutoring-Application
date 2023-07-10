var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Data Base Connection
var monk = require("monk");
var db = monk("localhost:27017/tutorasium");
var collection = db.get("users");
var collectionfav = db.get("favorites");
var ObjectID = require("mongodb").ObjectId;

//Logging
var log4js = require("log4js");
const { request } = require("../app");
var logger = log4js.getLogger();
logger.level = "debug";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// /* Check if User Exists */
// router.get('/validate/:state', function(req, res)
//   {
//       console.log("Inside Validate", req.params.state)
//       collection.findOne({ email: req.params.state }, function(err, user){
// 			if (err) throw err;
// 			if (user){
// 				res.json({ error : "User already exists. Please login!"} );
//       }
//       else {
//         res.json({ })
//       }
// })
// });

//Encryption
router.get("/encrpytion/:state", function (req, res) {
  let hashedPassword;
  bcrypt.genSalt(10, function (err, Salt) {
    bcrypt.hash(req.params.state, Salt, function (err, hash) {
      if (err) {
        res.json({ error: "'Cannot encrypt password'" });
      } else {
        console.log("Hash:", typeof hash);
        hashedPassword = hash;
        res.json({ password: hashedPassword });
      }
    });
  });
});

/* Register Users */
router.post("/register", function (req, res) {
  let { username, email, password } = req.body;
  let hashedPassword;
  let newUser;
  if (!(username && email && password)) {
    res.json({ error: "All fields are required!" });
  } else {
    collection.findOne({ email: email }, function (err, user) {
      if (err) throw err;

      if (user) {
        res.json({ error: "User already exists. Please login!" });
      } else {
        newUser = {
          username: username,
          email: email,
          password: password,
          favorites: [],
        };
        console.log("New User Information--", newUser);
        collection.insert(newUser, function (err, user) {
          if (err) throw err;
          var token = jwt.sign({ user_id: user._id, email }, "secretkey");
          if (token) {
            user.token = token;
          }
          res.json(user);
        });
      }
    });
  }
});

router.post("/updatepass", function (req, res) {
  let { email, password } = req.body;
  collection.findOne({ email: email }, function (err, user) {
    if (err) throw err;
    if (user) {
      collection.update(
        { email: email },
        { $set: { password: password } },
        function (err, user) {
          if (err) throw err;
          res.json(user);
        }
      );
      res.json(user);
    }
  });
});

router.post("/login", function (req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.json({ error: "All fields are required!" });
  } else {
    collection.findOne({ email: email }, function (err, user) {
      if (err) throw err;
      if (user == null) {
        res.json({ error: "User doesn't exist" });
      } else {
        if (user.password === password) {
          var token = jwt.sign({ user_id: user._id, email }, "secretkey");
          user.token = token;
          res.json(user);
        } else {
          res.json({ error: "User email or password is incorrect!" });
        }
      }
    });
  }
});

router.get("/getFavorites/:state", function (req, res) {
  collection.findOne({ _id: req.params.state }, function (err, user) {
    if (err) throw err;
    res.json(user.favorites);
  });
});

router.post("/addFavorite", function (req, res) {
  const { username, tutorId } = req.body;

  if (!(username && tutorId)) {
    res.json({ error: "All fields are required!" });
  } else {
    collection.update(
      { username: "emily" },
      { $push: { favorites: tutorId } },
      function (err, user) {
        if (err) throw err;
        if (username == null) {
          res.json({ error: "User doesn't exist" });
        } else {
          res.json({ message: "Update Success" });
        }
      }
    );
  }
});

router.get("/removeFavorite/:id/:tutorId", function (req, res) {
  collection.update(
    { _id: req.params.id },
    { $pull: { favorites: req.params.tutorId } },
    function (err, user) {
      if (err) throw err;
      res.json(user);
    }
  );
});

module.exports = router;
