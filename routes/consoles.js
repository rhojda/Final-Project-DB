const express = require('express');
const Console = require('../models/console');
//const Game = require('../models/game');
const UserConsole = require('../models/user_console');
const router = express.Router();

router.get('/', async (req, res, next) => {
    let consoles = await Console.all();
    res.render('consoles/index', { title: 'Video Game Database || Consoles', consoles: consoles });
});


router.get('/form', async (req, res, next) => {
    let templateVars = { title: 'Video Game Database || Consoles' }
    if (req.query.id) {
        let console = await Console.get(req.query.id)
        if (console) { templateVars['console'] = console }
    }
    res.render('consoles/form', templateVars);
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
        consoleId: req.params.id,
    }
    if (templateVars.console.gameIds) {
        templateVars['games'] = templateVars.console.gameIds.map((gameId) => Game.get(gameId))
    }
    if (req.session.currentUser) {
        templateVars['userConsole'] = UserConsole.get(req.params.id, req.session.currentUser.email);
    }
    res.render('consoles/show', templateVars);
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    await Console.upsert(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'the console has been added!',
    };
    res.redirect(303, '/consoles')
});

module.exports = router;