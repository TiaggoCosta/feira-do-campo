const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const adminProductsRouter = require('./routes/admin/produtos');

app.set('view engine', 'ejs') ;
app.use(expressLayouts);
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/public'));
app.use(adminProductsRouter);

app.get('/', (req, res) => {
    res.render('pages/home');
})

app.listen(3000, () => {
    console.log('A Feira do Campo está no ar!');
});