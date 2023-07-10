var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var monk = require("monk");
var db = monk("localhost:27017/tutorasium");
var collection = db.get("tutors");

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

/* Register Tutors */
router.post("/register", function (req, res) {
  let { tutorname, email, password } = req.body;
  if (!(tutorname && email && password)) {
    res.json({ error: "All fields are required!" });
  } else {
    collection.findOne({ email: email }, function (err, tutor) {
      if (err) throw err;

      if (tutor) {
        res.json({ error: "Tutor already exists. Please login!" });
      } else {
        let newTutor = {
          tutorname,
          email,
          password,
          favorites: [],
        };

        console.log("New tutor Information--", newTutor);
        collection.insert(newTutor, function (err, tutor) {
          if (err) throw err;
          var token = jwt.sign({ tutor_id: tutor._id, email }, "secretkey");
          if (token) {
            tutor.token = token;
          }
          res.json(tutor);
        });
      }
    });
  }
});

/*Tutor Login */
router.post("/login", function (req, res) {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.json({ error: "All fields are required!" });
  } else {
    collection.findOne({ email: email }, function (err, tutor) {
      if (err) throw err;
      if (tutor == null) {
        res.json({ error: "tutor doesn't exist" });
      } else {
        if (tutor.password === password) {
          var token = jwt.sign({ tutor_id: tutor._id, email }, "secretkey");
          tutor.token = token;
          res.json(tutor);
        } else {
          res.json({ error: "tutor email or password is incorrect!" });
        }
      }
    });
  }
});

// console.log(collection);

router.get("/", function (req, res) {
  collection.find({}, function (err, videos) {
    if (err) throw err;

    res.json(videos);
  });
});

// console.log(collection);

router.get("/", function (req, res) {
  collection.find({}, function (err, tutors) {
    if (err) throw err;
    res.json(tutors);
  });
});

router.get("/:state", function (req, res) {
  collection.find({ _id: req.params.state }, function (err, tutor) {
    if (err) throw err;
    console.log("Tutor:", tutor);
    res.json(tutor);
  });
});

router.post("/", function (req, res) {
  console.log(req);
  collection.insert(
    {
      name: req.body.name,
      email: req.body.email,
      certificates: req.body.certified,
      experience: req.body.experience,
      expertise: req.body.expertise,
      about_me: req.body.about_me,
    },
    function (err, tutor) {
      if (err) throw err;
      res.json(tutor);
    }
  );
});

router.put("/:id", function (req, res) {
  collection.update(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        certificates: req.body.certified,
        experience: req.body.experience,
        expertise: req.body.expertise,
        about_me: req.body.about_me,
      },
    },
    function (err, video) {
      if (err) throw err;
      res.json(video);
    }
  );
});

router.delete("/:id", function (req, res) {
  collection.remove({ _id: req.params.id }, function (err, video) {
    if (err) throw err;
    console.log("Deleted");
    res.json(video);
  });
});

module.exports = router;
