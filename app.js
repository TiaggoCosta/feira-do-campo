require("dotenv").config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
    process.env.DATABASEURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    (error) => {
        if(error) console.log(error);

        console.log('Aplicação conectada ao banco de dados!');
    }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(process.env.PORT, () => {
    console.log('A Feira do Campo está no ar!');
});