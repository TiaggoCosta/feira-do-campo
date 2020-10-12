require("dotenv").config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const indexRoutes = require('./routes/index');
const adminProductsRoutes = require('./routes/admin/products');
const cartsRoutes = require('./routes/carts');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');

const multer = require('multer');
const upload = multer();
const cookieSession = require('cookie-session');
//const seedDB = require("./seeds");

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/auth")(passport);

app.set('view engine', 'ejs') ;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(
    cookieSession({
      keys: ['digaamigoeentre']
    })
  );

  app.use(expressLayouts);
  //sessão
  app.use(session({
    secret: "feiralovelace",
    resave: true,
    saveUninitialized: true
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())
  //middleware
  app.use((req, res, next) => {
    res.locals.suceess_msg = req.flash("success_msg");
    res.locals.erro_msg = req.flash("erro_msg");
    res.locals.error = req.flash("error");
    next()
  })

mongoose.connect(
    process.env.DATABASEURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    (error) => {
        if(error) console.log(error);

        console.log('Aplicação conectada ao banco de dados!');
    }
);
//seedDB();

app.use('/', indexRoutes);
app.use('/register', registerRoutes);
app.use('/admin/products', adminProductsRoutes);
app.use('/cart', cartsRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
    console.log('A Feira do Campo está no ar!');
});