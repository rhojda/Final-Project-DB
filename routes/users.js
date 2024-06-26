const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Console = require('../models/console');
const UserConsole = require('../models/user_console');

const helpers = require('./helpers')

router.get('/register', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {
        return
    }
    res.render('users/register', { title: 'Video Game Database || Registration' });
});

router.post('/register', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {
        return
    }
    console.log('body: ' + JSON.stringify(req.body));
    const user = await User.getByEmail(req.body.email)
    if (user) {
        res.render('users/register', {
            title: 'Video Game Database || Login',
            flash: {
                type: 'danger',
                intro: 'Error!',
                message: `A user with this email already exists`
            }
        });
    } else {
        await User.add(req.body);
        req.session.flash = {
            type: 'info',
            intro: 'Success!',
            message: `the user has been created!`,
        };
        res.redirect(303, '/');
    }
});

router.get('/login', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {
        return
    }
    res.render('users/login', { title: 'Video Game Database || Login' });
});

router.post('/login', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {
        return
    }
    console.log('body: ' + JSON.stringify(req.body));
    const user = await User.login(req.body)
    if (user) {
        req.session.currentUser = user
        req.session.flash = {
            type: 'info',
            intro: 'Success!',
            message: 'You are now logged in',
        };
        res.redirect(303, '/');
    } else {
        res.render('users/login', {
            title: 'Video Game Database || Login',
            flash: {
                type: 'danger',
                intro: 'Error!',
                message: `Wrong email and password combination or the user could not be found`
            }
        });
    }
});

router.post('/logout', async (req, res, next) => {
    delete req.session.currentUser
    req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'You are now logged out',
    };
    res.redirect(303, '/');
});

router.get('/profile', async (req, res, next) => {
    if (helpers.isNotLoggedIn(req, res)) {
        return
    }
    const usersConsole = UserConsole.AllForUser(req.session.currentUser.email);
    usersConsole.forEach((userConsole) => {
        userConsole.console = Console.get(userConsole.consoleId)
    })
    res.render('users/profile',
        {
            title: 'Video Game Database || Profile',
            user: req.session.currentUser,
            usersConsole: usersConsole
        });
});


module.exports = router;
