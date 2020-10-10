const express = require('express');
const router  = express.Router();

// INDEX - GET register form
router.get("/", function(req, res){
  res.render("pages/register"); 
});

module.exports = router;