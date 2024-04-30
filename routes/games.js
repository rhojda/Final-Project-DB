const express = require('express');
const Game = require('../models/game');
const router = express.Router();

router.get('/', async (req, res, next) => {
    let games = await Game.all();
    res.render('games/index', { title: 'Video Game Database || Games', games: games });
});


router.get('/form', async (req, res, next) => {
    let templateVars = { title: 'Video Game Database || Games' }
    if (req.query.id) {
        let game = await Game.get(req.query.id)
        if (game) { templateVars['game'] = game }
    }
    res.render('games/form', templateVars);
});

router.get('/edit', async (req, res, next) => {
    let gameIndex = req.query.id;
    let game = Game.get(gameIndex);
    res.render('games/form', { title: 'Video Game Database || Games', game: game, gameIndex: gameIndex, games: Game.all });
});

router.get('/show/:id', async (req, res, next) => {
    let templateVars = {
        title: 'Video Game Database || Games',
        game: Game.get(req.params.id),
        gameId: req.params.id,
    }
    /*
    if (templateVars.game.gameIds) {
        templateVars['games'] = templateVars.console.gameIds.map((gameId) => Game.get(gameId))
    }
    */
    /*
     if (req.session.currentUser) {
         templateVars['consoleUser'] = ConsoleUser.get(req.params.id, req.session.currentUser.email);
     }
     */
    res.render('consoles/show', templateVars);
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    await Game.upsert(req.body);
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'the game has been added!',
    };
    res.redirect(303, '/games')
});

module.exports = router;