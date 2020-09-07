const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Olá, obrigado por visitar a Feira do Campo! ");
});

app.listen(3000, () => {
    console.log("A Feira do Campo está no ar!");
});