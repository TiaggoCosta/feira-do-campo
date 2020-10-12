const express = require('express');
const router  = express.Router();
const User = require('../models/user');

// INDEX - GET to show view for editing a user
router.get("/", function(req, res){
  const userId = req.user._id;
  User.findById(userId, (err, foundUser) => {
    if(err){
      console.log('Error getting user from DB');
    }
    res.render('pages/users/edit', { user: foundUser });
  });
});

// UPDATE - update a user
router.put('/', (req, res) => {
  const userId = req.user._id;

  const { firstName, lastName, password } = req.body;
  const user = { firstName, lastName };

  if (password)
    user.password = password;

  User.findByIdAndUpdate(userId, user, (err, updatedUser) => {
    if(err) {
      console.log(err);
    }
    console.log('User updated successfully, id: ' + updatedUser.id);
    res.redirect('/user');
  });
});

module.exports = router;