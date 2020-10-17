const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const passport = require('passport');

// HOME
router.get('/', (req, res) => {
    Product.find({}, (err, products) => {
        if(err){
            console.log(err);
        } else {
           res.render('pages/home',{ products });
        }
    });
});

// INDEX - GET register form
router.get("/register", function(req, res){
    res.render("pages/register"); 
  });
  
  // CREATE - add new user to DB
  router.post('/register', (req, res) => {
    const { firstName, lastName, email, password, repeatedPassword } = req.body;
    const newUser = { firstName, lastName, email, password };
  
    User.findOne({ email: newUser.email }, (err, foundUser) => {
      if(err){
        console.log(err);
        console.log("Erro ao acessar o banco de dados.");
        req.flash("error", "Um erro inesperado aconteceu, entre em contato para assitência!");
        res.redirect('/');
      }
  
      if (!foundUser) {
        if(repeatedPassword != password ){
          console.log("Senhas incorretas.");
          req.flash("error", "As senhas informadas diferem, verifique as informações inseridas!");
          res.redirect('/register');
        } else {
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
        }
      } else {
        console.log("O e-mail informado já está cadastrado\nId:" + foundUser.id);
        req.flash("error", "Este e-mail já está cadastrado!");
        res.redirect("back");
      }
    });
  });

// INDEX - GET login form
router.get("/login", function(req, res){
    res.render("pages/login"); 
  });
  
  //POST authenticate
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next)
  });
  
  // GET logout
  router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Deslogado com sucesso!")
    console.log("Deslogado com sucesso");
    res.redirect("/");
  });

module.exports = router;