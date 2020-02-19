const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username can't be empty" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password is too short" });
  }

  console.log( "SIGNUP FIND USER" );

  User.findOne({ username: username })
    .then(found => {
      if (found) {
        console.log( "SIGNUP USER FOUND" );
        return res.status(400).json({ message: "Username is already taken" });
      }
      console.log( "SIGNUP USER NEW" );
      return bcryptjs
        .genSalt()
        .then(salt => {
          console.log( "SIGNUP PWD CRYPTED" );
          return bcryptjs.hash(password, salt);
        })
        .then(hash => {
          console.log( "SIGNUP CREATE USER" );
          return User.create({ username: username, password: hash });
        })
        .then(newUser => {
          // passport login
          console.log( "SIGNUP LOGIN" );
          req.login(newUser, err => {
            if (err) res.status(500).json(err);
            else res.json(newUser);
          });
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const passport = require("passport");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      // no user found with username or password didn't match
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // passport req.login
    req.login(user, err => {
      if (err) res.status(500).json(err);
      res.json(user);
    });
  })(req, res, next);
});

router.delete("/logout", (req, res) => {
  // passport logout function
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
