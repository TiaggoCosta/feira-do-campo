const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const passport = require('passport');
const bcrypt = require('bcrypt');
const cartsRepo = require('../models/cart');

// HOME
router.get('/', (req, res) => {
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Product.find({title: regex}, function(err, products){
      if(err){
        console.log(err);
      } else {
        if(products.length < 1){
          req.flash("info", "Nenhum produto encontrado, redirecionando para home.");
          res.redirect("/");
        } else {
          res.render('pages/home', { products });
        }
      }
    });
  } else {
    Product.find({}, (err, products) => {
      if(err){
        console.log(err);
      } else {
        res.render('pages/home', { products });
      }
    });
  }
});

// INDEX - GET register form
router.get("/register", function(req, res){
    res.render("pages/register"); 
  });
  
  // CREATE - add new user to DB
  router.post('/register', async (req, res) => {
    const saltRounds = 10;
    const { firstName, lastName, email, password, repeatedPassword } = req.body;
    const newUser = { firstName, lastName, email };
    await bcrypt.hash(password, saltRounds, async (err, hash) => {
      // Store hash in your password DB.
      newUser.password = hash;
      console.log(newUser);
      console.log("novo usuario pronto")
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
  
  
  });

// INDEX - GET login form
router.get("/login", function(req, res){
    res.render("pages/login"); 
  });
  
  //POST authenticate
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", async(err, user) => {
      if(user) {
      console.log("Login realizado com sucesso!");
      console.log(user)
          if(!user.idCart) {
            console.log('sem carrinho')
            if(req.session.cartId) {
              user.idCart = req.session.cartId;
              req.session.cartId = null;
              console.log('carrinho trocado')
            } else {
              console.log('carrinho criado')
              user.idCart = await cartsRepo.create( { items: [] } );
            }
          } else {
            console.log("merge carrinhos")
          }
          console.log(user)
          console.log(req.session.cartId)
          
        }
        req.logIn(user, function(err) {
          if(err) return res.rdirect('/login');
          return res.redirect('/');
        })
        
    })(req, res, next)
  });
  
  // GET logout
  router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Deslogado com sucesso!")
    console.log("Deslogado com sucesso");
    res.redirect("/");
  });

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;