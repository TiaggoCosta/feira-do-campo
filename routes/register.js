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
      console.log("Erro ao acessar o banco de dados.");
      req.flash("error", "Um erro inesperado aconteceu, entre em contato para assitência!");
      res.redirect('/');
    }

    if (!foundUser) {
      console.log("Usuário não encontrado, cadastrando...");
      User.create(newUser, (err, createdUser) => {
        if(err) {
          console.log("Erro ao cadastrar usuário no banco de dados.");
          req.flash("error", "Erro ao cadastrar usuário, entre em contato para assitência!");
          console.log(err);
        }
        console.log("Usuário criado, id: " + createdUser.id);
        req.flash("success", "Obrigado por se registrar, seu usuário foi criado com sucesso!\nFaça o login para entrar.");
        res.redirect('/login');
      });
    } else {
      console.log("O e-mail informado já está cadastrado\nId:" + foundUser.id);
      req.flash("error", "Este e-mail já está cadastrado!");
      res.redirect("back");
    }
  });
});

module.exports = router;