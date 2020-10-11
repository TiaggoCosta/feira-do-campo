const express = require('express');
const router  = express.Router();
const User = require('../models/user');

// INDEX - GET register form
router.get("/", function(req, res){
  res.render("pages/register"); 
});

// CREATE - add new user to DB
router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = { firstName, lastName, email, password };

  User.findOne({ email: newUser.email }, (err, foundUser) => {
    if(err){
      console.log(err);
      console.log('Um erro inesperado aconteceu, entre em contato para assitência!');
      res.redirect('/register');
    }

    if (!foundUser) {
      console.log('Usuário não encontrado, cadastrando...');
      User.create(newUser, (err, createdUser) => {
        if(err) {
          console.log('Erro ao cadastrar usuário, entre em contato para assitência!');
          console.log(err);
        }
        console.log("Usuário criado, id: " + createdUser.id);
        res.redirect('/');
      });
    } else {
      console.log("O e-mail entrado já está cadastrado!\nId:" + foundUser.id);
      res.redirect("/register");
    }
  });
});

module.exports = router;