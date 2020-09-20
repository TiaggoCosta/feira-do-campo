const express = require('express');

const router = express.Router();

router.get('/admin/products', async (req, res) => {
    res.send("Isso é um teste :D");
});

module.exports = router;