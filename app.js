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

const multer = require('multer');
const upload = multer();
const cookieSession = require('cookie-session');
//const seedDB = require("./seeds");

app.set('view engine', 'ejs') ;
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array()); 
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(
    cookieSession({
      keys: ['digaamigoeentre']
    })
  );

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
app.use('/admin/products', adminProductsRoutes);
app.use('/cart', cartsRoutes);

app.listen(process.env.PORT, () => {
    console.log('A Feira do Campo está no ar!');
});