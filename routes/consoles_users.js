const express = require('express');
const router = express.Router();

const ConsoleUser = require('../models/console_user');

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    let consoleId = req.body.bookId;
    let redirect = `/books/show/${bookId}`;
    ConsoleUser.upsert(req.body);
    res.redirect(303, redirect)
});

module.exports = router;
