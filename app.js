require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const adminProductsRouter = require('./routes/admin/products');

app.set('view engine', 'ejs') ;
app.use(expressLayouts);
app.use(bodyParser.urlencoded());
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DATABASEURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    (error) => {
        if(error) console.log(error);

        console.log('Aplicação conectada ao banco de dados!');
    }
);

app.use(express.static(__dirname + '/public'));
app.use(adminProductsRouter);

app.get('/', (req, res) => {
    res.render('pages/home');
})

app.listen(process.env.PORT, () => {
    console.log('A Feira do Campo está no ar!');
});