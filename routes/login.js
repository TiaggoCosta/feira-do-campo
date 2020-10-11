const express = require('express');
const router  = express.Router();
const User = require('../models/user');

// INDEX - GET login form
router.get("/", function(req, res){
    res.render("pages/login"); 
  });

module.exports = router;