const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const passport = require('passport');

// INDEX - GET login form
router.get("/", function(req, res){
  res.render("pages/login"); 
});

//POST authenticate
router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next)
})

// GET logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Deslogado com sucesso!")
  console.log("Deslogado com sucesso");
  res.redirect("/");
})

module.exports = router;