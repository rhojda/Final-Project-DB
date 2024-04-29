const express = require('express');
const Console = require('../models/console');
const Game = require('../models/game');
const ConsoleUser = require('../models/console_user');
const router = express.Router();

router.get('/', function (req, res, next) {
    const consoles = Console.all
    res.render('consoles/index', { title: 'Video Game Database || Consoles', consoles: consoles });
});

router.get('/form', async (req, res, next) => {
    res.render('consoles/form', { title: 'Video Game Database || Consoles', consoles: Console.all });
});

router.get('/edit', async (req, res, next) => {
    let consoleIndex = req.query.id;
    let console = Console.get(consoleIndex);
    res.render('consoles/form', { title: 'Video Game Database || Consoles', console: console, consoleIndex: consoleIndex, consoles: Console.all });
});

router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
        title: 'Video Game Database || Consoles',
        console: Console.get(req.params.id),
        consoleId: req.params.id,
    }
    if (templateVars.console.gameIds) {
        templateVars['games'] = templateVars.console.gameIds.map((gameId) => Game.get(gameId))
    }
    if (req.session.currentUser) {
        templateVars['consoleUser'] = ConsoleUser.get(req.params.id, req.session.currentUser.email);
    }
    res.render('consoles/show', templateVars);
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    Console.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the console has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/consoles')
});

module.exports = router;