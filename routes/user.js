const express = require('express');
const router  = express.Router();
const User = require('../models/user');

// INDEX - GET to show view for editing a user
router.get("/", function(req, res){
  const userId = '5f83ab4acdb69d284499bf21';
  User.findById(userId, (err, foundUser) => {
    if(err){
      console.log('Error getting user from DB');
    }
    res.render('pages/users/edit', { user: foundUser });
  });
});

module.exports = router;